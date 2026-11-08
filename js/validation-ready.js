(() => {
    const boot = () => {
        const domains = [
            {
                tool: "AI or Algorithm?",
                time: "Self-paced",
                outcome: "Explain what AI and generative AI can and cannot do, and separate system capability from human understanding.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "Long & Magerko (2020)", "Ng et al. (2021)"]
            },
            {
                tool: "Six-Lens Output Check",
                time: "Self-paced",
                outcome: "Evaluate AI outputs for accuracy, relevance, completeness, logic, bias, and evidence before using them.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "Ng et al. (2021)"]
            },
            {
                tool: "VERIFY",
                time: "Self-paced",
                outcome: "Trace important claims back to sources that can be located, checked, and matched to the claim.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "UNESCO AI Competency Framework for Students (2024)"]
            },
            {
                tool: "AI Assistance Spectrum",
                time: "Self-paced",
                outcome: "Choose AI assistance that follows task rules, preserves honest authorship, and keeps the learner’s own contribution visible.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            },
            {
                tool: "Prompt Privacy Scanner",
                time: "Self-paced",
                outcome: "Use data minimization and avoid sharing unnecessary personal, confidential, or identifying information with AI tools.",
                evidence: ["Data Privacy Act of 2012 (RA 10173)", "UNESCO Guidance for Generative AI in Education and Research (2023)"]
            },
            {
                tool: "Ethics Court",
                time: "Self-paced",
                outcome: "Consider fairness, bias, consent, transparency, possible harm, ownership, and accountability when judging AI use.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            },
            {
                tool: "AI WISE Learning Routine",
                time: "Self-paced",
                outcome: "Use AI to support thinking and learning while retaining understanding, judgment, effort, and ownership of the final work.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "UNESCO AI Competency Framework for Students (2024)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            }
        ];

        // --------------------------------------------------
        // ABOUT — validator-friendly development and criteria map
        // --------------------------------------------------
        const aboutCopy = document.querySelector("#about .about-copy");
        if (aboutCopy && !aboutCopy.querySelector(".validation-ready-panel")) {
            const panel = document.createElement("section");
            panel.className = "validation-ready-panel";
            panel.setAttribute("aria-label", "Learning overview");

            const needsStatus = '<strong>Learn at your own pace.</strong> Choose a domain, explore the discussion and examples, then practice and assess your understanding.';

            panel.innerHTML = `
                <div class="validation-ready-head">
                    <span>AI LITERACY TOOLKIT</span>
                    <h3>Seven learning domains for everyday AI decisions.</h3>
                    <p>${needsStatus}</p>
                </div>

                <div class="validation-sequence" aria-label="Learning sequence">
                    <span>Choose a lesson</span><b>→</b>
                    <span>Read the discussion</span><b>→</b>
                    <span>Explore scenarios</span><b>→</b>
                    <span>Try the quiz</span><b>→</b>
                    <span>Complete the assessment</span><b>→</b>
                    <span>Review and continue</span>
                </div>

                <div class="validation-criteria-grid">
                    <article>
                        <span>LEARNING SUPPORT</span>
                        <strong>Clear explanations and practical examples</strong>
                        <p>Detailed discussions · Real-life scenarios · Videos · Practical routines</p>
                    </article>
                    <article>
                        <span>YOUR PRACTICE</span>
                        <strong>Practice, feedback, and progress</strong>
                        <p>Practice quiz · Separate assessment · Immediate feedback · Saved progress</p>
                    </article>
                </div>
            `;

            const researchCard = aboutCopy.querySelector(".research-card");
            if (researchCard) researchCard.insertAdjacentElement("afterend", panel);
            else aboutCopy.append(panel);
        }

        // --------------------------------------------------
        // MODULE OVERLAY — evidence basis + observable learner outcome
        // --------------------------------------------------
        const moduleLessonContent = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");

        const getCurrentModuleNumber = () => {
            const match = modulePosition?.textContent?.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const enrichOpenModule = () => {
            if (!moduleLessonContent) return;
            const number = getCurrentModuleNumber();
            const domain = domains[number - 1];
            if (!domain) return;

            const brief = moduleLessonContent.querySelector(":scope > .module-mission-brief");
            if (!brief) return;

            if (!brief.querySelector(".module-validation-meta")) {
                const meta = document.createElement("div");
                meta.className = "module-validation-meta";
                meta.innerHTML = `
                    <span><b>ESTIMATED TIME</b>${domain.time}</span>
                    <span><b>LEARNER OUTCOME</b>${domain.outcome}</span>
                    <span><b>REUSABLE TOOL</b>${domain.tool}</span>
                `;
                const head = brief.querySelector(".mission-brief-head");
                if (head) head.insertAdjacentElement("afterend", meta);
                else brief.prepend(meta);
            }

            if (!brief.querySelector(".module-evidence-base")) {
                const evidence = document.createElement("div");
                evidence.className = "module-evidence-base";
                evidence.innerHTML = `
                    <div>
                        <span>EVIDENCE BASE</span>
                        <strong>Key sources informing this domain</strong>
                    </div>
                    <p>${domain.evidence.join(" · ")}</p>
                    <button type="button" data-open-resources>View references</button>
                `;
                brief.append(evidence);
            }
        };

        moduleLessonContent?.addEventListener("click", event => {
            const openResources = event.target.closest("[data-open-resources]");
            if (!openResources) return;
            document.getElementById("moduleClose")?.click();
            window.setTimeout(() => document.querySelector('a[href="#resources"]')?.click(), 0);
        });

        if (moduleLessonContent) {
            const observer = new MutationObserver(() => {
                window.requestAnimationFrame(enrichOpenModule);
            });
            observer.observe(moduleLessonContent, { childList: true, subtree: false });
            enrichOpenModule();
        }

        // --------------------------------------------------
        // TEACHER MODE — pacing cue without changing the core facilitator guide
        // --------------------------------------------------
        const teacherContent = document.getElementById("teacherContent");
        const enhanceTeacher = () => {
            if (!teacherContent || teacherContent.querySelector(".teacher-validation-note")) return;
            const head = teacherContent.querySelector(".teacher-domain-head");
            if (!head) return;
            const note = document.createElement("div");
            note.className = "teacher-validation-note";
            note.innerHTML = `
                <span>FACILITATION NOTE</span>
                <p>Use the same four parts as the learner: Discussion → Real-Life Scenarios → Quiz → Assessment. Read the discussion, explore the real-life examples, try the practice quiz, then review the separate assessment. Classroom extensions are optional.</p>
            `;
            head.insertAdjacentElement("afterend", note);
        };

        if (teacherContent) {
            const teacherObserver = new MutationObserver(() => window.requestAnimationFrame(enhanceTeacher));
            teacherObserver.observe(teacherContent, { childList: true, subtree: false });
            enhanceTeacher();
        }

        // --------------------------------------------------
        // ACCESSIBILITY / USABILITY HARDENING
        // --------------------------------------------------
        document.querySelectorAll("button, a, summary").forEach(el => {
            if (!el.hasAttribute("tabindex") && el.tagName !== "SUMMARY") return;
        });

        document.documentElement.classList.add("validation-ready-build");
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();

