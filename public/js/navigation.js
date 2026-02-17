// =============================================
// TEC Navigation — Hybrid SPA Router + Utilities
// =============================================
// Routes that have their own .html files are handled as normal navigations.
// In-page links (hash anchors, data-spa="scroll") get smooth-scrolled.
// The Home link activates the view-home wrapper.
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // -------- DOM References --------
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbar = document.querySelector('.navbar');

    // ======================================================
    // 1. SPA ROUTER — Lightweight view switcher
    // ======================================================

    /**
     * Routes that have their own HTML file and should do a full-page navigation.
     * Everything NOT in this list is treated as an in-page action.
     */
    const fullPageRoutes = ['/leaderboard', '/register', '/login', '/dashboard', '/team', '/tasks', '/submissions', '/about'];

    /**
     * Show a specific page-view and hide all others.
     * @param {string} viewId - The id of the view container to activate (e.g. 'view-home')
     */
    function showView(viewId) {
        document.querySelectorAll('.page-view').forEach(view => {
            view.classList.remove('active');
        });
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
        }
    }

    /**
     * Handle an in-page navigation action.
     * @param {string} href - The href from the clicked link
     * @param {boolean} pushState - Whether to push to browser history
     */
    function navigateTo(href, pushState = true) {
        // Home route
        if (href === '/' || href === '') {
            showView('view-home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (pushState) {
                history.pushState({ view: 'view-home' }, '', '/');
            }
            updateActiveLink('/');
            return;
        }

        // Hash/anchor links — smooth scroll to element
        if (href.startsWith('#')) {
            showView('view-home'); // ensure home view is visible
            const target = document.querySelector(href);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50); // small delay to let view render
            }
            if (pushState) {
                history.pushState({ view: 'view-home', hash: href }, '', href);
            }
            updateActiveLink(href);
            return;
        }

        // Full-page routes — let the browser navigate normally
        if (fullPageRoutes.includes(href)) {
            window.location.href = href;
            return;
        }

        // Fallback: treat as full navigation
        window.location.href = href;
    }

    /**
     * Highlight the active navbar link.
     */
    function updateActiveLink(activeHref) {
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === activeHref) {
                link.classList.add('active');
            }
        });
    }

    // -------- Click Interception --------
    // Intercept navbar link clicks for SPA behavior
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip full-page routes — let browser handle them
            if (fullPageRoutes.includes(href)) {
                return; // normal navigation
            }

            // SPA-handled routes
            e.preventDefault();
            navigateTo(href);

            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Logo click = go home
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        logo.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('/');
            closeMobileMenu();
        });
    }

    // -------- Browser Back/Forward --------
    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.view) {
            showView(e.state.view);
            if (e.state.hash) {
                const target = document.querySelector(e.state.hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        } else {
            // Default: show home
            showView('view-home');
        }
    });

    // ======================================================
    // 2. MOBILE MENU TOGGLE
    // ======================================================

    function closeMobileMenu() {
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('is-open');
            }
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });

    // ======================================================
    // 3. NAVBAR SCROLL EFFECT
    // ======================================================

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });

    // ======================================================
    // 4. AUTH STATE — Update navbar for logged-in users
    // ======================================================

    const updateNavbar = async () => {
        let isLoggedIn = false;

        try {
            isLoggedIn = API.isLoggedIn();

            if (!isLoggedIn) {
                const session = await API.checkSession();
                if (session.success) {
                    isLoggedIn = true;
                }
            }
        } catch (err) {
            // API might not be available on all pages
        }

        if (isLoggedIn) {
            const loginLink = document.querySelector('a[href="/login"]');
            const registerLink = document.querySelector('a[href="/register"]');

            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';

            // Add Dashboard link if not present
            if (!document.querySelector('a[href="/dashboard"]')) {
                const dashboardLink = document.createElement('a');
                dashboardLink.href = '/dashboard';
                dashboardLink.className = 'navbar-link';
                dashboardLink.textContent = 'Dashboard';
                navbarMenu.appendChild(dashboardLink);
            }

            // Add Logout link
            if (!document.querySelector('#logoutBtn')) {
                const logoutLink = document.createElement('a');
                logoutLink.href = '#';
                logoutLink.className = 'navbar-link';
                logoutLink.id = 'logoutBtn';
                logoutLink.textContent = 'Logout';
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    API.logout();
                    window.location.href = '/login';
                });
                navbarMenu.appendChild(logoutLink);
            }
        }
    };

    updateNavbar();

    // ======================================================
    // 5. INITIAL STATE — Highlight active link on page load
    // ======================================================

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // If we're on the home page with a hash, scroll to it
    if (currentPath === '/' && currentHash) {
        updateActiveLink(currentHash);
        const hashTarget = document.querySelector(currentHash);
        if (hashTarget) {
            setTimeout(() => {
                hashTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    } else {
        updateActiveLink(currentPath);
    }

    // Set initial history state
    if (currentPath === '/') {
        history.replaceState({ view: 'view-home', hash: currentHash || null }, '', currentPath + currentHash);
    }
});
