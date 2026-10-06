// Perguntas do questionário aplicado antes e depois da oficina.
// "answer" é o índice da alternativa correta em "options".
const QUESTIONS = [
  {
    text: 'Um número desconhecido, com a foto de um familiar, escreve: "Troquei de número. Preciso de um Pix urgente". O que você faz?',
    options: [
      'Faço o Pix, porque a foto é da pessoa.',
      'Ligo para o número antigo da pessoa para confirmar antes de qualquer coisa.',
      'Peço a chave Pix e envio um valor menor.',
      'Respondo perguntando quanto ela precisa.'
    ],
    answer: 1,
    explanation: 'Foto qualquer um copia. Confirme sempre pelo número que você já tinha.'
  },
  {
    text: 'Alguém pede o código de 6 números que acabou de chegar por SMS no seu celular. O que é esse código?',
    options: [
      'Um código de promoção, posso informar.',
      'Um código de cadastro de loja, posso informar.',
      'O código do meu WhatsApp. Nunca devo informar a ninguém.',
      'Um código sem importância.'
    ],
    answer: 2,
    explanation: 'Com esse código o golpista assume a sua conta do WhatsApp.'
  },
  {
    text: 'Uma pessoa liga dizendo ser do banco, avisa que sua conta foi invadida e pede um Pix para uma "conta segura". O que você faz?',
    options: [
      'Transfiro logo, para proteger o dinheiro.',
      'Informo minha senha para a pessoa bloquear a conta.',
      'Desligo e ligo eu mesmo para o número oficial do banco.',
      'Instalo o aplicativo que a pessoa indicar.'
    ],
    answer: 2,
    explanation: 'Banco não pede transferência, senha nem código por telefone.'
  },
  {
    text: 'Qual recurso protege o seu WhatsApp contra clonagem?',
    options: [
      'Trocar a foto do perfil.',
      'Confirmação em duas etapas, com um PIN criado por você.',
      'Apagar as conversas antigas.',
      'Usar o WhatsApp só no Wi-Fi.'
    ],
    answer: 1,
    explanation: 'Fica em Configurações > Conta > Confirmação em duas etapas.'
  },
  {
    text: 'Alguém diz que fez um Pix para você por engano e pede a devolução para outra chave. O que você faz?',
    options: [
      'Faço um novo Pix para a chave que a pessoa mandou.',
      'Confio no comprovante que a pessoa enviou.',
      'Confiro o extrato e, se o valor entrou, devolvo somente pela opção de devolução do aplicativo do banco.',
      'Ignoro e fico com o dinheiro.'
    ],
    answer: 2,
    explanation: 'A devolução pelo aplicativo volta para a conta de origem. Um novo Pix pode ir para o golpista.'
  },
  {
    text: 'Você recebe uma mensagem com um link de promoção que termina hoje. Qual é a atitude mais segura?',
    options: [
      'Clico rápido para não perder.',
      'Encaminho para a família antes de abrir.',
      'Não clico e procuro a promoção no site ou aplicativo oficial da loja.',
      'Informo meus dados para ver se é verdade.'
    ],
    answer: 2,
    explanation: 'Pressa e link são sinais de golpe. Vá ao canal oficial por conta própria.'
  }
];

if (typeof module !== 'undefined') {
  module.exports = { QUESTIONS };
}
