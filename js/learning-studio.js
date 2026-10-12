(() => {
    const boot = () => {
        const content = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");
        const resetToolkitBtn = document.getElementById("resetToolkitBtn");
        if (!content || !modulePosition) return;

        const stateKey = "aiToolkitLearningStudio";
        const confidenceKey = "aiToolkitLearningConfidence";

        const lessons = {
            1: {
                activation: {
                    prompt: "Which statement feels closest to what you believe before starting?",
                    options: ["If AI sounds human, it probably understands like a human.", "AI can produce useful language without human-like understanding.", "AI is basically the same as any fixed-rule program."],
                    explanation: "A useful starting idea: AI can generate convincing outputs without possessing human goals, lived experience, or judgment."
                },
                worked: {
                    title: "Worked example · Fluent does not mean aware",
                    caseText: "A chatbot explains photosynthesis smoothly, uses scientific terms, and sounds certain.",
                    move: "Separate what you can observe—fluent language—from what you cannot assume—human-like understanding.",
                    reasoning: "The quality of the wording tells you something about output capability. It does not prove intention, awareness, or reliable factual judgment."
                },
                redFlags: [
                    ["The response says “I understand exactly how you feel.”", true],
                    ["The response gives a clear definition of a term.", false],
                    ["The student assumes confident language means the system is conscious.", true],
                    ["The student checks the explanation against the lesson.", false]
                ],
                toolCase: "You want AI to explain a difficult lesson and then create practice questions.",
                toolPrompts: ["What part can AI support?", "What must you still understand or decide yourself?", "What could the AI get wrong?"],
                toolModel: "AI may explain and generate practice. You still need to judge accuracy, connect the explanation to the lesson, and prove understanding by explaining or solving without copying the chatbot.",
                recall: "Without looking back: finish this sentence — AI capability is not the same as ________.",
                benchmark: "human understanding or human judgment"
            },
            2: {
                activation: {
                    prompt: "What makes an AI answer trustworthy?",
                    options: ["It is long and detailed.", "Its important claims survive checking.", "It uses professional formatting."],
                    explanation: "Trust should come from inspection—accuracy, relevance, completeness, logic, bias, and evidence—not from polish."
                },
                worked: {
                    title: "Worked example · Inspect the claim, not the confidence",
                    caseText: "AI says: “Studies show 82% of students learn better with AI,” but provides no traceable source.",
                    move: "Treat the percentage as an unsupported claim, then inspect evidence before using it.",
                    reasoning: "Specific numbers feel authoritative. The Six-Lens check prevents presentation quality from becoming a substitute for evidence."
                },
                redFlags: [["A precise statistic has no source.", true],["The answer directly addresses the task.", false],["The response ignores an important counterexample.", true],["The learner verifies a key claim.", false]],
                toolCase: "AI drafts a paragraph for your report with one statistic, one strong recommendation, and no sources.",
                toolPrompts: ["Which claim needs checking first?", "What context may be missing?", "Could the wording be one-sided or biased?"],
                toolModel: "Start with the statistic and recommendation because they could change the conclusion. Check evidence, missing context, logic, and possible bias before keeping any part of the draft.",
                recall: "Name three lenses you can use before trusting an AI output.",
                benchmark: "Any three of: accuracy, relevance, completeness, logic, bias, evidence"
            },
            3: {
                activation: {
                    prompt: "When does an AI-provided citation become usable evidence?",
                    options: ["When it looks academic.", "When the original source can be located and actually supports the claim.", "When the DOI has the correct format."],
                    explanation: "A citation is useful only when you can locate the source, inspect it, and confirm that it supports the exact claim."
                },
                worked: {
                    title: "Worked example · Trace before you cite",
                    caseText: "AI provides a realistic journal title, author names, and DOI. The DOI does not resolve and the article cannot be found.",
                    move: "Mark the reference unverified and search independently for the original evidence.",
                    reasoning: "Citation-shaped text is not evidence. Verification requires source existence, credibility, context, and claim-to-source matching."
                },
                redFlags: [["The DOI does not resolve.", true],["The title sounds scholarly.", false],["No independent database can locate the article.", true],["The learner opens the original source.", false]],
                toolCase: "A chatbot gives you three references for a research paragraph.",
                toolPrompts: ["Can you locate each original source?", "Who created it and when?", "Does it support the exact claim you want to make?"],
                toolModel: "Do not keep a reference just because it looks complete. Locate it, inspect author/date/context, then match the source to the sentence you intend to support.",
                recall: "What are the two minimum things you should confirm before citing an AI-provided source?",
                benchmark: "That the source exists/can be located, and that it actually supports the claim"
            },
            4: {
                activation: {
                    prompt: "What decides whether AI use is academically responsible?",
                    options: ["Whether the teacher notices.", "The task rules, learning purpose, and your own contribution.", "How much time AI saves."],
                    explanation: "Responsible academic use depends on the assignment rules and whether the learner still owns the required thinking and authorship."
                },
                worked: {
                    title: "Worked example · Support is not substitution",
                    caseText: "Your teacher allows AI brainstorming but requires the final reflection to be written independently.",
                    move: "Use AI to generate questions or angles, then close it and write the reflection from your own understanding.",
                    reasoning: "The same tool can be appropriate in one stage and inappropriate in another. The learning goal and task rules define the boundary."
                },
                redFlags: [["The learner submits text they cannot explain.", true],["AI is used to brainstorm possible topics.", false],["The learner hides prohibited AI use.", true],["The student follows the teacher's stated rule.", false]],
                toolCase: "You are allowed to use AI for planning a report but must write the analysis yourself.",
                toolPrompts: ["What can AI support?", "What must remain your own work?", "How will you make your contribution visible?"],
                toolModel: "Use AI for idea generation or organization if allowed. Do the analysis, reasoning, and final authorship yourself, and disclose assistance when required.",
                recall: "Complete the rule: AI should support the learning task without ________ the learner's required contribution.",
                benchmark: "replacing"
            },
            5: {
                activation: {
                    prompt: "What is the safest privacy habit when using AI?",
                    options: ["Share everything, then ask the AI to delete it.", "Share only what the task actually needs.", "Avoid only passwords; other personal data is fine."],
                    explanation: "Data minimization means giving the system only the information necessary for the task and protecting other people's data too."
                },
                worked: {
                    title: "Worked example · Minimize before upload",
                    caseText: "A spreadsheet contains names, grades, phone numbers, comments, and the values needed for a class summary.",
                    move: "Remove unnecessary identifiers or replace them with anonymized/synthetic values before using an AI tool.",
                    reasoning: "Educational purpose does not automatically justify exposing identifiers. Reduce the data before it leaves your control."
                },
                redFlags: [["Student names are unnecessary for the task.", true],["The file contains only synthetic example data.", false],["Phone numbers remain in an uploaded sheet.", true],["Identifiers are removed before processing.", false]],
                toolCase: "You want AI to summarize feedback collected from classmates.",
                toolPrompts: ["What information is actually necessary?", "What identifying details can be removed or generalized?", "Whose information are you responsible for protecting?"],
                toolModel: "Keep only the feedback needed for the analysis. Remove names, contact details, IDs, and unnecessary sensitive context; use grouped or synthetic data when possible.",
                recall: "What is data minimization in one sentence?",
                benchmark: "Sharing only the minimum information necessary for the task"
            },
            6: {
                activation: {
                    prompt: "Who should count when judging whether an AI use is ethical?",
                    options: ["Only the person using the tool.", "Anyone who may be affected by the use.", "Only people who complain afterward."],
                    explanation: "Ethical awareness considers affected people, consent, fairness, dignity, harm, ownership, transparency, and accountability."
                },
                worked: {
                    title: "Worked example · Ask who is affected",
                    caseText: "A student makes a realistic AI voice clone of a teacher and posts a fake announcement as a joke.",
                    move: "Consider consent, deception, reputational harm, trust, and who is accountable if others believe the fake announcement.",
                    reasoning: "Calling something a joke does not erase its effects on people who never agreed to participate."
                },
                redFlags: [["The teacher never consented to the voice clone.", true],["The audio file is small.", false],["Viewers may believe the fake announcement.", true],["The creator considers possible harm before posting.", false]],
                toolCase: "You want to create an AI-generated image using a classmate's face for a school post.",
                toolPrompts: ["Who is affected?", "Did they consent to this specific use?", "What harm, misunderstanding, or loss of control could occur?"],
                toolModel: "Ask for informed permission before using the person's likeness, explain where it will appear, consider potential harm, and avoid publishing if consent or context is unclear.",
                recall: "Name three ethical questions to ask before using AI in a way that affects another person.",
                benchmark: "Examples: Who is affected? Did they consent? What harm is possible? Who is accountable? Is it fair/transparent?"
            },
            7: {
                activation: {
                    prompt: "What is the strongest sign that AI supported your learning?",
                    options: ["You finished much faster.", "You can explain, verify, adapt, and own the final work.", "The final answer sounds advanced."],
                    explanation: "AI-supported learning should increase your capability and ownership—not merely produce a finished output."
                },
                worked: {
                    title: "Worked example · Use AI, then prove the learning stayed with you",
                    caseText: "AI explains a difficult concept and gives you a polished answer. After closing the chatbot, you cannot explain the concept yourself.",
                    move: "Return to the concept: ask for simpler explanation or practice, verify important details, then explain it independently.",
                    reasoning: "The task is not complete if the output exists but the understanding does not."
                },
                redFlags: [["You cannot explain the final answer without reopening the chatbot.", true],["You use AI to create extra practice questions.", false],["You submit wording you do not understand.", true],["You verify and rewrite after understanding the idea.", false]],
                toolCase: "You use AI to help prepare for a difficult presentation.",
                toolPrompts: ["What will AI help you do?", "How will you check the information?", "How will you prove you can perform without depending on the original AI response?"],
                toolModel: "Use AI for explanation, rehearsal, questions, or feedback. Verify key claims, then practice until you can present, answer questions, and adapt the content independently.",
                recall: "Finish the rule: useful AI should leave me more ________, not more dependent.",
                benchmark: "capable"
            }
        };

        const safeJSON = (key, fallback = {}) => {
            try {
                const parsed = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
                return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (_) { return fallback; }
        };

        const currentModule = () => {
            const match = modulePosition.textContent.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const getState = () => safeJSON(stateKey, {});
        const updateState = (module, patch) => {
            const state = getState();
            state[String(module)] = { ...(state[String(module)] || {}), ...patch };
            localStorage.setItem(stateKey, JSON.stringify(state));
        };

        const getConfidence = () => safeJSON(confidenceKey, {});
        const updateConfidence = (module, value) => {
            const state = getConfidence();
            state[String(module)] = value;
            localStorage.setItem(confidenceKey, JSON.stringify(state));
        };

        const activationHTML = (module, data, state) => `
            <section class="learning-activation" data-learning-studio="activation">
                <div class="learning-block-head"><span>BEFORE YOU BEGIN</span><strong>Make a prediction first.</strong></div>
                <p>${data.activation.prompt}</p>
                <div class="learning-choice-row">
                    ${data.activation.options.map((option, i) => `<button type="button" data-learning-activation="${i}" class="${state.activation === i ? "is-selected" : ""}">${option}</button>`).join("")}
                </div>
                <div class="learning-inline-feedback" ${state.activation === undefined ? "hidden" : ""}>${data.activation.explanation}</div>
            </section>
        `;

        const workedHTML = data => `
            <section class="worked-example" data-learning-studio="worked">
                <div class="learning-block-head"><span>WORKED EXAMPLE</span><strong>${data.worked.title.replace("Worked example · ", "")}</strong></div>
                <div class="worked-example-case"><span>SITUATION</span><p>${data.worked.caseText}</p></div>
                <button type="button" class="worked-reveal" data-worked-reveal>Reveal the reasoning <span>↓</span></button>
                <div class="worked-reasoning" hidden>
                    <article><span>BEST MOVE</span><p>${data.worked.move}</p></article>
                    <article><span>WHY</span><p>${data.worked.reasoning}</p></article>
                </div>
            </section>
        `;

        const redFlagsHTML = (module, data, state) => `
            <section class="red-flag-lab" data-learning-studio="redflags">
                <div class="learning-block-head"><span>SPOT THE RED FLAG</span><strong>Which details should make you pause?</strong></div>
                <p>Select every detail that signals a problem, then check your reasoning.</p>
                <div class="red-flag-options">
                    ${data.redFlags.map(([text], i) => `<button type="button" data-redflag="${i}" class="${(state.redFlags || []).includes(i) ? "is-selected" : ""}"><span>${i + 1}</span>${text}</button>`).join("")}
                </div>
                <button type="button" class="red-flag-check" data-redflag-check>Check the flags</button>
                <div class="learning-inline-feedback red-flag-feedback" hidden></div>
            </section>
        `;

        const toolBenchHTML = (module, data, state) => `
            <section class="tool-bench" data-learning-studio="toolbench">
                <div class="learning-block-head"><span>TOOL BENCH</span><strong>Use the domain tool on a fresh situation.</strong></div>
                <div class="tool-bench-case"><span>MINI CASE</span><p>${data.toolCase}</p></div>
                <div class="tool-bench-prompts">
                    ${data.toolPrompts.map((prompt, i) => `<label><span>${String(i + 1).padStart(2, "0")}</span><div><strong>${prompt}</strong><textarea rows="2" data-toolbench-answer="${i}" placeholder="Write your reasoning...">${state.toolAnswers?.[i] || ""}</textarea></div></label>`).join("")}
                </div>
                <button type="button" class="tool-model-toggle" data-tool-model>Compare with a model approach</button>
                <div class="tool-model" hidden><span>MODEL APPROACH</span><p>${data.toolModel}</p><small>Compare the reasoning, not the exact wording. Your answer can be different and still be strong.</small></div>
            </section>
        `;

        const confidenceHTML = (module, state) => {
            const value = getConfidence()[String(module)] || "";
            return `
                <section class="confidence-check" data-learning-studio="confidence">
                    <div class="learning-block-head"><span>CONFIDENCE CHECK</span><strong>Could you explain this skill without the toolkit?</strong></div>
                    <div class="confidence-options">
                        <button type="button" data-confidence="review" class="${value === "review" ? "is-selected" : ""}">I need another pass</button>
                        <button type="button" data-confidence="almost" class="${value === "almost" ? "is-selected" : ""}">Almost</button>
                        <button type="button" data-confidence="ready" class="${value === "ready" ? "is-selected" : ""}">Yes, I can explain it</button>
                    </div>
                    <div class="confidence-action" ${value ? "" : "hidden"}>
                        ${value === "review" ? '<button type="button" data-review-learn>Review the Learn step →</button><p>Use the worked example again, then retry the checkpoint.</p>' : value === "almost" ? '<p>Good. Before leaving, explain the rule in one sentence without copying the lesson.</p>' : value === "ready" ? '<p>Great. The next test is transfer: can you use the same principle in a different situation?</p>' : ""}
                    </div>
                </section>
            `;
        };

        const recallHTML = (module, data, state) => `
            <section class="retrieval-recap" data-learning-studio="recall">
                <div class="learning-block-head"><span>RETRIEVAL RECAP</span><strong>Recall before you reveal.</strong></div>
                <p>${data.recall}</p>
                <textarea rows="3" data-recall-answer placeholder="Answer from memory first...">${state.recall || ""}</textarea>
                <div class="retrieval-actions">
                    <button type="button" data-recall-model>Reveal benchmark</button>
                    <span>Your wording does not need to match exactly.</span>
                </div>
                <div class="retrieval-model" hidden><span>BENCHMARK IDEA</span><strong>${data.benchmark}</strong></div>
            </section>
        `;

        const enhance = () => {
            const deck = content.querySelector(":scope > .module-slide-deck");
            const module = currentModule();
            const data = lessons[module];
            if (!deck || !data) return;
            if (deck.dataset.learningStudio === String(module)) return;

            const state = getState()[String(module)] || {};
            const slide = key => deck.querySelector(`.module-slide[data-slide="${key}"]`);

            const objectives = slide("objectives")?.querySelector(".lesson-section");
            if (objectives && !slide("objectives").querySelector('[data-learning-studio="activation"]')) {
                objectives.insertAdjacentHTML("afterbegin", activationHTML(module, data, state));
            }

            const learn = slide("learn")?.querySelector(".lesson-section");
            const learnCheckpoint = slide("learn")?.querySelector(".purpose-checkpoint");
            if (learn && !slide("learn").querySelector('[data-learning-studio="worked"]')) {
                learnCheckpoint?.insertAdjacentHTML("beforebegin", workedHTML(data));
            }

            const look = slide("look")?.querySelector(".lesson-section");
            const lookCheckpoint = slide("look")?.querySelector(".purpose-checkpoint");
            if (look && !slide("look").querySelector('[data-learning-studio="redflags"]')) {
                lookCheckpoint?.insertAdjacentHTML("beforebegin", redFlagsHTML(module, data, state));
            }

            const trySlide = slide("try")?.querySelector(".lesson-section");
            if (trySlide && !slide("try").querySelector('[data-learning-studio="toolbench"]')) {
                trySlide.insertAdjacentHTML("beforeend", toolBenchHTML(module, data, state));
            }

            const check = slide("check")?.querySelector(".lesson-section");
            if (check && !slide("check").querySelector('[data-learning-studio="confidence"]')) {
                check.insertAdjacentHTML("beforeend", confidenceHTML(module, state));
            }

            const takeaway = slide("takeaway")?.querySelector(".lesson-section");
            if (takeaway && !slide("takeaway").querySelector('[data-learning-studio="recall"]')) {
                takeaway.insertAdjacentHTML("afterbegin", recallHTML(module, data, state));
            }

            deck.dataset.learningStudio = String(module);
        };

        content.addEventListener("click", event => {
            const module = currentModule();
            const data = lessons[module];
            if (!data) return;

            const activation = event.target.closest("[data-learning-activation]");
            if (activation) {
                const index = Number(activation.dataset.learningActivation);
                updateState(module, { activation: index });
                const box = activation.closest(".learning-activation");
                box?.querySelectorAll("[data-learning-activation]").forEach(btn => btn.classList.toggle("is-selected", btn === activation));
                const feedback = box?.querySelector(".learning-inline-feedback");
                if (feedback) { feedback.hidden = false; feedback.textContent = data.activation.explanation; }
                return;
            }

            const reveal = event.target.closest("[data-worked-reveal]");
            if (reveal) {
                const reasoning = reveal.closest(".worked-example")?.querySelector(".worked-reasoning");
                if (reasoning) {
                    reasoning.hidden = !reasoning.hidden;
                    reveal.innerHTML = reasoning.hidden ? 'Reveal the reasoning <span>↓</span>' : 'Hide reasoning <span>↑</span>';
                }
                return;
            }

            const flag = event.target.closest("[data-redflag]");
            if (flag) {
                flag.classList.toggle("is-selected");
                const selected = [...flag.closest(".red-flag-options").querySelectorAll("[data-redflag].is-selected")].map(btn => Number(btn.dataset.redflag));
                updateState(module, { redFlags: selected });
                return;
            }

            const checkFlags = event.target.closest("[data-redflag-check]");
            if (checkFlags) {
                const box = checkFlags.closest(".red-flag-lab");
                const selected = [...box.querySelectorAll("[data-redflag].is-selected")].map(btn => Number(btn.dataset.redflag));
                const correct = data.redFlags.map(([_, risky], i) => risky ? i : null).filter(i => i !== null);
                const exact = selected.length === correct.length && correct.every(i => selected.includes(i));
                box.querySelectorAll("[data-redflag]").forEach(btn => {
                    const i = Number(btn.dataset.redflag);
                    btn.classList.toggle("is-correct", correct.includes(i));
                    btn.classList.toggle("is-wrong", selected.includes(i) && !correct.includes(i));
                });
                const feedback = box.querySelector(".red-flag-feedback");
                if (feedback) {
                    feedback.hidden = false;
                    feedback.innerHTML = exact ? "<b>Good catch.</b> You identified the details that should trigger extra scrutiny." : "<b>Look again.</b> Red flags are details that increase risk or weaken trust—not simply anything that mentions AI.";
                }
                updateState(module, { redFlags: selected, redFlagsChecked: true });
                return;
            }

            const model = event.target.closest("[data-tool-model]");
            if (model) {
                const panel = model.closest(".tool-bench")?.querySelector(".tool-model");
                if (panel) { panel.hidden = !panel.hidden; model.textContent = panel.hidden ? "Compare with a model approach" : "Hide model approach"; }
                return;
            }

            const confidence = event.target.closest("[data-confidence]");
            if (confidence) {
                const value = confidence.dataset.confidence;
                updateConfidence(module, value);
                const box = confidence.closest(".confidence-check");
                box.querySelectorAll("[data-confidence]").forEach(btn => btn.classList.toggle("is-selected", btn === confidence));
                const action = box.querySelector(".confidence-action");
                if (action) {
                    action.hidden = false;
                    action.innerHTML = value === "review" ? '<button type="button" data-review-learn>Review the Learn step →</button><p>Use the worked example again, then retry the checkpoint.</p>' : value === "almost" ? '<p>Good. Before leaving, explain the rule in one sentence without copying the lesson.</p>' : '<p>Great. The next test is transfer: can you use the same principle in a different situation?</p>';
                }
                return;
            }

            const review = event.target.closest("[data-review-learn]");
            if (review) {
                content.querySelector('.module-slide-dot[data-slide-index="1"]')?.click();
                return;
            }

            const recallModel = event.target.closest("[data-recall-model]");
            if (recallModel) {
                const panel = recallModel.closest(".retrieval-recap")?.querySelector(".retrieval-model");
                if (panel) panel.hidden = !panel.hidden;
            }
        });

        content.addEventListener("input", event => {
            const module = currentModule();
            if (!module) return;

            const toolAnswer = event.target.closest("[data-toolbench-answer]");
            if (toolAnswer) {
                const state = getState()[String(module)] || {};
                const answers = { ...(state.toolAnswers || {}) };
                answers[toolAnswer.dataset.toolbenchAnswer] = toolAnswer.value;
                updateState(module, { toolAnswers: answers });
                return;
            }

            const recall = event.target.closest("[data-recall-answer]");
            if (recall) updateState(module, { recall: recall.value });
        });

        const observer = new MutationObserver(() => window.requestAnimationFrame(enhance));
        observer.observe(content, { childList: true, subtree: true });
        enhance();

        resetToolkitBtn?.addEventListener("click", () => {
            localStorage.removeItem(stateKey);
            localStorage.removeItem(confidenceKey);
        });
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
