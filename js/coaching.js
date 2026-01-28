/**
 * WTM Online Coaching - Dynamic Functionality
 * Handles coach filtering, rendering, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // COACH RENDERING & FILTERING
    // =========================================
    const coachingGrid = document.getElementById('coaching-grid');
    const themeFilterContainer = document.getElementById('theme-filter-tags');
    const currentFilterValue = document.getElementById('current-filter-value');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const coachesCountValue = document.getElementById('coaches-count-value');
    const emptyState = document.getElementById('empty-state');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    // Exit if not on coaching page
    if (!coachingGrid || typeof coachingData === 'undefined') {
        return;
    }

    let currentFilter = 'all';
    let renderedCards = [];

    // =========================================
    // THEME LABEL MAPPING
    // =========================================
    const themeLabelMap = {};
    coachingData.themes.forEach(theme => {
        themeLabelMap[theme.id] = theme.label;
    });

    // =========================================
    // CREATE COACH CARD HTML
    // =========================================
    function createCoachCard(coach, index) {
        const photoHtml = coach.photo
            ? `<img src="../${coach.photo}" alt="${coach.name}" loading="lazy">`
            : `<div class="coach-photo-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
               </div>`;

        // Get first 3 theme labels
        const themeLabels = coach.themes
            .slice(0, 3)
            .map(themeId => themeLabelMap[themeId] || themeId)
            .map(label => `<span class="coach-theme-tag">${label}</span>`)
            .join('');

        return `
            <article class="coach-card reveal stagger-${(index % 4) + 1}" 
                     data-coach-id="${coach.id}" 
                     data-themes="${coach.themes.join(',')}">
                <div class="coach-card-header">
                    <div class="coach-photo">
                        ${photoHtml}
                    </div>
                    <div class="coach-header-info">
                        <h3 class="coach-name">${coach.name}</h3>
                        <p class="coach-role">${coach.role}</p>
                    </div>
                </div>
                <div class="coach-card-body">
                    <p class="coach-motto">${coach.motto}</p>
                    <p class="coach-description">${coach.description}</p>
                    <div class="coach-themes">
                        ${themeLabels}
                    </div>
                </div>
                <div class="coach-card-footer">
                    <a href="${coach.profileUrl}" class="coach-profile-link" target="_blank" rel="noopener">
                        Mehr erfahren
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </article>
        `;
    }

    // =========================================
    // RENDER ALL COACHES
    // =========================================
    function renderCoaches(filter = 'all') {
        currentFilter = filter;

        // Filter coaches
        const filteredCoaches = filter === 'all'
            ? coachingData.coaches
            : coachingData.coaches.filter(coach => coach.themes.includes(filter));

        // Update count
        if (coachesCountValue) {
            coachesCountValue.textContent = filteredCoaches.length;
        }

        // Show/hide empty state
        if (emptyState) {
            emptyState.style.display = filteredCoaches.length === 0 ? 'block' : 'none';
        }

        // Clear grid
        coachingGrid.innerHTML = '';

        // Render cards
        filteredCoaches.forEach((coach, index) => {
            coachingGrid.insertAdjacentHTML('beforeend', createCoachCard(coach, index));
        });

        // Trigger reveal animations
        setTimeout(() => {
            const cards = coachingGrid.querySelectorAll('.coach-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 50);

        // Update filter indicator
        updateFilterIndicator(filter);
    }

    // =========================================
    // UPDATE FILTER INDICATOR
    // =========================================
    function updateFilterIndicator(filter) {
        if (!currentFilterValue || !clearFilterBtn) return;

        if (filter === 'all') {
            currentFilterValue.textContent = 'Alle Coaches';
            clearFilterBtn.style.display = 'none';
        } else {
            const theme = coachingData.themes.find(t => t.id === filter);
            currentFilterValue.textContent = theme ? theme.label : filter;
            clearFilterBtn.style.display = 'inline-flex';
        }
    }

    // =========================================
    // RENDER FILTER BUTTONS
    // =========================================
    function renderFilterButtons() {
        if (!themeFilterContainer) return;

        const buttonsHtml = coachingData.themes.map(theme => `
            <button class="theme-filter-btn ${theme.id === 'all' ? 'active' : ''}" 
                    data-theme="${theme.id}">
                <span class="filter-icon">${theme.icon}</span>
                ${theme.label}
            </button>
        `).join('');

        themeFilterContainer.innerHTML = buttonsHtml;

        // Add event listeners
        const filterBtns = themeFilterContainer.querySelectorAll('.theme-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');

                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Animate filter transition
                animateFilterTransition(theme);
            });
        });
    }

    // =========================================
    // ANIMATE FILTER TRANSITION
    // =========================================
    function animateFilterTransition(newFilter) {
        const cards = coachingGrid.querySelectorAll('.coach-card');

        // Fade out all cards
        cards.forEach(card => {
            card.classList.add('filtering-out');
            card.classList.remove('visible');
        });

        // Wait for fade out, then render new
        setTimeout(() => {
            renderCoaches(newFilter);
        }, 300);
    }

    // =========================================
    // CLEAR FILTER HANDLER
    // =========================================
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', () => {
            // Reset active button
            const filterBtns = themeFilterContainer.querySelectorAll('.theme-filter-btn');
            filterBtns.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-theme') === 'all');
            });

            animateFilterTransition('all');
        });
    }

    // Reset filter button in empty state
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', () => {
            const filterBtns = themeFilterContainer.querySelectorAll('.theme-filter-btn');
            filterBtns.forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-theme') === 'all');
            });

            animateFilterTransition('all');
        });
    }

    // =========================================
    // INITIALIZE
    // =========================================
    renderFilterButtons();
    renderCoaches('all');

    // =========================================
    // SCROLL-BASED ANIMATIONS FOR FILTER
    // =========================================
    const filterContainer = document.querySelector('.theme-filter-container');
    const filterScroll = document.querySelector('.theme-filter-scroll');
    const filterFadeLeft = document.querySelector('.filter-fade-left');
    const filterFadeRight = document.querySelector('.filter-fade-right');

    if (filterScroll && filterFadeLeft && filterFadeRight) {
        function updateScrollIndicators() {
            const { scrollLeft, scrollWidth, clientWidth } = filterScroll;

            filterFadeLeft.style.opacity = scrollLeft > 10 ? '1' : '0';
            filterFadeRight.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0';
        }

        filterScroll.addEventListener('scroll', updateScrollIndicators);
        window.addEventListener('resize', updateScrollIndicators);

        // Initial check
        setTimeout(updateScrollIndicators, 100);
    }

    // =========================================
    // REVEAL ANIMATIONS ON SCROLL
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    console.log('WTM Coaching Page Initialized');
});
