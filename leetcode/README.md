# Leetcode — Transformação e Organização de Dados (JS/TS)

5 exercícios progressivos de algoritmos focados em transformação, processamento e organização de dados. Nível **Pleno → Sênior**.

## Índice
1. [Exercício 1 — Consolidação de Carrinhos por Usuário](./exercicio-1/enunciado.md) — *Pleno*
2. [Exercício 2 — Normalização e Correlação de Pedidos com Clientes](./exercicio-2/enunciado.md) — *Pleno*
3. [Exercício 3 — Construção de Árvore de Categorias](./exercicio-3/enunciado.md) — *Pleno/Sênior*
4. [Exercício 4 — Deduplicação e Merge de Registros de Múltiplas Fontes](./exercicio-4/enunciado.md) — *Sênior*
5. [Exercício 5 — Motor de Métricas de Séries Temporais](./exercicio-5/enunciado.md) — *Sênior*

Resolva na ordem: 1 e 2 firmam indexação/agregação/correlação; 3 introduz hierarquia e ciclos; 4 exige union-find/componentes conexas; 5 combina bucketização, sessionização e janela deslizante sob pressão de escala.

Sugestão: crie um `solucao.js` (ou `.ts`) dentro de cada pasta e implemente ali.

---

## Critérios de avaliação

### 🔴 Solução fraca (abaixo de Pleno)
- **Corretude:** passa nos casos "felizes", mas quebra em edge cases (nulos, órfãos, empates, entrada vazia, timestamps inválidos).
- **Estruturas de dados:** usa `array.find`/`includes` dentro de loops → O(n²) onde um `Map`/`Set` resolveria em O(1).
- **Legibilidade:** nomes genéricos, funções gigantes, lógica duplicada.
- **Edge cases:** ignorados ou remendados com `if`s espalhados.
- **Eficiência:** múltiplas passadas desnecessárias; recalcula o que poderia indexar uma vez.
- **Raciocínio:** não fica claro por que a solução funciona.

### 🟡 Solução adequada para Pleno
- **Corretude:** passa em todos os casos fornecidos e edge cases descritos.
- **Estruturas de dados:** `Map`/`Set`/objetos de índice; lookups O(1); agrupa por indexação.
- **Legibilidade:** nomes descritivos, funções com responsabilidade única, etapas claras (normalizar → indexar → agregar → ordenar).
- **Edge cases:** tratados de forma centralizada (ex.: `normalizar`/`ehValido`).
- **Eficiência:** respeita a complexidade esperada; evita loops aninhados desnecessários.
- **Complexidade:** consegue justificar tempo e espaço da própria solução.

### 🟢 Solução excelente (Pleno/Sênior)
- **Corretude:** antecipa edge cases não listados (ciclos, transitividade, fronteiras de janela, overflow de pilha, precisão de float monetário).
- **Estruturas de dados:** escolhe a estrutura certa — union-find, two-pointer, `Map` de adjacência — e explica o porquê.
- **Legibilidade:** código modular e testável; fácil de estender (novo tipo de evento, nova fonte).
- **Edge cases:** tratados por design; estados inválidos difíceis de representar.
- **Eficiência:** complexidade ótima (ou trade-off consciente); uma passada onde possível; pensa em memória na escala de milhões.
- **Complexidade temporal e espacial:** analisada com precisão; trade-offs conscientes.
- **Evitar loops desnecessários:** combina agregações em uma varredura quando faz sentido, sem sacrificar clareza.
- **Organização do raciocínio:** a solução conta uma história clara; comentários explicam o *porquê*, não o *o quê*.
