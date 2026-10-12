(() => {
    const boot = () => {
        const moduleModal = document.getElementById("moduleModal");
        const moduleContent = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");
        const challengeModal = document.getElementById("challengeModal");
        const challengeDomain = document.getElementById("challengeDomain");
        const challengeClose = document.getElementById("modalClose");

        const order = ["objectives", "learn", "look", "try", "check", "reflect", "apply", "takeaway"];

        const safeJSON = (key, fallback = {}) => {
            try {
                const parsed = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
                return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (_) {
                return fallback;
            }
        };

        const currentModule = () => {
            const match = modulePosition?.textContent?.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const currentStep = () => moduleContent?.querySelector(".module-slide.is-active")?.dataset.slide || "";

        const blockerForNext = () => {
            const moduleNumber = currentModule();
            const step = currentStep();
            const micro = safeJSON("aiToolkitMicroChecks", {})[String(moduleNumber)] || {};
            const checks = safeJSON("aiToolkitModuleChecks", {})[String(moduleNumber)] || {};

            if (step === "learn" && !micro.learn) return "Complete the Learn checkpoint before moving on.";
            if (step === "look" && !micro.look) return "Diagnose the Explore scenario before moving on.";
            if (step === "try" && !checks.activity) return "Complete the main practice activity before moving to Check.";
            if (step === "check" && !checks.quiz) return "Answer the knowledge check before moving on.";
            return "";
        };

        const announceBlock = message => {
            const status = moduleContent?.querySelector(".purpose-gate-status");
            if (!status) return;
            status.classList.add("is-locked", "is-shaking");
            status.innerHTML = `<span>COMPLETE THIS STEP FIRST</span><strong>${message}</strong>`;
            window.setTimeout(() => status.classList.remove("is-shaking"), 360);
        };

        // The slideshow supports ArrowRight; intercept it before the slideshow listener
        // so required learning actions cannot be skipped with the keyboard.
        document.addEventListener("keydown", event => {
            if (event.key !== "ArrowRight") return;
            if (!moduleModal?.classList.contains("show")) return;
            if (!moduleContent?.classList.contains("is-slide-module")) return;

            const tag = document.activeElement?.tagName;
            if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

            const activeIndex = order.indexOf(currentStep());
            if (activeIndex < 0 || activeIndex >= order.length - 1) return;

            const blocker = blockerForNext();
            if (!blocker) return;

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            announceBlock(blocker);
        }, true);

        const caseNumber = () => {
            const match = challengeDomain?.textContent?.match(/DOMAIN\s+0?(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const enhanceLabResult = () => {
            const panel = challengeModal?.querySelector(".lab-consequence-panel:not([hidden])");
            if (!panel) return;
            const number = caseNumber();
            if (!number) return;

            if (!panel.querySelector("[data-lab-review-domain]")) {
                const actions = document.createElement("div");
                actions.className = "lab-result-actions";
                actions.innerHTML = `<button type="button" data-lab-review-domain="${number}">Review this domain <span>→</span></button>`;
                panel.append(actions);
            }

            const state = safeJSON("aiToolkitDecisionLab", {});
            const entries = Object.values(state).filter(item => item?.stakeCorrect && item?.decided);
            if (entries.length === 7 && !panel.querySelector(".lab-finish-summary")) {
                const firstTryResponsible = entries.filter(item => item.actionCorrect).length;
                const summary = document.createElement("div");
                summary.className = "lab-finish-summary";
                summary.innerHTML = `
                    <span>JUDGMENT PASSPORT COMPLETE</span>
                    <strong>You reasoned through all seven AI-literacy cases.</strong>
                    <p>${firstTryResponsible} of 7 final actions matched the most responsible choice. Use the review buttons to revisit any domain that still feels uncertain.</p>
                `;
                panel.append(summary);
            }
        };

        challengeModal?.addEventListener("click", event => {
            const review = event.target.closest("[data-lab-review-domain]");
            if (!review) return;
            const number = Number(review.dataset.labReviewDomain);
            if (!number) return;

            challengeClose?.click();
            window.setTimeout(() => {
                document.querySelector(`.module-link[data-module="${number}"]`)?.click();
            }, 80);
        });

        if (challengeModal) {
            const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceLabResult));
            observer.observe(challengeModal, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
            enhanceLabResult();
        }
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
