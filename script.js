// --- 1. SETUP & LENIS SYNC ---
gsap.registerPlugin(ScrollTrigger);
lucide.createIcons();

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// --- 3. MARQUEE ---
gsap.to(".marquee-track", {
    xPercent: -50,
    ease: "none",
    duration: 30, // Slower for elegance
    repeat: -1
});

// --- 4. PROJECT PARALLAX ANIMATIONS ---
const projects = document.querySelectorAll('.project-card');

projects.forEach(project => {
    const img = project.querySelector('.project-img');

    // Image Parallax (moves inside container)
    gsap.fromTo(img,
        { y: '-15%' },
        {
            y: '15%',
            ease: "none",
            scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );

    // Card Entrance
    gsap.from(project, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: project,
            start: "top 85%",
        }
    });
});

// --- 5. FOOTER REVEAL LOGIC ---
function adjustFooterReveal() {
    if (window.innerWidth > 768) {
        const footerHeight = document.querySelector('.footer-sticky').offsetHeight;
        document.querySelector('.main-wrapper').style.marginBottom = `${footerHeight}px`;
    } else {
        document.querySelector('.main-wrapper').style.marginBottom = `0px`;
    }
}
window.addEventListener('load', adjustFooterReveal);
window.addEventListener('resize', adjustFooterReveal);

// --- 6. ADVANCED CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const cursorText = document.querySelector('.cursor-text');

const xSetDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3" });
const ySetDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3" });
const xSetCircle = gsap.quickTo(cursorCircle, "x", { duration: 0.5, ease: "power3" });
const ySetCircle = gsap.quickTo(cursorCircle, "y", { duration: 0.5, ease: "power3" });

window.addEventListener('mousemove', e => {
    xSetDot(e.clientX);
    ySetDot(e.clientY);
    xSetCircle(e.clientX);
    ySetCircle(e.clientY);
});

document.querySelectorAll('.hover-reveal').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('is-active');
        if (el.dataset.text) cursorText.innerText = el.dataset.text;
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('is-active');
        cursorText.innerText = "";
    });
});

// Magnet
document.querySelectorAll('.magnet-trigger').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const target = btn.querySelector('.magnet-target');
        const bound = btn.getBoundingClientRect();
        const x = (e.clientX - bound.left - bound.width / 2) * 0.5;
        const y = (e.clientY - bound.top - bound.height / 2) * 0.5;
        gsap.to(target, { x: x, y: y, duration: 0.3 });
        document.body.classList.add('is-hovering');
    });
    btn.addEventListener('mouseleave', () => {
        const target = btn.querySelector('.magnet-target');
        gsap.to(target, { x: 0, y: 0, duration: 0.3 });
        document.body.classList.remove('is-hovering');
    });
});
