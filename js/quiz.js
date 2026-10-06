// Fluxo do questionário: escolher o momento, responder e registrar.
(function () {
  const $ = (id) => document.getElementById(id);
  const stepMoment = $('step-moment');
  const stepQuiz = $('step-quiz');
  const stepDone = $('step-done');
  const form = $('quiz-form');
  let moment = null;
  let participant = null;

  function show(step) {
    [stepMoment, stepQuiz, stepDone].forEach((el) => el.classList.toggle('hidden', el !== step));
    window.scrollTo(0, 0);
  }

  function renderQuestions() {
    const holder = $('questions');
    holder.innerHTML = '';
    QUESTIONS.forEach((q, i) => {
      const fieldset = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.textContent = `Pergunta ${i + 1} de ${QUESTIONS.length}`;
      const text = document.createElement('p');
      text.textContent = q.text;
      fieldset.append(legend, text);
      q.options.forEach((option, j) => {
        const label = document.createElement('label');
        label.className = 'option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${i}`;
        input.value = String(j);
        input.required = true;
        label.append(input, document.createTextNode(option));
        fieldset.append(label);
      });
      holder.append(fieldset);
    });
  }

  function start(chosenMoment, chosenParticipant) {
    moment = chosenMoment;
    participant = chosenParticipant;
    $('quiz-title').textContent =
      moment === 'before' ? 'Questionário antes da oficina' : 'Questionário depois da oficina';
    $('participant-label').textContent = `Você é o Participante ${participant}.`;
    renderQuestions();
    show(stepQuiz);
  }

  function renderDone(record) {
    const message = $('done-message');
    const review = $('review');
    review.innerHTML = '';
    if (record.moment === 'before') {
      message.textContent =
        `Respostas registradas. Você é o Participante ${record.participant}. ` +
        'Guarde este número: ele será usado no questionário depois da oficina.';
      return;
    }
    message.textContent =
      `Participante ${record.participant}: você acertou ${record.score} de ${QUESTIONS.length} perguntas.`;
    QUESTIONS.forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'card';
      const title = document.createElement('h3');
      title.textContent = `Pergunta ${i + 1}`;
      const right = document.createElement('p');
      right.className = 'correct';
      right.textContent = `Resposta correta: ${q.options[q.answer]}`;
      const why = document.createElement('p');
      why.className = 'feedback';
      why.textContent = q.explanation;
      item.append(title, right, why);
      review.append(item);
    });
  }

  function refreshAfterOptions() {
    const pending = pendingAfter(loadRecords(localStorage));
    const select = $('participant-select');
    select.innerHTML = '';
    pending.forEach((n) => {
      const option = document.createElement('option');
      option.value = String(n);
      option.textContent = `Participante ${n}`;
      select.append(option);
    });
    $('after-box').classList.toggle('hidden', pending.length === 0);
    $('after-empty').classList.toggle('hidden', pending.length > 0);
  }

  $('start-before').addEventListener('click', () => {
    start('before', nextParticipant(loadRecords(localStorage)));
  });

  $('start-after').addEventListener('click', () => {
    start('after', Number($('participant-select').value));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const answers = QUESTIONS.map((_, i) => Number(data.get(`q${i}`)));
    const record = { participant, moment, answers, score: scoreAnswers(QUESTIONS, answers) };
    try {
      saveRecord(localStorage, record);
    } catch (e) {
      alert('Não foi possível registrar as respostas neste aparelho. Anote os acertos manualmente.');
    }
    renderDone(record);
    show(stepDone);
  });

  $('next-participant').addEventListener('click', () => {
    form.reset();
    refreshAfterOptions();
    show(stepMoment);
  });

  refreshAfterOptions();
})();
