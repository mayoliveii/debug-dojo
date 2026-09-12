# Exercício 2 - Normalização e Correlação de Pedidos com Clientes

**Nível:** Pleno

## Contexto do problema
Você recebe dados de dois sistemas diferentes: um exporta **clientes**, outro exporta **pedidos**. Os IDs não estão garantidamente consistentes: alguns pedidos apontam para clientes que não existem mais, e alguns clientes nunca fizeram pedidos. Você precisa produzir um relatório unificado.

## Descrição detalhada do que precisa ser feito
Implemente `montarRelatorioClientes(clientes, pedidos)` que retorna um array de clientes enriquecidos, cada um com:
- dados básicos do cliente;
- `quantidadePedidos`;
- `valorTotalGasto`;
- `ticketMedio` (valor total / quantidade, ou `0` se não houver pedidos);
- `ultimoPedido` (data ISO do pedido mais recente, ou `null`).

Além disso, retorne separadamente os **pedidos órfãos** (que apontam para um `clienteId` inexistente).

O array de clientes deve ser ordenado por **maior valorTotalGasto**; empate por **nome** (alfabético, case-insensitive).

## Entrada
```js
const clientes = [
  { id: 1, nome: "Ana Souza",  email: "ana@x.com" },
  { id: 2, nome: "bruno lima", email: "bruno@x.com" },
  { id: 3, nome: "Carla",      email: "carla@x.com" },
];

const pedidos = [
  { pedidoId: "p1", clienteId: 1, valor: 250.0, data: "2026-01-15T10:00:00Z", status: "pago" },
  { pedidoId: "p2", clienteId: 1, valor: 100.0, data: "2026-03-02T09:00:00Z", status: "pago" },
  { pedidoId: "p3", clienteId: 2, valor: 250.0, data: "2026-02-20T12:00:00Z", status: "cancelado" },
  { pedidoId: "p4", clienteId: 99, valor: 999.0, data: "2026-04-01T08:00:00Z", status: "pago" },
];
```

## Saída esperada
```js
{
  clientes: [
    {
      id: 1, nome: "Ana Souza", email: "ana@x.com",
      quantidadePedidos: 2, valorTotalGasto: 350.0, ticketMedio: 175.0,
      ultimoPedido: "2026-03-02T09:00:00Z"
    },
    {
      id: 3, nome: "Carla", email: "carla@x.com",
      quantidadePedidos: 0, valorTotalGasto: 0, ticketMedio: 0,
      ultimoPedido: null
    },
    {
      id: 2, nome: "bruno lima", email: "bruno@x.com",
      quantidadePedidos: 0, valorTotalGasto: 0, ticketMedio: 0,
      ultimoPedido: null
    }
  ],
  pedidosOrfaos: [
    { pedidoId: "p4", clienteId: 99, valor: 999.0, data: "2026-04-01T08:00:00Z", status: "pago" }
  ]
}
```

## Regras e casos especiais
- Apenas pedidos com `status: "pago"` contam para `valorTotalGasto`, `quantidadePedidos` e `ticketMedio`.
- `ultimoPedido` deve considerar **qualquer** pedido do cliente (independente de status), pois representa a última interação.
- Clientes sem nenhum pedido pago têm métricas zeradas, mas ainda aparecem no relatório.
- No exemplo acima, Carla vem antes de Bruno porque ambos têm `valorTotalGasto = 0` e "Carla" < "bruno lima" no desempate case-insensitive.
- Datas estão em ISO 8601 (UTC). Comparação deve ser cronológica correta, não lexicográfica ingênua.

## Restrições
- Até **100.000 clientes** e **1.000.000 de pedidos**.
- Fazer *lookup* de cliente por pedido deve ser O(1) amortizado (nada de `find` dentro de loop).

## O que o exercício avalia
- Correlação (join) entre dois conjuntos via índice.
- Detecção de dados órfãos.
- Agregações condicionais e cálculo de métricas.
- Ordenação estável com desempate.
- Manipulação básica de datas.

## Complexidade esperada
O(c + p), onde c = clientes e p = pedidos, mais O(c log c) na ordenação final.

## Casos de teste adicionais
```js
// Caso A - cliente com todos os pedidos cancelados
const clientesA = [{ id: 1, nome: "Zé", email: "ze@x.com" }];
const pedidosA = [
  { pedidoId: "x", clienteId: 1, valor: 500, data: "2026-05-01T00:00:00Z", status: "cancelado" },
];

// Caso B - nenhum pedido
const clientesB = [{ id: 1, nome: "Só Cliente", email: "s@x.com" }];
const pedidosB = [];

// Caso C - apenas pedidos órfãos
const clientesC = [];
const pedidosC = [
  { pedidoId: "o1", clienteId: 5, valor: 10, data: "2026-01-01T00:00:00Z", status: "pago" },
];
```
