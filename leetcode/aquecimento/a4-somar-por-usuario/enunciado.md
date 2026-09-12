# Aquecimento 4 — Somar Gastos por Usuário

**Nível:** Fácil

## Objetivo de aprendizado
Combinar "gaveta por usuário" + "somar valores". É o passo direto antes do Exercício 1 oficial.

## O que fazer
Implemente `gastoPorUsuario(compras)` que recebe uma lista de compras e devolve um objeto com o **total gasto por cada usuário**.

## Entrada
```js
const compras = [
  { userId: 1, valor: 50 },
  { userId: 2, valor: 30 },
  { userId: 1, valor: 20 },
  { userId: 1, valor: 100 },
  { userId: 2, valor: 70 },
];
```

## Saída esperada
```js
{
  1: 170,
  2: 100
}
```

## Regras e casos especiais
- Lista vazia → retorne `{}`.
- Ignore compras com `valor` que não seja um número válido (ex.: `null`, `undefined`). Dica: dá para checar com `typeof valor === "number"`.

## Dica de raciocínio (sem dar a resposta)
- A "folha" começa como `{}`.
- Para cada compra: se a gaveta do usuário ainda não existe, crie começando em `0`.
- Some o `valor` da compra na gaveta desse usuário.

## Casos de teste
```js
gastoPorUsuario([{ userId: 9, valor: 5 }]);
// { 9: 5 }

gastoPorUsuario([]);
// {}

gastoPorUsuario([
  { userId: 1, valor: 10 },
  { userId: 1, valor: null },  // ignorar
  { userId: 1, valor: 40 },
]);
// { 1: 50 }
```
