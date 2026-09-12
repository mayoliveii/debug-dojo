# Exercício Front-end — Chat de Suporte

Aplicação em **React + TypeScript** (Vite) que implementa um **chat de suporte** ao cliente.
O projeto já está **parcialmente implementado** e faz parte de um produto real.

Você recebeu esta base como uma tarefa de manutenção. O time de produto e o QA relataram que
"o envio de mensagem está estranho" e abriram um chamado genérico. Cabe a você investigar,
entender o fluxo, encontrar a causa e deixar a experiência de envio **correta, confiável e
agradável** para o usuário.

## Requisitos

- Node.js 18+

## Como executar

```bash
cd exercicio-frontend-chat
npm install
npm run dev        # abre em http://localhost:5174
npm run typecheck  # checagem de tipos
```

## O que a aplicação faz

- Carrega o histórico da conversa.
- Permite ao usuário **escrever e enviar** mensagens.
- Mostra o estado de cada mensagem enviada (**enviando / enviada / falhou**).

> A camada de API (`src/api/chatService.ts`) simula o backend real, com **latência variável**
> e **falhas ocasionais no envio**. Trate esse arquivo como o servidor — a aplicação precisa
> se comportar corretamente mesmo com uma rede instável e com respostas que demoram ou falham.

## Objetivo

Garantir que o **fluxo de envio de mensagem** funcione de forma correta e previsível: a
mensagem do usuário deve aparecer na tela, refletir seu estado real, sobreviver a envios
sucessivos e lidar bem com erros — sem perder mensagens nem deixar a interface inconsistente.

## Comportamento esperado

- Ao enviar, a mensagem do usuário deve **aparecer imediatamente** na conversa.
- O histórico e as mensagens anteriores **nunca devem sumir** ao enviar uma nova.
- O **estado** de cada mensagem (enviando/enviada/falhou) deve refletir a realidade.
- Enviar várias mensagens em sequência deve **preservar todas** elas, na ordem certa.
- Falhas de envio devem ser **visíveis** ao usuário, com um caminho de recuperação.
- A composição da mensagem deve ter uma **UX cuidadosa** (o que acontece com o campo,
  com envios vazios, com cliques repetidos, com o teclado, com a rolagem etc.).

## Checklist

**Fluxo de sucesso**
- [ ] Enviar uma mensagem faz ela aparecer na conversa.
- [ ] A mensagem enviada passa por "enviando" e depois "enviada".
- [ ] O histórico continua visível após enviar.

**Fluxo de erro**
- [ ] Uma falha de envio fica visível para o usuário.
- [ ] Existe uma forma de reagir/recuperar de uma mensagem que falhou.
- [ ] Um erro em uma mensagem não afeta as demais.

**Estado local**
- [ ] O que aparece na tela corresponde ao estado real das mensagens.
- [ ] Nenhuma mensagem é perdida ou sobrescrita indevidamente.

**Edge cases**
- [ ] Enviar várias mensagens rapidamente preserva todas, na ordem correta.
- [ ] Mensagens vazias ou só com espaços são tratadas adequadamente.
- [ ] Mensagens muito longas / com quebras de linha se comportam bem.

**UX / produto**
- [ ] O campo de texto se comporta de forma esperada após o envio.
- [ ] O usuário entende o que está acontecendo em cada etapa.
- [ ] A conversa rola para a mensagem mais recente quando faz sentido.

**Prevenção de ações duplicadas**
- [ ] Cliques repetidos / envios acidentais não geram mensagens duplicadas indevidas.

**Acessibilidade**
- [ ] O envio funciona bem via teclado.
- [ ] Novas mensagens são percebíveis por tecnologia assistiva.

**Consistência da interface**
- [ ] A lista de mensagens renderiza corretamente após múltiplos envios e erros.
```
