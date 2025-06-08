// assets/js/script.js - Enhanced JavaScript functionality

// Configuration
const CONFIG = {
    animationDuration: 600,
    scrollOffset: 80,
    typewriterSpeed: 50
};

// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Enhanced scroll animations
class ScrollAnimator {
    constructor() {
        this.observers = new Map();
        this.initializeObservers();
    }

    initializeObservers() {
        // Main animation observer
        const mainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.highlight-card, .metric-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('show');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Counter animation observer
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Apply observers
        document.querySelectorAll('.animated').forEach(el => {
            mainObserver.observe(el);
        });

        document.querySelectorAll('.metric-value').forEach(el => {
            counterObserver.observe(el);
        });

        this.observers.set('main', mainObserver);
        this.observers.set('counter', counterObserver);
    }

    animateCounters(target) {
        const text = target.textContent;
        const isNumber = /^\d+/.test(text);

        if (isNumber) {
            const finalNumber = parseInt(text.match(/\d+/)[0]);
            const suffix = text.replace(/^\d+/, '');

            let current = 0;
            const increment = finalNumber / 30;

            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                }
                target.textContent = Math.floor(current) + suffix;
            }, 50);
        }
    }
}

// Enhanced navigation
class Navigation {
    constructor() {
        this.activeSection = '';
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupMobileMenu();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveNavItem(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    setActiveNavItem(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        // Add mobile menu toggle if needed
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.display = 'none';

        document.querySelector('nav').appendChild(mobileToggle);

        mobileToggle.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
}

// Paper figures modal
class FigureModal {
    constructor() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'figure-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-caption"></div>
                <div class="modal-navigation">
                    <button class="prev-btn">‹ Previous</button>
                    <button class="next-btn">Next ›</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    }

    setupEventListeners() {
        // Close modal
        this.modal.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.previousFigure();
                if (e.key === 'ArrowRight') this.nextFigure();
            }
        });

        // Setup figure click handlers
        document.querySelectorAll('.figure-placeholder').forEach((placeholder, index) => {
            placeholder.style.cursor = 'pointer';
            placeholder.addEventListener('click', () => {
                this.openModal(index);
            });
        });
    }

    openModal(figureIndex) {
        // In a real implementation, these would be actual figure paths
        const figures = [
            { src: 'assets/images/paper-figures/figure2-fsam-architecture.png', caption: 'Figure 2: FSAM Architecture' },
            { src: 'assets/images/paper-figures/figure3-factorizephys-architecture.png', caption: 'Figure 3: FactorizePhys Architecture' },
            { src: 'assets/images/paper-figures/figure4a-performance-latency.png', caption: 'Figure 4A: Performance vs Latency' },
            { src: 'assets/images/paper-figures/figure4b-attention-visualization.png', caption: 'Figure 4B: Attention Visualization' }
        ];

        this.currentFigure = figureIndex;
        this.modal.querySelector('.modal-image').src = figures[figureIndex].src;
        this.modal.querySelector('.modal-caption').textContent = figures[figureIndex].caption;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousFigure() {
        // Implementation for previous figure
    }

    nextFigure() {
        // Implementation for next figure
    }
}

// Performance metrics display
class MetricsDisplay {
    constructor() {
        this.setupMetricsComparison();
    }

    setupMetricsComparison() {
        // Add interactive comparison tables
        const resultsSection = document.querySelector('#results');
        if (resultsSection) {
            this.createInteractiveTable();
        }
    }

    createInteractiveTable() {
        // Create interactive performance comparison table
        const tableContainer = document.createElement('div');
        tableContainer.className = 'interactive-table-container';
        tableContainer.innerHTML = `
            <div class="table-controls">
                <button class="filter-btn active" data-dataset="all">All Datasets</button>
                <button class="filter-btn" data-dataset="pure">PURE</button>
                <button class="filter-btn" data-dataset="ibvp">iBVP</button>
                <button class="filter-btn" data-dataset="ubfc">UBFC-rPPG</button>
            </div>
            <div class="table-wrapper">
                <!-- Interactive table would go here -->
            </div>
        `;

        // Add after results grid
        const resultsGrid = document.querySelector('.results-grid');
        if (resultsGrid) {
            resultsGrid.parentNode.insertBefore(tableContainer, resultsGrid.nextSibling);
        }
    }
}

// Code syntax highlighting for code blocks
class CodeHighlighter {
    constructor() {
        this.highlightCode();
    }

    highlightCode() {
        document.querySelectorAll('.code-block').forEach(block => {
            // Simple syntax highlighting for mathematical notation
            let content = block.innerHTML;

            // Highlight mathematical symbols
            content = content.replace(/([∈∀∃→←↔⟼⇒⇐≃↓↑×]/g, '<span class="math-symbol">$1</span>');

            // Highlight function names
            content = content.replace(/(def |class |import |from )/g, '<span class="keyword">$1</span>');

            // Highlight comments
            content = content.replace(/(#.*)/g, '<span class="comment">$1</span>');

            block.innerHTML = content;
        });
    }
}

// Typewriter effect for hero title
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            domReady: 0,
            resourcesLoaded: 0
        };
        this.measurePerformance();
    }

    measurePerformance() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            this.logMetrics();
        });

        // Measure DOM ready time
        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domReady = performance.now();
        });
    }

    logMetrics() {
        console.log('Website Performance Metrics:', this.metrics);

        // Send to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'page_load',
                value: Math.round(this.metrics.loadTime)
            });
        }
    }
}

// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    setupKeyboardNavigation() {
        // Tab navigation for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.setAttribute('tabindex', '0');
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    setupFocusManagement() {
        // Focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .btn:focus, a:focus {
                outline: 3px solid #667eea;
                outline-offset: 2px;
            }
            
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);

        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.highlight-card').forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Feature highlight ${index + 1}`);
        });

        // Add live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    const scrollAnimator = new ScrollAnimator();
    const navigation = new Navigation();
    const figureModal = new FigureModal();
    const metricsDisplay = new MetricsDisplay();
    const codeHighlighter = new CodeHighlighter();
    const accessibilityEnhancer = new AccessibilityEnhancer();
    const performanceMonitor = new PerformanceMonitor();

    // Add typewriter effect to title if desired
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.innerWidth > 768) {
        const typewriter = new TypewriterEffect(heroTitle, heroTitle.textContent, 100);
        // Uncomment to enable: typewriter.start();
    }

    // Add enhanced button interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.2)';
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const handleScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Analytics initialization (if Google Analytics is used)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'FactorizePhys',
            page_location: window.location.href
        });
    }

    // Console message for developers
    console.log('%cFactorizePhys Website', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cDeveloped by PhysiologicAI Lab', 'color: #764ba2; font-size: 16px;');
    console.log('%cNeurIPS 2024 Paper: Matrix Factorization for Multidimensional Attention', 'color: #333; font-size: 14px;');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimator,
        Navigation,
        FigureModal,
        MetricsDisplay,
        CodeHighlighter,
        TypewriterEffect,
        PerformanceMonitor,
        AccessibilityEnhancer
    };
}