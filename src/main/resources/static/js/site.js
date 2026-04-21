document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
    const revealItems = document.querySelectorAll("[data-reveal]");
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {threshold: 0.16});

    revealItems.forEach((item) => revealObserver.observe(item));

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                const matches = link.getAttribute("href") === `#${entry.target.id}`;
                link.classList.toggle("is-active", matches);
            });
        });
    }, {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1
    });

    sections.forEach((section) => navObserver.observe(section));
});
