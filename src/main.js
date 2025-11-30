// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  const bars = mobileMenuBtn.querySelectorAll('.bar');
  // Simple animation for hamburger to X could be added here
});

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

// Smooth Scroll for Anchor Links (optional if CSS scroll-behavior is not enough)
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
      <button class="btn-secondary apply-btn" data-job-id="${job.id}" data-job-title="${job.title}">Postuler</button>
    `;
    jobsContainer.appendChild(jobCard);
  });
}

// Modal Logic
const modal = document.getElementById('application-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-job-title');
const applicationForm = document.getElementById('application-form');

if (modal) {
  // Open Modal
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-btn')) {
      const jobTitle = e.target.getAttribute('data-job-title');
      modalTitle.textContent = `Postuler pour : ${jobTitle}`;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });

  // Close Modal
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  closeModalBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Form Submission
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate API call
    const btn = applicationForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    setTimeout(() => {
      alert('Votre candidature a été envoyée avec succès !');
      applicationForm.reset();
      closeModal();
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1500);
  });
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
    description: "Déploiement d'une stratégie nationale de prévention ciblée. Sensibilisation de plus de 50 000 bénéficiaires en zones rurales à travers des causeries éducatives et la distribution de 100 000 kits de prévention. Collaboration étroite avec les leaders communautaires pour briser la stigmatisation."
  },
  {
    id: 2,
    title: "Renforcement des Capacités des ASC",
    category: "Renforcement des Capacités",
    status: "En Cours",
    date: "2024 - 2025",
    image: "/images/project_training.png",
    description: "Programme intensif de formation et de supervision formative pour 200 Agents de Santé Communautaire (ASC). Modules axés sur la prise en charge intégrée des maladies de l'enfant (PCIME) communautaire, la surveillance épidémiologique et l'utilisation des outils de collecte de données numériques."
  },
  {
    id: 3,
    title: "Projet RSS C19RM (Riposte COVID-19)",
    category: "Suivi Communautaire",
    status: "En Cours",
    date: "Mai - Déc 2025",
    image: "/images/project_c19rm_final.png",
    description: "Mise en œuvre du volet communautaire du C19RM : Renforcement du Système de Santé (RSS) et Suivi Dirigé par la Communauté (CLM) dans les districts sanitaires d'Odza, Biyem Assi et Efoulan. Budget alloué : 9,4M FCFA. Objectif : Améliorer la qualité des services par le retour d'information des usagers."
  },
  {
    id: 4,
    title: "Programme de Lutte contre la Tuberculose",
    category: "Santé Publique",
    status: "Terminé",
    date: "2022",
    image: "/images/project_tablet.png",
    description: "Mise en place d'un réseau de dépistage actif de la tuberculose. Identification et mise sous traitement de 500 cas confirmés dans la région du Centre. Suivi rigoureux de l'observance thérapeutique (DOTS) et soutien nutritionnel aux patients vulnérables pour réduire les taux d'abandon."
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
          <a href="#" class="read-more" data-id="${project.id}">En savoir plus &rarr;</a>
        </div>
      </div>
    `;
    projectsContainer.appendChild(projectCard);
  });

  // Project Modal Logic
  const projectModal = document.getElementById('project-modal');
  const closeProjectModal = document.getElementById('close-project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalDate = document.getElementById('modal-project-date');
  const modalImage = document.getElementById('modal-project-image');
  const modalDescription = document.getElementById('modal-project-description');

  // Open Modal
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(btn.getAttribute('data-id'));
      const project = projects.find(p => p.id === projectId);

      if (project) {
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDate.textContent = `📅 ${project.date}`;
        modalImage.src = project.image;
        modalDescription.textContent = project.description;
        projectModal.style.display = 'block';
      }
    });
  });

  // Close Modal
  closeProjectModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
    }
  });
}
