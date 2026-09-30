(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const navbar = $('.navbar');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll progress, sticky-nav state, back-to-top */
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const top = document.createElement('button');
  top.className = 'to-top';
  top.setAttribute('aria-label', 'Наверх');
  top.innerHTML = '<i class="fas fa-chevron-up"></i>';
  top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(top);

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      navbar && navbar.classList.toggle('is-scrolled', scrollY > 30);
      top.classList.toggle('is-visible', scrollY > 600);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Cursor glow */
  if (matchMedia('(hover: hover)').matches && !reduce) {
    const g = document.createElement('div');
    g.className = 'cursor-glow';
    document.body.appendChild(g);
    addEventListener('mousemove', e => {
      g.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      g.classList.add('is-on');
    });
    document.addEventListener('mouseleave', () => g.classList.remove('is-on'));
  }

  /* Rich footer: built from navbar links, same on every page */
  const footer = $('.footer');
  if (footer && navbar) {
    const links = [...navbar.querySelectorAll('.navbar__links a')];
    const logo = $('.navbar__logo', navbar);
    const home = logo.getAttribute('href');
    const copy = $('.footer__copy', footer);
    const disclaimer = copy ? copy.textContent : '';
    const sections = [['seasons', 'Сюжет и сезоны'], ['factions', 'Фракции и стены'], ['titans', 'Титаны']];
    const REPO = 'https://github.com/baelluu/attackontitan';
    footer.innerHTML = `
      <div class="footer__inner">
        <div class="footer__brand">
          <a class="footer__logo" href="${home}">${logo.innerHTML}</a>
        </div>
        <nav class="footer__col" aria-label="Разделы сайта">
          <h4>Разделы</h4>
          ${links.map(a => `<a href="${a.getAttribute('href')}">${a.textContent}</a>`).join('')}
        </nav>
        <nav class="footer__col" aria-label="О вселенной">
          <h4>Вселенная</h4>
          ${sections.map(([id, t]) => `<a href="${home}#${id}">${t}</a>`).join('')}
        </nav>
        <div class="footer__col footer__contacts">
          <h4>Контакты</h4>
          <a href="${REPO}" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> GitHub: baelluu</a>
          <a href="${REPO}/issues" target="_blank" rel="noopener"><i class="fas fa-comment-dots" aria-hidden="true"></i> Написать отзыв или баг</a>
          <span class="footer__note"><i class="fas fa-graduation-cap" aria-hidden="true"></i> Учебный проект, 2024</span>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy">${disclaimer}</p>
        <a class="footer__top" href="#" aria-label="Наверх">Наверх <i class="fas fa-arrow-up" aria-hidden="true"></i></a>
      </div>`;
    $('.footer__top', footer).addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* Smooth page-leave transition for internal links */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target || reduce) return;
    if (a.getAttribute('href').startsWith('#')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(() => (location.href = a.href), 220);
  });
  addEventListener('pageshow', e => e.persisted && document.body.classList.remove('is-leaving'));

  /* Stagger reveal + count-up */
  const io = new IntersectionObserver(es => es.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    target.classList.add('is-visible');
    target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(target);
  }), { threshold: 0.2 });
  document.querySelectorAll('.reveal-stagger').forEach(el => io.observe(el));

  function countUp(el) {
    const end = +el.dataset.count, dur = 1600, t0 = performance.now();
    if (reduce) { el.textContent = end; return; }
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* Home hero parallax + 3D tilt on feature images */
  const hero = $('.hero');
  const heroContent = $('.hero__content');
  if (hero && heroContent && !reduce) {
    addEventListener('scroll', () => {
      if (scrollY < innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrollY / (innerHeight * 0.8));
      }
    }, { passive: true });
  }
  if (!reduce && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.feature__media').forEach(m => {
      m.style.transition = 'transform .25s ease, box-shadow .4s';
      m.addEventListener('mousemove', e => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        m.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      });
      m.addEventListener('mouseleave', () => (m.style.transform = ''));
    });
  }
})();

/* ===== Faction tabs (home) ===== */
(function () {
  const tabs = [...document.querySelectorAll('.tabs .tab')];
  if (!tabs.length) return;
  const walls = document.querySelector('.walls');
  const show = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
    if (walls) walls.dataset.ring = tab.dataset.ring;
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      show(n); n.focus();
    });
  });
  show(tabs[0]);

  /* Crests light up the matching ring on the map */
  let base = walls ? walls.dataset.ring : '';
  tabs.forEach(t => t.addEventListener('click', () => (base = t.dataset.ring)));
  document.querySelectorAll('.crest').forEach(c => {
    const on = () => walls && (walls.dataset.ring = c.dataset.ring);
    const off = () => walls && (walls.dataset.ring = base);
    c.addEventListener('mouseenter', on); c.addEventListener('focus', on);
    c.addEventListener('mouseleave', off); c.addEventListener('blur', off);
  });
})();

/* ===== Accessibility: skip link, landmarks, aria state, breadcrumbs ===== */
(function () {
  const target = document.querySelector('main, .serial-layout, .music-layout, .gallery-page, .quiz-layout, .spotlight');
  if (target) {
    if (!target.id) target.id = 'main-content';
    target.setAttribute('tabindex', '-1');
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + target.id;
    skip.textContent = 'К содержимому';
    document.body.insertBefore(skip, document.body.firstChild);
  }
  document.querySelectorAll('.navbar__links a.active').forEach(a => a.setAttribute('aria-current', 'page'));
  const burger = document.getElementById('hamburger');
  if (burger) {
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', () => setTimeout(() =>
      burger.setAttribute('aria-expanded', burger.classList.contains('is-open')), 0));
  }

  const active = document.querySelector('.navbar__links a.active');
  const holder = document.querySelector('.page-hero, .gallery-intro');
  const home = document.querySelector('.navbar__logo');
  if (active && holder && home) {
    const nav = document.createElement('nav');
    nav.className = 'crumbs';
    nav.setAttribute('aria-label', 'Хлебные крошки');
    nav.innerHTML = `<a href="${home.getAttribute('href')}">Главная</a><i class="fas fa-chevron-right" aria-hidden="true"></i><span aria-current="page">${active.textContent}</span>`;
    holder.insertBefore(nav, holder.firstChild);
  }
})();

/* ===== Gate preloader (first visit per session) ===== */
(function () {
  const root = document.documentElement;
  const finish = () => root.classList.remove('is-loading');
  let seen = true;
  try { seen = !!sessionStorage.getItem('aotLoaded'); } catch (e) {}
  if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
  try { sessionStorage.setItem('aotLoaded', '1'); } catch (e) {}

  const logo = document.querySelector('.navbar__logo img');
  const el = document.createElement('div');
  el.className = 'gate-loader';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="gate-loader__half gate-loader__half--l"></div>
    <div class="gate-loader__half gate-loader__half--r"></div>
    <div class="gate-loader__center">
      ${logo ? `<img class="gate-loader__logo" src="${logo.getAttribute('src')}" alt="">` : ''}
      <div class="gate-loader__bar"><span id="gateBar"></span></div>
      <div class="gate-loader__pct">Загрузка <b id="gatePct">0%</b></div>
    </div>`;
  document.body.appendChild(el);
  finish();

  const pct = el.querySelector('#gatePct'), bar = el.querySelector('#gateBar');
  const t0 = performance.now(), MIN = 1800;
  let loaded = document.readyState === 'complete', shown = 0, done = false;
  addEventListener('load', () => (loaded = true));
  (function tick(t) {
    const target = loaded && t - t0 >= MIN ? 100 : Math.min(92, (t - t0) / MIN * 92);
    shown += (target - shown) * 0.12;
    if (target === 100 && shown > 99.5) shown = 100;
    pct.textContent = Math.round(shown) + '%';
    bar.style.width = shown + '%';
    if (shown >= 100 && !done) {
      done = true;
      setTimeout(() => { el.classList.add('is-open'); setTimeout(() => el.remove(), 1400); }, 250);
      return;
    }
    requestAnimationFrame(tick);
  })(t0);
})();
