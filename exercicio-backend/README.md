# Exercício Back-end - API de Pedidos

API em **Node.js + TypeScript + Express** para processamento de pedidos de uma loja, com
**controle de estoque**, **cupons de desconto** e **pagamento via gateway externo simulado**.

O projeto já está **parcialmente implementado** e faz parte de um sistema em produção. Você
recebeu esta base como uma tarefa de manutenção: o time relatou comportamentos estranhos
(estoque "furando", respostas inconsistentes, alguns testes vermelhos no CI). Sua missão é
deixar a API **correta, consistente e robusta**, de acordo com o comportamento esperado e o
checklist abaixo.

## Requisitos

- Node.js 18+

## Como executar

```bash
cd exercicio-backend
npm install
npm run dev      # sobe a API em http://localhost:3000
```

Rodar os testes:

```bash
npm test
```

Checar tipos:

```bash
npm run typecheck
```

Build de produção:

```bash
npm run build   # compila para dist/
npm start       # roda a versão compilada (dist/server.js)
```

> Alguns testes já existem e **podem estar falhando** - eles descrevem parte do comportamento
> esperado. Sinta-se à vontade para adicionar novos testes durante a investigação.

## Domínio

- **Produtos** têm preço (em centavos) e estoque.
- **Cupons** podem ser percentuais ou de valor fixo, e podem estar ativos ou inativos.
- **Pedidos** reservam estoque, aplicam cupom, cobram no gateway e ficam `PAID`.
- Um pedido pode ser **cancelado**, devolvendo o estoque.

O gateway de pagamento (`src/services/paymentGateway.ts`) representa uma **integração externa
real**: tem latência e pode recusar cobranças. Trate-o como um terceiro cujo comportamento
você não controla - apenas como a sua aplicação reage a ele.

## Endpoints

| Método | Rota                     | Descrição                          |
|--------|--------------------------|------------------------------------|
| GET    | `/api/health`            | Healthcheck                        |
| GET    | `/api/products`          | Lista produtos                     |
| POST   | `/api/orders`            | Cria um pedido                     |
| GET    | `/api/orders`            | Lista pedidos                      |
| GET    | `/api/orders/:id`        | Detalha um pedido                  |
| POST   | `/api/orders/:id/cancel` | Cancela um pedido                  |

### Exemplos

Criar pedido:

```bash
curl -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: pedido-abc-123' \
  -d '{ "items": [{ "productId": "p_teclado", "quantity": 1 }], "couponCode": "DEZOFF" }'
```

Cancelar pedido:

```bash
curl -X POST http://localhost:3000/api/orders/ord_1/cancel
```

## Objetivo

Deixar a API em conformidade com o comportamento esperado, mantendo **consistência de dados**
(especialmente estoque) mesmo sob **entradas inválidas, chamadas concorrentes e falhas do
serviço externo**.

## Comportamento esperado

- Um pedido só é concluído (`PAID`) quando **há estoque** e a **cobrança é aprovada**.
- O estoque deve **sempre refletir a realidade**: nunca deve ficar negativo nem "sobrar"/"sumir".
- Requisições com a **mesma chave de idempotência** representam a **mesma** operação.
- Entradas inválidas devem ser **rejeitadas com o status HTTP adequado**.
- Recursos inexistentes devem responder com o status HTTP adequado.
- Cancelar um pedido devolve o estoque de forma **correta e previsível**.
- Descontos devem produzir totais **coerentes** com as regras de negócio.

## Checklist

**Fluxo de sucesso**
- [x] Criar um pedido válido retorna `201` com totais corretos.
- [x] Cupom válido é aplicado corretamente ao total.
- [x] Estoque é baixado corretamente após a compra.

**Fluxo de erro**
- [x] Estoque insuficiente é rejeitado com status adequado.
- [x] Pedido sem itens é rejeitado.
- [ ] Falha do gateway de pagamento não deixa dados inconsistentes.

**Validação de entrada**
- [x] Quantidades inválidas são rejeitadas.
- [ ] Payloads malformados não quebram a aplicação.

**Regras de negócio / consistência**
- [x] O estoque nunca fica negativo.
- [x] O estoque nunca é indevidamente inflado.
- [x] Descontos nunca produzem totais incoerentes.

**Dados inexistentes**
- [x] Consultar um pedido inexistente responde com o status adequado.
- [x] Cancelar um pedido inexistente responde com o status adequado.

**Idempotência / duplicidade**
- [ ] A mesma chave de idempotência não gera pedidos/cobranças duplicados.
- [ ] Operações repetidas não corrompem o estado.

**Concorrência**
- [ ] Pedidos simultâneos respeitam o estoque disponível.

**Edge cases**
- [ ] Casos limites de itens/quantidades/cupons se comportam de forma correta.

**Organização / segurança básica**
- [ ] Erros retornam status HTTP semânticos (não tudo como `500`/`200`).
- [ ] Responsabilidades ficam em camadas adequadas.
```
