# Exercício Front-end — Painel de Cupons

Aplicação em **React + TypeScript** (Vite) que gerencia cupons de desconto de uma loja.
O projeto já está **parcialmente implementado** e faz parte de um sistema real.

Você recebeu este projeto como se fosse uma tarefa de manutenção: existe um backlog de
comportamentos que **deveriam** funcionar corretamente, mas alguns clientes e o time de QA
relataram que "às vezes a tela mostra coisas estranhas". Sua missão é colocar a aplicação
em conformidade com o comportamento esperado.

## Requisitos

- Node.js 18+

## Como executar

```bash
cd exercicio-frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Para checar tipos:

```bash
npm run typecheck
```

## O que a aplicação faz

- Lista os cupons cadastrados.
- Permite **buscar** cupons por código ou descrição.
- Permite **criar** um novo cupom.
- Permite **ativar/desativar** um cupom.

> A camada de API (`src/api/couponService.ts`) simula um backend real, com **latência
> variável** e **falhas ocasionais**. Trate esse arquivo como o servidor: ele não deve ser
> alterado para "facilitar" — a aplicação precisa se comportar corretamente mesmo com uma
> rede instável.

## Objetivo

Deixar a aplicação **correta e robusta**, de acordo com o comportamento esperado e o
checklist abaixo.

## Comportamento esperado

- A busca deve sempre exibir resultados **coerentes com o texto atual** do campo de busca.
- Os estados de **carregando**, **sucesso** e **erro** devem refletir a realidade em todas as operações.
- A criação de cupom deve validar a entrada e **impedir envios inválidos ou duplicados**.
- O status exibido de cada cupom deve ser **consistente** com o estado real no servidor.
- A interface deve dar **feedback claro** ao usuário e ser utilizável via teclado/leitor de tela.
- Nenhuma ação do usuário deve deixar a interface em um estado **incorreto ou "preso"**.

## Checklist

Considere a tarefa concluída quando todos os itens abaixo forem verdadeiros.

**Fluxo de sucesso**
- [ ] Listar cupons funciona e mostra os dados corretos.
- [ ] Buscar cupons retorna resultados coerentes com o termo digitado.
- [ ] Criar um cupom válido adiciona o cupom à lista e dá feedback de sucesso.
- [ ] Ativar/desativar um cupom reflete o resultado real da operação.

**Fluxo de erro**
- [ ] Erros da API são exibidos de forma clara ao usuário.
- [ ] Uma operação que falha não deixa a interface em estado inconsistente.
- [ ] É possível se recuperar de um erro sem recarregar a página.

**Loading**
- [ ] Há indicação de carregamento durante operações assíncronas.
- [ ] O indicador de carregamento aparece e some no momento correto.

**Estado local**
- [ ] O estado exibido corresponde ao estado real dos dados.
- [ ] Não há estados "presos" (ex.: loading infinito, botão travado).

**Edge cases**
- [ ] Buscas rápidas e sucessivas não produzem resultados incorretos.
- [ ] Entradas inválidas ou vazias são tratadas adequadamente.
- [ ] Valores fora do intervalo esperado são rejeitados.

**UX**
- [ ] O usuário sempre entende o que está acontecendo (sucesso, erro, carregando).
- [ ] Mensagens de sucesso/erro não ficam obsoletas na tela.

**Acessibilidade**
- [ ] Campos de formulário e controles são utilizáveis por teclado e leitores de tela.
- [ ] Estados dinâmicos importantes são percebíveis por tecnologia assistiva.

**Prevenção de ações duplicadas**
- [ ] Não é possível criar cupons duplicados por cliques repetidos.
- [ ] Ações assíncronas em andamento não podem ser disparadas de novo indevidamente.

**Consistência da interface**
- [ ] A lista renderiza corretamente após criar, filtrar e alternar cupons.
- [ ] Os dados exibidos permanecem consistentes após múltiplas operações.
```
