(() => {
    const boot = () => {
        const content = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");
        if (!content || !modulePosition) return;

        const storageKey = "aiToolkitReusableTools";
        let buildTimer = null;

        const safeJSON = (key, fallback = {}) => {
            try {
                const value = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
                return value && typeof value === "object" ? value : fallback;
            } catch (_) { return fallback; }
        };

        const currentModule = () => {
            const match = modulePosition.textContent.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const getState = number => safeJSON(storageKey, {})[String(number)] || {};
        const setState = (number, patch) => {
            const all = safeJSON(storageKey, {});
            all[String(number)] = { ...(all[String(number)] || {}), ...patch };
            localStorage.setItem(storageKey, JSON.stringify(all));
            return all[String(number)];
        };

        const esc = value => String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");

        const markPracticeComplete = (tool, number) => {
            setState(number, { completed: true, completedAt: Date.now() });

            // Preserve the original module completion system by completing its
            // hidden checklist only after the learner finishes the real tool.
            tool.querySelectorAll(".interactive-checklist .check-item").forEach(button => {
                if (!button.classList.contains("checked")) button.click();
            });

            const badge = tool.querySelector(".tool-lab-complete");
            if (badge) {
                badge.hidden = false;
                badge.textContent = "✓ Practice tool completed — your result is saved on this device.";
            }
        };

        const commonShell = (number, title, lead, body) => `
            <section class="real-tool-lab" data-real-tool="${number}">
                <div class="real-tool-head">
                    <div>
                        <span>APPLY THE TOOL</span>
                        <h4>${title}</h4>
                    </div>
                    <em>Do → explain → get a result</em>
                </div>
                <p class="real-tool-lead">${lead}</p>
                ${body}
                <div class="tool-lab-complete" ${getState(number).completed ? "" : "hidden"}>✓ Practice tool completed — your result is saved on this device.</div>
            </section>
        `;

        const render1 = tool => {
            const number = 1;
            const state = getState(number);
            const cases = [
                { name: "A basic calculator app", detail: "It follows fixed arithmetic rules for the numbers you enter.", expected: "rule", why: "The core behavior follows explicit mathematical rules rather than learning patterns from data." },
                { name: "A video recommendation feed", detail: "It predicts which videos you may watch based on patterns in viewing behavior.", expected: "ai", why: "Recommendation systems commonly use learned patterns to predict or rank content for users." },
                { name: "A new school app with no technical information", detail: "It claims to be ‘smart,’ but you only know that it sorts reminders.", expected: "uncertain", why: "A marketing label is not enough evidence. Without knowing how the sorting works, uncertainty is the responsible classification." }
            ];
            const selectedCase = Number.isInteger(state.caseIndex) ? state.caseIndex : 0;
            const item = cases[selectedCase];
            tool.insertAdjacentHTML("beforeend", commonShell(number, "AI or Algorithm?", "Classify an actual system, then defend the classification with evidence. The goal is not guessing the label—it is explaining what the system appears to do.", `
                <div class="tool-case-picker">
                    ${cases.map((c, i) => `<button type="button" data-tool-case="${i}" class="${i === selectedCase ? "is-active" : ""}">${c.name}</button>`).join("")}
                </div>
                <div class="tool-case-card"><span>SYSTEM TO INSPECT</span><strong>${item.name}</strong><p>${item.detail}</p></div>
                <div class="tool-question"><span>1 · CLASSIFY</span><strong>Which label is best supported by the evidence?</strong></div>
                <div class="tool-choice-grid">
                    <button type="button" data-tool-class="ai" class="${state.classification === "ai" ? "is-selected" : ""}">AI-enabled</button>
                    <button type="button" data-tool-class="rule" class="${state.classification === "rule" ? "is-selected" : ""}">Rule-based</button>
                    <button type="button" data-tool-class="uncertain" class="${state.classification === "uncertain" ? "is-selected" : ""}">Uncertain</button>
                </div>
                <label class="tool-reasoning"><span>2 · EVIDENCE</span><strong>What detail made you choose that label?</strong><textarea rows="3" data-tool-reason placeholder="Explain the evidence, not just the label...">${esc(state.reason || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="1">Analyze my classification</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));

            const lab = tool.querySelector('[data-real-tool="1"]');
            lab.addEventListener("click", event => {
                const caseBtn = event.target.closest("[data-tool-case]");
                if (caseBtn) {
                    setState(number, { caseIndex: Number(caseBtn.dataset.toolCase), classification: "", reason: "", result: "", completed: false });
                    rebuildTool(tool);
                    return;
                }
                const classBtn = event.target.closest("[data-tool-class]");
                if (classBtn) {
                    setState(number, { classification: classBtn.dataset.toolClass });
                    lab.querySelectorAll("[data-tool-class]").forEach(btn => btn.classList.toggle("is-selected", btn === classBtn));
                    return;
                }
                if (event.target.closest('[data-tool-run="1"]')) {
                    const s = getState(number);
                    const reason = lab.querySelector("[data-tool-reason]").value.trim();
                    if (!s.classification || reason.length < 12) return showPrompt(lab, "Choose a classification and explain your evidence in at least a short sentence.");
                    const correct = s.classification === item.expected;
                    const result = `<div class="result-grade ${correct ? "good" : "review"}"><span>${correct ? "WELL SUPPORTED" : "RECONSIDER THE LABEL"}</span><strong>${correct ? "Your classification fits the available evidence." : "Your reasoning needs one more check."}</strong></div><p><b>Model reasoning:</b> ${item.why}</p><p><b>Your evidence:</b> ${esc(reason)}</p>`;
                    setState(number, { reason, result });
                    const resultBox = lab.querySelector("[data-tool-result]");
                    resultBox.innerHTML = result;
                    resultBox.hidden = false;
                    markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-tool-reason]").addEventListener("input", e => setState(number, { reason: e.target.value }));
        };

        const render2 = tool => {
            const number = 2;
            const state = getState(number);
            const lenses = ["Accuracy", "Relevance", "Completeness", "Logic", "Bias", "Evidence"];
            const selections = state.lenses || {};
            tool.insertAdjacentHTML("beforeend", commonShell(number, "Six-Lens Output Check", "Inspect one AI answer from six angles and generate a trust recommendation. You are evaluating evidence, not collecting green ticks.", `
                <div class="tool-case-card"><span>AI OUTPUT</span><p>“Using AI always improves student learning. A recent study found an 82% improvement, so schools should require AI for every assignment.” No source is provided.</p></div>
                <div class="lens-grid">
                    ${lenses.map(lens => `<div class="lens-row" data-lens="${lens}"><strong>${lens}</strong><div><button type="button" data-lens-value="pass" class="${selections[lens] === "pass" ? "is-selected" : ""}">Looks okay</button><button type="button" data-lens-value="check" class="${selections[lens] === "check" ? "is-selected" : ""}">Needs checking</button><button type="button" data-lens-value="problem" class="${selections[lens] === "problem" ? "is-selected" : ""}">Problem</button></div></div>`).join("")}
                </div>
                <label class="tool-reasoning"><span>EVIDENCE NOTE</span><strong>Which part of the answer most affects whether you would use it?</strong><textarea rows="3" data-lens-note>${esc(state.note || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="2">Generate trust recommendation</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const lab = tool.querySelector('[data-real-tool="2"]');
            lab.addEventListener("click", event => {
                const btn = event.target.closest("[data-lens-value]");
                if (btn) {
                    const row = btn.closest("[data-lens]");
                    const next = { ...(getState(number).lenses || {}), [row.dataset.lens]: btn.dataset.lensValue };
                    setState(number, { lenses: next });
                    row.querySelectorAll("[data-lens-value]").forEach(b => b.classList.toggle("is-selected", b === btn));
                    return;
                }
                if (event.target.closest('[data-tool-run="2"]')) {
                    const s = getState(number);
                    const note = lab.querySelector("[data-lens-note]").value.trim();
                    if (Object.keys(s.lenses || {}).length !== 6 || note.length < 12) return showPrompt(lab, "Rate all six lenses and write one evidence note first.");
                    const problems = Object.values(s.lenses).filter(v => v === "problem").length;
                    const checks = Object.values(s.lenses).filter(v => v === "check").length;
                    const verdict = problems ? "DO NOT USE YET" : checks ? "USE ONLY AFTER CHECKING" : "LOWER CONCERN — STILL VERIFY IMPORTANT CLAIMS";
                    const result = `<div class="result-grade ${problems ? "review" : "good"}"><span>TRUST RECOMMENDATION</span><strong>${verdict}</strong></div><p>You marked <b>${problems}</b> problem(s) and <b>${checks}</b> item(s) needing checking. The unsupported “82% improvement” claim should be verified before use.</p><p><b>Your priority note:</b> ${esc(note)}</p>`;
                    setState(number, { note, result });
                    lab.querySelector("[data-tool-result]").innerHTML = result;
                    lab.querySelector("[data-tool-result]").hidden = false;
                    markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-lens-note]").addEventListener("input", e => setState(number, { note: e.target.value }));
        };

        const render3 = tool => {
            const number = 3;
            const state = getState(number);
            const steps = ["I can locate the original source.", "I can identify the author or organization.", "I can check the publication date/context.", "The source actually supports the exact claim.", "I can corroborate the important claim elsewhere if needed."];
            const answers = state.verify || {};
            tool.insertAdjacentHTML("beforeend", commonShell(number, "VERIFY", "Decide whether an AI-provided source is actually ready to cite. A reference is not verified just because it looks complete.", `
                <div class="tool-case-card"><span>SOURCE PROVIDED BY AI</span><strong>“Digital Learning Review (2025), Santos et al., DOI: 10.9999/dlr.2025.441”</strong><p>You search the DOI and title but cannot find a matching article.</p></div>
                <div class="verify-grid">${steps.map((step, i) => `<div class="verify-row" data-verify="${i}"><strong>${step}</strong><div><button type="button" data-verify-value="yes" class="${answers[i] === "yes" ? "is-selected" : ""}">Yes</button><button type="button" data-verify-value="no" class="${answers[i] === "no" ? "is-selected" : ""}">No</button><button type="button" data-verify-value="unclear" class="${answers[i] === "unclear" ? "is-selected" : ""}">Unclear</button></div></div>`).join("")}</div>
                <label class="tool-reasoning"><span>SOURCE NOTE</span><strong>What would you do next with this citation?</strong><textarea rows="3" data-verify-note>${esc(state.note || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="3">Decide if it is ready to cite</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const lab = tool.querySelector('[data-real-tool="3"]');
            lab.addEventListener("click", event => {
                const btn = event.target.closest("[data-verify-value]");
                if (btn) {
                    const row = btn.closest("[data-verify]");
                    const next = { ...(getState(number).verify || {}), [row.dataset.verify]: btn.dataset.verifyValue };
                    setState(number, { verify: next });
                    row.querySelectorAll("[data-verify-value]").forEach(b => b.classList.toggle("is-selected", b === btn));
                    return;
                }
                if (event.target.closest('[data-tool-run="3"]')) {
                    const s = getState(number);
                    const note = lab.querySelector("[data-verify-note]").value.trim();
                    if (Object.keys(s.verify || {}).length !== 5 || note.length < 12) return showPrompt(lab, "Complete all VERIFY decisions and explain your next step.");
                    const blockers = Object.values(s.verify).filter(v => v !== "yes").length;
                    const verdict = blockers ? "NOT READY TO CITE" : "READY FOR CAREFUL USE";
                    const result = `<div class="result-grade ${blockers ? "review" : "good"}"><span>VERIFY VERDICT</span><strong>${verdict}</strong></div><p>${blockers ? `${blockers} verification condition(s) are unresolved. Do not cite the source until you can locate and inspect evidence that supports the claim.` : "The basic verification checks are satisfied. You should still represent the source accurately and in context."}</p><p><b>Your next step:</b> ${esc(note)}</p>`;
                    setState(number, { note, result });
                    lab.querySelector("[data-tool-result]").innerHTML = result;
                    lab.querySelector("[data-tool-result]").hidden = false;
                    markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-verify-note]").addEventListener("input", e => setState(number, { note: e.target.value }));
        };

        const render4 = tool => {
            const number = 4;
            const state = getState(number);
            const scenarios = [
                "AI suggests possible report topics; you choose one and do the research yourself.",
                "AI writes the final individual reflection that your teacher said must be your own work.",
                "AI reorganizes your own notes after you have already written the ideas, and the teacher allows editing support."
            ];
            const selected = Number.isInteger(state.caseIndex) ? state.caseIndex : 0;
            tool.insertAdjacentHTML("beforeend", commonShell(number, "AI Assistance Spectrum", "Place an AI use on the spectrum, then explain whether it supports learning or replaces a required contribution.", `
                <div class="tool-case-picker">${scenarios.map((s, i) => `<button type="button" data-integrity-case="${i}" class="${i === selected ? "is-active" : ""}">Case ${i + 1}</button>`).join("")}</div>
                <div class="tool-case-card"><span>SCHOOLWORK CASE</span><p>${scenarios[selected]}</p></div>
                <div class="tool-choice-grid"><button type="button" data-spectrum="support" class="${state.spectrum === "support" ? "is-selected" : ""}">Supports learning</button><button type="button" data-spectrum="caution" class="${state.spectrum === "caution" ? "is-selected" : ""}">Needs caution / check rules</button><button type="button" data-spectrum="replace" class="${state.spectrum === "replace" ? "is-selected" : ""}">Replaces required work</button></div>
                <label class="tool-reasoning"><span>JUSTIFY</span><strong>What task rule or learning purpose supports your decision?</strong><textarea rows="3" data-spectrum-note>${esc(state.note || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="4">Evaluate this AI use</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const expected = ["support", "replace", "support"][selected];
            const lab = tool.querySelector('[data-real-tool="4"]');
            lab.addEventListener("click", event => {
                const caseBtn = event.target.closest("[data-integrity-case]");
                if (caseBtn) { setState(number, { caseIndex: Number(caseBtn.dataset.integrityCase), spectrum: "", note: "", result: "", completed: false }); rebuildTool(tool); return; }
                const btn = event.target.closest("[data-spectrum]");
                if (btn) { setState(number, { spectrum: btn.dataset.spectrum }); lab.querySelectorAll("[data-spectrum]").forEach(b => b.classList.toggle("is-selected", b === btn)); return; }
                if (event.target.closest('[data-tool-run="4"]')) {
                    const s = getState(number); const note = lab.querySelector("[data-spectrum-note]").value.trim();
                    if (!s.spectrum || note.length < 12) return showPrompt(lab, "Place the case on the spectrum and justify it using the task rules or learning purpose.");
                    const match = s.spectrum === expected;
                    const result = `<div class="result-grade ${match ? "good" : "review"}"><span>ASSISTANCE SPECTRUM</span><strong>${match ? "Your placement fits the case." : "Review the task boundary."}</strong></div><p>The key question is whether AI supports an allowed part of the process or substitutes for work the learner is expected to produce and understand.</p><p><b>Your reasoning:</b> ${esc(note)}</p>`;
                    setState(number, { note, result }); lab.querySelector("[data-tool-result]").innerHTML = result; lab.querySelector("[data-tool-result]").hidden = false; markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-spectrum-note]").addEventListener("input", e => setState(number, { note: e.target.value }));
        };

        const render5 = tool => {
            const number = 5;
            const state = getState(number);
            const sample = state.prompt || "Summarize the performance of student Maria Santos, ID 2026-01452, phone 0917-555-1234, email maria.santos@example.com. Her grade is 78 and the teacher noted a family concern.";
            tool.insertAdjacentHTML("beforeend", commonShell(number, "Prompt Privacy Scanner", "Paste or edit a prompt. The scanner runs only in this browser and flags patterns that may expose unnecessary personal information. Then rewrite the prompt more safely.", `
                <label class="tool-reasoning"><span>ORIGINAL PROMPT</span><textarea rows="5" data-privacy-prompt>${esc(sample)}</textarea></label>
                <button type="button" class="tool-run" data-privacy-scan>Scan this prompt</button>
                <div class="privacy-flags" data-privacy-flags ${state.scanned ? "" : "hidden"}></div>
                <label class="tool-reasoning"><span>SAFER VERSION</span><strong>Rewrite the prompt using only the information the task truly needs.</strong><textarea rows="4" data-privacy-safe placeholder="Example: Summarize these anonymized performance values and identify general patterns...">${esc(state.safe || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="5">Save safer prompt + finish scan</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const lab = tool.querySelector('[data-real-tool="5"]');
            const scan = () => {
                const text = lab.querySelector("[data-privacy-prompt]").value;
                const flags = [];
                if (/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/.test(text)) flags.push("possible full name");
                if (/\b(?:\+?63|0)9\d{2}[-\s]?\d{3}[-\s]?\d{4}\b/.test(text)) flags.push("phone number");
                if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) flags.push("email address");
                if (/\b(?:student\s*)?id\s*[:#-]?\s*[A-Z0-9-]{5,}/i.test(text)) flags.push("student/record ID");
                if (/\bgrade\b|\bscore\b|\bmedical\b|\bfamily\b|\baddress\b|\bbirthday\b/i.test(text)) flags.push("potentially sensitive context");
                const box = lab.querySelector("[data-privacy-flags]");
                box.innerHTML = flags.length ? `<span>SCAN FOUND</span><strong>${flags.length} possible privacy risk${flags.length > 1 ? "s" : ""}</strong><div>${flags.map(flag => `<em>${flag}</em>`).join("")}</div><p>Flagged text is not automatically prohibited. Ask whether each detail is necessary for the task and whether you have the right to share it.</p>` : `<span>SCAN FOUND</span><strong>No obvious patterns detected</strong><p>This scanner is only a reminder. It cannot guarantee that a prompt is safe or identify every kind of personal data.</p>`;
                box.hidden = false;
                setState(number, { prompt: text, scanned: true, flags });
            };
            lab.addEventListener("click", event => {
                if (event.target.closest("[data-privacy-scan]")) { scan(); return; }
                if (event.target.closest('[data-tool-run="5"]')) {
                    const s = getState(number); const safe = lab.querySelector("[data-privacy-safe]").value.trim();
                    if (!s.scanned || safe.length < 18) return showPrompt(lab, "Scan the original prompt first, then write a safer version that removes or generalizes unnecessary details.");
                    const result = `<div class="result-grade good"><span>PRIVACY PAUSE COMPLETE</span><strong>You reduced the prompt before sharing.</strong></div><p><b>Safer version:</b> ${esc(safe)}</p><p>Before using it, still check the AI tool's privacy terms and your school/teacher rules for the data involved.</p>`;
                    setState(number, { safe, result }); lab.querySelector("[data-tool-result]").innerHTML = result; lab.querySelector("[data-tool-result]").hidden = false; markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-privacy-prompt]").addEventListener("input", e => setState(number, { prompt: e.target.value, scanned: false, result: "" }));
            lab.querySelector("[data-privacy-safe]").addEventListener("input", e => setState(number, { safe: e.target.value }));
            if (state.scanned) scan();
        };

        const render6 = tool => {
            const number = 6;
            const state = getState(number);
            const field = (key, label, options) => `<div class="ethics-row" data-ethics-row="${key}"><strong>${label}</strong><div>${options.map(v => `<button type="button" data-ethics-value="${v}" class="${state[key] === v ? "is-selected" : ""}">${v}</button>`).join("")}</div></div>`;
            tool.insertAdjacentHTML("beforeend", commonShell(number, "Ethics Court", "Issue a verdict only after considering consent, affected people, harm, and accountability.", `
                <div class="tool-case-card"><span>CASE FILE</span><p>A student wants to generate a realistic image using a classmate's face and post it on the school's public social page without asking first.</p></div>
                <div class="ethics-grid">
                    ${field("consent", "Consent for this specific use", ["Yes", "No", "Unclear"])}
                    ${field("harm", "Possible harm or loss of control", ["Low", "Medium", "High"])}
                    ${field("verdict", "Your verdict", ["Allow", "Revise", "Do not use"])}
                </div>
                <label class="tool-reasoning"><span>AFFECTED PEOPLE</span><strong>Who could be affected, and how?</strong><textarea rows="3" data-ethics-people>${esc(state.people || "")}</textarea></label>
                <label class="tool-reasoning"><span>ACCOUNTABILITY</span><strong>Who should be responsible if harm occurs?</strong><textarea rows="3" data-ethics-account>${esc(state.account || "")}</textarea></label>
                <button type="button" class="tool-run" data-tool-run="6">Issue ethical verdict</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const lab = tool.querySelector('[data-real-tool="6"]');
            lab.addEventListener("click", event => {
                const btn = event.target.closest("[data-ethics-value]");
                if (btn) { const row = btn.closest("[data-ethics-row]"); setState(number, { [row.dataset.ethicsRow]: btn.dataset.ethicsValue }); row.querySelectorAll("[data-ethics-value]").forEach(b => b.classList.toggle("is-selected", b === btn)); return; }
                if (event.target.closest('[data-tool-run="6"]')) {
                    const s = getState(number); const people = lab.querySelector("[data-ethics-people]").value.trim(); const account = lab.querySelector("[data-ethics-account]").value.trim();
                    if (!s.consent || !s.harm || !s.verdict || people.length < 12 || account.length < 8) return showPrompt(lab, "Consider consent, harm, a verdict, affected people, and accountability before issuing a decision.");
                    const concern = s.consent !== "Yes" || s.harm === "High" || s.verdict !== "Allow";
                    const result = `<div class="result-grade ${concern ? "review" : "good"}"><span>ETHICS COURT VERDICT</span><strong>${esc(s.verdict)}</strong></div><p><b>Consent:</b> ${esc(s.consent)} · <b>Harm:</b> ${esc(s.harm)}</p><p><b>Affected:</b> ${esc(people)}</p><p><b>Accountability:</b> ${esc(account)}</p><p>For this case, using a person's likeness publicly without consent should trigger revision or non-use. Technical ability does not remove responsibility.</p>`;
                    setState(number, { people, account, result }); lab.querySelector("[data-tool-result]").innerHTML = result; lab.querySelector("[data-tool-result]").hidden = false; markPracticeComplete(tool, number);
                }
            });
            lab.querySelector("[data-ethics-people]").addEventListener("input", e => setState(number, { people: e.target.value }));
            lab.querySelector("[data-ethics-account]").addEventListener("input", e => setState(number, { account: e.target.value }));
        };

        const render7 = tool => {
            const number = 7;
            const state = getState(number);
            const steps = [
                ["ask", "ASK", "What is the learning goal—not just the task to finish?"],
                ["think", "THINK", "What do you already know or need to attempt yourself first?"],
                ["check", "CHECK", "What parts of the AI response need inspection?"],
                ["verify", "VERIFY", "Which important claims or sources will you independently verify?"],
                ["improve", "IMPROVE", "How will you revise, practice, or strengthen the output?"],
                ["own", "OWN", "How will you prove the final understanding/work is yours?"]
            ];
            tool.insertAdjacentHTML("beforeend", commonShell(number, "AI WISE Learning Routine", "Build a reusable plan for a real school task. The routine should leave you more capable, not just finished faster.", `
                <label class="tool-reasoning"><span>MY SCHOOL TASK</span><textarea rows="3" data-wise-task placeholder="Example: Prepare a five-minute presentation about climate adaptation...">${esc(state.task || "")}</textarea></label>
                <div class="wise-grid">${steps.map(([key, label, prompt]) => `<label><span>${label}</span><strong>${prompt}</strong><textarea rows="2" data-wise="${key}">${esc(state[key] || "")}</textarea></label>`).join("")}</div>
                <button type="button" class="tool-run" data-tool-run="7">Build my AI WISE plan</button>
                <div class="tool-result" data-tool-result ${state.result ? "" : "hidden"}>${state.result || ""}</div>
            `));
            const lab = tool.querySelector('[data-real-tool="7"]');
            lab.addEventListener("input", event => {
                if (event.target.matches("[data-wise-task]")) setState(number, { task: event.target.value });
                if (event.target.matches("[data-wise]")) setState(number, { [event.target.dataset.wise]: event.target.value });
            });
            lab.addEventListener("click", event => {
                if (!event.target.closest('[data-tool-run="7"]')) return;
                const s = getState(number);
                const values = steps.map(([key]) => (s[key] || "").trim());
                if ((s.task || "").trim().length < 12 || values.some(v => v.length < 8)) return showPrompt(lab, "Describe your task and complete each AI WISE step with a short, specific plan.");
                const result = `<div class="result-grade good"><span>AI WISE PLAN READY</span><strong>${esc(s.task.trim())}</strong></div><ol class="wise-result">${steps.map(([key, label]) => `<li><b>${label}</b><span>${esc(s[key].trim())}</span></li>`).join("")}</ol><p>Your plan is saved locally. Reuse this routine on another task by editing the fields.</p>`;
                setState(number, { result }); lab.querySelector("[data-tool-result]").innerHTML = result; lab.querySelector("[data-tool-result]").hidden = false; markPracticeComplete(tool, number);
            });
        };

        const renderers = { 1: render1, 2: render2, 3: render3, 4: render4, 5: render5, 6: render6, 7: render7 };

        function showPrompt(lab, message) {
            let box = lab.querySelector(".tool-inline-warning");
            if (!box) { box = document.createElement("div"); box.className = "tool-inline-warning"; box.setAttribute("role", "status"); lab.append(box); }
            box.textContent = message;
            box.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }

        function rebuildTool(tool) {
            tool.querySelector(".real-tool-lab")?.remove();
            const number = currentModule();
            renderers[number]?.(tool);
        }

        const enhance = () => {
            const number = currentModule();
            const tool = content.querySelector(".module-tool");
            if (!number || !tool || tool.dataset.realToolReady === String(number)) return;
            tool.dataset.realToolReady = String(number);
            tool.querySelector(".interactive-checklist")?.classList.add("legacy-checklist-hidden");
            renderers[number]?.(tool);
        };

        const observer = new MutationObserver(() => {
            clearTimeout(buildTimer);
            buildTimer = setTimeout(enhance, 80);
        });
        observer.observe(content, { childList: true, subtree: true });
        enhance();

    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();

