# Oficina de Segurança Digital: golpes no WhatsApp e Pix

Cartilha educativa em formato de site, usada como material de apoio de uma oficina presencial de
segurança digital realizada em Fortaleza – CE.

**Site:** https://eduardovisgueira.github.io/oficina-seguranca-digital/

Projeto da disciplina Atividade Extensionista III: Tecnologia Aplicada à Inclusão Digital – Análise,
do curso de Bacharelado em Engenharia de Software (UNINTER).

## O que o site faz

- **Cartilha** (`index.html`): como o golpista age, golpes comuns no WhatsApp e no Pix, como verificar
  uma mensagem antes de agir, como proteger a conta e o que fazer depois de um golpe.
- **Questionário** (`quiz.html`): seis perguntas de múltipla escolha, respondidas antes e depois da
  oficina.
- **Resultados** (`results.html`): tabela de acertos antes e depois por participante, acertos por
  pergunta e exportação em CSV.

## Privacidade

O site não pede nome nem dado pessoal. Cada pessoa recebe apenas um número de participante. As
respostas ficam guardadas somente no aparelho em que o questionário foi respondido (`localStorage`) e
não são enviadas para nenhum servidor.

## Como usar na oficina

1. Abra o questionário em um único aparelho e peça que cada participante responda "antes da oficina".
2. Apresente a cartilha.
3. No mesmo aparelho, cada participante responde "depois da oficina" escolhendo o seu número.
4. Abra a página de resultados e exporte a tabela em CSV.

O roteiro completo está em [docs/workshop-guide.md](docs/workshop-guide.md).

## Estrutura

```
index.html      cartilha
quiz.html       questionário antes/depois
results.html    resultados e exportação
css/style.css   estilos
js/questions.js perguntas e gabarito
js/storage.js   registro local e cálculo dos resultados
js/quiz.js      fluxo do questionário
js/results.js   tela de resultados
docs/           requisitos, plano de gerência de configuração e roteiro da oficina
tests/e2e.mjs   teste ponta a ponta
```

## Documentação

- [Requisitos](docs/requirements.md)
- [Plano de gerência de configuração](docs/configuration-management-plan.md)
- [Roteiro da oficina](docs/workshop-guide.md)

## Executar localmente

O site é estático. Basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor
HTTP simples.

## Autor

Eduardo Visgueira do Vale

## Licença

[MIT](LICENSE)
