document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.getElementById("siteHeader");
    const challengeBtn = document.getElementById("challengeBtn");
    const heroChallengeBtn = document.getElementById("heroChallengeBtn");
    const challengeModal = document.getElementById("challengeModal");
    const modalClose = document.getElementById("modalClose");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const feedback = document.getElementById("answerFeedback");
    const progressFill = document.getElementById("progressFill");
    const progressPercentage = document.getElementById("progressPercentage");
    const progressTitle = document.getElementById("progressTitle");
    const pageProgressBar = document.getElementById("pageProgressBar");
    const backToTop = document.getElementById("backToTop");
    const moduleToast = document.getElementById("moduleToast");
    const moduleModal = document.getElementById("moduleModal");
    const moduleClose = document.getElementById("moduleClose");
    const moduleModalKicker = document.getElementById("moduleModalKicker");
    const moduleModalTitle = document.getElementById("moduleModalTitle");
    const moduleModalTagline = document.getElementById("moduleModalTagline");
    const moduleLessonContent = document.getElementById("moduleLessonContent");
    const moduleLessonProgress = document.getElementById("moduleLessonProgress");
    const moduleStepButtons = document.querySelectorAll(".module-step-nav button");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let previouslyFocusedElement = null;
    let toastTimer;
    let currentModule = null;

    const modules = {
        1: {
            title: "Know Your AI",
            domain: "Basic AI Understanding",
            tagline: "Understand AI before you use it.",
            objectives: [
                "Explain artificial intelligence in simple terms and distinguish it from ordinary software.",
                "Recognize common AI-enabled tools and examples of generative AI.",
                "Describe, at a basic level, how generative AI produces responses from patterns in data.",
                "Identify useful capabilities and important limitations of AI systems."
            ],
            learn: [
                ["What AI means", "AI refers to computer systems designed to perform tasks that normally require aspects of human intelligence, such as recognizing patterns, making predictions, generating text, or classifying information."],
                ["AI vs. generative AI", "Not every AI tool creates new content. Generative AI is a type of AI that can produce text, images, audio, code, and other outputs based on patterns learned from data."],
                ["How responses are produced", "A chatbot does not think like a person. It predicts and generates likely responses based on patterns, instructions, and the information available to it."],
                ["Capabilities and limits", "AI can summarize, brainstorm, explain, organize, and generate examples. It can also be wrong, incomplete, outdated, biased, or overly confident."]
            ],
            look: ["Scenario", "A chatbot gives a confident explanation of a science concept. The wording is smooth, but one important detail is incorrect.", "The key lesson: fluent language is not proof of understanding or accuracy."],
            tryIt: ["AI or not?", "Look at tools you use in daily life. Identify which ones use AI features and explain what the AI is doing. Then identify one limitation for each AI-enabled tool.", "Example: a recommendation system may predict what you will like, but it does not truly know your preferences or intentions."],
            quiz: {
                question: "Which statement best describes a generative AI chatbot?",
                options: [
                    "It always retrieves verified facts from the internet.",
                    "It generates responses by using learned patterns and instructions.",
                    "It understands information exactly like a human learner."
                ],
                correct: 1,
                feedback: "Generative AI produces outputs from learned patterns and instructions. Its responses can still contain errors, so they should be judged critically."
            },
            reflect: ["Reflect", "Think of one time an AI tool was useful to you. What did it help you do, and what part still required your own judgment?"],
            apply: ["Apply", "Before using an AI tool for schoolwork, state the task you want AI to support and one thing you will personally check or decide instead of leaving it to AI."],
            takeaway: ["Key takeaway", "AI can be useful without being all-knowing. Understanding what it does — and what it cannot reliably do — is the first step toward responsible use."]
        },
        2: {
            title: "Think Before You Trust",
            domain: "Evaluation of AI-Generated Outputs",
            tagline: "Don’t just accept an AI answer. Examine it.",
            objectives: [
                "Evaluate AI-generated information for accuracy, completeness, relevance, and consistency.",
                "Recognize warning signs such as unsupported claims, missing context, contradictions, or overly confident wording.",
                "Consider possible bias and one-sided framing in AI outputs.",
                "Decide when an AI response needs correction, verification, or additional information."
            ],
            learn: [
                ["Accuracy", "Ask whether the facts, numbers, names, explanations, and examples are correct. A polished answer can still contain factual mistakes."],
                ["Completeness", "Check what may be missing. An answer can be partly correct but leave out context that changes the meaning."],
                ["Bias and framing", "Notice whose perspective is centered, which viewpoints are missing, and whether stereotypes or unfair assumptions appear."],
                ["Consistency", "Look for contradictions inside the answer and compare important details with what you already know or can verify."]
            ],
            look: ["Scenario", "AI gives you a four-paragraph answer for an assignment. Two paragraphs are useful, one oversimplifies the issue, and one gives a statistic without a source.", "Do not treat the response as one all-or-nothing block. Evaluate each important claim."],
            tryIt: ["Four-question scan", "For any AI answer, ask: What is the main claim? What evidence is given? What may be missing? What needs verification?", "This simple scan helps separate useful content from content that only sounds convincing."],
            quiz: {
                question: "What is the best response to an AI answer that sounds confident but includes an unsupported statistic?",
                options: [
                    "Use it because confident wording shows the model is certain.",
                    "Remove the statistic and keep the rest without checking.",
                    "Verify the statistic and examine the surrounding claims before using them."
                ],
                correct: 2,
                feedback: "Confidence is a writing style, not proof. Important claims should be evaluated and verified before use."
            },
            reflect: ["Reflect", "Which is easier for you to notice: factual errors, missing information, or bias? Which one do you need to practice checking more carefully?"],
            apply: ["Apply", "Take one AI-generated paragraph and annotate it using four labels: accurate, needs checking, missing context, and opinion/framing."],
            takeaway: ["Key takeaway", "A strong AI user is not someone who accepts answers quickly. A strong AI user knows how to slow down and evaluate what the answer actually contains."]
        },
        3: {
            title: "Verify Before You Rely",
            domain: "Source Verification",
            tagline: "Trace the information before you trust it.",
            objectives: [
                "Check AI-generated claims, citations, references, and links before using them.",
                "Distinguish between a source that merely exists and a source that actually supports a claim.",
                "Compare information across credible and relevant sources.",
                "Recognize fabricated, incomplete, outdated, or mismatched references."
            ],
            learn: [
                ["Track the claim", "Identify the exact statement you need to verify instead of searching the entire AI response at once."],
                ["Reach the source", "Open or locate the original source. Do not rely only on a citation written by the AI."],
                ["Assess the source", "Check the author or organization, publication date, purpose, evidence, and relevance to your topic."],
                ["Compare evidence", "Use another credible source when the claim is important, disputed, unfamiliar, or likely to change."]
            ],
            look: ["Scenario", "A chatbot cites an article title, author, and year. The reference looks academic, but searching the title and author produces no reliable result.", "Treat the citation as unverified until you can locate and inspect the real source."],
            tryIt: ["TRACE a claim", "T — Track the exact claim. R — Reach the original source. A — Assess authority and date. C — Compare with another reliable source. E — Ensure the source really supports the claim.", "Use this sequence whenever AI gives you a reference you plan to cite."],
            quiz: {
                question: "You find the source named by AI, but the source does not contain the statistic AI attributed to it. What should you do?",
                options: [
                    "Cite the source anyway because the title is related.",
                    "Do not use the statistic unless you can find evidence that actually supports it.",
                    "Ask AI to rewrite the citation so it looks more complete."
                ],
                correct: 1,
                feedback: "A real source is not enough. The source must actually support the specific claim you are using."
            },
            reflect: ["Reflect", "When you search for a source, do you usually check the original material or stop after seeing a search result or summary?"],
            apply: ["Apply", "Choose one factual claim produced by AI and complete the TRACE sequence. Record which source confirmed, corrected, or contradicted the claim."],
            takeaway: ["Key takeaway", "A citation is not automatically evidence. Verification means locating the source, judging its credibility, and checking whether it truly supports the claim."]
        },
        4: {
            title: "AI and My Academic Work",
            domain: "Academic Integrity",
            tagline: "Use AI for support, not shortcuts.",
            objectives: [
                "Distinguish responsible AI assistance from AI use that replaces the student’s own work.",
                "Recognize situations where disclosure, citation, or teacher permission may be required.",
                "Use AI while preserving originality, authorship, and personal understanding.",
                "Follow teacher, school, and assessment rules when using AI."
            ],
            learn: [
                ["Support", "AI can support brainstorming, explanations, practice questions, feedback, outlines, and language improvement when these uses are allowed."],
                ["Substitution", "If AI completes the thinking, writing, analysis, or performance you are expected to demonstrate yourself, the learning task may no longer represent your work."],
                ["Transparency", "When required, explain how AI was used. Do not hide AI use when your teacher, subject, or institution requires disclosure."],
                ["Ownership", "You remain responsible for what you submit. Review, understand, verify, and revise any AI-assisted material."]
            ],
            look: ["Scenario", "A student asks AI to write an entire reflection, changes a few words, and submits it as a personal reflection.", "The problem is not simply that AI was used. The problem is that the submitted work no longer represents the student’s own reflection and learning."],
            tryIt: ["Support, shared, or substitute?", "Classify an AI use as support, shared work, or substitution. Then ask whether the use follows the teacher’s instructions and whether the final output still demonstrates the student’s own learning.", "Example: asking for practice questions supports learning; submitting an AI-written answer as your own may substitute for it."],
            quiz: {
                question: "Which use best protects academic integrity?",
                options: [
                    "Ask AI to answer an assessment and submit the response unchanged.",
                    "Use AI to explain a difficult concept, then answer the task yourself using what you learned.",
                    "Ask AI to make your work impossible for a teacher to recognize."
                ],
                correct: 1,
                feedback: "Using AI to support understanding while doing the assessed thinking yourself is more consistent with academic integrity."
            },
            reflect: ["Reflect", "What kinds of AI help make you learn more? What kinds make it easier to avoid the learning you are supposed to do?"],
            apply: ["Apply", "Rewrite one shortcut-style prompt into a learning-support prompt. Instead of asking AI to do the assignment, ask it to explain, quiz, challenge, or give feedback."],
            takeaway: ["Key takeaway", "Responsible academic AI use should strengthen your learning, not hide who did the thinking. Always follow the rules set for your class or assessment."]
        },
        5: {
            title: "Think Before You Share",
            domain: "Data Privacy",
            tagline: "Your prompt can contain more information than you realize.",
            objectives: [
                "Identify personal, confidential, and sensitive information that should be protected.",
                "Recognize that prompts, uploads, and conversations may contain data about yourself or other people.",
                "Reduce unnecessary personal information when using AI tools.",
                "Use safer prompting habits such as anonymizing, generalizing, or removing identifiers."
            ],
            learn: [
                ["Personal data", "Names, contact details, IDs, addresses, account details, school records, photos, and other information can identify a person directly or indirectly."],
                ["Sensitive information", "Health, financial, family, private school, and other confidential information deserves extra caution."],
                ["Other people’s data", "Privacy is not only about your own information. Do not upload or expose classmates’, teachers’, clients’, or family members’ private information without a valid reason and permission."],
                ["Data minimization", "Give an AI tool only the information actually needed for the task. Remove names and details when a general description will work."]
            ],
            look: ["Scenario", "You want AI to organize a class list, so you paste students’ full names, contact numbers, and grades into the prompt.", "The task can often be completed without exposing identifiable student information."],
            tryIt: ["Make the prompt safer", "Replace identifying details with neutral labels such as Student A, Student B, or general categories. Remove information that the AI does not need to complete the task.", "Ask yourself: if this prompt were seen by someone else, would it reveal more than necessary?"],
            quiz: {
                question: "Which prompt is the safer choice?",
                options: [
                    "Here is my classmate’s full name, phone number, address, and grade. Write advice for them.",
                    "A student is struggling to balance school and part-time work. Suggest general study strategies.",
                    "I uploaded our class record. Tell me which student has the lowest grade."
                ],
                correct: 1,
                feedback: "The safer prompt gives enough context for useful advice without exposing unnecessary identifying information."
            },
            reflect: ["Reflect", "What kinds of information have you typed or uploaded into online tools without first asking whether they were necessary?"],
            apply: ["Apply", "Review one prompt you might realistically use for school. Remove every personal detail that is not needed, then compare the original and safer versions."],
            takeaway: ["Key takeaway", "A useful prompt does not need to reveal everything. Share the minimum information necessary and protect both your own data and other people’s data."]
        },
        6: {
            title: "AI Affects People",
            domain: "Ethical Awareness",
            tagline: "Responsible AI use includes thinking about other people.",
            objectives: [
                "Recognize how bias, stereotypes, and unfair assumptions can appear in AI outputs.",
                "Consider who may benefit, be excluded, misrepresented, or harmed by an AI-supported decision.",
                "Understand the importance of transparency and human accountability.",
                "Make more thoughtful decisions when AI affects other people."
            ],
            learn: [
                ["Bias and fairness", "AI can reflect patterns and inequalities present in data, examples, instructions, or human decisions around the system."],
                ["Representation", "Ask whether groups, perspectives, languages, or experiences are missing or portrayed unfairly."],
                ["Transparency", "People should know when AI meaningfully contributes to content or decisions when that information matters."],
                ["Accountability", "Humans remain responsible for important choices. Saying 'the AI decided' does not remove responsibility for consequences."]
            ],
            look: ["Scenario", "A student group uses AI to rank applicants for a school role. The group accepts the ranking without checking the criteria or whether some students were unfairly disadvantaged.", "AI output should not replace human review, especially when decisions affect opportunities or people."],
            tryIt: ["Stakeholder lens", "For an AI-supported decision, ask: Who is affected? Who benefits? Who might be overlooked? What could go wrong? Who should review the result?", "This moves ethical thinking from abstract rules to real consequences."],
            quiz: {
                question: "What is the most responsible response when AI produces a stereotype about a group of people?",
                options: [
                    "Keep it because AI learned it from data.",
                    "Question the output, correct the stereotype, and avoid using the harmful generalization.",
                    "Use it only if the wording sounds neutral."
                ],
                correct: 1,
                feedback: "Patterns in data do not automatically make a claim fair or appropriate. Harmful stereotypes should be challenged, not repeated."
            },
            reflect: ["Reflect", "When you use AI, do you usually think only about whether it helps you, or also about how the output could affect other people?"],
            apply: ["Apply", "Take one AI use case — hiring, grading, recommendations, image generation, or school decision-making — and identify one fairness risk plus one human safeguard."],
            takeaway: ["Key takeaway", "Ethical AI use asks more than 'Can I do this?' It also asks 'Who could be affected, is this fair, and who is responsible for the result?'"]
        },
        7: {
            title: "AI as a Learning Partner",
            domain: "Responsible AI-Supported Learning",
            tagline: "Let AI help you learn—not learn for you.",
            objectives: [
                "Use AI to support explanation, practice, feedback, brainstorming, and problem-solving.",
                "Keep personal thinking, decision-making, and active participation at the center of learning.",
                "Combine verification, integrity, privacy, and ethics when using AI for schoolwork.",
                "Develop a repeatable routine for responsible AI-supported learning."
            ],
            learn: [
                ["Ask for support", "Use AI to explain ideas, create examples, quiz you, suggest practice, or give feedback instead of immediately requesting a finished answer."],
                ["Think before accepting", "Pause after receiving an AI response. Explain the idea in your own words and decide what you agree with, question, or need to verify."],
                ["Check what matters", "Verify important facts, sources, calculations, and claims. Protect private information and follow academic rules."],
                ["Make it yours", "Revise, apply, and communicate what you actually understand. Your final learning should show your own judgment."]
            ],
            look: ["Scenario", "Two students use the same chatbot. One asks it to complete the assignment. The other asks for a simple explanation, attempts the task, then requests feedback on their own answer.", "Both used AI, but only one kept the learning process active."],
            tryIt: ["ASK → THINK → CHECK → MAKE IT YOURS", "ASK AI for support, THINK through the response yourself, CHECK important information and rules, then MAKE IT YOURS by applying what you understand.", "Use the routine whenever AI becomes part of your learning process."],
            quiz: {
                question: "Which prompt uses AI most like a learning partner?",
                options: [
                    "Write my entire assignment so I can submit it.",
                    "Give me the final answer only.",
                    "Explain this concept simply, ask me two questions to test my understanding, then give feedback on my answers."
                ],
                correct: 2,
                feedback: "A learning-partner prompt keeps you active by combining explanation, practice, and feedback instead of replacing your work."
            },
            reflect: ["Reflect", "What is one AI habit you want to stop, and one learning-focused AI habit you want to practice more often?"],
            apply: ["Apply", "Create your own responsible AI learning prompt using the ASK → THINK → CHECK → MAKE IT YOURS routine. Use it on a real topic you are currently studying."],
            takeaway: ["Key takeaway", "The goal is not to avoid AI or depend on it. The goal is to use AI in a way that leaves you more capable, more informed, and more responsible after the interaction."]
        }
    };

    function setMobileMenu(open) {
        if (!menuBtn || !navLinks) return;
        navLinks.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.textContent = open ? "Close" : "Menu";
        menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }

    menuBtn?.addEventListener("click", () => {
        setMobileMenu(!navLinks.classList.contains("open"));
    });

    document.addEventListener("click", event => {
        if (!navLinks || !menuBtn) return;
        if (
            window.innerWidth <= 980 &&
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            setMobileMenu(false);
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => setMobileMenu(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) setMobileMenu(false);
    });

    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navItems.forEach(item => {
                item.classList.toggle(
                    "active",
                    item.getAttribute("href") === "#" + entry.target.id
                );
            });
        });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    function resetChallenge() {
        answerButtons.forEach(answer => {
            answer.classList.remove("answered");
            answer.disabled = false;
            answer.style.borderColor = "";
            answer.style.background = "";
            answer.style.color = "";
        });
        if (feedback) feedback.innerHTML = "";
    }

    function openChallenge() {
        if (!challengeModal) return;
        previouslyFocusedElement = document.activeElement;
        resetChallenge();
        challengeModal.classList.add("show");
        challengeModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        modalClose?.focus();
    }

    function closeChallenge() {
        if (!challengeModal) return;
        challengeModal.classList.remove("show");
        challengeModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        previouslyFocusedElement?.focus?.();
    }

    challengeBtn?.addEventListener("click", openChallenge);
    heroChallengeBtn?.addEventListener("click", openChallenge);
    modalClose?.addEventListener("click", closeChallenge);

    challengeModal?.addEventListener("click", event => {
        if (event.target === challengeModal) closeChallenge();
    });

    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            answerButtons.forEach(answer => {
                answer.classList.add("answered");
                answer.disabled = true;
            });

            const correct = button.classList.contains("correct-answer");
            button.style.background = correct ? "rgba(101,209,171,.12)" : "rgba(255,130,110,.12)";

            const correctButton = document.querySelector(".correct-answer");
            if (!correct && correctButton) {
                correctButton.style.background = "rgba(101,209,171,.12)";
            }

            if (feedback) {
                feedback.innerHTML = correct
                    ? "<strong>✓ Good call.</strong><br>AI-generated claims should be checked against reliable, accessible sources before you use them."
                    : "<strong>Not quite.</strong><br>AI can invent details and references. Verify important claims using reliable sources before using them academically.";
            }
        });
    });

    let completedModules = JSON.parse(
        localStorage.getItem("aiToolkitCompletedModules") || "[]"
    );

    function updateProgress() {
        completedModules = [...new Set(completedModules.map(Number))].filter(n => n >= 1 && n <= 7);
        localStorage.setItem("aiToolkitCompletedModules", JSON.stringify(completedModules));

        const completed = completedModules.length;
        const percentage = Math.round((completed / 7) * 100);

        if (progressFill) progressFill.style.width = percentage + "%";
        if (progressPercentage) progressPercentage.textContent = percentage + "%";
        if (progressTitle) progressTitle.textContent = completed + " of 7 modules completed";

        document.querySelectorAll(".passport-stamps span").forEach((stamp, index) => {
            stamp.classList.toggle("done", completedModules.includes(index + 1));
        });
    }

    function lessonSection(id, label, title, inner) {
        return `
            <section class="lesson-section" id="lesson-${id}">
                <span class="lesson-section-label">${label}</span>
                <h3>${title}</h3>
                ${inner}
            </section>
        `;
    }

    function renderModule(number) {
        const data = modules[number];
        if (!data || !moduleLessonContent) return;

        currentModule = Number(number);
        moduleModalKicker.textContent = "MODULE " + String(number).padStart(2, "0") + " / " + data.domain.toUpperCase();
        moduleModalTitle.textContent = data.title;
        moduleModalTagline.textContent = data.tagline;

        const objectiveHtml = `
            <ul class="objective-list">
                ${data.objectives.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;

        const learnHtml = `
            <div class="learn-grid">
                ${data.learn.map((item, index) => `
                    <article class="learn-card">
                        <small>Idea ${String(index + 1).padStart(2, "0")}</small>
                        <strong>${item[0]}</strong>
                        <p>${item[1]}</p>
                    </article>
                `).join("")}
            </div>
        `;

        const lookHtml = `
            <div class="lesson-case">
                <span>${data.look[0]}</span>
                <strong>${data.look[1]}</strong>
                <p>${data.look[2]}</p>
            </div>
        `;

        const tryHtml = `
            <div class="lesson-task">
                <span>Try it</span>
                <strong>${data.tryIt[0]}</strong>
                <p>${data.tryIt[1]}</p>
                <p>${data.tryIt[2]}</p>
            </div>
        `;

        const quizHtml = `
            <div class="quiz-box" data-correct="${data.quiz.correct}">
                <h4>${data.quiz.question}</h4>
                <div class="quiz-options">
                    ${data.quiz.options.map((option, index) => `
                        <button class="quiz-option" type="button" data-index="${index}">${option}</button>
                    `).join("")}
                </div>
                <div class="quiz-feedback" aria-live="polite"></div>
            </div>
        `;

        const reflectHtml = `
            <div class="lesson-reflect">
                <span>${data.reflect[0]}</span>
                <strong>Pause and think</strong>
                <p>${data.reflect[1]}</p>
            </div>
        `;

        const applyHtml = `
            <div class="lesson-apply">
                <span>${data.apply[0]}</span>
                <strong>Use it in a real task</strong>
                <p>${data.apply[1]}</p>
            </div>
        `;

        const takeawayHtml = `
            <div class="lesson-takeaway">
                <span>${data.takeaway[0]}</span>
                <strong>${data.takeaway[1]}</strong>
            </div>
        `;

        const alreadyDone = completedModules.includes(currentModule);

        moduleLessonContent.innerHTML =
            lessonSection("objectives", "Start here", "Learning objectives", objectiveHtml) +
            lessonSection("learn", "Learn", "Build the idea", learnHtml) +
            lessonSection("look", "Explore", "Look at a real situation", lookHtml) +
            lessonSection("try", "Try", "Practice the skill", tryHtml) +
            lessonSection("check", "Check", "Check your understanding", quizHtml) +
            lessonSection("reflect", "Reflect", "Connect it to your habits", reflectHtml) +
            lessonSection("apply", "Apply", "Put it into practice", applyHtml) +
            lessonSection("takeaway", "Key takeaway", "What to remember", takeawayHtml) +
            `
                <div class="module-complete-row">
                    <p>When you are satisfied that you understand the module, mark it complete. Your progress is saved only in this browser.</p>
                    <button class="complete-module-btn ${alreadyDone ? "done" : ""}" type="button">
                        ${alreadyDone ? "✓ Module completed" : "Mark module complete"}
                    </button>
                </div>
            `;

        moduleLessonContent.scrollTop = 0;
        updateModuleScrollProgress();

        moduleLessonContent.querySelectorAll(".quiz-option").forEach(option => {
            option.addEventListener("click", () => {
                const quizBox = option.closest(".quiz-box");
                const correctIndex = Number(quizBox.dataset.correct);
                const selectedIndex = Number(option.dataset.index);
                const allOptions = quizBox.querySelectorAll(".quiz-option");
                const quizFeedback = quizBox.querySelector(".quiz-feedback");

                allOptions.forEach(btn => {
                    btn.disabled = true;
                    if (Number(btn.dataset.index) === correctIndex) btn.classList.add("correct");
                });

                if (selectedIndex !== correctIndex) option.classList.add("wrong");
                quizFeedback.textContent = data.quiz.feedback;
            });
        });

        const completeBtn = moduleLessonContent.querySelector(".complete-module-btn");
        completeBtn?.addEventListener("click", () => {
            if (!completedModules.includes(currentModule)) {
                completedModules.push(currentModule);
                updateProgress();
            }

            completeBtn.classList.add("done");
            completeBtn.textContent = "✓ Module completed";

            if (moduleToast) {
                moduleToast.querySelector("strong").textContent = "Module " + currentModule + " completed";
                moduleToast.querySelector("span").textContent = "Your AI Literacy Passport has been updated.";
                moduleToast.classList.add("show");
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => moduleToast.classList.remove("show"), 2600);
            }
        });
    }

    function openModule(number) {
        if (!moduleModal) return;
        previouslyFocusedElement = document.activeElement;
        renderModule(number);
        moduleModal.classList.add("show");
        moduleModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        moduleClose?.focus();
    }

    function closeModule() {
        if (!moduleModal) return;
        moduleModal.classList.remove("show");
        moduleModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        currentModule = null;
        previouslyFocusedElement?.focus?.();
    }

    document.querySelectorAll(".module-link").forEach(button => {
        button.addEventListener("click", () => openModule(Number(button.dataset.module)));
    });

    moduleClose?.addEventListener("click", closeModule);

    moduleModal?.addEventListener("click", event => {
        if (event.target === moduleModal) closeModule();
    });

    moduleStepButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = document.getElementById("lesson-" + button.dataset.jump);
            target?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    function updateModuleScrollProgress() {
        if (!moduleLessonContent || !moduleLessonProgress) return;
        const scrollable = moduleLessonContent.scrollHeight - moduleLessonContent.clientHeight;
        const progress = scrollable > 0
            ? Math.min((moduleLessonContent.scrollTop / scrollable) * 100, 100)
            : 0;
        moduleLessonProgress.style.width = progress + "%";

        const sectionEls = moduleLessonContent.querySelectorAll(".lesson-section");
        let currentId = null;
        sectionEls.forEach(section => {
            if (section.offsetTop <= moduleLessonContent.scrollTop + 110) {
                currentId = section.id.replace("lesson-", "");
            }
        });

        moduleStepButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.jump === currentId);
        });
    }

    moduleLessonContent?.addEventListener("scroll", updateModuleScrollProgress, { passive: true });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        if (moduleModal?.classList.contains("show")) {
            closeModule();
            return;
        }
        if (challengeModal?.classList.contains("show")) {
            closeChallenge();
            return;
        }
        if (navLinks?.classList.contains("open")) setMobileMenu(false);
    });

    updateProgress();

    const revealTargets = document.querySelectorAll(
        ".decision-board, .module-card, .lab-case, .progress-passport, .research-card"
    );

    if (!prefersReducedMotion) {
        revealTargets.forEach(target => {
            target.style.opacity = "0";
            target.style.transform += " translateY(20px)";
        });

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.style.opacity = "1";
                entry.target.style.transform = entry.target.style.transform.replace(" translateY(20px)", "");
                entry.target.style.transition = "opacity .55s ease, transform .55s ease";
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: .12 });

        revealTargets.forEach(target => revealObserver.observe(target));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const id = anchor.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    function updateScrollUI() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0;

        if (pageProgressBar) pageProgressBar.style.width = percentage + "%";
        backToTop?.classList.toggle("show", window.scrollY > 600);
        siteHeader?.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
});