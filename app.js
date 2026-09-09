(() => {
  const p = window.PORTFOLIO;
  const app = document.querySelector('#app');
  const mail = `mailto:${p.contact.email}`;
  const safe = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const arrow = '<span class="round-arrow" aria-hidden="true">→</span>';
  const contactArrow = '<svg class="contact-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" aria-hidden="true"><circle stroke-width="3" stroke="currentColor" r="35.5" cy="37" cx="37"></circle><path fill="currentColor" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path></svg>';
  let nameLetterIndex = 0;
  const animatedName = [...p.name].map(character => {
    if (character === ' ') return '<span class="name-space">&nbsp;</span>';
    const delay = nameLetterIndex++ * 75;
    return `<span class="name-letter" style="--letter-delay:${delay}ms">${safe(character)}</span>`;
  }).join('');
  const linkAttrs = (url) => /^https?:/i.test(url) || /:\/\//.test(url) ? 'target="_blank" rel="noopener noreferrer"' : '';
  const cards = p.work.map((item, index) => `
    <article class="work-card card" style="--index:${index}">
      <img src="${safe(item.image)}" alt="" loading="lazy" />
      <div class="shade"></div>
      <a href="${safe(item.url)}" ${linkAttrs(item.url)} aria-label="Open ${safe(item.title)}"></a>
      <div class="card-copy"><h3>${safe(item.title)}</h3><span aria-hidden="true">↗</span></div>
    </article>`).join('');
  const toolLinks = p.tools.map(tool => `<a class="tool" href="${safe(tool.url)}" ${linkAttrs(tool.url)}>${tool.icon ? `<img class="tool-logo" src="${safe(tool.icon)}" alt="" />` : `<span class="tool-mark" aria-hidden="true">${safe(tool.name.charAt(0))}</span>`}${safe(tool.name)}</a>`).join('');
  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-frame">
        <video src="${safe(p.heroVideo)}" autoplay loop muted playsinline></video><div class="noise"></div><div class="hero-shade"></div>
        <nav><a href="#about">About</a><a href="#work">Work</a><a href="#tools">Tools</a><a href="#contact">Contact</a></nav>
        <div class="hero-copy"><div><p class="eyebrow">${safe(p.location)}</p><h1 class="name-font-cycle">${animatedName}</h1></div><div class="hero-action"><a class="pill hero-contact" href="${mail}"><span>Contact</span>${contactArrow}</a></div></div>
      </div>
    </section>
    <section class="about section" id="about"><div class="panel centered reveal"><p class="label">Hello there,</p><h2>${safe(p.profile.headline)} <em class="font-cycle-holder font-cycle-long"><span class="font-cycle">${safe(p.profile.emphasis)}</span></em></h2><div class="chips">${p.profile.roles.map(x => `<span>${safe(x)}</span>`).join('')}</div><p class="description">${safe(p.profile.description)}</p><div class="experience">${p.profile.experience.map(x => `<div>${safe(x)}</div>`).join('')}</div><div class="chips languages">${p.profile.languages.map(x => `<span>${safe(x)}</span>`).join('')}</div></div></section>
    <section class="work section" id="work"><div class="work-inner"><h2 class="section-title reveal">Selected work.</h2><div class="work-grid"><article class="feature reveal"><video class="${p.featured.rotateToLandscape ? 'rotate-landscape' : ''}" src="${safe(p.featured.video)}" autoplay loop muted playsinline></video><div class="shade"></div><div><strong>${safe(p.featured.title)}</strong><p>${safe(p.featured.subtitle)}</p></div></article></div><h2 class="section-title reveal">Take a look around.</h2><div class="work-carousel" aria-label="Selected work carousel"><button class="carousel-control carousel-prev" type="button" aria-label="Show previous work"><svg class="carousel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><div class="wrapper"><div class="inner" style="--quantity:${p.work.length}">${cards}</div></div><button class="carousel-control carousel-next" type="button" aria-label="Show next work"><svg class="carousel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></div></div></section>
    <section class="tools section" id="tools"><div class="tools-row"><div><p class="label">Toolkit</p><p>The tools behind the work, shown only when they exist in the creator profile.</p></div><div class="tool-list">${toolLinks}</div></div><p class="location"></p></section>
    <section class="contact section" id="contact"><div class="panel centered reveal"><p class="label">Get in touch</p><h2>Let's make something <em class="font-cycle-holder font-cycle-short"><span class="font-cycle">together.</span></em></h2><a class="pill email hero-contact" href="${mail}"><span>${safe(p.contact.email)}</span>${contactArrow}</a><div class="chips contact-links"><a href="${safe(p.contact.linktree)}" ${linkAttrs(p.contact.linktree)}>Linktree</a><a href="${safe(p.contact.instagram)}" ${linkAttrs(p.contact.instagram)}>Instagram</a><a href="${safe(p.contact.whatsapp)}" ${linkAttrs(p.contact.whatsapp)}>WhatsApp</a><a href="${safe(p.contact.drive)}" ${linkAttrs(p.contact.drive)}>Google Drive</a></div></div></section>`;
  document.title = `${p.name} – ${p.role} Portfolio`;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const carousel = document.querySelector('.work-carousel');
  if (carousel) {
    const track = carousel.querySelector('.inner');
    const workCards = [...track.querySelectorAll('.work-card')];
    let activeCard = 0;
    const renderCarousel = () => {
      workCards.forEach((card, index) => {
        let distance = index - activeCard;
        if (distance > workCards.length / 2) distance -= workCards.length;
        if (distance < -workCards.length / 2) distance += workCards.length;
        card.classList.remove('is-active', 'is-before', 'is-after', 'is-hidden');
        card.classList.add(distance === 0 ? 'is-active' : distance === -1 ? 'is-before' : distance === 1 ? 'is-after' : 'is-hidden');
      });
    };
    carousel.querySelector('.carousel-prev').addEventListener('click', () => {
      activeCard = (activeCard - 1 + workCards.length) % workCards.length;
      renderCarousel();
    });
    carousel.querySelector('.carousel-next').addEventListener('click', () => {
      activeCard = (activeCard + 1) % workCards.length;
      renderCarousel();
    });
    renderCarousel();
  }
  const fitRotatedFeatureVideo = () => document.querySelectorAll('.rotate-landscape').forEach(video => {
    const frame = video.closest('.feature');
    video.style.setProperty('--rotated-width', `${frame.clientHeight}px`);
    video.style.setProperty('--rotated-height', `${frame.clientWidth}px`);
  });
  fitRotatedFeatureVideo();
  window.addEventListener('resize', fitRotatedFeatureVideo);
  const nameAnimation = document.querySelector('.name-animation');
  if (window.matchMedia('(hover: none)').matches && nameAnimation) {
    const hero = document.querySelector('.hero');
    const replayNameAnimation = () => {
      nameAnimation.classList.remove('mobile-replay');
      void nameAnimation.offsetWidth;
      nameAnimation.classList.add('mobile-replay');
    };
    new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) replayNameAnimation();
    }), { threshold: .65 }).observe(hero);
  }
})();
