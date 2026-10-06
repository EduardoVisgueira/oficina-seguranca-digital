// Registro das respostas no próprio aparelho (localStorage).
// Guarda apenas: número do participante, momento, respostas e acertos.
// Nenhum nome ou dado pessoal é coletado.
const STORAGE_KEY = 'oficina-seguranca-digital.records';

function loadRecords(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const records = raw ? JSON.parse(raw) : [];
    return Array.isArray(records) ? records : [];
  } catch (e) {
    return [];
  }
}

function saveRecord(storage, record) {
  const records = loadRecords(storage).filter(
    (r) => !(r.participant === record.participant && r.moment === record.moment)
  );
  records.push(record);
  storage.setItem(STORAGE_KEY, JSON.stringify(records));
  return records;
}

function clearRecords(storage) {
  storage.removeItem(STORAGE_KEY);
}

function nextParticipant(records) {
  const numbers = records.filter((r) => r.moment === 'before').map((r) => r.participant);
  return numbers.length ? Math.max(...numbers) + 1 : 1;
}

// Participantes que responderam "antes" e ainda não responderam "depois".
function pendingAfter(records) {
  const done = new Set(records.filter((r) => r.moment === 'after').map((r) => r.participant));
  return records
    .filter((r) => r.moment === 'before' && !done.has(r.participant))
    .map((r) => r.participant)
    .sort((a, b) => a - b);
}

function scoreAnswers(questions, answers) {
  return questions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);
}

function buildSummary(records) {
  const byParticipant = new Map();
  records.forEach((r) => {
    const row = byParticipant.get(r.participant) || { participant: r.participant, before: null, after: null };
    row[r.moment] = r.score;
    byParticipant.set(r.participant, row);
  });
  return [...byParticipant.values()]
    .sort((a, b) => a.participant - b.participant)
    .map((row) => ({
      ...row,
      difference: row.before !== null && row.after !== null ? row.after - row.before : null
    }));
}

// Quantos participantes acertaram cada pergunta, antes e depois.
function buildQuestionStats(records, questions) {
  return questions.map((q, i) => {
    const count = (moment) =>
      records.filter((r) => r.moment === moment && r.answers[i] === q.answer).length;
    return { question: i + 1, before: count('before'), after: count('after') };
  });
}

function toCsv(summary, total) {
  const cell = (v) => (v === null ? '' : v);
  const lines = [`Participante;Acertos antes (de ${total});Acertos depois (de ${total});Diferença`];
  summary.forEach((row) => {
    lines.push(
      [`Participante ${row.participant}`, cell(row.before), cell(row.after), cell(row.difference)].join(';')
    );
  });
  return lines.join('\r\n');
}

if (typeof module !== 'undefined') {
  module.exports = {
    STORAGE_KEY,
    loadRecords,
    saveRecord,
    clearRecords,
    nextParticipant,
    pendingAfter,
    scoreAnswers,
    buildSummary,
    buildQuestionStats,
    toCsv
  };
}
