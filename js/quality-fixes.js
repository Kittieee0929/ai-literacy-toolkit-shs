(() => {
  "use strict";

  /*
   * October 2026 quality patch:
   * - Adds substantial, structured discussion to every learning module.
   * - Keeps enhancement separate from the core module data so it is easy to maintain.
   * - Uses textContent for authored content rather than injecting untrusted HTML.
   */
  const discussions = {
    1: {
      kicker: "CORE DISCUSSION · DOMAIN 01",
      title: "What AI is—and what it is not",
      intro: "AI literacy starts with a realistic mental model. You do not need to become a programmer to use AI thoughtfully, but you do need to understand that an AI system is a tool with capabilities, limits, and conditions that shape its output.",
      parts: [
        ["How AI produces an output", "Many AI systems learn statistical patterns from data. A generative AI system uses those learned patterns and the prompt or context it receives to produce a likely continuation, answer, image, or other output. The process can be complex, but a fluent result is not a guarantee that the system has checked the truth of every sentence. The answer is a proposal to examine, not automatic proof."],
        ["AI, automation, and ordinary software", "Not every digital tool is AI. A fixed calculator follows defined operations; a rule-based form may show a message when a box is checked; an AI system may classify, predict, recognize patterns, or generate new content. Real products can combine these approaches. When unsure, describe what you can observe and avoid claiming that a system is intelligent just because it looks impressive."],
        ["Why this matters to senior high school learners", "Students meet AI in search, translation, recommendations, writing assistants, image tools, and chatbots. Understanding the difference between capability and judgment helps learners choose the right tool, notice when a task needs a human decision, and avoid handing over responsibility. In technical-vocational learning, AI may explain a procedure or help plan a project, but the learner still has to follow safety rules and verify the procedure against trusted instructions."],
        ["Common misconception: 'It sounds human, so it understands'", "Human-like language can make a response feel trustworthy. However, a system can generate a persuasive explanation and still misunderstand the question, omit a condition, or invent a detail. Do not judge reliability by tone alone. Ask what the system was asked to do, what evidence supports the result, what it may have missed, and what a person must decide."],
        ["Worked school example", "Imagine asking a chatbot to explain electrical safety. It gives a clear list, but one instruction conflicts with your official laboratory manual. The responsible choice is not to vote for whichever answer sounds more confident. Pause the AI advice, consult the approved manual or qualified teacher, and follow the authoritative safety guidance. The example shows that the stakes of a task determine how carefully the output must be checked."]
      ],
      takeaway: "Use AI to support a goal—not to replace your judgment. Know what the system is doing, notice what it cannot guarantee, and remain responsible for the final decision."
    },
    2: {
      kicker: "CORE DISCUSSION · DOMAIN 02",
      title: "Evaluate the answer, not just the writing",
      intro: "AI-generated content often looks complete because it is organized, confident, and grammatically polished. Evaluation means examining the substance of an answer claim by claim, identifying what is useful, what is uncertain, and what needs correction before the material is reused.",
      parts: [
        ["Six lenses for a careful review", "Accuracy asks whether the facts are correct. Relevance asks whether the answer addresses the actual task. Completeness asks what important information or limitations are missing. Logic asks whether the reasoning supports the conclusion. Bias asks whose perspective is represented or overlooked. Evidence asks what reliable information supports important claims. These lenses turn 'it looks right' into a repeatable process."],
        ["Separate a useful answer from a reliable answer", "A response can be relevant and still contain an incorrect statistic. It can be accurate in one paragraph but incomplete overall. It can explain a familiar viewpoint while overlooking local context, accessibility, or affected groups. Avoid treating the whole response as either perfect or useless. Mark individual claims, preserve what is genuinely helpful, and revise or remove parts that cannot be supported."],
        ["Why evaluation matters in schoolwork", "Students may use AI to brainstorm, outline, simplify a difficult concept, or compare possible approaches. If an error is copied into a report or presentation, the polished format can make the error spread further. Evaluation protects the quality of the work and develops independent reasoning. It is especially important when an answer includes numbers, quotations, health or safety advice, legal claims, or information about real people."],
        ["Common warning signs", "Slow down when the answer gives exact numbers without a source, uses sweeping words such as 'always' or 'everyone', presents only one side of a contested issue, contradicts itself, or claims certainty about information that changes quickly. These signs do not automatically prove an answer is false; they tell you where to investigate. Likewise, a cautious answer is not automatically correct. Evidence and context still matter."],
        ["Worked school example", "Suppose AI drafts a paragraph about renewable energy and includes a percentage for local electricity use. The explanation may be useful, but the statistic needs a source, date, and matching definition. Check whether the number refers to the Philippines, a province, or another country; whether it describes installed capacity or actual generation; and whether the reporting period matches your assignment. Revise the claim only after the evidence supports it."]
      ],
      takeaway: "Do not ask only, 'Is this answer good?' Ask, 'Which claims are accurate, relevant, complete, logical, fair, and supported—and which still need work?'"
    },
    3: {
      kicker: "CORE DISCUSSION · DOMAIN 03",
      title: "Trace claims back to evidence",
      intro: "Source verification is the habit of moving from an AI answer to the original evidence. A citation-shaped reference is not proof that a source exists, and a real source is not proof that it supports the statement attached to it.",
      parts: [
        ["Find the original source", "Start with the exact title, author, publisher, DOI, or official webpage when available. Open the link instead of relying on a citation copied into an AI answer. Check whether the page resolves, whether the title and author match, and whether the document contains the claim. If a journal article or report cannot be located, treat the reference as unverified until you can establish otherwise."],
        ["Check authority, context, and date", "Ask who created the information, what expertise or responsibility they have, where it was published, when it was produced, and why it was published. A government dataset may be appropriate for official statistics; a peer-reviewed article may be useful for a research question; a news report may help establish a recent event. No source type is perfect for every purpose. Match the source to the claim and consider whether newer information has replaced it."],
        ["Why verification matters", "AI can blend accurate information with unsupported details or produce references that look plausible but cannot be found. If students repeat those details without checking, an assignment may misinform readers and undermine academic credibility. Verification also teaches learners to distinguish evidence from repetition: many websites repeating a claim do not necessarily provide independent confirmation if they all rely on the same original source."],
        ["Use the VERIFY routine", "View the source directly. Examine the author or responsible organization. Review the publisher and its purpose. Inspect the date and context. Find evidence that supports the exact claim. Your judgment connects those checks to the task. For an important claim, look for an independent, credible source as well as the source first suggested by AI."],
        ["Worked school example", "An AI assistant cites a report about student technology use and supplies a percentage. You open the report and discover that the percentage describes university students from another country, not senior high school learners in Laoag City. The report may be real, but it does not support the local claim. Do not stretch the source beyond its population or context. Find appropriate evidence or clearly state the limitation."]
      ],
      takeaway: "A reference is not verified until you can locate the original material, inspect its context, and confirm that it supports the claim you intend to make."
    },
    4: {
      kicker: "CORE DISCUSSION · DOMAIN 04",
      title: "Use AI without misrepresenting your work",
      intro: "Academic integrity is not simply a question of whether AI was used. It is about the learning purpose, the rules of the task, the extent of AI's contribution, and whether the final work honestly represents the learner's own thinking and effort.",
      parts: [
        ["Begin with the task rules", "Different assignments have different purposes. A teacher may allow AI for brainstorming but require independent writing; another task may ask learners to compare AI-generated and human-created solutions. Before using a tool, read the instructions and ask for clarification if the boundary is unclear. Do not assume that permission to use AI in one activity automatically applies to every activity."],
        ["Support versus substitution", "AI can support learning when it helps you generate questions, receive feedback, compare explanations, or practice a skill while you still do the thinking the task is designed to assess. It becomes substitution when the system performs the very reasoning, writing, design, or demonstration that you are expected to learn or show yourself. The distinction depends on the assignment, not just on how much text was generated."],
        ["Why integrity protects learning", "The purpose of schoolwork is not only to submit a polished product. Assignments give learners practice, reveal misconceptions, and help teachers identify what support is needed. If AI hides the learner's current understanding, the work may look stronger while the skill remains undeveloped. Honest use helps learners receive feedback that matches their real needs and preserves trust between students and teachers."],
        ["Disclosure and ownership", "Follow the required citation or disclosure practice when AI assistance must be acknowledged. Keep a record of substantial prompts, suggestions, or generated material when appropriate. Never invent sources, fabricate observations, or claim to have performed work you did not do. Even when disclosure is not required, you should be able to explain the final reasoning and take responsibility for errors."],
        ["Worked school example", "Your teacher permits AI for brainstorming a speech but asks each student to write the final reflection independently. A responsible workflow is to ask AI for possible reflection questions, choose one that genuinely fits your experience, close the tool, and write your own response. Asking AI to write the reflection and changing a few words would undermine the purpose of the task."]
      ],
      takeaway: "Use AI in ways that fit the assignment, preserve the skill being assessed, follow disclosure rules, and leave you able to explain and defend your own work."
    },
    5: {
      kicker: "CORE DISCUSSION · DOMAIN 05",
      title: "Protect personal information before prompting",
      intro: "Privacy is not only a setting in an app. It is a decision about what information you share, whose information it is, why the system needs it, and what could happen if the information is exposed, retained, or reused.",
      parts: [
        ["Recognize personal and sensitive details", "Names, student numbers, contact details, faces, voice recordings, grades, health information, private messages, and identifiable screenshots may expose a person. A combination of details can identify someone even when their name is removed. Treat classmates' and teachers' information with the same care you would want for your own. Public availability does not automatically mean information should be copied into a new service."],
        ["Apply data minimization", "Before submitting a prompt, ask what the task actually needs. Remove names and identifiers, replace real records with synthetic examples, summarize rather than upload a whole file, and share only the minimum necessary context. Redaction should be real: a black box drawn over text in an editable document may not remove the underlying data. Check the final file or image before sending it."],
        ["Why privacy matters for students", "Information shared with a digital service may be stored or processed according to its settings and terms. Learners may not control every downstream use, and accidental disclosure can affect a person's safety, dignity, relationships, or future opportunities. In the Philippine context, personal-information handling should be considered in light of applicable privacy requirements and school policy. When uncertain, ask a responsible teacher or data-protection contact rather than uploading first."],
        ["Safer alternatives to real records", "If you need help summarizing class performance, create a small synthetic table with made-up names and values or use aggregated information that cannot reasonably identify individuals. If you need feedback on a letter, replace names, addresses, and account numbers with placeholders. If a task genuinely requires identifiable information, use only an approved process and confirm that the people and institution have authorized it."],
        ["Worked school example", "A learner wants AI to analyze a spreadsheet containing student names, grades, contact numbers, and personal comments. The safer first step is to remove direct identifiers and unnecessary columns, check whether any combination still points to an individual, and use an approved tool or synthetic data where possible. Asking a chatbot not to remember the data is not a substitute for minimizing what is shared in the first place."]
      ],
      takeaway: "Pause before you paste. Share only what is necessary, protect other people's information, and use an approved process when real personal data is genuinely required."
    },
    6: {
      kicker: "CORE DISCUSSION · DOMAIN 06",
      title: "Consider people, fairness, consent, and harm",
      intro: "Ethical AI use means looking beyond whether a tool works. It asks who benefits, who may be harmed, whose information or likeness is involved, which perspectives are missing, and who is responsible for the decision.",
      parts: [
        ["Bias and representation", "AI systems can reflect gaps and patterns in the data used to build or operate them. An output may overlook a community, repeat a stereotype, or describe one group unfairly. A single example cannot prove that a system is biased, but it can prompt a careful review. Ask who is represented, who is missing, whether the same standards are applied to different people, and what evidence supports the conclusion."],
        ["Consent, likeness, and synthetic media", "AI-generated images, voices, and videos can imitate real people or make events appear to have happened when they did not. Using someone's likeness without permission may embarrass them, mislead others, damage their reputation, or undermine trust. Calling it a joke does not erase the consequences. Consider consent, context, audience, potential harm, and whether viewers could mistake the output for a real recording."],
        ["Why ethics matters in everyday school life", "Classroom work happens in a community. An AI-generated output can affect a classmate who is depicted, a teacher whose words are imitated, a group described by a stereotype, or a reader who believes false information. Responsible choices protect dignity and relationships as well as accuracy. They also encourage learners to think about fairness and accountability before publishing or sharing something widely."],
        ["A practical ethical check", "Ask five questions: Who could be affected? What benefit is expected? What harm or unfairness could occur? Do consent, ownership, or school rules apply? Who will take responsibility if something goes wrong? If the answer is unclear, reduce the risk: do not publish the content, seek permission, use a fictional example, or consult a teacher."],
        ["Worked school example", "A student makes a realistic AI voice clone of a teacher and shares a fake announcement in a group chat. Even if the creator intended humor, other students may believe the announcement, the teacher may lose control over their likeness, and the post may spread beyond the original audience. A responsible response is not to circulate it further, correct misinformation where needed, and follow school guidance for addressing the incident."]
      ],
      takeaway: "Before creating or sharing AI output, consider the people affected—not just the technical result. Consent, fairness, dignity, and accountability are part of responsible use."
    },
    7: {
      kicker: "CORE DISCUSSION · DOMAIN 07",
      title: "Make AI a learning partner, not a replacement",
      intro: "The goal of AI-supported learning is not merely to finish faster. It is to leave the learner more capable of explaining, evaluating, creating, and making decisions independently after the tool is closed.",
      parts: [
        ["Use a learning loop", "Start with a clear goal. Ask a focused question. Think about the response before accepting it. Check important claims and examples. Verify evidence where needed. Improve the work using your own judgment. Finally, own the result by explaining the reasoning and taking responsibility for what you submit or share. This loop—ask, think, check, verify, improve, own—keeps the learner active throughout the task."],
        ["Ask for teaching, not just answers", "Instead of asking only for a completed solution, ask for a simpler explanation, a worked example, a hint, a comparison of approaches, or practice questions that reveal a misconception. Try the next step yourself before reading the model answer. If the explanation does not help you understand, ask a more specific follow-up or use a trusted learning resource or teacher."],
        ["Why this matters for long-term learning", "A copied answer can solve the immediate submission problem while leaving the underlying skill unchanged. Explaining a concept in your own words, applying it to a new example, and identifying where you are still unsure are stronger signs of learning. In technical-vocational tasks, learners must also practice procedures, use appropriate equipment, follow safety guidance, and demonstrate skills rather than relying on a text response alone."],
        ["Keep human agency and appropriate boundaries", "AI can offer suggestions, but it does not know every classroom rule, local condition, personal value, or consequence. You choose the goal, judge whether the output fits, decide what evidence is adequate, and seek qualified help when a task is high-stakes. If a tool is unavailable, gives a poor answer, or is not permitted for the assignment, you should still be able to continue learning through notes, textbooks, practice, and teacher feedback."],
        ["Worked school example", "You ask AI to explain a difficult concept, but after reading the answer you cannot explain it without looking. Do not treat the task as finished. Ask for a simpler analogy, work through a new example, close the chatbot, and explain the concept in your own words. Then compare your explanation with a trusted source and correct the gaps. The aim is to build understanding you can carry into a different question."]
      ],
      takeaway: "A good AI-supported learning session should make you more capable, not more dependent. Keep thinking, verify what matters, practice independently, and own the final work."
    }
  };

  function addText(parent, tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function buildDiscussion(moduleNumber, data) {
    const panel = document.createElement("article");
    panel.className = "module-discussion";
    panel.dataset.moduleDiscussion = String(moduleNumber);

    const header = document.createElement("div");
    header.className = "module-discussion-header";
    addText(header, "span", "module-discussion-kicker", data.kicker);
    addText(header, "h4", "", data.title);
    addText(header, "p", "module-discussion-intro", data.intro);
    panel.appendChild(header);

    const body = document.createElement("div");
    body.className = "module-discussion-parts";
    data.parts.forEach((part, index) => {
      const section = document.createElement("section");
      section.className = "module-discussion-part";
      addText(section, "span", "module-discussion-number", String(index + 1).padStart(2, "0"));
      addText(section, "h5", "", part[0]);
      addText(section, "p", "", part[1]);
      body.appendChild(section);
    });
    panel.appendChild(body);

    const takeaway = document.createElement("div");
    takeaway.className = "module-discussion-takeaway";
    addText(takeaway, "span", "", "REMEMBER");
    addText(takeaway, "p", "", data.takeaway);
    panel.appendChild(takeaway);
    return panel;
  }

  function enhanceLearningModules() {
    const root = document.getElementById("moduleLessonContent");
    if (!root) return;

    Object.keys(discussions).forEach((number) => {
      const section = root.querySelector("#lesson-learn");
      if (!section || section.querySelector('[data-module-discussion="' + number + '"]')) return;

      const currentModule = Number(document.getElementById("moduleModalKicker")?.textContent.match(/\d+/)?.[0]);
      if (currentModule !== Number(number)) return;

      const panel = buildDiscussion(Number(number), discussions[number]);
      const miniLessons = section.querySelector(".mini-module-flow");
      const tool = section.querySelector(".module-tool");
      if (miniLessons) miniLessons.insertAdjacentElement("afterend", panel);
      else if (tool) tool.insertAdjacentElement("beforebegin", panel);
      else section.appendChild(panel);
    });
  }

  function start() {
    const root = document.getElementById("moduleLessonContent");
    if (!root || !("MutationObserver" in window)) return;
    const observer = new MutationObserver(() => enhanceLearningModules());
    observer.observe(root, { childList: true, subtree: true });
    enhanceLearningModules();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();