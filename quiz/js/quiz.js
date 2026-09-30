const HEROES = {
  eren:   { name: 'Эрен Йегер',       role: 'Атакующий Титан',       img: 2,  text: 'Ты идёшь вперёд, даже когда все советуют остановиться. Свобода для тебя важнее безопасности, а эмоции дают силу бороться.' },
  mikasa: { name: 'Микаса Аккерман',  role: 'Солдат разведотряда',   img: 3,  text: 'Ты предана людям, которых любишь, и способна сделать невозможное ради них. Сдержанная снаружи и очень сильная внутри.' },
  armin:  { name: 'Армин Арлерт',     role: 'Солдат разведотряда',   img: 4,  text: 'Твоё главное оружие — ум. Ты видишь то, что другие упускают, и находишь выход там, где остальные сдаются.' },
  levi:   { name: 'Леви',             role: 'Капитан разведотряда',  img: 13, text: 'Порядок, дисциплина, результат. Ты немногословен, но на тебя всегда можно положиться, особенно в самый трудный момент.' },
  erwin:  { name: 'Эрвин Смит',       role: 'Командир корпуса',      img: 14, text: 'Ты стратег и лидер по натуре: умеешь вести за собой и ставить большую цель выше личных интересов.' },
  hange:  { name: 'Ханджи Зоэ',       role: 'Командир разведотряда', img: 1,  text: 'Любопытство — твоя суперсила. Ты бесстрашно исследуешь неизвестное и заражаешь этим энтузиазмом всех вокруг.' },
  jean:   { name: 'Жан Кирштейн',     role: 'Солдат разведотряда',   img: 5,  text: 'Ты честен с собой и с другими. Сомневаешься, споришь, но когда надо, берёшь ответственность и ведёшь людей за собой.' },
  connie: { name: 'Конни Спрингер',   role: 'Солдат разведотряда',   img: 6,  text: 'Ты живой и преданный друг. С юмором проходишь через самое тяжёлое и не даёшь команде упасть духом.' },
  sasha:  { name: 'Саша Браус',       role: 'Снайпер разведотряда',  img: 7,  text: 'Ты искренняя и находчивая, любишь жизнь во всех её вкусах. Действуешь по-своему, но всегда прикроешь своих.' },
};

const QUESTIONS = [
  { q: 'Как выглядит твой идеальный вечер?', a: [
    ['Тренировка, а после — наведение идеального порядка', { levi: 2, mikasa: 1 }],
    ['Составляю план на будущее и обдумываю стратегию', { erwin: 2, armin: 1 }],
    ['Разбираю что-то непонятное и записываю наблюдения', { hange: 2, armin: 1 }],
    ['Вкусный ужин и шумная компания друзей', { sasha: 2, connie: 1 }],
  ]},
  { q: 'Как ты ведёшь себя в конфликте?', a: [
    ['Иду напролом и отстаиваю своё', { eren: 2, mikasa: 1 }],
    ['Ищу слабое место и продумываю ход', { armin: 2, erwin: 1 }],
    ['Спорю, но в итоге беру ответственность', { jean: 2, levi: 1 }],
    ['Разряжаю обстановку шуткой', { connie: 2, sasha: 1 }],
  ]},
  { q: 'Что для тебя важнее всего?', a: [
    ['Свобода и возможность выбирать', { eren: 2, hange: 1 }],
    ['Люди, которых я люблю', { mikasa: 2, sasha: 1 }],
    ['Знания и правда', { armin: 2, hange: 1 }],
    ['Долг и порядок', { levi: 2, erwin: 1 }],
  ]},
  { q: 'Какую роль ты обычно занимаешь в команде?', a: [
    ['Лидер, которого слушают', { erwin: 2, jean: 1 }],
    ['Тот, кто прикрывает спину', { mikasa: 2, levi: 1 }],
    ['Мозг команды', { armin: 2, hange: 1 }],
    ['Душа компании', { connie: 2, sasha: 1 }],
  ]},
  { q: 'Как ты относишься к риску?', a: [
    ['Готов(а) рискнуть всем ради цели', { erwin: 2, eren: 1 }],
    ['Рассчитываю каждый шаг заранее', { armin: 2, levi: 1 }],
    ['Обожаю азарт, если это интересно', { hange: 2, sasha: 1 }],
    ['Предпочитаю осторожность, но не подведу', { jean: 2, connie: 1 }],
  ]},
  { q: 'Чего ты боишься больше всего?', a: [
    ['Потерять близких', { mikasa: 2, eren: 1 }],
    ['Остаться без ответов на важные вопросы', { hange: 2, armin: 1 }],
    ['Подвести команду', { erwin: 2, jean: 1 }],
    ['Остаться голодным и без своих', { sasha: 2, connie: 1 }],
  ]},
  { q: 'Какой у тебя характер?', a: [
    ['Строгий и сдержанный', { levi: 2, mikasa: 1 }],
    ['Эмоциональный и горячий', { eren: 2, connie: 1 }],
    ['Спокойный и вдумчивый', { armin: 2, mikasa: 1 }],
    ['Энергичный и любопытный', { hange: 2, sasha: 1 }],
  ]},
];

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  hamburger?.addEventListener('click', () => { hamburger.classList.toggle('is-open'); drawer.classList.toggle('is-open'); });

  const $ = id => document.getElementById(id);
  const card = $('quizCard'), result = $('quizResult');
  let step = 0, score = {};
  let winner = null;

  function render() {
    const item = QUESTIONS[step];
    $('quizStep').textContent = `Вопрос ${step + 1} из ${QUESTIONS.length}`;
    $('quizBar').style.width = (step / QUESTIONS.length * 100) + '%';
    $('quizQuestion').textContent = item.q;
    $('quizOptions').innerHTML = item.a.map((o, i) =>
      `<button type="button" class="quiz__opt" data-i="${i}"><b>${'ABCD'[i]}</b><span>${o[0]}</span></button>`).join('');
    card.style.animation = 'none'; card.offsetHeight; card.style.animation = '';
  }

  $('quizOptions').addEventListener('click', e => {
    const b = e.target.closest('.quiz__opt');
    if (!b) return;
    b.classList.add('is-picked');
    const pts = QUESTIONS[step].a[+b.dataset.i][1];
    for (const k in pts) score[k] = (score[k] || 0) + pts[k];
    setTimeout(() => {
      step++;
      step < QUESTIONS.length ? render() : finish();
    }, 220);
  });

  function finish() {
    const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]);
    winner = ranked[0][0];
    const h = HEROES[winner], second = ranked[1] && HEROES[ranked[1][0]];
    $('quizBar').style.width = '100%';
    card.hidden = true;
    result.hidden = false;
    $('resultImg').style.backgroundImage = `url(../characters/img/${h.img}.webp)`;
    $('resultImg').setAttribute('aria-label', h.name);
    $('resultName').textContent = h.name;
    $('resultRole').textContent = h.role;
    $('resultText').textContent = h.text;
    $('resultSecond').textContent = second ? `Ты также похож(а) на: ${second.name}.` : '';
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  $('quizRestart').addEventListener('click', () => {
    step = 0; score = {}; winner = null;
    result.hidden = true; card.hidden = false;
    render();
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $('quizCopy').addEventListener('click', async e => {
    const btn = e.currentTarget;
    const text = `Я — ${HEROES[winner].name} из «Атаки титанов»! Пройди тест и узнай, кто ты.`;
    try { await navigator.clipboard.writeText(text); btn.innerHTML = '<i class="fas fa-check"></i> Скопировано'; }
    catch (err) { btn.textContent = text; }
    setTimeout(() => (btn.innerHTML = '<i class="fas fa-copy"></i> Скопировать результат'), 2000);
  });

  render();
});
