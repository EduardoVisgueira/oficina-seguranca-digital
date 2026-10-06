// Tela de resultados: tabela antes/depois, acertos por pergunta e exportação em CSV.
(function () {
  const $ = (id) => document.getElementById(id);
  const total = QUESTIONS.length;
  const show = (value) => (value === null ? '–' : String(value));

  function addRow(tbody, cells, lastCellClass) {
    const tr = document.createElement('tr');
    cells.forEach((value, i) => {
      const td = document.createElement('td');
      if (i === 0) td.className = 'left';
      if (lastCellClass && i === cells.length - 1) td.className = lastCellClass;
      td.textContent = value;
      tr.append(td);
    });
    tbody.append(tr);
  }

  function render() {
    const records = loadRecords(localStorage);
    const summary = buildSummary(records);
    const hasData = summary.length > 0;
    $('empty').classList.toggle('hidden', hasData);
    $('data').classList.toggle('hidden', !hasData);
    if (!hasData) return;

    $('total-before').textContent = total;
    $('total-after').textContent = total;

    const summaryBody = $('summary-body');
    summaryBody.innerHTML = '';
    summary.forEach((row) => {
      const diff = row.difference === null ? '–' : (row.difference > 0 ? '+' : '') + row.difference;
      const trend = row.difference > 0 ? 'gain' : row.difference < 0 ? 'loss' : '';
      addRow(summaryBody, [`Participante ${row.participant}`, show(row.before), show(row.after), diff], trend);
    });

    const questionBody = $('question-body');
    questionBody.innerHTML = '';
    buildQuestionStats(records, QUESTIONS).forEach((stat) => {
      addRow(questionBody, [`${stat.question}. ${QUESTIONS[stat.question - 1].text}`, stat.before, stat.after]);
    });
  }

  $('export').addEventListener('click', () => {
    const csv = toCsv(buildSummary(loadRecords(localStorage)), total);
    // BOM para o Excel abrir os acentos corretamente.
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resultados-oficina.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  $('clear').addEventListener('click', () => {
    if (confirm('Apagar todos os registros deste aparelho? Esta ação não pode ser desfeita.')) {
      clearRecords(localStorage);
      render();
    }
  });

  render();
})();
