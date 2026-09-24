/* ---------------------------------------------------------------
   APSCA — main interactions
   --------------------------------------------------------------- */

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ----------------------------- Header state + scroll progress ---- */
const header = document.getElementById('site-header');
const progressBar = document.querySelector('.scroll-progress');

const onScroll = () => {
  const y = window.scrollY;
  if (header) header.classList.toggle('scrolled', y > 20);
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ----------------------------- Mobile menu ---------------------- */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ----------------------------- Fade-in on scroll ---------------- */
// Single reusable observer so dynamically-injected elements also animate.
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

const observeFadeIns = (root = document) => {
  root.querySelectorAll('.fade-in-up:not(.visible)').forEach((el) => fadeObserver.observe(el));
};
observeFadeIns();

/* ----------------------------- Animated stat counters ----------- */
const formatNumber = (n) => n.toLocaleString('fr-FR');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = formatNumber(Math.round(eased * target)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-number').forEach((el) => statObserver.observe(el));

/* ----------------------------- Scroll-spy active nav ------------ */
const navLinks = Array.from(document.querySelectorAll('.desktop-nav > a[href^="#"]'));
const sectionIds = navLinks
  .map((a) => a.getAttribute('href'))
  .filter((h) => h && h.length > 1);
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter(Boolean);

if (sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ----------------------------- Data --------------------------- */
const jobs = [
  {
    id: 1,
    title: 'Médecin Généraliste',
    location: 'Yaoundé',
    type: 'Temps Plein',
    description: "Nous recherchons un médecin généraliste passionné pour rejoindre notre équipe mobile de santé.",
  },
  {
    id: 2,
    title: 'Infirmier(ère) Diplômé(e)',
    location: 'Douala',
    type: 'Temps Plein',
    description: 'Assurer les soins infirmiers et le suivi des patients dans nos centres communautaires.',
  },
  {
    id: 3,
    title: 'Agent Communautaire',
    location: "Région de l'Est",
    type: 'Bénévole / Indemnisé',
    description: 'Sensibiliser les populations locales sur les enjeux de santé publique (VIH, Paludisme).',
  },
  {
    id: 4,
    title: 'Responsable Suivi & Évaluation',
    location: 'Yaoundé',
    type: 'CDD',
    description: "Gérer la collecte et l'analyse des données de nos programmes de santé.",
  },
];

const projects = [
  {
    id: 1,
    title: 'Campagne Nationale de Sensibilisation VIH/SIDA',
    category: 'Santé Publique',
    status: 'Terminé',
    date: '2023',
    location: "Régions du Centre, de l'Est et de l'Adamaoua",
    partner: 'Ministère de la Santé Publique · ONUSIDA',
    cover: '/images/vih_session.png',
    summary:
      "Une campagne nationale de proximité pour réduire les nouvelles infections au VIH et lever la stigmatisation dans les zones rurales mal desservies.",
    gallery: [
      { src: '/images/vih_session.png', caption: 'Session de sensibilisation communautaire en milieu rural.' },
      { src: '/images/vih_testing.png', caption: 'Dépistage volontaire et conseil dans un poste de santé.' },
      { src: '/images/project1.png', caption: 'Appui aux relais communautaires pour la prévention.' },
    ],
    highlights: [
      { value: '50 000', label: 'personnes sensibilisées' },
      { value: '200+', label: 'villages couverts' },
      { value: '100 000', label: 'kits de prévention distribués' },
      { value: '12 000', label: 'dépistages volontaires' },
    ],
    description:
      "APSCA a conduit une vaste campagne nationale visant à réduire les nouvelles infections par le VIH au Cameroun. Le projet a ciblé en priorité les zones rurales mal desservies, où l'accès à l'information et aux services de dépistage reste limité.\n\nNos équipes, appuyées par un réseau de relais communautaires formés, ont animé des sessions de sensibilisation interactives dans plus de 200 villages, touchant directement 50 000 personnes. Les activités ont combiné causeries éducatives, théâtre-forum et projections mobiles pour lever les tabous et encourager le recours au dépistage.\n\nAu-delà de l'éducation, la campagne a permis de distribuer 100 000 kits de prévention et d'orienter plus de 12 000 personnes vers le dépistage volontaire et la prise en charge. Menée en partenariat avec le Ministère de la Santé Publique et l'ONUSIDA, elle a renforcé le leadership local dans la lutte contre la stigmatisation et posé les bases d'un dépistage communautaire durable.",
  },
  {
    id: 2,
    title: 'Renforcement des Capacités des Agents de Santé Communautaire',
    category: 'Renforcement des Capacités',
    status: 'En Cours',
    date: '2024 - 2025',
    location: 'Régions du Centre et du Littoral',
    partner: 'Ministère de la Santé Publique · Districts de Santé',
    cover: '/images/asc_tablet.png',
    summary:
      "Un programme de formation et de mentorat qui professionnalise 200 agents de santé communautaire et digitalise la collecte de données sanitaires.",
    gallery: [
      { src: '/images/project_training.png', caption: 'Atelier de formation des agents de santé communautaire.' },
      { src: '/images/asc_tablet.png', caption: 'Prise en main des outils numériques de collecte de données.' },
      { src: '/images/asc_field.png', caption: 'Supervision formative lors d\'une visite à domicile.' },
    ],
    highlights: [
      { value: '200', label: 'agents formés' },
      { value: '8', label: 'districts de santé' },
      { value: '15', label: 'modules de formation' },
      { value: '92%', label: 'de rétention des acquis' },
    ],
    description:
      "Le renforcement du système de santé passe par des acteurs communautaires compétents et outillés. Ce programme ambitieux forme 200 Agents de Santé Communautaire (ASC) aux pratiques modernes de soins primaires, dans huit districts de santé.\n\nLe cursus couvre la prise en charge intégrée des maladies de l'enfant (PCIME), le suivi nutritionnel, la surveillance épidémiologique à base communautaire et la communication pour le changement de comportement. Chaque module allie théorie, mises en situation et évaluations pratiques.\n\nNous intégrons des outils numériques de collecte de données en temps réel, qui permettent une remontée rapide des alertes sanitaires locales et un meilleur ciblage des interventions. Chaque agent bénéficie d'un mentorat continu et de supervisions formatives régulières : à mi-parcours, 92% des acquis étaient maintenus, gage de la qualité et de la pérennité des interventions.",
  },
  {
    id: 3,
    title: 'Projet RSS C19RM — Suivi Dirigé par la Communauté',
    category: 'Suivi Communautaire',
    status: 'En Cours',
    date: 'Mai - Déc 2025',
    location: "Districts d'Odza, Biyem-Assi et Efoulan (Yaoundé)",
    partner: 'Fonds Mondial · Ministère de la Santé Publique',
    cover: '/images/c19_interview.png',
    summary:
      "Un dispositif de suivi dirigé par la communauté qui place la voix des usagers au cœur de l'amélioration de la qualité des soins.",
    gallery: [
      { src: '/images/c19_interview.png', caption: 'Recueil des retours des usagers sur la qualité des soins.' },
      { src: '/images/c19_meeting.png', caption: 'Analyse participative des données et plaidoyer.' },
      { src: '/images/project_c19rm_final.png', caption: 'Relais communautaires mobilisés dans les districts.' },
    ],
    highlights: [
      { value: '3', label: 'districts de santé' },
      { value: '4 500', label: 'usagers interrogés' },
      { value: '30', label: 'relais communautaires' },
      { value: '18', label: 'recommandations formulées' },
    ],
    description:
      "Le projet C19RM (COVID-19 Response Mechanism) vise à renforcer la résilience du système de santé camerounais face aux crises sanitaires. APSCA y déploie un volet crucial de Suivi Dirigé par la Communauté (CLM) dans les districts d'Odza, Biyem-Assi et Efoulan, à Yaoundé.\n\nDes relais communautaires formés recueillent systématiquement, à l'aide de tablettes, les retours des usagers sur la disponibilité des intrants, l'accueil et la qualité des soins. Plus de 4 500 usagers ont déjà été interrogés au cours des premiers mois.\n\nCes données sont analysées lors de sessions participatives réunissant communautés, prestataires et autorités sanitaires. Elles ont permis d'identifier des goulots d'étranglement concrets et de formuler 18 recommandations d'amélioration. Ce dispositif pérennise une gouvernance sanitaire participative où les besoins des populations orientent réellement les décisions.",
  },
  {
    id: 4,
    title: 'Programme de Lutte contre la Tuberculose',
    category: 'Santé Publique',
    status: 'Terminé',
    date: '2022',
    location: 'Région du Centre',
    partner: 'Programme National de Lutte contre la Tuberculose',
    cover: '/images/tb_mobile.png',
    summary:
      "Un réseau de dépistage actif et de traitement supervisé qui a atteint 95% de réussite thérapeutique face à la tuberculose.",
    gallery: [
      { src: '/images/tb_mobile.png', caption: 'Clinique mobile de dépistage de la tuberculose.' },
      { src: '/images/tb_homevisit.png', caption: 'Traitement supervisé (DOTS) lors d\'une visite à domicile.' },
      { src: '/images/project_tablet.png', caption: 'Suivi numérique des patients et des traitements.' },
    ],
    highlights: [
      { value: '500', label: 'cas pris en charge' },
      { value: '95%', label: 'de réussite (DOTS)' },
      { value: '40', label: 'sorties de cliniques mobiles' },
      { value: '1 200', label: 'personnes dépistées' },
    ],
    description:
      "Ce programme a ciblé l'identification précoce et le traitement rigoureux de la tuberculose dans la région du Centre, où le taux de patients perdus de vue demeurait préoccupant.\n\nAPSCA a déployé un réseau de dépistage actif combinant cliniques mobiles et visites à domicile, permettant de dépister plus de 1 200 personnes et de rapprocher le diagnostic des populations les plus isolées.\n\nSur 500 cas confirmés et pris en charge, un taux de réussite thérapeutique de 95% a été atteint grâce à l'application stricte de la stratégie DOTS (traitement de courte durée sous observation directe). Un accompagnement nutritionnel et psychosocial a été offert à chaque patient, réduisant fortement les abandons de traitement et le risque de résistances.",
  },
  {
    id: 5,
    title: 'Programme Santé Maternelle et Infantile',
    category: 'Santé Maternelle',
    status: 'En Cours',
    date: '2024 - 2026',
    location: "Régions de l'Est et de l'Adamaoua",
    partner: 'Ministère de la Santé Publique · UNFPA',
    cover: '/images/smi_prenatal.png',
    summary:
      "Un continuum de soins pour les mères et les enfants : consultations prénatales, accouchements assistés, vaccination et suivi de la croissance.",
    gallery: [
      { src: '/images/smi_prenatal.png', caption: 'Consultation prénatale dans un centre de santé communautaire.' },
      { src: '/images/smi_vaccination.png', caption: 'Vaccination de routine des nourrissons.' },
      { src: '/images/smi_weighing.png', caption: 'Suivi de la croissance des enfants de moins de 5 ans.' },
    ],
    highlights: [
      { value: '6 000', label: 'femmes suivies' },
      { value: '4 200', label: 'enfants vaccinés' },
      { value: '24', label: 'centres de santé appuyés' },
      { value: '-30%', label: 'de perdues de vue' },
    ],
    description:
      "La mortalité maternelle et infantile reste élevée dans les régions enclavées de l'Est et de l'Adamaoua. Ce programme met en place un continuum de soins complet pour accompagner les femmes de la grossesse aux premières années de l'enfant.\n\nAPSCA appuie 24 centres de santé pour renforcer les consultations prénatales, promouvoir les accouchements assistés par du personnel qualifié et organiser des séances de vaccination de routine ainsi que le suivi de la croissance des enfants de moins de cinq ans.\n\nDes agents de santé communautaire assurent la recherche active des femmes enceintes, le rappel des rendez-vous et l'orientation précoce des grossesses à risque. Ce maillage a permis de suivre 6 000 femmes, de vacciner 4 200 enfants et de réduire de 30% le nombre de patientes perdues de vue au cours du suivi prénatal.",
  },
  {
    id: 6,
    title: 'Campagne de Prévention du Paludisme',
    category: 'Prévention',
    status: 'Terminé',
    date: '2023',
    location: "Région de l'Est",
    partner: 'Programme National de Lutte contre le Paludisme · Fonds Mondial',
    cover: '/images/palu_nets.png',
    summary:
      "Une campagne intégrée de distribution de moustiquaires, de diagnostic rapide et d'éducation pour faire reculer le paludisme, première cause de consultation.",
    gallery: [
      { src: '/images/palu_nets.png', caption: 'Distribution de moustiquaires imprégnées (MILDA) aux ménages.' },
      { src: '/images/palu_test.png', caption: 'Test de diagnostic rapide du paludisme chez l\'enfant.' },
      { src: '/images/palu_education.png', caption: 'Séance d\'éducation communautaire sur la prévention.' },
    ],
    highlights: [
      { value: '35 000', label: 'moustiquaires distribuées' },
      { value: '60 000', label: 'personnes protégées' },
      { value: '5 000', label: 'tests de diagnostic rapide' },
      { value: '150', label: 'villages touchés' },
    ],
    description:
      "Première cause de consultation et d'hospitalisation dans la région de l'Est, le paludisme frappe particulièrement les enfants de moins de cinq ans et les femmes enceintes. APSCA a mené une campagne intégrée de prévention et de prise en charge précoce.\n\nLe projet a permis la distribution de 35 000 moustiquaires imprégnées à longue durée d'action (MILDA), protégeant près de 60 000 personnes, accompagnée de démonstrations d'installation et d'utilisation correcte au domicile des bénéficiaires.\n\nEn parallèle, 5 000 tests de diagnostic rapide ont été réalisés au niveau communautaire pour permettre un traitement immédiat des cas confirmés, tandis que des séances d'éducation dans 150 villages diffusaient les gestes de prévention. Menée avec le Programme National de Lutte contre le Paludisme et le Fonds Mondial, la campagne a contribué à une baisse notable des cas simples évoluant vers des formes graves.",
  },
];

/* ----------------------------- Render jobs -------------------- */
const jobsContainer = document.getElementById('job-listings');

if (jobsContainer) {
  const fragment = document.createDocumentFragment();
  jobs.forEach((job, index) => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card', 'fade-in-up');
    if (index % 2 === 1) jobCard.classList.add('delay-1');
    jobCard.innerHTML = `
      <div class="job-header">
        <h3 class="job-title">${job.title}</h3>
        <div class="job-meta">
          <span>📍 ${job.location}</span>
          <span>⏱️ ${job.type}</span>
        </div>
        <p class="job-description">${job.description}</p>
      </div>
      <button class="btn-primary apply-btn" data-job-id="${job.id}" data-job-title="${job.title}">Postuler</button>
    `;
    fragment.appendChild(jobCard);
  });
  jobsContainer.appendChild(fragment);
  observeFadeIns(jobsContainer);
}

/* ----------------------------- Render projects ---------------- */
const projectsContainer = document.getElementById('projects-grid');

if (projectsContainer) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const statusClass = project.status === 'Terminé' ? 'status-completed' : 'status-ongoing';
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card', 'fade-in-up');
    if (index % 3 === 1) projectCard.classList.add('delay-1');
    if (index % 3 === 2) projectCard.classList.add('delay-2');
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.cover}" alt="${project.title}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=APSCA'"/>
        <span class="project-photo-count" aria-hidden="true">📷 ${project.gallery.length} photos</span>
      </div>
      <div class="project-status ${statusClass}">${project.status}</div>
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-meta-line">📍 ${project.location}</p>
        <p class="project-description">${project.summary}</p>
        <div class="project-footer">
          <span class="project-date">📅 ${project.date}</span>
          <button class="read-more-btn" data-id="${project.id}">Voir le projet <span aria-hidden="true">&rarr;</span></button>
        </div>
      </div>
    `;
    fragment.appendChild(projectCard);
  });
  projectsContainer.appendChild(fragment);
  observeFadeIns(projectsContainer);
}

/* ----------------------------- Modal helpers ------------------ */
const openModal = (modal) => {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};
const closeModal = (modal) => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

/* ----------------------------- Recruitment modal -------------- */
const recruitmentModal = document.getElementById('application-modal');
const modalRecruitmentTitle = document.getElementById('modal-job-title');
const applicationForm = document.getElementById('application-form');

if (recruitmentModal) {
  const closeRecruitmentBtn = recruitmentModal.querySelector('.close-modal');

  document.addEventListener('click', (e) => {
    const applyBtn = e.target.closest('.apply-btn');
    if (applyBtn) {
      const jobTitle = applyBtn.getAttribute('data-job-title');
      modalRecruitmentTitle.textContent = `Postuler : ${jobTitle}`;
      openModal(recruitmentModal);
    }
  });

  const closeRec = () => closeModal(recruitmentModal);
  if (closeRecruitmentBtn) closeRecruitmentBtn.addEventListener('click', closeRec);
  recruitmentModal.addEventListener('click', (e) => {
    if (e.target === recruitmentModal) closeRec();
  });

  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = applicationForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      const formData = new FormData(applicationForm);

      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Votre candidature a été préparée. Veuillez également envoyer votre CV directement à : actionpromotion.santeca@gmail.com');
        window.location.href = `mailto:actionpromotion.santeca@gmail.com?subject=Candidature: ${modalRecruitmentTitle.textContent}&body=Nom: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0ATéléphone: ${formData.get('phone')}%0D%0AMessage: ${formData.get('message')}`;

        applicationForm.reset();
        closeRec();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }
}

/* ----------------------------- Project modal ------------------ */
const projectModal = document.getElementById('project-modal');

if (projectModal && projectsContainer) {
  const closeProjectBtn = document.getElementById('close-project-modal');
  const modalProjTitle = document.getElementById('modal-project-title');
  const modalProjCategory = document.getElementById('modal-project-category');
  const modalProjDate = document.getElementById('modal-project-date');
  const modalProjLocation = document.getElementById('modal-project-location');
  const modalProjPartner = document.getElementById('modal-project-partner');
  const modalProjImage = document.getElementById('modal-project-image');
  const modalProjCaption = document.getElementById('modal-project-caption');
  const modalProjThumbs = document.getElementById('modal-project-thumbs');
  const modalProjHighlights = document.getElementById('modal-project-highlights');
  const modalProjDescription = document.getElementById('modal-project-description');

  const showGalleryImage = (gallery, index) => {
    const item = gallery[index];
    modalProjImage.src = item.src;
    modalProjImage.alt = item.caption || '';
    modalProjCaption.textContent = item.caption || '';
    modalProjThumbs.querySelectorAll('.gallery-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === index);
      t.setAttribute('aria-selected', String(i === index));
    });
  };

  projectsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more-btn');
    if (!btn) return;
    const project = projects.find((p) => p.id === parseInt(btn.getAttribute('data-id'), 10));
    if (!project) return;

    modalProjTitle.textContent = project.title;
    modalProjCategory.textContent = project.category;
    modalProjDate.textContent = `📅 ${project.date}`;
    modalProjLocation.textContent = `📍 ${project.location}`;
    modalProjPartner.textContent = `🤝 ${project.partner}`;

    // Highlights
    modalProjHighlights.innerHTML = project.highlights
      .map(
        (h) => `<div class="highlight"><span class="highlight-value">${h.value}</span><span class="highlight-label">${h.label}</span></div>`
      )
      .join('');

    // Gallery thumbnails
    modalProjThumbs.innerHTML = project.gallery
      .map(
        (g, i) =>
          `<button type="button" class="gallery-thumb" role="tab" aria-label="Photo ${i + 1}" style="background-image:url('${g.src}')"></button>`
      )
      .join('');
    modalProjThumbs.querySelectorAll('.gallery-thumb').forEach((t, i) => {
      t.addEventListener('click', () => showGalleryImage(project.gallery, i));
    });

    showGalleryImage(project.gallery, 0);
    projectModal.scrollTop = 0;
    const body = projectModal.querySelector('.project-modal-body');
    if (body) body.scrollTop = 0;
    openModal(projectModal);
  });

  const closeProj = () => closeModal(projectModal);
  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProj);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProj();
  });
}

/* ----------------------------- Global ESC to close ------------ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach((m) => closeModal(m));
  }
});
