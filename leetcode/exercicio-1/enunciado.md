# Exercício 1 — Consolidação de Carrinhos por Usuário

**Nível:** Pleno

## Contexto do problema
Um e-commerce registra eventos de "adicionar ao carrinho" de forma bruta, em uma fila. Cada evento é uma linha independente e o mesmo produto pode aparecer várias vezes para o mesmo usuário (o usuário clicou "adicionar" mais de uma vez). O time de dados precisa de uma visão consolidada do carrinho atual de cada usuário.

## Descrição detalhada do que precisa ser feito
Implemente uma função `consolidarCarrinhos(eventos)` que recebe uma lista de eventos de adição ao carrinho e retorna, **por usuário**, a lista de produtos com a **quantidade total** somada e o **valor total** daquele item (quantidade × preço unitário). Cada usuário deve ter também o `totalCarrinho` (soma dos valores de todos os itens).

Os produtos dentro de cada usuário devem vir ordenados por **maior valor total do item**; em caso de empate, por **nome do produto em ordem alfabética**.

## Entrada
```js
const eventos = [
  { userId: 7, produtoId: "A1", nome: "Teclado",  precoUnitario: 150.0, quantidade: 1 },
  { userId: 7, produtoId: "A1", nome: "Teclado",  precoUnitario: 150.0, quantidade: 2 },
  { userId: 7, produtoId: "B2", nome: "Mouse",    precoUnitario: 80.0,  quantidade: 1 },
  { userId: 9, produtoId: "C3", nome: "Monitor",  precoUnitario: 900.0, quantidade: 1 },
  { userId: 7, produtoId: "B2", nome: "Mouse",    precoUnitario: 80.0,  quantidade: 3 },
];
```

## Saída esperada
```js
{
  7: {
    itens: [
      { produtoId: "A1", nome: "Teclado", quantidade: 3, valorTotal: 450.0 },
      { produtoId: "B2", nome: "Mouse",   quantidade: 4, valorTotal: 320.0 },
    ],
    totalCarrinho: 770.0
  },
  9: {
    itens: [
      { produtoId: "C3", nome: "Monitor", quantidade: 1, valorTotal: 900.0 },
    ],
    totalCarrinho: 900.0
  }
}
```

## Regras e casos especiais
- O mesmo `produtoId` do mesmo usuário deve ser mesclado em uma única entrada.
- `quantidade` sempre é inteiro ≥ 1, mas assuma que valores inválidos (`0`, negativos, `null`, `undefined`) podem aparecer e devem ser **ignorados** (o evento não conta).
- `precoUnitario` pode vir como `null` em eventos corrompidos — nesse caso o evento também deve ser ignorado.
- Se um usuário só tiver eventos inválidos, ele **não** deve aparecer na saída.
- Valores monetários devem ser tratados com cuidado (arredonde para 2 casas na saída final de cada item e do total).

## Restrições
- Até **500.000 eventos**.
- Até **50.000 usuários** distintos.
- A solução deve percorrer os eventos idealmente **uma única vez** para a agregação.

## O que o exercício avalia
- Agrupamento e indexação com `Map`/objeto.
- Agregação incremental.
- Ordenação com múltiplos critérios.
- Tratamento de dados inconsistentes.

## Complexidade esperada
Agregação em O(n); ordenação final O(k log k) por usuário, onde k é o nº de produtos distintos daquele usuário.

## Casos de teste adicionais
```js
// Caso A — eventos inválidos misturados
const a = [
  { userId: 1, produtoId: "X", nome: "Cabo", precoUnitario: 10, quantidade: 0 },
  { userId: 1, produtoId: "X", nome: "Cabo", precoUnitario: null, quantidade: 2 },
  { userId: 1, produtoId: "Y", nome: "Fonte", precoUnitario: 200, quantidade: 1 },
];

// Caso B — empate no valorTotal, desempate por nome
const b = [
  { userId: 5, produtoId: "P1", nome: "Zebra", precoUnitario: 100, quantidade: 1 },
  { userId: 5, produtoId: "P2", nome: "Alfa",  precoUnitario: 50,  quantidade: 2 },
];

// Caso C — vazio
const c = [];
```
