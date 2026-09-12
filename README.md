# 🥋 debug-dojo

> Dojô de debugging — exercícios práticos de investigação e conserto de código real, focados em causa raiz, estado e edge cases.

Este repositório reúne desafios de **manutenção, debugging e evolução de aplicações existentes**
(não é sobre criar app do zero). Cada projeto vem **parcialmente implementado**, com bugs
intencionais e problemas de design que precisam ser descobertos lendo o código, executando e
testando — como uma tarefa real que cai no seu colo em um sistema em produção.

O objetivo não é decorar framework, e sim treinar: entender código existente, investigar,
achar a **causa raiz**, pensar em **estados e fluxos**, lidar com **edge cases** e tomar
decisões técnicas sustentáveis.

## Desafios

| Projeto | Stack | Tema |
|---|---|---|
| [`exercicio-frontend-chat`](./exercicio-frontend-chat) | React + TypeScript (Vite) | Chat de suporte — bug no fluxo de envio, estado local, erro e UX |
| [`exercicio-frontend`](./exercicio-frontend) | React + TypeScript (Vite) | Painel de cupons — busca assíncrona, formulário, estados |
| [`exercicio-backend`](./exercicio-backend) | Node + TypeScript (Express) | API de pedidos — estoque, cupons, pagamento, concorrência |
| [`leetcode`](./leetcode) | JavaScript | Aquecimentos e exercícios de lógica/algoritmos |

Cada pasta tem seu próprio `README.md` com contexto, instruções de execução e um checklist
do comportamento esperado. Os bugs **não** são revelados — a graça é encontrá-los.

## Como usar

```bash
cd <pasta-do-desafio>
npm install
npm run dev     # front-ends (Vite)
npm test        # back-end (Jest)
```

## Regras do dojô

- Trate os arquivos que simulam backend/rede/serviços externos como **imutáveis**: o desafio é
  a aplicação reagir corretamente a eles, não "facilitar" o mock.
- Persistência em memória é proposital — o foco é raciocínio de engenharia, não infra.
- Antes de corrigir, entenda o **fluxo**. Depois, pense no caminho infeliz tanto quanto no feliz.
