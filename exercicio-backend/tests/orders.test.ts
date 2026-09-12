import request from 'supertest'
import { createApp } from '../src/app'
import { resetDb, db } from '../src/data/db'

const app = createApp()

beforeEach(() => {
  resetDb()
})

describe('Catálogo', () => {
  it('lista os produtos disponíveis', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('Criação de pedidos - fluxo feliz', () => {
  it('cria um pedido pago e calcula os totais', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ productId: 'p_teclado', quantity: 2 }] })

    expect(res.status).toBe(201)
    expect(res.body.status).toBe('PAID')
    expect(res.body.subtotalCents).toBe(70000)
    expect(res.body.discountCents).toBe(0)
    expect(res.body.totalCents).toBe(70000)
    expect(res.body.paymentId).toBeDefined()
  })

  it('aplica corretamente um cupom percentual ativo', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        items: [{ productId: 'p_mouse', quantity: 1 }],
        couponCode: 'DEZOFF'
      })

    expect(res.status).toBe(201)
    expect(res.body.subtotalCents).toBe(15000)
    expect(res.body.discountCents).toBe(1500)
    expect(res.body.totalCents).toBe(13500)
  })

  it('baixa o estoque após a compra', async () => {
    await request(app)
      .post('/api/orders')
      .send({ items: [{ productId: 'p_monitor', quantity: 1 }] })

    expect(db.products.get('p_monitor')!.stock).toBe(2)
  })
})

describe('Criação de pedidos - regras', () => {
  it('recusa pedido quando não há estoque suficiente', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ productId: 'p_webcam', quantity: 1 }] })

    expect(res.status).toBe(409)
  })

  it('recusa pedido sem itens', async () => {
    const res = await request(app).post('/api/orders').send({ items: [] })
    expect(res.status).toBe(400)
  })
})

describe('Consulta de pedidos', () => {
  it('retorna um pedido existente', async () => {
    const created = await request(app)
      .post('/api/orders')
      .send({ items: [{ productId: 'p_teclado', quantity: 1 }] })

    const res = await request(app).get(`/api/orders/${created.body.id}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(created.body.id)
  })

  it('retorna 404 para um pedido inexistente', async () => {
    const res = await request(app).get('/api/orders/ord_inexistente')
    expect(res.status).toBe(404)
  })
})

describe('Cancelamento de pedidos', () => {
  it('devolve o estoque ao cancelar um pedido', async () => {
    const created = await request(app)
      .post('/api/orders')
      .send({ items: [{ productId: 'p_monitor', quantity: 1 }] })

    expect(db.products.get('p_monitor')!.stock).toBe(2)

    const res = await request(app).post(`/api/orders/${created.body.id}/cancel`)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('CANCELLED')
    expect(db.products.get('p_monitor')!.stock).toBe(3)
  })
})

describe('Concorrência', () => {
  it('não deve vender mais unidades do que há em estoque', async () => {
    // Há apenas 1 headset em estoque. Dois pedidos chegam ao mesmo tempo.
    const [a, b] = await Promise.all([
      request(app)
        .post('/api/orders')
        .send({ items: [{ productId: 'p_headset', quantity: 1 }] }),
      request(app)
        .post('/api/orders')
        .send({ items: [{ productId: 'p_headset', quantity: 1 }] })
    ])

    const statuses = [a.status, b.status].sort()
    // Esperado: um pedido é criado (201) e o outro é recusado (409).
    expect(statuses).toEqual([201, 409])
    expect(db.products.get('p_headset')!.stock).toBe(0)
  })
})
