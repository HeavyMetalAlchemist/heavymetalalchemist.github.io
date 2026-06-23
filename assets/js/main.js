// ============================================
// TYPEWRITER EFFECT — Hero section
// ============================================
const roles = [
    "production ML systems.",
    "agentic AI pipelines.",
    "AIOps automation.",
    "end-to-end LLM solutions.",
];

const dynamicText = document.getElementById("role-dynamic");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Finished typing — pause then start deleting
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => { isDeleting = true; typeWriter(); }, 1800);
        return;
    }

    // Finished deleting — move to next role
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    // Typing speed: faster when deleting
    const speed = isDeleting ? 50 : 90;
    setTimeout(typeWriter, speed);
}

// Start typewriter after a short delay
setTimeout(typeWriter, 800);


// ============================================
// NAVBAR — highlight border on scroll
// ============================================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = "rgba(0, 212, 170, 0.2)";
    } else {
        navbar.style.borderBottomColor = "var(--text-muted)";
    }
});


// ============================================
// SMOOTH ACTIVE STATE — highlight nav link
// based on current section in view
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-links a");

const observerOptions = {
    root: null,
    rootMargin: `-${getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-height")
        .trim()} 0px -50% 0px`,
    threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinksAll.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scroll-top");

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navLinks.classList.toggle("open");
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
            });
        });
    }
});
// ============================================
// SCROLL FADE-IN ANIMATION OBSERVER
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Once visible, stop observing
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
});