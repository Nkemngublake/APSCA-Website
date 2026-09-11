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
    image: '/images/project1.png',
    description:
      "APSCA a mené une vaste campagne nationale visant à réduire les nouvelles infections par le VIH au Cameroun. Le projet s'est concentré sur les zones rurales mal desservies, où l'accès à l'information est limité. Nos équipes ont organisé des sessions de sensibilisation interactives dans plus de 200 villages, touchant directement 50 000 personnes.\n\nAu-delà de l'éducation, nous avons distribué 100 000 kits de prévention et facilité le dépistage volontaire pour des milliers de citoyens. Ce projet a été réalisé en partenariat avec le Ministère de la Santé Publique et a permis de renforcer le leadership communautaire dans la lutte contre la stigmatisation associée au virus.",
  },
  {
    id: 2,
    title: 'Renforcement des Capacités des ASC',
    category: 'Renforcement des Capacités',
    status: 'En Cours',
    date: '2024 - 2025',
    image: '/images/project_training.png',
    description:
      "Le renforcement du système de santé passe par des acteurs communautaires compétents. Ce programme ambitieux forme 200 Agents de Santé Communautaire (ASC) aux pratiques modernes de soins primaires.\n\nLa formation couvre la prise en charge intégrée des maladies de l'enfant (PCIME), le suivi nutritionnel et la surveillance épidémiologique. Nous intégrons également des outils numériques pour la collecte de données en temps réel, permettant une réponse plus rapide aux alertes sanitaires locales. Chaque ASC bénéficie d'un mentorat continu et de supervisions formatives régulières pour garantir la qualité des interventions.",
  },
  {
    id: 3,
    title: 'Projet RSS C19RM (Riposte COVID-19)',
    category: 'Suivi Communautaire',
    status: 'En Cours',
    date: 'Mai - Déc 2025',
    image: '/images/project_c19rm_final.png',
    description:
      "Le projet C19RM (COVID-19 Response Mechanism) vise à renforcer la résilience du système de santé camerounais face aux pandémies. APSCA déploie un volet crucial de Suivi Dirigé par la Communauté (CLM) dans les districts d'Odza, Biyem Assi et Efoulan.\n\nEn recueillant systématiquement les retours des usagers sur la qualité des soins, nous identifions les goulots d'étranglement et plaidons pour des améliorations structurelles. Ce dispositif permet de pérenniser les acquis en matière de gouvernance sanitaire participative, assurant que les besoins des communautés sont au cœur des décisions de santé publique.",
  },
  {
    id: 4,
    title: 'Programme de Lutte contre la Tuberculose',
    category: 'Santé Publique',
    status: 'Terminé',
    date: '2022',
    image: '/images/project_tablet.png',
    description:
      "Ce programme a ciblé l'identification précoce et le traitement rigoureux de la tuberculose dans la région du Centre. Face à un taux élevé de perdus de vue, APSCA a mis en place un réseau de dépistage actif combinant cliniques mobiles et visites à domicile.\n\nSur 500 cas confirmés, un taux de réussite thérapeutique de 95% a été atteint grâce à l'implémentation stricte de la stratégie DOTS (Directly Observed Treatment Short-course). Le projet a également fourni un soutien nutritionnel et psychologique essentiel aux patients, réduisant considérablement les abandons de traitement.",
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
        <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=APSCA'"/>
      </div>
      <div class="project-status ${statusClass}">${project.status}</div>
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-footer">
          <span class="project-date">📅 ${project.date}</span>
          <button class="read-more-btn" data-id="${project.id}">En savoir plus <span aria-hidden="true">&rarr;</span></button>
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
  const modalProjImage = document.getElementById('modal-project-image');
  const modalProjDescription = document.getElementById('modal-project-description');

  projectsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more-btn');
    if (!btn) return;
    const project = projects.find((p) => p.id === parseInt(btn.getAttribute('data-id'), 10));
    if (!project) return;
    modalProjTitle.textContent = project.title;
    modalProjCategory.textContent = project.category;
    modalProjDate.textContent = `📅 ${project.date}`;
    modalProjImage.src = project.image;
    modalProjImage.alt = project.title;
    modalProjDescription.textContent = project.description;
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
