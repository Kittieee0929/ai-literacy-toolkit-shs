(() => {
    const boot = () => {
        const content = document.getElementById("moduleLessonContent");
        const modal = document.getElementById("moduleModal");
        const progress = document.getElementById("moduleLessonProgress");
        const stepNav = document.querySelector(".module-step-nav");

        if (!content || !modal) return;

        const order = [
            { key: "objectives", label: "Brief + Objectives" },
            { key: "learn", label: "Learn" },
            { key: "look", label: "Explore" },
            { key: "try", label: "Try" },
            { key: "check", label: "Check" },
            { key: "reflect", label: "Reflect" },
            { key: "apply", label: "Apply" },
            { key: "takeaway", label: "Takeaway" }
        ];

        let activeIndex = 0;
        let buildTimer = null;

        const sectionFor = key =>
            content.querySelector(`#lesson-${key}`) ||
            content.querySelector(`.lesson-section[data-step="${key}"]`);

        const getSlides = () => [...content.querySelectorAll(":scope > .module-slide-deck > .module-slide")];

        const setActive = (index, { focus = false } = {}) => {
            const slides = getSlides();
            if (!slides.length) return;

            activeIndex = Math.max(0, Math.min(index, slides.length - 1));

            slides.forEach((slide, i) => {
                const active = i === activeIndex;
                slide.hidden = !active;
                slide.classList.toggle("is-active", active);
                slide.setAttribute("aria-hidden", String(!active));
            });

            const brief = content.querySelector(":scope > .module-mission-brief");
            if (brief) brief.hidden = activeIndex !== 0;

            const counter = content.querySelector(".module-slide-counter strong");
            const label = content.querySelector(".module-slide-counter span");
            if (counter) counter.textContent = `Step ${activeIndex + 1} of ${slides.length}`;
            if (label) label.textContent = order[activeIndex]?.label || "Module step";

            const dots = content.querySelectorAll(".module-slide-dot");
            dots.forEach((dot, i) => {
                dot.classList.toggle("is-active", i === activeIndex);
                dot.classList.toggle("is-complete", i < activeIndex);
                dot.setAttribute("aria-current", i === activeIndex ? "step" : "false");
            });

            const prev = content.querySelector("[data-slide-prev]");
            const next = content.querySelector("[data-slide-next]");
            if (prev) prev.disabled = activeIndex === 0;
            if (next) {
                const last = activeIndex === slides.length - 1;
                next.disabled = last;
                next.innerHTML = last ? "End of module" : `Next <span>→</span>`;
            }

            if (progress) progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;

            stepNav?.querySelectorAll("button[data-jump]").forEach(button => {
                const navIndex = order.findIndex(item => item.key === button.dataset.jump);
                const active = navIndex === activeIndex;
                button.classList.toggle("active", active);
                button.classList.toggle("is-active", active);
                if (active) button.setAttribute("aria-current", "step");
                else button.removeAttribute("aria-current");
            });

            content.scrollTop = 0;

            if (focus) {
                const heading = slides[activeIndex].querySelector("h3, h4, [tabindex]");
                if (heading && !heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
                heading?.focus?.({ preventScroll: true });
            }
        };

        const buildDeck = () => {
            if (content.querySelector(":scope > .module-slide-deck")) return;

            const sections = order.map(item => sectionFor(item.key));
            if (sections.filter(Boolean).length < 7) return;

            const brief = content.querySelector(":scope > .module-mission-brief");
            if (!brief) return;

            const deck = document.createElement("div");
            deck.className = "module-slide-deck";
            deck.setAttribute("aria-live", "polite");

            const top = document.createElement("div");
            top.className = "module-slide-topbar";
            top.innerHTML = `
                <div class="module-slide-counter">
                    <span>Brief + Objectives</span>
                    <strong>Step 1 of 8</strong>
                </div>
                <div class="module-slide-dots" aria-label="Module step progress">
                    ${order.map((item, i) => `<button type="button" class="module-slide-dot${i === 0 ? " is-active" : ""}" data-slide-index="${i}" aria-label="Go to ${item.label}" ${i === 0 ? 'aria-current="step"' : ""}><span>${i + 1}</span></button>`).join("")}
                </div>
            `;

            content.insertBefore(top, brief);

            order.forEach((item, index) => {
                const slide = document.createElement("section");
                slide.className = "module-slide";
                slide.dataset.slide = item.key;
                slide.setAttribute("aria-label", `Step ${index + 1}: ${item.label}`);

                const section = sections[index];
                if (section) slide.append(section);

                deck.append(slide);
            });

            const leftovers = [...content.children].filter(node =>
                node !== top &&
                node !== brief &&
                node !== deck &&
                !node.classList.contains("module-slide-controls") &&
                !node.classList.contains("lesson-section")
            );

            const lastSlide = deck.lastElementChild;
            leftovers.forEach(node => {
                if (node.classList?.contains("module-navigator")) lastSlide?.append(node);
            });

            content.append(deck);

            const controls = document.createElement("div");
            controls.className = "module-slide-controls";
            controls.innerHTML = `
                <button type="button" data-slide-prev><span>←</span> Previous</button>
                <div>
                    <span>GUIDED MODULE</span>
                    <strong>Use the side menu or arrows to move at your pace.</strong>
                </div>
                <button type="button" class="next" data-slide-next>Next <span>→</span></button>
            `;
            content.append(controls);

            activeIndex = 0;
            setActive(0);
            content.classList.add("is-slide-module");
        };

        const scheduleBuild = () => {
            window.clearTimeout(buildTimer);
            buildTimer = window.setTimeout(buildDeck, 60);
        };

        const observer = new MutationObserver(() => {
            if (content.querySelector(":scope > .module-slide-deck")) return;
            scheduleBuild();
        });
        observer.observe(content, { childList: true });

        content.addEventListener("click", event => {
            const dot = event.target.closest("[data-slide-index]");
            if (dot) {
                setActive(Number(dot.dataset.slideIndex), { focus: true });
                return;
            }

            if (event.target.closest("[data-slide-prev]")) {
                setActive(activeIndex - 1, { focus: true });
                return;
            }

            if (event.target.closest("[data-slide-next]")) {
                setActive(activeIndex + 1, { focus: true });
            }
        });

        stepNav?.addEventListener("click", event => {
            const button = event.target.closest("button[data-jump]");
            if (!button || !content.querySelector(":scope > .module-slide-deck")) return;

            const index = order.findIndex(item => item.key === button.dataset.jump);
            if (index < 0) return;

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            setActive(index, { focus: true });
        }, true);

        document.addEventListener("keydown", event => {
            if (modal.getAttribute("aria-hidden") === "true") return;
            if (!content.querySelector(":scope > .module-slide-deck")) return;

            const tag = document.activeElement?.tagName;
            if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

            if (event.key === "ArrowRight") {
                event.preventDefault();
                setActive(activeIndex + 1, { focus: true });
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                setActive(activeIndex - 1, { focus: true });
            }
        });

        scheduleBuild();
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
