/* =========================================================
   NITHIN V S — FUTURISTIC PORTFOLIO
   CINEMATIC SCROLL ENGINE
========================================================= */


/* =========================================================
   01. ELEMENTS
========================================================= */

const scrollProgress =
    document.querySelector(".scroll-progress span");

const projects =
    document.querySelectorAll(".project");

const revealElements =
    document.querySelectorAll(
        ".statement h2, .section-heading, .about-content, .service, .contact-content"
    );

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");

const heroGrid =
    document.querySelector(".grid");

const heroGlow =
    document.querySelector(".hero-glow");

const header =
    document.querySelector(".site-header");


/* =========================================================
   02. SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) return;

    const progress =
        (scrollTop / documentHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.height =
            `${progress}%`;
    }
}


/* =========================================================
   03. HEADER
========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}


/* =========================================================
   04. HERO SCROLL
========================================================= */

function updateHero() {

    if (!hero) return;

    const scrollY =
        window.scrollY;

    const heroHeight =
        hero.offsetHeight;

    if (scrollY < heroHeight) {

        const progress =
            Math.min(
                scrollY / heroHeight,
                1
            );


        /* ---------------------------------------------
           HERO CONTENT
        --------------------------------------------- */

        if (heroContent) {

            const moveY =
                progress * -120;

            const scale =
                1 - progress * 0.08;

            const opacity =
                1 - progress * 0.85;

            heroContent.style.transform =
                `translate3d(0, ${moveY}px, 0) scale(${scale})`;

            heroContent.style.opacity =
                opacity;
        }


        /* ---------------------------------------------
           GRID
        --------------------------------------------- */

        if (heroGrid) {

            heroGrid.style.transform =
                `translate3d(0, ${progress * 80}px, 0)`;
        }


        /* ---------------------------------------------
           GLOW
        --------------------------------------------- */

        if (heroGlow) {

            const glowScale =
                1 + progress * 0.35;

            heroGlow.style.transform =
                `translateY(-50%) scale(${glowScale})`;

            heroGlow.style.opacity =
                1 - progress * 0.5;
        }

    } else {

        if (heroContent) {
            heroContent.style.opacity = "0";
        }
    }
}


/* =========================================================
   05. CINEMATIC PROJECT ENGINE
========================================================= */

function updateProjects() {

    projects.forEach((project) => {

        const visual =
            project.querySelector(
                ".project-visual"
            );

        const info =
            project.querySelector(
                ".project-info"
            );

        const meta =
            project.querySelector(
                ".project-meta"
            );

        const link =
            project.querySelector(
                ".project-link"
            );

        if (!visual) return;


        /* ---------------------------------------------
           PROJECT POSITION
        --------------------------------------------- */

        const rect =
            project.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;


        /*
            Project timeline:

            0.00 → project starts entering
            0.20 → fully entered
            0.75 → main cinematic scene
            1.00 → project leaves
        */

        const startPoint =
            viewportHeight * 0.85;

        const endPoint =
            viewportHeight * 0.05;

        const progress =
            (startPoint - rect.top) /
            (startPoint - endPoint);

        const p =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /* ---------------------------------------------
           ACTIVE PROJECT
        --------------------------------------------- */

        if (p > 0.08 && p < 0.92) {

            project.classList.add(
                "project-active"
            );

        } else {

            project.classList.remove(
                "project-active"
            );
        }


        /* ---------------------------------------------
           VISUAL VARIABLES
        --------------------------------------------- */

        let scale;
        let translateY;
        let radius;
        let opacity;


        /* ---------------------------------------------
           ENTER
        --------------------------------------------- */

        if (p < 0.20) {

            const enter =
                p / 0.20;

            scale =
                0.94 +
                enter * 0.06;

            translateY =
                45 -
                enter * 45;

            radius =
                24 -
                enter * 14;

            opacity =
                0.45 +
                enter * 0.55;
        }


        /* ---------------------------------------------
           MAIN CINEMATIC SCENE
        --------------------------------------------- */

        else if (p < 0.75) {

            const middle =
                (p - 0.20) / 0.55;

            scale =
                1 +
                middle * 0.035;

            translateY =
                middle * -18;

            radius =
                10 -
                middle * 6;

            opacity =
                1;
        }


        /* ---------------------------------------------
           EXIT
        --------------------------------------------- */

        else {

            const exit =
                (p - 0.75) / 0.25;

            scale =
                1.035 -
                exit * 0.06;

            translateY =
                -18 -
                exit * 55;

            radius =
                4 +
                exit * 18;

            opacity =
                1 -
                exit * 0.55;
        }


        /* ---------------------------------------------
           APPLY VISUAL
        --------------------------------------------- */

        visual.style.transform =
            `translate3d(0, ${translateY}px, 0) scale(${scale})`;

        visual.style.opacity =
            opacity;

        visual.style.borderRadius =
            `${radius}px`;


        /* ---------------------------------------------
           PROJECT INFORMATION
        --------------------------------------------- */

        if (info) {

            let infoProgress;

            if (p < 0.45) {

                infoProgress = 0;

            } else {

                infoProgress =
                    Math.min(
                        1,
                        (p - 0.45) / 0.30
                    );
            }

            const infoY =
                50 -
                infoProgress * 50;

            const infoOpacity =
                infoProgress;

            info.style.transform =
                `translate3d(0, ${infoY}px, 0)`;

            info.style.opacity =
                infoOpacity;
        }


        /* ---------------------------------------------
           PROJECT META
        --------------------------------------------- */

        if (meta) {

            const metaProgress =
                Math.min(
                    1,
                    p / 0.30
                );

            const metaY =
                30 -
                metaProgress * 30;

            meta.style.transform =
                `translate3d(0, ${metaY}px, 0)`;

            meta.style.opacity =
                metaProgress;
        }


        /* ---------------------------------------------
           PROJECT LINK
        --------------------------------------------- */

        if (link) {

            const linkProgress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (p - 0.55) / 0.25
                    )
                );

            link.style.transform =
                `translate3d(
                    0,
                    ${40 - linkProgress * 40}px,
                    0
                )`;

            link.style.opacity =
                linkProgress;
        }

    });
}


/* =========================================================
   06. GENERAL PARALLAX
========================================================= */

function updateParallax() {

    const parallaxElements =
        document.querySelectorAll(
            ".work-count"
        );

    parallaxElements.forEach(
        (element) => {

            const rect =
                element.getBoundingClientRect();

            const viewportCenter =
                window.innerHeight / 2;

            const distance =
                rect.top -
                viewportCenter;

            const movement =
                distance * -0.015;

            element.style.transform =
                `translate3d(0, ${movement}px, 0)`;
        }
    );
}


/* =========================================================
   07. REVEAL ON SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "is-visible"
                        );
                    }
                }
            );
        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );
    }
);


/* =========================================================
   08. PROJECT IMAGE OBSERVER
========================================================= */

const projectObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "project-active"
                        );

                    } else {

                        entry.target.classList.remove(
                            "project-active"
                        );
                    }
                }
            );
        },
        {
            threshold: 0.35
        }
    );


projects.forEach(
    (project) => {

        projectObserver.observe(
            project
        );
    }
);


/* =========================================================
   09. SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".main-nav a, .logo, .nav-contact, .hero-cta"
    );


navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    }
);


/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    const currentId =
                        entry.target.getAttribute(
                            "id"
                        );

                    navLinks.forEach(
                        (link) => {

                            const linkTarget =
                                link.getAttribute(
                                    "href"
                                );

                            if (
                                linkTarget ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            } else {

                                link.classList.remove(
                                    "active"
                                );
                            }
                        }
                    );
                }
            );
        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(
    (section) => {

        navObserver.observe(
            section
        );
    }
);


/* =========================================================
   11. PROJECT / CTA MAGNETIC EFFECT
========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link, .hero-cta, .contact-button"
    );


projectLinks.forEach(
    (link) => {

        link.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 650
                ) {
                    return;
                }

                const rect =
                    link.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                link.style.transform =
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )`;
            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                link.style.transform =
                    "translate(0, 0)";
            }
        );
    }
);


/* =========================================================
   12. SERVICE HOVER
========================================================= */

const services =
    document.querySelectorAll(
        ".service"
    );


services.forEach(
    (service) => {

        service.addEventListener(
            "mouseenter",
            () => {

                service.classList.add(
                    "service-hover"
                );
            }
        );


        service.addEventListener(
            "mouseleave",
            () => {

                service.classList.remove(
                    "service-hover"
                );
            }
        );
    }
);


/* =========================================================
   13. HERO MOUSE PARALLAX
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (!hero) return;

        if (
            window.innerWidth <= 650
        ) {
            return;
        }

        const x =
            (event.clientX /
                window.innerWidth) -
            0.5;

        const y =
            (event.clientY /
                window.innerHeight) -
            0.5;


        const title =
            document.querySelector(
                ".hero-title"
            );


        if (title) {

            title.style.transform =
                `translate3d(
                    ${x * 10}px,
                    ${y * 6}px,
                    0
                )`;
        }
    }
);


/* =========================================================
   14. SCROLL LOOP
========================================================= */

let ticking = false;


function handleScroll() {

    if (ticking) return;

    window.requestAnimationFrame(
        () => {

            updateScrollProgress();
            updateHeader();
            updateHero();
            updateProjects();
            updateParallax();

            ticking = false;
        }
    );

    ticking = true;
}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


/* =========================================================
   15. INITIAL STATE
========================================================= */

updateScrollProgress();
updateHeader();
updateHero();
updateProjects();
updateParallax();


/* =========================================================
   16. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

        updateScrollProgress();
        updateHeader();
        updateHero();
        updateProjects();
        updateParallax();
    }
);