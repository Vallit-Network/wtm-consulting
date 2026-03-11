/**
 * WTM Management Consulting - Corporate JavaScript
 * Clean, professional interactions with subtle animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // Hero entrance: fade in hero content only (opacity, no blur)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const heroEntrance = document.querySelector('.hero-entrance');
            if (heroEntrance) heroEntrance.classList.remove('hero-entrance');
        });
    });
    // (Chatbot loading moved entirely to injectSharedComponents for unification)

    // =========================================
    // UNIVERSAL NAVIGATION INJECTION
    // =========================================
    const injectNavigation = () => {
        const placeholder = document.getElementById('nav-placeholder');
        if (!placeholder) return;

        // specific check for the script to determine offset
        const script = document.querySelector('script[src*="js/main.js"]');
        let prefix = '';
        if (script) {
            const src = script.getAttribute('src');
            if (src.includes('../')) {
                prefix = '../';
            }
        }

        const isHome = prefix === '';

        // Helper for anchor links
        // If on home: #section
        // If on sub: ../index.html#section
        const getLink = (target) => {
            if (target.startsWith('#')) {
                return isHome ? target : `${prefix}index.html${target}`;
            }
            // External or absolute
            if (target.startsWith('http') || target.startsWith('mailto:')) return target;

            // Relative pages (e.g., "coaching/")
            return `${prefix}${target}`;
        };

        const html = `
    <header id="header">
        <div class="container">
            <nav>
                <a href="${isHome ? '#' : prefix + 'index.html'}" class="logo">
                    <img src="${prefix}assets/wtm_logo_gross.png" alt="WTM Management Consulting">
                </a>
                <div class="menu-toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <ul class="nav-links">
                    <li><a href="${getLink('#haltung')}" class="nav-link">Haltung</a></li>
                    <li class="nav-dropdown">
                        <a href="${getLink('#angebote')}" class="nav-link nav-dropdown-toggle">
                            Angebot
                            <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${getLink('#angebote')}">Leistungsbereiche</a>
                            <a href="${getLink('#trainings')}">Trainings & Seminare</a>
                            <a href="${getLink('coaching/')}">Business-Coaching</a>
                            <a href="${getLink('#fuehrungskraefte')}">Führungskräfte-Curriculum</a>
                        </div>
                    </li>
                    <li class="nav-dropdown">
                        <a href="${getLink('#success-stories')}" class="nav-link nav-dropdown-toggle">
                            Referenzen
                            <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${getLink('#success-stories')}">Success Stories</a>
                            <a href="${getLink('#testimonials')}">Stimmen</a>
                        </div>
                    </li>
                    <li class="nav-dropdown">
                        <a href="${getLink('#team')}" class="nav-link nav-dropdown-toggle">
                            Wir
                            <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <a href="${getLink('#team')}">Team</a>
                            <a href="${getLink('#zertifikate')}">Qualifikationen</a>
                        </div>
                    </li>
                    <li><a href="${getLink('#kontakt')}" class="nav-link">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
        `;

        placeholder.innerHTML = html;
    };

    // Inject immediately
    injectNavigation();

    // =========================================
    // MOBILE NAVIGATION
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    if (mobileMenuBtn) {
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (this.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking a link and handle smooth scroll with offset
    navLinksItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (mobileMenuBtn && navLinks) { // Ensure elements exist before trying to remove classes
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Smooth scroll with offset for anchor links
            const href = item.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 100; // Offset for sticky header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (href && href.includes('#')) {
                // Handle links like index.html#section from subpages
                const [page, id] = href.split('#');
                // If we are already on the target page, prevent default and smooth scroll
                if (window.location.pathname.endsWith(page) || (page === 'index.html' && (window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html')))) {
                    e.preventDefault();
                    history.pushState(null, null, '#' + id);
                    const targetElement = document.getElementById(id);
                    if (targetElement) {
                        const headerOffset = 100;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuBtn && navLinks && navLinks.classList.contains('active') &&
            !mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // =========================================
    // DROPDOWN NAVIGATION
    // =========================================
    const navDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // Toggle dropdown on click (for mobile - touch devices)
    navDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only on mobile (can't hover effectively)
            if (window.innerWidth <= 968) {
                e.preventDefault();
                e.stopPropagation();

                const parentDropdown = toggle.closest('.nav-dropdown');
                const isActive = parentDropdown.classList.contains('active');

                // Close all other dropdowns first
                navDropdowns.forEach(d => d.classList.remove('active'));

                // Toggle current dropdown
                if (!isActive) {
                    parentDropdown.classList.add('active');
                }
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            navDropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Close mobile menu when clicking dropdown menu items
    document.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navDropdowns.forEach(d => d.classList.remove('active'));
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // =========================================
    // STICKY HEADER & SCROLL TO TOP
    // =========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const header = document.getElementById('header') || document.querySelector('header');
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Show/hide scroll-to-top button
        if (scrollToTopBtn) {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });

    // Scroll to top click handler
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check immediately on load (wait a tick for injection)
    setTimeout(() => {
        const header = document.getElementById('header') || document.querySelector('header');
        if (header && window.scrollY > 80) {
            header.classList.add('scrolled');
        }
    }, 100);

    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // SCROLL REVEAL ANIMATIONS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .journey-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // =========================================
    // ANIMATED COUNTERS
    // =========================================
    const counters = document.querySelectorAll('.counter');
    const teamStats = document.querySelector('.team-stats');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2500; // Slightly slower for more impact
            const startTime = performance.now();

            // Smooth cubic easing
            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);

                // Ensure we start at 0 if progress is small, avoiding jumps
                const currentValue = Math.floor(target * easedProgress);
                counter.innerText = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px 0px -50px 0px"
    });

    if (teamStats) {
        counterObserver.observe(teamStats);
    } else if (document.querySelector('#team')) {
        // Fallback to team section if stats container not found
        counterObserver.observe(document.querySelector('#team'));
    }

    // =========================================
    // METHODOLOGY TABS
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // =========================================
    // TRAINING CATEGORY TABS
    // =========================================
    // =========================================
    // DYNAMIC SEMINAR RENDERING
    // =========================================
    const seminarGrid = document.getElementById('seminar-grid');
    const trainingTabs = document.querySelectorAll('.training-tab');

    // Category icon mapping for visual enhancement
    const categoryIcons = {
        leadership: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        change: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
        health: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        communication: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        management: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
    };

    // Function to create seminar card HTML
    function createSeminarCard(seminar) {
        // Generate list items for details with icons
        const detailsHtml = seminar.details.map((detail, index) => {
            const iconSvg = index === 0
                ? `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="detail-icon"><rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="detail-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

            return `
            <li>
                ${iconSvg}
                ${detail}
            </li>
        `}).join('');

        const categoryIcon = categoryIcons[seminar.category] || categoryIcons.leadership;
        const seminarUrl = seminar.url || `seminar?id=${seminar.id}`;

        return `
            <article class="training-card reveal" data-category="${seminar.category}" onclick="window.location.href='${seminarUrl}'">
                <div class="card-header">
                    <span class="training-badge">${seminar.badge}</span>
                    <div class="card-icon">${categoryIcon}</div>
                </div>
                <div class="card-content">
                    <h3>${seminar.title}</h3>
                    <p class="card-description">${seminar.shortDescription}</p>
                </div>
                <div class="card-footer">
                    <ul class="training-details">
                        ${detailsHtml}
                    </ul>
                    <span class="card-cta">
                        Mehr erfahren
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </div>
            </article>
        `;
    }

    // First 3 visible "Startseminare" order per category (IDs in desired order; rest keep relative order)
    const SEMINAR_FIRST_ORDER = {
        change: [
            'projekte-aus-der-krise-retten',
            'zusammenarbeit-von-generationen',
            'konflikterkennung-behandlung-praevention'
        ],
        health: [
            'gesundheitsorientiertes-fuehren',
            'widerstandsfaehigkeit-staerken',
            'selbstmitgefuehl'
        ],
        management: [
            'bwl-fuer-nicht-bwler',
            'projektmanagement-basistraining',
            'selbstmanagement'
        ]
    };

    // Function to render seminars by category
    function renderSeminars(category) {
        if (!seminarGrid || typeof window.seminarsData === 'undefined') return;

        // Clear current content
        seminarGrid.innerHTML = '';

        // Filter data
        let filteredSeminars = Object.values(window.seminarsData).filter(s => s.category === category);

        // Sort so first 3 visible match SEMINAR_FIRST_ORDER for this category
        const order = SEMINAR_FIRST_ORDER[category];
        if (order && order.length > 0) {
            filteredSeminars = [...filteredSeminars].sort((a, b) => {
                const idxA = order.indexOf(a.id);
                const idxB = order.indexOf(b.id);
                const posA = idxA >= 0 ? idxA : Infinity;
                const posB = idxB >= 0 ? idxB : Infinity;
                return posA - posB;
            });
        }

        // Generate HTML
        if (filteredSeminars.length > 0) {
            filteredSeminars.forEach(seminar => {
                seminarGrid.innerHTML += createSeminarCard(seminar);
            });
        } else {
            seminarGrid.innerHTML = '<p class="no-results">Für diese Kategorie sind aktuell keine Seminare gelistet.</p>';
        }

        // Re-observe new elements for animation
        const newCards = seminarGrid.querySelectorAll('.reveal');
        if (typeof revealObserver !== 'undefined') {
            newCards.forEach(el => revealObserver.observe(el));
            // Trigger animation slightly delayed to ensure DOM is ready
            setTimeout(() => {
                newCards.forEach(el => el.classList.add('visible'));
            }, 100);
        }
    }

    // Initial Render (Default to leadership)
    if (seminarGrid) {
        renderSeminars('leadership');
    }

    // Tab Event Listeners
    trainingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            trainingTabs.forEach(t => t.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');

            // Render selected category
            const category = tab.getAttribute('data-category');
            renderSeminars(category);
        });
    });

    // =========================================
    // TRAINING CAROUSEL LOGIC
    // =========================================
    const carouselPrev = document.querySelector('#trainings-container .carousel-btn.prev');
    const carouselNext = document.querySelector('#trainings-container .carousel-btn.next');

    if (carouselPrev && carouselNext && seminarGrid) {
        const getCardWidth = () => {
            const card = seminarGrid.querySelector('.training-card');
            if (!card) return 372;
            const style = window.getComputedStyle(seminarGrid);
            const gap = parseFloat(style.gap) || 32;
            return card.offsetWidth + gap;
        };

        const updateArrows = () => {
            const scrollLeft = seminarGrid.scrollLeft;
            const scrollWidth = seminarGrid.scrollWidth;
            const clientWidth = seminarGrid.clientWidth;
            const atLeftEdge = scrollLeft <= 10;
            const notScrollable = scrollWidth <= clientWidth + 2;
            const atRightEdge = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5;

            // Left arrow: hide when at left edge or when grid is not scrollable
            if (atLeftEdge || notScrollable) {
                carouselPrev.classList.add('carousel-btn-hidden');
            } else {
                carouselPrev.classList.remove('carousel-btn-hidden');
            }

            // Right arrow: hide when at right edge or when grid is not scrollable
            if (atRightEdge || notScrollable) {
                carouselNext.classList.add('carousel-btn-hidden');
            } else {
                carouselNext.classList.remove('carousel-btn-hidden');
            }
        };

        carouselNext.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            seminarGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        carouselPrev.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            seminarGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        // Update arrows on scroll
        seminarGrid.addEventListener('scroll', updateArrows);

        // Update arrows on resize
        window.addEventListener('resize', updateArrows);

        // Initial state: hide left arrow immediately (always start at scroll 0)
        carouselPrev.classList.add('carousel-btn-hidden');

        // Aggressive schedule for arrow updates
        const scheduleUpdate = () => {
            // Reset scroll to start on content change
            seminarGrid.scrollLeft = 0;
            // Immediately hide left arrow on reset
            carouselPrev.classList.add('carousel-btn-hidden');
            // Then compute properly
            updateArrows();
            requestAnimationFrame(updateArrows);
            setTimeout(updateArrows, 100);
            setTimeout(updateArrows, 300);
        };

        updateArrows();
        scheduleUpdate();

        // When content changes (tab switch), reset and update
        const observer = new MutationObserver(() => {
            seminarGrid.scrollLeft = 0;
            carouselPrev.classList.add('carousel-btn-hidden');
            scheduleUpdate();
        });
        observer.observe(seminarGrid, { childList: true });

        // When grid size changes (e.g. after images load), re-check
        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(seminarGrid);
    }

    // =========================================
    // SUCCESS STORIES CAROUSEL (Enhanced)
    // Pagination dots, desktop drag, keyboard nav
    // =========================================
    const successTrack = document.getElementById('success-stories-track');
    const successPrev = document.querySelector('#success-stories .carousel-btn.prev');
    const successNext = document.querySelector('#success-stories .carousel-btn.next');
    const successDotsContainer = document.getElementById('success-stories-dots');
    const successCounter = document.getElementById('success-stories-counter');

    if (successTrack && successPrev && successNext) {
        const cards = Array.from(successTrack.querySelectorAll('.case-study-card'));
        const totalSlides = cards.length;
        let currentIndex = 0;

        // Drag state (shared for touch and pointer)
        let isDragging = false;
        let startX = 0;
        let startTime = 0;

        // Build pagination dots
        if (successDotsContainer) {
            cards.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Story ${i + 1} anzeigen`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlidePosition();
                });
                successDotsContainer.appendChild(dot);
            });
        }

        const updateSlidePosition = () => {
            const currentTranslate = currentIndex * -100;
            successTrack.style.transform = `translateX(${currentTranslate}%)`;

            // Update container height to match current slide
            requestAnimationFrame(() => {
                const currentCard = cards[currentIndex];
                if (!currentCard) return;

                // If current card has expanded content, use its actual height
                const hasExpanded = currentCard.querySelector('.expandable-story-content.expanded');
                if (hasExpanded) {
                    successTrack.parentElement.style.height = `${currentCard.offsetHeight}px`;
                } else {
                    // Use tallest card height for uniform appearance in collapsed state
                    let maxHeight = 0;
                    cards.forEach(card => {
                        maxHeight = Math.max(maxHeight, card.offsetHeight);
                    });
                    successTrack.parentElement.style.height = `${maxHeight}px`;
                }
            });

            // Update arrow buttons
            if (successPrev) {
                if (currentIndex <= 0) {
                    successPrev.classList.remove('visible');
                } else {
                    successPrev.classList.add('visible');
                }
            }

            if (successNext) {
                if (currentIndex >= totalSlides - 1) {
                    successNext.classList.remove('visible');
                } else {
                    successNext.classList.add('visible');
                }
            }

            // Update dots
            if (successDotsContainer) {
                const dots = successDotsContainer.querySelectorAll('.dot');
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === currentIndex);
                });
            }

            // Update counter
            if (successCounter) {
                successCounter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            }
        };

        // Navigation Clicks
        successPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlidePosition();
            }
        });

        successNext.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSlidePosition();
            }
        });

        // ---- Pointer Events (Desktop drag + Touch) ----
        const onDragStart = (clientX) => {
            isDragging = true;
            startX = clientX;
            startTime = Date.now();
            successTrack.classList.add('is-dragging');
        };

        const onDragMove = (clientX) => {
            if (!isDragging) return;
            const diff = clientX - startX;
            const containerWidth = successTrack.parentElement.clientWidth;
            const percentDiff = (diff / containerWidth) * 100;
            let currentTranslate = (currentIndex * -100) + percentDiff;

            // Add resistance at edges
            if ((currentIndex === 0 && percentDiff > 0) ||
                (currentIndex === totalSlides - 1 && percentDiff < 0)) {
                currentTranslate = (currentIndex * -100) + (percentDiff * 0.3);
            }

            successTrack.style.transform = `translateX(${currentTranslate}%)`;
        };

        const onDragEnd = (clientX) => {
            if (!isDragging) return;
            isDragging = false;
            successTrack.classList.remove('is-dragging');

            const movedBy = clientX - startX;
            const elapsed = Date.now() - startTime;
            const velocity = Math.abs(movedBy) / elapsed; // px/ms
            const containerWidth = successTrack.parentElement.clientWidth;

            // Quick swipe (high velocity) or >15% drag
            const threshold = velocity > 0.5 ? 30 : containerWidth * 0.15;

            if (movedBy < -threshold && currentIndex < totalSlides - 1) {
                currentIndex++;
            } else if (movedBy > threshold && currentIndex > 0) {
                currentIndex--;
            }

            // Restore transition for snap
            successTrack.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
            updateSlidePosition();
        };

        // Touch Events
        successTrack.addEventListener('touchstart', (e) => {
            successTrack.style.transition = 'none';
            onDragStart(e.touches[0].clientX);
        }, { passive: true });

        successTrack.addEventListener('touchmove', (e) => {
            onDragMove(e.touches[0].clientX);
        }, { passive: true });

        successTrack.addEventListener('touchend', (e) => {
            onDragEnd(e.changedTouches[0].clientX);
        });

        // Mouse Events (Desktop drag)
        successTrack.addEventListener('mousedown', (e) => {
            e.preventDefault();
            successTrack.style.transition = 'none';
            onDragStart(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            onDragMove(e.clientX);
        });

        window.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            onDragEnd(e.clientX);
        });

        // Keyboard Navigation
        const successSection = document.getElementById('success-stories');
        if (successSection) {
            successSection.setAttribute('tabindex', '0');
            successSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
                    e.preventDefault();
                    currentIndex++;
                    updateSlidePosition();
                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    e.preventDefault();
                    currentIndex--;
                    updateSlidePosition();
                }
            });
        }

        // Window resize handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                successTrack.style.transition = 'none';
                updateSlidePosition();
                setTimeout(() => {
                    successTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                }, 50);
            }, 100);
        });

        // Listen for expand/collapse to recalculate height
        document.addEventListener('story-expand-toggle', () => {
            setTimeout(() => {
                if (cards[currentIndex]) {
                    const h = cards[currentIndex].offsetHeight;
                    successTrack.parentElement.style.height = `${h}px`;
                }
            }, 50);
            // Also update after animation finishes
            setTimeout(() => {
                if (cards[currentIndex]) {
                    const h = cards[currentIndex].offsetHeight;
                    successTrack.parentElement.style.height = `${h}px`;
                }
            }, 550);
        });

        // Initial setup
        updateSlidePosition();
        window.addEventListener('load', updateSlidePosition);
    }

    // =========================================
    // ACCORDION
    // =========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================
    // TESTIMONIAL CAROUSEL
    // =========================================
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialNav = document.getElementById('testimonial-nav');

    if (testimonialTrack && testimonialNav && window.testimonialsData) {
        // Truncate function removed - always showing full text

        // Render Testimonials
        // Render Testimonials
        window.testimonialsData.forEach((t, index) => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card');

            // Determine text length class
            const length = t.text.length;
            let lengthClass = 'text-medium';
            if (length < 200) lengthClass = 'text-short';
            if (length > 400) lengthClass = 'text-long';

            // Inner content structure - always full text
            let textHtml = `
                <div class="testimonial-text-container expanded">
                    <p class="testimonial-text ${lengthClass}">${t.text}</p>
                </div>
            `;

            card.innerHTML = `
                <div class="testimonial-quote">"</div>
                ${textHtml}
                <div class="author-info">
                    <div class="author-details">
                        <span class="author-name">${t.name}</span>
                        ${t.role ? `<span class="author-role">${t.role}</span>` : ''}
                        ${t.title ? `<span class="author-title" style="display:block; font-size: 0.85rem; margin-top: 4px; opacity: 0.8;">${t.title}</span>` : ''}
                    </div>
                </div>
            `;



            testimonialTrack.appendChild(card);
        });

        // Initialize Carousel Logic
        const cards = testimonialTrack.querySelectorAll('.testimonial-card');

        if (cards.length > 0) {
            let currentIndex = 0;
            let autoplayInterval;

            // Create navigation dots
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Testimonial ${index + 1} anzeigen`);
                if (index === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoplay();
                });

                testimonialNav.appendChild(dot);
            });

            const dots = testimonialNav.querySelectorAll('.dot');

            function goToSlide(index) {
                currentIndex = index;
                testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

                dots.forEach(d => d.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            }

            function nextSlide() {
                const nextIndex = (currentIndex + 1) % cards.length;
                goToSlide(nextIndex);
            }

            function startAutoplay() {
                autoplayInterval = setInterval(nextSlide, 8000); // 8 seconds for reading
            }

            function resetAutoplay() {
                clearInterval(autoplayInterval);
                startAutoplay();
            }

            // Pause on hover
            testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            testimonialTrack.addEventListener('mouseleave', startAutoplay);

            startAutoplay();
        }
    }

    // =========================================
    // CONTACT FORM FEEDBACK
    // =========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            btn.textContent = 'Wird gesendet...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    btn.textContent = 'Nachricht gesendet ✓';
                    btn.style.backgroundColor = '#3D7A77';
                    btn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    btn.textContent = 'Fehler aufgetreten';
                    btn.style.backgroundColor = '#ef4444';
                    console.error('Submission error:', errorData);
                    alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es später erneut.');
                }
            } catch (error) {
                console.error('Network error:', error);
                btn.textContent = 'Netzwerkfehler';
                btn.style.backgroundColor = '#ef4444';
                alert('Es gab einen Fehler beim Senden. Bitte überprüfen Sie Ihre Internetverbindung.');
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                btn.style.opacity = '';
            }, 3000);
        });
    }

    // =========================================
    // TEAM MODAL FUNCTIONALITY - Enhanced with Categories & Quick Info
    // =========================================
    const teamModal = document.getElementById('team-modal');
    const teamMemberCards = document.querySelectorAll('.team-member-card');
    const teamMembersGrid = document.getElementById('team-members-grid');
    const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // =========================================
    // HERO GALLERY – AUTO ROTATE & CLICK TO NEXT
    // =========================================
    function initHeroGallery() {
        const container = document.getElementById('hero-gallery');
        const morphImages = document.querySelectorAll('.morph-image');
        if (!container || morphImages.length === 0) return;

        let currentIndex = 0;
        let zIndex = 1;
        const fadeTime = 1200;
        let autoRotateInterval;

        function startAutoRotate() {
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                goToNext();
            }, 5000); // 5 seconds
        }

        function stopAutoRotate() {
            clearInterval(autoRotateInterval);
        }

        function goToNext() {
            const nextIndex = (currentIndex + 1) % morphImages.length;
            const currentImg = morphImages[currentIndex];
            const nextImg = morphImages[nextIndex];

            zIndex++;
            nextImg.style.zIndex = zIndex;
            nextImg.classList.add('active');

            setTimeout(() => {
                currentImg.classList.remove('active');
                currentIndex = nextIndex;
            }, fadeTime);
        }

        container.addEventListener('click', () => {
            goToNext();
            startAutoRotate(); // Reset timer
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToNext();
                startAutoRotate(); // Reset timer
            }
        });

        // Initialize auto-rotation
        startAutoRotate();

        // Optional: Pause on hover if desired, but for now kept simple as requested
        // container.addEventListener('mouseenter', stopAutoRotate);
        // container.addEventListener('mouseleave', startAutoRotate);
    }

    initHeroGallery();

    // Category configuration - Colors match mindmap section
    const categoryConfig = {
        leadership: { label: 'Führung', color: 'var(--color-cat-leadership)' },         // Anthrazit
        change: { label: 'Change', color: 'var(--color-cat-change)' },              // Rot (item-red)
        health: { label: 'Gesundheit', color: 'var(--color-cat-health)' },          // Grün (primary-dark)
        communication: { label: 'Kommunikation', color: 'var(--color-cat-communication)' }, // Gelb (item-yellow)
        management: { label: 'Management', color: 'var(--color-cat-management)' }       // Blau (item-blue)
    };

    // Team Member Data - Enhanced with Categories & Quick Info
    // Note: Content is placeholder and can be filled in later
    const teamMembersData = {
        1: {
            name: 'Dr. Till Reichert',
            role: 'Geschäftsführer',
            photo: 'assets/team/till-reichert-square.jpg',
            categories: ['leadership', 'communication', 'management'],
            motto: '20% Theorie und 80% Praxis.',
            shortDescription: [
                'Verbindung von Fachkompetenz und pragmatischer, lösungsfokussierter Herangehensweise',
                'Mehrere Tausend Menschen zu den Themen Führung und Kommunikation unterstützt',
                'Maßgeschneiderte Lösungen im Bereich Personal- und Organisationsentwicklung',
                'Business Trainings auf Deutsch und Englisch, in Präsenz und Live-Online'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Führungskräfteentwicklung',
                '• Führen ohne Vorgesetztenfunktion',
                '• Projektmanagement sowie Krisenmanagement für Projektmanager',
                '• Kommunikation & Persönlichkeit sowie Zeit- und Selbstmanagement',
                '• Teamentwicklung',
                '',
                'Stationen im Beruf:',
                '• Seit 2014 Coach-Ausbilder',
                '• Seit 2009 Business Coach & Trainer',
                '• 10 Jahre Hochschuldozent für Management, Marketing & Wirtschaftspsychologie',
                '• 10 Jahre klassischer Unternehmensberater (zuletzt Projektleiter & Gesellschafter)',
                '• Industrieerfahrung: Assistent des Vorstandsvorsitzenden einer AG',
                '',
                'Aus- und Weiterbildungen:',
                '• Dr. rer. oec., Diplom-Ökonom (Ruhr-Universität Bochum)',
                '• Zertifizierter Coach (Dr. Björn Migge – Dr. Migge-Seminare)',
                '• Geprüfter Business-Trainer BDVT (Christa Mesnaric – Michl Group)',
                '• Zertifizierter Lehr-Coach (Dr. Björn Migge – DFC)',
                '',
                'Arbeitssprachen: Deutsch und Englisch'
            ]
        },
        2: {
            name: 'Malte Werner',
            role: 'Geschäftsführer',
            photo: 'assets/team/malte-werner-square.jpg',
            categories: ['leadership', 'change', 'management'],
            motto: 'Balance zwischen humorvollem Elan und der nötigen Seriosität.',
            shortDescription: [
                'Hohe Beobachtungsgabe für Details ermöglicht ihm, die kleinen Stellschrauben zu identifizieren',
                'Analytisches Geschick und viel Fingerspitzengefühl',
                'Wissbegierig, unaufgeregt und humorvoll',
                'Sorgt für eine produktive Arbeitsatmosphäre'
            ],
            extendedBio: [
                'Professionalität:',
                'Malte Werner hat im Bachelor Philosophie, Politik und Ökonomik und im Master Ethik & Organisation an der Universität Witten/Herdecke studiert. Neben dem Studium hat er die studentische Unternehmensberatung denkleister GmbH geführt und eine Coachingausbildung absolviert. Nach dem Studium hat er 5 Jahre als freiberuflicher Coach und Trainer gearbeitet und wurde dann Teil der Geschäftsleitung von WTM Management Consulting, dessen Mitgesellschafter er auch heute ist.',
                '',
                'Aktuelle Themenschwerpunkte:',
                '• Führungskräfteentwicklung',
                '• Zeit- und Selbstmanagement',
                '• Generationen und Zusammenarbeit',
                '• Teamentwicklung',
                '• Digitale Transformationsprozesse'
            ]
        },
        3: {
            name: 'Frank Titzer',
            role: 'Gründer',
            photo: 'assets/team/frank_titzer-AI-v2.jpg',
            categories: ['communication', 'health', 'leadership'],
            motto: 'Klärung schafft Klarheit – auch in schwierigen Situationen.',
            shortDescription: [
                'Experte für Klärungshilfe und Konfliktlösung',
                'Coach und Supervisor mit systemischem Hintergrund',
                'Begleitung von Einzelpersonen und Teams in komplexen Situationen',
                'Fokus auf nachhaltige Kommunikation und Verständigung'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Klärungshilfe bei Konflikten',
                '• Coaching und Supervision',
                '• Kommunikation in schwierigen Situationen',
                '• Teambegleitung',
                '',
                'Arbeitsweise:',
                'Systemischer Ansatz mit Fokus auf Klärung und nachhaltige Verständigung zwischen allen Beteiligten.'
            ]
        },
        4: {
            name: 'Dr. Olaf Werner',
            role: 'Gründer',
            photo: 'assets/team/olaf_werner-square.jpg',
            categories: ['leadership', 'communication', 'management'],
            motto: 'Das Zusammenspiel von Mensch und Organisation fasziniert mich.',
            shortDescription: [
                'Erkennt wie verschiedene Arbeitsumgebungen Einfluss auf das Verhalten der Einzelnen ausüben',
                'Kreativ, zugewandt und feinfühlig',
                'Breites Wissen um Fragestellungen von Organisationen und Hierarchien',
                'Lösungsfokussierte und ökonomische Beratung'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Trainings und modulare Curricula zu Führung, Selbst- und Zeitmanagement',
                '• Gestaltung und Balance der eigenen Rolle im Beruf und Privaten',
                '• Verbesserung von Performance in Bereichen, Teams und Projekten',
                '• Persönlichkeitsentwicklung und Selbststeuerung',
                '• Konfliktbearbeitung und Krisenintervention',
                '• Komplexität und Intuition',
                '• Gestaltung von Veränderungsprozessen',
                '• Ausbildung von Coaches und Beratern',
                '',
                'Stationen im Beruf:',
                '• 1989 Tätigkeit in der Weiterbildungsabteilung der Robert Bosch GmbH',
                '• Seit 1990 selbständiger Trainer und Berater',
                '• Seit 2015 Mit-Geschäftsführer der WTM Management Consulting GmbH',
                '',
                'Professionalität:',
                '• Magisterexamen in Germanistik, Geschichte und Philosophie',
                '• Promotion in Psychologie und Ethnologie',
                '• Systemischer Berater, Organisationsaufstellung, Transaktionsanalyse',
                '• Gruppendynamik, Psychodrama, Trainer und Berater seit 1990'
            ]
        },
        5: {
            name: 'Andreas Cludius',
            role: 'Trainer & Coach',
            photo: 'assets/team/Cludius-Andreas-Team-500x500-1.jpg',
            categories: ['leadership', 'management', 'change'],
            motto: 'Menschen erkennen oft selbst den Bedarf einer Veränderung. Dabei ist die Umsetzung die eigentliche Herausforderung.',
            shortDescription: [
                'Business-Coach seit 2003, hauptberuflich seit 2011',
                'Schwerpunkt Personal- und Betriebsführung für Inhaber, Gesellschafter oder Geschäftsführer von KMU',
                'Seit 2015 zusätzliche Tätigkeit als Wirtschafts-Mediator',
                '3 Jahrzehnte Berufstätigkeit im Bankgeschäft, überwiegend in leitender Funktion'
            ],
            extendedBio: [
                'Erfahrung:',
                '• Business-Coach seit 2003 (nebenberuflich), seit 2011 hauptberuflich',
                '• Schwerpunkt: Personal- und Betriebsführung für KMU-Inhaber und Führungskräfte',
                '• Wirtschafts-Mediator seit 2015, Schwerpunkt innerbetriebliche Konfliktsituationen',
                '',
                'Berufserfahrung im Bankgeschäft:',
                '• 3 Jahrzehnte Berufstätigkeit, überwiegend in leitender Funktion',
                '• Kundenbetreuung von Groß- und Mittelstandskunden',
                '• Vertriebsorganisation, Strategieentwicklung und -umsetzung',
                '• Projektarbeit und -leitung',
                '• Führung und Führungskräfteentwicklung',
                '• Zuletzt in direkter Zusammenarbeit mit dem Vorstand',
                '',
                'Arbeitsweise:',
                'Kontinuierliche Begleitung in schwierigen Situationen bis zur Lösung des Problems.'
            ]
        },
        6: {
            name: 'Carmen Werner',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Carmen-Werner-Team_500x500.jpg',
            categories: ['leadership', 'communication', 'health'],
            motto: 'Den Menschen im Ganzen sehen, wertschätzen und ihn in seiner Balance zwischen Menschlichkeit und Professionalität unterstützen.',
            shortDescription: [
                'Selbständige Trainerin und Beraterin seit 1999',
                'Breites Kompetenzfeld durch Weiterbildungen in Kommunikationspsychologie, Konfliktmanagement und Menschenführung',
                'Begleitet Führungskräfteentwicklungsprogramme und klärt Konflikte in Unternehmen',
                'Lehrbeauftragte für Sparkassenakademien und Hochschulen'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Ausbildung und Begleitung von Führungskräften in Seminaren und Einzelcoachings',
                '• Messung und Implementierung von Führungskriterien in Unternehmen',
                '• Begleitung von Veränderungsprozessen in Unternehmen',
                '• Kommunikationsberatung',
                '• Konfliktklärungshilfe',
                '• Gesundheitsmanagement',
                '• Generationen-Kompetenz',
                '',
                'Stationen im Beruf:',
                '• Selbständige Trainerin und Beraterin seit 1999',
                '• Vertrieb im Finanzdienstsektor',
                '• Immobilienfinanzierung bei der LBS',
                '',
                'Weiterbildung und Qualifizierung:',
                '• Zertifizierte Kommunikationsberaterin, Prof. Dr. Friedemann Schulz von Thun',
                '• Zertifizierte Konfliktklärungshelferin, Dr. Christoph Thomann',
                '• Ausbildung zum Coach, Dr. Andreas Knierim Kassel',
                '• Ausbildung in Gruppendynamik, Team Dr. Rosenkranz und Eberhard Stahl',
                '• Heilpraktikerin für Psychotherapie'
            ]
        },
        7: {
            name: 'Dr. Bettina Brendel',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Phillip_Besch-500x500-1-AI-v2.jpg',
            categories: ['leadership', 'change', 'health'],
            motto: 'Authentizität, ein unerschütterliches Vertrauen in die Entfaltungsmöglichkeiten von Menschen und Humor zeichnen meine Arbeitsweise aus.',
            shortDescription: [
                'Expertise auf dem Gebiet Persönlichkeitsentwicklung',
                'Langjährige Arbeit in der Drogen- und Jugendhilfe sowie Führungskraft in der Sozialwirtschaft',
                'Stärken stärken und Aufbau von Resilienz als Schwerpunkt',
                'Systemischer Organisationsentwicklungsberater'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Team- und Organisationsentwicklung',
                '• Workshops zu Kommunikation und Persönlichkeit, (laterale) Führung, Resilienz',
                '• Coaching',
                '• Supervision',
                '',
                'Stationen im Beruf:',
                '• Seit 2015 Supervision in der Sozialwirtschaft',
                '• Seit 2004 Trainer, Berater und Coach',
                '• Mehr als 15 Jahre Mitarbeiter und Führungskraft in Sozialwirtschaft und Bildungswesen',
                '',
                'Aus- und Weiterbildungen:',
                '• Systemischer Organisationsentwicklungsberater (Alwart & Team, Hamburg)',
                '• NLP-Resonanz-Master (Institut Kutschera, DVNLP)',
                '• LINC Personality Profiler Coach (LINC-Institut)',
                '• Trainingsdesigner (Anna Langheiter)',
                '• Systemischer Businesscoach (Alwart & Team, Hamburg)',
                '• Diplompädagoge (Universität Hamburg)'
            ]
        },
        6: {
            name: 'Dr. Bettina Brendel',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Dr.-Bettina-Brendel-500x500-1.jpg',
            categories: ['leadership', 'communication', 'change'],
            motto: 'Es geht um die Wirkungen von Handlung oder Verhalten und nicht um richtig oder falsch.',
            shortDescription: [
                'Kommunikationsberaterin und Mediatorin seit 2005',
                'Begleitet Unternehmen, Teams und Führungskräfte bei Fragestellungen der Kooperation',
                'Geprägt durch Weiterbildungen bei Prof. Friedemann Schulz von Thun',
                'Langjährige Berufserfahrung als Stellvertretende Geschäftsführerin in einer Agentur'
            ],
            extendedBio: [
                'Themenschwerpunkte:',
                '• Konfliktklärung',
                '• Schwierige Gespräche führen',
                '• Metakommunikation im Team',
                '• Umgang mit Unterschieden und Störungen',
                '• Führen im Spannungsfeld zwischen Authentizität, Unternehmensvorgaben und Mitarbeiterorientierung',
                '• Selbstcoaching durch Rollenklärung und Zielsetzungen',
                '',
                'Berufserfahrung:',
                '• Kommunikationsberaterin und Mediatorin seit 2005',
                '• 1994-2004 Berufserfahrung in einer Agentur, zuletzt als Stellvertretende Geschäftsführerin',
                '',
                'Die Haltung ihrer systemischen Arbeit: Es geht um Anteile an Situationen, nicht um Schuld.'
            ]
        },
        7: {
            name: 'Andreas Cludius',
            role: 'Trainer & Berater',
            photo: 'assets/team/Cludius-Andreas-Team-500x500-1.jpg',
            categories: ['leadership', 'management', 'change'],
            motto: 'Menschen erkennen oft selbst den Bedarf einer Veränderung. Dabei ist die Umsetzung die eigentliche Herausforderung.',
            shortDescription: [
                'Business-Coach seit 2003, hauptberuflich seit 2011',
                'Schwerpunkt Personal- und Betriebsführung für Inhaber, Gesellschafter oder Geschäftsführer von KMU',
                'Seit 2015 zusätzliche Tätigkeit als Wirtschafts-Mediator',
                '3 Jahrzehnte Berufstätigkeit im Bankgeschäft, überwiegend in leitender Funktion'
            ],
            extendedBio: [
                'Erfahrung:',
                '• Business-Coach seit 2003 (nebenberuflich), seit 2011 hauptberuflich',
                '• Schwerpunkt: Personal- und Betriebsführung für KMU-Inhaber und Führungskräfte',
                '• Wirtschafts-Mediator seit 2015, Schwerpunkt innerbetriebliche Konfliktsituationen',
                '',
                'Berufserfahrung im Bankgeschäft:',
                '• 3 Jahrzehnte Berufstätigkeit, überwiegend in leitender Funktion',
                '• Kundenbetreuung von Groß- und Mittelstandskunden',
                '• Vertriebsorganisation, Strategieentwicklung und -umsetzung',
                '• Projektarbeit und -leitung',
                '• Führung und Führungskräfteentwicklung',
                '• Zuletzt in direkter Zusammenarbeit mit dem Vorstand',
                '',
                'Arbeitsweise:',
                'Kontinuierliche Begleitung in schwierigen Situationen bis zur Lösung des Problems.'
            ]
        },
        8: {
            name: 'Dr. Bettina Hailer',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Dr.-Bettina-Hailer-500x500-1.jpg',
            categories: ['leadership', 'communication', 'change'],
            motto: 'Wertschätzung gegenüber dem Erreichten und den Potentialen sind mir ein besonderes Anliegen.',
            shortDescription: [
                'Über 20 Jahre Führungserfahrung im Gesundheitswesen, zuletzt als Vorständin eines Universitätsklinikums',
                'Authentische, klare und offene Art',
                'Fähigkeit zur Analyse, Strukturierung und Verbindlichkeit',
                'BWL-Studium und Promotion an der Universität Mannheim'
            ],
            extendedBio: [
                'Professionalität:',
                '• 20 Jahre Führungserfahrung im Gesundheitswesen',
                '• Zuletzt Vorständin eines Universitätsklinikums',
                '• Langjährige Dozentin an der Hochschule Neu-Ulm',
                '• Seit 2014 Beraterin, Trainerin und Mediatorin',
                '',
                'Schwerpunktthemen:',
                '• Begleitung und Training von Führungskräften',
                '• Konfliktmanagement und Mediation',
                '',
                'Ausbildung:',
                '• BWL-Studium und Promotion an der Universität Mannheim',
                '• Wirtschaftsmediatorin (IHK)',
                '• Systemische Beraterin und Coach',
                '',
                'Haltung:',
                'Veränderungsprozesse so steuern und strukturieren, dass ein für das individuelle Unternehmen passendes Ergebnis erzielt werden kann.'
            ]
        },
        22: {
            name: 'Wolfgang Hoffmann',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Foto-Wolfgang-Hoffmann-AI-v2.jpg',
            categories: ['leadership', 'communication', 'change'],
            motto: 'Führung bedeutet nicht nur, Verantwortung zu tragen, sondern auch Vertrauen zu schaffen und zu erhalten.',
            shortDescription: [
                'Leidenschaftlicher Verfechter von lebendiger Führung',
                '35 Jahre in operativer Transport- und Lagerlogistik',
                '20 Jahre Geschäftsführer von Speditionen und Logistikunternehmen',
                'Fokus auf Persönlichkeitsentwicklung, Teamentwicklung und Führungskompetenzen'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Teambuilding-Seminare: Entfachen der Teamdynamik und Schaffen einer offenen Kommunikationskultur',
                '• 1:1 Business-Coaching für Führungskräfte',
                '• Modulares Führungskräfteentwicklungsprogramm',
                '• Multikulturelle Arbeitswelt und interkulturelle Fähigkeiten',
                '• Berufs- und Karriereorientierung',
                '',
                'Erfahrung im Beruf:',
                '• 35 Jahre in operativer Transport- und Lagerlogistik',
                '• 20 Jahre Geschäftsführer von Speditionen und Logistikunternehmen',
                '• Weg vom Sachbearbeiter zum Geschäftsführer',
                '• 2022 Trainer, Berater, Coach',
                '',
                'Ausbildung:',
                '• Industriekaufmann',
                '• Betriebswirt (VWA)',
                '• Ausbilder IHK für Logistikberufe',
                '• Coach- und Beraterausbildung nach ICF-Standards (WTM)',
                '',
                'Sprachen: Deutsch (Muttersprache), Englisch, Spanisch, Französisch'
            ]
        },
        19: {
            name: 'Melanie Kubala',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Melanie-Kubala-500x500-1-AI-v2.jpg',
            categories: ['leadership', 'change', 'communication'],
            motto: 'Mutig sein und Verantwortung übernehmen ist mein Kredo.',
            shortDescription: [
                'Fokussierter Blick auf den Menschen der Unterstützung benötigt',
                'Größte Talente: Einfühlungsvermögen, Einzelwahrnehmung und das Benennen von Unentdecktem',
                'Gepaart mit Wortwitz und Humor bekommen schwierige Situationen Leichtigkeit',
                'Methoden richten sich immer nach dem Anliegen und den Wünschen des Coachees'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Einzel- und Teamcoachings zu Veränderungsprozessen',
                '• Persönlichkeitsentwicklung und Lösen von Blockaden',
                '• Führungstrainings und Kommunikation',
                '• Teamentwicklung und Rollenmodell',
                '• Onboarding neuer Mitarbeiter',
                '',
                'Stationen im Beruf:',
                '• Seit 2015 Coach/Trainerin für Persönlichkeitsentwicklung',
                '• 2010-2014 HR-Managerin',
                '• 2008-2010 Personalreferentin',
                '• 2006-2007 Personaldisponentin/Projektleiterin',
                '',
                'Aus- und Weiterbildungen:',
                '• WTM zertifizierte Coaching und Beraterausbildung',
                '• Ausbildung zur Heilpraktikerin für Psychotherapie',
                '• Bachelor Professional of Human Resources CCI',
                '• Staatlich geprüfte Betriebswirtin'
            ]
        },
        13: {
            name: 'Hermann Josef Leiders',
            role: 'Trainer & Coach',
            photo: 'assets/team/Harry_Leiders_team_500x500-AI-v2.jpg',
            categories: ['leadership', 'communication', 'health'],
            motto: 'Schwerpunkte der heutigen Arbeit sind Führung, Kommunikation und Umgang mit Stress und Belastung.',
            shortDescription: [
                'Selbständiger Trainer und Berater seit 2000',
                'Zunächst Führungsaufgaben innerhalb der Polizei NRW',
                'Lehrtrainer für Verhaltenstraining mit Programm zur Stressbewältigung',
                'Personal- und Organisationsentwicklung für Industrieunternehmen und öffentliche Verwaltungen'
            ],
            extendedBio: [
                'Schwerpunkte:',
                '• Führungs- und Kommunikationstrainings',
                '• Teamentwicklungen',
                '• Krisenmanagement in Konfliktsituationen',
                '• Gestaltung der Zeit',
                '• Hilfestellungen im Umgang mit Stress und Belastung',
                '',
                'Berufserfahrung:',
                '• Führungsaufgaben innerhalb der Polizei NRW',
                '• Ab 1985 Verhaltenstrainer, dann Lehrtrainer',
                '• Bis 2000 Vermittlung eines Stressbewältigungsprogramms an Polizeibeamte',
                '• Seit 2000 selbständiger Trainer und Berater',
                '',
                'Weiterbildungen:',
                '• Supervisor (DGSv)',
                '• Personalentwicklung im lernenden Unternehmen (Universität Kaiserslautern)',
                '• NLP-Master (DGLNP)',
                '• Qualifizierung zum Coach (Hephaistos, München)'
            ]
        },
        11: {
            name: 'Heike Neidhart',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Profilbild_Heike_Neidhart_Team_500x500.jpg',
            categories: ['health', 'communication', 'change'],
            motto: 'Menschen auf Ihrem Weg zu begleiten ist meine Leidenschaft.',
            shortDescription: [
                'Reich gefüllter, stetig wachsender Methodenkoffer',
                'Kunden schätzen Neugierde, Offenheit und wertschätzende, empathische Art',
                'Erfahrung als Coach, Trainerin, IT-Consultant und Familienmanagerin',
                'Vertrauensvolle Atmosphäre ermöglicht es, das eigene Potential zu entfalten'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Mindset- und Persönlichkeitsentwicklung',
                '• Teamentwicklung und Teambuilding',
                '• Berufsorientierung für Erwachsene und Jugendliche',
                '• Einzelcoaching: Orientierung, Entscheidungsfindung, Zielklarheit',
                '',
                'Stationen im Beruf:',
                '• Seit 07/2023 Partnerin WTM Management Consulting GmbH',
                '• Seit 2022 Trainerin, Coach (selbständig nebenberuflich)',
                '• Seit 2014 IT-Compliance, Informationssicherheit',
                '• 2001-2014 Entwicklung und Produktmanagerin Kredit-/Debitkarten',
                '• 1998-2001 Studium Dipl. Wirtschaftsinformatikerin',
                '',
                'Aus- und Weiterbildung:',
                '• LINC Personality Profiler (LPP)',
                '• Coach- und Beraterausbildung, ICF zertifiziert (WTM)',
                '• ProfilPASS® Beraterin',
                '',
                'Sprachen: Deutsch (Muttersprache), Englisch'
            ]
        },
        10: {
            name: 'Gerold Pohl',
            role: 'Trainer & Coach',
            photo: 'assets/team/Gerold-Pohl-Team-500-x-500.jpg',
            categories: ['leadership', 'change', 'management'],
            motto: 'In mehr als 25 Jahren als Führungskraft hat sich mein Führungsverständnis zum agilen Prinzip der Selbstorganisation und Eigenverantwortung entwickelt.',
            shortDescription: [
                'Wert von Vertrauen, Offenheit und Zuverlässigkeit kennengelernt',
                'Systemisch, agile Arbeitsweise hilft Unternehmen zu Orten lebendiger Arbeit zu werden',
                'Menschen sind das Herzstück jeder Organisation',
                'Veränderungen bis ins "hohe" Alter möglich und zur persönlichen Erfüllung beitragend'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Moderne Führung (New Leadership): Offenheit, Vertrauen, Kooperation, Empathie',
                '• Führen mit OKR (Objectives and Key Results)',
                '• Strategie und Vision',
                '• Agile Transformation im Unternehmen',
                '• Liberating Structures für bessere Meetings',
                '• Hybride Arbeit und Zusammenarbeit',
                '• Generationen begreifen, Durchstarten mit 60+',
                '',
                'Erfahrung im Beruf:',
                '• Seit 1990 in verschiedenen Führungsrollen',
                '• Von lateraler Führung als Projektleiter zum Bereichsleiter mit 100 Mitarbeitern',
                '• Team-Entwicklung und agile Transformation',
                '',
                'Ausbildungen:',
                '• Liberating Structures',
                '• Berater und Coach nach ICF Standards (WTM)',
                '• Agile Transformation / Agiles Arbeiten',
                '• Betriebswirt (VWA)',
                '• Transaktionsanalyse, Gruppendynamik'
            ]
        },
        14: {
            name: 'Jürgen Reus',
            role: 'Trainer & Coach',
            photo: 'assets/team/Juergen_Reus_AI.png',
            categories: ['management', 'communication', 'change'],
            motto: 'Wichtig ist mir, die Mitarbeiter und Kunden dort abzuholen, wo sie gerade stehen.',
            shortDescription: [
                'Schwerpunkt: Menschen bei Prozessgestaltung und Projekten unterstützen',
                'Kommunikativ, freundlich, optimistisch und wortgewandt',
                'Trainer seit 1989, Organisationsberater seit 1991',
                'Erfahrung in Großkonzernen, mittelständischer Wirtschaft und sozialen Einrichtungen'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Projekt- und Prozessmanagement',
                '• Konzeption und Moderation von Tagungen (auch Großgruppe)',
                '• Selbst- und Zeitmanagement',
                '• Präsentationstechnik, Kreativitätstechniken',
                '• Professionalisierung von Vertriebsprozessen',
                '• Impulsvorträge',
                '',
                'Stationen im Beruf:',
                '• Seit 1989 Trainer',
                '• Seit 1989 Dozent an den Dualen Hochschulen in Karlsruhe und Mannheim',
                '• Seit 1991 Organisationsberater/Projektleiter',
                '• Seit 1995 Prokurist: Leitung größerer Vertriebseinheiten',
                '• Seit 2006 Moderationen aller Art',
                '',
                'Branchenerfahrung:',
                'Großkonzerne, mittelständische Wirtschaft, soziale Einrichtungen, Beratungs- und Softwareunternehmen'
            ]
        },
        16: {
            name: 'Maik Rieß',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Maik-Riess-500x500-1.jpg',
            categories: ['leadership', 'management', 'communication'],
            motto: 'Leistung und Mensch gehören zusammen – nur so entsteht echter Erfolg.',
            shortDescription: [
                'Langjährige Erfahrung im Technologie- und Industrieumfeld',
                'Die Fähigkeit komplizierte Zusammenhänge verständlich und hoch strukturiert darzustellen',
                '"Dolmetscher" zwischen verschiedenen Bereichen zu sein (die Klassiker: "IT und Anwender", "Technik und Produktion", usw.)',
                'Gewinner mehrerer Preise vom BaTB und dvct'
            ],
            extendedBio: [
                'Expertise:',
                'Team- und Businesscoach aus Leidenschaft. Begleitet Teams und Arbeitsgruppen auf dem Weg zu mehr Effektivität und Effizienz. Nutzt die Fähigkeit zur Visualisierung für gemeinsame Bilder und einheitliches Verständnis.',
                '',
                'Stationen im Beruf:',
                '• 13 Jahre Erfahrung als Fach- und Führungskraft in der Informationstechnologie',
                '• 8 Jahre interne Unternehmensberatung, Schwerpunkt Organisationsentwicklung / Lean Management',
                '• Personalentwickler und Trainer in einem weltweit tätigen Industrieunternehmen',
                '• Dozent an der Dualen Hochschule im Studiengang Change Management',
                '• Gewinner des BaTB Trainerpreises 2010',
                '• Gewinner des dvct Coach- und Trainer-Awards 2011',
                '',
                'Ausbildungen und Werdegang:',
                '• Studium Betriebswirtschaft mit Schwerpunkt Personalwesen & Produktion',
                '• Verbandszertifizierter Business-Trainer (dvct e.V.)',
                '• Systemischer Business-Coach (Steinbeis Hochschule Berlin)',
                '• Klärungshelfer in Konflikten (Dr. Christoph Thomann)',
                '• Visual Facilitator (Kommunikationslotsen)',
                '• Teamcoach (LNLPT)'
            ]
        },
        9: {
            name: 'Dr. Sarolf Sauer',
            role: 'Trainer & Coach',
            photo: 'assets/team/Sarolf_Sauer_Team_500x500-AI-v2.jpg',
            categories: ['leadership', 'health', 'communication'],
            motto: 'Haltung und Persönlichkeit sind der Schlüssel.',
            shortDescription: [
                'Befähigt Coachees durch Persönlichkeitsentwicklung ihren eigenen Weg zu erkennen',
                'Vielfältige persönliche und berufliche Erfahrungen als Grundlage',
                'Begleitung durch die Höhen und Tiefen des eigenen Lebens- und Berufswegs',
                'Schwerpunkt auf Haltung und innerer Kraft'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Coaching von Führungskräften',
                '• Persönlichkeitsentwicklung',
                '• Führungskräftetrainings',
                '• Kommunikationstrainings',
                '',
                'Stationen im Beruf:',
                '• Bundeswehr bis 2008 (Oberst d.R.)',
                '• Führungsakademie der Bundeswehr, Dozent für Auftragstaktik und Mentale Fitness',
                '• Selbstständig seit 2015, Trainer, Berater, Coach',
                '• Geschäftsführer einer größeren Einrichtung im Gesundheitswesen',
                '',
                'Aus- und Weiterbildung:',
                '• Diplom-Pädagoge an der Bundeswehruniversität München',
                '• Promotion Psychologie – Arbeit und Gesundheit PsyGA – baua',
                '• Coachingausbildung (Dr. Björn Migge)',
                '• Klärungshelfer in Konflikten (Dr. Christoph Thomann)'
            ]
        },
        17: {
            name: 'Marcus Schmidt',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Marcus-Schmidt-6-23.jpg',
            categories: ['leadership', 'change', 'management'],
            motto: 'Kooperation gelingt immer dann, wenn ich mir des Unterschieds von Absicht und Wirkung bewusst bin.',
            shortDescription: [
                'Über 20 Jahre Erfahrung als Führungskraft',
                'Erfahrung in Matrixorganisationen, Change Management und Vertrieb',
                'Begleitung der regionalen und kulturübergreifenden Zusammenarbeit',
                'Systemisch-konstruktivistische Arbeit hin zur Selbstbemächtigung'
            ],
            extendedBio: [
                'Schwerpunkte:',
                '• Entwicklung von Führungspersönlichkeit',
                '• Laterale und virtuelle Führung',
                '• Implementierung von Führungsleitlinien',
                '• Kulturentwicklung und Kultur als Managementaufgabe',
                '• Reflexion über Haltung, Rolle, Verhalten',
                '• Coaching von Einzelnen, Teams und Gruppen',
                '',
                'Erfahrung im Beruf:',
                '• Über 20 Jahre in Führungsrollen und als Projekt- und Programmleiter',
                '• Erfahrung in veränderungs- und vertriebsorientierten Linienorganisationen',
                '• Matrixorganisationen und Regionen übergreifende Zusammenarbeit',
                '',
                'Ausbildungen:',
                '• Zertifizierter Coach (Dr. Migge Seminare)',
                '• Berater und Trainer (WTM)',
                '• Lehrbeauftragter Hochschule Pforzheim (Projekt- und Change Management, Führungskräfteentwicklung)'
            ]
        },
        15: {
            name: 'Kirsten Schmiegelt',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Kirsten_Schmiegelt_3-1.jpg',
            categories: ['communication', 'health', 'leadership'],
            motto: 'Wertschätzung und die Arbeit auf Augenhöhe sind die fruchtbarste Grundlage für nachhaltige Veränderungen.',
            shortDescription: [
                'Mentorin für Stimmbildung, Bühnenpräsenz und authentisches Auftreten',
                'Expertise in Führungskräfteentwicklung und Teambuilding',
                '12-jährige Karriere als Bühnendarstellerin in Theater und Film',
                'Über 20 Jahre Trainerin und Coach im Bereich Business und Gesundheit'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Führungskräfteentwicklung',
                '• Stimmbildung, Bühnenpräsenz und authentisches Auftreten',
                '• Resilienz und Selbstfürsorge gegen Stress und Burnout',
                '• Women Leadership',
                '• Keynote Speaking',
                '',
                'Stationen im Beruf:',
                '• Über 20 Jahre selbständige Trainerin/Coach',
                '• 12 Jahre Bühnendarstellerin in Theater, Film, TV, Musical',
                '• Lehraufträge an Pflegeschulen und Fachhochschulen',
                '',
                'Aus- und Weiterbildungen:',
                '• Diplom Sozialpädagogin (HAW Hamburg)',
                '• Ausbildung zur Schauspielerin (Schauspielschule Hamburg)',
                '• Ausbildung zur Musicaldarstellerin (Joop van den Ende Academy)',
                '• Zertifizierte Yoga-Lehrerin (BYV und YA certified)',
                '• Betriebliche Gesundheitsberaterin (Fernuniversität Hagen)'
            ]
        },
        18: {
            name: 'Markus Schramm',
            role: 'Trainer & Coach',
            photo: 'assets/team/Markus_Schramm_AI.png',
            categories: ['leadership', 'change', 'communication'],
            motto: 'Ich brenne dafür, Menschen in ihrer Entwicklung zu begleiten.',
            shortDescription: [
                'Expertise in Teamcoaching sowie 1:1 Coaching für Fach- und Führungskräfte',
                'Spezialist für Teamentwicklung und Veränderungsprozesse',
                'Über 20 Jahre Erfahrung in Energiewirtschaft und Beratung',
                'Fokus auf prozessorientierte Begleitung'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Teamcoaching',
                '• 1:1 Coaching für Fach- und Führungskräfte',
                '• Teamentwicklung',
                '• Prozessorientierte Begleitung von Veränderungsprozessen',
                '• Moderation',
                '',
                'Stationen im Beruf:',
                '• 20+ Jahre in Energiewirtschaft und Beratung',
                '• Personalentwicklung, Organisationsberatung, Planung und Controlling',
                '• Seit 2021 freiberuflicher Trainer und Coach',
                '',
                'Aus- und Weiterbildungen:',
                '• Diplom Betriebswirt (DH)',
                '• Systemischer Teamentwickler (Coach Competence Center)',
                '• Zertifizierter Coach nach ICF/IOBC (WTM/ifsm)'
            ]
        },
        12: {
            name: 'Heike Stalling',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Stalling-Heike-Team-Portrait-500x500-6-23.jpg',
            categories: ['communication', 'management', 'leadership'],
            motto: 'Mit Erfolgserlebnissen und dem "Getting Things Done"-Prinzip im Arbeitsalltag wieder durchatmen.',
            shortDescription: [
                'Vielseitige Trainerin: vom Impulsworkshop bis zum komplexen Seminarprogramm',
                'Strukturiertes Arbeiten und Flexibilität: angewandte Zeitmanagement-Methoden',
                'Erfahrung als Rechtsanwältin/Notarssubstitutin bringt praxisorientierte Herangehensweise',
                'Expertise von persönlichem Auftreten und Rhetorik bis zu digitaler Korrespondenz'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Zeit- und Selbstmanagement, Selbstorganisation (klassisch und agil)',
                '• Persönliches Auftreten und Wirkung',
                '• Rhetorik und Präsentation',
                '• Digitale Korrespondenz, E-Mail-Kultur',
                '',
                'Stationen im Beruf:',
                '• Rechtsanwältin und Notarssubstitutin',
                '• Kauffrau, Trainerin und Coach',
                '• Autorin und Fachjournalistin',
                '',
                'Aus- und Weiterbildung:',
                '• Trainerausbildung (WTM)',
                '• Ausbildung Zeit- und Selbstmanagement (Tempus)',
                '• ADG-Trainerfortbildung',
                '• Wertorientierte Imaginative Traumatherapie (WIIT)'
            ]
        },
        20: {
            name: 'Philipp Besch',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Phillip_Besch-500x500-1-AI-v2.jpg',
            categories: ['leadership', 'change', 'health'],
            motto: 'Authentizität, ein unerschütterliches Vertrauen in die Entfaltungsmöglichkeiten von Menschen und Humor zeichnen meine Arbeitsweise aus.',
            shortDescription: [
                'Expertise auf dem Gebiet Persönlichkeitsentwicklung',
                'Langjährige Arbeit in der Drogen- und Jugendhilfe sowie Führungskraft in der Sozialwirtschaft',
                'Stärken stärken und Aufbau von Resilienz als Schwerpunkt',
                'Systemischer Organisationsentwicklungsberater'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Team- und Organisationsentwicklung',
                '• Workshops zu Kommunikation und Persönlichkeit, (laterale) Führung, Resilienz',
                '• Coaching',
                '• Supervision',
                '',
                'Stationen im Beruf:',
                '• Seit 2015 Supervision in der Sozialwirtschaft',
                '• Seit 2004 Trainer, Berater und Coach',
                '• Mehr als 15 Jahre Mitarbeiter und Führungskraft in Sozialwirtschaft und Bildungswesen',
                '',
                'Aus- und Weiterbildungen:',
                '• Systemischer Organisationsentwicklungsberater (Alwart & Team, Hamburg)',
                '• NLP-Resonanz-Master (Institut Kutschera, DVNLP)',
                '• LINC Personality Profiler Coach (LINC-Institut)',
                '• Trainingsdesigner (Anna Langheiter)',
                '• Systemischer Businesscoach (Alwart & Team, Hamburg)',
                '• Diplompädagoge (Universität Hamburg)'
            ]
        },
        21: {
            name: 'Uta-Barbara Vogel',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Barbara_AI.png',
            categories: ['Training', 'Persönlichkeit'],
            motto: 'Konsequent und mit dem Blick für Zusammenhänge, verbinde ich Direktheit mit Wertschätzung.',
            shortDescription: [
                'Inhaberin, Coach und Trainerin bei Menschen & Wandel',
                'Begleitung von Menschen in beruflichen Veränderungsprozessen',
                'Schwerpunkte: Potentialentwicklung, Führung, Gesundheit und Kommunikation',
                'Breite Erfahrung in der betrieblichen Gesundheitsförderung'
            ],
            extendedBio: [
                'Aktuelle Schwerpunkte:',
                '• Potentialentwicklung und Führungstrainings',
                '• Gesundheitsförderung und Resilienz',
                '• Kommunikationstrainings',
                '• Veränderungsprozesse begleiten',
                '',
                'Stationen im Beruf:',
                '• Inhaberin, Coach und Trainerin bei Menschen & Wandel',
                '• Langjährige Erfahrung in der betrieblichen Gesundheitsförderung',
                '• Begleitung von beruflichen Veränderungsprozessen',
                '',
                'Arbeitsweise:',
                'Verbindet Direktheit mit Wertschätzung und hat einen klaren Blick für Zusammenhänge.'
            ]
        }
    };

    // =========================================
    // CATEGORY FILTER FUNCTIONALITY
    // =========================================
    let currentCategoryFilter = 'all';

    function filterTeamByCategory(category) {
        currentCategoryFilter = category;

        // Update active button state
        categoryFilterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        });

        // Filter cards with animation
        teamMemberCards.forEach(card => {
            const memberId = card.getAttribute('data-member');
            const member = teamMembersData[memberId];

            if (!member) return;

            const matchesFilter = category === 'all' ||
                (member.categories && member.categories.includes(category));

            if (matchesFilter) {
                card.style.display = '';
                card.classList.remove('filtered-out');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px) scale(0.95)';
                card.classList.add('filtered-out');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Category filter event listeners
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterTeamByCategory(category);
        });
    });

    // =========================================
    // TEAM MODAL WITH MORPHING EFFECT
    // =========================================

    function openTeamModal(memberId) {
        const member = teamMembersData[memberId];
        if (!member || !teamModal) return;

        // Get modal elements
        const modalName = teamModal.querySelector('.modal-name');
        const modalRole = teamModal.querySelector('.modal-role');
        const modalCategories = document.getElementById('modal-categories');
        const modalQuickInfo = document.getElementById('modal-quick-info');
        const modalBio = document.getElementById('modal-bio');
        const modalQualifications = document.getElementById('modal-qualifications');
        const modalPhotoContainer = document.getElementById('modal-photo-container');
        const modalAvatar = document.getElementById('modal-avatar');

        // Populate name and role
        if (modalName) modalName.textContent = member.name;
        if (modalRole) modalRole.textContent = member.role;

        // Update photo and avatar
        if (modalPhotoContainer) {
            if (member.photo) {
                modalPhotoContainer.innerHTML = `<img src="${member.photo}" alt="${member.name}" loading="lazy">`;
                if (modalAvatar) {
                    modalAvatar.innerHTML = `<img src="${member.photo}" alt="${member.name}" loading="lazy">`;
                }
            } else {
                modalPhotoContainer.innerHTML = `
                    <div class="photo-placeholder large">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </div>
                `;
                if (modalAvatar) {
                    modalAvatar.innerHTML = '';
                }
            }
        }

        // Update category badges
        if (modalCategories && member.categories) {
            modalCategories.innerHTML = member.categories.map(cat => {
                const config = categoryConfig[cat];
                if (!config) return '';
                return `
                    <span class="category-badge" style="--category-color: ${config.color}">
                        ${config.label}
                    </span>
                `;
            }).join('');
        }

        // Update quick info / shortDescription with motto
        if (modalQuickInfo) {
            let quickInfoHtml = '';

            // Add motto if available
            if (member.motto) {
                quickInfoHtml += `<li class="motto-item"><em>"${member.motto}"</em></li>`;
            }

            // Add shortDescription items
            if (member.shortDescription) {
                quickInfoHtml += member.shortDescription.map(info => `
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        ${info}
                    </li>
                `).join('');
            }

            modalQuickInfo.innerHTML = quickInfoHtml;
        }

        // Update bio with extendedBio
        if (modalBio && member.extendedBio) {
            modalBio.innerHTML = member.extendedBio.map(p => {
                if (p === '') return '<br>';
                if (p.startsWith('•')) return `<p class="bullet-point">${p}</p>`;
                if (p.endsWith(':')) return `<p class="section-header"><strong>${p}</strong></p>`;
                return `<p>${p}</p>`;
            }).join('');
        }

        // Hide qualifications section (now included in extendedBio)
        if (modalQualifications) {
            modalQualifications.style.display = 'none';
        }

        // Show modal with animation
        teamModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset morphing state
        const modalContent = teamModal.querySelector('.modal-content');
        const detailContainer = teamModal.querySelector('.detail-expand-container');
        if (detailContainer) {
            detailContainer.classList.remove('expanded');
            const toggleText = teamModal.querySelector('.toggle-text');
            if (toggleText) toggleText.textContent = 'Mehr Details anzeigen';
        }
        if (modalContent) {
            modalContent.classList.remove('photo-minimized');
        }
    }

    function closeTeamModal() {
        if (!teamModal) return;
        teamModal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset morphing state
        const modalContent = teamModal.querySelector('.modal-content');
        const detailContainer = teamModal.querySelector('.detail-expand-container');
        if (detailContainer) {
            detailContainer.classList.remove('expanded');
            const toggleText = teamModal.querySelector('.toggle-text');
            if (toggleText) toggleText.textContent = 'Mehr Details anzeigen';
        }
        if (modalContent) {
            modalContent.classList.remove('photo-minimized');
        }
    }

    // =========================================
    // MORPHING TOGGLE INSIDE MODAL
    // =========================================
    const detailExpandToggle = document.getElementById('detail-expand-toggle');
    if (detailExpandToggle) {
        detailExpandToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const container = detailExpandToggle.closest('.detail-expand-container');
            const toggleText = detailExpandToggle.querySelector('.toggle-text');
            const modalContent = document.querySelector('.modal-content');

            if (container) {
                container.classList.toggle('expanded');

                if (container.classList.contains('expanded')) {
                    toggleText.textContent = 'Details ausblenden';
                    // Morph: photo shrinks to avatar
                    if (modalContent) modalContent.classList.add('photo-minimized');
                } else {
                    toggleText.textContent = 'Mehr Details anzeigen';
                    // Restore photo
                    if (modalContent) modalContent.classList.remove('photo-minimized');
                }
            }
        });
    }

    // Event listeners for team cards -> open modal
    teamMemberCards.forEach(card => {
        card.addEventListener('click', () => {
            const memberId = card.getAttribute('data-member');
            openTeamModal(memberId);
        });
    });

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeTeamModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeTeamModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && teamModal && teamModal.classList.contains('active')) {
            closeTeamModal();
        }
    });

    // Close modal when clicking contact button inside
    const modalCta = teamModal ? teamModal.querySelector('.modal-cta') : null;
    if (modalCta) {
        modalCta.addEventListener('click', closeTeamModal);
    }


    // =========================================
    // COOKIE CONSENT BANNER
    // =========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const essentialCookiesBtn = document.getElementById('essential-cookies');
    const cookieSettingsLink = document.getElementById('cookie-settings-link');

    function setCookieConsent(type) {
        const consent = {
            essential: true,
            analytics: type === 'all',
            marketing: type === 'all',
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('wtm-cookie-consent', JSON.stringify(consent));
    }

    function getCookieConsent() {
        const consent = localStorage.getItem('wtm-cookie-consent');
        return consent ? JSON.parse(consent) : null;
    }

    function showCookieBanner() {
        if (cookieBanner) {
            // Small delay for animation
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 500);
        }
    }

    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('visible');
        }
    }

    // Initialize cookie banner
    if (cookieBanner) {
        const existingConsent = getCookieConsent();

        if (!existingConsent) {
            showCookieBanner();
        }

        // Accept all cookies
        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => {
                setCookieConsent('all');
                hideCookieBanner();
            });
        }

        // Essential only
        if (essentialCookiesBtn) {
            essentialCookiesBtn.addEventListener('click', () => {
                setCookieConsent('essential');
                hideCookieBanner();
            });
        }

        // Cookie settings link - re-show banner
        if (cookieSettingsLink) {
            cookieSettingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                showCookieBanner();
            });
        }
    }

    // =========================================
    // CHATBOT HELPER BUTTON
    // =========================================
    const chatbotHelper = document.getElementById('chatbotHelper');
    const openChatbotBtn = document.getElementById('openChatbot');

    if (chatbotHelper) {

        // Show chatbot helper after scrolling past 300px
        const showChatbotAfterScroll = () => {
            if (window.scrollY > 300) {
                chatbotHelper.classList.add('visible');
            } else {
                chatbotHelper.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', showChatbotAfterScroll);
        showChatbotAfterScroll(); // Initial check

        // Handle chatbot button click
        if (openChatbotBtn) {
            openChatbotBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openVallitChat();
            });
        }
    }

    // Function to open Vallit chat widget with smooth animation and feedback
    function openVallitChat() {

        const btn = document.getElementById('openChatbot');
        if (!btn) return;

        const originalContent = btn.innerHTML;

        // Set loading state
        btn.innerHTML = '<div class="btn-icon-wrapper"><div class="loading-spinner-small"></div></div><div class="btn-text-content"><span class="btn-title">Lade...</span></div>';
        btn.style.cursor = 'wait';

        // 1. Try finding the toggle button
        const findToggle = () =>
            document.querySelector('.syntra-toggle-btn') ||
            document.querySelector('[data-vallit-toggle]') ||
            document.querySelector('.vallit-widget-toggle') ||
            document.querySelector('#vallit-launcher');

        const helper = document.getElementById('chatbotHelper');

        const onChatOpened = () => {
            if (helper) helper.classList.add('opened');

            // Reset button state
            btn.innerHTML = originalContent;
            btn.style.cursor = '';

            // Watch for chat widget closing to restore helper visibility
            watchForChatClose();
        };

        const openChatViaBtn = (toggleBtn) => {
            toggleBtn.click();

            onChatOpened();
        };

        // 2. Initial Attempt
        const toggleBtn = findToggle();

        if (toggleBtn) {
            openChatViaBtn(toggleBtn);
        } else {

            // 3. Polling / API Fallback
            let attempts = 0;
            const maxAttempts = 40; // 10 seconds total (250ms interval)

            const pollInterval = setInterval(() => {
                attempts++;
                const btnFound = findToggle();

                // Strategy A: Button Found
                if (btnFound) {
                    clearInterval(pollInterval);
                    openChatViaBtn(btnFound);
                    return;
                }

                // Strategy B: Check for global API (Vallit / Syntra)
                if (window.Vallit && typeof window.Vallit.open === 'function') {
                    clearInterval(pollInterval);
                    window.Vallit.open();
                    onChatOpened();
                    return;
                }

                if (window.Syntra && typeof window.Syntra.open === 'function') {
                    clearInterval(pollInterval);
                    window.Syntra.open();
                    onChatOpened();
                    return;
                }

                // Timeout
                if (attempts >= maxAttempts) {
                    clearInterval(pollInterval);
                    console.error('Chat widget not found after timeout.');

                    // Reset button state
                    btn.innerHTML = originalContent;
                    btn.style.cursor = '';

                    // Show Toast ONLY - No redirect
                    showToast('Der Chat Assistent ist gerade nicht verfügbar. Bitte nutzen Sie das Kontaktformular.');
                }
            }, 250);
        }
    }

    // Simple Toast Notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'val-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Force reflow
        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }


    // Watch for Vallit chat widget closing to restore helper button
    function watchForChatClose() {
        const helper = document.getElementById('chatbotHelper');
        if (!helper) return;

        // Try to find the chat container/widget
        const findChatContainer = () =>
            document.querySelector('.syntra-chat-container') ||
            document.querySelector('.vallit-widget-container') ||
            document.querySelector('[data-vallit-container]') ||
            document.querySelector('.syntra-widget');

        let chatContainer = findChatContainer();

        // If container not immediately available, wait for it
        if (!chatContainer) {
            const containerObserver = new MutationObserver((mutations, obs) => {
                chatContainer = findChatContainer();
                if (chatContainer) {
                    obs.disconnect();
                    setupCloseWatcher(chatContainer, helper);
                }
            });
            containerObserver.observe(document.body, { childList: true, subtree: true });

            // Timeout fallback - restore visibility after 30 seconds if nothing happens
            setTimeout(() => {
                containerObserver.disconnect();
                if (helper.classList.contains('opened')) {
                    helper.classList.remove('opened');
                }
            }, 30000);
        } else {
            setupCloseWatcher(chatContainer, helper);
        }
    }

    function setupCloseWatcher(container, helper) {
        // Use multiple detection strategies

        // 1. Watch for container being removed or hidden
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // Check if container was removed
                if (mutation.removedNodes.length > 0) {
                    for (const node of mutation.removedNodes) {
                        if (node === container || node.contains(container)) {
                            helper.classList.remove('opened');
                            observer.disconnect();
                            return;
                        }
                    }
                }

                // Check for class changes indicating closed state
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('closed') ||
                        target.classList.contains('hidden') ||
                        target.classList.contains('syntra-hidden') ||
                        !target.classList.contains('syntra-open') && !target.classList.contains('open')) {
                        // Check if it was previously open
                        if (helper.classList.contains('opened')) {
                            helper.classList.remove('opened');
                            observer.disconnect();
                            return;
                        }
                    }
                }
            }
        });

        observer.observe(container.parentElement || document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        // 2. Also watch for clicks on close buttons
        const closeBtn = container.querySelector('.syntra-close-btn, .close-btn, [data-close], .vallit-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                setTimeout(() => {
                    helper.classList.remove('opened');
                    observer.disconnect();
                }, 300);
            }, { once: true });
        }

        // 3. Poll for visibility changes as fallback
        const visibilityPoll = setInterval(() => {
            if (!document.contains(container) ||
                container.style.display === 'none' ||
                container.style.visibility === 'hidden' ||
                container.offsetParent === null) {
                helper.classList.remove('opened');
                observer.disconnect();
                clearInterval(visibilityPoll);
            }
        }, 500);

        // Clean up after 2 minutes max
        setTimeout(() => {
            observer.disconnect();
            clearInterval(visibilityPoll);
        }, 120000);
    }

    // =========================================
    // JOINT HEADER / FOOTER / CHATBOT INJECTION
    // =========================================
    function injectSharedComponents() {
        const VALLIT_BASE_URL = 'https://www.vallit.net';
        const VALLIT_WIDGET_ID = 'wtm-web';
        const VALLIT_COMPANY_ID = 'wtm';

        const getPageType = () => {
            const path = window.location.pathname.toLowerCase();

            if (
                path === '/' ||
                path.endsWith('/index.html') ||
                path.endsWith('/index')
            ) {
                return 'home';
            }

            if (path.includes('/coaching')) {
                return 'coaching';
            }

            if (path.includes('/seminare/') || path.endsWith('/seminar.html')) {
                return 'seminar';
            }

            if (path.includes('datenschutz') || path.includes('impressum')) {
                return 'legal';
            }

            return 'default';
        };

        const getWidgetWelcomeMessage = (pageType) => {
            const h1Text = document.querySelector('h1')?.textContent?.trim();

            switch (pageType) {
                case 'home':
                    return 'Hallo! Wie kann ich Ihnen weiterhelfen?';
                case 'coaching':
                    return 'Ich sehe, Sie interessieren sich für unser Business-Coaching. Haben Sie Fragen zu Themen, Coaches oder dem Erstgespräch?';
                case 'seminar':
                    return h1Text
                        ? `Ich sehe, Sie interessieren sich für „${h1Text}“. Haben Sie Fragen dazu?`
                        : 'Ich sehe, Sie interessieren sich für eines unserer Seminare. Haben Sie Fragen dazu?';
                case 'legal':
                    return 'Haben Sie Fragen zu unseren Leistungen oder zur Kontaktaufnahme? Ich helfe Ihnen gern weiter.';
                default:
                    return 'Hallo! Ich bin Kian. Wie kann ich Ihnen weiterhelfen?';
            }
        };

        const getWidgetConfig = () => {
            const pageType = getPageType();

            return {
                apiUrl: VALLIT_BASE_URL,
                widgetId: VALLIT_WIDGET_ID,
                companyId: VALLIT_COMPANY_ID,
                title: 'Kian',
                welcomeMessage: getWidgetWelcomeMessage(pageType),
                position: 'bottom-right',
                theme: 'glassmorphism',
                color: '#3D7A77',
                placeholder: 'Nachricht eingeben...',
                streaming: 'true',
                voice: 'true',
                proactive: pageType === 'legal' ? 'false' : 'true',
                sound: 'false',
                fileUpload: 'false',
                branding: 'true',
                privacyUrl: 'https://www.wtm-consulting.de/datenschutz',
                logoUrl: 'https://www.vallit.net/images/wtm-logo.png',
                themeAccent: '#3D7A77',
                themeBg: '#ffffff',
                themeRadius: '16px'
            };
        };

        // Only run if placeholders exist
        const footerPlaceholder = document.getElementById('footer-placeholder');

        // 2. CHATBOT AND HELPER BUTTON
        const existingChatbot = document.querySelector('script[src*="/widget/embed.js"]');
        if (!existingChatbot) {
            const widgetConfig = getWidgetConfig();
            const script = document.createElement('script');
            script.src = `${widgetConfig.apiUrl}/widget/embed.js`;
            script.defer = true;
            script.dataset.widgetId = widgetConfig.widgetId;
            script.dataset.companyId = widgetConfig.companyId;
            script.dataset.apiUrl = widgetConfig.apiUrl;
            script.dataset.title = widgetConfig.title;
            script.dataset.welcomeMessage = widgetConfig.welcomeMessage;
            script.dataset.position = widgetConfig.position;
            script.dataset.theme = widgetConfig.theme;
            script.dataset.color = widgetConfig.color;
            script.dataset.placeholder = widgetConfig.placeholder;
            script.dataset.streaming = widgetConfig.streaming;
            script.dataset.voice = widgetConfig.voice;
            script.dataset.proactive = widgetConfig.proactive;
            script.dataset.sound = widgetConfig.sound;
            script.dataset.fileUpload = widgetConfig.fileUpload;
            script.dataset.branding = widgetConfig.branding;
            script.dataset.privacyUrl = widgetConfig.privacyUrl;
            script.dataset.logoUrl = widgetConfig.logoUrl;
            script.dataset.themeAccent = widgetConfig.themeAccent;
            script.dataset.themeBg = widgetConfig.themeBg;
            script.dataset.themeRadius = widgetConfig.themeRadius;
            document.body.appendChild(script);
        }

        // 3. FOOTER
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-grid">
                        <!-- Brand Column -->
                        <div class="footer-brand">
                            <a class="logo" href="../index.html">
                                <img alt="WTM Management Consulting" src="../assets/logo.png">
                            </a>
                            <p>Ihr Partner für wirksame Führung, lebendige Teams und gesunde Organisationen. Seit über 25 Jahren begleiten wir Menschen und Unternehmen in Veränderungsprozessen.</p>
                            <div class="footer-social">
                                <a aria-label="LinkedIn" href="https://www.linkedin.com/company/wtm-management-consulting" rel="noopener noreferrer" target="_blank">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <!-- Offerings Column -->
                        <div class="footer-col">
                            <h4>Angebot</h4>
                            <ul class="footer-links">
                                <li><a href="../index.html#angebote">Leistungsbereiche</a></li>
                                <li><a href="../index.html#trainings">Trainings & Seminare</a></li>
                                <li><a href="../coaching/">Business-Coaching</a></li>
                                <li><a href="../index.html#fuehrungskraefte">Führungskräfte-Curriculum</a></li>
                            </ul>
                        </div>
                        <!-- Contact Column -->
                        <div class="footer-col">
                            <h4>Kontakt</h4>
                            <ul class="footer-links footer-contact">
                                <li>Neuer Graben 61</li>
                                <li>44139 Dortmund</li>
                                <li><a href="tel:+4923113722666"><span class="contact-mode">Tel:</span> 0231 / 137 22 666</a></li>
                                <li><a href="mailto:kontakt@wtm-consulting.de"><span class="contact-mode">Mail:</span> kontakt@wtm-consulting.de</a></li>
                            </ul>
                        </div>
                        <!-- Legal Column -->
                        <div class="footer-col">
                            <h4>Rechtliches</h4>
                            <ul class="footer-links">
                                <li><a href="../impressum">Impressum</a></li>
                                <li><a href="../datenschutz">Datenschutz</a></li>
                                <li><a href="#" id="cookie-settings-link-injected">Cookie-Einstellungen</a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- Bottom Bar: Copyright Only -->
                    <div class="footer-bottom">
                        <div class="copyright">
                            <p>&copy; 2026 WTM Management Consulting GmbH. Alle Rechte vorbehalten.</p>
                        </div>
                        <div class="footer-version">
                            <span>v0.9.0</span>
                        </div>
                    </div>
                </div>
            </footer>`;
        }
    }

    // Call injection on load
    injectSharedComponents();

    // =========================================
    // QOL: AUTO-UPDATE COPYRIGHT YEAR (#33)
    // =========================================
    function updateCopyrightYear() {
        const copyrightEls = document.querySelectorAll('.copyright p');
        const currentYear = new Date().getFullYear();
        copyrightEls.forEach(el => {
            el.innerHTML = el.innerHTML.replace(/(20\d{2})/, currentYear);
        });
    }
    updateCopyrightYear();

    // =========================================
    // QOL: ESC TO CLOSE MODALS/EXPANDABLES (#9)
    // =========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenuBtn = document.getElementById('mobile-menu');
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            // Close any expanded success stories
            document.querySelectorAll('.expand-btn.expanded').forEach(btn => btn.click());

            // Close any active dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // =========================================
    // QOL: FORM VALIDATION & HONEYPOT (#35, #50)
    // =========================================
    const contactFormEl = document.getElementById('contactForm');
    if (contactFormEl) {
        contactFormEl.setAttribute('novalidate', true); // Stop native tooltips

        contactFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Check honeypot
            const honeypot = document.getElementById('fax_number');
            if (honeypot && honeypot.value) {
                console.warn('Bot detected by honeypot.');
                return; // Silently fail for bots
            }

            const inputs = contactFormEl.querySelectorAll('.form-input[required]');

            inputs.forEach(input => {
                // Strip HTML tags for basic sanitization
                input.value = input.value.replace(/<[^>]*>?/gm, '').trim();

                // Remove existing states
                input.classList.remove('is-valid', 'is-invalid');
                const existingFeedback = input.parentNode.querySelector('.invalid-feedback');
                if (existingFeedback) existingFeedback.remove();

                if (!input.value) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    input.insertAdjacentHTML('afterend', '<div class="invalid-feedback">Bitte füllen Sie dieses Feld aus.</div>');
                } else if (input.type === 'email' && !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(input.value)) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    input.insertAdjacentHTML('afterend', '<div class="invalid-feedback">Bitte geben Sie eine gültige E-Mail-Adresse ein.</div>');
                } else {
                    input.classList.add('is-valid');
                }
            });

            // Remove animation class after it finishes so it can trigger again
            inputs.forEach(input => {
                input.addEventListener('animationend', () => {
                    input.classList.remove('is-invalid');
                    // Add a tiny delay before re-adding so the shake triggers on next submit if still invalid
                }, { once: true });
            });

            if (isValid) {
                // Here you would normally send the data
                // For now, simulate success:
                const btn = contactFormEl.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Nachricht gesendet!';
                btn.classList.add('btn-success');
                btn.style.backgroundColor = '#10b981';
                btn.style.borderColor = '#10b981';

                setTimeout(() => {
                    contactFormEl.reset();
                    inputs.forEach(i => i.classList.remove('is-valid'));
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 3000);
            }
        });

        // Real-time validation on blur
        contactFormEl.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', () => {
                // Strip HTML tags for basic sanitization
                input.value = input.value.replace(/<[^>]*>?/gm, '').trim();

                if (input.hasAttribute('required')) {
                    if (input.value) {
                        if (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) {
                            input.classList.add('is-invalid');
                            input.classList.remove('is-valid');
                        } else {
                            input.classList.remove('is-invalid');
                            input.classList.add('is-valid');
                            const feedback = input.parentNode.querySelector('.invalid-feedback');
                            if (feedback) feedback.remove();
                        }
                    }
                }
            });
        });
    }
});
