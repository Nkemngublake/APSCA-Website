// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Job Listings Data
const jobs = [
  {
    id: 1,
    title: "Médecin Généraliste",
    location: "Yaoundé",
    type: "Temps Plein",
    description: "Nous recherchons un médecin généraliste passionné pour rejoindre notre équipe mobile de santé."
  },
  {
    id: 2,
    title: "Infirmier(ère) Diplômé(e)",
    location: "Douala",
    type: "Temps Plein",
    description: "Assurer les soins infirmiers et le suivi des patients dans nos centres communautaires."
  },
  {
    id: 3,
    title: "Agent Communautaire",
    location: "Région de l'Est",
    type: "Bénévole / Indemnisé",
    description: "Sensibiliser les populations locales sur les enjeux de santé publique (VIH, Paludisme)."
  },
  {
    id: 4,
    title: "Responsable Suivi & Évaluation",
    location: "Yaoundé",
    type: "CDD",
    description: "Gérer la collecte et l'analyse des données de nos programmes de santé."
  }
];

// Render Job Listings
const jobsContainer = document.getElementById('job-listings');

if (jobsContainer) {
  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('glass-card', 'job-card', 'fade-in-up');
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
    jobsContainer.appendChild(jobCard);
  });
}

// Modal Logic for Recruitment
const recruitmentModal = document.getElementById('application-modal');
const closeRecruitmentBtn = document.querySelector('#application-modal .close-modal');
const modalRecruitmentTitle = document.getElementById('modal-job-title');
const applicationForm = document.getElementById('application-form');

if (recruitmentModal) {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-btn')) {
      const jobTitle = e.target.getAttribute('data-job-title');
      modalRecruitmentTitle.textContent = `Postuler pour : ${jobTitle}`;
      recruitmentModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });

  const closeRecModal = () => {
    recruitmentModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  if (closeRecruitmentBtn) {
    closeRecruitmentBtn.addEventListener('click', closeRecModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === recruitmentModal) {
      closeRecModal();
    }
  });

  // Handle Form Submission
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = applicationForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      const formData = new FormData(applicationForm);
      
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      // In a real production environment, you would use EmailJS, a backend proxy, 
      // or a service like Formspree to handle the file upload and email sending.
      // For this static site, we simulate the success and provide the email contact.
      
      setTimeout(() => {
        alert('Votre candidature a été préparée. Veuillez également envoyer votre CV directement à : actionpromotion.santeca@gmail.com');
        window.location.href = `mailto:actionpromotion.santeca@gmail.com?subject=Candidature: ${modalRecruitmentTitle.textContent}&body=Nom: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0ATéléphone: ${formData.get('phone')}%0D%0AMessage: ${formData.get('message')}`;
        
        applicationForm.reset();
        closeRecModal();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
}

// Projects Data
const projects = [
  {
    id: 1,
    title: "Campagne Nationale de Sensibilisation VIH/SIDA",
    category: "Santé Publique",
    status: "Terminé",
    date: "2023",
    image: "/images/project1.png",
    description: "APSCA a mené une vaste campagne nationale visant à réduire les nouvelles infections par le VIH au Cameroun. Le projet s'est concentré sur les zones rurales mal desservies, où l'accès à l'information est limité. Nos équipes ont organisé des sessions de sensibilisation interactives dans plus de 200 villages, touchant directement 50 000 personnes.\n\nAu-delà de l'éducation, nous avons distribué 100 000 kits de prévention et facilité le dépistage volontaire pour des milliers de citoyens. Ce projet a été réalisé en partenariat avec le Ministère de la Santé Publique et a permis de renforcer le leadership communautaire dans la lutte contre la stigmatisation associée au virus."
  },
  {
    id: 2,
    title: "Renforcement des Capacités des ASC",
    category: "Renforcement des Capacités",
    status: "En Cours",
    date: "2024 - 2025",
    image: "/images/project_training.png",
    description: "Le renforcement du système de santé passe par des acteurs communautaires compétents. Ce programme ambitieux forme 200 Agents de Santé Communautaire (ASC) aux pratiques modernes de soins primaires.\n\nLa formation couvre la prise en charge intégrée des maladies de l'enfant (PCIME), le suivi nutritionnel et la surveillance épidémiologique. Nous intégrons également des outils numériques pour la collecte de données en temps réel, permettant une réponse plus rapide aux alertes sanitaires locales. Chaque ASC bénéficie d'un mentorat continu et de supervisions formatives régulières pour garantir la qualité des interventions."
  },
  {
    id: 3,
    title: "Projet RSS C19RM (Riposte COVID-19)",
    category: "Suivi Communautaire",
    status: "En Cours",
    date: "Mai - Déc 2025",
    image: "/images/project_c19rm_final.png",
    description: "Le projet C19RM (COVID-19 Response Mechanism) vise à renforcer la résilience du système de santé camerounais face aux pandémies. APSCA déploie un volet crucial de Suivi Dirigé par la Communauté (CLM) dans les districts d'Odza, Biyem Assi et Efoulan.\n\nEn recueillant systématiquement les retours des usagers sur la qualité des soins, nous identifions les goulots d'étranglement et plaidons pour des améliorations structurelles. Ce dispositif permet de pérenniser les acquis en matière de gouvernance sanitaire participative, assurant que les besoins des communautés sont au cœur des décisions de santé publique."
  },
  {
    id: 4,
    title: "Programme de Lutte contre la Tuberculose",
    category: "Santé Publique",
    status: "Terminé",
    date: "2022",
    image: "/images/project_tablet.png",
    description: "Ce programme a ciblé l'identification précoce et le traitement rigoureux de la tuberculose dans la région du Centre. Face à un taux élevé de perdus de vue, APSCA a mis en place un réseau de dépistage actif combinant cliniques mobiles et visites à domicile.\n\nSur 500 cas confirmés, un taux de réussite thérapeutique de 95% a été atteint grâce à l'implémentation stricte de la stratégie DOTS (Directly Observed Treatment Short-course). Le projet a également fourni un soutien nutritionnel et psychologique essentiel aux patients, réduisant considérablement les abandons de traitement."
  }
];

// Render Projects
const projectsContainer = document.getElementById('projects-grid');

if (projectsContainer) {
  projects.forEach(project => {
    const statusClass = project.status === 'Terminé' ? 'status-completed' : 'status-ongoing';

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400?text=APSCA+Project'"/>
      </div>
      <div class="project-status ${statusClass}">${project.status}</div>
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-footer">
          <span class="project-date">📅 ${project.date}</span>
          <button class="read-more-btn" data-id="${project.id}">En savoir plus &rarr;</button>
        </div>
      </div>
    `;
    projectsContainer.appendChild(projectCard);
  });

  // Project Modal Logic
  const projectModal = document.getElementById('project-modal');
  const closeProjectModal = document.getElementById('close-project-modal');
  const modalProjTitle = document.getElementById('modal-project-title');
  const modalProjCategory = document.getElementById('modal-project-category');
  const modalProjDate = document.getElementById('modal-project-date');
  const modalProjImage = document.getElementById('modal-project-image');
  const modalProjDescription = document.getElementById('modal-project-description');

  projectsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more-btn');
    if (btn) {
      const projectId = parseInt(btn.getAttribute('data-id'));
      const project = projects.find(p => p.id === projectId);

      if (project) {
        modalProjTitle.textContent = project.title;
        modalProjCategory.textContent = project.category;
        modalProjDate.textContent = `📅 ${project.date}`;
        modalProjImage.src = project.image;
        modalProjDescription.textContent = project.description;
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  const closeProjModal = () => {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', closeProjModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjModal();
    }
  });
}
