(() => {
    const boot = () => {
        const card = document.querySelector("#guide .readiness-card");
        const result = document.getElementById("readinessResult");
        if (!card || !result) return;

        const items = [...card.querySelectorAll(".readiness-item")];
        const names = [
            "Basic AI Understanding",
            "Evaluation of AI-Generated Outputs",
            "Source Verification",
            "Academic Integrity",
            "Data Privacy",
            "Ethical Awareness",
            "Responsible AI-Supported Learning"
        ];

        const safeState = () => {
            let raw = {};
            try {
                raw = JSON.parse(localStorage.getItem("aiToolkitReadiness") || "{}");
            } catch (_) {
                raw = {};
            }

            const cleaned = {};
            for (let domain = 1; domain <= 7; domain++) {
                const value = Number(raw[domain]);
                if ([1, 2, 3].includes(value)) cleaned[domain] = value;
            }
            return cleaned;
        };

        const saveState = state => {
            localStorage.setItem("aiToolkitReadiness", JSON.stringify(state));
        };

        const formatNames = domains => {
            const labels = domains.map(domain => names[domain - 1]);
            if (labels.length <= 1) return labels[0] || "";
            if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
            return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
        };

        const syncVisuals = state => {
            items.forEach(item => {
                const domain = Number(item.dataset.readiness);
                const selectedLevel = Number(state[domain] || 0);

                item.dataset.level = selectedLevel ? String(selectedLevel) : "0";

                item.querySelectorAll("button[data-level]").forEach(button => {
                    const selected = Number(button.dataset.level) === selectedLevel;
                    button.classList.toggle("selected", selected);
                    button.classList.toggle("is-selected", selected);
                    button.setAttribute("aria-pressed", String(selected));
                });
            });
        };

        const actionButton = (label, attrs = "") =>
            `<button type="button" class="readiness-action" ${attrs}>${label}</button>`;

        const render = () => {
            const state = safeState();
            syncVisuals(state);

            const answeredDomains = Object.keys(state).map(Number).sort((a, b) => a - b);
            const answered = answeredDomains.length;
            const remaining = 7 - answered;
            const need = answeredDomains.filter(domain => state[domain] === 1);
            const sometimes = answeredDomains.filter(domain => state[domain] === 2);
            const confident = answeredDomains.filter(domain => state[domain] === 3);

            if (answered === 0) {
                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>Answer the seven statements to build a useful starting path.</strong>
                    </div>
                    <p>Choose the response that best matches you right now. This stays on this device and is not a research score.</p>
                `;
                return;
            }

            if (answered < 7) {
                const currentPriority = need.length ? need : sometimes;
                const priorityText = currentPriority.length
                    ? `<strong>Current priority:</strong> ${formatNames(currentPriority)}.`
                    : `<strong>So far:</strong> your answered areas are marked confident.`;

                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>${answered} of 7 answered · ${remaining} remaining</strong>
                    </div>
                    <p>${priorityText} Finish the remaining statement${remaining === 1 ? "" : "s"} for a complete recommendation.</p>
                    <div class="readiness-actions">
                        ${currentPriority.length ? actionButton(`Open ${names[currentPriority[0] - 1]}`, `data-readiness-open-module="${currentPriority[0]}"`) : ""}
                        ${actionButton("Reset self-check", "data-readiness-reset")}
                    </div>
                `;
                return;
            }

            if (need.length === 7) {
                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>Start with the full seven-domain learning trail.</strong>
                    </div>
                    <p>You marked <b>Need practice</b> in every area. Rather than choosing two arbitrary domains, start at Domain 1 and move through the complete trail in order.</p>
                    <div class="readiness-actions">
                        ${actionButton("Start Domain 1", 'data-readiness-open-module="1"')}
                        ${actionButton("Reset self-check", "data-readiness-reset")}
                    </div>
                `;
                return;
            }

            if (need.length > 0) {
                const visible = need.slice(0, 4);
                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>Focus first on the areas you marked “Need practice.”</strong>
                    </div>
                    <p><strong>Priority areas:</strong> ${formatNames(need)}.</p>
                    <div class="readiness-domain-actions">
                        ${visible.map(domain => actionButton(names[domain - 1], `data-readiness-open-module="${domain}"`)).join("")}
                    </div>
                    <div class="readiness-actions">
                        ${actionButton("Reset self-check", "data-readiness-reset")}
                    </div>
                `;
                return;
            }

            if (sometimes.length > 0) {
                const visible = sometimes.slice(0, 4);
                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>No area was marked “Need practice.” Review the areas you marked “Sometimes.”</strong>
                    </div>
                    <p><strong>Suggested review:</strong> ${formatNames(sometimes)}.</p>
                    <div class="readiness-domain-actions">
                        ${visible.map(domain => actionButton(names[domain - 1], `data-readiness-open-module="${domain}"`)).join("")}
                    </div>
                    <div class="readiness-actions">
                        ${actionButton("Reset self-check", "data-readiness-reset")}
                    </div>
                `;
                return;
            }

            if (confident.length === 7) {
                result.innerHTML = `
                    <div class="readiness-guide-head">
                        <span>YOUR LEARNING PATH</span>
                        <strong>You marked yourself confident across all seven areas.</strong>
                    </div>
                    <p>Use the Decision Lab to test that confidence in realistic cases, or open any domain for a deeper review.</p>
                    <div class="readiness-actions">
                        ${actionButton("Go to Decision Lab", "data-readiness-open-lab")}
                        ${actionButton("Reset self-check", "data-readiness-reset")}
                    </div>
                `;
            }
        };

        card.addEventListener("click", event => {
            const choice = event.target.closest("button[data-level]");
            if (choice) {
                // script-base updates localStorage first on the button itself; render after
                // the event finishes so the guide always reflects the newest answer.
                setTimeout(render, 0);
                return;
            }

            const reset = event.target.closest("[data-readiness-reset]");
            if (reset) {
                const state = {};
                saveState(state);
                syncVisuals(state);
                render();
                return;
            }

            const moduleAction = event.target.closest("[data-readiness-open-module]");
            if (moduleAction) {
                const domain = Number(moduleAction.dataset.readinessOpenModule);
                const moduleButton = document.querySelector(`.module-link[data-module="${domain}"]`);
                moduleButton?.click();
                return;
            }

            const labAction = event.target.closest("[data-readiness-open-lab]");
            if (labAction) {
                document.querySelector('a[href="#challenge"]')?.click();
            }
        });

        render();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
