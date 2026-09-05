/* =========================================================
   PERFORMANCE — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );

                menuButton.textContent =
                    mobileMenu.classList.contains("open")
                        ? "CLOSE"
                        : "MENU";
            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                        menuButton.textContent =
                            "MENU";
                    }
                );
            });
    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".training-card, .program-card, .stat, .about-content, .section-header"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(30px)";

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            revealObserver.observe(
                element
            );
        }
    );


    /* =========================
       REVEAL STYLE
    ========================= */

    const revealStyle =
        document.createElement("style");

    revealStyle.textContent = `

        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

    `;

    document.head.appendChild(
        revealStyle
    );


    /* =========================
       STATS COUNTER
    ========================= */

    const statNumbers =
        document.querySelectorAll(
            ".stat strong[data-target]"
        );


    let statsAnimated = false;


    function animateStats() {

        if (statsAnimated) {
            return;
        }


        const statsSection =
            document.querySelector(
                ".stats-section"
            );


        if (!statsSection) {
            return;
        }


        const rect =
            statsSection.getBoundingClientRect();


        if (rect.top < window.innerHeight * 0.8) {

            statsAnimated = true;


            statNumbers.forEach(
                number => {

                    const target =
                        Number(
                            number.dataset.target
                        );

                    let current = 0;

                    const duration = 900;

                    const start =
                        performance.now();


                    function update(now) {

                        const progress =
                            Math.min(
                                (now - start) /
                                duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        current =
                            Math.floor(
                                target * eased
                            );


                        number.textContent =
                            String(current)
                                .padStart(2, "0");


                        if (progress < 1) {

                            requestAnimationFrame(
                                update
                            );

                        } else {

                            number.textContent =
                                String(target)
                                    .padStart(2, "0");
                        }
                    }


                    requestAnimationFrame(
                        update
                    );
                }
            );
        }
    }


    window.addEventListener(
        "scroll",
        animateStats,
        {
            passive: true
        }
    );


    animateStats();


    /* =========================
       HERO PARALLAX
    ========================= */

    const heroOrbit =
        document.querySelector(
            ".hero-orbit"
        );


    if (heroOrbit) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                heroOrbit.style.transform =
                    `translateY(calc(-50% + ${scroll * 0.12}px))`;
            },
            {
                passive: true
            }
        );
    }


    /* =========================
       ACTIVE NAV
    ========================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navAnchors =
        document.querySelectorAll(
            ".nav-links a"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navAnchors.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute("href") ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );
                                }
                            }
                        );
                    }
                });

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );
        }
    );


    /* =========================
       CARD TILT
    ========================= */

    const cards =
        document.querySelectorAll(
            ".training-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    /* =========================
       ESCAPE MOBILE MENU
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                if (menuButton) {
                    menuButton.textContent =
                        "MENU";
                }
            }
        }
    );

});