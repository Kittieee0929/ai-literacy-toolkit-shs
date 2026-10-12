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
});
