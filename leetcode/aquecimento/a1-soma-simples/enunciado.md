# Aquecimento 1 - Soma Simples de uma Lista

**Nível:** Iniciante (o mais fácil de todos)

## Objetivo de aprendizado
Percorrer uma lista e acumular um único número. É o "hello world" do `reduce`/`for`.

## O que fazer
Implemente uma função `somarValores(numeros)` que recebe uma lista de números e devolve a **soma de todos eles**.

## Entrada
```js
const numeros = [10, 5, 20, 65];
```

## Saída esperada
```js
100
```

## Regras e casos especiais
- Se a lista estiver **vazia**, retorne `0`.
- Pode assumir que todos os itens são números válidos.

## Dica de raciocínio (sem dar a resposta)
- Comece com um "total" valendo `0` (a sua "folha em branco").
- Para cada número da lista, some ele no total.
- No fim, devolva o total.

## Casos de teste
```js
somarValores([1, 2, 3]);      // 6
somarValores([]);             // 0
somarValores([42]);           // 42
somarValores([-5, 5, 10]);    // 10
```

> Tente fazer de DUAS formas: primeiro com `for`, depois com `reduce`. São a mesma coisa com roupas diferentes.
