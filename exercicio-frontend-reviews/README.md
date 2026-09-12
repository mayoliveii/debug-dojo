# Exercicio Front-end - Avaliacoes do Produto

Aplicacao em React + TypeScript (Vite) com a secao de avaliacoes de uma pagina de produto.
O projeto ja esta parcialmente implementado e faz parte de um e-commerce real.

Voce recebeu esta base como uma tarefa de manutencao. O time de produto abriu um chamado
generico dizendo que "publicar uma avaliacao esta com comportamento estranho e as notas nao
batem". Cabe a voce investigar, entender o fluxo, achar a causa raiz e deixar a experiencia
correta, confiavel e agradavel.

## Requisitos

- Node.js 18+

## Como executar

```bash
cd exercicio-frontend-reviews
npm install
npm run dev        # abre em http://localhost:5175
npm run typecheck  # checagem de tipos
```

## O que a aplicacao faz

- Carrega e lista as avaliacoes do produto.
- Mostra um resumo com a nota media e o total de avaliacoes.
- Permite ao usuario publicar uma nova avaliacao (nome, nota em estrelas e comentario).

> A camada de API (`src/api/reviewService.ts`) simula o backend real, com latencia variavel e
> falhas ocasionais no envio. Trate esse arquivo como o servidor: a aplicacao precisa se
> comportar corretamente mesmo com rede instavel e respostas que demoram ou falham.

## Objetivo

Garantir que o fluxo de publicar avaliacao funcione de forma correta e previsivel: a avaliacao
deve aparecer na tela, o resumo (nota media e total) deve permanecer consistente com a lista,
os estados de envio e erro devem refletir a realidade e a entrada deve ser tratada com cuidado.

## Comportamento esperado

- Ao publicar, a nova avaliacao deve aparecer na lista.
- O resumo (nota media e total) deve ficar sempre coerente com as avaliacoes exibidas.
- O estado de envio (enviando / publicado / falhou) deve refletir a realidade.
- Falhas de publicacao devem ser visiveis para o usuario, sem deixar dados inconsistentes.
- A entrada deve ser validada (nota, comentario, nome) antes de publicar.
- A composicao da avaliacao deve ter uma UX cuidadosa (campos, envios repetidos, teclado etc.).

## Checklist

**Fluxo de sucesso**
- [ ] Publicar uma avaliacao valida faz ela aparecer na lista.
- [ ] O resumo reflete a nova avaliacao assim que ela e publicada.
- [ ] A avaliacao passa por um estado de envio ate ser confirmada.

**Fluxo de erro**
- [ ] Uma falha de publicacao fica visivel para o usuario.
- [ ] Uma publicacao que falha nao deixa a interface em estado inconsistente.
- [ ] Da para tentar novamente sem recarregar a pagina.

**Estado local / consistencia**
- [ ] A nota media e o total sempre batem com as avaliacoes mostradas.
- [ ] Nenhuma avaliacao e perdida, duplicada ou exibida com dados incorretos.

**Validacao / edge cases**
- [ ] Nao e possivel publicar sem escolher uma nota.
- [ ] Comentario vazio ou so com espacos e tratado adequadamente.
- [ ] Comentarios muito longos / com quebras de linha se comportam bem.
- [ ] O calculo da media se comporta bem em casos limite.

**UX / produto**
- [ ] Os campos se comportam de forma esperada apos o envio.
- [ ] O usuario entende o que esta acontecendo em cada etapa.

**Prevencao de acoes duplicadas**
- [ ] Cliques repetidos no botao nao publicam a mesma avaliacao varias vezes.

**Acessibilidade**
- [ ] Dar a nota e enviar funcionam via teclado.
- [ ] Os controles do formulario sao percebiveis por tecnologia assistiva.

**Consistencia da interface**
- [ ] A lista e o resumo renderizam corretamente apos varios envios e erros.
```
