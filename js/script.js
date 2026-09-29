document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.getElementById("siteHeader");
    const challengeBtn = document.getElementById("challengeBtn");
    const heroChallengeBtn = document.getElementById("heroChallengeBtn");
    const challengeModal = document.getElementById("challengeModal");
    const modalClose = document.getElementById("modalClose");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const feedback = document.getElementById("answerFeedback");
    const progressFill = document.getElementById("progressFill");
    const progressPercentage = document.getElementById("progressPercentage");
    const progressTitle = document.getElementById("progressTitle");
    const pageProgressBar = document.getElementById("pageProgressBar");
    const backToTop = document.getElementById("backToTop");
    const moduleToast = document.getElementById("moduleToast");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let previouslyFocusedElement = null;
    let toastTimer;

    function setMobileMenu(open) {
        if (!menuBtn || !navLinks) return;
        navLinks.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.textContent = open ? "Close" : "Menu";
        menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            setMobileMenu(!navLinks.classList.contains("open"));
        });
    }

    document.addEventListener("click", event => {
        if (!navLinks || !menuBtn) return;
        if (
            window.innerWidth <= 980 &&
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            setMobileMenu(false);
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => setMobileMenu(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) setMobileMenu(false);
    });

    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navItems.forEach(item => {
                item.classList.toggle(
                    "active",
                    item.getAttribute("href") === "#" + entry.target.id
                );
            });
        });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    function resetChallenge() {
        answerButtons.forEach(answer => {
            answer.classList.remove("answered");
            answer.disabled = false;
            answer.style.borderColor = "";
            answer.style.background = "";
            answer.style.color = "";
        });
        if (feedback) feedback.innerHTML = "";
    }

    function openChallenge() {
        if (!challengeModal) return;
        previouslyFocusedElement = document.activeElement;
        resetChallenge();
        challengeModal.classList.add("show");
        challengeModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        modalClose?.focus();
    }

    function closeChallenge() {
        if (!challengeModal) return;
        challengeModal.classList.remove("show");
        challengeModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        previouslyFocusedElement?.focus?.();
    }

    challengeBtn?.addEventListener("click", openChallenge);
    heroChallengeBtn?.addEventListener("click", openChallenge);
    modalClose?.addEventListener("click", closeChallenge);

    challengeModal?.addEventListener("click", event => {
        if (event.target === challengeModal) closeChallenge();
    });

    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            answerButtons.forEach(answer => {
                answer.classList.add("answered");
                answer.disabled = true;
            });

            const correct = button.classList.contains("correct-answer");

            button.style.background = correct ? "#d8f3e7" : "#ffe2dc";
            button.style.borderColor = correct ? "#111827" : "#111827";

            const correctButton = document.querySelector(".correct-answer");
            if (!correct && correctButton) {
                correctButton.style.background = "#d8f3e7";
            }

            if (feedback) {
                feedback.innerHTML = correct
                    ? "<strong>✓ Good call.</strong><br>AI-generated claims should be checked against reliable, accessible sources before you use them."
                    : "<strong>Not quite.</strong><br>AI can invent details and references. Verify important claims using reliable sources before using them academically.";
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        if (challengeModal?.classList.contains("show")) closeChallenge();
        if (navLinks?.classList.contains("open")) setMobileMenu(false);
    });

    const completedModules = JSON.parse(
        localStorage.getItem("aiToolkitCompletedModules") || "[]"
    );

    function updateProgress() {
        const completed = completedModules.length;
        const percentage = Math.round((completed / 7) * 100);

        if (progressFill) progressFill.style.width = percentage + "%";
        if (progressPercentage) progressPercentage.textContent = percentage + "%";
        if (progressTitle) progressTitle.textContent = completed + " of 7 modules completed";

        document.querySelectorAll(".passport-stamps span").forEach((stamp, index) => {
            stamp.classList.toggle("done", completedModules.includes(index + 1));
        });
    }

    updateProgress();

    document.querySelectorAll(".module-link").forEach(button => {
        button.addEventListener("click", () => {
            const moduleNumber = button.dataset.module;
            if (!moduleToast) return;
            moduleToast.querySelector("strong").textContent = "Module " + moduleNumber + " selected";
            moduleToast.classList.add("show");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => moduleToast.classList.remove("show"), 2400);
        });
    });

    const revealTargets = document.querySelectorAll(
        ".decision-board, .module-card, .lab-case, .progress-passport, .research-card"
    );

    if (!prefersReducedMotion) {
        revealTargets.forEach(target => {
            target.style.opacity = "0";
            target.style.transform += " translateY(20px)";
        });

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.style.opacity = "1";
                entry.target.style.transform = entry.target.style.transform.replace(" translateY(20px)", "");
                entry.target.style.transition = "opacity .55s ease, transform .55s ease";
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: .12 });

        revealTargets.forEach(target => revealObserver.observe(target));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const id = anchor.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    function updateScrollUI() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0;

        if (pageProgressBar) pageProgressBar.style.width = percentage + "%";
        backToTop?.classList.toggle("show", window.scrollY > 600);
        siteHeader?.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
});