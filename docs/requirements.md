# Requisitos

Baseline de requisitos da versão 1.0.0.

## Requisitos funcionais

| ID | Requisito | Onde está |
|---|---|---|
| RF01 | Exibir a cartilha com os golpes comuns no WhatsApp e no Pix e as formas de prevenção | `index.html` |
| RF02 | Apresentar um questionário de seis perguntas de múltipla escolha | `quiz.html`, `js/questions.js` |
| RF03 | Permitir responder o questionário em dois momentos: antes e depois da oficina | `js/quiz.js` |
| RF04 | Identificar cada participante apenas por um número sequencial | `js/storage.js` |
| RF05 | Registrar as respostas no próprio aparelho | `js/storage.js` |
| RF06 | Exibir a tabela de acertos antes e depois por participante e os acertos por pergunta | `results.html`, `js/results.js` |
| RF07 | Exportar a tabela de resultados em CSV | `js/results.js` |
| RF08 | Permitir apagar os registros do aparelho, com confirmação | `js/results.js` |

## Requisitos não funcionais

| ID | Requisito | Como é atendido |
|---|---|---|
| RNF01 | Privacidade: não coletar nome nem dado pessoal | O registro guarda somente número do participante, momento, respostas e acertos |
| RNF02 | Portabilidade: funcionar em celular e em computador | Layout responsivo, verificado em tela de 390 px de largura |
| RNF03 | Acessibilidade: texto grande, alto contraste e linguagem simples | Fonte base ampliada, cores de alto contraste e frases curtas, seguindo os Princípios do Desenho Universal |
| RNF04 | Disponibilidade sem custo: funcionar sem servidor próprio | Site estático publicado no GitHub Pages |
| RNF05 | Tolerância ao erro: impedir envio incompleto e exclusão acidental | Todas as perguntas são obrigatórias e a exclusão pede confirmação |
| RNF06 | Software livre e rastreável | Código aberto sob licença MIT, versionado no GitHub |
