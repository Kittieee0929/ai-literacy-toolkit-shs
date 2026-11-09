(() => {
    "use strict";

    const foundations = Object.values(window.AILiteracyLessons);
    const followups = Object.values(window.AILiteracyMoreLessons);
    const lessons = [...foundations, ...followups].sort((a, b) => a.id - b.id);
    const root = document.getElementById("printLessonGuide");
    const lessonPicker = document.getElementById("printOptionalLesson");
    const teacherList = document.querySelector(".teacher-module-list");

    function element(tag, text) {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function section(parent, heading, level = "h3") {
        const block = element("section");
        block.append(element(level, heading));
        parent.append(block);
        return block;
    }

    function list(parent, entries, tag = "ul") {
        const items = element(tag);
        for (const text of entries) items.append(element("li", text));
        parent.append(items);
        return items;
    }

    function link(parent, text, url) {
        const anchor = element("a", text);
        anchor.href = url;
        parent.append(anchor);
    }

    function lessonTitle(lesson) {
        return `Lesson ${lesson.id} · ${lesson.title}`;
    }

    function addDiscussion(parent, lesson) {
        const block = section(parent, "Discussion");
        block.append(element("p", lesson.intro), element("h4", "What you will learn"));
        list(block, lesson.objectives);
        for (const [title, text] of lesson.parts) block.append(element("h4", title), element("p", text));
        block.append(element("h4", "Key ideas in plain language"));
        const ideas = element("dl");
        for (const { title, text } of lesson.keyIdeas) ideas.append(element("dt", title), element("dd", text));
        block.append(ideas, element("h4", lesson.routine.name), element("p", lesson.routine.description));
        list(block, lesson.routine.checklist);
        block.append(element("h4", "The main idea to remember"), element("p", lesson.takeaway));
    }

    function addScenarios(parent, lesson) {
        const block = section(parent, "Real-Life Scenarios");
        block.append(element("p", "Discuss what you would do in each situation and explain why."));
        for (const [index, scenario] of lesson.scenarios.entries()) {
            const card = section(block, `${index + 1}. ${scenario.title}`, "h4");
            card.append(element("p", scenario.situation));
            if (scenario.question) card.append(element("p", scenario.question));
        }
    }

    function addQuestions(parent, title, questions) {
        const block = section(parent, title);
        const letter = index => String.fromCharCode(65 + index);
        for (const [index, question] of questions.entries()) {
            const card = section(block, `${index + 1}. ${question.question}`, "h4");
            card.className = "print-question";

            if (question.type === "match") {
                card.append(element("p", "Write the letter of each matching explanation."));
                list(card, question.pairs.map(term => `____  ${term}`));
            } else if (question.type === "order") {
                card.append(element("p", "Number the steps in the correct order."));
                // Start with the same rotated order as the online player.
                list(card, question.items.map((_, i, items) => `____  ${items[(i + 2) % items.length]}`));
                continue;
            } else {
                card.append(element("p", question.type === "multi" ? "Choose all correct answers." : "Choose one answer."));
            }

            list(card, question.options.map((option, i) => `${letter(i)}. ${option}`)).className = "print-choices";
            if (question.type !== "match") card.append(element("p", "Answer: __________"));
        }
    }

    function addSources(parent, lesson) {
        const block = section(parent, "Sources for this lesson");
        const sources = element("ul");
        for (const id of lesson.references) {
            const ref = window.AILiteracyReferences[id];
            const item = element("li");
            link(item, ref.citation, ref.url);
            if (ref.alternate) {
                item.append(" · ");
                link(item, ref.alternateLabel, ref.alternate);
            }
            sources.append(item);
        }
        block.append(sources);
        if (!lesson.videoIds.length) return;

        block.append(element("h4", "Lesson videos"));
        for (const id of lesson.videoIds) {
            const video = window.AILiteracyVideos[id];
            const item = element("p");
            link(item, `${video.title} · ${video.creator}`, video.youtube);
            item.append(element("small", video.youtube));
            block.append(item, element("p", video.focus));
        }
    }

    function correctAnswer(question) {
        switch (question.type) {
        case "match":
            return question.pairs.map((term, i) => `${term} → ${question.options[question.correct[i]]}`).join(" | ");
        case "order":
            return question.correct.map(i => question.items[i]).join(" → ");
        case "multi":
            return question.correct.map(i => question.options[i]).join(" | ");
        default:
            return question.options[question.correct];
        }
    }

    function addAnswerKey(parent, lesson) {
        const block = section(parent, `Facilitator Answer Key · Lesson ${lesson.id}`);
        block.className = "print-answer-key";
        block.append(element("p", lesson.title), element("h4", "Suggested scenario responses"));
        const scenarios = element("ol");
        for (const scenario of lesson.scenarios) {
            const item = element("li");
            item.append(element("strong", scenario.title), element("p", scenario.action), element("p", scenario.why));
            scenarios.append(item);
        }
        block.append(scenarios);
        for (const [title, questions] of [["Quiz answers", lesson.quiz], ["Assessment answers", lesson.assessment]]) {
            block.append(element("h4", title));
            const answers = element("ol");
            for (const question of questions) {
                const item = element("li");
                item.append(element("strong", correctAnswer(question)), element("p", question.feedback));
                answers.append(item);
            }
            block.append(answers);
        }
    }

    function addLesson(lesson) {
        const block = section(root, lessonTitle(lesson), "h2");
        block.id = `printed-lesson-${lesson.id}`;
        block.className = "print-lesson";
        block.append(element("p", lesson.tagline));
        addDiscussion(block, lesson);
        addScenarios(block, lesson);
        addQuestions(block, "Quiz", lesson.quiz);
        addQuestions(block, "Assessment", lesson.assessment);
        addSources(block, lesson);
        addAnswerKey(block, lesson);
    }

    function printGuide(title, render) {
        root.replaceChildren(element("h1", title));
        render();
        document.body.classList.add("printing-lesson-guide");
        window.print();
    }

    for (const lesson of followups) {
        const option = element("option", lessonTitle(lesson));
        option.value = lesson.id;
        lessonPicker.append(option);
    }
    teacherList.addEventListener("click", event => {
        if (event.target.closest("[data-teacher-module]")) lessonPicker.value = "";
    });
    document.getElementById("printTeacherGuideBtn").addEventListener("click", () => {
        const current = teacherList.querySelector("[aria-current='true']")?.dataset.teacherModule;
        const id = Number(lessonPicker.value || current || foundations[0].id);
        const lesson = lessons.find(item => item.id === id);
        printGuide("AI Literacy Toolkit · Facilitator Guide", () => addLesson(lesson));
    });
    document.getElementById("printCompleteTeacherGuideBtn").addEventListener("click", () => {
        printGuide("AI Literacy Toolkit · Complete Facilitator Guide", () => {
            const contents = section(root, "Contents", "h2");
            contents.append(element("p", `${lessons.length} Learning Trail lessons with printable activities and facilitator answer keys.`));
            const titles = element("ol");
            titles.className = "print-contents";
            for (const lesson of lessons) {
                const item = element("li");
                link(item, lesson.title, `#printed-lesson-${lesson.id}`);
                titles.append(item);
            }
            contents.append(titles);
            for (const lesson of lessons) addLesson(lesson);
        });
    });
    document.getElementById("printQuickGuideBtn").addEventListener("click", () => {
        printGuide("AI Literacy Toolkit · Learner Quick Guide", () => {
            root.append(element("p", "Seven foundation lessons and routines to use when you work with AI."));
            for (const lesson of foundations) {
                const block = section(root, lessonTitle(lesson), "h2");
                block.className = "print-quick-lesson";
                block.append(element("p", lesson.takeaway), element("h3", lesson.routine.name));
                list(block, lesson.routine.checklist);
            }
        });
    });

    window.addEventListener("afterprint", () => {
        document.body.classList.remove("printing-lesson-guide");
        root.replaceChildren();
    });
})();
