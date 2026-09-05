/* =========================
   ATELIER
   Main JavaScript
========================= */


/* =========================
   LOADER
========================= */

const loader = document.getElementById("pageLoader");

window.addEventListener("load", () => {

    setTimeout(() => {

        loader?.classList.add("loaded");

    }, 500);

});


/* =========================
   HEADER
========================= */

const header = document.getElementById("siteHeader");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

updateHeader();

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


function closeMenu() {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


function openMenu() {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.add("open");

    menuToggle.classList.add("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.classList.add(
        "menu-open"
    );

}


menuToggle?.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileMenu.classList.contains("open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

            closeModal();

        }

    }
);


/* =========================
   SCROLL REVEALS
========================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-card, .image-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "is-visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   EXPERIENCE PARALLAX
========================= */

const experience =
    document.querySelector(".experience");

const experienceImage =
    document.querySelector(".experience-image");


function updateExperience() {

    if (!experience || !experienceImage) return;

    const rect =
        experience.getBoundingClientRect();

    const visible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

    if (!visible) return;

    experience.classList.add(
        "in-view"
    );

    const progress =
        (
            window.innerHeight - rect.top
        ) /
        (
            window.innerHeight + rect.height
        );

    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const movement =
            (progress - 0.5) * 30;

        experienceImage.style.transform =
            `scale(1) translateY(${movement}px)`;

    }

}


window.addEventListener(
    "scroll",
    updateExperience,
    { passive: true }
);

updateExperience();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    const matches =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle(
                        "active",
                        matches
                    );

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================
   RESERVATION MODAL
========================= */

const modal =
    document.getElementById(
        "reservationModal"
    );

const reservationButton =
    document.getElementById(
        "reservationButton"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalBackdrop =
    document.getElementById(
        "modalBackdrop"
    );

const reservationForm =
    document.getElementById(
        "reservationForm"
    );

const formStatus =
    document.getElementById(
        "formStatus"
    );

const visitDate =
    document.getElementById(
        "visitDate"
    );


function openModal() {

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    /* Prevent selecting past dates */

    if (visitDate) {

        const today = new Date();

        const localDate =
            new Date(
                today.getTime() -
                today.getTimezoneOffset() *
                60000
            )
                .toISOString()
                .split("T")[0];

        visitDate.min = localDate;

    }


    setTimeout(() => {

        document
            .getElementById("guestName")
            ?.focus();

    }, 300);

}


function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


reservationButton?.addEventListener(
    "click",
    openModal
);


modalClose?.addEventListener(
    "click",
    closeModal
);


modalBackdrop?.addEventListener(
    "click",
    closeModal
);


/* Open modal from every reservation link */

document
    .querySelectorAll(
        'a[href="#reservation"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeMenu();

                openModal();

            }
        );

    });


/* =========================
   RESERVATION FORM
========================= */

reservationForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("guestName")
                .value
                .trim();


        const guests =
            document
                .getElementById("guestCount")
                .value;


        const date =
            document
                .getElementById("visitDate")
                .value;


        const time =
            document
                .getElementById("visitTime")
                .value;


        const email =
            document
                .getElementById("guestEmail")
                .value
                .trim();


        if (
            !name ||
            !guests ||
            !date ||
            !time ||
            !email
        ) {

            formStatus.textContent =
                "Please complete all required fields.";

            return;

        }


        const readableDate =
            new Date(
                `${date}T12:00:00`
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        formStatus.textContent =
            `Thank you, ${name}. Your request for ${guests} on ${readableDate} at ${time} has been received.`;


        reservationForm.reset();

    }
);


/* =========================
   SMOOTH ANCHOR FALLBACK
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#reservation"
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
                    behavior: "smooth"
                });

            }
        );

    });


/* =========================
   CONSOLE CHECK
========================= */

console.log(
    "ATELIER — Timeless by Nature."
);