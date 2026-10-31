(() => {
    const boot = () => {
        const nav = document.getElementById("solarNav");
        if (!nav) return;

        const core = nav.querySelector(".solar-core");
        const planets = [...nav.querySelectorAll(".solar-planet[data-solar-page]")];
        if (!core || !planets.length) return;

        const pageInfo = {
            home: {
                title: "Start",
                kicker: "Toolkit overview",
                description: "See the big picture, understand the seven-domain journey, and choose where to begin."
            },
            guide: {
                title: "Guide",
                kicker: "How to use the toolkit",
                description: "Check your readiness, learn the safety rules, and get a recommended starting point."
            },
            modules: {
                title: "Learning Trail",
                kicker: "Seven connected domains",
                description: "Open guided lessons, practice with reusable tools, complete checks, reflect, and apply."
            },
            challenge: {
                title: "Decision Lab",
                kicker: "Real-world judgment",
                description: "Test what you learned in realistic AI-use situations where the best answer is not just about speed."
            },
            progress: {
                title: "Progress",
                kicker: "Your learning path",
                description: "See completed modules, continue where you stopped, and reach the final integrated capstone."
            },
            about: {
                title: "About",
                kicker: "About this website",
                description: "Learn what the website covers and meet its developer."
            },
            resources: {
                title: "Resources",
                kicker: "Evidence + glossary",
                description: "Review key AI-literacy terms and the research, policy, and guidance behind the toolkit."
            }
        };

        const storageKey = "aiToolkitVisitedPages";
        const safeRead = () => {
            try {
                const raw = JSON.parse(localStorage.getItem(storageKey) || "[]");
                return Array.isArray(raw) ? raw.filter(key => pageInfo[key]) : [];
            } catch (_) {
                return [];
            }
        };

        const writeVisited = pages => {
            localStorage.setItem(storageKey, JSON.stringify([...new Set(pages)]));
        };

        let visited = safeRead();
        let exploreMode = false;
        let previewedPage = null;

        const preview = document.createElement("aside");
        preview.className = "solar-preview";
        preview.setAttribute("aria-live", "polite");
        nav.append(preview);

        const visitedCount = document.createElement("span");
        visitedCount.className = "solar-visited-count";
        core.append(visitedCount);

        core.removeAttribute("aria-hidden");
        core.setAttribute("role", "button");
        core.setAttribute("tabindex", "0");
        core.setAttribute("aria-label", "Open toolkit explore mode");
        core.setAttribute("aria-expanded", "false");

        const currentPage = () => document.body.dataset.activePage || "home";

        const markVisited = page => {
            if (!pageInfo[page]) return;
            if (!visited.includes(page)) {
                visited = [...visited, page];
                writeVisited(visited);
            }
            syncVisited();
        };

        const syncVisited = () => {
            planets.forEach(planet => {
                const isVisited = visited.includes(planet.dataset.solarPage);
                planet.classList.remove("is-visited");
                planet.dataset.visited = String(isVisited);
            });
            visitedCount.textContent = `${visited.length}/7`;
            visitedCount.setAttribute("aria-label", `${visited.length} of 7 toolkit sections explored`);
        };

        const previewMarkup = page => {
            const info = pageInfo[page];
            const status = page === currentPage()
                ? "Current section"
                : visited.includes(page)
                    ? "Explored"
                    : "Not opened yet";

            return `
                <div class="solar-preview-kicker">
                    <span>${info.kicker}</span>
                    <em>${status}</em>
                </div>
                <h3>${info.title}</h3>
                <p>${info.description}</p>
                <button type="button" class="solar-preview-action" data-solar-preview-open="${page}">
                    ${page === currentPage() ? "You are here" : `Open ${info.title}`} <span>→</span>
                </button>
                <div class="solar-explore-progress">
                    <div><span>Toolkit explored</span><strong>${visited.length} / 7</strong></div>
                    <div class="solar-explore-track"><span style="width:${(visited.length / 7) * 100}%"></span></div>
                </div>
            `;
        };

        const exploreMarkup = () => `
            <div class="solar-preview-kicker">
                <span>Explore mode</span>
                <em>${visited.length} / 7 explored</em>
            </div>
            <h3>Your AI Literacy Toolkit map</h3>
            <p>Hover a planet to preview it, or choose a section below. Choose a section to explore its content.</p>
            <div class="solar-explore-list">
                ${planets.map((planet, index) => {
                    const key = planet.dataset.solarPage;
                    const info = pageInfo[key];
                    return `
                        <button type="button" data-solar-preview-open="${key}" class="${key === currentPage() ? "is-active" : ""}">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            ${info.title}
                        </button>
                    `;
                }).join("")}
            </div>
            <div class="solar-explore-progress">
                <div><span>Sections opened</span><strong>${visited.length} / 7</strong></div>
                <div class="solar-explore-track"><span style="width:${(visited.length / 7) * 100}%"></span></div>
            </div>
        `;

        const highlightPlanet = page => {
            planets.forEach(planet => {
                planet.classList.toggle("is-preview-target", planet.dataset.solarPage === page);
            });
        };

        const showPreview = page => {
            if (!pageInfo[page]) return;
            previewedPage = page;
            preview.innerHTML = previewMarkup(page);
            nav.classList.add("is-previewing");
            highlightPlanet(page);
        };

        const hidePreview = () => {
            if (exploreMode) return;
            previewedPage = null;
            nav.classList.remove("is-previewing");
            highlightPlanet(null);
        };

        const setExploreMode = enabled => {
            exploreMode = enabled;
            nav.classList.toggle("is-explore-mode", enabled);
            core.setAttribute("aria-expanded", String(enabled));

            if (enabled) {
                previewedPage = null;
                highlightPlanet(null);
                preview.innerHTML = exploreMarkup();
                nav.classList.add("is-previewing");
                core.setAttribute("aria-label", "Close toolkit explore mode");
            } else {
                nav.classList.remove("is-previewing");
                core.setAttribute("aria-label", "Open toolkit explore mode");
                const active = currentPage();
                showPreview(active);
                window.setTimeout(hidePreview, 900);
            }
        };

        core.addEventListener("click", event => {
            event.preventDefault();
            setExploreMode(!exploreMode);
        });

        core.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            setExploreMode(!exploreMode);
        });

        planets.forEach(planet => {
            const page = planet.dataset.solarPage;

            planet.addEventListener("mouseenter", () => {
                if (!exploreMode) showPreview(page);
            });

            planet.addEventListener("focus", () => {
                if (!exploreMode) showPreview(page);
            });

            planet.addEventListener("mouseleave", () => {
                if (!exploreMode) hidePreview();
            });

            planet.addEventListener("blur", event => {
                if (!exploreMode && !preview.contains(event.relatedTarget)) hidePreview();
            });

            planet.addEventListener("click", () => {
                markVisited(page);
                if (exploreMode) setExploreMode(false);
            });
        });

        preview.addEventListener("mouseenter", () => {
            if (previewedPage) nav.classList.add("is-previewing");
        });

        preview.addEventListener("mouseleave", () => {
            if (!exploreMode) hidePreview();
        });

        preview.addEventListener("click", event => {
            const action = event.target.closest("[data-solar-preview-open]");
            if (!action) return;
            const page = action.dataset.solarPreviewOpen;
            const planet = planets.find(item => item.dataset.solarPage === page);
            if (!planet) return;

            markVisited(page);
            if (exploreMode) setExploreMode(false);
            planet.click();
        });

        const activeObserver = new MutationObserver(() => {
            const page = currentPage();
            markVisited(page);
            if (exploreMode) preview.innerHTML = exploreMarkup();
        });
        activeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-active-page"] });

        markVisited(currentPage());
        syncVisited();
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();

