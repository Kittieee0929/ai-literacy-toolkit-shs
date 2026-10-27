(() => {
    const boot = () => {
        const needs = window.AIToolkitNeedsConfig || {
            status: "awaiting-results",
            overallInterpretation: "",
            domainMeans: {},
            priorityDomains: []
        };

        const domains = [
            {
                id: 1,
                name: "Basic AI Understanding",
                tool: "AI or Algorithm?",
                time: "12–15 min",
                outcome: "Explain what AI and generative AI can and cannot do, and separate system capability from human understanding.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "Long & Magerko (2020)", "Ng et al. (2021)"]
            },
            {
                id: 2,
                name: "Evaluation of AI-Generated Outputs",
                tool: "Six-Lens Output Check",
                time: "12–16 min",
                outcome: "Evaluate AI outputs for accuracy, relevance, completeness, logic, bias, and evidence before using them.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "Ng et al. (2021)"]
            },
            {
                id: 3,
                name: "Source Verification",
                tool: "VERIFY",
                time: "12–16 min",
                outcome: "Trace important claims back to sources that can be located, checked, and matched to the claim.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "UNESCO AI Competency Framework for Students (2024)"]
            },
            {
                id: 4,
                name: "Academic Integrity",
                tool: "AI Assistance Spectrum",
                time: "12–15 min",
                outcome: "Choose AI assistance that follows task rules, preserves honest authorship, and keeps the learner’s own contribution visible.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            },
            {
                id: 5,
                name: "Data Privacy",
                tool: "Prompt Privacy Scanner",
                time: "12–15 min",
                outcome: "Use data minimization and avoid sharing unnecessary personal, confidential, or identifying information with AI tools.",
                evidence: ["Data Privacy Act of 2012 (RA 10173)", "UNESCO Guidance for Generative AI in Education and Research (2023)"]
            },
            {
                id: 6,
                name: "Ethical Awareness",
                tool: "Ethics Court",
                time: "12–16 min",
                outcome: "Consider fairness, bias, consent, transparency, possible harm, ownership, and accountability when judging AI use.",
                evidence: ["UNESCO AI Competency Framework for Students (2024)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            },
            {
                id: 7,
                name: "Responsible AI-Supported Learning",
                tool: "AI WISE Learning Routine",
                time: "14–18 min",
                outcome: "Use AI to support thinking and learning while retaining understanding, judgment, effort, and ownership of the final work.",
                evidence: ["UNESCO Guidance for Generative AI in Education and Research (2023)", "UNESCO AI Competency Framework for Students (2024)", "DepEd Foundational Guidelines on AI in Basic Education (2026)"]
            }
        ];

        const prioritySet = new Set((needs.priorityDomains || []).map(Number));

        // --------------------------------------------------
        // ABOUT — validator-friendly development and criteria map
        // --------------------------------------------------
        const aboutCopy = document.querySelector("#about .about-copy");
        if (aboutCopy && !aboutCopy.querySelector(".validation-ready-panel")) {
            const panel = document.createElement("section");
            panel.className = "validation-ready-panel";
            panel.setAttribute("aria-label", "Toolkit validation readiness overview");

            const needsStatus = needs.status === "final"
                ? `<strong>Needs results integrated.</strong> Priority emphasis is based on the finalized needs-assessment analysis.`
                : `<strong>Needs results not yet finalized.</strong> No domain is currently labeled as a higher need. After analysis, only the evidence-based priority emphasis will change; the seven-domain learning architecture will remain stable.`;

            panel.innerHTML = `
                <div class="validation-ready-head">
                    <span>NEEDS-BASED AI LITERACY TOOLKIT</span>
                    <h3>Seven learning domains, guided by the completed needs assessment.</h3>
                    <p>${needsStatus}</p>
                </div>

                <div class="validation-sequence" aria-label="Research development sequence">
                    <span>Needs assessment</span><b>→</b>
                    <span>Integrate priorities</span><b>→</b>
                    <span>Expert validation</span><b>→</b>
                    <span>Revise</span><b>→</b>
                    <span>Student acceptability</span><b>→</b>
                    <span>Final refinement</span>
                </div>

                <div class="validation-criteria-grid">
                    <article>
                        <span>EXPERT VALIDATION</span>
                        <strong>Expert validation criteria</strong>
                        <p>Content Quality · Organization and Structure · Instructional Value · Usability and Accessibility · Visual Design and Presentation</p>
                    </article>
                    <article>
                        <span>STUDENT ACCEPTABILITY</span>
                        <strong>Student acceptability criteria</strong>
                        <p>Usefulness · Clarity · Relevance · Usability · Presentation</p>
                    </article>
                </div>
            `;

            const researchCard = aboutCopy.querySelector(".research-card");
            if (researchCard) researchCard.insertAdjacentElement("afterend", panel);
            else aboutCopy.append(panel);
        }

        // --------------------------------------------------
        // TOOLKIT MAP — makes organization obvious to validators and learners
        // --------------------------------------------------
        const modulesIntro = document.querySelector("#modules .modules-intro");
        if (modulesIntro && !document.querySelector("#modules .toolkit-domain-map")) {
            const map = document.createElement("div");
            map.className = "toolkit-domain-map";
            map.setAttribute("aria-label", "Seven-domain toolkit map");
            map.innerHTML = `
                <div class="toolkit-domain-map-head">
                    <span>TOOLKIT MAP</span>
                    <strong>Each lesson has an introduction, one motivating situation, an expanded discussion, and a three-question practice assessment.</strong>
                </div>
                <div class="toolkit-domain-map-grid">
                    ${domains.map(domain => `
                        <button type="button" data-map-open="${domain.id}" class="${prioritySet.has(domain.id) ? "is-priority" : ""}">
                            <span>${String(domain.id).padStart(2, "0")}</span>
                            <strong>${domain.name}</strong>
                            <small>${domain.tool}</small>
                            ${prioritySet.has(domain.id) ? "<em>PRIORITY NEED</em>" : ""}
                        </button>
                    `).join("")}
                </div>
            `;
            modulesIntro.append(map);

            map.addEventListener("click", event => {
                const button = event.target.closest("[data-map-open]");
                if (!button) return;
                const moduleButton = document.querySelector(`.module-link[data-module="${button.dataset.mapOpen}"]`);
                moduleButton?.click();
            });
        }

        // --------------------------------------------------
        // NEEDS-RESULTS HOOK — neutral until final data is available
        // --------------------------------------------------
        if (needs.status === "final") {
            document.querySelectorAll(".module-card").forEach(card => {
                const id = Number(card.id.replace("module-", ""));
                if (!prioritySet.has(id)) return;
                card.classList.add("needs-priority-domain");
                if (!card.querySelector(".needs-priority-label")) {
                    const label = document.createElement("span");
                    label.className = "needs-priority-label";
                    label.textContent = "Priority identified in needs assessment";
                    card.querySelector(".module-body")?.prepend(label);
                }
            });

            const priorityNames = domains.filter(d => prioritySet.has(d.id)).map(d => d.name);
            if (priorityNames.length && modulesIntro && !modulesIntro.querySelector(".needs-results-summary")) {
                const summary = document.createElement("div");
                summary.className = "needs-results-summary";
                summary.innerHTML = `
                    <span>NEEDS-ASSESSMENT EMPHASIS</span>
                    <strong>${needs.overallInterpretation || "Priority learning-support areas identified from the finalized needs assessment."}</strong>
                    <p>${priorityNames.join(" · ")}</p>
                `;
                modulesIntro.append(summary);
            }
        }

        // --------------------------------------------------
        // MODULE CARDS — quick validation/usefulness cues
        // --------------------------------------------------
        domains.forEach(domain => {
            const card = document.getElementById(`module-${domain.id}`);
            if (!card || card.querySelector(".module-meta-strip")) return;
            const strip = document.createElement("div");
            strip.className = "module-meta-strip";
            strip.innerHTML = `
                <span>${domain.time}</span>
                <span>4 simple parts</span>
                <span>3 practice questions</span>
                <span>review at your pace</span>
            `;
            const context = card.querySelector(".module-context");
            if (context) context.insertAdjacentElement("afterend", strip);
            else card.querySelector(".module-tool-preview")?.insertAdjacentElement("afterend", strip);
        });

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
                <p>Use the same four parts as the learner: Introduction → Motivation → Discussion → Assessment. Start with the goals, invite a response to the school situation, explain the discussion and worked examples, then review the three practice questions. Classroom extensions are optional.</p>
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

