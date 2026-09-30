const characters = [
  {
    img: 'img/2.webp',
    role: 'Атакующий Титан',
    name: 'Эрен Йегер',
    faction: 'Разведкорпус',
    titan: 'Атакующий',
    des: 'Юноша, обладающий способностью превращаться в титана, движимый жаждой уничтожения всех врагов и открытием правды.',
  },
  {
    img: 'img/3.webp',
    role: 'Солдат разведотряда',
    name: 'Микаса Аккерман',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Приёмная сестра Эрена, обладающая выдающимися боевыми навыками и безграничной преданностью.',
  },
  {
    img: 'img/4.webp',
    role: 'Солдат разведотряда',
    name: 'Армин Арлерт',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Стратег с блестящим интеллектом, чьи решения неоднократно спасали товарищей от гибели.',
  },
  {
    img: 'img/5.webp',
    role: 'Солдат разведотряда',
    name: 'Жан Кирштейн',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Сокурсник Эрена, ставший одним из надёжнейших членов разведывательного корпуса.',
  },
  {
    img: 'img/6.webp',
    role: 'Солдат разведотряда',
    name: 'Конни Спрингер',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Решительный и напористый солдат, чья смелость не раз выручала товарищей в бою.',
  },
  {
    img: 'img/7.webp',
    role: 'Снайпер разведотряда',
    name: 'Саша Браус',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Спонтанная и ненасытная девушка с выдающимися навыками стрельбы и охоты.',
  },
  {
    img: 'img/8.webp',
    role: 'Бронированный Титан',
    name: 'Райнер Браун',
    faction: 'Воины Марли',
    titan: 'Бронированный',
    des: 'Солдат, скрывающий свою истинную сущность — двойная жизнь, которая неизбежно раскрывается.',
  },
  {
    img: 'img/9.webp',
    role: 'Женская особь',
    name: 'Энни Леонхарт',
    faction: 'Воины Марли',
    titan: 'Женская особь',
    des: 'Талантливый боец, ведущая сложную двойную игру между двумя сторонами противостояния.',
  },
  {
    img: 'img/10.webp',
    role: 'Колоссальный Титан',
    name: 'Бертольд Хувер',
    faction: 'Воины Марли',
    titan: 'Колоссальный',
    des: 'Спокойный и рассудительный солдат, также являющийся титаном-воином наряду с Райнером.',
  },
  {
    img: 'img/11.webp',
    role: 'Законная королева',
    name: 'Криста Ленц',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Скромная девушка, чья истинная сущность — законная наследница трона — постепенно раскрывается.',
  },
  {
    img: 'img/12.webp',
    role: 'Титан-переросток',
    name: 'Имир',
    faction: 'Разведкорпус',
    titan: 'Титан-челюсти',
    des: 'Таинственная своенравная девушка, способная превращаться в титана и играющая ключевую роль в конфликте.',
  },
  {
    img: 'img/13.webp',
    role: 'Капитан разведотряда',
    name: 'Леви',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Сильнейший солдат человечества, известный молниеносными ударами и железной дисциплиной.',
  },
  {
    img: 'img/14.webp',
    role: 'Командующий корпуса',
    name: 'Эрвин Смит',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Выдающийся стратег и лидер, ведущий разведывательный корпус к раскрытию тайн мира титанов.',
  },
  {
    img: 'img/1.webp',
    role: 'Командир разведотряда',
    name: 'Ханджи Зоэ',
    faction: 'Разведкорпус',
    titan: 'Без титана',
    des: 'Известна страстью к научным исследованиям титанов и готовностью рисковать ради новых знаний.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Mobile nav ---- */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('drawer');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    drawer.classList.toggle('is-open');
  });
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      drawer.classList.remove('is-open');
    });
  });

  /* ---- Spotlight ---- */
  const slide   = document.getElementById('slide');
  const prevBtn = document.getElementById('spotPrev');
  const nextBtn = document.getElementById('spotNext');
  const counter = document.getElementById('spotCounter');
  const total   = characters.length;

  /* Build slides */
  characters.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.style.backgroundImage = `url(${c.img})`;
    div.innerHTML = `
      <div class="content">
        <div class="role">${c.role}</div>
        <div class="name">${c.name}</div>
        <div class="des">${c.des}</div>
        <div class="spot-num">${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
      </div>
    `;
    slide.appendChild(div);
  });

  /* Item 1 is the full-screen backdrop, item 2 is the active character.
     Rotate once so the first character in the list starts as the active one. */
  slide.insertBefore(slide.lastElementChild, slide.firstChild);
  let activeIdx = 0;

  function updateCounter() {
    counter.textContent =
      String(activeIdx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    const bar = document.getElementById('spotProgress');
    if (bar) bar.style.width = ((activeIdx + 1) / total * 100) + '%';
  }

  function goNext() {
    /* Restart animations on incoming item (future nth-child(2)) */
    const incoming = slide.querySelector('.item:nth-child(3)');

    activeIdx = (activeIdx + 1) % total;
    /* Move item[0] to end */
    slide.appendChild(slide.querySelector('.item:nth-child(1)'));

    /* Force re-trigger animations on new item:nth-child(2) */
    const newActive = slide.querySelector('.item:nth-child(2)');
    const content = newActive.querySelector('.content');
    if (content) {
      content.querySelectorAll('.role, .name, .des, .spot-num').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; /* reflow */
        el.style.animation = '';
      });
    }

    updateCounter();
  }

  function goPrev() {
    activeIdx = (activeIdx - 1 + total) % total;
    /* Move last item to front */
    const lastItem = slide.querySelector('.item:last-child');
    slide.insertBefore(lastItem, slide.firstChild);

    /* Re-trigger animations on new item:nth-child(2) */
    const newActive = slide.querySelector('.item:nth-child(2)');
    const content = newActive.querySelector('.content');
    if (content) {
      content.querySelectorAll('.role, .name, .des, .spot-num').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = '';
      });
    }

    updateCounter();
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  /* Drag (mouse / touch / pen) to switch characters; click on the peeking card = next */
  let startX = 0, dragging = false, moved = false;
  slide.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX; dragging = true; moved = false;
    slide.classList.add('is-dragging');
  });
  slide.addEventListener('pointermove', e => {
    if (dragging && Math.abs(e.clientX - startX) > 6) moved = true;
  });
  const endDrag = e => {
    if (!dragging) return;
    dragging = false;
    slide.classList.remove('is-dragging');
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 60) dx < 0 ? goNext() : goPrev();
  };
  slide.addEventListener('pointerup', endDrag);
  slide.addEventListener('pointercancel', endDrag);
  slide.addEventListener('dragstart', e => e.preventDefault());

  slide.addEventListener('click', e => {
    if (moved) return;
    const clickedItem = e.target.closest('.item');
    if (!clickedItem) return;
    if (Array.from(slide.children).indexOf(clickedItem) === 2) goNext();
  });

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
  });


  /* ---- Roster: search + filters ---- */
  const grid = document.getElementById('rosterGrid');
  const search = document.getElementById('rosterSearch');
  const countEl = document.getElementById('rosterCount');
  const emptyEl = document.getElementById('rosterEmpty');
  const state = { q: '', faction: 'Все', titan: 'Все' };

  function goTo(i) {
    const steps = (i - activeIdx + total) % total;
    if (steps <= total / 2) for (let k = 0; k < steps; k++) goNext();
    else for (let k = 0; k < total - steps; k++) goPrev();
  }

  grid.innerHTML = characters.map((c, i) => `
    <li class="roster-card" data-i="${i}">
      <button type="button" aria-label="Открыть: ${c.name}">
        <span class="roster-card__img" style="background-image:url(${c.img})"></span>
        <span class="roster-card__body">
          <span class="roster-card__role">${c.role}</span>
          <span class="roster-card__name">${c.name}</span>
          <span class="roster-card__tags"><em>${c.faction}</em><em>${c.titan}</em></span>
        </span>
      </button>
    </li>`).join('');
  const cards = [...grid.children];

  function chips(id, key, values) {
    const box = document.getElementById(id);
    box.innerHTML = values.map(v =>
      `<button type="button" class="chip${v === 'Все' ? ' is-active' : ''}" data-v="${v}" aria-pressed="${v === 'Все'}">${v}</button>`).join('');
    box.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      state[key] = b.dataset.v;
      box.querySelectorAll('.chip').forEach(x => {
        const on = x === b;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on);
      });
      apply();
    });
  }
  const uniq = k => ['Все', ...new Set(characters.map(c => c[k]))];
  chips('factionChips', 'faction', uniq('faction'));
  chips('titanChips', 'titan', uniq('titan'));

  function apply() {
    const q = state.q.trim().toLowerCase();
    let shown = 0;
    characters.forEach((c, i) => {
      const ok =
        (!q || (c.name + ' ' + c.role).toLowerCase().includes(q)) &&
        (state.faction === 'Все' || c.faction === state.faction) &&
        (state.titan === 'Все' || c.titan === state.titan);
      cards[i].hidden = !ok;
      if (ok) shown++;
    });
    countEl.textContent = `Показано: ${shown} из ${total}`;
    emptyEl.hidden = shown > 0;
  }
  search.addEventListener('input', () => { state.q = search.value; apply(); });
  grid.addEventListener('click', e => {
    const li = e.target.closest('.roster-card');
    if (!li) return;
    goTo(+li.dataset.i);
    scrollTo({ top: 0, behavior: 'smooth' });
  });
  apply();

  updateCounter();
});
