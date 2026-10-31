document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------
    // FINAL LEARNER-FACING PRESENTATION
    // --------------------------------------------------
    document.title = "AI Literacy Toolkit | Senior High School";

    const setMeta = (selector, value) => {
        const meta = document.querySelector(selector);
        if (meta) meta.setAttribute("content", value);
    };

    setMeta(
        'meta[name="description"]',
        "An interactive AI literacy toolkit for Senior High School students covering understanding, evaluation, verification, integrity, privacy, ethics, and responsible AI-supported learning."
    );
    setMeta('meta[property="og:title"]', "AI Literacy Toolkit | Senior High School");
    setMeta('meta[name="twitter:title"]', "AI Literacy Toolkit | Senior High School");
    document.querySelector('meta[name="research-status"]')?.remove();

    // Remove temporary development-status callouts from the learner experience.
    document.querySelectorAll(".prototype-note, .research-scope-note, .ethics-separation")
        .forEach(el => el.remove());

    // Home language: present the toolkit as a learning experience rather than a status page.
    const eyebrowFirst = document.querySelector(".hero .eyebrow span:first-child");
    if (eyebrowFirst) eyebrowFirst.textContent = "AI Literacy Toolkit";

    const heroLead = document.querySelector(".hero-lead");
    if (heroLead) {
        heroLead.textContent =
            "Build the judgment to understand AI, evaluate what it produces, verify evidence, protect information, and use AI in ways that strengthen your own learning.";

        if (!document.querySelector(".final-learning-badge")) {
            const badge = document.createElement("span");
            badge.className = "final-learning-badge";
            badge.textContent = "7 connected domains · interactive practice · progress saved on this device";
            heroLead.insertAdjacentElement("afterend", badge);
        }
    }

    // Guide copy.
    const guideIntro = document.querySelector("#guide .guide-intro > p");
    if (guideIntro) {
        guideIntro.textContent =
            "Each module has four parts: Discussion, Real-Life Scenarios, Quiz, and Assessment. Move freely between sections, read at your own pace, and try the quiz, then complete the separate five-task assessment.";
    }

    const readinessCopy = document.querySelector("#guide .readiness-copy p");
    if (readinessCopy) {
        readinessCopy.textContent =
            "Use this private self-check to spot where you want more practice. Your selections stay in this browser and help guide your learning path.";
    }

    // Add a concise guide summary.
    const guidePanel = document.querySelector("#guide .guide-panel");
    if (guidePanel && !document.querySelector("#guide .final-page-summary")) {
        const summary = document.createElement("div");
        summary.className = "final-page-summary";
        summary.innerHTML = `
            <span><b>Learn actively</b>Use AI to explain, question, practice, and improve—not simply to finish work.</span>
            <span><b>Check critically</b>Pause on important claims, sources, bias, privacy, and consequences.</span>
            <span><b>Apply responsibly</b>Turn each domain into a habit you can use in real school tasks.</span>
        `;
        guidePanel.append(summary);
    }

    // --------------------------------------------------
    // LEARNING TRAIL — clearer purpose on every module card
    // --------------------------------------------------
    const modulesIntro = document.querySelector("#modules .modules-intro > p");
    if (modulesIntro) {
        modulesIntro.textContent =
            "Choose a lesson and follow four simple parts: Discussion, Real-Life Scenarios, Quiz, and Assessment. Read at your own pace, use the examples, and try the quiz, then complete the assessment.";
    }

    const moduleEnhancements = [
        {
            context: "Use it when: deciding what AI actually does",
            why: "AI can sound human without thinking like a human.",
            watch: "Confusing fluent output with real understanding.",
            tool: "AI or Algorithm?",
            discuss: "Name one thing AI can support and one decision that must stay yours."
        },
        {
            context: "Use it when: judging a chatbot answer",
            why: "Polished answers can still contain errors, missing context, or bias.",
            watch: "Treating confidence, detail, or formatting as proof.",
            tool: "Six-Lens Output Check",
            discuss: "If an AI answer includes a surprising statistic, what would you inspect first—and why?"
        },
        {
            context: "Use it when: checking claims and citations",
            why: "AI can invent references or misrepresent real sources.",
            watch: "Academic-looking citations that cannot be located or do not support the claim.",
            tool: "VERIFY",
            discuss: "What should you do when a DOI, article title, or quoted source does not exist?"
        },
        {
            context: "Use it when: completing assessed schoolwork",
            why: "AI assistance can support learning—or quietly replace it.",
            watch: "Submitting work you cannot explain, defend, or reproduce yourself.",
            tool: "AI Assistance Spectrum",
            discuss: "Where should you draw the line between brainstorming support and authorship?"
        },
        {
            context: "Use it when: prompting or uploading files",
            why: "Prompts can expose your data or someone else’s.",
            watch: "Names, IDs, grades, contact details, photos, or private records.",
            tool: "Prompt Privacy Scanner",
            discuss: "What can you remove, generalize, or anonymize before sharing a file with AI?"
        },
        {
            context: "Use it when: AI affects other people",
            why: "AI choices can affect consent, fairness, dignity, safety, and trust.",
            watch: "Ignoring harm because something is 'just a joke' or technically possible.",
            tool: "Ethics Court",
            discuss: "Who could be affected by this AI use—even if they never used the tool themselves?"
        },
        {
            context: "Use it when: studying, creating, or problem-solving with AI",
            why: "Useful AI should leave you more capable, not more dependent.",
            watch: "Finishing faster without understanding, checking, or owning the final work.",
            tool: "AI WISE Learning Routine",
            discuss: "After using AI, what should you still be able to explain, decide, or create yourself?"
        }
    ];

    document.querySelectorAll(".module-card").forEach((card, index) => {
        card.setAttribute("data-domain", String(index + 1).padStart(2, "0"));
        const enhancement = moduleEnhancements[index];

        if (enhancement && !card.querySelector(".module-context")) {
            const context = document.createElement("p");
            context.className = "module-context";
            context.textContent = enhancement.context;
            const toolPreview = card.querySelector(".module-tool-preview");
            if (toolPreview) toolPreview.insertAdjacentElement("afterend", context);
        }

        const btn = card.querySelector(".module-link");
        if (btn) {
            btn.innerHTML = 'Open lesson <span>→</span>';
        }
    });

    // --------------------------------------------------
    // MODULE OVERLAY — add a concise Mission Brief above the lesson
    // --------------------------------------------------
    const moduleLessonContent = document.getElementById("moduleLessonContent");
    const modulePosition = document.getElementById("modulePosition");

    const getCurrentModuleNumber = () => {
        const match = modulePosition?.textContent?.match(/Module\s+(\d+)/i);
        return match ? Number(match[1]) : 0;
    };

    const addMissionBrief = () => {
        if (moduleLessonContent?.dataset.simpleLesson === "true") return;
        if (!moduleLessonContent) return;
        if (moduleLessonContent.querySelector(":scope > .module-mission-brief")) return;

        const number = getCurrentModuleNumber();
        const enhancement = moduleEnhancements[number - 1];
        if (!enhancement) return;

        const brief = document.createElement("section");
        brief.className = "module-mission-brief";
        brief.setAttribute("aria-label", "Module mission brief");
        brief.innerHTML = `
            <div class="mission-brief-head">
                <span>MISSION BRIEF · DOMAIN ${String(number).padStart(2, "0")}</span>
                <strong>Know what to look for before you begin.</strong>
            </div>
            <div class="mission-brief-grid">
                <article>
                    <span>WHY IT MATTERS</span>
                    <p>${enhancement.why}</p>
                </article>
                <article>
                    <span>WATCH FOR</span>
                    <p>${enhancement.watch}</p>
                </article>
                <article>
                    <span>USE THIS TOOL</span>
                    <p>${enhancement.tool}</p>
                </article>
            </div>
            <div class="mission-discuss">
                <span>PAUSE + DISCUSS</span>
                <p>${enhancement.discuss}</p>
            </div>
        `;
        moduleLessonContent.prepend(brief);
    };

    if (moduleLessonContent) {
        const lessonObserver = new MutationObserver(() => {
            window.requestAnimationFrame(addMissionBrief);
        });
        lessonObserver.observe(moduleLessonContent, { childList: true });
        addMissionBrief();
    }

    // Decision Lab copy.
    const caseParagraph = document.querySelector("#challenge .case-copy p");
    if (caseParagraph) {
        caseParagraph.textContent =
            "Practice the decisions that matter when an AI answer looks convincing: inspect the claim, verify what matters, and choose the most responsible next step.";
    }

    const caseTask = document.querySelector("#challenge .case-note strong");
    if (caseTask) caseTask.textContent = "Work through seven realistic AI-use decisions.";

    // Progress: remove research-process wording and make it motivational.
    const progressCopy = document.querySelector("#progress .progress-copy > p");
    if (progressCopy) {
        progressCopy.textContent =
            "Your completed modules and practice answers stay in this browser so you can return and continue where you left off. Earlier saved drafts remain on this device.";
    }

    const completionCopy = document.querySelector("#completionPanel .completion-copy p");
    if (completionCopy) {
        completionCopy.textContent =
            "You completed the seven-domain learning trail. Review the tools below, then use the integrated capstone to bring the skills together in one AI-supported task.";
    }

    // About: keep the study identity, remove unfinished-status language.
    const aboutHeading = document.querySelector("#about .about-title h2");
    if (aboutHeading) {
        aboutHeading.innerHTML = "Designed for students.<br>Built for responsible AI learning.";
    }

    const aboutParagraphs = document.querySelectorAll("#about .about-copy > p");
    if (aboutParagraphs[0]) {
        aboutParagraphs[0].textContent =
            "The AI Literacy Toolkit supports Grade 11–12 learners in Laoag City, Ilocos Norte through seven connected areas of AI literacy: understanding AI, evaluating outputs, verifying sources, academic integrity, data privacy, ethical awareness, and responsible AI-supported learning.";
    }
    if (aboutParagraphs[1]) {
        aboutParagraphs[1].textContent =
            "The toolkit combines detailed discussions, real-life scenarios, playable videos, practice quizzes, and separate assessments, learner progress, and a teacher/facilitator view. Each module uses the same four-part learning flow.";
    }

    document.querySelector("#about .research-sequence")?.remove();
    document.querySelector("#about .evaluation-plan")?.remove();

    // Resources: keep the evidence base, remove development-status framing.
    const resourcesLead = document.querySelector("#resources .resources-title > p");
    if (resourcesLead) {
        resourcesLead.textContent =
            "Explore the educational, policy, and privacy guidance that informs the toolkit's critical, human-centered approach to AI literacy.";
    }

    // Footer cleanup.
    const footerSpans = document.querySelectorAll("footer .footer-right span");
    if (footerSpans[0]) footerSpans[0].textContent = "AI Literacy Learning Toolkit · Senior High School";
    if (footerSpans[1]) footerSpans[1].textContent = "Developed by Aerojohn Joshua G. Pancho";

    // Improve page accessibility/clarity by labelling each module card with its domain title.
    document.querySelectorAll(".module-card").forEach(card => {
        const title = card.querySelector("h3")?.textContent?.trim();
        if (title) card.setAttribute("aria-label", `Domain ${card.dataset.domain}: ${title}`);
    });

    // Make glossary groups mutually calm: only one expanded definition at a time.
    const glossaryItems = [...document.querySelectorAll("#glossary details")];
    glossaryItems.forEach(item => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            glossaryItems.forEach(other => {
                if (other !== item) other.open = false;
            });
        });
    });

    // --------------------------------------------------
    // READINESS SELF-CHECK — ACTUAL LEARNING-PATH BEHAVIOR
    // --------------------------------------------------
    const readinessCard = document.querySelector("#guide .readiness-card");
    const readinessResult = document.getElementById("readinessResult");

    if (readinessCard && readinessResult) {
        const items = [...readinessCard.querySelectorAll(".readiness-item")];
        const domainNames = [
            "Basic AI Understanding",
            "Evaluation of AI-Generated Outputs",
            "Source Verification",
            "Academic Integrity",
            "Data Privacy",
            "Ethical Awareness",
            "Responsible AI-Supported Learning"
        ];

        readinessResult.setAttribute("role", "status");
        readinessResult.setAttribute("aria-live", "polite");

        const readinessCopyBox = readinessCard.querySelector(".readiness-copy");
        let readinessMeter = readinessCard.querySelector(".readiness-meter");
        if (readinessCopyBox && !readinessMeter) {
            readinessMeter = document.createElement("div");
            readinessMeter.className = "readiness-meter";
            readinessMeter.innerHTML = `
                <div class="readiness-meter-head"><span>SELF-CHECK PROGRESS</span><strong>0 / 7 answered</strong></div>
                <div class="readiness-meter-track"><span></span></div>
            `;
            readinessCopyBox.append(readinessMeter);
        }

        const readState = () => {
            try {
                const raw = JSON.parse(localStorage.getItem("aiToolkitReadiness") || "{}");
                const clean = {};
                for (let i = 1; i <= 7; i++) {
                    const value = Number(raw[i]);
                    if ([1,2,3].includes(value)) clean[i] = value;
                }
                return clean;
            } catch (_) {
                return {};
            }
        };

        const saveState = state => localStorage.setItem("aiToolkitReadiness", JSON.stringify(state));

        const formatDomains = domains => {
            const labels = domains.map(domain => domainNames[domain - 1]);
            if (labels.length === 0) return "";
            if (labels.length === 1) return labels[0];
            if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
            return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
        };

        const updateMeter = answeredCount => {
            if (!readinessMeter) return;
            const strong = readinessMeter.querySelector("strong");
            const fill = readinessMeter.querySelector(".readiness-meter-track span");
            if (strong) strong.textContent = `${answeredCount} / 7 answered`;
            if (fill) fill.style.width = `${(answeredCount / 7) * 100}%`;
        };

        const syncButtons = state => {
            items.forEach(item => {
                const domain = Number(item.dataset.readiness);
                const selectedLevel = Number(state[domain] || 0);

                item.classList.toggle("is-answered", selectedLevel > 0);
                item.classList.toggle("answer-need", selectedLevel === 1);
                item.classList.toggle("answer-sometimes", selectedLevel === 2);
                item.classList.toggle("answer-confident", selectedLevel === 3);
                item.dataset.answer = selectedLevel === 1
                    ? "Need practice"
                    : selectedLevel === 2
                        ? "Sometimes"
                        : selectedLevel === 3
                            ? "Confident"
                            : "";

                item.querySelectorAll("button[data-level]").forEach(button => {
                    const selected = Number(button.dataset.level) === selectedLevel;
                    button.classList.toggle("selected", selected);
                    button.classList.toggle("is-selected", selected);
                    button.setAttribute("aria-pressed", String(selected));
                });
            });

            updateMeter(Object.keys(state).length);
        };

        const action = (label, attrs = "", extraClass = "") =>
            `<button type="button" class="${extraClass}" ${attrs}>${label}</button>`;

        const renderPath = () => {
            const state = readState();
            syncButtons(state);

            const answered = Object.keys(state).map(Number).sort((a,b) => a-b);
            const need = answered.filter(domain => state[domain] === 1);
            const sometimes = answered.filter(domain => state[domain] === 2);
            const confident = answered.filter(domain => state[domain] === 3);
            const remaining = 7 - answered.length;

            if (answered.length === 0) {
                readinessResult.innerHTML = `
                    <div class="readiness-path-head"><span>YOUR LEARNING PATH</span><strong>Answer the statements to find a starting point.</strong></div>
                    <p>This is not a test score. It simply helps you choose which AI-literacy module to practice first.</p>
                `;
                return;
            }

            if (answered.length < 7) {
                const priority = need.length ? need : sometimes;
                readinessResult.innerHTML = `
                    <div class="readiness-path-head"><span>YOUR LEARNING PATH</span><strong>${answered.length} of 7 answered · ${remaining} remaining</strong></div>
                    <p>${priority.length ? `<b>Current priority:</b> ${formatDomains(priority)}.` : "Your answered areas are currently marked confident."} Finish the remaining statement${remaining === 1 ? "" : "s"} for a complete path.</p>
                    <div class="readiness-actions">
                        ${priority.length ? action(`Open ${domainNames[priority[0]-1]}`, `data-readiness-open="${priority[0]}"`) : ""}
                        ${action("Reset self-check", "data-readiness-reset", "readiness-reset")}
                    </div>
                `;
                return;
            }

            if (need.length) {
                readinessResult.innerHTML = `
                    <div class="readiness-path-head"><span>YOUR LEARNING PATH</span><strong>Start with the areas you marked “Need practice.”</strong></div>
                    <p><b>Priority:</b> ${formatDomains(need)}.</p>
                    <div class="readiness-actions">
                        ${need.slice(0,4).map(domain => action(`Open ${domainNames[domain-1]}`, `data-readiness-open="${domain}"`)).join("")}
                        ${action("Reset self-check", "data-readiness-reset", "readiness-reset")}
                    </div>
                `;
                return;
            }

            if (sometimes.length) {
                readinessResult.innerHTML = `
                    <div class="readiness-path-head"><span>YOUR LEARNING PATH</span><strong>Review the areas you marked “Sometimes.”</strong></div>
                    <p><b>Suggested review:</b> ${formatDomains(sometimes)}.</p>
                    <div class="readiness-actions">
                        ${sometimes.slice(0,4).map(domain => action(`Open ${domainNames[domain-1]}`, `data-readiness-open="${domain}"`)).join("")}
                        ${action("Reset self-check", "data-readiness-reset", "readiness-reset")}
                    </div>
                `;
                return;
            }

            if (confident.length === 7) {
                readinessResult.innerHTML = `
                    <div class="readiness-path-head"><span>YOUR LEARNING PATH</span><strong>You marked yourself confident in all seven areas.</strong></div>
                    <p>Test that confidence in the Decision Lab, where the choices are less obvious.</p>
                    <div class="readiness-actions">
                        ${action("Go to Decision Lab", "data-readiness-lab")}
                        ${action("Reset self-check", "data-readiness-reset", "readiness-reset")}
                    </div>
                `;
            }
        };

        readinessCard.addEventListener("click", event => {
            const choice = event.target.closest("button[data-level]");
            if (choice) {
                const item = choice.closest(".readiness-item");
                const domain = Number(item?.dataset.readiness);
                const level = Number(choice.dataset.level);
                if (domain >= 1 && domain <= 7 && [1,2,3].includes(level)) {
                    const state = readState();
                    state[domain] = level;
                    saveState(state);
                    window.setTimeout(renderPath, 0);
                }
                return;
            }

            const open = event.target.closest("[data-readiness-open]");
            if (open) {
                const domain = Number(open.dataset.readinessOpen);
                const moduleButton = document.querySelector(`.module-link[data-module="${domain}"]`);
                if (moduleButton) moduleButton.click();
                return;
            }

            const lab = event.target.closest("[data-readiness-lab]");
            if (lab) {
                document.querySelector('a[href="#challenge"]')?.click();
                return;
            }

            const reset = event.target.closest("[data-readiness-reset]");
            if (reset) {
                localStorage.removeItem("aiToolkitReadiness");
                renderPath();
            }
        });

        // Render after script-base has finished its own initialization.
        window.setTimeout(renderPath, 0);
    }
});
