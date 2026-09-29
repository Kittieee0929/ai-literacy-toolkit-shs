document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.getElementById("siteHeader");
    const challengeBtn = document.getElementById("challengeBtn");
    const heroChallengeBtn = document.getElementById("heroChallengeBtn");
    const challengeModal = document.getElementById("challengeModal");
    const modalClose = document.getElementById("modalClose");
    const challengeDomain = document.getElementById("challengeDomain");
    const challengeScenario = document.getElementById("challengeScenario");
    const challengeQuestion = document.getElementById("challengeQuestion");
    const challengeAnswers = document.getElementById("challengeAnswers");
    const challengeCounter = document.getElementById("challengeCounter");
    const nextChallenge = document.getElementById("nextChallenge");
    const feedback = document.getElementById("answerFeedback");
    const progressFill = document.getElementById("progressFill");
    const progressPercentage = document.getElementById("progressPercentage");
    const progressTitle = document.getElementById("progressTitle");
    const progressMessage = document.getElementById("progressMessage");
    const progressResumeBtn = document.getElementById("progressResumeBtn");
    const resetToolkitBtn = document.getElementById("resetToolkitBtn");
    const continueLearningBtn = document.getElementById("continueLearningBtn");
    const progressModuleButtons = document.querySelectorAll("[data-progress-module]");
    const pageProgressBar = document.getElementById("pageProgressBar");
    const backToTop = document.getElementById("backToTop");
    const moduleToast = document.getElementById("moduleToast");
    const teacherModeBtn = document.getElementById("teacherModeBtn");
    const teacherModal = document.getElementById("teacherModal");
    const teacherClose = document.getElementById("teacherClose");
    const teacherContent = document.getElementById("teacherContent");
    const teacherModuleButtons = document.querySelectorAll("[data-teacher-module]");
    const printTeacherGuideBtn = document.getElementById("printTeacherGuideBtn");
    const printCompleteTeacherGuideBtn = document.getElementById("printCompleteTeacherGuideBtn");
    const printTeacherGuide = document.getElementById("printTeacherGuide");
    const printCompleteTeacherGuide = document.getElementById("printCompleteTeacherGuide");
    const completionPanel = document.getElementById("completionPanel");
    const openCapstoneBtn = document.getElementById("openCapstoneBtn");
    const printQuickGuideBtn = document.getElementById("printQuickGuideBtn");
    const capstoneModal = document.getElementById("capstoneModal");
    const capstoneClose = document.getElementById("capstoneClose");
    const capstoneCards = document.querySelectorAll("[data-capstone-domain]");
    const capstoneResponse = document.getElementById("capstoneResponse");
    const capstoneStatus = document.getElementById("capstoneStatus");
    const capstoneCompare = document.getElementById("capstoneCompare");
    const capstoneModel = document.getElementById("capstoneModel");
    const moduleModal = document.getElementById("moduleModal");
    const moduleClose = document.getElementById("moduleClose");
    const moduleModalKicker = document.getElementById("moduleModalKicker");
    const moduleModalTitle = document.getElementById("moduleModalTitle");
    const moduleModalTagline = document.getElementById("moduleModalTagline");
    const modulePosition = document.getElementById("modulePosition");
    const moduleLessonContent = document.getElementById("moduleLessonContent");
    const moduleLessonProgress = document.getElementById("moduleLessonProgress");
    const moduleStepButtons = document.querySelectorAll(".module-step-nav button");
    const readinessItems = document.querySelectorAll(".readiness-item");
    const readinessResult = document.getElementById("readinessResult");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let previouslyFocusedElement = null;
    let toastTimer;
    let currentModule = null;
    let currentTeacherModule = 1;
    let currentChallenge = 0;

    const toolkitStorageKeys = [
        "aiToolkitReadiness",
        "aiToolkitLastModule",
        "aiToolkitCompletedModules",
        "aiToolkitModuleResponses",
        "aiToolkitTeacherModule",
        "aiToolkitCapstoneResponse"
    ];

    const challengeCases = [
        {
            domain: "DOMAIN 01 / BASIC AI UNDERSTANDING",
            scenario: "A classmate says, “The chatbot understands our lesson because its explanation sounds human.”",
            question: "What is the strongest response?",
            options: [
                "Agree because natural language proves human-like understanding.",
                "Explain that fluent output can come from learned patterns and prediction, so human-like wording does not prove human understanding.",
                "Assume the chatbot is correct because it was trained on large amounts of data."
            ],
            correct: 1,
            feedback: "Fluency is not the same as understanding. Human judgment is still needed to interpret and evaluate the output."
        },
        {
            domain: "DOMAIN 02 / EVALUATION OF AI-GENERATED OUTPUTS",
            scenario: "AI gives a clear answer with an impressive statistic but provides no evidence.",
            question: "What should you do before using it?",
            options: [
                "Use it because the answer is well written.",
                "Evaluate the claim and verify the statistic before including it.",
                "Keep the statistic but delete any mention that AI produced it."
            ],
            correct: 1,
            feedback: "A polished answer can still be unsupported. Evaluate accuracy, context, bias, logic, and evidence."
        },
        {
            domain: "DOMAIN 03 / SOURCE VERIFICATION",
            scenario: "AI gives you a journal title and DOI. The DOI does not resolve and the article cannot be found.",
            question: "What is the most responsible next step?",
            options: [
                "Cite it because the reference looks academic.",
                "Treat it as unverified and independently search for the original source.",
                "Ask AI to invent a different DOI."
            ],
            correct: 1,
            feedback: "A citation is only useful if the original source can be located and it actually supports the claim."
        },
        {
            domain: "DOMAIN 04 / ACADEMIC INTEGRITY",
            scenario: "Your teacher allows AI for brainstorming but not for writing the final individual reflection.",
            question: "Which use best follows the task rules?",
            options: [
                "Ask AI to write the reflection and change a few words.",
                "Use AI to generate reflection questions, then write the reflection yourself.",
                "Ask AI to hide signs that it produced the text."
            ],
            correct: 1,
            feedback: "Responsible use follows the specific learning purpose and the teacher’s instructions."
        },
        {
            domain: "DOMAIN 05 / DATA PRIVACY",
            scenario: "You want AI to summarize class performance and are about to upload a spreadsheet with student names, grades, contact numbers, and comments.",
            question: "What is the safer approach?",
            options: [
                "Upload everything because the task is educational.",
                "Remove unnecessary identifiers and use anonymized or synthetic data whenever possible.",
                "Upload the file but ask AI not to remember it."
            ],
            correct: 1,
            feedback: "Use data minimization: share only what the task actually needs and protect other people’s personal information."
        },
        {
            domain: "DOMAIN 06 / ETHICAL AWARENESS",
            scenario: "A student makes a realistic AI voice clone of a teacher and posts a fake announcement as a joke.",
            question: "What is the key ethical problem?",
            options: [
                "The audio quality might not be perfect.",
                "The use can involve deception, lack of consent, reputational harm, and loss of trust.",
                "The file size might be too large."
            ],
            correct: 1,
            feedback: "Synthetic media can affect consent, trust, dignity, and accountability even when the creator calls it a joke."
        },
        {
            domain: "DOMAIN 07 / RESPONSIBLE AI-SUPPORTED LEARNING",
            scenario: "You ask AI for help with a difficult concept. After closing the chatbot, you still cannot explain the idea yourself.",
            question: "What should happen next?",
            options: [
                "Submit the AI answer anyway.",
                "Continue learning: ask for simpler explanations or practice, verify what matters, then explain the idea in your own words.",
                "Copy the response into your notes and consider the topic finished."
            ],
            correct: 1,
            feedback: "AI-supported learning should leave you more capable. The process is incomplete until you can think, check, create, and own the understanding."
        }
    ];

    const modules = {
        1: {
            title: "Know Your AI",
            domain: "Basic AI Understanding",
            tagline: "Understand what AI is before deciding what to trust it with.",
            objectives: [
                "Explain AI and generative AI in clear, student-friendly language.",
                "Recognize AI systems already present in everyday student life.",
                "Describe how generative AI predicts and produces outputs at a basic level.",
                "Separate AI capability from human understanding, intention, and judgment."
            ],
            miniModules: [
                ["UNDERSTAND", "AI Around Us", "Spot AI in search, recommendations, filters, translation, chatbots, image tools, and other systems students already use. The goal is to recognize that AI is not only a chatbot."],
                ["UNDERSTAND", "How Generative AI Predicts", "Generative AI produces likely outputs from patterns in data and instructions. It can sound certain even when the content is incomplete or wrong."],
                ["APPLY", "Capability vs. Understanding", "Compare what an AI system can do with what a human learner contributes: goals, lived experience, values, responsibility, and judgment."],
                ["CREATE", "Human Agency", "Decide which parts of a task should be supported by AI and which parts should stay under your own control."]
            ],
            tool: {
                name: "AI or Algorithm?",
                description: "Classify everyday tools as AI-enabled, rule-based, or uncertain. Then explain what evidence led to your decision.",
                checklist: ["What does the system appear to predict or generate?", "Does it adapt from data or patterns?", "What can the user still control?", "What could the system get wrong?"]
            },
            look: ["Scenario", "A chatbot gives a confident explanation of a science concept. The wording is smooth, but one important detail is incorrect.", "Fluent language can create an impression of intelligence. The learner still has to judge the content."],
            tryIt: ["Prediction demo", "Write the beginning of a familiar sentence and predict several likely next words. Compare this simple prediction idea with how generative systems produce likely continuations at a much larger scale.", "The activity is not a technical simulation; it is a simple way to understand that generated language is based on patterns and likelihood, not human-like understanding."],
            quiz: {
                question: "Which statement best explains the role of human agency when using AI?",
                options: [
                    "AI should decide what is best because it processes more information.",
                    "The user should set the goal, judge the output, and remain responsible for important decisions.",
                    "Human judgment is only needed when AI refuses to answer."
                ],
                correct: 1,
                feedback: "AI can support a task, but humans remain responsible for goals, judgment, and consequences."
            },
            reflect: ["Reflect", "Which AI feature do you use most often, and what decision are you still personally responsible for when using it?"],
            apply: ["Apply", "Choose one school task. Write two columns: 'AI may support this' and 'I must decide/do this myself.'"],
            takeaway: ["Key takeaway", "AI capability is not the same as human understanding. Know what the system can do, know its limits, and keep human judgment in control."],
            teacherLens: "Ask learners to explain AI in their own words before introducing formal definitions. Use examples from tools they already encounter and correct the common idea that all automated software is AI."
        },
        2: {
            title: "Think Before You Trust",
            domain: "Evaluation of AI-Generated Outputs",
            tagline: "Fluent is not the same as factual.",
            objectives: [
                "Evaluate AI-generated outputs for accuracy, relevance, completeness, logic, bias, and evidence.",
                "Recognize unsupported claims, contradictions, overconfidence, and missing context.",
                "Separate useful parts of an AI answer from parts that need correction or verification.",
                "Practice systematic evaluation instead of accepting or rejecting an entire response at once."
            ],
            miniModules: [
                ["UNDERSTAND", "Fluency ≠ Factuality", "AI can produce polished, confident language even when a claim is wrong. Style is not evidence."],
                ["UNDERSTAND", "Six Things to Check", "Evaluate Accuracy, Relevance, Completeness, Logic, Bias, and Evidence instead of relying on a general feeling that an answer 'looks right.'"],
                ["APPLY", "Output Detective", "Inspect an AI answer sentence by sentence and label claims that are supported, uncertain, incomplete, biased, or irrelevant."],
                ["CREATE", "Improve the Output", "Rewrite a weak AI answer using verified information, clearer reasoning, missing context, and more balanced language."]
            ],
            tool: {
                name: "WISE Output Check",
                description: "Use six lenses before trusting an AI-generated response.",
                checklist: ["Accuracy — Are the facts correct?", "Relevance — Does it answer the actual task?", "Completeness — What important context is missing?", "Logic — Do the ideas and conclusions follow?", "Bias — Is the framing unfair or one-sided?", "Evidence — What supports the important claims?"]
            },
            look: ["Scenario", "AI gives you a four-paragraph answer. Two paragraphs are useful, one oversimplifies the issue, and one gives a statistic without evidence.", "Do not judge the response as one block. Break it into claims and evaluate each important part."],
            tryIt: ["Output Detective", "Take one AI-generated paragraph and highlight factual claims, opinions, assumptions, and statements that need evidence.", "Then use the WISE Output Check to decide what can stay, what should be revised, and what must be verified."],
            quiz: {
                question: "An AI answer is relevant and well written, but it gives no evidence for an important factual claim. What should you do?",
                options: [
                    "Accept it because the rest of the answer is strong.",
                    "Treat that claim as needing verification before you use it.",
                    "Delete the claim and assume everything else is correct."
                ],
                correct: 1,
                feedback: "Evaluation is claim-by-claim. A useful answer can still contain unsupported details."
            },
            reflect: ["Reflect", "Which of the six checks do you usually forget: accuracy, relevance, completeness, logic, bias, or evidence?"],
            apply: ["Apply", "Evaluate a real AI response using all six lenses. Write one sentence explaining whether you would use, revise, or reject the output."],
            takeaway: ["Key takeaway", "Good AI literacy means examining how an answer works, not being impressed by how confidently it is written."],
            teacherLens: "Give learners imperfect AI outputs on purpose. Ask them to diagnose specific problems instead of only asking whether the answer is 'good' or 'bad.'"
        },
        3: {
            title: "Verify Before You Rely",
            domain: "Source Verification",
            tagline: "Trace the claim, inspect the source, then decide.",
            objectives: [
                "Investigate AI-generated citations, links, statistics, and factual claims.",
                "Judge whether a source is credible, current, relevant, and directly supportive of a claim.",
                "Use more than one reliable source when a claim is important or uncertain.",
                "Recognize fabricated citations and real sources that do not actually support the AI's statement."
            ],
            miniModules: [
                ["UNDERSTAND", "Citation Investigation", "AI can invent references or combine real-looking details incorrectly. A citation is only a lead until you locate the source yourself."],
                ["UNDERSTAND", "Source Quality", "Check author, publisher, date, purpose, evidence, and relevance—not only whether the page exists."],
                ["APPLY", "VERIFY a Claim", "Use a repeatable verification routine for any important AI-generated claim or source."],
                ["CREATE", "Triangulate", "Compare multiple credible sources and build your own evidence-based conclusion instead of relying on one AI response."]
            ],
            tool: {
                name: "VERIFY",
                description: "A source-verification routine for AI-generated claims.",
                checklist: ["V — View the original source.", "E — Examine the author or organization.", "R — Review the publisher or platform.", "I — Inspect the date and context.", "F — Find support for the exact claim.", "Y — Your judgment: decide whether the evidence is strong enough to use."]
            },
            look: ["Scenario", "A chatbot gives an academic-looking article title and author, but you cannot locate the article. In another case, the source exists but never says the statistic AI attributed to it.", "Both cases fail verification: one may be fabricated, and the other does not support the claim."],
            tryIt: ["Citation investigation", "Choose one AI-generated citation or factual claim and complete every step of VERIFY.", "For an important claim, triangulate by checking at least one additional credible source and note whether the sources agree, disagree, or add context."],
            quiz: {
                question: "A source exists, but it does not support the exact claim AI attached to it. Is the claim verified?",
                options: [
                    "Yes, because the source is real.",
                    "No, because the evidence must support the specific claim.",
                    "Yes, if the source is from a university."
                ],
                correct: 1,
                feedback: "Source existence and source support are different. Verification requires evidence for the exact claim."
            },
            reflect: ["Reflect", "When you search for information, what usually makes you stop checking? A familiar website, a professional-looking page, or seeing the same claim repeated?"],
            apply: ["Apply", "Create a short verification record: claim, original AI source, source status, second source, and your final judgment."],
            takeaway: ["Key takeaway", "Verification means following the evidence beyond the chatbot and deciding for yourself whether the source really supports the claim."],
            teacherLens: "Model verification live. Show a real source, a fabricated citation, and a real source that does not support the claim so learners see three different outcomes."
        },
        4: {
            title: "AI and My Academic Work",
            domain: "Academic Integrity",
            tagline: "Use AI to strengthen learning, not to hide who did the work.",
            objectives: [
                "Place AI uses on a spectrum from learning support to inappropriate substitution.",
                "Recognize when disclosure, citation, teacher permission, or non-use is required.",
                "Maintain authorship, originality, and personal understanding in AI-assisted work.",
                "Make responsible choices when task instructions or school policies limit AI use."
            ],
            miniModules: [
                ["UNDERSTAND", "The AI Assistance Spectrum", "AI use can range from explanations and practice, to collaborative support, to completing work a student is expected to do independently."],
                ["UNDERSTAND", "Rules and Transparency", "Responsible use depends on the specific task, teacher instructions, assessment conditions, and school policies—not on one universal rule."],
                ["APPLY", "Integrity Decision Lab", "Judge realistic student cases by asking what the task is assessing, what AI did, what the student still did, and whether the use was permitted or disclosed."],
                ["CREATE", "Redesign the Prompt", "Turn shortcut prompts into learning prompts that ask AI to explain, question, coach, challenge, or give feedback."]
            ],
            tool: {
                name: "AI Assistance Spectrum",
                description: "Place an AI use where it belongs, then check the rules for the task.",
                checklist: ["Learning support — explanation, examples, practice.", "Guided assistance — feedback, outlining, brainstorming.", "Major contribution — substantial rewriting or generation.", "Substitution — AI performs the assessed thinking or work.", "Always check teacher/school instructions before deciding whether a use is acceptable."]
            },
            look: ["Scenario", "A student asks AI to write an entire personal reflection, changes a few words, and submits it. Another student uses AI to generate practice questions before writing the reflection independently.", "Both students used AI, but the role AI played in the learning and submitted work is very different."],
            tryIt: ["Integrity Decision Lab", "Classify several uses along the AI Assistance Spectrum. For each one, decide: allowed, ask first, disclose/cite, revise the approach, or do not use.", "Explain your decision using the purpose of the task—not simply whether AI was involved."],
            quiz: {
                question: "Which question is most useful when deciding whether AI use is academically responsible?",
                options: [
                    "Did AI make the task faster?",
                    "Does this use still allow the submitted work to demonstrate the learning the task is assessing, and does it follow the rules?",
                    "Can the teacher detect AI?"
                ],
                correct: 1,
                feedback: "Academic integrity focuses on learning, authorship, transparency, and the rules of the task—not avoiding detection."
            },
            reflect: ["Reflect", "Which AI uses help you understand more, and which make it easier to avoid the thinking the task is designed to assess?"],
            apply: ["Apply", "Take one prompt that asks AI to complete schoolwork. Redesign it so AI becomes a tutor, reviewer, practice partner, or feedback tool."],
            takeaway: ["Key takeaway", "The responsible question is not only 'Did I use AI?' but 'What role did AI play, what did I still learn and create, and did I follow the rules?'"],
            teacherLens: "State AI expectations explicitly for each task. Tell learners what is allowed, what requires disclosure, what is prohibited, and why those boundaries matter for the intended learning."
        },
        5: {
            title: "Think Before You Share",
            domain: "Data Privacy",
            tagline: "A prompt is also a data-sharing decision.",
            objectives: [
                "Identify personal, sensitive, confidential, and unnecessary information in prompts and uploads.",
                "Practice data minimization, anonymization, and safer prompt design.",
                "Recognize privacy risks involving classmates, teachers, family members, school records, images, and files.",
                "Connect responsible AI use with the Philippines' Data Privacy Act of 2012 (Republic Act No. 10173)."
            ],
            miniModules: [
                ["UNDERSTAND", "What Counts as Personal Data?", "Names, IDs, contact details, addresses, school records, images, account information, and combinations of details can identify a person."],
                ["UNDERSTAND", "Why Prompts Matter", "Typing, pasting, or uploading information into an AI tool is still a form of sharing or processing information. Ask whether every detail is necessary."],
                ["APPLY", "Prompt Privacy Scanner", "Scan a prompt for identifiers, sensitive information, third-party data, and unnecessary details before sending it."],
                ["CREATE", "Sanitize the Prompt", "Rewrite a risky prompt using labels, categories, general descriptions, or synthetic examples that preserve the learning task without exposing real people."]
            ],
            tool: {
                name: "Prompt Privacy Scanner",
                description: "Check a prompt before you send it.",
                checklist: ["PERSON — Does this identify a real person?", "SENSITIVE — Does it reveal private, health, financial, academic, or confidential information?", "NECESSARY — Does the AI actually need this detail?", "OTHERS — Am I sharing information that belongs to someone else?", "SANITIZE — Can I anonymize, generalize, or remove the detail?"]
            },
            look: ["Scenario", "You want AI to summarize class performance, so you upload a file containing students' full names, scores, contact details, and comments.", "The learning task may be possible using anonymized or synthetic data instead of identifiable student records."],
            tryIt: ["Sanitize this prompt", "Rewrite a risky prompt so the useful context remains but unnecessary identifying details disappear.", "Example: replace names with Student A/Student B, remove contact details, and describe the learning issue generally rather than uploading a real confidential record."],
            quiz: {
                question: "Which principle best matches safer AI prompting?",
                options: [
                    "Include as much personal detail as possible so the AI has context.",
                    "Share only information that is necessary for the task and remove identifying details when possible.",
                    "Personal data is safe as long as the prompt is for school."
                ],
                correct: 1,
                feedback: "Data minimization and anonymization reduce unnecessary privacy exposure while still allowing the task to be completed."
            },
            reflect: ["Reflect", "Think about your last three AI prompts or uploads. Did any include information about a real person that was not necessary?"],
            apply: ["Apply", "Run one realistic school prompt through the Prompt Privacy Scanner, then create a sanitized version and explain what you removed and why."],
            takeaway: ["Key takeaway", "The Data Privacy Act of 2012 (RA 10173) protects personal information in information and communications systems. For learners, a practical habit is simple: share only what is necessary, protect other people's information, and sanitize prompts whenever possible."],
            teacherLens: "Use sample or synthetic records for classroom AI activities whenever real personal data is unnecessary. Model anonymization before asking learners to upload or paste any information into AI tools.",
            referenceNote: "Philippine context: Republic Act No. 10173, the Data Privacy Act of 2012, is administered by the National Privacy Commission."
        },
        6: {
            title: "AI Affects People",
            domain: "Ethical Awareness",
            tagline: "Ask who is affected, what could go wrong, and who remains responsible.",
            objectives: [
                "Recognize ethical risks involving bias, misinformation, deepfakes, voice cloning, consent, and copyright.",
                "Consider how AI-generated content can affect people who did not choose to participate.",
                "Use a stakeholder lens to identify benefits, harms, missing perspectives, and safeguards.",
                "Keep human accountability at the center of AI-supported decisions and content creation."
            ],
            miniModules: [
                ["UNDERSTAND", "Bias and Representation", "AI can reproduce stereotypes, unequal patterns, and missing perspectives found in data, examples, or the way a system is used."],
                ["UNDERSTAND", "Synthetic Media and Misinformation", "AI can produce realistic text, images, video, and cloned voices. Plausible media can be false, manipulated, or presented without context."],
                ["APPLY", "Consent, Ownership, and Attribution", "Before generating or sharing content involving real people or others' creative work, ask whether consent, permission, attribution, or other safeguards are needed."],
                ["CREATE", "Ethics Court", "Judge AI cases by identifying stakeholders, benefits, harms, rights, evidence, and the human decision-maker who must remain accountable."]
            ],
            tool: {
                name: "Ethics Court",
                description: "Put an AI use case on trial before deciding whether it is responsible.",
                checklist: ["CASE — What happened?", "PEOPLE — Who is affected?", "RISK — What harm, bias, deception, or unfairness could result?", "CONSENT — Did affected people agree to this use when consent matters?", "OWNERSHIP — Are someone else's words, image, voice, or creative work involved?", "ACCOUNTABILITY — Who must review and take responsibility for the final decision?"]
            },
            look: ["Ethics Court cases", "Case files can include an AI-generated deepfake of a classmate, a cloned teacher voice, biased ranking, AI-generated misinformation, or reuse of creative work without appropriate permission or attribution.", "The point is not to memorize one answer. It is to identify the ethical questions that should be asked before acting."],
            tryIt: ["Run an Ethics Court", "Choose one case: deepfake, voice clone, biased recommendation, misinformation post, or AI-generated creative work. Identify the people affected and argue what safeguards are needed.", "Then make a verdict: responsible as-is, responsible only with safeguards, or not appropriate."],
            quiz: {
                question: "A realistic AI-generated video shows a classmate saying something they never said. What is the most important first ethical concern?",
                options: [
                    "Whether the video quality is convincing.",
                    "Potential deception, harm, and lack of consent involving the person represented.",
                    "Whether the AI tool was free to use."
                ],
                correct: 1,
                feedback: "Synthetic media can affect reputation, consent, trust, and safety. Realistic output does not make the use ethical."
            },
            reflect: ["Reflect", "Have you ever shared an AI-generated image, claim, or joke without thinking about the person or group represented? What could you check next time?"],
            apply: ["Apply", "Create a five-question ethical checkpoint you could use before posting or submitting AI-generated content involving other people."],
            takeaway: ["Key takeaway", "Ethical AI use is about consequences as well as capabilities. Ask who is affected, whether the use is fair and truthful, whether consent or ownership matters, and who is accountable."],
            teacherLens: "Use short case discussions instead of only definitions. Let learners defend different safeguards, then require them to justify their position using fairness, consent, truthfulness, ownership, and accountability."
        },
        7: {
            title: "AI as a Learning Partner",
            domain: "Responsible AI-Supported Learning",
            tagline: "Use AI in ways that leave you more capable after the interaction.",
            objectives: [
                "Use AI for explanation, practice, feedback, brainstorming, organization, and review without replacing personal thinking.",
                "Ask purposeful learning-focused prompts and follow up with questions instead of stopping at the first answer.",
                "Combine critical evaluation, verification, integrity, privacy, and ethics in one repeatable learning routine.",
                "Create learning outputs that reflect the student's own understanding, decisions, and responsibility."
            ],
            miniModules: [
                ["UNDERSTAND", "AI as Tutor, Not Answer Machine", "AI is most useful for learning when it explains, asks questions, gives examples, challenges reasoning, or provides feedback rather than simply supplying a final answer."],
                ["UNDERSTAND", "Ask Better Learning Questions", "A strong prompt states the topic, what you already understand, where you are confused, and what kind of help would make you think."],
                ["APPLY", "THE AI WISE METHOD", "ASK a clear learning-focused question → THINK about the response yourself → CHECK the reasoning → VERIFY important information with reliable sources → IMPROVE your own work → OWN the final work as your understanding."],
                ["CREATE", "THINK → ASK → QUESTION → VERIFY → CREATE → REFLECT", "Turn AI use into a learning cycle: think first, ask for targeted help, question the response, verify what matters, create your own output, and reflect on what you actually learned."]
            ],
            tool: {
                name: "AI WISE Learning Routine",
                description: "A repeatable routine for responsible AI-supported learning.",
                checklist: ["ASK — Ask a clear, learning-focused question.", "THINK — Process the response yourself.", "CHECK — Examine the reasoning and fit with the task.", "VERIFY — Confirm important claims with reliable sources.", "IMPROVE — Revise your own work using what you learned.", "OWN — Take responsibility for the final work and your understanding."]
            },
            look: ["Scenario", "Student A asks AI to complete the assignment and submits the answer. Student B explains what they already understand, asks for help with one difficult part, answers follow-up questions, verifies key information, and then creates the final response independently.", "Both students used AI, but only one used it as a learning partner."],
            tryIt: ["Build a tutor prompt", "Choose a topic you are currently studying. Tell AI what you understand, what is confusing, and ask it to teach through hints or questions rather than giving the final answer.", "Then follow THINK → ASK → QUESTION → VERIFY → CREATE → REFLECT and record what changed in your understanding."],
            quiz: {
                question: "Which sequence best represents responsible AI-supported learning?",
                options: [
                    "Ask → copy → submit.",
                    "Think → ask → question → verify → create → reflect.",
                    "Ask repeatedly until AI gives the answer you want."
                ],
                correct: 1,
                feedback: "Responsible AI-supported learning keeps the learner active before, during, and after the AI interaction."
            },
            reflect: ["Reflect", "After using AI, can you explain the idea without the chatbot? If not, what additional learning step do you need?"],
            apply: ["Apply", "Use the AI WISE Learning Routine on a real school topic. Save your original idea, the AI support you requested, what you verified, and the final work you created yourself."],
            takeaway: ["Key takeaway", "AI should amplify your learning, not replace it. The strongest outcome is not a faster answer—it is better understanding, better judgment, and work you can genuinely own."],
            teacherLens: "Design AI-supported activities where students must show their thinking: initial attempt, prompt, AI feedback, verification step, revision, and reflection. Assess the learning process as well as the final output."
        }
    };


    const moduleMissions = {
        1: [
            {
                title: "Mission: AI or ordinary automation?",
                scenario: "A calculator follows fixed mathematical rules. A photo app automatically groups similar faces. Are both examples of AI?",
                task: "Identify which system is more likely using AI and explain what pattern recognition or prediction is happening.",
                move: "The calculator is mainly rule-based. Face grouping commonly uses AI-based pattern recognition. The important habit is to ask what the system is actually doing, not simply whether it feels 'smart.'"
            },
            {
                title: "Mission: Keep the human in control",
                scenario: "You ask AI to choose your research topic, decide your position, write the outline, and draft the conclusion.",
                task: "Which parts could AI support without taking over your academic decisions?",
                move: "AI can help brainstorm options, compare possible topics, or critique an outline. You should still choose the topic, decide your position, and own the final reasoning."
            }
        ],
        2: [
            {
                title: "Mission: The confident statistic",
                scenario: "An AI answer says, '87% of Filipino students use AI every day,' but gives no source.",
                task: "Use the WISE Output Check. Which parts of the statement require attention?",
                move: "Accuracy and Evidence immediately need checking. Completeness also matters: which students, what year, what study, and what does 'use AI' mean?"
            },
            {
                title: "Mission: Useful but incomplete",
                scenario: "AI explains a controversial issue using only one side of the debate and presents it as settled.",
                task: "Which WISE lenses reveal the problem?",
                move: "Bias and Completeness are central, but Logic and Evidence may also matter. A useful evaluation looks for missing perspectives and the quality of support."
            }
        ],
        3: [
            {
                title: "Mission: The perfect-looking citation",
                scenario: "AI provides an author, journal title, volume, issue, and DOI. The DOI does not resolve and the article cannot be found.",
                task: "What is your next VERIFY step?",
                move: "Treat the reference as unverified. Search the exact title, author, journal, and DOI independently. If you cannot locate the source, do not cite it."
            },
            {
                title: "Mission: Real source, wrong claim",
                scenario: "The source exists, but the article discusses a different population and never states the number AI quoted.",
                task: "Can the source still support the claim?",
                move: "No. A credible source only helps if it actually supports the specific statement, context, and population you are using."
            }
        ],
        4: [
            {
                title: "Mission: Tutor or ghostwriter?",
                scenario: "For a reflection task, one student asks AI for three questions that help organize their thoughts. Another asks AI to write the reflection.",
                task: "Place both uses on the AI Assistance Spectrum.",
                move: "The first use is closer to learning support. The second risks substitution because AI is producing the personal thinking the task is meant to assess."
            },
            {
                title: "Mission: Allowed in one task, not another",
                scenario: "Your teacher allows AI for brainstorming in a project but prohibits it during an individual written assessment.",
                task: "Why can the same tool be acceptable in one situation and not the other?",
                move: "Academic integrity depends on the purpose and rules of the task. Responsible use follows the specific assessment conditions, not a single rule for every activity."
            }
        ],
        5: [
            {
                title: "Mission: Class record upload",
                scenario: "You want AI to find patterns in class performance, so you are about to upload names, grades, contact numbers, and teacher comments.",
                task: "Run the Prompt Privacy Scanner before uploading.",
                move: "Most identifying details are unnecessary. Use anonymized labels and only the information needed for the analysis. Protect other people's personal data."
            },
            {
                title: "Mission: Photo of an ID",
                scenario: "An AI tool asks for a sample ID so it can help design a school form. You plan to upload your real student ID.",
                task: "What safer alternative can accomplish the task?",
                move: "Use a fictional or redacted sample with fake names and numbers. The tool needs the format, not your real identifying information."
            }
        ],
        6: [
            {
                title: "Mission: Voice clone prank",
                scenario: "A student clones a teacher's voice and posts a fake announcement as a joke.",
                task: "Use the Ethics Court: who is affected and what risks appear?",
                move: "Consent, deception, trust, reputation, and accountability are central concerns. Realistic synthetic media can cause harm even when the creator calls it a joke."
            },
            {
                title: "Mission: AI image of a classmate",
                scenario: "A classmate's face is used in an AI-generated image without asking them, then shared in a group chat.",
                task: "What questions should be asked before sharing?",
                move: "Consider consent, dignity, possible harm, context, and whether the person would reasonably expect or agree to this use of their likeness."
            }
        ],
        7: [
            {
                title: "Mission: Turn an answer prompt into a tutor prompt",
                scenario: "Original prompt: 'Write my 500-word essay about renewable energy.'",
                task: "Rewrite it so AI supports learning without replacing your work.",
                move: "Example: 'I am writing about renewable energy. Ask me three questions to help form my position, explain any concept I misunderstand, then give feedback on my outline without writing the essay for me.'"
            },
            {
                title: "Mission: Can you explain it without AI?",
                scenario: "AI helped you solve a difficult problem, but after closing the chatbot you cannot explain why the answer works.",
                task: "Which part of the AI WISE routine is still incomplete?",
                move: "THINK, CHECK, and OWN need more work. Ask for a simpler explanation or practice problem, then explain the reasoning yourself before considering the learning complete."
            },
            {
                title: "CAPSTONE: One task, all seven domains",
                scenario: "You are preparing a research presentation with AI. The chatbot gives a useful outline, one questionable statistic, a source you cannot find, and suggests uploading a class spreadsheet for analysis. You also want to use an AI-generated image based on a classmate's photo.",
                task: "Use all seven domains to decide what you will keep, verify, change, protect, disclose, and create yourself.",
                move: "Understand what AI did; evaluate the output; verify the statistic and source; follow academic-integrity rules; do not upload unnecessary personal data; consider consent and ethical effects of the image; then use AI only as a learning partner while you own the final presentation."
            }
        ]
    };


    const moduleEvidence = {
        1: [
            ["UNESCO, 2024", "AI Competency Framework for Students", "https://www.unesco.org/en/articles/ai-competency-framework-students"],
            ["Long & Magerko, 2020", "What is AI Literacy? Competencies and Design Considerations", "https://doi.org/10.1145/3313831.3376727"],
            ["Ng et al., 2021", "Conceptualizing AI Literacy", "https://www.sciencedirect.com/science/article/pii/S2666920X21000357"]
        ],
        2: [
            ["UNESCO, 2024", "AI Competency Framework for Students", "https://www.unesco.org/en/articles/ai-competency-framework-students"],
            ["UNESCO, 2023", "Guidance for Generative AI in Education and Research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
            ["Ng et al., 2021", "Conceptualizing AI Literacy", "https://www.sciencedirect.com/science/article/pii/S2666920X21000357"]
        ],
        3: [
            ["UNESCO, 2023", "Guidance for Generative AI in Education and Research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
            ["Long & Magerko, 2020", "What is AI Literacy? Competencies and Design Considerations", "https://doi.org/10.1145/3313831.3376727"]
        ],
        4: [
            ["UNESCO, 2023", "Guidance for Generative AI in Education and Research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
            ["DepEd, 2026", "Foundational Guidelines on AI in Basic Education", "https://www.deped.gov.ph/category/issuances/page/9/"]
        ],
        5: [
            ["Republic Act No. 10173", "Data Privacy Act of 2012", "https://privacy.gov.ph/data-privacy-act/"],
            ["UNESCO, 2023", "Guidance for Generative AI in Education and Research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"]
        ],
        6: [
            ["UNESCO, 2024", "AI Competency Framework for Students", "https://www.unesco.org/en/articles/ai-competency-framework-students"],
            ["UNESCO, 2023", "Guidance for Generative AI in Education and Research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
            ["DepEd, 2026", "Foundational Guidelines on AI in Basic Education", "https://www.deped.gov.ph/category/issuances/page/9/"]
        ],
        7: [
            ["UNESCO, 2024", "AI Competency Framework for Students", "https://www.unesco.org/en/articles/ai-competency-framework-students"],
            ["UNESCO, 2024", "AI Competency Framework for Teachers", "https://www.unesco.org/en/articles/ai-competency-framework-teachers"],
            ["DepEd, 2026", "Foundational Guidelines on AI in Basic Education", "https://www.deped.gov.ph/category/issuances/page/9/"]
        ]
    };


    const teacherGuide = {
        1: {
            time: "35–45 minutes",
            prep: ["Project the toolkit or let learners use individual devices.", "Prepare two familiar AI examples and two ordinary rule-based tools.", "Avoid requiring students to create accounts on external AI platforms just for this lesson."],
            launch: "Ask learners to name tools they think use AI. Do not correct them immediately; collect the examples first, then examine what each system appears to predict, recognize, or generate.",
            facilitate: "Use the AI-or-automation sorter, then ask learners to justify each classification. Emphasize capability versus understanding and identify which decisions remain human.",
            lookFor: ["Learners explain AI using more than the word 'smart'.", "Learners distinguish pattern-based prediction/generation from fixed instructions.", "Learners identify human goals, judgment, and responsibility."],
            exit: "Name one AI-enabled tool, one limitation it may have, and one decision the user must still make."
        },
        2: {
            time: "40–50 minutes",
            prep: ["Prepare one polished but imperfect AI response.", "Include at least one unsupported factual claim and one incomplete or one-sided statement.", "Keep the example appropriate for Senior High School learners."],
            launch: "Show a confident-looking AI paragraph and ask: 'What makes an answer look trustworthy?' Then separate presentation quality from evidence quality.",
            facilitate: "Run the Output Detective and WISE Output Check. Ask groups to label individual claims rather than rating the whole response as simply good or bad.",
            lookFor: ["Learners identify unsupported or overconfident claims.", "Learners use specific lenses such as accuracy, completeness, bias, logic, and evidence.", "Learners can keep useful parts while rejecting or revising weak parts."],
            exit: "Choose one WISE lens and explain how it could prevent a mistake in schoolwork."
        },
        3: {
            time: "40–55 minutes",
            prep: ["Prepare a real source, a fabricated-looking citation, and a real source that does not support the attached claim.", "Open reliable search or library tools in advance if internet access is available.", "Remind students that a real source can still be irrelevant to the exact claim."],
            launch: "Ask: 'If a citation looks academic, is that enough?' Let learners explain what they normally do after AI gives a reference.",
            facilitate: "Model VERIFY step by step, then use Citation Investigation. Require learners to distinguish 'source exists' from 'source supports this exact claim.'",
            lookFor: ["Learners locate or attempt to locate original evidence.", "Learners inspect author, publisher, date, context, and exact support.", "Learners can say 'unverified' instead of forcing a yes/no conclusion."],
            exit: "Complete the sentence: 'I will not cite an AI-provided source until I have…'"
        },
        4: {
            time: "35–45 minutes",
            prep: ["State the AI rules for the activity before students begin.", "Prepare examples across learning support, guided help, major contribution, and substitution.", "Clarify that school and teacher instructions determine what is permitted."],
            launch: "Present two students who both used AI but in different ways. Ask which student still demonstrates the intended learning and why.",
            facilitate: "Use the AI Assistance Spectrum. Keep discussion focused on the purpose of the task, authorship, transparency, and what the learner still understands and creates.",
            lookFor: ["Learners refer to the task's purpose rather than only asking whether AI was used.", "Learners distinguish feedback/tutoring from replacement of assessed work.", "Learners mention disclosure or permission when required."],
            exit: "Rewrite one shortcut prompt so AI becomes a tutor, reviewer, or practice partner."
        },
        5: {
            time: "35–45 minutes",
            prep: ["Use fictional or synthetic student records only.", "Do not ask learners to paste real IDs, phone numbers, medical data, passwords, or confidential school records.", "Review the Prompt Privacy Scanner before class."],
            launch: "Show a school-related prompt containing unnecessary names, contact details, and grades. Ask which details the AI truly needs.",
            facilitate: "Use the local Prompt Privacy Scanner and model data minimization. Have learners replace identifiers with labels such as Student A and remove details unrelated to the task.",
            lookFor: ["Learners identify personal or third-party data.", "Learners remove information that is not necessary for the learning goal.", "Learners explain why anonymization reduces exposure but does not remove the need for judgment."],
            exit: "Give one rule you will follow before pasting or uploading information into an AI tool."
        },
        6: {
            time: "40–50 minutes",
            prep: ["Prepare age-appropriate cases involving bias, synthetic media, consent, misinformation, or ownership.", "Avoid using humiliating or personally targeted examples from the class.", "Set discussion norms so learners critique the AI use rather than attack people."],
            launch: "Present the cloned-teacher-voice case and ask learners to list everyone affected before they decide whether the use is acceptable.",
            facilitate: "Run Ethics Court. Require students to discuss stakeholders, risks, consent, ownership, truthfulness, and accountability before making a verdict.",
            lookFor: ["Learners identify indirect as well as direct stakeholders.", "Learners connect realistic synthetic media with deception and consent concerns.", "Learners propose safeguards rather than relying only on personal preference."],
            exit: "Before sharing AI-generated content involving another person, what three questions should you ask?"
        },
        7: {
            time: "45–60 minutes",
            prep: ["Choose a real curriculum topic learners are currently studying.", "Prepare an example answer-machine prompt and a learning-focused tutor prompt.", "Plan how students will show their own thinking before and after AI support."],
            launch: "Ask learners: 'If AI gives you the correct answer but you cannot explain it afterward, did learning happen?'",
            facilitate: "Use the AI WISE cycle, then have learners transform an answer-seeking prompt into a tutor prompt. Finish with the integrated capstone linking all seven domains.",
            lookFor: ["Learners think before prompting instead of beginning with AI.", "Learners verify important information and revise their own work.", "Learners can explain what they learned without depending on the chatbot.", "Learners take responsibility for the final product."],
            exit: "Explain one way you can tell whether AI made you more capable rather than merely faster."
        }
    };


    function getSignatureActivityHtml(moduleNumber) {
        const activities = {
            1: `
                <div class="signature-lab signature-sorter" data-signature="1">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>AI or ordinary automation?</strong>
                        <p>Classify each everyday system. You get feedback immediately.</p>
                    </div>
                    <div class="sorter-list">
                        <article data-answer="rule">
                            <div><small>SYSTEM 01</small><strong>Basic calculator</strong><p>Follows fixed mathematical operations.</p></div>
                            <div class="sorter-actions"><button data-choice="ai">AI-enabled</button><button data-choice="rule">Rule-based</button></div>
                            <em></em>
                        </article>
                        <article data-answer="ai">
                            <div><small>SYSTEM 02</small><strong>Photo app that groups similar faces</strong><p>Recognizes visual patterns across photos.</p></div>
                            <div class="sorter-actions"><button data-choice="ai">AI-enabled</button><button data-choice="rule">Rule-based</button></div>
                            <em></em>
                        </article>
                        <article data-answer="ai">
                            <div><small>SYSTEM 03</small><strong>Video recommendation feed</strong><p>Predicts content you may watch next.</p></div>
                            <div class="sorter-actions"><button data-choice="ai">AI-enabled</button><button data-choice="rule">Rule-based</button></div>
                            <em></em>
                        </article>
                        <article data-answer="rule">
                            <div><small>SYSTEM 04</small><strong>Alarm set for 6:00 AM</strong><p>Triggers at a time selected by the user.</p></div>
                            <div class="sorter-actions"><button data-choice="ai">AI-enabled</button><button data-choice="rule">Rule-based</button></div>
                            <em></em>
                        </article>
                    </div>
                    <div class="signature-result" aria-live="polite">Classify all four systems.</div>
                </div>
            `,
            2: `
                <div class="signature-lab signature-inspector" data-signature="2">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>Output Detective</strong>
                        <p>Click the parts of this AI response that deserve extra scrutiny.</p>
                    </div>
                    <div class="output-sample">
                        <button data-note="This is a broad explanatory statement. It may be useful, but context still matters.">AI can help students brainstorm ideas and organize information.</button>
                        <button class="risky" data-note="Unsupported statistic: the percentage, population, year, and source must be verified.">Studies show that 87% of Filipino students use AI every day.</button>
                        <button class="risky" data-note="Overgeneralization: 'always' is a warning sign, and the statement presents no evidence.">AI-generated summaries are always accurate when the prompt is detailed.</button>
                        <button data-note="This is a recommendation rather than a factual claim. Ask whether it fits the task and school rules.">Students should review important information before submitting schoolwork.</button>
                    </div>
                    <div class="inspector-panel">
                        <span>INSPECTOR NOTE</span>
                        <p id="inspectorNote">Select a sentence to inspect its accuracy, evidence, logic, or framing.</p>
                    </div>
                </div>
            `,
            3: `
                <div class="signature-lab signature-citation" data-signature="3">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>Citation Investigation</strong>
                        <p>Run VERIFY on three AI-generated references and decide whether each one can support your work.</p>
                    </div>
                    <div class="citation-cases">
                        <article data-verdict="reject">
                            <small>CASE A</small><strong>Article title looks academic, but the DOI does not resolve.</strong>
                            <p>AI supplies a journal, author, year, volume, and DOI.</p>
                            <button type="button">Run VERIFY</button><em></em>
                        </article>
                        <article data-verdict="reject">
                            <small>CASE B</small><strong>The source exists, but it never states the number AI quoted.</strong>
                            <p>The publication is credible, but the evidence does not match the claim.</p>
                            <button type="button">Run VERIFY</button><em></em>
                        </article>
                        <article data-verdict="use">
                            <small>CASE C</small><strong>The original source is accessible and directly supports the claim.</strong>
                            <p>Author, date, publisher, context, and exact statement have been checked.</p>
                            <button type="button">Run VERIFY</button><em></em>
                        </article>
                    </div>
                </div>
            `,
            4: `
                <div class="signature-lab signature-spectrum" data-signature="4">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>AI Assistance Spectrum</strong>
                        <p>Place each school use where it best fits. Always remember that actual teacher and school rules control what is allowed.</p>
                    </div>
                    <div class="spectrum-key"><span>Support</span><span>Guided help</span><span>Major contribution</span><span>Substitution</span></div>
                    <div class="spectrum-cases">
                        <article data-answer="support"><strong>Ask AI to quiz you on a lesson you already studied.</strong><div></div><em></em></article>
                        <article data-answer="guided"><strong>Ask AI to give feedback on an outline you wrote.</strong><div></div><em></em></article>
                        <article data-answer="substitution"><strong>Ask AI to write your personal reflection and submit it.</strong><div></div><em></em></article>
                    </div>
                    <div class="signature-result" aria-live="polite">Classify the three examples.</div>
                </div>
            `,
            5: `
                <div class="signature-lab signature-privacy" data-signature="5">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>Prompt Privacy Scanner</strong>
                        <p>Paste or edit a sample prompt. The scanner runs locally in your browser and does not send the text anywhere.</p>
                    </div>
                    <textarea id="privacyScannerInput" rows="6">Analyze our class performance. Student Maria Santos has student ID 2026-14891, phone number 0917-555-0182, and a grade of 72. Tell me why she is struggling.</textarea>
                    <div class="privacy-actions">
                        <button type="button" id="runPrivacyScan">Scan prompt</button>
                        <button type="button" id="loadSafePrompt">Show safer version</button>
                    </div>
                    <div class="privacy-result" id="privacyScanResult" aria-live="polite">
                        Scan the prompt to identify unnecessary personal information.
                    </div>
                </div>
            `,
            6: `
                <div class="signature-lab signature-ethics" data-signature="6">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>Ethics Court</strong>
                        <p>Judge a synthetic-media case using people, risks, consent, and accountability.</p>
                    </div>
                    <div class="ethics-case">
                        <span>CASE FILE</span>
                        <strong>A student clones a teacher's voice and posts a fake class suspension announcement.</strong>
                    </div>
                    <div class="ethics-stakeholders">
                        <small>WHO IS AFFECTED? Select all that matter.</small>
                        <button type="button">Teacher</button><button type="button">Students</button><button type="button">School</button><button type="button">Online audience</button>
                    </div>
                    <div class="ethics-verdicts">
                        <button type="button" data-verdict="safe">Responsible as-is</button>
                        <button type="button" data-verdict="safeguards">Only with safeguards</button>
                        <button type="button" data-verdict="not-appropriate">Not appropriate in this form</button>
                    </div>
                    <div class="signature-result" id="ethicsResult" aria-live="polite">Select stakeholders, then give your verdict.</div>
                </div>
            `,
            7: `
                <div class="signature-lab signature-wise" data-signature="7">
                    <div class="signature-head">
                        <span>SIGNATURE ACTIVITY</span>
                        <strong>Build the AI WISE learning cycle</strong>
                        <p>Complete the six steps in sequence. The goal is to keep the learner active throughout the AI interaction.</p>
                    </div>
                    <div class="wise-flow">
                        <button type="button" data-order="1"><span>01</span><strong>ASK</strong><small>Ask a learning-focused question.</small></button>
                        <button type="button" data-order="2"><span>02</span><strong>THINK</strong><small>Process the response yourself.</small></button>
                        <button type="button" data-order="3"><span>03</span><strong>CHECK</strong><small>Examine reasoning and fit.</small></button>
                        <button type="button" data-order="4"><span>04</span><strong>VERIFY</strong><small>Confirm important information.</small></button>
                        <button type="button" data-order="5"><span>05</span><strong>IMPROVE</strong><small>Revise your own work.</small></button>
                        <button type="button" data-order="6"><span>06</span><strong>OWN</strong><small>Take responsibility for the final work.</small></button>
                    </div>
                    <div class="signature-result" id="wiseResult" aria-live="polite">Start with ASK.</div>
                </div>
            `
        };

        return activities[moduleNumber] || "";
    }

    function initSignatureActivity(moduleNumber) {
        const lab = moduleLessonContent?.querySelector(
            '[data-signature="' + moduleNumber + '"]'
        );
        if (!lab) return;

        if (moduleNumber === 1) {
            const cards = lab.querySelectorAll(".sorter-list article");
            cards.forEach(card => {
                card.querySelectorAll("button").forEach(button => {
                    button.addEventListener("click", () => {
                        const correct = button.dataset.choice === card.dataset.answer;
                        card.querySelectorAll("button").forEach(btn => btn.disabled = true);
                        button.classList.add(correct ? "correct" : "wrong");
                        card.querySelector("em").textContent = correct
                            ? "Correct — focus on whether the system predicts, recognizes patterns, or generates."
                            : "Try the idea again: fixed instructions alone do not automatically make a system AI.";
                        card.classList.add("answered");
                        const done = [...cards].filter(item => item.classList.contains("answered")).length;
                        lab.querySelector(".signature-result").textContent =
                            done === cards.length
                                ? "Sorter complete. The important habit is explaining why you classified each system."
                                : done + " of " + cards.length + " classified.";
                    });
                });
            });
        }

        if (moduleNumber === 2) {
            const note = lab.querySelector("#inspectorNote");
            lab.querySelectorAll(".output-sample button").forEach(sentence => {
                sentence.addEventListener("click", () => {
                    lab.querySelectorAll(".output-sample button")
                        .forEach(item => item.classList.remove("selected"));
                    sentence.classList.add("selected");
                    note.textContent = sentence.dataset.note;
                });
            });
        }

        if (moduleNumber === 3) {
            lab.querySelectorAll(".citation-cases article").forEach(card => {
                card.querySelector("button").addEventListener("click", () => {
                    const usable = card.dataset.verdict === "use";
                    card.classList.add(usable ? "usable" : "rejected");
                    card.querySelector("em").textContent = usable
                        ? "VERIFIED: the original evidence can support the claim."
                        : "NOT VERIFIED: do not rely on this reference for the claim as presented.";
                });
            });
        }

        if (moduleNumber === 4) {
            const labels = [
                ["support", "Support"],
                ["guided", "Guided help"],
                ["major", "Major contribution"],
                ["substitution", "Substitution"]
            ];
            const cards = lab.querySelectorAll(".spectrum-cases article");

            cards.forEach(card => {
                const target = card.querySelector("div");
                labels.forEach(([value, label]) => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.dataset.choice = value;
                    btn.textContent = label;
                    target.appendChild(btn);
                });

                target.querySelectorAll("button").forEach(button => {
                    button.addEventListener("click", () => {
                        const correct = button.dataset.choice === card.dataset.answer;
                        target.querySelectorAll("button").forEach(btn => btn.disabled = true);
                        button.classList.add(correct ? "correct" : "wrong");
                        card.querySelector("em").textContent = correct
                            ? "Good classification."
                            : "Look again at how much of the learner's assessed thinking AI is doing.";
                        card.classList.add("answered");

                        const done = [...cards].filter(item => item.classList.contains("answered")).length;
                        lab.querySelector(".signature-result").textContent =
                            done === cards.length
                                ? "Spectrum complete. Actual acceptability still depends on the teacher's instructions and purpose of the task."
                                : done + " of " + cards.length + " classified.";
                    });
                });
            });
        }

        if (moduleNumber === 5) {
            const input = lab.querySelector("#privacyScannerInput");
            const result = lab.querySelector("#privacyScanResult");

            lab.querySelector("#runPrivacyScan")?.addEventListener("click", () => {
                const text = input.value;
                const checks = [
                    { label: "possible phone number", pattern: /(?:\+?63|0)9\d{2}[\s-]?\d{3}[\s-]?\d{4}/i },
                    { label: "possible student/ID number", pattern: /(?:student\s*id|id)\s*[:#-]?\s*[a-z0-9-]{5,}/i },
                    { label: "named individual", pattern: /student\s+[A-Z][a-z]+\s+[A-Z][a-z]+/ },
                    { label: "academic record or grade", pattern: /\bgrade\b|\bscore\b|\bGPA\b/i },
                    { label: "email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
                    { label: "address or location detail", pattern: /\baddress\b|\bhome address\b/i }
                ];

                const found = checks
                    .filter(check => check.pattern.test(text))
                    .map(check => check.label);

                result.className = "privacy-result " + (found.length ? "risk" : "clear");
                result.textContent = found.length
                    ? "Scanner found " + found.length + " possible privacy risk(s): " +
                      found.join(", ") +
                      ". Remove or generalize details the task does not need."
                    : "No obvious identifiers were detected by this simple local scanner. Still review the prompt yourself before sharing it.";
            });

            lab.querySelector("#loadSafePrompt")?.addEventListener("click", () => {
                input.value =
                    "Analyze this anonymized class-performance example. Student A received a low score. Suggest general learning-support questions a teacher could consider without identifying the student.";
                result.className = "privacy-result clear";
                result.textContent =
                    "Safer version loaded: it keeps the educational purpose while removing unnecessary identifying details.";
            });
        }

        if (moduleNumber === 6) {
            const result = lab.querySelector("#ethicsResult");
            lab.querySelectorAll(".ethics-stakeholders button").forEach(button => {
                button.addEventListener("click", () => {
                    button.classList.toggle("selected");
                });
            });

            lab.querySelectorAll(".ethics-verdicts button").forEach(button => {
                button.addEventListener("click", () => {
                    lab.querySelectorAll(".ethics-verdicts button")
                        .forEach(btn => btn.classList.remove("selected"));
                    button.classList.add("selected");

                    const selectedStakeholders =
                        lab.querySelectorAll(".ethics-stakeholders button.selected").length;

                    if (!selectedStakeholders) {
                        result.textContent =
                            "Before giving a verdict, identify who may be affected.";
                        return;
                    }

                    result.textContent = button.dataset.verdict === "not-appropriate"
                        ? "Strong verdict for this case: the fake announcement relies on deception and a real person's cloned voice without appropriate consent. Human accountability still matters."
                        : "Consider the risks again: realistic impersonation, deception, consent, trust, and possible harm make this case difficult to justify in its current form.";
                });
            });
        }

        if (moduleNumber === 7) {
            const buttons = lab.querySelectorAll(".wise-flow button");
            const result = lab.querySelector("#wiseResult");
            let expected = 1;

            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const order = Number(button.dataset.order);

                    if (order !== expected) {
                        result.textContent =
                            "Try the sequence in order. The next step is " +
                            buttons[expected - 1].querySelector("strong").textContent + ".";
                        return;
                    }

                    button.classList.add("done");
                    button.disabled = true;
                    expected += 1;

                    result.textContent = expected > buttons.length
                        ? "AI WISE cycle complete. The final output remains yours to understand, verify, improve, and own."
                        : "Good. Next: " +
                          buttons[expected - 1].querySelector("strong").textContent + ".";
                });
            });
        }
    }

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

    function shuffledChoices(options) {
        const choices = options.map((option, originalIndex) => ({
            option,
            originalIndex
        }));

        for (let i = choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }

        return choices;
    }

    function renderChallenge() {
        if (!challengeAnswers) return;

        const data = challengeCases[currentChallenge];

        if (challengeDomain) challengeDomain.textContent = data.domain;
        if (challengeScenario) challengeScenario.textContent = data.scenario;
        if (challengeQuestion) challengeQuestion.textContent = data.question;
        if (challengeCounter) {
            challengeCounter.textContent =
                "Case " + (currentChallenge + 1) + " of " + challengeCases.length;
        }
        if (feedback) feedback.innerHTML = "";

        const challengeChoices = shuffledChoices(data.options);

        challengeAnswers.innerHTML = challengeChoices.map(choice => `
            <button class="answer-btn" type="button" data-index="${choice.originalIndex}">
                ${choice.option}
            </button>
        `).join("");

        challengeAnswers.querySelectorAll(".answer-btn").forEach(button => {
            button.addEventListener("click", () => {
                const selected = Number(button.dataset.index);
                const buttons = challengeAnswers.querySelectorAll(".answer-btn");

                buttons.forEach(answer => {
                    answer.disabled = true;
                    if (Number(answer.dataset.index) === data.correct) {
                        answer.classList.add("challenge-correct");
                    }
                });

                if (selected !== data.correct) {
                    button.classList.add("challenge-wrong");
                }

                if (feedback) {
                    feedback.innerHTML =
                        (selected === data.correct
                            ? "<strong>✓ Good decision.</strong><br>"
                            : "<strong>Not quite.</strong><br>") +
                        data.feedback;
                }
            });
        });
    }

    function trapFocusInside(event, modal) {
        if (event.key !== "Tab" || !modal) return;

        const focusable = [...modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        )].filter(element => {
            const style = window.getComputedStyle(element);
            return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                element.getAttribute("aria-hidden") !== "true"
            );
        });

        if (!focusable.length) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        } else if (!modal.contains(active)) {
            event.preventDefault();
            first.focus();
        }
    }

    function openChallenge() {
        if (!challengeModal) return;
        previouslyFocusedElement = document.activeElement;
        renderChallenge();
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

    nextChallenge?.addEventListener("click", () => {
        currentChallenge = (currentChallenge + 1) % challengeCases.length;
        renderChallenge();
    });

    challengeModal?.addEventListener("click", event => {
        if (event.target === challengeModal) closeChallenge();
    });


    const readinessNames = [
        "Basic AI Understanding",
        "Evaluation of AI-Generated Outputs",
        "Source Verification",
        "Academic Integrity",
        "Data Privacy",
        "Ethical Awareness",
        "Responsible AI-Supported Learning"
    ];

    let readinessState = JSON.parse(
        localStorage.getItem("aiToolkitReadiness") || "{}"
    );

    function updateReadinessResult() {
        if (!readinessResult) return;

        const answered = Object.keys(readinessState).length;

        if (answered < 7) {
            readinessResult.textContent =
                "You have answered " + answered + " of 7 statements. Your choices stay on this device.";
            return;
        }

        const weakest = Object.entries(readinessState)
            .sort((a, b) => Number(a[1]) - Number(b[1]))
            .slice(0, 2)
            .map(([domain]) => readinessNames[Number(domain) - 1]);

        readinessResult.innerHTML =
            "<strong>Suggested focus:</strong> " +
            weakest.join(" and ") +
            ". This is only a personal learning guide, not a research score.";
    }

    readinessItems.forEach(item => {
        const domain = item.dataset.readiness;

        item.querySelectorAll("button").forEach(button => {
            const level = Number(button.dataset.level);

            const isSelected = Number(readinessState[domain]) === level;
            button.classList.toggle("selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));

            button.addEventListener("click", () => {
                readinessState[domain] = level;
                localStorage.setItem(
                    "aiToolkitReadiness",
                    JSON.stringify(readinessState)
                );

                item.querySelectorAll("button").forEach(btn => {
                    const isSelected = btn === button;
                    btn.classList.toggle("selected", isSelected);
                    btn.setAttribute("aria-pressed", String(isSelected));
                });

                updateReadinessResult();
            });
        });
    });

    updateReadinessResult();

    resetToolkitBtn?.addEventListener("click", () => {
        const confirmed = window.confirm(
            "Reset this toolkit on this browser?\n\n" +
            "This will remove saved module progress, readiness choices, reflections, " +
            "application drafts, capstone response, and the last-opened module. " +
            "This action cannot be undone."
        );

        if (!confirmed) return;

        toolkitStorageKeys.forEach(key => localStorage.removeItem(key));
        window.location.reload();
    });

    function getResumeModule() {
        const saved = Number(localStorage.getItem("aiToolkitLastModule") || 0);

        if (saved >= 1 && saved <= 7 && !completedModules.includes(saved)) {
            return saved;
        }

        for (let i = 1; i <= 7; i++) {
            if (!completedModules.includes(i)) return i;
        }

        return saved >= 1 && saved <= 7 ? saved : 7;
    }

    let completedModules = JSON.parse(
        localStorage.getItem("aiToolkitCompletedModules") || "[]"
    );

    function updateProgress() {
        completedModules = [...new Set(completedModules.map(Number))]
            .filter(n => n >= 1 && n <= 7);

        localStorage.setItem(
            "aiToolkitCompletedModules",
            JSON.stringify(completedModules)
        );

        const completed = completedModules.length;
        const percentage = Math.round((completed / 7) * 100);
        const resumeModule = getResumeModule();

        if (progressFill) progressFill.style.width = percentage + "%";
        if (progressPercentage) progressPercentage.textContent = percentage + "%";
        if (progressTitle) {
            progressTitle.textContent =
                completed + " of 7 modules completed";
        }

        if (progressMessage) {
            progressMessage.textContent =
                completed === 7
                    ? "Trail complete. Revisit any domain whenever you want to practice the tools again."
                    : "Next suggested stop: Module " + resumeModule + " — " +
                      modules[resumeModule].domain + ".";
        }

        document.querySelectorAll(".passport-stamps span")
            .forEach((stamp, index) => {
                stamp.classList.toggle(
                    "done",
                    completedModules.includes(index + 1)
                );
            });

        progressModuleButtons.forEach(button => {
            const number = Number(button.dataset.progressModule);
            const status = button.querySelector("em");
            const isDone = completedModules.includes(number);
            const isResume = number === resumeModule && !isDone;

            button.classList.toggle("complete", isDone);
            button.classList.toggle("current", isResume);

            if (status) {
                status.textContent = isDone
                    ? "Completed"
                    : isResume
                        ? "Continue here"
                        : "Not started";
            }
        });

        document.querySelectorAll(".module-card").forEach(card => {
            const number = Number(card.id.replace("module-", ""));
            const link = card.querySelector(".module-link");
            const isDone = completedModules.includes(number);

            card.classList.toggle("is-complete", isDone);
            card.classList.toggle(
                "is-current",
                number === resumeModule && !isDone
            );

            if (link) {
                link.innerHTML = isDone
                    ? 'Review module <span>↺</span>'
                    : number === resumeModule
                        ? 'Continue module <span>→</span>'
                        : 'Begin module <span>→</span>';
            }
        });

        if (continueLearningBtn) {
            continueLearningBtn.hidden = false;
            continueLearningBtn.dataset.module = resumeModule;
            continueLearningBtn.innerHTML =
                completed === 7
                    ? 'Review Module ' + resumeModule + ' <span>↺</span>'
                    : 'Continue Module ' + resumeModule + ' <span>→</span>';
        }

        if (progressResumeBtn) {
            progressResumeBtn.dataset.module = resumeModule;
            progressResumeBtn.innerHTML =
                completed === 7
                    ? 'Review a module <span>↺</span>'
                    : 'Continue Module ' + resumeModule + ' <span>→</span>';
        }

        if (completionPanel) {
            completionPanel.hidden = completed !== 7;
        }
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

        const missionHtml = `
            <div class="domain-mission">
                <span>WHY THIS DOMAIN MATTERS</span>
                <strong>${data.tagline}</strong>
                <p>Complete the mini-lessons, test the reusable tool, make a decision in the scenario, and create your own response before marking the module complete.</p>
            </div>
        `;

        const learnHtml = `
            <div class="mini-module-flow">
                ${data.miniModules.map((item, index) => `
                    <article class="mini-module-card">
                        <div class="mini-module-top">
                            <small>${item[0]}</small>
                            <span>${String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <strong>${item[1]}</strong>
                        <p>${item[2]}</p>
                    </article>
                `).join("")}
            </div>

            <div class="module-tool">
                <div class="module-tool-head">
                    <span>REUSABLE TOOL</span>
                    <strong>${data.tool.name}</strong>
                </div>
                <p>${data.tool.description}</p>
                <div class="interactive-checklist">
                    ${data.tool.checklist.map((item, index) => `
                        <button type="button" class="check-item" data-check="${index}">
                            <span class="check-box">✓</span>
                            <span>${item}</span>
                        </button>
                    `).join("")}
                </div>
            </div>
        `;

        const lookHtml = `
            <div class="lesson-case interactive-case">
                <span>${data.look[0]}</span>
                <strong>${data.look[1]}</strong>
                <button class="case-reveal-btn" type="button">Reveal the learning point</button>
                <p class="case-reveal" hidden>${data.look[2]}</p>
            </div>
        `;

        const tryHtml = `
            <div class="lesson-task">
                <span>Try it</span>
                <strong>${data.tryIt[0]}</strong>
                <p>${data.tryIt[1]}</p>
                <div class="try-action-board">
                    <button type="button" class="try-step">1. Notice</button>
                    <button type="button" class="try-step">2. Decide</button>
                    <button type="button" class="try-step">3. Explain</button>
                </div>
                <p class="try-hint">${data.tryIt[2]}</p>
            </div>
        `;

        const signatureActivityHtml = getSignatureActivityHtml(currentModule);

        const missionsHtml = `
            <div class="mission-grid">
                ${moduleMissions[currentModule].map((mission, index) => `
                    <article class="mission-card">
                        <div class="mission-head">
                            <span>MISSION ${String(index + 1).padStart(2, "0")}</span>
                            <b>↗</b>
                        </div>
                        <strong>${mission.title}</strong>
                        <p>${mission.scenario}</p>
                        <div class="mission-task">
                            <small>YOUR MOVE</small>
                            <p>${mission.task}</p>
                        </div>
                        <button type="button" class="mission-reveal">Reveal a strong response</button>
                        <div class="mission-answer" hidden>${mission.move}</div>
                    </article>
                `).join("")}
            </div>
        `;

        const quizChoices = shuffledChoices(data.quiz.options);

        const quizHtml = `
            <div class="quiz-box" data-correct="${data.quiz.correct}">
                <h4>${data.quiz.question}</h4>
                <div class="quiz-options">
                    ${quizChoices.map(choice => `
                        <button class="quiz-option" type="button" data-index="${choice.originalIndex}">${choice.option}</button>
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
                <label class="response-label" for="reflectResponse">Your reflection</label>
                <textarea id="reflectResponse" class="lesson-response" data-save="reflection"
                          rows="4" placeholder="Write a short reflection here..."></textarea>
                <small class="save-status" data-status="reflection">Saved only on this device.</small>
            </div>
        `;

        const applyHtml = `
            <div class="lesson-apply">
                <span>${data.apply[0]}</span>
                <strong>Use it in a real task</strong>
                <p>${data.apply[1]}</p>
                <label class="response-label" for="applyResponse">Your application / output</label>
                <textarea id="applyResponse" class="lesson-response" data-save="application"
                          rows="5" placeholder="Draft your answer, safer prompt, checklist, or decision here..."></textarea>
                <small class="save-status" data-status="application">Saved only on this device.</small>
            </div>
        `;

        const takeawayHtml = `
            <div class="lesson-takeaway">
                <span>${data.takeaway[0]}</span>
                <strong>${data.takeaway[1]}</strong>
            </div>

            <details class="teacher-lens">
                <summary>
                    <span>TEACHER / FACILITATOR LENS</span>
                    <strong>How this can be used in class</strong>
                    <b>+</b>
                </summary>
                <p>${data.teacherLens}</p>
            </details>

            ${data.referenceNote ? `
                <div class="module-reference-note">
                    <span>REFERENCE NOTE</span>
                    <p>${data.referenceNote}</p>
                </div>
            ` : ""}
        `;

        const evidenceHtml = `
            <div class="module-evidence">
                <div class="module-evidence-head">
                    <span>EVIDENCE BASE</span>
                    <strong>Sources connected to this domain</strong>
                </div>
                <p>
                    These references ground the lesson concepts. They are learning references,
                    not a replacement for checking the original source when using information academically.
                </p>
                <div class="module-evidence-links">
                    ${moduleEvidence[currentModule].map(source => `
                        <a href="${source[2]}" target="_blank" rel="noopener">
                            <small>${source[0]}</small>
                            <strong>${source[1]}</strong>
                            <span>Open source ↗</span>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;

        const moduleNavigatorHtml = `
            <div class="module-navigator">
                ${currentModule > 1 ? `
                    <button type="button" data-module-nav="${currentModule - 1}">
                        <span>← PREVIOUS</span>
                        <strong>${modules[currentModule - 1].title}</strong>
                    </button>
                ` : '<span class="nav-spacer"></span>'}

                ${currentModule < 7 ? `
                    <button type="button" class="next" data-module-nav="${currentModule + 1}">
                        <span>NEXT →</span>
                        <strong>${modules[currentModule + 1].title}</strong>
                    </button>
                ` : `
                    <button type="button" class="next" data-finish-trail>
                        <span>FINISH</span>
                        <strong>Return to progress</strong>
                    </button>
                `}
            </div>
        `;

        const alreadyDone = completedModules.includes(currentModule);

        moduleLessonContent.innerHTML =
            lessonSection("objectives", "Start here", "Learning objectives", missionHtml + objectiveHtml) +
            lessonSection("learn", "Learn", "Build the idea", learnHtml) +
            lessonSection("look", "Explore", "Look at a real situation", lookHtml) +
            lessonSection("try", "Try", "Practice the skill", tryHtml + signatureActivityHtml + missionsHtml) +
            lessonSection("check", "Check", "Check your understanding", quizHtml) +
            lessonSection("reflect", "Reflect", "Connect it to your habits", reflectHtml) +
            lessonSection("apply", "Apply", "Put it into practice", applyHtml) +
            lessonSection("takeaway", "Key takeaway", "What to remember", takeawayHtml + evidenceHtml) +
            `
                <div class="module-complete-row">
                    <p>When you are satisfied that you understand the module, mark it complete. Your progress is saved only in this browser.</p>
                    <button class="complete-module-btn ${alreadyDone ? "done" : ""}" type="button">
                        ${alreadyDone ? "✓ Module completed" : "Mark module complete"}
                    </button>
                </div>
                ${moduleNavigatorHtml}
            `;

        moduleLessonContent.scrollTop = 0;
        moduleStepButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.jump === "objectives"
            );
        });
        requestAnimationFrame(updateModuleScrollProgress);

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

        // Interactive lesson controls
        moduleLessonContent.querySelectorAll(".check-item").forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("checked");
            });
        });

        const revealButton = moduleLessonContent.querySelector(".case-reveal-btn");
        const revealText = moduleLessonContent.querySelector(".case-reveal");
        revealButton?.addEventListener("click", () => {
            const willShow = revealText.hasAttribute("hidden");
            if (willShow) {
                revealText.removeAttribute("hidden");
                revealButton.textContent = "Hide learning point";
            } else {
                revealText.setAttribute("hidden", "");
                revealButton.textContent = "Reveal the learning point";
            }
        });

        moduleLessonContent.querySelectorAll(".try-step").forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("done");
            });
        });

        initSignatureActivity(currentModule);

        moduleLessonContent.querySelectorAll(".mission-reveal").forEach(button => {
            button.addEventListener("click", () => {
                const answer = button.nextElementSibling;
                const showing = !answer.hasAttribute("hidden");

                if (showing) {
                    answer.setAttribute("hidden", "");
                    button.textContent = "Reveal a strong response";
                } else {
                    answer.removeAttribute("hidden");
                    button.textContent = "Hide response";
                }
            });
        });

        const savedResponses = JSON.parse(
            localStorage.getItem("aiToolkitModuleResponses") || "{}"
        );

        moduleLessonContent.querySelectorAll(".lesson-response").forEach(textarea => {
            const type = textarea.dataset.save;
            const key = "module" + currentModule + "_" + type;
            textarea.value = savedResponses[key] || "";

            let saveTimer;
            textarea.addEventListener("input", () => {
                clearTimeout(saveTimer);
                const status = moduleLessonContent.querySelector(
                    '.save-status[data-status="' + type + '"]'
                );
                if (status) status.textContent = "Saving...";

                saveTimer = setTimeout(() => {
                    const latest = JSON.parse(
                        localStorage.getItem("aiToolkitModuleResponses") || "{}"
                    );
                    latest[key] = textarea.value;
                    localStorage.setItem(
                        "aiToolkitModuleResponses",
                        JSON.stringify(latest)
                    );
                    if (status) status.textContent = "Saved on this device.";
                }, 350);
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

        moduleLessonContent.querySelectorAll("[data-module-nav]")
            .forEach(button => {
                button.addEventListener("click", () => {
                    openModule(Number(button.dataset.moduleNav));
                });
            });

        moduleLessonContent.querySelector("[data-finish-trail]")
            ?.addEventListener("click", () => {
                closeModule();
                document.getElementById("progress")?.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            });
    }

    function renderTeacherModule(number) {
        const data = modules[number];
        const guide = teacherGuide[number];
        const missions = moduleMissions[number];

        if (!data || !guide || !teacherContent) return;

        currentTeacherModule = Number(number);
        localStorage.setItem(
            "aiToolkitTeacherModule",
            String(currentTeacherModule)
        );

        teacherModuleButtons.forEach(button => {
            const isActive =
                Number(button.dataset.teacherModule) === currentTeacherModule;
            button.classList.toggle("active", isActive);

            if (isActive) {
                button.setAttribute("aria-current", "true");
            } else {
                button.removeAttribute("aria-current");
            }
        });

        const evidenceLinks = moduleEvidence[number]
            .map(source => `
                <a href="${source[2]}" target="_blank" rel="noopener">
                    <small>${source[0]}</small>
                    <strong>${source[1]}</strong>
                    <span>↗</span>
                </a>
            `).join("");

        teacherContent.innerHTML = `
            <div class="teacher-domain-head">
                <div>
                    <span>DOMAIN ${String(number).padStart(2, "0")} / FACILITATION PLAN</span>
                    <h3>${data.domain}</h3>
                    <p>${data.tagline}</p>
                </div>
                <div class="teacher-time">
                    <small>SUGGESTED FLOW</small>
                    <strong>${guide.time}</strong>
                </div>
            </div>

            <div class="teacher-objective-block">
                <span>LEARNING OBJECTIVES</span>
                <ul>
                    ${data.objectives.map(objective => `<li>${objective}</li>`).join("")}
                </ul>
            </div>

            <div class="teacher-plan-grid">
                <article>
                    <span>BEFORE CLASS</span>
                    <strong>Prepare</strong>
                    <ul>${guide.prep.map(item => `<li>${item}</li>`).join("")}</ul>
                </article>

                <article>
                    <span>OPENING</span>
                    <strong>Launch the idea</strong>
                    <p>${guide.launch}</p>
                </article>

                <article>
                    <span>CORE ACTIVITY</span>
                    <strong>Facilitate</strong>
                    <p>${guide.facilitate}</p>
                </article>

                <article>
                    <span>FORMATIVE EVIDENCE</span>
                    <strong>What to look for</strong>
                    <ul>${guide.lookFor.map(item => `<li>${item}</li>`).join("")}</ul>
                </article>
            </div>

            <div class="teacher-activity-block">
                <div>
                    <span>STUDENT TOOL</span>
                    <strong>${data.tool.name}</strong>
                    <p>${data.tool.description}</p>
                </div>
                <div>
                    <span>CLASSROOM MISSION</span>
                    <strong>${missions[0].title}</strong>
                    <p>${missions[0].task}</p>
                </div>
                <div>
                    <span>EXIT PROMPT</span>
                    <strong>Check understanding</strong>
                    <p>${guide.exit}</p>
                </div>
            </div>

            <div class="teacher-notes">
                <span>FACILITATOR NOTE</span>
                <p>${data.teacherLens}</p>
            </div>

            <div class="teacher-safeguard">
                <span>RESEARCH & PRIVACY SAFEGUARD</span>
                <p>
                    Use these classroom prompts as learning activities only. Do not treat learner answers,
                    progress, reflections, or discussion responses as research data unless they are collected
                    through the approved study procedures and instruments.
                </p>
            </div>

            <div class="teacher-evidence">
                <span>EVIDENCE BASE</span>
                <div>${evidenceLinks}</div>
            </div>
        `;

        if (printTeacherGuide) {
            printTeacherGuide.innerHTML = `
                <h1>AI Literacy Toolkit — Facilitator Guide</h1>
                <p class="print-teacher-domain">Domain ${number}: ${data.domain}</p>
                <p>${data.tagline}</p>

                <h2>Suggested Flow</h2>
                <p>${guide.time}</p>

                <h2>Learning Objectives</h2>
                <ul>${data.objectives.map(objective => `<li>${objective}</li>`).join("")}</ul>

                <h2>Preparation</h2>
                <ul>${guide.prep.map(item => `<li>${item}</li>`).join("")}</ul>

                <h2>Launch</h2>
                <p>${guide.launch}</p>

                <h2>Facilitation</h2>
                <p>${guide.facilitate}</p>

                <h2>What to Look For</h2>
                <ul>${guide.lookFor.map(item => `<li>${item}</li>`).join("")}</ul>

                <h2>Reusable Student Tool</h2>
                <p><b>${data.tool.name}</b> — ${data.tool.description}</p>

                <h2>Exit Prompt</h2>
                <p>${guide.exit}</p>

                <h2>Facilitator Note</h2>
                <p>${data.teacherLens}</p>

                <div class="print-teacher-note">
                    Classroom learning responses are separate from approved research-data collection.
                </div>
            `;
        }
    }

    function buildCompleteTeacherGuide() {
        if (!printCompleteTeacherGuide) return;

        const toc = Object.keys(modules)
            .map(number => `
                <li>Domain ${number}: ${modules[number].domain}</li>
            `).join("");

        const sections = Object.keys(modules)
            .map(number => {
                const data = modules[number];
                const guide = teacherGuide[number];
                const missions = moduleMissions[number];

                const refs = moduleEvidence[number]
                    .map(source => `<li>${source[0]} — ${source[1]}</li>`)
                    .join("");

                return `
                    <section class="complete-guide-domain">
                        <div class="complete-guide-domain-head">
                            <span>DOMAIN ${String(number).padStart(2, "0")}</span>
                            <h2>${data.domain}</h2>
                            <p>${data.tagline}</p>
                        </div>

                        <div class="complete-guide-meta">
                            <p><b>Suggested flow:</b> ${guide.time}</p>
                            <p><b>Student tool:</b> ${data.tool.name}</p>
                        </div>

                        <h3>Learning Objectives</h3>
                        <ul>${data.objectives.map(item => `<li>${item}</li>`).join("")}</ul>

                        <h3>Preparation</h3>
                        <ul>${guide.prep.map(item => `<li>${item}</li>`).join("")}</ul>

                        <h3>Launch</h3>
                        <p>${guide.launch}</p>

                        <h3>Facilitation</h3>
                        <p>${guide.facilitate}</p>

                        <h3>What to Look For</h3>
                        <ul>${guide.lookFor.map(item => `<li>${item}</li>`).join("")}</ul>

                        <h3>Classroom Mission</h3>
                        <p><b>${missions[0].title}</b></p>
                        <p>${missions[0].task}</p>

                        <h3>Exit Prompt</h3>
                        <p>${guide.exit}</p>

                        <h3>Facilitator Note</h3>
                        <p>${data.teacherLens}</p>

                        <h3>Evidence Base</h3>
                        <ul class="complete-guide-refs">${refs}</ul>

                        <div class="complete-guide-safeguard">
                            Classroom learning responses are separate from approved research-data collection.
                        </div>
                    </section>
                `;
            })
            .join("");

        printCompleteTeacherGuide.innerHTML = `
            <section class="complete-guide-cover">
                <span>TEACHER / FACILITATOR RESOURCE</span>
                <h1>AI Literacy Toolkit</h1>
                <h2>Complete Facilitator Guide</h2>
                <p>
                    Developing and Validating a Needs-Based AI Literacy Toolkit for
                    Senior High School Students in Laoag City, Ilocos Norte
                </p>
                <div class="complete-guide-cover-note">
                    This guide supports classroom facilitation of the seven toolkit domains.
                    It is not a research instrument, answer key, certificate, or research-data record.
                </div>
            </section>

            <section class="complete-guide-toc">
                <h2>Contents</h2>
                <ol>${toc}</ol>
            </section>

            ${sections}

            <section class="complete-guide-final-note">
                <h2>Facilitator Reminder</h2>
                <p>
                    Keep AI use human-centered, age-appropriate, privacy-aware, and aligned with
                    school and teacher instructions. Toolkit activities are learning supports and
                    should not be treated as research responses unless collected through the approved
                    study procedures and instruments.
                </p>
            </section>
        `;
    }

    function openTeacherMode(moduleNumber) {
        if (!teacherModal) return;

        previouslyFocusedElement = document.activeElement;

        const savedTeacherModule = Number(
            localStorage.getItem("aiToolkitTeacherModule") || 1
        );

        renderTeacherModule(
            moduleNumber || (
                savedTeacherModule >= 1 && savedTeacherModule <= 7
                    ? savedTeacherModule
                    : 1
            )
        );

        setMobileMenu(false);
        teacherModal.classList.add("show");
        teacherModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        teacherClose?.focus();
    }

    function closeTeacherMode() {
        if (!teacherModal) return;

        teacherModal.classList.remove("show");
        teacherModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        previouslyFocusedElement?.focus?.();
    }

    teacherModeBtn?.addEventListener("click", () => openTeacherMode());

    teacherModuleButtons.forEach(button => {
        button.addEventListener("click", () => {
            renderTeacherModule(
                Number(button.dataset.teacherModule)
            );
        });
    });

    teacherClose?.addEventListener("click", closeTeacherMode);

    teacherModal?.addEventListener("click", event => {
        if (event.target === teacherModal) closeTeacherMode();
    });

    printTeacherGuideBtn?.addEventListener("click", () => {
        renderTeacherModule(currentTeacherModule);
        document.body.classList.add("printing-teacher-guide");
        window.print();
    });

    printCompleteTeacherGuideBtn?.addEventListener("click", () => {
        buildCompleteTeacherGuide();
        document.body.classList.add("printing-complete-teacher-guide");
        window.print();
    });

    window.addEventListener("afterprint", () => {
        document.body.classList.remove("printing-teacher-guide");
        document.body.classList.remove("printing-complete-teacher-guide");
    });

    function openCapstone() {
        if (!capstoneModal) return;

        previouslyFocusedElement = document.activeElement;
        capstoneModal.classList.add("show");
        capstoneModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const savedCapstone =
            localStorage.getItem("aiToolkitCapstoneResponse") || "";

        if (capstoneResponse) {
            capstoneResponse.value = savedCapstone;
        }

        capstoneClose?.focus();
    }

    function closeCapstone() {
        if (!capstoneModal) return;

        capstoneModal.classList.remove("show");
        capstoneModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        previouslyFocusedElement?.focus?.();
    }

    openCapstoneBtn?.addEventListener("click", openCapstone);
    capstoneClose?.addEventListener("click", closeCapstone);

    capstoneModal?.addEventListener("click", event => {
        if (event.target === capstoneModal) closeCapstone();
    });

    capstoneCards.forEach(card => {
        card.setAttribute(
            "aria-pressed",
            String(card.classList.contains("selected"))
        );

        card.addEventListener("click", () => {
            card.classList.toggle("selected");
            card.setAttribute(
                "aria-pressed",
                String(card.classList.contains("selected"))
            );

            const selected =
                document.querySelectorAll("[data-capstone-domain].selected").length;

            if (capstoneStatus) {
                capstoneStatus.textContent =
                    selected === 7
                        ? "All seven domains considered. Write your integrated decision, then compare."
                        : selected + " of 7 domains considered.";
            }

            if (capstoneCompare) {
                capstoneCompare.disabled = selected !== 7;
            }
        });
    });

    capstoneResponse?.addEventListener("input", () => {
        localStorage.setItem(
            "aiToolkitCapstoneResponse",
            capstoneResponse.value
        );
    });

    capstoneCompare?.addEventListener("click", () => {
        if (!capstoneModel) return;

        capstoneModel.removeAttribute("hidden");
        capstoneCompare.textContent = "Strong response shown below";
        capstoneCompare.disabled = true;

        capstoneModel.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest"
        });
    });

    printQuickGuideBtn?.addEventListener("click", () => {
        document.body.classList.add("printing-quick-guide");
        window.print();
    });

    window.addEventListener("afterprint", () => {
        document.body.classList.remove("printing-quick-guide");
    });

    function openModule(number) {
        if (!moduleModal) return;
        previouslyFocusedElement = document.activeElement;
        localStorage.setItem("aiToolkitLastModule", String(number));
        if (modulePosition) {
            modulePosition.textContent = "Module " + number + " of 7";
        }
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
            const target = moduleLessonContent?.querySelector(
                "#lesson-" + button.dataset.jump
            );
            if (!target || !moduleLessonContent) return;

            const containerRect = moduleLessonContent.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const targetTop =
                moduleLessonContent.scrollTop +
                (targetRect.top - containerRect.top) -
                18;

            moduleStepButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.removeAttribute("aria-current");
            });
            button.classList.add("active");
            button.setAttribute("aria-current", "step");

            moduleLessonContent.scrollTo({
                top: targetTop,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    });

    function updateModuleScrollProgress() {
        if (!moduleLessonContent || !moduleLessonProgress) return;

        const scrollable =
            moduleLessonContent.scrollHeight -
            moduleLessonContent.clientHeight;

        const progress = scrollable > 0
            ? Math.min(
                (moduleLessonContent.scrollTop / scrollable) * 100,
                100
            )
            : 0;

        moduleLessonProgress.style.width = progress + "%";

        const sectionEls =
            [...moduleLessonContent.querySelectorAll(".lesson-section")];

        if (!sectionEls.length) return;

        const containerRect =
            moduleLessonContent.getBoundingClientRect();

        const markerY =
            containerRect.top +
            Math.min(150, containerRect.height * 0.28);

        let currentSection = sectionEls[0];

        for (const section of sectionEls) {
            const rect = section.getBoundingClientRect();

            if (rect.top <= markerY) {
                currentSection = section;
            } else {
                break;
            }
        }

        if (
            scrollable > 0 &&
            moduleLessonContent.scrollTop >= scrollable - 8
        ) {
            currentSection = sectionEls[sectionEls.length - 1];
        }

        const currentId =
            currentSection.id.replace("lesson-", "");

        moduleStepButtons.forEach(button => {
            const isCurrent = button.dataset.jump === currentId;
            button.classList.toggle("active", isCurrent);

            if (isCurrent) {
                button.setAttribute("aria-current", "step");
            } else {
                button.removeAttribute("aria-current");
            }
        });
    }

    moduleLessonContent?.addEventListener("scroll", updateModuleScrollProgress, { passive: true });

    document.addEventListener("keydown", event => {
        const activeModal =
            teacherModal?.classList.contains("show")
                ? teacherModal
                : capstoneModal?.classList.contains("show")
                    ? capstoneModal
                    : moduleModal?.classList.contains("show")
                        ? moduleModal
                        : challengeModal?.classList.contains("show")
                            ? challengeModal
                            : null;

        if (event.key === "Tab" && activeModal) {
            trapFocusInside(event, activeModal);
            return;
        }

        if (event.key !== "Escape") return;

        if (teacherModal?.classList.contains("show")) {
            closeTeacherMode();
            return;
        }
        if (capstoneModal?.classList.contains("show")) {
            closeCapstone();
            return;
        }
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