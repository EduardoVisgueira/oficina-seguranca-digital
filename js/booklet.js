// Interações da cartilha: sequência de abertura, link de exemplo, lista de proteção e índice.
(function () {
  const canObserve = 'IntersectionObserver' in window;

  // As mensagens só "chegam" quando o exemplo aparece na tela, e só para quem aceita movimento.
  const specimen = document.querySelector('.specimen');
  const allowsMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (specimen && canObserve && allowsMotion) {
    specimen.classList.add('armed');
    new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      specimen.classList.replace('armed', 'play');
      observer.disconnect();
    }, { threshold: 0.6 }).observe(specimen.querySelector('.chat'));
  }

  // O link do golpe de exemplo mostra o que teria acontecido.
  const bait = document.getElementById('bait');
  const caught = document.getElementById('caught');
  if (bait && caught) {
    bait.addEventListener('click', () => {
      caught.hidden = false;
      bait.setAttribute('aria-expanded', 'true');
    });
  }

  // Contagem da lista "Proteja sua conta". Nada é guardado: ao recarregar, a lista volta vazia.
  const boxes = [...document.querySelectorAll('.checks input')];
  const count = document.getElementById('checks-count');
  function updateCount() {
    const done = boxes.filter((box) => box.checked).length;
    count.classList.toggle('all-done', done === boxes.length);
    if (done === 0) count.textContent = 'Marque cada item conforme for fazendo.';
    else if (done === boxes.length) count.textContent = 'Tudo feito. Sua conta está bem mais protegida.';
    else count.textContent = `${done} de ${boxes.length} feitos.`;
  }
  if (count && boxes.length) {
    boxes.forEach((box) => box.addEventListener('change', updateCount));
    updateCount();
  }

  // O índice destaca a parte que está sendo lida.
  const links = new Map();
  document.querySelectorAll('.toc a').forEach((a) => links.set(a.getAttribute('href').slice(1), a));
  if (canObserve && links.size) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        links.get(entry.target.id).setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    document.querySelectorAll('.chapter').forEach((chapter) => spy.observe(chapter));
  }
})();
