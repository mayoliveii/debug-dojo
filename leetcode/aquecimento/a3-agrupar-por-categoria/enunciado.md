# Aquecimento 3 — Agrupar Produtos por Categoria

**Nível:** Iniciante/Fácil

## Objetivo de aprendizado
Agora a "gaveta" guarda uma **lista** (array) em vez de um número. Primeiro contato com agrupar objetos.

## O que fazer
Implemente `agruparPorCategoria(produtos)` que recebe uma lista de produtos e devolve um objeto onde cada **categoria** aponta para a **lista de nomes** dos produtos daquela categoria.

## Entrada
```js
const produtos = [
  { nome: "Camiseta", categoria: "roupa" },
  { nome: "Notebook", categoria: "eletronico" },
  { nome: "Calça",    categoria: "roupa" },
  { nome: "Mouse",    categoria: "eletronico" },
  { nome: "Boné",     categoria: "roupa" },
];
```

## Saída esperada
```js
{
  roupa: ["Camiseta", "Calça", "Boné"],
  eletronico: ["Notebook", "Mouse"]
}
```

## Regras e casos especiais
- Lista vazia → retorne `{}`.
- A ordem dentro de cada lista deve seguir a ordem em que apareceram na entrada.

## Dica de raciocínio (sem dar a resposta)
- A "folha" começa como `{}`.
- Para cada produto: se a gaveta da categoria ainda não existe, crie ela começando como uma **lista vazia** `[]`.
- Depois, use `.push(...)` para adicionar o nome do produto nessa lista.

## Casos de teste
```js
agruparPorCategoria([{ nome: "A", categoria: "x" }]);
// { x: ["A"] }

agruparPorCategoria([]);
// {}

agruparPorCategoria([
  { nome: "P1", categoria: "casa" },
  { nome: "P2", categoria: "casa" },
]);
// { casa: ["P1", "P2"] }
```
