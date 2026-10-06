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

A única requisição externa do site é a da fonte tipográfica, carregada do Google Fonts. Sem acesso
à Internet o site continua funcionando com a fonte do próprio aparelho.

## Identidade visual

A cartilha abre com uma mensagem de golpe e as pistas marcadas de amarelo, como em uma folha
riscada com marca-texto. As cores têm sempre o mesmo significado:

| Cor | Código | Onde aparece |
|---|---|---|
| Papel | `#FFFFFF` | Fundo |
| Tinta azul-noite | `#152A45` | Texto, títulos e botões |
| Marca-texto | `#FFE14A` | Somente sobre uma pista de golpe |
| Verde | `#0F6B4F` | Somente em "O que fazer" e nos acertos |
| Vermelho | `#B3261E` | Passos de emergência, erros e exclusão de registros |
| Cinza-conversa | `#E4EAEE` | Fundo das mensagens de exemplo |

A fonte é a Atkinson Hyperlegible Next, criada pelo Braille Institute para leitores com baixa
visão. Ela diferencia letras e números parecidos (0 e O, 1 e l), o que ajuda em um material sobre
códigos, senhas e chaves Pix.

Há uma única animação automática: na abertura, as mensagens do exemplo chegam uma a uma e as pistas
são marcadas em sequência. Ela não roda para quem pede menos movimento nas configurações do
aparelho. O restante só responde a uma ação: o link do golpe de exemplo avisa quem clicou, a lista
"Proteja sua conta" pode ser marcada item a item (sem guardar nada no aparelho) e o questionário
mostra quais perguntas já foram respondidas.

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
js/booklet.js   interações da cartilha
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
