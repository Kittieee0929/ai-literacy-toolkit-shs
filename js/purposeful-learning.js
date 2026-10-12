(() => {
    const boot = () => {
        const moduleContent = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");
        const moduleStepNav = document.querySelector(".module-step-nav");
        const challengeModal = document.getElementById("challengeModal");
        const challengeAnswers = document.getElementById("challengeAnswers");
        const challengeDomain = document.getElementById("challengeDomain");
        const challengeQuestion = document.getElementById("challengeQuestion");
        const challengeFeedback = document.getElementById("answerFeedback");
        const nextChallenge = document.getElementById("nextChallenge");
        const challengeSection = document.getElementById("challenge");
        const resetToolkitBtn = document.getElementById("resetToolkitBtn");

        const microKey = "aiToolkitMicroChecks";
        const labKey = "aiToolkitDecisionLab";

        const modulePrompts = {
            1: {
                learn: {
                    prompt: "A chatbot gives a fluent, confident answer. What does that prove?",
                    options: [
                        "It understands the topic like a person.",
                        "It can generate convincing language, but human-like wording does not prove human understanding.",
                        "It must be correct because it was trained on a lot of data."
                    ],
                    correct: 1,
                    feedback: "Fluency is a capability, not proof of understanding. Human judgment still has to inspect the output."
                },
                look: {
                    prompt: "A science explanation sounds perfect but contains one questionable detail. What should you do first?",
                    options: [
                        "Use it because most of the answer looks correct.",
                        "Check the important claim against your lesson or another reliable source.",
                        "Ask the chatbot to sound more confident."
                    ],
                    correct: 1,
                    feedback: "The useful habit is to separate presentation quality from factual reliability."
                }
            },
            2: {
                learn: {
                    prompt: "Which is the strongest reason to trust an AI-generated answer?",
                    options: [
                        "It is detailed and professionally written.",
                        "Its important claims survive checks for accuracy, logic, context, bias, and evidence.",
                        "It gives an answer immediately."
                    ],
                    correct: 1,
                    feedback: "Trust should come from inspection, not polish. Use the Six-Lens Output Check."
                },
                look: {
                    prompt: "AI gives a surprising statistic but no traceable evidence. What is the best label for that claim?",
                    options: [
                        "Verified",
                        "Unverified until the statistic can be checked independently",
                        "Reliable because statistics sound objective"
                    ],
                    correct: 1,
                    feedback: "Treat unsupported claims as unverified until you can inspect evidence."
                }
            },
            3: {
                learn: {
                    prompt: "A reference has a journal title, authors, and DOI—but the DOI does not resolve. What should you do?",
                    options: [
                        "Cite it because it looks academic.",
                        "Do not cite it until you can locate the original source and confirm it supports the claim.",
                        "Ask AI to create a replacement DOI."
                    ],
                    correct: 1,
                    feedback: "A citation is not evidence until the source can actually be located and inspected."
                },
                look: {
                    prompt: "Which verification step is strongest?",
                    options: [
                        "Check whether many websites repeat the same wording.",
                        "Locate the original source, inspect author/date/context, and match the source to the exact claim.",
                        "Use the first search result."
                    ],
                    correct: 1,
                    feedback: "Verification means tracing a claim to evidence you can inspect—not counting repeated copies."
                }
            },
            4: {
                learn: {
                    prompt: "Your teacher allows AI for brainstorming but not for writing the final reflection. Which use follows the task rule?",
                    options: [
                        "Let AI write the reflection, then change a few words.",
                        "Use AI to generate reflection questions, then write and own the final reflection yourself.",
                        "Use AI secretly because the final answer is still submitted by you."
                    ],
                    correct: 1,
                    feedback: "Responsible AI use follows the actual learning purpose and the teacher's instructions."
                },
                look: {
                    prompt: "You submitted an AI-written paragraph but cannot explain its argument. What is the strongest next step?",
                    options: [
                        "Memorize the paragraph.",
                        "Return to the idea, understand it, verify what matters, and rewrite it in your own reasoning.",
                        "Make the paragraph shorter so it looks more personal."
                    ],
                    correct: 1,
                    feedback: "Authorship is more than changing wording. You should understand and own the reasoning you submit."
                }
            },
            5: {
                learn: {
                    prompt: "A class spreadsheet contains names, grades, phone numbers, and comments. What is the safest approach before using AI?",
                    options: [
                        "Upload the whole file because the purpose is educational.",
                        "Remove unnecessary identifiers and use anonymized or synthetic data whenever possible.",
                        "Upload it, then ask AI to delete it."
                    ],
                    correct: 1,
                    feedback: "Use data minimization: share only what the task truly needs."
                },
                look: {
                    prompt: "An AI tool asks for more personal context to improve its answer. What should guide your response?",
                    options: [
                        "Give everything so the output becomes more accurate.",
                        "Share the minimum information necessary and generalize or remove identifying details.",
                        "Personal information is safe if you do not include a password."
                    ],
                    correct: 1,
                    feedback: "Privacy is about minimizing exposure, not only hiding passwords."
                }
            },
            6: {
                learn: {
                    prompt: "A realistic AI voice clone of a teacher is posted as a joke. What is the main ethical concern?",
                    options: [
                        "The audio quality may be poor.",
                        "Consent, deception, reputational harm, and loss of trust can affect another person.",
                        "The file may use too much storage."
                    ],
                    correct: 1,
                    feedback: "Ethical judgment asks who is affected, what harm is possible, and who is accountable."
                },
                look: {
                    prompt: "When judging an AI use, whose perspective should count?",
                    options: [
                        "Only the person operating the AI tool.",
                        "People who may be affected—even if they never used the tool themselves.",
                        "Only people who complain afterward."
                    ],
                    correct: 1,
                    feedback: "Ethical awareness includes affected people, not only the tool's user."
                }
            },
            7: {
                learn: {
                    prompt: "AI solved a difficult task, but afterward you still cannot explain the idea. What does that tell you?",
                    options: [
                        "The task is complete because an answer exists.",
                        "The learning process is incomplete; use AI to practice and clarify until you can explain the idea yourself.",
                        "You only need to save the answer for later."
                    ],
                    correct: 1,
                    feedback: "AI-supported learning should leave you more capable, not merely finished."
                },
                look: {
                    prompt: "Which is the strongest sign that AI actually supported your learning?",
                    options: [
                        "You finished faster.",
                        "You can explain, verify, adapt, and defend the final work without depending on the original AI response.",
                        "The output uses advanced vocabulary."
                    ],
                    correct: 1,
                    feedback: "The goal is durable understanding, judgment, and ownership—not just task completion."
                }
            }
        };

        const labCases = {
            1: {
                stake: "Capability limits + human judgment",
                stakes: ["Capability limits + human judgment", "Formatting quality", "Response speed"],
                principle: "Fluent language does not prove human-like understanding.",
                consequence: "If fluency is mistaken for understanding, a learner may surrender judgment to an output that can still be wrong.",
                transfer: "Before trusting an AI explanation, ask: what am I still responsible for judging?"
            },
            2: {
                stake: "Accuracy + evidence",
                stakes: ["Length of the answer", "Accuracy + evidence", "How confident the wording sounds"],
                principle: "Polish is not evidence. Important claims should survive inspection.",
                consequence: "An unsupported statistic can move from a chatbot into schoolwork and become misinformation with a citation-shaped disguise.",
                transfer: "When a claim matters, inspect accuracy, context, logic, bias, and evidence before using it."
            },
            3: {
                stake: "Source authenticity",
                stakes: ["Source authenticity", "Number of paragraphs", "Whether the citation uses APA punctuation"],
                principle: "A reference only helps when the original source exists and supports the claim.",
                consequence: "Fabricated or mismatched citations can undermine the credibility of an otherwise strong paper.",
                transfer: "Trace important claims beyond the chatbot to a source you can actually open and inspect."
            },
            4: {
                stake: "Task rules + honest authorship",
                stakes: ["Task rules + honest authorship", "Using the newest AI model", "Finishing before classmates"],
                principle: "AI assistance should support the learning task without replacing the learner's required contribution.",
                consequence: "Submitting work you cannot explain can violate task rules and hide whether learning actually happened.",
                transfer: "Before using AI, identify what help is allowed and what thinking or writing must remain yours."
            },
            5: {
                stake: "Privacy + data minimization",
                stakes: ["Privacy + data minimization", "Spreadsheet appearance", "Prompt length"],
                principle: "Share only the information necessary for the task and protect other people's data too.",
                consequence: "Unnecessary uploads can expose identifiers, grades, contact details, or confidential comments to systems that did not need them.",
                transfer: "Remove, generalize, anonymize, or replace personal data before sending information to AI."
            },
            6: {
                stake: "Consent + harm + accountability",
                stakes: ["Audio file size", "Consent + harm + accountability", "Whether the joke gets many views"],
                principle: "Technical possibility does not remove responsibility for deception, consent, dignity, or harm.",
                consequence: "Synthetic media can damage trust and reputation even when the creator says it was only a joke.",
                transfer: "Ask who could be affected, whether they consented, and who would be accountable if harm occurs."
            },
            7: {
                stake: "Understanding + learner agency",
                stakes: ["Understanding + learner agency", "How fast the answer appeared", "Whether the answer is longer than your notes"],
                principle: "Useful AI should strengthen your ability to think, explain, verify, and create.",
                consequence: "If the learner cannot explain the result afterward, AI may have completed the task without supporting the learning.",
                transfer: "After AI helps, check whether you can still explain the idea and make the final decisions yourself."
            }
        };

        const safeJSON = (key, fallback = {}) => {
            try {
                const parsed = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
                return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (_) {
                return fallback;
            }
        };

        const currentModuleNumber = () => {
            const match = modulePosition?.textContent?.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const currentSlideKey = () => moduleContent?.querySelector(".module-slide.is-active")?.dataset.slide || "";

        const moduleChecks = moduleNumber => {
            const checks = safeJSON("aiToolkitModuleChecks", {});
            return checks[String(moduleNumber)] || {};
        };

        const microState = () => safeJSON(microKey, {});
        const microPassed = (moduleNumber, step) => Boolean(microState()[String(moduleNumber)]?.[step]);

        const setMicroPassed = (moduleNumber, step) => {
            const state = microState();
            const key = String(moduleNumber);
            state[key] = { ...(state[key] || {}), [step]: true };
            localStorage.setItem(microKey, JSON.stringify(state));
        };

        const requiredMessage = (moduleNumber, step) => {
            if (step === "learn" && !microPassed(moduleNumber, "learn")) return "Complete the Learn checkpoint before moving on.";
            if (step === "look" && !microPassed(moduleNumber, "look")) return "Diagnose the Explore scenario before moving on.";
            if (step === "try" && !moduleChecks(moduleNumber).activity) return "Complete the main practice activity before moving to Check.";
            if (step === "check" && !moduleChecks(moduleNumber).quiz) return "Answer the knowledge check before moving on.";
            return "";
        };

        const order = ["objectives", "learn", "look", "try", "check", "reflect", "apply", "takeaway"];

        const prerequisitesFor = (targetIndex, moduleNumber) => {
            const blockers = [];
            if (targetIndex > 1 && !microPassed(moduleNumber, "learn")) blockers.push("Learn checkpoint");
            if (targetIndex > 2 && !microPassed(moduleNumber, "look")) blockers.push("Explore diagnosis");
            if (targetIndex > 3 && !moduleChecks(moduleNumber).activity) blockers.push("Try activity");
            if (targetIndex > 4 && !moduleChecks(moduleNumber).quiz) blockers.push("knowledge check");
            return blockers;
        };

        const ensureGateStatus = () => {
            if (!moduleContent) return null;
            const controls = moduleContent.querySelector(".module-slide-controls");
            if (!controls) return null;
            let status = controls.querySelector(".purpose-gate-status");
            if (!status) {
                status = document.createElement("div");
                status.className = "purpose-gate-status";
                status.setAttribute("role", "status");
                status.setAttribute("aria-live", "polite");
                controls.querySelector(":scope > div")?.replaceWith(status);
            }
            return status;
        };

        const refreshModuleGate = () => {
            if (!moduleContent?.classList.contains("is-slide-module")) return;
            const moduleNumber = currentModuleNumber();
            const step = currentSlideKey();
            const status = ensureGateStatus();
            const next = moduleContent.querySelector("[data-slide-next]");
            const message = requiredMessage(moduleNumber, step);

            if (status) {
                if (message) {
                    status.innerHTML = `<span>LEARNING GATE</span><strong>${message}</strong>`;
                    status.classList.add("is-locked");
                } else if (["reflect", "apply"].includes(step)) {
                    status.innerHTML = `<span>OPTIONAL DEEPENING</span><strong>Use this step to connect the lesson to your own habits or schoolwork.</strong>`;
                    status.classList.remove("is-locked");
                } else if (step === "takeaway") {
                    status.innerHTML = `<span>MODULE FINISH</span><strong>Review the takeaway, evidence base, and completion requirements.</strong>`;
                    status.classList.remove("is-locked");
                } else {
                    status.innerHTML = `<span>STEP COMPLETE</span><strong>You can continue when you are ready.</strong>`;
                    status.classList.remove("is-locked");
                }
            }

            if (next && step !== "takeaway") {
                next.disabled = Boolean(message);
                next.setAttribute("aria-disabled", String(Boolean(message)));
            }
        };

        const checkpointMarkup = (moduleNumber, step, data) => {
            const passed = microPassed(moduleNumber, step);
            return `
                <div class="purpose-checkpoint ${passed ? "is-passed" : ""}" data-purpose-step="${step}">
                    <div class="purpose-checkpoint-head">
                        <span>${step === "learn" ? "THINK BEFORE YOU CONTINUE" : "DIAGNOSE THE SITUATION"}</span>
                        <strong>${data.prompt}</strong>
                    </div>
                    <div class="purpose-checkpoint-options">
                        ${data.options.map((option, index) => `<button type="button" data-purpose-choice="${index}" ${passed ? "disabled" : ""}>${option}</button>`).join("")}
                    </div>
                    <div class="purpose-checkpoint-feedback" aria-live="polite">${passed ? `<b>✓ Checkpoint complete.</b> ${data.feedback}` : "Choose the strongest answer. You can retry if needed."}</div>
                </div>
            `;
        };

        const enrichModule = () => {
            if (!moduleContent?.querySelector(".module-slide-deck")) return;
            const moduleNumber = currentModuleNumber();
            const prompts = modulePrompts[moduleNumber];
            if (!prompts) return;

            ["learn", "look"].forEach(step => {
                const slide = moduleContent.querySelector(`.module-slide[data-slide="${step}"]`);
                const section = slide?.querySelector(".lesson-section");
                if (!section || section.querySelector(".purpose-checkpoint")) return;
                section.insertAdjacentHTML("beforeend", checkpointMarkup(moduleNumber, step, prompts[step]));
            });

            refreshModuleGate();
        };

        moduleContent?.addEventListener("click", event => {
            const choice = event.target.closest("[data-purpose-choice]");
            if (!choice) return;
            const checkpoint = choice.closest(".purpose-checkpoint");
            const step = checkpoint?.dataset.purposeStep;
            const moduleNumber = currentModuleNumber();
            const data = modulePrompts[moduleNumber]?.[step];
            if (!checkpoint || !data) return;

            const index = Number(choice.dataset.purposeChoice);
            const feedback = checkpoint.querySelector(".purpose-checkpoint-feedback");
            checkpoint.querySelectorAll("[data-purpose-choice]").forEach(button => button.classList.remove("is-correct", "is-wrong"));

            if (index === data.correct) {
                choice.classList.add("is-correct");
                checkpoint.classList.add("is-passed");
                setMicroPassed(moduleNumber, step);
                checkpoint.querySelectorAll("[data-purpose-choice]").forEach(button => button.disabled = true);
                if (feedback) feedback.innerHTML = `<b>✓ Good reasoning.</b> ${data.feedback}`;
                refreshModuleGate();
            } else {
                choice.classList.add("is-wrong");
                if (feedback) feedback.innerHTML = `<b>Not yet.</b> Re-read the idea above and choose the response that protects learning and judgment best.`;
            }
        });

        // Prevent slideshow skipping past required learning actions.
        document.addEventListener("click", event => {
            if (!moduleContent?.classList.contains("is-slide-module")) return;
            if (!document.getElementById("moduleModal")?.classList.contains("show")) return;

            const moduleNumber = currentModuleNumber();
            const activeIndex = order.indexOf(currentSlideKey());
            let targetIndex = null;

            const next = event.target.closest("[data-slide-next]");
            const dot = event.target.closest(".module-slide-dot[data-slide-index]");
            const jump = event.target.closest(".module-step-nav button[data-jump]");

            if (next) targetIndex = activeIndex + 1;
            else if (dot) targetIndex = Number(dot.dataset.slideIndex);
            else if (jump) targetIndex = order.indexOf(jump.dataset.jump);
            else return;

            if (targetIndex <= activeIndex) return;

            const blockers = prerequisitesFor(targetIndex, moduleNumber);
            if (!blockers.length) return;

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            const status = ensureGateStatus();
            if (status) {
                status.classList.add("is-locked", "is-shaking");
                status.innerHTML = `<span>COMPLETE BEFORE SKIPPING</span><strong>${blockers.join(" · ")}</strong>`;
                window.setTimeout(() => status.classList.remove("is-shaking"), 360);
            }
        }, true);

        if (moduleContent) {
            const observer = new MutationObserver(() => {
                window.requestAnimationFrame(() => {
                    enrichModule();
                    refreshModuleGate();
                });
            });
            observer.observe(moduleContent, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden"] });
            enrichModule();
        }

        window.addEventListener("storage", refreshModuleGate);
        document.addEventListener("input", () => window.setTimeout(refreshModuleGate, 0));
        document.addEventListener("change", () => window.setTimeout(refreshModuleGate, 0));
        document.addEventListener("click", event => {
            if (event.target.closest(".quiz-option, .quiz-box button, .module-tool button, .lesson-task button")) {
                window.setTimeout(refreshModuleGate, 20);
            }
        });

        // --------------------------------------------------
        // DECISION LAB — NOTICE → DIAGNOSE → DECIDE → TRANSFER
        // --------------------------------------------------
        let purposePanel = null;
        let consequencePanel = null;
        let currentStakeUnlocked = false;

        const labState = () => safeJSON(labKey, {});
        const saveLabCase = (number, patch) => {
            const state = labState();
            state[String(number)] = { ...(state[String(number)] || {}), ...patch };
            localStorage.setItem(labKey, JSON.stringify(state));
            updateLabPassport();
        };

        const caseNumber = () => {
            const match = challengeDomain?.textContent?.match(/DOMAIN\s+0?(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const completedLabCases = () => Object.values(labState()).filter(item => item?.stakeCorrect && item?.decided).length;

        const updateLabPassport = () => {
            const count = completedLabCases();
            const display = challengeSection?.querySelector("[data-lab-passport-count]");
            if (display) display.textContent = `${count} / 7 cases reasoned`;
            const fill = challengeSection?.querySelector(".lab-passport-track span");
            if (fill) fill.style.width = `${(count / 7) * 100}%`;
        };

        if (challengeSection && !challengeSection.querySelector(".decision-method-strip")) {
            const method = document.createElement("div");
            method.className = "decision-method-strip";
            method.innerHTML = `
                <div><span>01</span><strong>NOTICE</strong><p>Identify what is really at stake.</p></div>
                <div><span>02</span><strong>DIAGNOSE</strong><p>Name the risk or principle before choosing.</p></div>
                <div><span>03</span><strong>DECIDE</strong><p>Choose the most responsible next action.</p></div>
                <div><span>04</span><strong>TRANSFER</strong><p>Carry one rule into your next AI task.</p></div>
                <aside class="lab-passport">
                    <span>JUDGMENT PASSPORT</span>
                    <strong data-lab-passport-count>0 / 7 cases reasoned</strong>
                    <div class="lab-passport-track"><span></span></div>
                </aside>
            `;
            challengeSection.querySelector(".lab-case")?.insertAdjacentElement("afterend", method);
            updateLabPassport();
        }

        const ensureLabPanels = () => {
            if (!challengeModal || !challengeAnswers) return;
            if (!purposePanel) {
                purposePanel = document.createElement("section");
                purposePanel.className = "lab-purpose-panel";
                challengeAnswers.insertAdjacentElement("beforebegin", purposePanel);
            }
            if (!consequencePanel) {
                consequencePanel = document.createElement("section");
                consequencePanel.className = "lab-consequence-panel";
                consequencePanel.hidden = true;
                challengeFeedback?.insertAdjacentElement("afterend", consequencePanel);
            }
        };

        const renderLabReasoning = () => {
            ensureLabPanels();
            const number = caseNumber();
            const data = labCases[number];
            if (!data || !purposePanel) return;

            const state = labState()[String(number)] || {};
            currentStakeUnlocked = Boolean(state.stakeCorrect);

            purposePanel.innerHTML = `
                <div class="lab-purpose-head">
                    <span>STEP 1 · DIAGNOSE BEFORE YOU DECIDE</span>
                    <strong>What is most at stake in this situation?</strong>
                    <p>Do not choose an action yet. First identify the issue that should guide your judgment.</p>
                </div>
                <div class="lab-stake-options">
                    ${data.stakes.map((item, index) => `<button type="button" data-lab-stake="${index}" class="${state.stakeCorrect && item === data.stake ? "is-correct" : ""}">${item}</button>`).join("")}
                </div>
                <div class="lab-stake-feedback" aria-live="polite">${state.stakeCorrect ? `<b>✓ Issue identified:</b> ${data.stake}. Now choose the most responsible action.` : "Choose the issue that matters most before the answer choices unlock."}</div>
            `;

            challengeAnswers.querySelectorAll(".answer-btn").forEach(button => {
                if (!button.classList.contains("challenge-correct") && !button.classList.contains("challenge-wrong")) {
                    button.disabled = !currentStakeUnlocked;
                }
            });

            if (challengeQuestion) challengeQuestion.textContent = currentStakeUnlocked
                ? "Step 2 · Choose the most responsible next action."
                : "Step 2 · Action choices unlock after you diagnose the issue.";

            if (nextChallenge) nextChallenge.disabled = !state.decided;

            if (state.decided && consequencePanel) {
                renderConsequence(number, state.actionCorrect);
            } else if (consequencePanel) {
                consequencePanel.hidden = true;
            }
        };

        const renderConsequence = (number, actionCorrect) => {
            const data = labCases[number];
            if (!data || !consequencePanel) return;
            const state = labState()[String(number)] || {};
            consequencePanel.hidden = false;
            consequencePanel.innerHTML = `
                <div class="lab-consequence-result ${actionCorrect ? "is-good" : "is-rethink"}">
                    <span>${actionCorrect ? "RESPONSIBLE DECISION" : "RETHINK THE DECISION"}</span>
                    <strong>${data.principle}</strong>
                </div>
                <div class="lab-consequence-grid">
                    <article><span>WHY IT MATTERS</span><p>${data.consequence}</p></article>
                    <article><span>CARRY THIS FORWARD</span><p>${data.transfer}</p></article>
                </div>
                <label class="lab-personal-rule">
                    <span>MY ONE-LINE RULE <em>optional · saved on this device</em></span>
                    <textarea rows="2" data-lab-rule placeholder="Example: I will verify important claims before I use them in schoolwork.">${state.rule || ""}</textarea>
                    <small data-lab-rule-status>${state.rule ? "Saved." : "Writing your own rule helps transfer this decision beyond the case."}</small>
                </label>
            `;
        };

        purposePanel?.addEventListener?.("click", () => {});

        challengeModal?.addEventListener("click", event => {
            const stakeButton = event.target.closest("[data-lab-stake]");
            if (stakeButton) {
                const number = caseNumber();
                const data = labCases[number];
                if (!data) return;
                const selected = data.stakes[Number(stakeButton.dataset.labStake)];
                const correct = selected === data.stake;
                const feedback = purposePanel?.querySelector(".lab-stake-feedback");

                purposePanel?.querySelectorAll("[data-lab-stake]").forEach(button => button.classList.remove("is-correct", "is-wrong"));
                stakeButton.classList.add(correct ? "is-correct" : "is-wrong");

                if (correct) {
                    currentStakeUnlocked = true;
                    saveLabCase(number, { stakeCorrect: true });
                    challengeAnswers?.querySelectorAll(".answer-btn").forEach(button => button.disabled = false);
                    if (challengeQuestion) challengeQuestion.textContent = "Step 2 · Choose the most responsible next action.";
                    if (feedback) feedback.innerHTML = `<b>✓ Issue identified:</b> ${data.stake}. Now choose the action that best protects that principle.`;
                } else if (feedback) {
                    feedback.innerHTML = `<b>Look again.</b> Which issue could most affect the reliability, safety, fairness, or learning value of what happens next?`;
                }
                return;
            }

            const answer = event.target.closest("#challengeAnswers .answer-btn");
            if (answer) {
                if (!currentStakeUnlocked) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
                window.setTimeout(() => {
                    const number = caseNumber();
                    const correct = answer.classList.contains("challenge-correct") && !answer.classList.contains("challenge-wrong");
                    saveLabCase(number, { decided: true, actionCorrect: correct });
                    renderConsequence(number, correct);
                    if (nextChallenge) nextChallenge.disabled = false;
                }, 0);
            }
        });

        challengeModal?.addEventListener("input", event => {
            const textarea = event.target.closest("[data-lab-rule]");
            if (!textarea) return;
            const number = caseNumber();
            const value = textarea.value.trim();
            saveLabCase(number, { rule: value });
            const status = consequencePanel?.querySelector("[data-lab-rule-status]");
            if (status) status.textContent = value ? "Saved." : "Writing your own rule helps transfer this decision beyond the case.";
        });

        if (challengeAnswers) {
            const labObserver = new MutationObserver(() => window.requestAnimationFrame(renderLabReasoning));
            labObserver.observe(challengeAnswers, { childList: true });
        }

        // Capture answer clicks before base handlers when the diagnosis step is incomplete.
        challengeAnswers?.addEventListener("click", event => {
            const answer = event.target.closest(".answer-btn");
            if (!answer || currentStakeUnlocked) return;
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const feedback = purposePanel?.querySelector(".lab-stake-feedback");
            if (feedback) feedback.innerHTML = "<b>Diagnose first.</b> Identify what is at stake before choosing an action.";
        }, true);

        resetToolkitBtn?.addEventListener("click", () => {
            localStorage.removeItem(microKey);
            localStorage.removeItem(labKey);
            window.setTimeout(() => {
                updateLabPassport();
                refreshModuleGate();
            }, 0);
        });

        renderLabReasoning();
        updateLabPassport();
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
