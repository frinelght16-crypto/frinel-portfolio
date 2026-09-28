let projects = [
  { slug: 'fiwe', title: 'Fiwè', type: 'UX/UI design', year: '2026', image: './assets/project-fiwe.png', desc: 'Une plateforme culturelle qui rend les récits du Bénin visibles, accessibles et désirables.', filter: 'ux', format: 'portrait' },
  { slug: 'emin', title: 'ÉMIN', type: 'Brand identity', year: '2025', image: './assets/project-emin-new.png', desc: 'Une identité éditoriale audacieuse qui met la culture contemporaine en mouvement.', filter: 'brand', format: 'landscape' },
  { slug: 'oms', title: 'OMS', type: 'UX/UI design', year: '2026', image: './assets/project-oms-source.png', desc: 'Une expérience claire et structurée pour faciliter l’accès aux ressources de santé.', filter: 'ux', format: 'medium' },
  { slug: 'epass', title: 'ePass', type: 'Web design', year: '2025', image: './assets/project-oms.png', desc: 'Une réponse digitale simple et contextualisée à un enjeu quotidien de mobilité.', filter: 'web', format: 'portrait right' },
  { slug: 'pns', title: 'PNS', type: 'App design', year: '2025', image: './assets/project-epass-new.png', desc: 'Une interface mobile fluide qui rapproche une institution de ses publics.', filter: 'web', format: 'wide' }
];

let services = [
  { title: 'UX / UI design', kicker: 'Comprendre avant de dessiner.', image: './assets/service-ux.png', desc: 'Des parcours lisibles, des prototypes tangibles et des interfaces qui donnent envie d’avancer.', tags: ['Recherche', 'Parcours', 'Design system'] },
  { title: 'Identité visuelle', kicker: 'Rendre une marque impossible à confondre.', image: './assets/service-brand.png', desc: 'Une direction artistique distinctive, construite pour rester cohérente du premier regard au dernier détail.', tags: ['Stratégie', 'Identité', 'Guidelines'] },
  { title: 'Web design', kicker: 'Faire du web un espace vivant.', image: './assets/service-web.png', desc: 'Des sites expressifs, rapides et responsives où la narration et l’usage avancent au même rythme.', tags: ['Direction artistique', 'Motion', 'Responsive'] },
  { title: 'App design', kicker: 'Mettre l’essentiel au bout du pouce.', image: './assets/service-app.png', desc: 'Des expériences mobiles intuitives, pensées autour des gestes, du contexte et de l’accessibilité.', tags: ['iOS', 'Android', 'Prototype'] }
];

let siteContent = {
  hero: { eyebrow: 'Product designer', title: ['Rendre le', 'complexe simple,', 'utile et beau.'] },
  about: {
    intro: 'Designer numérique passionné de technologie, je conçois des sites web, interfaces et applications mobiles qui offrent des expériences mémorables et repensent la manière dont les utilisateurs interagissent avec le digital.',
    title: 'Un design compris avant d’être admiré.',
    bio: 'Je suis GHT Frinel, designer numérique basé à Porto-Novo. Je transforme les situations complexes en interfaces simples et en identités capables de durer. Chaque projet commence par l’écoute, se précise par la stratégie et prend vie dans les détails.',
    perspective: 'Mon travail est nourri par le contexte béninois et par une culture visuelle internationale. Cette double perspective m’aide à créer des produits familiers sans être génériques.'
  },
  contact: { email: 'frinelght16@gmail.com', phone: '+229 01 90 57 02 33', phoneLink: '+2290190570233', linkedin: '#', behance: '#', location: 'Porto-Novo · Disponible à distance' }
};

const escapeHTML = value => String(value ?? '').replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
async function loadCMSContent(){
  try {
    const response = await fetch('./content/site.json', { cache: 'no-store' });
    if(!response.ok) throw new Error(`CMS ${response.status}`);
    const content = await response.json();
    if(Array.isArray(content.projects) && content.projects.length) projects = content.projects;
    if(Array.isArray(content.services) && content.services.length) services = content.services;
    siteContent = {...siteContent, ...content, hero:{...siteContent.hero,...(content.hero||{})}, about:{...siteContent.about,...(content.about||{})}, contact:{...siteContent.contact,...(content.contact||{})}};
  } catch(error) { console.warn('Le contenu CMS par défaut est utilisé.', error); }
}

const immersiveServices = (compact = false) => `
  <section class="service-experience grid-bg ${compact ? 'is-compact' : ''}" data-service-stage>
    <div class="service-marquee" aria-hidden="true"><div>DESIGN THAT MOVES — DESIGN THAT MATTERS — DESIGN THAT MOVES — DESIGN THAT MATTERS —</div></div>
    <div class="service-heading">
      <span class="eyebrow">01—04 / Expertises</span>
      <h2>Nos services<span>.</span></h2>
      <p>Le fond change. Le problème aussi.<br>La précision reste.</p>
    </div>
    <div class="service-scene">
      <div class="service-list">
        ${services.map((service, index) => `<article class="service-row ${index === 0 ? 'active' : ''}" data-service-index="${index}">
          <div class="service-row-top"><span>0${index + 1}</span><i>${service.kicker}</i></div>
          <h3>${service.title}</h3>
          <p>${service.desc}</p>
          <div class="service-tags">${service.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        </article>`).join('')}
      </div>
      <div class="service-visual" aria-live="polite">
        ${services.map((service, index) => `<figure class="service-image ${index === 0 ? 'active' : ''}" data-service-image="${index}"><img src="${service.image}" alt="Univers visuel — ${service.title}"></figure>`).join('')}
        <div class="service-visual-shade"></div>
        <div class="service-visual-ui"><span>FRINEL® / CAPABILITIES</span><strong data-service-count>01</strong><p data-service-name>${services[0].title}</p></div>
        <div class="service-cross" aria-hidden="true">+</div>
      </div>
    </div>
  </section>`;

const iconArrow = `<span class="arrow-box" aria-hidden="true"><i>↗</i><i>↗</i><i>↗</i></span>`;
const projectCards = (list = projects) => list.map(p => `
  <a class="work-card ${p.format} reveal" href="#/projet/${p.slug}" data-filter="${p.filter}">
    <div class="corner c1"></div><div class="corner c2"></div><div class="corner c3"></div><div class="corner c4"></div>
    <div class="work-visual"><img src="${p.image}" alt="Aperçu du projet ${p.title}"></div>
    <div class="work-caption"><div><h3>${p.title}</h3><p>${p.type}</p></div>${iconArrow}</div>
  </a>`).join('');

const footer = () => `
  <section class="big-contact grid-bg reveal"><div><span class="eyebrow">Un projet en tête ?</span><h2>Construisons<br>quelque chose<br>de <em>mémorable.</em></h2></div><a href="#/contact" class="circle-link">Écrivez-moi <b>↗</b></a></section>
  <footer class="footer grid-bg"><div class="footer-logo"><span>✣</span> FRINEL.COM</div><p>Une approche centrée sur l’humain,<br>mêlant modernité et culture.</p><div><a href="mailto:${escapeHTML(siteContent.contact.email)}">${escapeHTML(siteContent.contact.email)}</a><br><a href="tel:${escapeHTML(siteContent.contact.phoneLink)}">${escapeHTML(siteContent.contact.phone)}</a></div><div class="footer-nav"><a href="#/projets">Projets</a><a href="#/a-propos">À propos</a><a href="#/services">Services</a><a href="#/contact">Contact</a></div><div class="footer-bottom"><span>© 2026 GHT Frinel</span><span>Porto-Novo · Bénin</span><span>Design with purpose</span></div></footer>`;

const home = () => `
  <section class="new-hero grid-bg"><div class="hero-shape"><img src="./assets/hero-gradient.png" alt=""></div><p class="hero-side left">${escapeHTML(siteContent.hero.eyebrow)}</p><p class="hero-side right">${escapeHTML(siteContent.hero.eyebrow)}</p><h1>${siteContent.hero.title.map(line=>`<span>${escapeHTML(line)}</span>`).join('')}</h1><div class="hero-scroll"><span>Faire défiler</span><i>↓</i></div></section>
  <section class="works grid-bg"><div class="work-layout">${projectCards()}</div></section>
  <section class="manifesto grid-bg"><span class="eyebrow reveal">À propos</span><p class="reveal">${escapeHTML(siteContent.about.intro)}</p><a href="#/a-propos" class="text-link reveal">En savoir plus ↗</a></section>
  ${immersiveServices(true)}
  <section class="process grid-bg"><div class="section-intro"><span class="eyebrow">Processus</span><h2>Une méthode claire<br>pour avancer juste.</h2></div><div class="process-list"><article class="reveal"><span>01</span><div><h3>Découverte</h3><p>Comprendre votre réalité, vos objectifs et les besoins de vos utilisateurs.</p></div><b>1–2 jours</b></article><article class="reveal"><span>02</span><div><h3>Direction</h3><p>Transformer les apprentissages en une stratégie et un parti-pris créatif.</p></div><b>2–4 jours</b></article><article class="reveal"><span>03</span><div><h3>Conception</h3><p>Donner forme, prototyper et tester une expérience cohérente et sensible.</p></div><b>1–3 semaines</b></article><article class="reveal"><span>04</span><div><h3>Livraison</h3><p>Finaliser le système, documenter et accompagner la mise en œuvre.</p></div><b>2–5 jours</b></article></div></section>${footer()}`;

const pageHero = (index, title, desc) => `<section class="page-hero grid-bg"><div class="page-index">${index}</div><span class="eyebrow">FRINEL.COM / ${index}</span><h1 data-split>${title}</h1><p>${desc}</p><i>↓</i></section>`;
const projectsPage = () => `${pageHero('PROJETS', 'Projets sélectionnés', 'Une sélection de produits numériques et d’identités pensés pour être utiles, précis et singuliers.')}<section class="works projects-page grid-bg"><div class="filters"><button class="filter-btn active" data-filter="all">Tous</button><button class="filter-btn" data-filter="ux">UX/UI</button><button class="filter-btn" data-filter="web">Web & mobile</button><button class="filter-btn" data-filter="brand">Branding</button></div><div class="work-layout" id="project-grid">${projectCards()}</div></section>${footer()}`;
const aboutPage = () => `${pageHero('À PROPOS', 'Culture, clarté, curiosité.', 'Je conçois à l’intersection de la technologie, de la culture locale et des usages réels.')}<section class="about-section grid-bg"><div class="about-art reveal"><span>G</span><i></i></div><div class="about-copy"><span class="eyebrow">Mon approche</span><h2 class="reveal">${escapeHTML(siteContent.about.title)}</h2><p class="reveal">${escapeHTML(siteContent.about.bio)}</p><p class="reveal">${escapeHTML(siteContent.about.perspective)}</p><div class="fact-list reveal"><div><span>Base</span><b>Porto-Novo, Bénin</b></div><div><span>Disciplines</span><b>UX/UI · Web · Branding</b></div><div><span>Collaboration</span><b>Freelance · Remote</b></div><div><span>Disponibilité</span><b>Ouvert aux projets</b></div></div></div></section>${footer()}`;
const servicesPage = () => `${pageHero('SERVICES', 'Concevoir avec intention.', 'Un accompagnement précis, du cadrage stratégique à la livraison d’une expérience cohérente.')}${immersiveServices()}<section class="service-outro grid-bg"><span class="eyebrow">La formule</span><h2>Stratégie.<br>Design.<br><em>Impact.</em></h2><p>Chaque mission s’adapte au besoin réel : une intervention ciblée, un sprint ou un accompagnement complet jusqu’à la mise en ligne.</p><a href="#/contact" class="text-link">Parler de votre projet ↗</a></section>${footer()}`;
const contactPage = () => `${pageHero('CONTACT', 'Commençons par bonjour.', 'Racontez-moi votre idée, votre besoin ou le problème que vous cherchez à résoudre.')}<section class="contact-page grid-bg"><div><span class="eyebrow">Contact direct</span><h2>Prêt à rendre<br>le complexe<br><em>simple ?</em></h2></div><div class="contact-panel reveal"><p>Je réponds généralement sous 48 heures.</p><a href="mailto:${escapeHTML(siteContent.contact.email)}">${escapeHTML(siteContent.contact.email)} <b>↗</b></a><a href="tel:${escapeHTML(siteContent.contact.phoneLink)}">${escapeHTML(siteContent.contact.phone)} <b>↗</b></a><a href="${escapeHTML(siteContent.contact.linkedin)}">LinkedIn <b>↗</b></a><a href="${escapeHTML(siteContent.contact.behance)}">Behance <b>↗</b></a><small>${escapeHTML(siteContent.contact.location)}</small></div></section>${footer()}`;
const detailPage = slug => { const p = projects.find(x=>x.slug===slug)||projects[0]; return `<section class="case-hero grid-bg"><div class="case-media"><img src="${p.image}" alt="${p.title}"></div><div class="case-title"><span class="eyebrow">${p.type} · ${p.year}</span><h1 data-split>${p.title}</h1><p>${p.desc}</p></div></section><section class="case-body grid-bg"><div class="case-overview"><h2>Le contexte</h2><p>${p.desc} L’objectif était de traduire un besoin concret en une expérience claire, crédible et immédiatement reconnaissable.</p></div><div class="case-facts"><div><span>Rôle</span><b>Recherche · Stratégie · UI</b></div><div><span>Année</span><b>${p.year}</b></div><div><span>Type</span><b>${p.type}</b></div></div><div class="case-film reveal" data-film-slot><img src="${p.image}" alt="Image d’attente du film ${p.title}"><div class="case-film-shade"></div><span>PROJECT FILM / À VENIR</span><button type="button" aria-label="Vidéo du projet bientôt disponible"><i>▶</i></button><p>Le projet en mouvement.<br>Vidéo bientôt intégrée.</p></div><figure class="case-full reveal"><img src="${p.image}" alt="Vue principale du projet ${p.title}"></figure><div class="case-text reveal"><h2>Une direction simple, un système vivant.</h2><p>La conception s’est construite par itérations : clarification des parcours, exploration visuelle, prototypage et ajustements. La grille, la typographie et les interactions composent un langage flexible capable de se déployer sur plusieurs supports.</p></div><div class="case-pair"><figure class="reveal"><img src="./assets/project-emin-new.png" alt="Application graphique"></figure><figure class="reveal"><img src="./assets/project-oms.png" alt="Application digitale"></figure></div></section>${footer()}`; };

const routes={'/':home,'/projets':projectsPage,'/a-propos':aboutPage,'/services':servicesPage,'/contact':contactPage};
const app=document.querySelector('#app'),toggle=document.querySelector('.menu-toggle'),panel=document.querySelector('.menu-panel');
function initEntryGame(){
  const game=document.querySelector('#entry-game');
  if(!game){document.body.classList.remove('game-locked');return}
  let alreadyPlayed=false;
  try{alreadyPlayed=sessionStorage.getItem('frinel-entry-complete')==='1'}catch(error){}
  if(alreadyPlayed){game.remove();document.body.classList.remove('game-locked');return}
  const stage=game.querySelector('[data-constellation]'),nodes=[...game.querySelectorAll('[data-point]')],path=game.querySelector('[data-game-path]'),preview=game.querySelector('[data-game-preview]'),status=game.querySelector('[data-game-status]'),counter=game.querySelector('[data-game-count]'),progress=game.querySelector('[data-game-progress]');
  const coords=nodes.map(node=>[Number(node.dataset.x),Number(node.dataset.y)]);let current=0,locked=false;
  const save=()=>{try{sessionStorage.setItem('frinel-entry-complete','1')}catch(error){}};
  const leave=()=>{if(locked)return;locked=true;save();game.classList.add('leaving');setTimeout(()=>{game.remove();document.body.classList.remove('game-locked');app.focus({preventScroll:true})},950)};
  const reset=()=>{current=0;nodes.forEach((node,index)=>{node.classList.remove('done','next');if(index===0)node.classList.add('next')});path.setAttribute('points','');preview.classList.remove('visible');counter.textContent='00';progress.style.width='0%';status.textContent='Ordre rompu — recommence par 01';game.classList.remove('wrong');void game.offsetWidth;game.classList.add('wrong');setTimeout(()=>game.classList.remove('wrong'),450)};
  nodes.forEach((node,index)=>node.addEventListener('click',()=>{
    if(locked)return;
    if(index!==current){reset();return}
    node.classList.remove('next');node.classList.add('done');current+=1;
    const drawn=coords.slice(0,current);path.setAttribute('points',drawn.map(point=>point.join(',')).join(' '));counter.textContent=String(current).padStart(2,'0');progress.style.width=`${current/coords.length*100}%`;
    if(current<coords.length){nodes[current].classList.add('next');status.textContent=`Continue vers le point ${String(current+1).padStart(2,'0')}`;preview.setAttribute('x1',coords[current-1][0]);preview.setAttribute('y1',coords[current-1][1]);preview.classList.add('visible');return}
    path.setAttribute('points',[...drawn,coords[0]].map(point=>point.join(',')).join(' '));preview.classList.remove('visible');status.textContent='Constellation complète';game.classList.add('complete');save();locked=true;setTimeout(()=>game.classList.add('leaving'),1050);setTimeout(()=>{game.remove();document.body.classList.remove('game-locked');app.focus({preventScroll:true})},1950)
  }));
  stage.addEventListener('pointermove',event=>{if(!current||current===coords.length||locked)return;const rect=stage.getBoundingClientRect();preview.setAttribute('x2',Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100)));preview.setAttribute('y2',Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100)))});
  stage.addEventListener('pointerleave',()=>preview.classList.remove('visible'));stage.addEventListener('pointerenter',()=>{if(current&&current<coords.length)preview.classList.add('visible')});game.querySelector('[data-game-skip]').addEventListener('click',leave);nodes[0].focus({preventScroll:true})
}
function closeMenu(){toggle.setAttribute('aria-expanded','false');panel.classList.remove('open');panel.setAttribute('aria-hidden','true')}
function animateWords(){document.querySelectorAll('[data-split]').forEach(el=>{el.innerHTML=el.textContent.trim().split(/\s+/).map((w,i)=>`<span class="split-word"><span style="--d:${.04+i*.065}s">${w}&nbsp;</span></span>`).join('')})}
function observeReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}
function bindFilters(){document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.work-card').forEach(card=>{card.hidden=btn.dataset.filter!=='all'&&card.dataset.filter!==btn.dataset.filter})}))}
function bindServiceScroll(){document.querySelectorAll('[data-service-stage]').forEach(stage=>{const rows=[...stage.querySelectorAll('[data-service-index]')],images=[...stage.querySelectorAll('[data-service-image]')],count=stage.querySelector('[data-service-count]'),name=stage.querySelector('[data-service-name]');const activate=index=>{rows.forEach((row,i)=>row.classList.toggle('active',i===index));images.forEach((img,i)=>img.classList.toggle('active',i===index));count.textContent=`0${index+1}`;name.textContent=services[index].title};const io=new IntersectionObserver(entries=>{entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio).slice(0,1).forEach(entry=>activate(Number(entry.target.dataset.serviceIndex)))},{rootMargin:'-28% 0px -42% 0px',threshold:[0,.2,.5,.8]});rows.forEach(row=>io.observe(row))})}
function route(){const path=(location.hash.slice(1)||'/').replace(/\/$/,'')||'/';const detail=path.match(/^\/projet\/(.+)$/);app.innerHTML=detail?detailPage(detail[1]):(routes[path]||home)();closeMenu();window.scrollTo(0,0);animateWords();observeReveals();bindFilters();bindServiceScroll();app.focus({preventScroll:true})}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));panel.classList.toggle('open',!open);panel.setAttribute('aria-hidden',String(open))});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');window.addEventListener('pointermove',e=>{dot.style.left=ring.style.left=`${e.clientX}px`;dot.style.top=ring.style.top=`${e.clientY}px`});document.addEventListener('pointerover',e=>{if(e.target.closest('a,button'))ring.classList.add('hover')});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button'))ring.classList.remove('hover')});window.addEventListener('hashchange',route);loadCMSContent().finally(()=>{route();initEntryGame()});
