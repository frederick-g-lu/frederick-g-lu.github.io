// ===== Main JavaScript File =====

// DOM Elements
const currentYear = document.getElementById('current-year');
const skillsCategories = document.getElementById('skills-categories');
const projectsList = document.getElementById('projects-list');
const experienceList = document.getElementById('experience-list');
const publicationsList = document.getElementById('publications-list');
const activitiesGrid = document.getElementById('activities-grid');
const heroTerminalNav = document.getElementById('hero-terminal-nav');
const heroNavInput = document.getElementById('hero-nav-input');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
}, { passive: true });

// ===== Set Current Year =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== Load Skills (Categorized) =====
function loadSkills() {
    try {
        if (!skillsCategories) {
            console.error('Skills categories element not found');
            return;
        }

        skillsCategories.innerHTML = '';

        fetch('data/config.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(config => {
                const skillsData = config.skills || {};

                if (Object.keys(skillsData).length === 0) {
                    skillsCategories.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No skills data available.</p>';
                    return;
                }

                Object.entries(skillsData).forEach(([category, skills]) => {
                    const categoryCard = document.createElement('div');
                    categoryCard.className = 'skill-category';
                    categoryCard.innerHTML = `
                        <h3 class="skill-category-title">${category}</h3>
                        <div class="skill-list">
                            ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    `;
                    skillsCategories.appendChild(categoryCard);
                });
            })
            .catch(error => {
                console.error('Error loading skills:', error);
                if (skillsCategories) {
                    skillsCategories.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load skills.</p>';
                }
            });
    } catch (error) {
        console.error('Error loading skills:', error);
        if (skillsCategories) {
            skillsCategories.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load skills.</p>';
        }
    }
}

// ===== Load Experience =====
function loadExperience() {
    try {
        if (!experienceList) {
            console.error('Experience list element not found');
            return;
        }

        experienceList.innerHTML = '';

        fetch('data/config.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(config => {
                const experienceData = config.experience || [];

                if (experienceData.length === 0) {
                    experienceList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No experience data available.</p>';
                    return;
                }

                experienceData.forEach(exp => {
                    const experienceItem = document.createElement('div');
                    experienceItem.className = 'experience-item';
                    experienceItem.innerHTML = `
                        <div class="experience-meta">
                            <h3 class="experience-position">${exp.position}</h3>
                            <p class="experience-company">${exp.company}</p>
                            <p class="experience-period">${exp.period}</p>
                        </div>
                        <div class="experience-details">
                            <ul>
                                ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    experienceList.appendChild(experienceItem);
                });
            })
            .catch(error => {
                console.error('Error loading experience:', error);
                if (experienceList) {
                    experienceList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load experience.</p>';
                }
            });
    } catch (error) {
        console.error('Error loading experience:', error);
        if (experienceList) {
            experienceList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load experience.</p>';
        }
    }
}

// ===== Load Projects =====
function loadProjects() {
    try {
        if (!projectsList) {
            console.error('Projects list element not found');
            return;
        }

        projectsList.innerHTML = '';

        fetch('data/projects.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(projectsData => {
                projectsData.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.className = 'project-item';
                    projectItem.innerHTML = `
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-year">${project.year}</p>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                        </div>
                    `;
                    projectsList.appendChild(projectItem);
                });
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                if (projectsList) {
                    projectsList.innerHTML = '<p style="color: var(--text-muted);">Unable to load projects.</p>';
                }
            });
    } catch (error) {
        console.error('Error loading projects:', error);
        if (projectsList) {
            projectsList.innerHTML = '<p style="color: var(--text-muted);">Unable to load projects.</p>';
        }
    }
}

// ===== Load Publications =====
function loadPublications() {
    try {
        if (!publicationsList) {
            console.error('Publications list element not found');
            return;
        }

        publicationsList.innerHTML = '';

        fetch('data/publications.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(publicationsData => {
                if (publicationsData.length === 0) {
                    publicationsList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No publications available.</p>';
                    return;
                }

                publicationsData.forEach(pub => {
                    const pubItem = document.createElement('div');
                    pubItem.className = 'publication-item';
                    pubItem.innerHTML = `
                        <div class="publication-header">
                            <h3 class="publication-title">${pub.title}</h3>
                            <p class="publication-year">${pub.year}</p>
                        </div>
                        <p class="publication-journal"><strong>${pub.journal}</strong></p>
                        <p class="publication-description">${pub.description}</p>
                        <div class="publication-tech">
                            ${pub.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="publication-links">
                            ${pub.url ? `<a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="publication-link">Read Paper</a>` : ''}
                        </div>
                    `;
                    publicationsList.appendChild(pubItem);
                });
            })
            .catch(error => {
                console.error('Error loading publications:', error);
                if (publicationsList) {
                    publicationsList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load publications.</p>';
                }
            });
    } catch (error) {
        console.error('Error loading publications:', error);
        if (publicationsList) {
            publicationsList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load publications.</p>';
        }
    }
}
function loadActivities() {
    try {
        if (!activitiesGrid) {
            console.error('Activities grid element not found');
            return;
        }

        activitiesGrid.innerHTML = '';

        fetch('data/config.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(config => {
                const activitiesData = config.activities || [];

                if (activitiesData.length === 0) {
                    activitiesGrid.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No activities data available.</p>';
                    return;
                }

                activitiesData.forEach(activity => {
                    const activityCard = document.createElement('div');
                    activityCard.className = 'activity-card';
                    activityCard.innerHTML = `
                        <h3 class="activity-title">${activity.title}</h3>
                        <p class="activity-description">${activity.description}</p>
                    `;
                    activitiesGrid.appendChild(activityCard);
                });
            })
            .catch(error => {
                console.error('Error loading activities:', error);
                if (activitiesGrid) {
                    activitiesGrid.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load activities.</p>';
                }
            });
    } catch (error) {
        console.error('Error loading activities:', error);
        if (activitiesGrid) {
            activitiesGrid.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Unable to load activities.</p>';
        }
    }
}
function setupHeroTerminalNav() {
    if (!heroTerminalNav || !heroNavInput) return;

    const defaultPlaceholder = 'type: skills, projects, publications, experience, education, activities, contact';
    heroNavInput.placeholder = defaultPlaceholder;

    const aliases = {
        home: 'home',
        skills: 'skills',
        projects: 'work',
        project: 'work',
        publications: 'publications',
        papers: 'publications',
        research: 'publications',
        experience: 'experience',
        work: 'experience',
        education: 'education',
        school: 'education',
        activities: 'activities',
        interests: 'activities',
        contact: 'contact',
        email: 'contact'
    };

    heroTerminalNav.addEventListener('submit', (event) => {
        event.preventDefault();

        const value = (heroNavInput.value || '').trim().toLowerCase();
        const targetId = aliases[value];

        if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                heroNavInput.value = '';
                heroNavInput.placeholder = defaultPlaceholder;
                return;
            }
        }

        heroNavInput.value = '';
        heroNavInput.placeholder = defaultPlaceholder;
    });

    heroNavInput.addEventListener('blur', () => {
        heroNavInput.placeholder = defaultPlaceholder;
    });
}

// ===== Initialize on DOM Load =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

function initialize() {
    setTimeout(() => {
        loadSkills();
        loadProjects();
        loadPublications();
        loadExperience();
        loadActivities();
        setupHeroTerminalNav();

        if (typeof initScrollAnimations === 'function') {
            setTimeout(() => {
                initScrollAnimations();
            }, 100);
        }
    }, 50);
}
