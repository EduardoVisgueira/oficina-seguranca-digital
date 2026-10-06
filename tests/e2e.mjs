// Teste ponta a ponta do site em Chrome headless (sem janela), via DevTools Protocol.
// Uso: node tests/e2e.mjs   (defina CHROME_PATH se o Chrome estiver em outro caminho)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'oficina-screenshots-'));
const CHROME = process.env.CHROME_PATH || String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;
const PORT = 8765, DBG = 9333;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT);

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-chrome-'));
const chrome = spawn(CHROME,
  ['--headless=new', `--remote-debugging-port=${DBG}`, `--user-data-dir=${profile}`, '--no-first-run',
   '--window-size=390,844', 'about:blank'], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = (await (await fetch(`http://127.0.0.1:${DBG}/json`)).json()).find((t) => t.type === 'page'); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0; const pending = new Map(); const errors = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') errors.push('console.error');
});
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const js = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value;
const go = async (p) => { await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${p}` }); await sleep(500); };
const shot = async (name) => {
  const m = await send('Page.getLayoutMetrics');
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: 390, height: Math.min(m.cssContentSize.height, 2600), scale: 1 } });
  fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
};
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });

const results = [];
const check = (name, ok, got) => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '  -> ' + JSON.stringify(got)}`);
const answer = (mode) => js(`(() => { QUESTIONS.forEach((q,i) => { const idx = ${mode === 'right' ? 'q.answer' : '(q.answer === 0 ? 1 : 0)'};
  document.querySelectorAll('input[name="q'+i+'"]')[idx].click(); }); document.querySelector('#quiz-form button[type=submit]').click(); return true; })()`);
const visible = (id) => js(`!document.getElementById('${id}').classList.contains('hidden')`);

await go('index.html');
check('cartilha: 6 secoes', (await js(`document.querySelectorAll('main h2').length`)) === 6);
check('cartilha: sem rolagem horizontal', await js(`document.documentElement.scrollWidth <= window.innerWidth`));
await shot('site_index.png');

await go('quiz.html');
await js(`localStorage.clear()`); await go('quiz.html');
check('inicio: "depois" indisponivel sem registros', (await visible('after-empty')) && !(await visible('after-box')));
check('quiz: sem rolagem horizontal', await js(`document.documentElement.scrollWidth <= window.innerWidth`));
await shot('site_quiz_start.png');

await js(`document.getElementById('start-before').click()`);
check('participante 1 atribuido', (await js(`document.getElementById('participant-label').textContent`)).includes('Participante 1'));
check('6 perguntas renderizadas', (await js(`document.querySelectorAll('#questions fieldset').length`)) === 6);
await shot('site_quiz_questions.png');
// envio incompleto nao registra
await js(`document.querySelector('#quiz-form button[type=submit]').click()`);
check('envio incompleto bloqueado', (await js(`localStorage.getItem('oficina-seguranca-digital.records')`)) === null);
await answer('wrong');
const msg1 = await js(`document.getElementById('done-message').textContent`);
check('antes: mostra numero e nao mostra acertos', msg1.includes('Participante 1') && !/acertou/.test(msg1), msg1);
check('antes: nao revela gabarito', (await js(`document.querySelectorAll('#review .card').length`)) === 0);

await js(`document.getElementById('next-participant').click()`);
check('"depois" liberado apos um registro', await visible('after-box'));
await js(`document.getElementById('start-before').click()`);
check('participante 2 atribuido', (await js(`document.getElementById('participant-label').textContent`)).includes('Participante 2'));
await answer('right');

await js(`document.getElementById('next-participant').click()`);
check('lista do "depois" = 1 e 2', (await js(`[...document.querySelectorAll('#participant-select option')].map(o=>o.value).join()`)) === '1,2');
await js(`document.getElementById('participant-select').value='1'; document.getElementById('start-after').click()`);
await answer('right');
const msg2 = await js(`document.getElementById('done-message').textContent`);
check('depois: mostra acertos 6 de 6', msg2.includes('6 de 6'), msg2);
check('depois: mostra gabarito das 6', (await js(`document.querySelectorAll('#review .card').length`)) === 6);
await shot('site_quiz_done.png');
await js(`document.getElementById('next-participant').click()`);
check('participante 1 sai da lista do "depois"', (await js(`[...document.querySelectorAll('#participant-select option')].map(o=>o.value).join()`)) === '2');

const stored = JSON.parse(await js(`localStorage.getItem('oficina-seguranca-digital.records')`));
const keys = [...new Set(stored.flatMap((r) => Object.keys(r)))].sort().join();
check('registro guarda so participant/moment/answers/score', keys === 'answers,moment,participant,score', keys);
check('unica chave no localStorage', (await js(`localStorage.length`)) === 1);

await go('results.html');
const rows = await js(`[...document.querySelectorAll('#summary-body tr')].map(tr => [...tr.children].map(td => td.textContent).join('|'))`);
check('resultados: linhas corretas', JSON.stringify(rows) === JSON.stringify(['Participante 1|0|6|+6', 'Participante 2|6|–|–']), rows);
const qrows = await js(`[...document.querySelectorAll('#question-body tr')].map(tr => tr.children[1].textContent + '/' + tr.children[2].textContent)`);
check('resultados: acertos por pergunta 1/1', qrows.length === 6 && qrows.every((x) => x === '1/1'), qrows);
check('resultados: tabela cabe na tela', await js(`[...document.querySelectorAll('table')].every(t => t.getBoundingClientRect().right <= window.innerWidth)`));
check('csv', (await js(`toCsv(buildSummary(loadRecords(localStorage)), 6)`)).split('\r\n')[1] === 'Participante 1;0;6;6');
await shot('site_results.png');
check('sem erros de JavaScript', errors.length === 0, errors);

console.log(results.join('\n'));
ws.close(); chrome.kill(); server.close();
await sleep(500);
try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
