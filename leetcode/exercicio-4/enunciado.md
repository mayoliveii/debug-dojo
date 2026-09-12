# Exercício 4 — Deduplicação e Merge de Registros de Usuário de Múltiplas Fontes

**Nível:** Sênior

## Contexto do problema
Após a fusão de dois sistemas, você tem registros de usuários vindos de **três fontes** (CRM, plataforma de e-mail marketing, e app mobile). O mesmo indivíduo pode aparecer em mais de uma fonte, com dados parcialmente sobrepostos, alguns campos vazios, e qualidade variável. Você precisa produzir um "golden record" único por pessoa.

## Descrição detalhada do que precisa ser feito
Implemente `deduplicarUsuarios(registros)`. Cada registro tem uma `fonte`, um `prioridade` (confiabilidade da fonte), e campos de dados. Dois registros representam a **mesma pessoa** se compartilham **qualquer** um destes identificadores (após normalização): `email` (lowercase, trim) **ou** `cpf` (apenas dígitos) **ou** `telefone` (apenas dígitos, ignorando +55/0 iniciais).

A deduplicação é **transitiva**: se A e B compartilham email, e B e C compartilham telefone, então A, B e C são a mesma pessoa (um único golden record).

Para cada grupo, produza um registro consolidado onde, para **cada campo**, vence o valor do registro de **maior prioridade** que tenha aquele campo **preenchido** (não vazio/`null`). Em empate de prioridade, vence o registro **mais recentemente atualizado** (`atualizadoEm`).

O resultado deve conter também `fontes` (array ordenado das fontes que contribuíram) e `idsOriginais` (todos os ids de origem, ordenados).

## Entrada
```js
const registros = [
  {
    id: "crm-1", fonte: "crm", prioridade: 3,
    nome: "João Silva", email: "JOAO@x.com ", cpf: "111.222.333-44",
    telefone: null, atualizadoEm: "2026-06-01T10:00:00Z"
  },
  {
    id: "mail-9", fonte: "email", prioridade: 1,
    nome: "J. Silva", email: "joao@x.com", cpf: null,
    telefone: "+55 11 99999-0000", atualizadoEm: "2026-07-10T08:00:00Z"
  },
  {
    id: "app-5", fonte: "app", prioridade: 2,
    nome: null, email: null, cpf: "11122233344",
    telefone: "011999990000", atualizadoEm: "2026-08-01T00:00:00Z"
  },
  {
    id: "crm-2", fonte: "crm", prioridade: 3,
    nome: "Maria", email: "maria@x.com", cpf: null,
    telefone: null, atualizadoEm: "2026-05-01T00:00:00Z"
  }
];
```

## Saída esperada
```js
[
  {
    // grupo {crm-1, mail-9, app-5} unificado via email + telefone + cpf
    nome: "João Silva",              // crm tem prioridade 3 e nome preenchido
    email: "joao@x.com",             // normalizado; crm prioridade 3
    cpf: "11122233344",              // normalizado (só dígitos)
    telefone: "11999990000",         // normalizado; único preenchido
    fontes: ["app", "crm", "email"],
    idsOriginais: ["app-5", "crm-1", "mail-9"]
  },
  {
    nome: "Maria",
    email: "maria@x.com",
    cpf: null,
    telefone: null,
    fontes: ["crm"],
    idsOriginais: ["crm-2"]
  }
]
```

## Regras e casos especiais
- Normalização antes de comparar: `email` → lowercase + trim; `cpf` → só dígitos; `telefone` → só dígitos, removendo prefixo `55` de país e `0` inicial de operadora quando presentes (ex.: `+55 11 99999-0000`, `011999990000` e `11999990000` são o mesmo número).
- Campos "vazios" a desconsiderar na disputa: `null`, `undefined`, string vazia ou só espaços.
- A união transitiva de identificadores é o ponto central — modele isso corretamente.
- O golden record armazena os valores **normalizados** (email lowercase, cpf/telefone só dígitos).
- A ordem dos grupos na saída deve ser **determinística**: ordene os grupos pelo menor `idsOriginais` (alfabético) do grupo.
- Cuidado: dois registros sem nenhum identificador em comum **nunca** se unem, mesmo que tenham o mesmo nome.

## Restrições
- Até **1.000.000 de registros**.
- Solução deve ser praticamente linear no número de registros e identificadores; nada de comparar todos os pares O(n²).

## O que o exercício avalia
- Agrupamento transitivo (pense em estrutura de conjuntos disjuntos / *union-find*, ou grafo + componentes conexas).
- Normalização de dados sujos.
- Resolução de conflitos por regra de prioridade + recência.
- Eficiência em escala (evitar O(n²)).
- Determinismo da saída.

## Complexidade esperada
Aproximadamente O(n · α(n)) com union-find (praticamente linear), ou O(n + m) via componentes conexas de grafo, mais ordenações locais.

## Casos de teste adicionais
```js
// Caso A — encadeamento transitivo por identificadores diferentes
const a = [
  { id: "1", fonte: "crm", prioridade: 1, email: "z@x.com", cpf: null, telefone: "11111111111", atualizadoEm: "2026-01-01T00:00:00Z" },
  { id: "2", fonte: "app", prioridade: 1, email: null, cpf: "99999999999", telefone: "11111111111", atualizadoEm: "2026-01-02T00:00:00Z" },
  { id: "3", fonte: "email", prioridade: 1, email: null, cpf: "99999999999", telefone: null, atualizadoEm: "2026-01-03T00:00:00Z" },
];

// Caso B — empate de prioridade decidido por atualizadoEm
const b = [
  { id: "old", fonte: "crm", prioridade: 2, nome: "Nome Antigo", email: "e@x.com", cpf: null, telefone: null, atualizadoEm: "2026-01-01T00:00:00Z" },
  { id: "new", fonte: "crm", prioridade: 2, nome: "Nome Novo",   email: "e@x.com", cpf: null, telefone: null, atualizadoEm: "2026-09-01T00:00:00Z" },
];

// Caso C — mesmo nome, sem identificador comum (não unir)
const c = [
  { id: "a", fonte: "crm", prioridade: 1, nome: "Ana", email: "ana1@x.com", cpf: null, telefone: null, atualizadoEm: "2026-01-01T00:00:00Z" },
  { id: "b", fonte: "crm", prioridade: 1, nome: "Ana", email: "ana2@x.com", cpf: null, telefone: null, atualizadoEm: "2026-01-01T00:00:00Z" },
];
```
