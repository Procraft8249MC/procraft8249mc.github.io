document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCounters();
    initScrollReveal();
    initParticles();
    initTimeline();
});

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabSections.forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
            });

            btn.classList.add('active');
            const targetSection = document.getElementById('tab-' + target);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                if (target === 'home') {
                    resetCounters();
                    setTimeout(runCounters, 400);
                }
            }
        });
    });

    const firstSection = document.getElementById('tab-home');
    if (firstSection) {
        firstSection.style.display = 'block';
        firstSection.classList.add('active');
    }

    setTimeout(runCounters, 600);
}

let countersRan = false;

function resetCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        el.textContent = '0';
        countersRan = false;
    });
}

function runCounters() {
    if (countersRan) return;
    countersRan = true;
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

let observer;
function initScrollReveal() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
function checkReveal() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function checkTimeline() {
    const timelineObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.timeline-content').forEach(el => {
        el.classList.remove('visible');
        timelineObs.observe(el);
    });
}
function initTimeline() {
    checkTimeline();
}

function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const particles = [];
    const NUM = 22;

    for (let i = 0; i < NUM; i++) {
        createParticle(canvas, particles, true);
    }

    function createParticle(container, arr, initial) {
        const p = document.createElement('div');
        const size = 8 + Math.random() * 14;
        const startX = Math.random() * 100;
        const delay = initial ? Math.random() * 12 : 0;
        const duration = 10 + Math.random() * 14;

        p.style.cssText = `
            position: absolute;
            bottom: -60px;
            left: ${startX}%;
            width: ${size}px;
            height: ${size * 1.4}px;
            border-radius: ${size * 0.4}px ${size * 0.4}px ${size * 0.5}px ${size * 0.5}px;
            background: radial-gradient(ellipse at 40% 35%,
                rgba(255, 220, 100, 0.95),
                rgba(200, 130, 30, 0.7));
            box-shadow: 0 0 ${size}px rgba(255, 200, 60, 0.6),
                        0 0 ${size * 2}px rgba(220, 140, 30, 0.3);
            animation: lanternFloat ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;

        const string = document.createElement('div');
        string.style.cssText = `
            position: absolute;
            top: -8px; left: 50%;
            transform: translateX(-50%);
            width: 1px; height: 8px;
            background: rgba(200,164,62,0.5);
        `;
        p.appendChild(string);

        container.appendChild(p);
        arr.push(p);
        return p;
    }
}
