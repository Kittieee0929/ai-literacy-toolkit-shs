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
            "Move through the seven domains as a connected learning journey. Learn the idea, practice it in realistic situations, check your reasoning, reflect on your habits, and apply a reusable tool.";
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

    // Learning Trail: stronger learner-facing mission language.
    const modulesIntro = document.querySelector("#modules .modules-intro > p");
    if (modulesIntro) {
        modulesIntro.textContent =
            "Each domain develops a different part of AI judgment. Open a mission, work through the lesson and practice tool, then carry the skill into the next domain.";
    }

    document.querySelectorAll(".module-card").forEach((card, index) => {
        card.setAttribute("data-domain", String(index + 1).padStart(2, "0"));
        const btn = card.querySelector(".module-link");
        if (btn) {
            const arrow = btn.querySelector("span");
            btn.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
            });
            btn.insertAdjacentText("afterbegin", "Open mission ");
            if (!arrow) {
                const newArrow = document.createElement("span");
                newArrow.textContent = "→";
                btn.append(newArrow);
            }
        }
    });

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
            "Your completed modules, reflections, and application drafts stay in this browser so you can return and continue where you left off.";
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
            "The toolkit combines concise lessons, realistic scenarios, reusable decision tools, knowledge checks, reflection, application tasks, learner progress, and a teacher/facilitator view in one connected learning experience.";
    }

    document.querySelector("#about .research-sequence")?.remove();
    document.querySelector("#about .evaluation-plan")?.remove();

    // Resources: keep the evidence base, remove development-status framing.
    const resourcesLead = document.querySelector("#resources .resources-title > p");
    if (resourcesLead) {
        resourcesLead.textContent =
            "Explore the research, policy, privacy, and educational guidance that informs the toolkit's critical, human-centered approach to AI literacy.";
    }

    // Footer cleanup.
    const footerSpans = document.querySelectorAll("footer .footer-right span");
    if (footerSpans[0]) footerSpans[0].textContent = "AI Literacy Learning Toolkit · Senior High School";
    if (footerSpans[1]) footerSpans[1].textContent = "Educational Research Toolkit · © 2026";

    // Improve page accessibility/clarity by labelling each module card with its domain title.
    document.querySelectorAll(".module-card").forEach(card => {
        const title = card.querySelector("h3")?.textContent?.trim();
        if (title) card.setAttribute("aria-label", `Domain ${card.dataset.domain}: ${title}`);
    });

    // Make glossary groups mutually calm: when a learner opens one, leave others available
    // but collapse the previously opened item so the page stays readable.
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

        if (!document.getElementById("readinessFunctionalStyles")) {
            const style = document.createElement("style");
            style.id = "readinessFunctionalStyles";
            style.textContent = `
                #guide .readiness-item button.selected,
                #guide .readiness-item button.is-selected {
                    border-color: rgba(118,223,189,.72) !important;
                    background: rgba(118,223,189,.12) !important;
                    color: #e8fff7 !important;
                    box-shadow: 0 0 0 2px rgba(118,223,189,.10) !important;
                }
                #guide .readiness-result { padding: 18px 20px !important; }
                #guide .readiness-path-head { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
                #guide .readiness-path-head span { color:#76dfbd; font-size:7px; font-weight:800; letter-spacing:1.1px; }
                #guide .readiness-path-head strong { color:#eef4f8; font-size:12px; }
                #guide .readiness-result p { margin-top:8px; color:#aeb9c7; font-size:10px; line-height:1.55; }
                #guide .readiness-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
                #guide .readiness-actions button {
                    min-height:36px; padding:0 12px; border:1px solid rgba(134,160,255,.28);
                    border-radius:9px; background:rgba(134,160,255,.08); color:#e7ecff;
                    font-size:8px; font-weight:800; cursor:pointer;
                }
                #guide .readiness-actions button:hover { border-color:rgba(118,223,189,.48); background:rgba(118,223,189,.08); }
                #guide .readiness-reset { border-color:rgba(255,255,255,.10)!important; background:transparent!important; color:#9eabba!important; }
            `;
            document.head.append(style);
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

        const syncButtons = state => {
            items.forEach(item => {
                const domain = Number(item.dataset.readiness);
                const selectedLevel = Number(state[domain] || 0);
                item.querySelectorAll("button[data-level]").forEach(button => {
                    const selected = Number(button.dataset.level) === selectedLevel;
                    button.classList.toggle("selected", selected);
                    button.classList.toggle("is-selected", selected);
                    button.setAttribute("aria-pressed", String(selected));
                });
            });
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
