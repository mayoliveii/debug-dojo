# Exercício 3 — Construção de Árvore de Categorias (Estrutura Hierárquica)

**Nível:** Pleno/Sênior

## Contexto do problema
Um catálogo de produtos armazena categorias em formato **flat** (lista plana), onde cada categoria referencia seu `parentId`. O front-end precisa dessa informação em formato de **árvore aninhada** para renderizar um menu, com contagem de produtos propagada dos filhos para os pais.

## Descrição detalhada do que precisa ser feito
Implemente `montarArvoreCategorias(categorias, produtos)` que:
1. Constrói uma árvore aninhada a partir da lista flat de categorias (raízes são as que têm `parentId: null`).
2. Cada nó deve conter `id`, `nome`, `children` (array, possivelmente vazio) e `totalProdutos`.
3. `totalProdutos` de um nó = produtos atribuídos **diretamente** a ele + soma dos `totalProdutos` de **todos os descendentes** (propagação recursiva).
4. `children` de cada nó devem estar ordenados por `nome` (alfabético, case-insensitive).
5. As raízes retornadas também ordenadas por `nome`.

## Entrada
```js
const categorias = [
  { id: 1, nome: "Eletrônicos", parentId: null },
  { id: 2, nome: "Computadores", parentId: 1 },
  { id: 3, nome: "Notebooks", parentId: 2 },
  { id: 4, nome: "Periféricos", parentId: 2 },
  { id: 5, nome: "Casa", parentId: null },
];

const produtos = [
  { id: "p1", categoriaId: 3 },
  { id: "p2", categoriaId: 3 },
  { id: "p3", categoriaId: 4 },
  { id: "p4", categoriaId: 1 },
  { id: "p5", categoriaId: 5 },
];
```

## Saída esperada
```js
[
  {
    id: 5, nome: "Casa", totalProdutos: 1, children: []
  },
  {
    id: 1, nome: "Eletrônicos", totalProdutos: 4,
    children: [
      {
        id: 2, nome: "Computadores", totalProdutos: 3,
        children: [
          { id: 3, nome: "Notebooks",   totalProdutos: 2, children: [] },
          { id: 4, nome: "Periféricos", totalProdutos: 1, children: [] }
        ]
      }
    ]
  }
]
```

## Regras e casos especiais
- Uma categoria pode referenciar um `parentId` **inexistente** (dado corrompido). Trate essas categorias como **órfãs**: elas **não** devem aparecer na árvore, e você deve emitir/retornar a lista de ids órfãos (defina isso como segundo valor de retorno: `{ arvore, orfas }`).
- Pode haver produtos apontando para `categoriaId` inexistente — ignore-os na contagem.
- A árvore pode ter **profundidade arbitrária**.
- Cuidado com **ciclos** (ex.: A → B → A por dado inconsistente): a função não deve entrar em loop infinito; categorias envolvidas em ciclo devem ser tratadas como órfãs/descartadas.
- Não assuma que a lista de entrada está ordenada (o pai pode aparecer depois do filho).

## Restrições
- Até **200.000 categorias** e **2.000.000 de produtos**.
- Profundidade pode chegar a milhares de níveis — soluções puramente recursivas ingênuas podem estourar a pilha; considere isso.

## O que o exercício avalia
- Construção de estrutura hierárquica a partir de dados flat.
- Propagação de agregações bottom-up.
- Uso eficiente de `Map` para indexação de nós.
- Detecção de ciclos e órfãos.
- Preocupação com profundidade / stack overflow.

## Complexidade esperada
O(c + p) para indexar e contar, mais O(c log c) somado nas ordenações de `children`.

## Casos de teste adicionais
```js
// Caso A — parentId inexistente (órfã)
const catA = [
  { id: 1, nome: "Raiz", parentId: null },
  { id: 2, nome: "Perdida", parentId: 999 },
];

// Caso B — ciclo A->B->A
const catB = [
  { id: 1, nome: "A", parentId: 2 },
  { id: 2, nome: "B", parentId: 1 },
];

// Caso C — pai declarado depois do filho
const catC = [
  { id: 10, nome: "Filho", parentId: 20 },
  { id: 20, nome: "Pai", parentId: null },
];
```
