# Aquecimento 2 — Contar Quantas Vezes Cada Valor Aparece

**Nível:** Iniciante

## Objetivo de aprendizado
Usar o padrão da "gaveta": `if (!acc[chave]) { acc[chave] = 0 }` e depois somar. Exatamente o que você acabou de entender.

## O que fazer
Implemente `contarFrutas(frutas)` que recebe uma lista de nomes de frutas (com repetições) e devolve um objeto dizendo **quantas vezes cada fruta aparece**.

## Entrada
```js
const frutas = ["maçã", "banana", "maçã", "laranja", "banana", "maçã"];
```

## Saída esperada
```js
{
  "maçã": 3,
  "banana": 2,
  "laranja": 1
}
```

## Regras e casos especiais
- Lista vazia → retorne `{}` (objeto vazio).
- Diferencie maiúsculas/minúsculas normalmente (não precisa normalizar).

## Dica de raciocínio (sem dar a resposta)
- A "folha" começa como `{}`.
- Para cada fruta: se a gaveta dela ainda não existe, crie começando em `0`.
- Depois, some `1` na gaveta dessa fruta.

## Casos de teste
```js
contarFrutas(["uva", "uva"]);            // { uva: 2 }
contarFrutas([]);                        // {}
contarFrutas(["a", "b", "c"]);           // { a: 1, b: 1, c: 1 }
contarFrutas(["x", "x", "y", "x"]);      // { x: 3, y: 1 }
```
