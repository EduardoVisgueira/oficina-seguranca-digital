# Plano de gerência de configuração

Define como os artefatos do projeto são identificados, versionados, alterados e auditados.

## Itens de configuração

| Item | Arquivos | Descrição |
|---|---|---|
| Cartilha | `index.html` | Conteúdo educativo apresentado na oficina |
| Questionário | `quiz.html`, `js/questions.js`, `js/quiz.js` | Perguntas, gabarito e fluxo de resposta |
| Registro e resultados | `js/storage.js`, `js/results.js`, `results.html` | Registro local, cálculo e exportação |
| Estilos | `css/style.css` | Aparência e responsividade |
| Documentação | `README.md`, `docs/` | Requisitos, este plano e o roteiro da oficina |
| Testes | `tests/e2e.mjs` | Teste ponta a ponta do questionário e dos resultados |

## Ferramentas

| Ferramenta | Uso |
|---|---|
| Git | Controle de versão local |
| GitHub | Repositório remoto, histórico de mudanças e marcação de versões |
| GitHub Pages | Publicação do site a partir do ramo `main` |
| Google Chrome | Execução do site e do teste ponta a ponta em modo sem janela |
| Node.js | Execução do teste ponta a ponta |

## Versões e baselines

As versões seguem o formato `MAIOR.MENOR.CORREÇÃO` e são marcadas com tags no Git.

| Versão | Baseline | Conteúdo |
|---|---|---|
| v0.1.0 | Cartilha | Página da cartilha, estilos e descrição do projeto |
| v0.2.0 | Questionário | Questionário antes/depois, registro local e página de resultados |
| v1.0.0 | Site completo | Site completo, requisitos, plano e roteiro |
| v1.1.0 | Oficina | Versão usada na oficina: identidade visual própria e interações da cartilha e do questionário |

Correções feitas depois da oficina entram como `v1.1.x`. Mudanças de conteúdo motivadas pelo retorno
dos participantes entram como `v1.2.0`.

## Controle de mudanças

1. Toda mudança é feita em um commit com mensagem que descreve o que mudou.
2. O ramo `main` contém sempre a versão publicada no GitHub Pages.
3. Antes de marcar uma versão, o teste ponta a ponta é executado e precisa passar por completo.
4. Mudanças em requisitos são registradas primeiro em `docs/requirements.md`.

## Auditoria de configuração

Auditoria da baseline v1.1.0, feita antes da oficina.

| # | Verificação | Resultado |
|---|---|---|
| 1 | O código e a documentação estão versionados no GitHub? | (X) Sim ( ) Não |
| 2 | Cada baseline possui uma tag no repositório? | (X) Sim ( ) Não |
| 3 | Os requisitos funcionais RF01 a RF08 estão implementados? | (X) Sim ( ) Não |
| 4 | O teste ponta a ponta passa por completo (28 verificações)? | (X) Sim ( ) Não |
| 5 | O site publicado no GitHub Pages está acessível? | (X) Sim ( ) Não |
| 6 | O registro do questionário guarda somente dados anônimos (RNF01)? | (X) Sim ( ) Não |
| 7 | As páginas cabem em tela de celular sem corte (RNF02)? | (X) Sim ( ) Não |
| 8 | A cartilha foi revisada com base no retorno dos participantes? | ( ) Sim (X) Não |

O item 8 só pode ser atendido depois da oficina e será reavaliado na versão seguinte.
