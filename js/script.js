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

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            if (navLinks.classList.contains("open")) {
                menuBtn.textContent = "×";
            } else {
                menuBtn.textContent = "☰";
            }
        });
    }


    // Close mobile menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {

            if (navLinks) {
                navLinks.classList.remove("open");
            }

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }
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


    function openChallenge() {

        if (!challengeModal) return;

        challengeModal.classList.add("show");

        document.body.style.overflow = "hidden";

        resetChallenge();
    }


    function closeChallenge() {

        if (!challengeModal) return;

        challengeModal.classList.remove("show");

        document.body.style.overflow = "";
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

            if (
                event.key === "Escape" &&
                challengeModal &&
                challengeModal.classList.contains("show")
            ) {
                closeChallenge();
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


    // Give elements their initial state

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


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
        revealObserver.observe(element);
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


        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(8, 13, 29, 0.92)";

            navbar.style.boxShadow =
                "0 15px 50px rgba(0,0,0,.38)";

        }

        else {

            navbar.style.background =
                "rgba(8, 13, 29, 0.72)";

            navbar.style.boxShadow =
                "0 15px 50px rgba(0,0,0,.25)";

        }

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

                if (window.innerWidth < 950) {
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