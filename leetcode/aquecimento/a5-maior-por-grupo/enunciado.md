# Aquecimento 5 - Produto Mais Caro por Categoria

**Nível:** Fácil/Médio (ponte para o Exercício 1)

## Objetivo de aprendizado
Na gaveta, em vez de somar, você **compara e guarda o "melhor"**. Introduz a ideia de manter o máximo por grupo.

## O que fazer
Implemente `maisCaroPorCategoria(produtos)` que devolve, para cada categoria, o **nome do produto mais caro** daquela categoria.

## Entrada
```js
const produtos = [
  { nome: "Camiseta", categoria: "roupa",      preco: 50 },
  { nome: "Casaco",   categoria: "roupa",      preco: 200 },
  { nome: "Mouse",    categoria: "eletronico", preco: 80 },
  { nome: "Teclado",  categoria: "eletronico", preco: 150 },
  { nome: "Meia",     categoria: "roupa",      preco: 20 },
];
```

## Saída esperada
```js
{
  roupa: "Casaco",       // 200 é o maior preço em roupa
  eletronico: "Teclado"  // 150 é o maior preço em eletronico
}
```

## Regras e casos especiais
- Lista vazia → retorne `{}`.
- Se houver **empate** de preço, mantenha o produto que apareceu **primeiro** na lista.
- Pode assumir que `preco` é sempre um número válido.

## Dica de raciocínio (sem dar a resposta)
- A "folha" começa como `{}`.
- Para cada produto: se a categoria ainda não tem nada guardado, guarde este produto (nome + preço).
- Se já tem algo guardado, **compare os preços**: se o atual for maior, substitua; senão, mantenha.
- No fim, você pode transformar o que guardou para devolver só o `nome` (se durante o processo você guardou nome + preço para conseguir comparar).

## Casos de teste
```js
maisCaroPorCategoria([{ nome: "X", categoria: "a", preco: 10 }]);
// { a: "X" }

maisCaroPorCategoria([]);
// {}

maisCaroPorCategoria([
  { nome: "Primeiro", categoria: "z", preco: 100 },
  { nome: "Segundo",  categoria: "z", preco: 100 }, // empate: mantém o Primeiro
]);
// { z: "Primeiro" }
```
