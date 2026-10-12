(() => {
    const boot = () => {
        const content = document.getElementById("moduleLessonContent");
        const modulePosition = document.getElementById("modulePosition");
        const stepNav = document.querySelector(".module-step-nav");
        if (!content || !modulePosition) return;

        const key = "aiToolkitReusableTools";
        const order = ["objectives","learn","look","try","check","reflect","apply","takeaway"];

        const moduleNumber = () => {
            const match = modulePosition.textContent.match(/Module\s+(\d+)/i);
            return match ? Number(match[1]) : 0;
        };

        const complete = () => {
            try {
                const state = JSON.parse(localStorage.getItem(key) || "{}");
                return Boolean(state[String(moduleNumber())]?.completed);
            } catch (_) { return false; }
        };

        const warn = () => {
            const lab = content.querySelector(".real-tool-lab");
            if (!lab) return;
            let box = lab.querySelector(".tool-inline-warning.tool-required-warning");
            if (!box) {
                box = document.createElement("div");
                box.className = "tool-inline-warning tool-required-warning";
                box.setAttribute("role", "status");
                lab.append(box);
            }
            box.textContent = "Use the reusable tool and generate your result before moving past Practice. The tool—not the old checklist—is the learning activity.";
            lab.scrollIntoView({ behavior: "smooth", block: "center" });
        };

        const blocksTarget = targetIndex => targetIndex > 3 && !complete();

        content.addEventListener("click", event => {
            const next = event.target.closest("[data-slide-next]");
            const dot = event.target.closest("[data-slide-index]");
            const active = content.querySelector(".module-slide.is-active")?.dataset.slide;

            if (next && active === "try" && !complete()) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                warn();
                return;
            }

            if (dot && blocksTarget(Number(dot.dataset.slideIndex))) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                warn();
            }
        }, true);

        stepNav?.addEventListener("click", event => {
            const button = event.target.closest("button[data-jump]");
            if (!button) return;
            const targetIndex = order.indexOf(button.dataset.jump);
            if (!blocksTarget(targetIndex)) return;
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            warn();
        }, true);

        document.addEventListener("keydown", event => {
            if (event.key !== "ArrowRight") return;
            const modal = document.getElementById("moduleModal");
            if (!modal || modal.getAttribute("aria-hidden") === "true") return;
            const active = content.querySelector(".module-slide.is-active")?.dataset.slide;
            if (active !== "try" || complete()) return;
            const tag = document.activeElement?.tagName;
            if (["INPUT","TEXTAREA","SELECT"].includes(tag)) return;
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            warn();
        }, true);
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
