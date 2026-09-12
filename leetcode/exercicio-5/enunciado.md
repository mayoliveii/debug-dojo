# Exercício 5 — Motor de Métricas de Séries Temporais com Janelas e Sessões

**Nível:** Sênior

## Contexto do problema
Você trabalha com **logs de eventos** de uma aplicação (page views, clicks, erros). O time de produto quer métricas agregadas: eventos por **janela de tempo fixa**, identificação de **sessões de usuário** (agrupando eventos próximos no tempo), e detecção de **usuários com comportamento anômalo** (bursts de erro). Tudo isso a partir de um único stream de eventos desordenado.

## Descrição detalhada do que precisa ser feito
Implemente `analisarEventos(eventos, opcoes)`. Cada evento tem `userId`, `tipo` (`"view" | "click" | "error"`), e `timestamp` (ISO 8601). `opcoes` traz `janelaMinutos` (tamanho da janela fixa para buckets) e `gapSessaoMinutos` (intervalo máximo entre dois eventos consecutivos do mesmo usuário para pertencerem à mesma sessão).

Retorne um objeto com três blocos:

1. **`buckets`** — agregação por janela de tempo fixa (alinhada ao início da hora epoch), contendo, para cada bucket: `inicio` (ISO), `contagemPorTipo` (`{ view, click, error }`) e `usuariosUnicos`. Ordenados cronologicamente.

2. **`sessoes`** — para cada usuário, a lista de sessões. Uma sessão termina quando o gap entre dois eventos consecutivos (ordenados no tempo) do usuário excede `gapSessaoMinutos`. Cada sessão traz `inicio`, `fim`, `duracaoSegundos`, `quantidadeEventos`.

3. **`usuariosAnomalos`** — lista de `userId` que tiveram, em **qualquer janela deslizante de 60 segundos**, **5 ou mais** eventos do tipo `"error"`. Ordenada por `userId`.

## Entrada
```js
const eventos = [
  { userId: "u1", tipo: "view",  timestamp: "2026-09-01T10:00:05Z" },
  { userId: "u1", tipo: "click", timestamp: "2026-09-01T10:00:40Z" },
  { userId: "u1", tipo: "view",  timestamp: "2026-09-01T10:20:00Z" }, // nova sessão (gap > 10min)
  { userId: "u2", tipo: "error", timestamp: "2026-09-01T10:00:10Z" },
  { userId: "u2", tipo: "error", timestamp: "2026-09-01T10:00:12Z" },
  { userId: "u2", tipo: "error", timestamp: "2026-09-01T10:00:15Z" },
  { userId: "u2", tipo: "error", timestamp: "2026-09-01T10:00:20Z" },
  { userId: "u2", tipo: "error", timestamp: "2026-09-01T10:00:25Z" }, // 5 erros em <60s → anômalo
];

const opcoes = { janelaMinutos: 15, gapSessaoMinutos: 10 };
```

## Saída esperada
```js
{
  buckets: [
    {
      inicio: "2026-09-01T10:00:00Z",
      contagemPorTipo: { view: 1, click: 1, error: 5 },
      usuariosUnicos: 2
    },
    {
      inicio: "2026-09-01T10:15:00Z",
      contagemPorTipo: { view: 1, click: 0, error: 0 },
      usuariosUnicos: 1
    }
  ],
  sessoes: {
    u1: [
      { inicio: "2026-09-01T10:00:05Z", fim: "2026-09-01T10:00:40Z", duracaoSegundos: 35, quantidadeEventos: 2 },
      { inicio: "2026-09-01T10:20:00Z", fim: "2026-09-01T10:20:00Z", duracaoSegundos: 0,  quantidadeEventos: 1 }
    ],
    u2: [
      { inicio: "2026-09-01T10:00:10Z", fim: "2026-09-01T10:00:25Z", duracaoSegundos: 15, quantidadeEventos: 5 }
    ]
  },
  usuariosAnomalos: ["u2"]
}
```

## Regras e casos especiais
- O stream de eventos **chega desordenado**; você precisa ordenar por tempo onde for necessário (por usuário, para sessões; globalmente/por bucket, para agregação).
- Buckets são de tamanho fixo `janelaMinutos`, **alinhados** a partir do epoch (00:00:00Z). Buckets sem eventos **não** aparecem na saída (apenas buckets com pelo menos 1 evento).
- `usuariosUnicos` conta usuários distintos dentro do bucket.
- Uma sessão de um único evento tem `duracaoSegundos: 0`.
- Anomalia usa **janela deslizante** (não bucket fixo): 5+ erros dentro de qualquer intervalo de 60 segundos contínuos. Um usuário pode ter sessões normais e ainda ser anômalo.
- Timestamps podem vir com precisão de segundos; assuma UTC. Eventos com `timestamp` inválido devem ser descartados silenciosamente.
- `tipo` fora do conjunto `{view, click, error}` deve ser descartado completamente (não conta para bucket nem para sessão).

## Restrições
- Até **5.000.000 de eventos**.
- Até **500.000 usuários**.
- Ordenar tudo de uma vez pode ser caro; pense em ordenar por partição (por usuário para sessões) e em detecção de burst com janela deslizante em O(n) por usuário (ponteiros/duas pontas), sem varrer O(n²).

## O que o exercício avalia
- Bucketização temporal com alinhamento por epoch.
- Sessionização (agrupamento por gap temporal).
- Janela deslizante para detecção de burst (two-pointer).
- Ordenação por partição e agregações múltiplas em uma passada por dimensão.
- Uso combinado de `Map`/`Set`.
- Robustez a dados inválidos.
- Raciocínio sobre performance em grande escala.

## Complexidade esperada
Sessões: O(n log n) dominado pela ordenação por usuário (ou O(n log k) por partição). Buckets: O(n). Anomalia: O(n) por usuário com two-pointer sobre os erros já ordenados. Global aceitável: O(n log n).

## Casos de teste adicionais
```js
// Caso A — erros espalhados, nenhum burst de 5 em 60s
const a = {
  eventos: [
    { userId: "x", tipo: "error", timestamp: "2026-09-01T10:00:00Z" },
    { userId: "x", tipo: "error", timestamp: "2026-09-01T10:00:30Z" },
    { userId: "x", tipo: "error", timestamp: "2026-09-01T10:01:10Z" }, // fora dos 60s do 1º
    { userId: "x", tipo: "error", timestamp: "2026-09-01T10:01:40Z" },
  ],
  opcoes: { janelaMinutos: 30, gapSessaoMinutos: 5 }
};

// Caso B — eventos desordenados e tipo desconhecido
const b = {
  eventos: [
    { userId: "y", tipo: "click", timestamp: "2026-09-01T09:59:59Z" },
    { userId: "y", tipo: "view",  timestamp: "2026-09-01T09:00:00Z" },
    { userId: "y", tipo: "scroll", timestamp: "2026-09-01T09:30:00Z" }, // descartar
    { userId: "y", tipo: "view",  timestamp: "invalido" },              // descartar
  ],
  opcoes: { janelaMinutos: 60, gapSessaoMinutos: 15 }
};

// Caso C — exatamente 5 erros no limite dos 60s
const c = {
  eventos: [
    { userId: "z", tipo: "error", timestamp: "2026-09-01T12:00:00Z" },
    { userId: "z", tipo: "error", timestamp: "2026-09-01T12:00:20Z" },
    { userId: "z", tipo: "error", timestamp: "2026-09-01T12:00:40Z" },
    { userId: "z", tipo: "error", timestamp: "2026-09-01T12:00:59Z" },
    { userId: "z", tipo: "error", timestamp: "2026-09-01T12:01:00Z" }, // fronteira de 60s
  ],
  opcoes: { janelaMinutos: 10, gapSessaoMinutos: 5 }
};
```
