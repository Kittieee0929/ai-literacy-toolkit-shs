// ======================================================
// AI LITERACY TOOLKIT
// Main JavaScript
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // MOBILE NAVIGATION
    // --------------------------------------------------

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    function setMobileMenu(isOpen) {
        if (!menuBtn || !navLinks) return;

        navLinks.classList.toggle("open", isOpen);
        menuBtn.textContent = isOpen ? "×" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            setMobileMenu(!navLinks.classList.contains("open"));
        });

        document.addEventListener("click", event => {
            if (
                window.innerWidth <= 720 &&
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                setMobileMenu(false);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) {
                setMobileMenu(false);
            }
        });
    }


    // Close mobile menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            setMobileMenu(false);
        });
    });


    // --------------------------------------------------
    // ACTIVE NAVIGATION WHILE SCROLLING
    // --------------------------------------------------

    const sections = document.querySelectorAll("main section");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navItems.forEach(item => {

            item.classList.remove("active");

            const href = item.getAttribute("href");

            if (href === "#" + currentSection) {
                item.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // --------------------------------------------------
    // QUICK CHALLENGE MODAL
    // --------------------------------------------------

    const challengeBtn =
        document.getElementById("challengeBtn");

    const challengeModal =
        document.getElementById("challengeModal");

    const modalClose =
        document.getElementById("modalClose");

    const answerButtons =
        document.querySelectorAll(".answer-btn");

    const feedback =
        document.getElementById("answerFeedback");

    let previouslyFocusedElement = null;


    function openChallenge() {

        if (!challengeModal) return;

        previouslyFocusedElement = document.activeElement;

        challengeModal.classList.add("show");
        challengeModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        resetChallenge();

        if (modalClose) {
            modalClose.focus();
        }
    }


    function closeChallenge() {

        if (!challengeModal) return;

        challengeModal.classList.remove("show");
        challengeModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === "function"
        ) {
            previouslyFocusedElement.focus();
        }
    }


    if (challengeBtn) {
        challengeBtn.addEventListener(
            "click",
            openChallenge
        );
    }


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeChallenge
        );
    }


    // Close modal by clicking outside

    if (challengeModal) {

        challengeModal.addEventListener(
            "click",
            event => {

                if (event.target === challengeModal) {
                    closeChallenge();
                }

            }
        );

    }


    // Close modal with Escape

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            if (
                challengeModal &&
                challengeModal.classList.contains("show")
            ) {
                closeChallenge();
            }

            if (
                navLinks &&
                navLinks.classList.contains("open")
            ) {
                setMobileMenu(false);
                if (menuBtn) menuBtn.focus();
            }

        }
    );


    // --------------------------------------------------
    // CHALLENGE ANSWERS
    // --------------------------------------------------

    answerButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Prevent answering twice

            if (button.classList.contains("answered")) {
                return;
            }


            // Disable all answers

            answerButtons.forEach(answer => {

                answer.classList.add("answered");

                answer.style.pointerEvents = "none";

            });


            // Correct answer

            if (button.classList.contains("correct-answer")) {

                button.style.borderColor =
                    "rgba(34, 197, 94, .65)";

                button.style.background =
                    "rgba(34, 197, 94, .10)";

                button.style.color =
                    "#86efac";


                feedback.innerHTML = `
                    <strong style="color:#86efac;">
                        ✓ Correct!
                    </strong>
                    <br>
                    AI-generated information should not be
                    accepted automatically. Important claims
                    should be verified using reliable,
                    accessible, and trustworthy sources.
                `;

            }

            // Incorrect answer

            else {

                button.style.borderColor =
                    "rgba(248, 113, 113, .65)";

                button.style.background =
                    "rgba(248, 113, 113, .08)";

                button.style.color =
                    "#fca5a5";


                // Show correct answer

                const correct =
                    document.querySelector(
                        ".correct-answer"
                    );

                if (correct) {

                    correct.style.borderColor =
                        "rgba(34, 197, 94, .55)";

                    correct.style.background =
                        "rgba(34, 197, 94, .08)";

                    correct.style.color =
                        "#86efac";

                }


                feedback.innerHTML = `
                    <strong style="color:#fca5a5;">
                        Not quite.
                    </strong>
                    <br>
                    AI can generate inaccurate information
                    or even references that do not exist.
                    Verify important claims using reliable
                    sources before using them academically.
                `;

            }

        });

    });


    function resetChallenge() {

        answerButtons.forEach(answer => {

            answer.classList.remove("answered");

            answer.style.pointerEvents = "";

            answer.style.borderColor = "";

            answer.style.background = "";

            answer.style.color = "";

        });


        if (feedback) {
            feedback.innerHTML = "";
        }

    }


    // --------------------------------------------------
    // SCROLL REVEAL ANIMATIONS
    // --------------------------------------------------

    const revealElements =
        document.querySelectorAll(
            ".module-card, " +
            ".section-heading, " +
            ".challenge-container, " +
            ".progress-card, " +
            ".about-container"
        );

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    // Give elements their initial state

    if (!prefersReducedMotion) {
        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(30px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

        });
    }


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

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


    revealElements.forEach(element => {
        if (prefersReducedMotion) {
            element.style.opacity = "1";
            element.style.transform = "none";
        } else {
            revealObserver.observe(element);
        }
    });


    // --------------------------------------------------
    // STAGGER MODULE CARDS
    // --------------------------------------------------

    const moduleCards =
        document.querySelectorAll(".module-card");


    moduleCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    // --------------------------------------------------
    // MODULE CARD MOUSE GLOW
    // --------------------------------------------------

    moduleCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                card.style.background = `
                    radial-gradient(
                        500px circle at ${x}px ${y}px,
                        rgba(59,130,246,.12),
                        transparent 40%
                    ),
                    linear-gradient(
                        145deg,
                        rgba(22,32,65,.9),
                        rgba(10,15,35,.9)
                    )
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


    // --------------------------------------------------
    // NAVBAR EFFECT WHEN SCROLLING
    // --------------------------------------------------

    const navbar =
        document.querySelector(".navbar");


    function navbarScrollEffect() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }


    window.addEventListener(
        "scroll",
        navbarScrollEffect
    );

    navbarScrollEffect();


    // --------------------------------------------------
    // AI ORB PARALLAX
    // --------------------------------------------------

    const aiOrbit =
        document.querySelector(".ai-orbit");


    if (aiOrbit) {

        document.addEventListener(
            "mousemove",
            event => {

                // Only use effect on larger screens

                if (
                    window.innerWidth < 950 ||
                    prefersReducedMotion
                ) {
                    aiOrbit.style.transform = "";
                    return;
                }


                const moveX =
                    (event.clientX -
                    window.innerWidth / 2) / 60;

                const moveY =
                    (event.clientY -
                    window.innerHeight / 2) / 60;


                aiOrbit.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );

    }


    // --------------------------------------------------
    // LOCAL LEARNING PROGRESS
    // --------------------------------------------------

    const progressFill =
        document.getElementById("progressFill");

    const progressPercentage =
        document.getElementById(
            "progressPercentage"
        );


    let completedModules =
        JSON.parse(
            localStorage.getItem(
                "aiToolkitCompletedModules"
            )
        ) || [];


    function updateProgress() {

        const completed =
            completedModules.length;

        const percentage =
            Math.round(
                (completed / 7) * 100
            );


        if (progressFill) {

            progressFill.style.width =
                percentage + "%";

        }


        if (progressPercentage) {

            progressPercentage.textContent =
                percentage + "%";

        }


        const progressTitle =
            document.querySelector(
                ".progress-top h3"
            );


        if (progressTitle) {

            progressTitle.textContent =
                `${completed} of 7 modules completed`;

        }

    }


    updateProgress();


    // --------------------------------------------------
    // SMOOTH INTERNAL LINKS
    // --------------------------------------------------

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetID =
                    this.getAttribute("href");


                // Ignore empty links

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    // --------------------------------------------------
    // LEARNING PATH ACTIVE STATE
    // --------------------------------------------------

    const pathLinks =
        document.querySelectorAll(".learning-path a");

    const moduleSections =
        document.querySelectorAll(".module-card[id]");

    if (pathLinks.length && moduleSections.length) {
        const pathObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    pathLinks.forEach(link => {
                        link.classList.toggle(
                            "current",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        moduleSections.forEach(card => {
            pathObserver.observe(card);
        });
    }


    // --------------------------------------------------
    // PAGE SCROLL PROGRESS + BACK TO TOP
    // --------------------------------------------------

    const pageProgressBar =
        document.getElementById("pageProgressBar");

    const backToTop =
        document.getElementById("backToTop");

    function updatePageScrollUI() {

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const pageProgress =
            scrollableHeight > 0
                ? Math.min(
                    (window.scrollY / scrollableHeight) * 100,
                    100
                )
                : 0;

        if (pageProgressBar) {
            pageProgressBar.style.width =
                pageProgress + "%";
        }

        if (backToTop) {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );
        }
    }

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });
        });
    }

    window.addEventListener(
        "scroll",
        updatePageScrollUI,
        { passive: true }
    );

    updatePageScrollUI();


    // --------------------------------------------------
    // CONSOLE MESSAGE
    // --------------------------------------------------

    console.log(
        "%cAI Literacy Toolkit",
        "color:#22d3ee;" +
        "font-size:20px;" +
        "font-weight:bold;"
    );

    console.log(
        "Interactive learning system loaded successfully."
    );

});