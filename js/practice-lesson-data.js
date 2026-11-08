/* Practical lessons 15–35 extend the existing library and saved lesson IDs. */
Object.assign(window.AILiteracyMoreLessons, {
  "15": {
    "id": 15,
    "parentDomain": 1,
    "title": "Spot AI in Everyday Life",
    "tagline": "Understand what a tool is doing before deciding how to use it.",
    "intro": "A phone calculator, face unlock, and a chatbot can sit on the same screen while doing very different jobs. Pick one feature and describe what it takes in and what it gives back. Use what you can observe to decide whether the feature follows a fixed procedure, appears to rely on learned patterns, or needs more evidence.",
    "objectives": [
      "Explain input and distinguish it from output.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Look at the job behind the feature",
        "A phone can contain a calculator, a face-unlock feature, a spellchecker, and a chatbot. Calling the whole phone intelligent hides the differences between those features. Begin with one function and ask what information enters, what operation happens, and what result appears. You do not need access to the internal code to describe the visible task. A useful explanation might say that a feature compares an image with a stored representation, rather than saying that the phone knows its owner like a person."
      ],
      [
        "Distinguish a rule from a learned pattern",
        "Some software follows explicit rules, while machine learning uses patterns developed from examples. A rule might add a fixed delivery fee when a basket is below a stated amount. A learned system might estimate which item you are likely to select. Real products can combine both approaches, so one visible result does not reveal every internal method. When documentation is unavailable, describe the function you can observe and keep the implementation uncertain instead of confidently labeling every automated feature as AI."
      ],
      [
        "Notice the input and the output",
        "A recommendation system may take signals such as items viewed and produce a ranked list. A translation tool takes language input and produces a candidate rendering in another language. A generated picture begins with a request and ends with a constructed image. These descriptions help you see what a result can establish. An attractive suggestion shows what the system selected, not proof that the item is the best choice for your budget, circumstances, or learning goal."
      ],
      [
        "Separate capability from personality",
        "Conversational tools can apologize, joke, and write encouraging sentences. Those behaviors do not by themselves establish feelings, personal knowledge, or responsibility. You can appreciate a useful response while evaluating it as output from a system. For example, a tool saying that it is proud of your work is not a teacher's assessment against a rubric. Keep the distinction clear when deciding who can actually confirm your grade, provide permission, or take responsibility for a decision."
      ],
      [
        "Compare an AI option with a simpler tool",
        "A generated answer is not always the most efficient route. A calculator can provide a direct arithmetic result, an official timetable can settle a schedule question, and a textbook index can locate a definition. Choose the tool whose function fits the task and whose result you can inspect. Asking a chatbot to invent a deadline creates extra checking work when the issuing office already provides the date. Tool choice begins with the question, rather than the popularity of a feature."
      ],
      [
        "Explain the feature with appropriate limits",
        "Try a plain description: this system uses these inputs to produce this output, and I still need to check this part. If you cannot confirm how a particular product works, say so. A measured description is more useful than a dramatic claim about a machine thinking exactly like a human. When showing the feature to a classmate, demonstrate one example and one limitation. That makes the explanation concrete and gives the other learner something they can test independently."
      ],
      [
        "Compare a calculator and a recommendation feed",
        "A calculator and a shopping feed both display numbers. Enter the same arithmetic expression twice and record the result. Then compare the order of items in two feeds, using fictional examples if needed. The calculator result follows a defined operation. The feed offers a ranking. Write one sentence about the different evidence you would need to trust each output."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Input",
        "text": "The information a feature receives for a particular operation."
      },
      {
        "title": "Output",
        "text": "The result a feature produces, which still needs interpretation."
      },
      {
        "title": "Task fit",
        "text": "How well the function of a tool serves the question you actually need answered."
      }
    ],
    "routine": {
      "name": "Spot AI in Everyday Life",
      "description": "What does the feature actually do? Use the checklist below on the example above.",
      "checklist": [
        "Choose one feature and its purpose.",
        "Identify its visible input and output.",
        "Check whether that output answers your question.",
        "Explain the result and one remaining limitation."
      ]
    },
    "takeaway": "Understand what a tool is doing before deciding how to use it.",
    "scenarios": [
      {
        "title": "A recommended headset",
        "situation": "A shopping app recommends an expensive headset after you view gaming products. Does the recommendation prove it is your best purchase?",
        "action": "Compare the actual specifications and your requirements before choosing.",
        "why": "A ranking reflects a system's selection process, not a complete account of your needs."
      },
      {
        "title": "A fixed service fee",
        "situation": "A phone automatically adds a fixed service fee according to a published rule. What can you conclude?",
        "action": "The visible feature applies an automated rule; that alone does not establish machine learning.",
        "why": "Automation includes many techniques, so explain the rule without inventing an internal learning process."
      },
      {
        "title": "An essay and its rubric",
        "situation": "A chatbot congratulates you on an essay. Who can confirm whether it meets your assignment?",
        "action": "Use the actual rubric and seek the teacher's evaluation where needed.",
        "why": "Friendly language does not give the system the authority of the person assessing the work."
      },
      {
        "title": "The date on a school notice",
        "situation": "You need the exact date on a school notice. Which tool fits best?",
        "action": "Read the current notice from the issuing school channel.",
        "why": "The original notice directly addresses the question and avoids adding generated guesses."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A shopping app recommends an expensive headset after you view gaming products. Does the recommendation prove it is your best purchase?",
        "options": [
          "Buy it because the app selected it.",
          "Compare the actual specifications and your requirements before choosing.",
          "Assume it was chosen by a human adviser."
        ],
        "correct": 1,
        "feedback": "A ranking reflects a system's selection process, not a complete account of your needs."
      },
      {
        "type": "single",
        "question": "A phone automatically adds a fixed service fee according to a published rule. What can you conclude?",
        "options": [
          "Every automatic calculation is a chatbot.",
          "The phone must have human judgment.",
          "The visible feature applies an automated rule; that alone does not establish machine learning."
        ],
        "correct": 2,
        "feedback": "Automation includes many techniques, so explain the rule without inventing an internal learning process."
      },
      {
        "type": "single",
        "question": "A chatbot congratulates you on an essay. Who can confirm whether it meets your assignment?",
        "options": [
          "Use the actual rubric and seek the teacher's evaluation where needed.",
          "Treat congratulations as an official grade.",
          "Ignore the rubric because the response sounds personal."
        ],
        "correct": 0,
        "feedback": "Friendly language does not give the system the authority of the person assessing the work."
      },
      {
        "type": "single",
        "question": "You need the exact date on a school notice. Which tool fits best?",
        "options": [
          "Ask for a plausible date and use it.",
          "Read the current notice from the issuing school channel.",
          "Choose the date mentioned most often by a chatbot."
        ],
        "correct": 1,
        "feedback": "The original notice directly addresses the question and avoids adding generated guesses."
      },
      {
        "type": "single",
        "question": "Which detail helps describe a feature accurately?",
        "options": [
          "Only its colourful icon.",
          "Only whether people call it smart.",
          "Its input and the output it produces."
        ],
        "correct": 2,
        "feedback": "A function-level account makes the capability and its limits easier to inspect."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Compare the actual specifications and your requirements before choosing.",
          "The visible feature applies an automated rule; that alone does not establish machine learning.",
          "Every automatic calculation is a chatbot.",
          "Assume it was chosen by a human adviser."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "A ranking reflects a system's selection process, not a complete account of your needs. Automation includes many techniques, so explain the rule without inventing an internal learning process."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Input",
          "Output",
          "Task fit"
        ],
        "options": [
          "The result a feature produces, which still needs interpretation.",
          "How well the function of a tool serves the question you actually need answered.",
          "The information a feature receives for a particular operation."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Input: The information a feature receives for a particular operation. Output: The result a feature produces, which still needs interpretation. Task fit: How well the function of a tool serves the question you actually need answered."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Choose one feature and its purpose.",
          "Identify its visible input and output.",
          "Check whether that output answers your question.",
          "Explain the result and one remaining limitation."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Choose one feature and its purpose. Identify its visible input and output. Check whether that output answers your question. Explain the result and one remaining limitation."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "A translation sounds natural. What remains your responsibility?",
        "options": [
          "Check whether it preserves the intended meaning.",
          "Assume natural wording proves the meaning.",
          "Treat the tool as the author of the original message."
        ],
        "correct": 0,
        "feedback": "Fluency can help readability while still hiding changes to the original meaning."
      },
      {
        "type": "single",
        "question": "You cannot confirm whether an app uses machine learning. How should you explain it?",
        "options": [
          "Invent a technical explanation.",
          "Describe its observed function and state that the internal method is unconfirmed.",
          "Label every feature as generative AI."
        ],
        "correct": 1,
        "feedback": "An honest boundary between observation and inference keeps your explanation accurate."
      },
      {
        "type": "single",
        "question": "Why choose a calculator for a straightforward total?",
        "options": [
          "It can decide the meaning of a school policy.",
          "It removes the need to enter correct values.",
          "Its function directly fits the arithmetic task."
        ],
        "correct": 2,
        "feedback": "Task fit matters, and even a suitable tool depends on the values and operation you provide."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Ignore the rubric because the response sounds personal.",
          "Use the actual rubric and seek the teacher's evaluation where needed.",
          "Read the current notice from the issuing school channel.",
          "Ask for a plausible date and use it."
        ],
        "correct": [
          1,
          2
        ],
        "feedback": "Friendly language does not give the system the authority of the person assessing the work. The original notice directly addresses the question and avoids adding generated guesses."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A shopping app recommends an expensive headset after you view gaming products. Does the recommendation prove it is your best purchase?",
          "A phone automatically adds a fixed service fee according to a published rule. What can you conclude?",
          "A chatbot congratulates you on an essay. Who can confirm whether it meets your assignment?"
        ],
        "options": [
          "Use the actual rubric and seek the teacher's evaluation where needed.",
          "Compare the actual specifications and your requirements before choosing.",
          "The visible feature applies an automated rule; that alone does not establish machine learning."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A ranking reflects a system's selection process, not a complete account of your needs. Automation includes many techniques, so explain the rule without inventing an internal learning process. Friendly language does not give the system the authority of the person assessing the work."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Choose one feature and its purpose.",
          "Identify its visible input and output.",
          "Check whether that output answers your question.",
          "Explain the result and one remaining limitation."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Choose one feature and its purpose. Identify its visible input and output. Check whether that output answers your question. Explain the result and one remaining limitation."
      }
    ],
    "references": [
      "ml",
      "long"
    ],
    "videoIds": []
  },
  "16": {
    "id": 16,
    "parentDomain": 1,
    "title": "How AI Learns from Examples",
    "tagline": "See why training examples and testing conditions matter.",
    "intro": "A photo sorter works on the training pictures and struggles when the lights are dim. This lesson explores what a system can learn from examples and why a useful test includes new cases. You’ll plan a small classification test and describe a failure without guessing at its cause.",
    "objectives": [
      "Explain training example and distinguish it from label.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Start with an ordinary classification task",
        "Imagine sorting photos into pictures with a bicycle and pictures without one. A machine-learning system can use labelled examples to develop patterns useful for that task. The training process is different from a person writing a separate rule for every possible photograph. It also does not mean the system understands road safety, ownership, or the purpose of a bicycle. Keep the task narrow when explaining what the examples are intended to teach and what a successful output would look like."
      ],
      [
        "Ask who and what the examples include",
        "A collection containing only bright outdoor photographs may poorly represent dim indoor scenes. The issue is not simply whether the collection is large. Ask about relevant variety: lighting, viewpoint, background, and the cases that matter in use. A thousand nearly identical examples can leave important conditions unrepresented. In a classroom demonstration, list the situations the system might encounter and compare that list with the available examples before celebrating an impressive result on familiar pictures."
      ],
      [
        "Understand the role of labels",
        "A label is information attached to an example for a task, such as bicycle present or bicycle absent. Inconsistent labels can make the intended distinction unclear. Even a consistent label may represent a limited definition, so discuss ambiguous cases before treating the categories as natural facts. A partly hidden bicycle, a toy bicycle, and a drawing might require a stated classroom rule. Good discussion begins with what a category means and who made the decision about borderline cases."
      ],
      [
        "Keep practice and testing separate",
        "If you show only the same examples used during training, the results do not demonstrate performance on new cases. Reserve separate examples that reflect intended use. In a small learning activity, this could mean keeping several different photos aside and trying them after the initial setup. Do not quietly replace the difficult cases with easy ones. Record mistakes as information about the system rather than treating an attractive demonstration as proof that it will handle every future situation."
      ],
      [
        "Read mistakes as clues about conditions",
        "A wrong result can suggest that the input is unusual, the examples were narrow, or the task definition was unclear. One error rarely reveals the entire cause by itself. Compare several cases before proposing a fix, and change one relevant factor when possible. If a classifier struggles with dark images, test varied lighting rather than assuming it dislikes a particular person. Describe the observed pattern carefully and avoid turning an unexplained error into a confident story about the system's intentions."
      ],
      [
        "Explain performance without promising perfection",
        "A useful report names the task, the examples tried, the successes, and the conditions where errors occurred. If eight of ten classroom tests worked, say which ten tests you used rather than claiming universal accuracy. A small demonstration can help you understand learning from examples without establishing suitability for consequential use. End with a realistic next step, such as broader testing or clearer categories, and keep a human responsible for deciding whether the tool fits the actual activity."
      ],
      [
        "Test a bicycle sorter with unfamiliar photos",
        "Set aside examples before training a mock bicycle sorter. Include a clear bicycle, a partly hidden bicycle, and a scooter that could be confused with one. Agree on labels first. After testing, describe which case failed and under what conditions. If every test picture was taken in daylight, state that the results leave low-light performance open."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Training example",
        "text": "A case used to develop patterns for a defined task."
      },
      {
        "title": "Label",
        "text": "A task-specific category or answer attached to an example."
      },
      {
        "title": "Test case",
        "text": "A separate case used to inspect performance after training."
      }
    ],
    "routine": {
      "name": "How AI Learns from Examples",
      "description": "Plan a fair test. Use the checklist below on the example above.",
      "checklist": [
        "Define the task and categories.",
        "Inspect the variety and labels of examples.",
        "Try separate cases under relevant conditions.",
        "Describe successes, errors, and limits."
      ]
    },
    "takeaway": "See why training examples and testing conditions matter.",
    "scenarios": [
      {
        "title": "Sunny training photos",
        "situation": "Your bicycle classifier was shown only sunny street photos. It fails on a dark garage picture. What should you inspect?",
        "action": "Check whether lighting and other relevant conditions were represented in the examples.",
        "why": "Training coverage can affect results, but one failure does not by itself prove the full cause."
      },
      {
        "title": "Testing on familiar images",
        "situation": "A group tests a model only on the same photos used to teach it. What is missing?",
        "action": "Separate examples that the system has not already used in training.",
        "why": "A familiar example can demonstrate a response without showing performance on new cases."
      },
      {
        "title": "Disagreeing on a label",
        "situation": "Two classmates label the same toy bicycle differently. What should the group do?",
        "action": "Agree on the category definition and review inconsistent labels.",
        "why": "The task needs a clear meaning before its results can be interpreted."
      },
      {
        "title": "Reporting a small test",
        "situation": "Eight of ten classroom photos are classified correctly. What is a fair report?",
        "action": "Report eight correct results on those ten stated tests and describe the two errors.",
        "why": "A bounded account makes the evidence inspectable without promising success on unseen conditions."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "Your bicycle classifier was shown only sunny street photos. It fails on a dark garage picture. What should you inspect?",
        "options": [
          "Check whether lighting and other relevant conditions were represented in the examples.",
          "Decide that the system is angry.",
          "Hide the garage example from the report."
        ],
        "correct": 0,
        "feedback": "Training coverage can affect results, but one failure does not by itself prove the full cause."
      },
      {
        "type": "single",
        "question": "A group tests a model only on the same photos used to teach it. What is missing?",
        "options": [
          "More copies of the same test photo.",
          "Separate examples that the system has not already used in training.",
          "A more impressive name for the model."
        ],
        "correct": 1,
        "feedback": "A familiar example can demonstrate a response without showing performance on new cases."
      },
      {
        "type": "single",
        "question": "Two classmates label the same toy bicycle differently. What should the group do?",
        "options": [
          "Use both labels without explanation.",
          "Assume the disagreement proves that all learning systems fail.",
          "Agree on the category definition and review inconsistent labels."
        ],
        "correct": 2,
        "feedback": "The task needs a clear meaning before its results can be interpreted."
      },
      {
        "type": "single",
        "question": "Eight of ten classroom photos are classified correctly. What is a fair report?",
        "options": [
          "Report eight correct results on those ten stated tests and describe the two errors.",
          "Announce that the model is always accurate.",
          "Delete the mistakes to improve the percentage."
        ],
        "correct": 0,
        "feedback": "A bounded account makes the evidence inspectable without promising success on unseen conditions."
      },
      {
        "type": "single",
        "question": "What matters besides the number of examples?",
        "options": [
          "Only the file names.",
          "Their relevant variety and the quality of their task labels.",
          "Only the order of a presentation."
        ],
        "correct": 1,
        "feedback": "Coverage and clear categories affect what patterns a task can support."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Separate examples that the system has not already used in training.",
          "More copies of the same test photo.",
          "Check whether lighting and other relevant conditions were represented in the examples.",
          "Hide the garage example from the report."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "Training coverage can affect results, but one failure does not by itself prove the full cause. A familiar example can demonstrate a response without showing performance on new cases."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Training example",
          "Label",
          "Test case"
        ],
        "options": [
          "A task-specific category or answer attached to an example.",
          "A separate case used to inspect performance after training.",
          "A case used to develop patterns for a defined task."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Training example: A case used to develop patterns for a defined task. Label: A task-specific category or answer attached to an example. Test case: A separate case used to inspect performance after training."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Define the task and categories.",
          "Inspect the variety and labels of examples.",
          "Try separate cases under relevant conditions.",
          "Describe successes, errors, and limits."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Define the task and categories. Inspect the variety and labels of examples. Try separate cases under relevant conditions. Describe successes, errors, and limits."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "A model correctly sorts one photo. What does that establish?",
        "options": [
          "Human understanding of everything in the scene.",
          "Perfect performance on all future photos.",
          "Its result on that particular input."
        ],
        "correct": 2,
        "feedback": "A single success is useful evidence about one case, not a universal guarantee."
      },
      {
        "type": "single",
        "question": "Why keep a test set aside?",
        "options": [
          "To inspect performance on cases not used during training.",
          "To make the folder look larger.",
          "To avoid ever recording mistakes."
        ],
        "correct": 0,
        "feedback": "Separate tests help distinguish familiar-example success from broader performance."
      },
      {
        "type": "single",
        "question": "A confusing result appears. What is the best next move?",
        "options": [
          "Invent an emotion for the model.",
          "Compare related cases and investigate possible conditions.",
          "Treat the first guessed explanation as proven."
        ],
        "correct": 1,
        "feedback": "Careful comparison supports a more defensible explanation of an observed error."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Report eight correct results on those ten stated tests and describe the two errors.",
          "Announce that the model is always accurate.",
          "Agree on the category definition and review inconsistent labels.",
          "Assume the disagreement proves that all learning systems fail."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "The task needs a clear meaning before its results can be interpreted. A bounded account makes the evidence inspectable without promising success on unseen conditions."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "Your bicycle classifier was shown only sunny street photos. It fails on a dark garage picture. What should you inspect?",
          "A group tests a model only on the same photos used to teach it. What is missing?",
          "Two classmates label the same toy bicycle differently. What should the group do?"
        ],
        "options": [
          "Agree on the category definition and review inconsistent labels.",
          "Check whether lighting and other relevant conditions were represented in the examples.",
          "Separate examples that the system has not already used in training."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. Training coverage can affect results, but one failure does not by itself prove the full cause. A familiar example can demonstrate a response without showing performance on new cases. The task needs a clear meaning before its results can be interpreted."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Define the task and categories.",
          "Inspect the variety and labels of examples.",
          "Try separate cases under relevant conditions.",
          "Describe successes, errors, and limits."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Define the task and categories. Inspect the variety and labels of examples. Try separate cases under relevant conditions. Describe successes, errors, and limits."
      }
    ],
    "references": [
      "datasets",
      "ml"
    ],
    "videoIds": [
      "OeU5m6vRyCk",
      "JO9MgO1Zp3E"
    ]
  },
  "17": {
    "id": 17,
    "parentDomain": 1,
    "title": "Search, Chatbots, and Recommendations",
    "tagline": "Choose the right route to information instead of treating every tool alike.",
    "intro": "Finding a school memo, asking for an explanation, and discovering a useful video call for different tools. Compare retrieval, generation, and ranking so you can choose a route to the result you actually need.",
    "objectives": [
      "Explain discovery and distinguish it from generated explanation.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Begin with three different jobs",
        "A search engine helps locate indexed material, a chatbot generates a conversational response, and a recommendation system ranks items for a user or situation. Products may combine these functions, so inspect the feature in front of you. A chatbot with source links still produces an answer you must inspect, and a search result still needs a source check. Distinguishing the jobs helps you understand why the same question may lead to different kinds of output and different checking responsibilities."
      ],
      [
        "Use search to reach material you can inspect",
        "When you need an original announcement, a definition in a manual, or a document's exact wording, search can help you locate it. Read beyond the result title or preview. Open the issuing source, inspect the date, and confirm that the page answers the question. A result near the top is not automatically the original or the most suitable evidence. The useful endpoint is material you can evaluate, rather than a list that happens to look familiar."
      ],
      [
        "Use a chatbot for a draft explanation",
        "A conversational answer can suggest an outline, unpack a term, or generate practice examples. Treat those outputs as candidates to work with. Ask yourself which parts are explanations and which parts make factual claims that need support. If the response supplies a quotation, source, or current deadline, inspect the original. A tool can be helpful for understanding while still being the wrong final authority for a precise factual statement you plan to use."
      ],
      [
        "Understand a ranked recommendation",
        "A feed or shopping list is selected and ordered according to a system's goals and available signals. It is not a complete catalogue of everything relevant to you. The first video may be engaging without being the clearest explanation of your topic. Deliberately compare alternatives and return to your own criteria. For schoolwork, write the learning question first so that a stream of attractive but unrelated suggestions does not quietly become your study plan."
      ],
      [
        "Move between tools with a reason",
        "A useful sequence might begin with a chatbot suggesting search terms, continue with an original source, and end with your own summary. Another task might need only a direct visit to the school notice. Decide what each step adds. Repeating a question across tools without inspecting evidence can multiply answers without improving certainty. Keep a short note identifying the material that actually supports the conclusion, especially when a generated response helped you discover it."
      ],
      [
        "Know when an answer is finished",
        "Stop when you have enough suitable support for the task and can explain the conclusion yourself. A recommendation feed has no natural end, and a chatbot can always generate another version. More output is not necessarily better evidence. If the question requires a current official instruction, finish at the confirmed instruction. If it requires understanding, finish by applying the idea to a fresh example. Your goal determines completion, rather than the tool's invitation to keep interacting."
      ],
      [
        "Check a deadline and learn a concept",
        "Imagine you need a competition deadline and a simple explanation of the entry criteria. Use search to locate the issuing organization’s notice and record its date. Then use a chatbot for a plain-language explanation of one criterion. Compare that explanation with the notice. A recommendation feed might help you discover examples, but keep the official wording with your deadline notes."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Discovery",
        "text": "Finding candidate material that may help answer a question."
      },
      {
        "title": "Generated explanation",
        "text": "A constructed response that can help understanding but still needs checking."
      },
      {
        "title": "Ranking",
        "text": "The order in which a system presents selected items."
      }
    ],
    "routine": {
      "name": "Search, Chatbots, and Recommendations",
      "description": "Choose a tool by the job. Use the checklist below on the example above.",
      "checklist": [
        "State what kind of answer the task needs.",
        "Choose a tool for discovery, explanation, or confirmation.",
        "Inspect the material that supports the answer.",
        "Explain the conclusion and stop when the goal is met."
      ]
    },
    "takeaway": "Choose the right route to information instead of treating every tool alike.",
    "scenarios": [
      {
        "title": "Finding the application deadline",
        "situation": "You need the current application deadline for a school programme. Which route fits?",
        "action": "Locate and read the current issuing school's announcement.",
        "why": "A generated guess or search preview can point you somewhere but cannot replace the actual notice."
      },
      {
        "title": "A feed that repeats one viewpoint",
        "situation": "A feed shows ten videos on the same topic. Does that establish the full range of viewpoints?",
        "action": "No; compare sources beyond the selected feed where the task requires it.",
        "why": "A ranked selection can be narrow even when it contains many items."
      },
      {
        "title": "Using chatbot search terms",
        "situation": "A chatbot suggests useful search terms. What should happen before citing a result?",
        "action": "Open and evaluate the relevant original material.",
        "why": "Discovery support does not turn a generated suggestion into inspected evidence."
      },
      {
        "title": "Explaining a summary from memory",
        "situation": "You keep generating new summaries but still cannot explain the idea. What should change?",
        "action": "Try a fresh example and locate the precise gap in understanding.",
        "why": "Completion depends on your ability to use the idea, not the number of summaries produced."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "You need the current application deadline for a school programme. Which route fits?",
        "options": [
          "Use the first chatbot date.",
          "Assume a popular video has the current deadline.",
          "Locate and read the current issuing school's announcement."
        ],
        "correct": 2,
        "feedback": "A generated guess or search preview can point you somewhere but cannot replace the actual notice."
      },
      {
        "type": "single",
        "question": "A feed shows ten videos on the same topic. Does that establish the full range of viewpoints?",
        "options": [
          "No; compare sources beyond the selected feed where the task requires it.",
          "Yes, because ten videos are a complete catalogue.",
          "Yes, because ranking is the same as independent verification."
        ],
        "correct": 0,
        "feedback": "A ranked selection can be narrow even when it contains many items."
      },
      {
        "type": "single",
        "question": "A chatbot suggests useful search terms. What should happen before citing a result?",
        "options": [
          "Cite the suggestion as if it were the document.",
          "Open and evaluate the relevant original material.",
          "Use a source title without opening it."
        ],
        "correct": 1,
        "feedback": "Discovery support does not turn a generated suggestion into inspected evidence."
      },
      {
        "type": "single",
        "question": "You keep generating new summaries but still cannot explain the idea. What should change?",
        "options": [
          "Generate summaries indefinitely.",
          "Treat reading fluency as proof of mastery.",
          "Try a fresh example and locate the precise gap in understanding."
        ],
        "correct": 2,
        "feedback": "Completion depends on your ability to use the idea, not the number of summaries produced."
      },
      {
        "type": "single",
        "question": "What does a top search result guarantee?",
        "options": [
          "Only that it is presented in that position, not that it is the best evidence.",
          "That every claim on the page is correct.",
          "That it is the original source."
        ],
        "correct": 0,
        "feedback": "Position and credibility are separate features to inspect."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Locate and read the current issuing school's announcement.",
          "No; compare sources beyond the selected feed where the task requires it.",
          "Yes, because ten videos are a complete catalogue.",
          "Assume a popular video has the current deadline."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "A generated guess or search preview can point you somewhere but cannot replace the actual notice. A ranked selection can be narrow even when it contains many items."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Discovery",
          "Generated explanation",
          "Ranking"
        ],
        "options": [
          "A constructed response that can help understanding but still needs checking.",
          "The order in which a system presents selected items.",
          "Finding candidate material that may help answer a question."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Discovery: Finding candidate material that may help answer a question. Generated explanation: A constructed response that can help understanding but still needs checking. Ranking: The order in which a system presents selected items."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "State what kind of answer the task needs.",
          "Choose a tool for discovery, explanation, or confirmation.",
          "Inspect the material that supports the answer.",
          "Explain the conclusion and stop when the goal is met."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. State what kind of answer the task needs. Choose a tool for discovery, explanation, or confirmation. Inspect the material that supports the answer. Explain the conclusion and stop when the goal is met."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Which question helps control a recommendation feed?",
        "options": [
          "How can I watch every suggested item?",
          "What learning goal am I trying to meet?",
          "Which item has the brightest thumbnail?"
        ],
        "correct": 1,
        "feedback": "A stated goal lets you evaluate relevance instead of following selection automatically."
      },
      {
        "type": "single",
        "question": "A chatbot displays a source link. What remains necessary?",
        "options": [
          "Trust the link label without opening it.",
          "Assume a link means every sentence was verified.",
          "Read the source and check whether it supports the exact statement."
        ],
        "correct": 2,
        "feedback": "Source existence, relevance, and actual support require inspection."
      },
      {
        "type": "single",
        "question": "When should you stop searching for a simple instruction?",
        "options": [
          "When the current relevant issuing source answers it clearly.",
          "Only when all websites agree word for word.",
          "When a feed has no more items."
        ],
        "correct": 0,
        "feedback": "A proportionate endpoint is better than endless tool use without a clearer answer."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Use a source title without opening it.",
          "Generate summaries indefinitely.",
          "Try a fresh example and locate the precise gap in understanding.",
          "Open and evaluate the relevant original material."
        ],
        "correct": [
          2,
          3
        ],
        "feedback": "Discovery support does not turn a generated suggestion into inspected evidence. Completion depends on your ability to use the idea, not the number of summaries produced."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "You need the current application deadline for a school programme. Which route fits?",
          "A feed shows ten videos on the same topic. Does that establish the full range of viewpoints?",
          "A chatbot suggests useful search terms. What should happen before citing a result?"
        ],
        "options": [
          "Open and evaluate the relevant original material.",
          "Locate and read the current issuing school's announcement.",
          "No; compare sources beyond the selected feed where the task requires it."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A generated guess or search preview can point you somewhere but cannot replace the actual notice. A ranked selection can be narrow even when it contains many items. Discovery support does not turn a generated suggestion into inspected evidence."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "State what kind of answer the task needs.",
          "Choose a tool for discovery, explanation, or confirmation.",
          "Inspect the material that supports the answer.",
          "Explain the conclusion and stop when the goal is met."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. State what kind of answer the task needs. Choose a tool for discovery, explanation, or confirmation. Inspect the material that supports the answer. Explain the conclusion and stop when the goal is met."
      }
    ],
    "references": [
      "feed",
      "ml"
    ],
    "videoIds": [
      "X-AWdfSFCHQ"
    ]
  },
  "18": {
    "id": 18,
    "parentDomain": 2,
    "title": "Check Numbers, Tables, and Charts",
    "tagline": "Inspect the calculation and the meaning behind an impressive number.",
    "intro": "A chart can be drawn neatly and still hide who was counted. Learn to identify the quantity, inspect the denominator, and redo the calculation. Then separate what the figures show from explanations the figures alone cannot establish.",
    "objectives": [
      "Explain denominator and distinguish it from unit.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Find the quantity being described",
        "Before checking arithmetic, ask what the number represents. Is it a count of people, a number of responses, a percentage, or an average? A table can contain repeated entries, missing values, and different units even when it looks tidy. Write the quantity in a sentence before interpreting it. For example, twelve submitted forms does not automatically mean twelve unique participants. You need the counting rule and the relevant records to understand what the total actually describes."
      ],
      [
        "Inspect the denominator of a percentage",
        "A percentage depends on both the part and the whole. If eighteen of twenty learners complete a task, the completion rate is ninety percent for that stated group. That does not describe every learner in the school. Ask whether unanswered items were excluded and whether categories overlap. A generated answer may calculate correctly from the wrong total. Checking the denominator makes the scope visible and helps you explain exactly which group the percentage represents."
      ],
      [
        "Recalculate with an appropriate method",
        "Use a calculator or spreadsheet to independently inspect important totals and formulas. Enter the original values carefully and check the operation, rather than copying the generated result into another tool unchanged. Keep units beside numbers and preserve enough detail to reproduce the work. If a table adds pesos and item counts in one total, arithmetic alone cannot make it meaningful. A useful check examines both whether the operation is performed correctly and whether it makes sense for the quantity."
      ],
      [
        "Read a chart's scale and labels",
        "A chart can exaggerate a difference through its scale, omit a time period, or use labels that hide what was measured. Look at the axes, units, categories, and source values. If two bars look very different, compare their actual numbers before describing the size of the change. Do not assume that an appealing visual proves the underlying data are complete. Your explanation should connect what the viewer sees with the measurements and conditions that produced the chart."
      ],
      [
        "Distinguish change from an explanation of change",
        "A table showing higher scores after an activity does not, on its own, establish the sole cause of the difference. Other conditions may have changed, and the comparison may involve different groups. Describe the observed difference first. A stronger causal claim requires an appropriate basis beyond a neat before-and-after picture. In everyday use, the practical habit is to separate what the records directly show from the story someone attaches to those records."
      ],
      [
        "Keep an audit note you can explain",
        "When correcting a result, record the input, operation, and reason for the change. A short note might state that a duplicate entry was removed under a defined rule or that a denominator should include only answered items. Avoid silently changing inconvenient values to produce a nicer conclusion. If the records do not establish a fact, leave that uncertainty visible. Clear counting and calculation decisions allow another person to reproduce the result and understand its proper limits."
      ],
      [
        "Recompute a percentage from a class table",
        "A fictional survey has 40 usable responses. Twelve learners chose an option. A caption says 40% chose it. Calculate 12 divided by 40 and convert it to a percentage. Then imagine five more people submitted forms without answering this question. Explain which denominator belongs to this item and how you would label the result in a chart."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Denominator",
        "text": "The whole used as the reference for a fraction or percentage."
      },
      {
        "title": "Unit",
        "text": "What a number measures, such as pesos, minutes, or people."
      },
      {
        "title": "Reproducible calculation",
        "text": "A result whose inputs and operation can be checked by someone else."
      }
    ],
    "routine": {
      "name": "Check Numbers, Tables, and Charts",
      "description": "Write the calculation before judging the number. Use the checklist below on the example above.",
      "checklist": [
        "Identify the quantity, unit, and counting rule.",
        "Inspect original values and the denominator.",
        "Recalculate and compare chart labels.",
        "State the result with its group and limits."
      ]
    },
    "takeaway": "Inspect the calculation and the meaning behind an impressive number.",
    "scenarios": [
      {
        "title": "Counting forms and people",
        "situation": "A table lists twenty forms, including two confirmed duplicate submissions. What should determine the people count?",
        "action": "A stated rule identifying unique people from the actual records.",
        "why": "Forms and people are different quantities; a defensible count needs a clear rule rather than a guess."
      },
      {
        "title": "Calculating a completion rate",
        "situation": "Eighteen of twenty learners completed a task. What is the completion percentage for this group?",
        "action": "Ninety percent.",
        "why": "The numerator eighteen divided by the denominator twenty gives 0.9, or ninety percent."
      },
      {
        "title": "Reading a truncated chart",
        "situation": "A chart's bars look twice as tall but the values are 98 and 100. What should you check?",
        "action": "Inspect the axis scale and describe the actual two-unit difference.",
        "why": "Visual size can reflect a restricted axis, so compare the values before claiming a doubled quantity."
      },
      {
        "title": "Keeping units separate",
        "situation": "A generated total combines five items and fifty pesos. What is the issue?",
        "action": "The quantities have different units and need separate interpretation.",
        "why": "An arithmetic sum does not establish a meaningful combined quantity when units differ."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A table lists twenty forms, including two confirmed duplicate submissions. What should determine the people count?",
        "options": [
          "Call every row a new person.",
          "A stated rule identifying unique people from the actual records.",
          "Delete two arbitrary rows to get a preferred total."
        ],
        "correct": 1,
        "feedback": "Forms and people are different quantities; a defensible count needs a clear rule rather than a guess."
      },
      {
        "type": "single",
        "question": "Eighteen of twenty learners completed a task. What is the completion percentage for this group?",
        "options": [
          "Eighteen percent.",
          "One hundred and ten percent.",
          "Ninety percent."
        ],
        "correct": 2,
        "feedback": "The numerator eighteen divided by the denominator twenty gives 0.9, or ninety percent."
      },
      {
        "type": "single",
        "question": "A chart's bars look twice as tall but the values are 98 and 100. What should you check?",
        "options": [
          "Inspect the axis scale and describe the actual two-unit difference.",
          "Report that the quantity doubled.",
          "Ignore the printed values because the graphic is clearer."
        ],
        "correct": 0,
        "feedback": "Visual size can reflect a restricted axis, so compare the values before claiming a doubled quantity."
      },
      {
        "type": "single",
        "question": "A generated total combines five items and fifty pesos. What is the issue?",
        "options": [
          "The total is automatically fifty-five pesos.",
          "The quantities have different units and need separate interpretation.",
          "The total must be fifty-five people."
        ],
        "correct": 1,
        "feedback": "An arithmetic sum does not establish a meaningful combined quantity when units differ."
      },
      {
        "type": "single",
        "question": "Which check comes before describing a percentage?",
        "options": [
          "Choose the most impressive wording.",
          "Round every value to a whole number first.",
          "Identify the relevant whole and the counting rule."
        ],
        "correct": 2,
        "feedback": "A percentage has meaning only in relation to its stated denominator and scope."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Delete two arbitrary rows to get a preferred total.",
          "Ninety percent.",
          "Eighteen percent.",
          "A stated rule identifying unique people from the actual records."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "Forms and people are different quantities; a defensible count needs a clear rule rather than a guess. The numerator eighteen divided by the denominator twenty gives 0.9, or ninety percent."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Denominator",
          "Unit",
          "Reproducible calculation"
        ],
        "options": [
          "What a number measures, such as pesos, minutes, or people.",
          "A result whose inputs and operation can be checked by someone else.",
          "The whole used as the reference for a fraction or percentage."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Denominator: The whole used as the reference for a fraction or percentage. Unit: What a number measures, such as pesos, minutes, or people. Reproducible calculation: A result whose inputs and operation can be checked by someone else."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the quantity, unit, and counting rule.",
          "Inspect original values and the denominator.",
          "Recalculate and compare chart labels.",
          "State the result with its group and limits."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the quantity, unit, and counting rule. Inspect original values and the denominator. Recalculate and compare chart labels. State the result with its group and limits."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Scores rise after a new activity. What is directly supported by that observation alone?",
        "options": [
          "An observed difference in the stated records.",
          "Proof of the only cause.",
          "A guarantee for every future class."
        ],
        "correct": 0,
        "feedback": "Description of a difference and explanation of its cause require different support."
      },
      {
        "type": "single",
        "question": "What makes a corrected total reviewable?",
        "options": [
          "Only a replacement screenshot.",
          "The original values, operation, and stated reason for correction.",
          "A claim that the AI checked everything."
        ],
        "correct": 1,
        "feedback": "An inspectable correction explains how the result follows from the records."
      },
      {
        "type": "single",
        "question": "A spreadsheet repeats an AI's wrong input. Has independent checking occurred?",
        "options": [
          "Yes, because another app displays it.",
          "Yes, because spreadsheets never contain errors.",
          "No; inspect the original inputs as well as the formula."
        ],
        "correct": 2,
        "feedback": "Reusing the same mistaken input can reproduce an error across tools."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Ignore the printed values because the graphic is clearer.",
          "Inspect the axis scale and describe the actual two-unit difference.",
          "The quantities have different units and need separate interpretation.",
          "The total is automatically fifty-five pesos."
        ],
        "correct": [
          1,
          2
        ],
        "feedback": "Visual size can reflect a restricted axis, so compare the values before claiming a doubled quantity. An arithmetic sum does not establish a meaningful combined quantity when units differ."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A table lists twenty forms, including two confirmed duplicate submissions. What should determine the people count?",
          "Eighteen of twenty learners completed a task. What is the completion percentage for this group?",
          "A chart's bars look twice as tall but the values are 98 and 100. What should you check?"
        ],
        "options": [
          "Inspect the axis scale and describe the actual two-unit difference.",
          "A stated rule identifying unique people from the actual records.",
          "Ninety percent."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. Forms and people are different quantities; a defensible count needs a clear rule rather than a guess. The numerator eighteen divided by the denominator twenty gives 0.9, or ninety percent. Visual size can reflect a restricted axis, so compare the values before claiming a doubled quantity."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the quantity, unit, and counting rule.",
          "Inspect original values and the denominator.",
          "Recalculate and compare chart labels.",
          "State the result with its group and limits."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the quantity, unit, and counting rule. Inspect original values and the denominator. Recalculate and compare chart labels. State the result with its group and limits."
      }
    ],
    "references": [
      "charts"
    ],
    "videoIds": []
  },
  "19": {
    "id": 19,
    "parentDomain": 2,
    "title": "Compare Conflicting AI Answers",
    "tagline": "Resolve disagreement with evidence rather than a vote between chatbots.",
    "intro": "Two chatbots give different totals for the same task. One may be using a different definition or starting condition. You’ll locate the exact disagreement, compare assumptions, and seek evidence outside both answers.",
    "objectives": [
      "Explain assumption and distinguish it from disputed claim.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Write down the disagreement precisely",
        "Two answers can seem contradictory because they address different versions of a question. Copy the specific disputed statements into your notes and identify the conditions attached to each. One might refer to a current rule while another describes a historical practice. Another pair might use different definitions of the same term. Before choosing a winner, make sure the claims are actually competing on the same issue and are not merely using different scopes or levels of detail."
      ],
      [
        "Compare assumptions before conclusions",
        "A response often relies on assumptions it does not clearly announce. In a travel-time estimate, one answer might assume an empty road while another assumes normal traffic. In a classroom problem, one might use a different unit. Identify these assumptions and see which fits the task. A disagreement caused by mismatched inputs cannot be resolved by selecting the more confident wording. Correct the conditions first, then decide what conclusions those conditions can support."
      ],
      [
        "Return to evidence outside the conversation",
        "Asking another chatbot to judge the first two can produce another unsupported opinion. Locate material appropriate to the disputed claim: the original instruction, a worked calculation, a direct source, or a relevant textbook explanation. Check whether it bears on the exact question. Evidence should help explain the conclusion, not merely add an impressive name. Keep a note of where the decisive information appears so that someone else can inspect the reasoning."
      ],
      [
        "Do not count repeated answers as independent proof",
        "Several tools may produce the same familiar statement or repeat material from the same origin. Agreement can be a useful prompt for investigation, but it does not replace investigation. A minority answer may be correct, and a widely repeated one may be outdated. The task is to inspect the support and conditions, rather than hold a popularity contest. If all outputs lack an inspectable basis, record that limitation instead of awarding truth to the majority."
      ],
      [
        "Use a small test when the claim allows one",
        "Some disagreements can be examined through a transparent calculation or a safe example. If answers dispute a conversion, state the units and work through the operation. If they offer different interpretations of a sentence, compare the exact words in context. Choose a test that actually distinguishes the claims and does not expose private data or cause real-world harm. An unrelated demonstration can look persuasive without resolving the issue you began with."
      ],
      [
        "Explain the resolution or the remaining uncertainty",
        "Your final note should identify the disputed claim, the relevant conditions, and the material or test that supports your decision. If you cannot resolve it, state what remains unknown and avoid acting as though certainty has been established. A useful conclusion can be conditional: under these assumptions, this answer fits. That is more precise than announcing that one system is always reliable. Carry the same habit into the next task rather than permanently trusting a tool after one success."
      ],
      [
        "Find the hidden assumption in two totals",
        "Two estimates say a five-person club trip costs ₱500 or ₱600. The first counts five ₱100 fares. The second includes a ₱100 group fee. State the assumption that makes each total possible. If a written fee schedule confirms the group charge, cite it and show the calculation. Explain what you would report if the schedule did not mention the charge."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Assumption",
        "text": "A condition treated as true when producing an answer."
      },
      {
        "title": "Disputed claim",
        "text": "The exact statement on which the answers disagree."
      },
      {
        "title": "Decisive check",
        "text": "An inspection or test that bears directly on the disagreement."
      }
    ],
    "routine": {
      "name": "Compare Conflicting AI Answers",
      "description": "Put the disagreement into one sentence. Use the checklist below on the example above.",
      "checklist": [
        "Identify the precise disputed statement.",
        "Align definitions, inputs, and assumptions.",
        "Inspect a relevant source or transparent test.",
        "Explain the supported conclusion or uncertainty."
      ]
    },
    "takeaway": "Resolve disagreement with evidence rather than a vote between chatbots.",
    "scenarios": [
      {
        "title": "Two different application deadlines",
        "situation": "Two chatbots give different deadlines for the same programme. What settles the task best?",
        "action": "Inspect the current issuing organization's notice.",
        "why": "The relevant original instruction has a more direct relationship to the deadline than generated agreement."
      },
      {
        "title": "Estimates with different starting points",
        "situation": "Two travel-time estimates assume different starting points. What should happen first?",
        "action": "Align the route and starting conditions before comparing the estimates.",
        "why": "Different assumptions can produce different results without a direct factual contradiction."
      },
      {
        "title": "A quote repeated by several tools",
        "situation": "Three tools repeat a quote but none identifies its original location. What is established?",
        "action": "Repeated wording, with the quotation still needing verification.",
        "why": "Agreement does not establish an inspectable source for the exact quotation."
      },
      {
        "title": "Resolving a unit conversion",
        "situation": "A conversion dispute can be checked with stated units and arithmetic. What is useful?",
        "action": "Work through the operation from the given values and compare the results.",
        "why": "A transparent check can resolve a claim without relying on the reputation of either tool."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "Two chatbots give different deadlines for the same programme. What settles the task best?",
        "options": [
          "Inspect the current issuing organization's notice.",
          "Ask five more bots and choose the most common date.",
          "Choose the answer written with more confidence."
        ],
        "correct": 0,
        "feedback": "The relevant original instruction has a more direct relationship to the deadline than generated agreement."
      },
      {
        "type": "single",
        "question": "Two travel-time estimates assume different starting points. What should happen first?",
        "options": [
          "Average the estimates immediately.",
          "Align the route and starting conditions before comparing the estimates.",
          "Declare the shorter estimate correct because it is convenient."
        ],
        "correct": 1,
        "feedback": "Different assumptions can produce different results without a direct factual contradiction."
      },
      {
        "type": "single",
        "question": "Three tools repeat a quote but none identifies its original location. What is established?",
        "options": [
          "Three independent proofs.",
          "Permission to invent the source details.",
          "Repeated wording, with the quotation still needing verification."
        ],
        "correct": 2,
        "feedback": "Agreement does not establish an inspectable source for the exact quotation."
      },
      {
        "type": "single",
        "question": "A conversion dispute can be checked with stated units and arithmetic. What is useful?",
        "options": [
          "Work through the operation from the given values and compare the results.",
          "Choose the longer answer.",
          "Use an unrelated example with different units."
        ],
        "correct": 0,
        "feedback": "A transparent check can resolve a claim without relying on the reputation of either tool."
      },
      {
        "type": "single",
        "question": "What should you record before investigating conflicting answers?",
        "options": [
          "Only each chatbot's name.",
          "The exact disagreement and the conditions each answer assumes.",
          "Only which response you like."
        ],
        "correct": 1,
        "feedback": "A precise dispute helps you choose evidence that can actually distinguish the claims."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Align the route and starting conditions before comparing the estimates.",
          "Average the estimates immediately.",
          "Choose the answer written with more confidence.",
          "Inspect the current issuing organization's notice."
        ],
        "correct": [
          0,
          3
        ],
        "feedback": "The relevant original instruction has a more direct relationship to the deadline than generated agreement. Different assumptions can produce different results without a direct factual contradiction."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Assumption",
          "Disputed claim",
          "Decisive check"
        ],
        "options": [
          "The exact statement on which the answers disagree.",
          "An inspection or test that bears directly on the disagreement.",
          "A condition treated as true when producing an answer."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Assumption: A condition treated as true when producing an answer. Disputed claim: The exact statement on which the answers disagree. Decisive check: An inspection or test that bears directly on the disagreement."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the precise disputed statement.",
          "Align definitions, inputs, and assumptions.",
          "Inspect a relevant source or transparent test.",
          "Explain the supported conclusion or uncertainty."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the precise disputed statement. Align definitions, inputs, and assumptions. Inspect a relevant source or transparent test. Explain the supported conclusion or uncertainty."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "A new chatbot agrees with the first. Has the dispute necessarily been resolved?",
        "options": [
          "Yes; two votes settle truth.",
          "Yes; the newest response must be correct.",
          "No; inspect support relevant to the claim."
        ],
        "correct": 2,
        "feedback": "Another generated opinion can repeat the same unsupported basis."
      },
      {
        "type": "single",
        "question": "Evidence fits only one stated condition. How should you conclude?",
        "options": [
          "Give a conditional conclusion that names that condition.",
          "Claim the answer applies universally.",
          "Remove the condition for readability."
        ],
        "correct": 0,
        "feedback": "The conclusion should preserve the limits of the support you inspected."
      },
      {
        "type": "single",
        "question": "The decisive source remains unavailable. What is responsible?",
        "options": [
          "Guess so the task looks complete.",
          "State the remaining uncertainty and avoid a confident unsupported action.",
          "Claim all versions are equally verified."
        ],
        "correct": 1,
        "feedback": "An unresolved question should remain visibly unresolved until appropriate support appears."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Choose the longer answer.",
          "Permission to invent the source details.",
          "Work through the operation from the given values and compare the results.",
          "Repeated wording, with the quotation still needing verification."
        ],
        "correct": [
          2,
          3
        ],
        "feedback": "Agreement does not establish an inspectable source for the exact quotation. A transparent check can resolve a claim without relying on the reputation of either tool."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "Two chatbots give different deadlines for the same programme. What settles the task best?",
          "Two travel-time estimates assume different starting points. What should happen first?",
          "Three tools repeat a quote but none identifies its original location. What is established?"
        ],
        "options": [
          "Repeated wording, with the quotation still needing verification.",
          "Inspect the current issuing organization's notice.",
          "Align the route and starting conditions before comparing the estimates."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. The relevant original instruction has a more direct relationship to the deadline than generated agreement. Different assumptions can produce different results without a direct factual contradiction. Agreement does not establish an inspectable source for the exact quotation."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the precise disputed statement.",
          "Align definitions, inputs, and assumptions.",
          "Inspect a relevant source or transparent test.",
          "Explain the supported conclusion or uncertainty."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the precise disputed statement. Align definitions, inputs, and assumptions. Inspect a relevant source or transparent test. Explain the supported conclusion or uncertainty."
      }
    ],
    "references": [
      "cor",
      "ng"
    ],
    "videoIds": []
  },
  "20": {
    "id": 20,
    "parentDomain": 2,
    "title": "Improve an Incomplete Explanation",
    "tagline": "Find what an answer leaves out and revise it for real understanding.",
    "intro": "An explanation can give a correct final answer while leaving you unable to repeat the reasoning. Find the step that is missing, ask for that step specifically, and try a fresh example to see whether the repair helps.",
    "objectives": [
      "Explain reasoning gap and distinguish it from counterexample.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Start with the learner's actual question",
        "A polished explanation may describe a topic without answering the question that was asked. Restate the learning goal in one sentence. If the question asks why evaporation can occur below boiling point, a general list of uses of water does not answer it. Compare the response with the exact goal before adding more detail. The purpose of revision is to close a specific gap, rather than make every answer longer or more technical."
      ],
      [
        "Look for missing links in the reasoning",
        "Read the explanation one step at a time and ask how each sentence follows from the previous one. A gap often appears where a term is introduced without meaning, a cause is asserted without a mechanism, or a conclusion appears without support. Mark the missing link in plain language. Asking what connects these two steps is more useful than simply requesting a better answer. It also gives you a clear criterion for deciding whether a revision has helped."
      ],
      [
        "Use examples and counterexamples carefully",
        "An example can make an abstract idea visible, while a counterexample can show where a proposed rule fails. Both must fit the concept accurately. If an analogy compares computer memory with a cupboard, ask which features match and where the comparison stops. Do not turn a helpful comparison into a literal account. A revised explanation should make the idea easier to inspect while preserving the conditions that matter to its meaning."
      ],
      [
        "Check completeness without adding irrelevant material",
        "Complete does not mean exhaustive. A beginner's answer can be sufficient when it provides the definition, the important reasoning, and an appropriate example for the stated goal. Extra history or impressive jargon can distract from the missing step. Use a short checklist based on the task and remove details that do not serve it. This is especially useful when a generated response grows with every follow-up but the central confusion remains unchanged."
      ],
      [
        "Test the revision through a fresh case",
        "After revising, close or cover the answer and explain the idea in your own words. Apply it to a new situation that is similar enough to use the same concept but different enough to require thought. If you can only repeat the original example, the gap may still be present. Return to the precise point of difficulty and try another source or teacher explanation. Independent application gives more useful feedback than simply preferring the sound of the new paragraph."
      ],
      [
        "Keep accuracy and clarity together",
        "Simpler wording should preserve the meaning, and detailed wording should remain understandable. Do not accept a clear explanation if it introduces a false rule, and do not accept an accurate-looking paragraph that you cannot interpret. Review important claims against suitable material and keep necessary qualifications. The final response should answer the actual question with reasoning you can explain. A useful revision changes what the learner understands and can do, not merely how professional the paragraph appears."
      ],
      [
        "Repair a conversion explanation",
        "An answer changes 2.5 metres to 250 centimetres and skips the conversion rule. Add the missing step by multiplying by 100 centimetres per metre and showing how the metre unit cancels. Next, convert 0.42 metres without copying the earlier numbers. If your revision still leaves a reader unable to explain the unit change, revise the step again."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Reasoning gap",
        "text": "A missing connection needed to follow an explanation."
      },
      {
        "title": "Counterexample",
        "text": "A case showing that a proposed rule does not always hold."
      },
      {
        "title": "Relevant detail",
        "text": "Information that helps answer the stated learning question."
      }
    ],
    "routine": {
      "name": "Improve an Incomplete Explanation",
      "description": "Locate the missing step. Use the checklist below on the example above.",
      "checklist": [
        "Restate the learning question.",
        "Identify a missing connection or definition.",
        "Revise with relevant reasoning and a suitable example.",
        "Check accuracy and try a fresh case."
      ]
    },
    "takeaway": "Find what an answer leaves out and revise it for real understanding.",
    "scenarios": [
      {
        "title": "Examples without an explanation",
        "situation": "You ask why an event happens, but the answer only lists examples. What needs revision?",
        "action": "Add the missing causal explanation relevant to the question.",
        "why": "Examples can illustrate a concept without explaining the connection the learner asked about."
      },
      {
        "title": "Testing the cupboard analogy",
        "situation": "An analogy says memory is a cupboard. What should the learner inspect?",
        "action": "Which features the comparison helps explain and where it breaks down.",
        "why": "Analogies support understanding when their limits remain visible."
      },
      {
        "title": "Finding the missing step",
        "situation": "An answer becomes twice as long but still skips a key step. What is the best follow-up?",
        "action": "Name the missing connection and request an explanation of that step.",
        "why": "A precise gap gives the revision a goal that length alone cannot meet."
      },
      {
        "title": "Trying a new example",
        "situation": "After revision, you can only repeat the original example. What should you do?",
        "action": "Try a fresh case and identify the point where independent application fails.",
        "why": "Transfer to a new example helps reveal whether the explanation has become usable understanding."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "You ask why an event happens, but the answer only lists examples. What needs revision?",
        "options": [
          "Add more unrelated examples.",
          "Accept the list because it is neatly formatted.",
          "Add the missing causal explanation relevant to the question."
        ],
        "correct": 2,
        "feedback": "Examples can illustrate a concept without explaining the connection the learner asked about."
      },
      {
        "type": "single",
        "question": "An analogy says memory is a cupboard. What should the learner inspect?",
        "options": [
          "Which features the comparison helps explain and where it breaks down.",
          "Assume computer memory literally contains shelves.",
          "Reject every comparison as useless."
        ],
        "correct": 0,
        "feedback": "Analogies support understanding when their limits remain visible."
      },
      {
        "type": "single",
        "question": "An answer becomes twice as long but still skips a key step. What is the best follow-up?",
        "options": [
          "Ask for even more words without specifying the gap.",
          "Name the missing connection and request an explanation of that step.",
          "Replace the question with an easier one without explanation."
        ],
        "correct": 1,
        "feedback": "A precise gap gives the revision a goal that length alone cannot meet."
      },
      {
        "type": "single",
        "question": "After revision, you can only repeat the original example. What should you do?",
        "options": [
          "Declare mastery because the paragraph is memorable.",
          "Stop checking as soon as the wording feels familiar.",
          "Try a fresh case and identify the point where independent application fails."
        ],
        "correct": 2,
        "feedback": "Transfer to a new example helps reveal whether the explanation has become usable understanding."
      },
      {
        "type": "single",
        "question": "What determines whether an explanation is sufficiently complete?",
        "options": [
          "The reasoning and information needed for the stated learning goal.",
          "The number of pages.",
          "The number of technical terms."
        ],
        "correct": 0,
        "feedback": "Completeness is relative to the actual task rather than a fixed amount of text."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Assume computer memory literally contains shelves.",
          "Add the missing causal explanation relevant to the question.",
          "Which features the comparison helps explain and where it breaks down.",
          "Accept the list because it is neatly formatted."
        ],
        "correct": [
          1,
          2
        ],
        "feedback": "Examples can illustrate a concept without explaining the connection the learner asked about. Analogies support understanding when their limits remain visible."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Reasoning gap",
          "Counterexample",
          "Relevant detail"
        ],
        "options": [
          "A case showing that a proposed rule does not always hold.",
          "Information that helps answer the stated learning question.",
          "A missing connection needed to follow an explanation."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Reasoning gap: A missing connection needed to follow an explanation. Counterexample: A case showing that a proposed rule does not always hold. Relevant detail: Information that helps answer the stated learning question."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Restate the learning question.",
          "Identify a missing connection or definition.",
          "Revise with relevant reasoning and a suitable example.",
          "Check accuracy and try a fresh case."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Restate the learning question. Identify a missing connection or definition. Revise with relevant reasoning and a suitable example. Check accuracy and try a fresh case."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "What is a useful counterexample for a claimed universal rule?",
        "options": [
          "A longer restatement of the rule.",
          "A relevant case where the rule fails.",
          "An unrelated surprising fact."
        ],
        "correct": 1,
        "feedback": "A counterexample tests the scope of a claim by showing a case it does not cover."
      },
      {
        "type": "single",
        "question": "A simpler revision changes an important condition. What should happen?",
        "options": [
          "Delete every qualification for speed.",
          "Assume readability repairs false meaning.",
          "Restore the condition and keep the explanation accurate."
        ],
        "correct": 2,
        "feedback": "Clarity helps only when the revised explanation still preserves the concept."
      },
      {
        "type": "single",
        "question": "Which check best follows a revision?",
        "options": [
          "Explain the idea independently and apply it to a new suitable case.",
          "Count the headings.",
          "Ask whether the chatbot likes its own answer."
        ],
        "correct": 0,
        "feedback": "Independent use tests whether the revision resolved the learner's actual difficulty."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Name the missing connection and request an explanation of that step.",
          "Declare mastery because the paragraph is memorable.",
          "Try a fresh case and identify the point where independent application fails.",
          "Replace the question with an easier one without explanation."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A precise gap gives the revision a goal that length alone cannot meet. Transfer to a new example helps reveal whether the explanation has become usable understanding."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "You ask why an event happens, but the answer only lists examples. What needs revision?",
          "An analogy says memory is a cupboard. What should the learner inspect?",
          "An answer becomes twice as long but still skips a key step. What is the best follow-up?"
        ],
        "options": [
          "Name the missing connection and request an explanation of that step.",
          "Add the missing causal explanation relevant to the question.",
          "Which features the comparison helps explain and where it breaks down."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. Examples can illustrate a concept without explaining the connection the learner asked about. Analogies support understanding when their limits remain visible. A precise gap gives the revision a goal that length alone cannot meet."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Restate the learning question.",
          "Identify a missing connection or definition.",
          "Revise with relevant reasoning and a suitable example.",
          "Check accuracy and try a fresh case."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Restate the learning question. Identify a missing connection or definition. Revise with relevant reasoning and a suitable example. Check accuracy and try a fresh case."
      }
    ],
    "references": [
      "prompt",
      "eef",
      "guidance"
    ],
    "videoIds": []
  },
  "21": {
    "id": 21,
    "parentDomain": 3,
    "title": "Verify Images and Captions",
    "tagline": "Separate what a picture shows from the story attached to it.",
    "intro": "An authentic photo can travel with a misleading date or place. Write down what you can see, identify the caption’s claim, and trace the image to earlier context before sharing it.",
    "objectives": [
      "Explain observation and distinguish it from caption claim.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Describe what you can actually observe",
        "Before reading a caption as fact, describe the visible content in neutral terms. A photo might show water covering a road, but the image alone may not establish the town, date, cause, or depth. Those details often arrive through the accompanying text. Separating observation from interpretation helps you identify what needs further support. It also reduces the chance that an emotional caption will decide your conclusion before you inspect the origin of the media."
      ],
      [
        "Trace the image toward its original context",
        "Look for an earlier publication, a credited photographer, or the organization that released the image. A reverse-image search can suggest earlier appearances, but each result still needs inspection. Similar-looking pictures may show different events, and the earliest result you find is not necessarily the first publication. Treat discovery as a route to context. Keep a record of the actual page you inspected and the details it provides, rather than claiming the search tool verified everything."
      ],
      [
        "Compare the caption with time and place",
        "An authentic old image can be misleading when attached to a current event. Compare dates, locations, landmarks, and the original caption where available. A genuine photo from another province does not establish what happened in Laoag today. If the context is uncertain, say that rather than forcing a confident match. The important question is whether the picture supports the particular claim being made now, not only whether a similar scene could plausibly occur."
      ],
      [
        "Avoid relying on visual oddities alone",
        "Strange fingers, distorted signs, or inconsistent shadows can be clues worth investigating, but their absence does not prove authenticity. Real pictures can be blurred, compressed, edited, or captured at an unusual angle. Generated media can also look convincing. You do not need to settle the entire production history to withhold an unsupported caption. Explain what the available evidence establishes, and avoid presenting a quick visual guess as a reliable technical detection method."
      ],
      [
        "Use a sharing decision proportional to the evidence",
        "If a picture might affect safety, attendance, someone's reputation, or a practical decision, confirm the relevant claim through a suitable known source. Avoid reposting a doubtful image simply to ask everyone whether it is real; that can spread the claim further. You can describe the uncertainty without reproducing private or harmful details. A careful sharing decision focuses on the claim and its consequences rather than the excitement of being early to circulate dramatic media."
      ],
      [
        "Correct the specific problem you found",
        "A useful correction says whether the image is old, miscaptioned, altered, or still unverified, and explains the basis for that conclusion. Do not call every problem AI-generated when you have only established a wrong date. Link to the inspected original context when appropriate and keep personal information out of the correction. Accurate corrections make the evidence and the limits understandable. The same standard applies to your correction as to the original post: do not make stronger claims than you can support."
      ],
      [
        "Check a reused flood photo",
        "A post says a photograph shows a flooded road in your town today. You find an earlier report that uses the same image for a different place. Save the earlier article’s date and the source of its caption. Explain what the older use tells you about today’s post and what still needs verification, such as whether there is a separate flood today."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Observation",
        "text": "A description of visible content without adding an unverified story."
      },
      {
        "title": "Caption claim",
        "text": "A statement attached to media about its meaning, origin, date, or place."
      },
      {
        "title": "Provenance",
        "text": "The available record of where media came from and how it was shared."
      }
    ],
    "routine": {
      "name": "Verify Images and Captions",
      "description": "Separate the pixels from the caption. Use the checklist below on the example above.",
      "checklist": [
        "Describe the visible content and the caption separately.",
        "Trace earlier or original context.",
        "Compare the claim with dates, places, and appropriate sources.",
        "Share or correct only what the evidence supports."
      ]
    },
    "takeaway": "Separate what a picture shows from the story attached to it.",
    "scenarios": [
      {
        "title": "An old flood photo with a new caption",
        "situation": "A flooded-road image is captioned as Laoag today, but an earlier article places it elsewhere last year. What is supported?",
        "action": "The current caption conflicts with the inspected earlier context.",
        "why": "A real photograph can be misused by attaching a different time and location."
      },
      {
        "title": "Sorting reverse-image matches",
        "situation": "A reverse-image search returns several possible matches. What should happen next?",
        "action": "Open the relevant results and compare their actual context.",
        "why": "Search results help locate candidate evidence; they are not a complete verification by themselves."
      },
      {
        "title": "A convincing image with no obvious flaws",
        "situation": "An image has no obvious visual mistakes. What can you conclude?",
        "action": "Its appearance alone does not establish its origin or the truth of its caption.",
        "why": "Convincing visual detail does not verify a claimed event."
      },
      {
        "title": "Correcting a date without guessing",
        "situation": "You can establish an incorrect date but cannot determine whether AI was used. How should you correct it?",
        "action": "Explain the date problem and leave the production method unconfirmed.",
        "why": "The correction should stay within what the inspected evidence supports."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A flooded-road image is captioned as Laoag today, but an earlier article places it elsewhere last year. What is supported?",
        "options": [
          "Every part of the photograph is necessarily generated.",
          "The current caption conflicts with the inspected earlier context.",
          "The current caption is correct because the picture looks realistic."
        ],
        "correct": 1,
        "feedback": "A real photograph can be misused by attaching a different time and location."
      },
      {
        "type": "single",
        "question": "A reverse-image search returns several possible matches. What should happen next?",
        "options": [
          "Treat the first thumbnail as conclusive.",
          "Ignore dates because the images look similar.",
          "Open the relevant results and compare their actual context."
        ],
        "correct": 2,
        "feedback": "Search results help locate candidate evidence; they are not a complete verification by themselves."
      },
      {
        "type": "single",
        "question": "An image has no obvious visual mistakes. What can you conclude?",
        "options": [
          "Its appearance alone does not establish its origin or the truth of its caption.",
          "The image must be authentic and current.",
          "Every realistic image proves its caption."
        ],
        "correct": 0,
        "feedback": "Convincing visual detail does not verify a claimed event."
      },
      {
        "type": "single",
        "question": "You can establish an incorrect date but cannot determine whether AI was used. How should you correct it?",
        "options": [
          "Announce that AI definitely created it.",
          "Explain the date problem and leave the production method unconfirmed.",
          "Hide the date problem until you can detect its production method."
        ],
        "correct": 1,
        "feedback": "The correction should stay within what the inspected evidence supports."
      },
      {
        "type": "single",
        "question": "Which statement goes beyond a road photo's visible content?",
        "options": [
          "That the image contains a road.",
          "That visible water covers part of the scene.",
          "That it was taken in a named town today, without contextual support."
        ],
        "correct": 2,
        "feedback": "Location and timing usually need evidence beyond simply looking at the scene."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Treat the first thumbnail as conclusive.",
          "Open the relevant results and compare their actual context.",
          "The current caption is correct because the picture looks realistic.",
          "The current caption conflicts with the inspected earlier context."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "A real photograph can be misused by attaching a different time and location. Search results help locate candidate evidence; they are not a complete verification by themselves."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Observation",
          "Caption claim",
          "Provenance"
        ],
        "options": [
          "A statement attached to media about its meaning, origin, date, or place.",
          "The available record of where media came from and how it was shared.",
          "A description of visible content without adding an unverified story."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Observation: A description of visible content without adding an unverified story. Caption claim: A statement attached to media about its meaning, origin, date, or place. Provenance: The available record of where media came from and how it was shared."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Describe the visible content and the caption separately.",
          "Trace earlier or original context.",
          "Compare the claim with dates, places, and appropriate sources.",
          "Share or correct only what the evidence supports."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Describe the visible content and the caption separately. Trace earlier or original context. Compare the claim with dates, places, and appropriate sources. Share or correct only what the evidence supports."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Why can an authentic image still mislead?",
        "options": [
          "Its caption may attach the wrong event, date, or location.",
          "All photographs prove any caption.",
          "Authentic pictures cannot be reused."
        ],
        "correct": 0,
        "feedback": "Image authenticity and contextual accuracy are separate questions."
      },
      {
        "type": "single",
        "question": "What is a responsible action for an unverified dramatic image?",
        "options": [
          "Forward it with a shocked emoji.",
          "Pause sharing and confirm the consequential claim through a suitable source.",
          "Call it AI-generated solely because it is surprising."
        ],
        "correct": 1,
        "feedback": "Withholding an unsupported claim avoids amplifying it before its context is established."
      },
      {
        "type": "single",
        "question": "What should a correction include?",
        "options": [
          "A stronger accusation than the evidence supports.",
          "Private details of everyone who shared the post.",
          "The specific contextual problem and the inspected basis for saying so."
        ],
        "correct": 2,
        "feedback": "A precise correction is both more accurate and more useful to readers."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Its appearance alone does not establish its origin or the truth of its caption.",
          "Announce that AI definitely created it.",
          "Explain the date problem and leave the production method unconfirmed.",
          "Every realistic image proves its caption."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "Convincing visual detail does not verify a claimed event. The correction should stay within what the inspected evidence supports."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A flooded-road image is captioned as Laoag today, but an earlier article places it elsewhere last year. What is supported?",
          "A reverse-image search returns several possible matches. What should happen next?",
          "An image has no obvious visual mistakes. What can you conclude?"
        ],
        "options": [
          "Its appearance alone does not establish its origin or the truth of its caption.",
          "The current caption conflicts with the inspected earlier context.",
          "Open the relevant results and compare their actual context."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A real photograph can be misused by attaching a different time and location. Search results help locate candidate evidence; they are not a complete verification by themselves. Convincing visual detail does not verify a claimed event."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Describe the visible content and the caption separately.",
          "Trace earlier or original context.",
          "Compare the claim with dates, places, and appropriate sources.",
          "Share or correct only what the evidence supports."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Describe the visible content and the caption separately. Trace earlier or original context. Compare the claim with dates, places, and appropriate sources. Share or correct only what the evidence supports."
      }
    ],
    "references": [
      "afp"
    ],
    "videoIds": []
  },
  "22": {
    "id": 22,
    "parentDomain": 3,
    "title": "Trace Quotes and Citations",
    "tagline": "Check the original words and whether a source actually supports them.",
    "intro": "A reference can be real while the claim attached to it is wrong. Trace an AI-provided citation to the original source, read the surrounding passage, and compare the claim with the author’s actual words.",
    "objectives": [
      "Explain quotation and distinguish it from paraphrase.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Treat a citation as a route to evidence",
        "A reference that looks complete can still contain an incorrect title, author, date, or link. Start by locating the source itself through an appropriate publisher, organization, library, or official page. Do not repair missing information by asking a chatbot to invent a plausible version. A source that exists is only the first check. You still need to inspect whether it contains the material claimed and whether it is suitable for the point you want to make."
      ],
      [
        "Separate a quotation from a paraphrase",
        "Quotation marks present words as the source's actual wording. A paraphrase expresses an idea in new wording while preserving its meaning and attribution. Do not place generated sentences inside quotation marks merely because they resemble something an author might have said. If exact words cannot be located, remove the quotation claim. You may be able to write a supported summary instead, but only after reading material that actually communicates the relevant idea."
      ],
      [
        "Inspect the surrounding passage",
        "A sentence can change meaning when removed from its surrounding discussion. Read before and after the cited words to see whether the author is presenting a finding, describing someone else's claim, posing a question, or explaining a limitation. A paragraph that criticizes a statement should not be cited as endorsing it. Context helps you understand the role the passage plays and prevents a genuine quotation from being used to support a conclusion it does not actually express."
      ],
      [
        "Match the source to the exact claim",
        "A publication about AI in general may not support a numerical claim about a particular school or group. Compare the people, place, timeframe, and conditions in the source with those in your sentence. If they differ, narrow or revise the sentence rather than stretching the source. A relevant topic is not the same as direct support. Record which passage supports which claim so that attribution remains tied to meaning instead of becoming decorative formatting."
      ],
      [
        "Keep a usable source note",
        "Save the source title, author or issuing organization, date where provided, link, and a location note such as the page or section. Record exact wording separately from your own summary. This makes later checking easier and reduces accidental quotation errors. You do not need a complicated system; a short, consistent note can work. The key is that you can return to the original material and explain how your final sentence follows from it."
      ],
      [
        "Remove unsupported material before submitting",
        "If a citation cannot be traced or a quotation cannot be found, do not leave it in the final work simply because it makes a paragraph look authoritative. Replace it with inspected support, qualify the claim, or remove the statement. Check the final source list against the actual work so that entries correspond to material you used. A shorter supported explanation is stronger than a polished passage whose references cannot survive a reader opening the links."
      ],
      [
        "Check what a study’s quote describes",
        "A slide quotes a report as saying “most students improved.” In the report, those words refer to students in one pilot class. Locate the page, write down the group being described, and revise the slide so it keeps that limit. If you cannot find the passage, flag the quotation and use a claim you can support."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Quotation",
        "text": "The source's exact words, represented accurately and attributed."
      },
      {
        "title": "Paraphrase",
        "text": "A restatement that preserves an inspected source's meaning with attribution."
      },
      {
        "title": "Claim support",
        "text": "The connection between a particular statement and relevant source material."
      }
    ],
    "routine": {
      "name": "Trace Quotes and Citations",
      "description": "Record the passage and its limits. Use the checklist below on the example above.",
      "checklist": [
        "Identify the exact words or claim needing support.",
        "Locate and read the original source in context.",
        "Compare meaning, scope, and attribution.",
        "Keep accurate source details and revise unsupported statements."
      ]
    },
    "takeaway": "Check the original words and whether a source actually supports them.",
    "scenarios": [
      {
        "title": "A citation with no publication record",
        "situation": "A chatbot gives a complete reference, but no publisher or library record can be located. What should you do?",
        "action": "Leave it out until it can be traced, or replace it with an inspected source.",
        "why": "Plausible reference formatting is not evidence that a publication exists."
      },
      {
        "title": "A quotation stripped of its context",
        "situation": "A quotation is real, but the next sentence explains that the author rejects it. What matters?",
        "action": "The surrounding discussion changes how the quotation can responsibly be used.",
        "why": "Exact wording can still mislead when stripped of the author's actual position."
      },
      {
        "title": "A citation that misses the specific claim",
        "situation": "A general AI article is cited for a specific school percentage it never reports. What needs correction?",
        "action": "Remove or revise the numerical claim unless direct support is available.",
        "why": "A shared topic does not establish the particular number or population."
      },
      {
        "title": "An idea without an exact quotation",
        "situation": "You find the idea in a source but not the exact generated wording. What is appropriate?",
        "action": "Write an accurate attributed paraphrase after reading the source.",
        "why": "A paraphrase can communicate the supported idea without falsely claiming exact words."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A chatbot gives a complete reference, but no publisher or library record can be located. What should you do?",
        "options": [
          "Leave it out until it can be traced, or replace it with an inspected source.",
          "Invent a working-looking link.",
          "Keep it because the author's name sounds familiar."
        ],
        "correct": 0,
        "feedback": "Plausible reference formatting is not evidence that a publication exists."
      },
      {
        "type": "single",
        "question": "A quotation is real, but the next sentence explains that the author rejects it. What matters?",
        "options": [
          "Use it as the author's endorsed conclusion.",
          "The surrounding discussion changes how the quotation can responsibly be used.",
          "Delete the next sentence from your notes."
        ],
        "correct": 1,
        "feedback": "Exact wording can still mislead when stripped of the author's actual position."
      },
      {
        "type": "single",
        "question": "A general AI article is cited for a specific school percentage it never reports. What needs correction?",
        "options": [
          "Keep the percentage because the article mentions AI.",
          "Change the citation font to make it more convincing.",
          "Remove or revise the numerical claim unless direct support is available."
        ],
        "correct": 2,
        "feedback": "A shared topic does not establish the particular number or population."
      },
      {
        "type": "single",
        "question": "You find the idea in a source but not the exact generated wording. What is appropriate?",
        "options": [
          "Write an accurate attributed paraphrase after reading the source.",
          "Keep quotation marks around the generated wording.",
          "Claim the author used your preferred sentence."
        ],
        "correct": 0,
        "feedback": "A paraphrase can communicate the supported idea without falsely claiming exact words."
      },
      {
        "type": "single",
        "question": "What should be inspected after confirming that a source exists?",
        "options": [
          "Only the cover design.",
          "Whether its actual content supports the precise claim.",
          "Only whether the link is long."
        ],
        "correct": 1,
        "feedback": "Existence and claim support are distinct parts of checking a citation."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Keep it because the author's name sounds familiar.",
          "The surrounding discussion changes how the quotation can responsibly be used.",
          "Use it as the author's endorsed conclusion.",
          "Leave it out until it can be traced, or replace it with an inspected source."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "Plausible reference formatting is not evidence that a publication exists. Exact wording can still mislead when stripped of the author's actual position."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Quotation",
          "Paraphrase",
          "Claim support"
        ],
        "options": [
          "A restatement that preserves an inspected source's meaning with attribution.",
          "The connection between a particular statement and relevant source material.",
          "The source's exact words, represented accurately and attributed."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Quotation: The source's exact words, represented accurately and attributed. Paraphrase: A restatement that preserves an inspected source's meaning with attribution. Claim support: The connection between a particular statement and relevant source material."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the exact words or claim needing support.",
          "Locate and read the original source in context.",
          "Compare meaning, scope, and attribution.",
          "Keep accurate source details and revise unsupported statements."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the exact words or claim needing support. Locate and read the original source in context. Compare meaning, scope, and attribution. Keep accurate source details and revise unsupported statements."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Which note helps prevent confusion later?",
        "options": [
          "Mix everything without labels.",
          "Keep only a chatbot's source description.",
          "Separate exact source wording from your own summary."
        ],
        "correct": 2,
        "feedback": "Clear notes preserve the difference between quoted language and your interpretation."
      },
      {
        "type": "single",
        "question": "A source covers a different population. What is responsible?",
        "options": [
          "Preserve that scope and avoid applying its result as if it described your group.",
          "Replace the population name without explanation.",
          "Treat all populations as interchangeable."
        ],
        "correct": 0,
        "feedback": "A claim must fit the conditions and scope of its support."
      },
      {
        "type": "single",
        "question": "An untraceable citation makes a paragraph look authoritative. What should guide submission?",
        "options": [
          "Keep it for appearance.",
          "Use inspected support or remove the unsupported statement.",
          "Add another invented citation."
        ],
        "correct": 1,
        "feedback": "Authority should come from evidence a reader can inspect, not formatting."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Write an accurate attributed paraphrase after reading the source.",
          "Change the citation font to make it more convincing.",
          "Remove or revise the numerical claim unless direct support is available.",
          "Keep quotation marks around the generated wording."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A shared topic does not establish the particular number or population. A paraphrase can communicate the supported idea without falsely claiming exact words."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A chatbot gives a complete reference, but no publisher or library record can be located. What should you do?",
          "A quotation is real, but the next sentence explains that the author rejects it. What matters?",
          "A general AI article is cited for a specific school percentage it never reports. What needs correction?"
        ],
        "options": [
          "Remove or revise the numerical claim unless direct support is available.",
          "Leave it out until it can be traced, or replace it with an inspected source.",
          "The surrounding discussion changes how the quotation can responsibly be used."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. Plausible reference formatting is not evidence that a publication exists. Exact wording can still mislead when stripped of the author's actual position. A shared topic does not establish the particular number or population."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the exact words or claim needing support.",
          "Locate and read the original source in context.",
          "Compare meaning, scope, and attribution.",
          "Keep accurate source details and revise unsupported statements."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the exact words or claim needing support. Locate and read the original source in context. Compare meaning, scope, and attribution. Keep accurate source details and revise unsupported statements."
      }
    ],
    "references": [
      "owl",
      "cor"
    ],
    "videoIds": []
  },
  "23": {
    "id": 23,
    "parentDomain": 3,
    "title": "Check Announcements and Opportunities",
    "tagline": "Verify a deadline, offer, or notice before acting on it.",
    "intro": "A familiar logo and an urgent deadline can make an application link feel official. Check the organization through a channel you already trust, then verify the deadline, eligibility, and destination before sharing any documents.",
    "objectives": [
      "Explain issuer and distinguish it from eligibility.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Identify the practical action being requested",
        "An announcement might ask you to attend, apply, pay, submit a record, or click a registration link. Write down the requested action and what could happen if the notice is wrong. A colourful school logo and formal wording do not establish who issued it. Start with the claim and the consequence. This makes your checking purposeful and helps you focus on details that matter, such as the issuing office, the applicable year, and the actual submission route."
      ],
      [
        "Reach the issuing organization independently",
        "Use the organization's known website, established page, usual office contact, or normal school communication channel. Do not rely only on a number or link inside an uncertain notice. The goal is to confirm the particular opportunity through a route you already have reason to trust. A familiar organization name can be copied. Independent confirmation connects the message with the real issuer instead of letting the message provide all of its own evidence."
      ],
      [
        "Read the conditions as carefully as the headline",
        "A genuine offer may apply to a different grade, location, programme, or period. Check eligibility, deadlines, required documents, and any stated process on the current notice. Do not assume that a friend qualifying means you automatically qualify too. If wording is unclear, ask the issuing office a specific question through the normal channel. A useful verification establishes whether the offer is both authentic and applicable to your situation."
      ],
      [
        "Inspect links and requested information",
        "A registration page may ask for information unrelated to the stated task. Pause before uploading identification, school records, or contact lists. Confirm that the route matches the issuer's actual process and that the requested details are necessary. You can ask for clarification without accusing the organization of wrongdoing. A responsible application uses the verified route and supplies only what the real process requires, rather than following every instruction in an attractive forwarded poster."
      ],
      [
        "Handle uncertainty without spreading it as fact",
        "If a deadline cannot be confirmed, tell classmates that the notice is unverified and point them to the established issuing channel. Avoid announcing a guessed deadline to prevent everyone from missing out. A mistaken urgent message can create wasted work or unnecessary exposure. You can share a verification request with the appropriate office while withholding public certainty. Distinguish what you have confirmed from what someone else forwarded or what a chatbot inferred."
      ],
      [
        "Keep the version that applies to your decision",
        "Save the relevant current notice or its link and note the date you inspected it. If the issuing office updates the process, use that version and make the change clear to others who rely on your information. A screenshot without a visible date can become misleading later. Your final note should identify the issuer, the applicable conditions, and the confirmed action. Verification is complete when you know what to do and why that instruction applies."
      ],
      [
        "Confirm a scholarship application route",
        "A scholarship screenshot gives a deadline and sends applicants to an unfamiliar form. Open the issuer’s official page independently and compare the year, requirements, and application link. If you find no current notice, contact the issuing office through its published details. Keep a copy of the confirmed notice so you can check the same version later."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Issuer",
        "text": "The organization or person responsible for the actual announcement."
      },
      {
        "title": "Eligibility",
        "text": "The conditions someone must meet for an opportunity to apply to them."
      },
      {
        "title": "Verified route",
        "text": "A confirmed channel for checking information or completing the stated process."
      }
    ],
    "routine": {
      "name": "Check Announcements and Opportunities",
      "description": "Verify the destination before sending records. Use the checklist below on the example above.",
      "checklist": [
        "Identify the action and issuing organization.",
        "Confirm through an independently known channel.",
        "Check dates, eligibility, and the actual submission route.",
        "Act on the applicable notice and retain its version."
      ]
    },
    "takeaway": "Verify a deadline, offer, or notice before acting on it.",
    "scenarios": [
      {
        "title": "A scholarship link with the right logo",
        "situation": "A scholarship poster has the right logo but an unfamiliar registration link. What should happen first?",
        "action": "Confirm the notice and application route through the issuing organization's known channel.",
        "why": "A copied visual identity does not establish who controls a linked page."
      },
      {
        "title": "A genuine notice for a past intake",
        "situation": "A genuine programme notice is from last year. Can you use its deadline for the current intake?",
        "action": "No; locate the current applicable notice or ask the issuing office.",
        "why": "Authenticity does not make an expired date current."
      },
      {
        "title": "Checking who qualifies",
        "situation": "Your friend qualifies for an offer, but the notice names a specific grade and location. What should you inspect?",
        "action": "The eligibility conditions that apply to you.",
        "why": "A real opportunity can still be unsuitable for a particular applicant."
      },
      {
        "title": "A request for a class contact list",
        "situation": "A forwarded notice asks for a class contact list to reserve your slot. What is sensible?",
        "action": "Pause and verify the requirement through the actual issuer before sharing records.",
        "why": "Unrelated data requests should not be accepted merely because the message sounds urgent."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A scholarship poster has the right logo but an unfamiliar registration link. What should happen first?",
        "options": [
          "Upload your records immediately.",
          "Assume every page with the logo is official.",
          "Confirm the notice and application route through the issuing organization's known channel."
        ],
        "correct": 2,
        "feedback": "A copied visual identity does not establish who controls a linked page."
      },
      {
        "type": "single",
        "question": "A genuine programme notice is from last year. Can you use its deadline for the current intake?",
        "options": [
          "No; locate the current applicable notice or ask the issuing office.",
          "Yes, because programmes never change dates.",
          "Yes, if a chatbot repeats the date."
        ],
        "correct": 0,
        "feedback": "Authenticity does not make an expired date current."
      },
      {
        "type": "single",
        "question": "Your friend qualifies for an offer, but the notice names a specific grade and location. What should you inspect?",
        "options": [
          "Only your friend's excitement.",
          "The eligibility conditions that apply to you.",
          "Only the design of the poster."
        ],
        "correct": 1,
        "feedback": "A real opportunity can still be unsuitable for a particular applicant."
      },
      {
        "type": "single",
        "question": "A forwarded notice asks for a class contact list to reserve your slot. What is sensible?",
        "options": [
          "Upload everyone else's details.",
          "Replace verification with a guess that it is probably normal.",
          "Pause and verify the requirement through the actual issuer before sharing records."
        ],
        "correct": 2,
        "feedback": "Unrelated data requests should not be accepted merely because the message sounds urgent."
      },
      {
        "type": "single",
        "question": "Which detail is essential when checking an announcement?",
        "options": [
          "Its issuer, applicable period, and requested action.",
          "Only its logo colour.",
          "Only its number of reposts."
        ],
        "correct": 0,
        "feedback": "Practical verification connects the instruction to the real organization and current conditions."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Yes, because programmes never change dates.",
          "Confirm the notice and application route through the issuing organization's known channel.",
          "Assume every page with the logo is official.",
          "No; locate the current applicable notice or ask the issuing office."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "A copied visual identity does not establish who controls a linked page. Authenticity does not make an expired date current."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Issuer",
          "Eligibility",
          "Verified route"
        ],
        "options": [
          "The conditions someone must meet for an opportunity to apply to them.",
          "A confirmed channel for checking information or completing the stated process.",
          "The organization or person responsible for the actual announcement."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Issuer: The organization or person responsible for the actual announcement. Eligibility: The conditions someone must meet for an opportunity to apply to them. Verified route: A confirmed channel for checking information or completing the stated process."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the action and issuing organization.",
          "Confirm through an independently known channel.",
          "Check dates, eligibility, and the actual submission route.",
          "Act on the applicable notice and retain its version."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the action and issuing organization. Confirm through an independently known channel. Check dates, eligibility, and the actual submission route. Act on the applicable notice and retain its version."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "What should you say if the deadline is still unconfirmed?",
        "options": [
          "Invent a date to be helpful.",
          "State that it is unverified and direct others to the established issuer.",
          "Describe the date as official because it sounds likely."
        ],
        "correct": 1,
        "feedback": "Uncertainty should remain visible until the actual instruction is confirmed."
      },
      {
        "type": "single",
        "question": "Why keep the current notice's link or dated copy?",
        "options": [
          "So old notices can be passed off as new.",
          "So no one needs to read eligibility.",
          "So you can show the version used for the decision."
        ],
        "correct": 2,
        "feedback": "A record of the applicable version makes the decision explainable and updateable."
      },
      {
        "type": "single",
        "question": "An office publishes an updated process. What should you do?",
        "options": [
          "Use the current applicable instruction and communicate the change accurately.",
          "Keep the old steps because they are familiar.",
          "Combine both versions without noting differences."
        ],
        "correct": 0,
        "feedback": "Version changes can affect deadlines and requirements, so preserve which instruction applies."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Pause and verify the requirement through the actual issuer before sharing records.",
          "The eligibility conditions that apply to you.",
          "Only the design of the poster.",
          "Upload everyone else's details."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "A real opportunity can still be unsuitable for a particular applicant. Unrelated data requests should not be accepted merely because the message sounds urgent."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A scholarship poster has the right logo but an unfamiliar registration link. What should happen first?",
          "A genuine programme notice is from last year. Can you use its deadline for the current intake?",
          "Your friend qualifies for an offer, but the notice names a specific grade and location. What should you inspect?"
        ],
        "options": [
          "The eligibility conditions that apply to you.",
          "Confirm the notice and application route through the issuing organization's known channel.",
          "No; locate the current applicable notice or ask the issuing office."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A copied visual identity does not establish who controls a linked page. Authenticity does not make an expired date current. A real opportunity can still be unsuitable for a particular applicant."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the action and issuing organization.",
          "Confirm through an independently known channel.",
          "Check dates, eligibility, and the actual submission route.",
          "Act on the applicable notice and retain its version."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the action and issuing organization. Confirm through an independently known channel. Check dates, eligibility, and the actual submission route. Act on the applicable notice and retain its version."
      }
    ],
    "references": [
      "cor",
      "fraud"
    ],
    "videoIds": [
      "YfiM8rXg3ug"
    ]
  },
  "24": {
    "id": 24,
    "parentDomain": 4,
    "title": "Paraphrase with Understanding",
    "tagline": "Write a source-based idea in your own words without losing its meaning.",
    "intro": "Changing a few words can leave a passage too close to its source or distort what the author meant. Read for meaning, explain the point in your own structure, and check that you’ve kept the claim’s conditions and attribution.",
    "objectives": [
      "Explain paraphrase and distinguish it from qualifier.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Read for meaning before changing wording",
        "Begin by identifying what the source actually claims, what support it gives, and what limits it includes. Replacing words one by one can leave the structure and meaning poorly understood. Read a manageable passage, put it aside, and explain the idea as if to a classmate. If you cannot do that, return to the confusing part before drafting. Paraphrasing is an act of understanding and accurate restatement, rather than a search for enough synonyms to make a passage look different."
      ],
      [
        "Keep the claim's strength and conditions",
        "A source saying that something may help in certain conditions should not become a claim that it always works for everyone. Preserve important qualifiers, population details, and distinctions between observations and interpretations. A paraphrase can be shorter than the original while still retaining these boundaries. Compare your version with the source after writing and ask whether a reader would receive the same essential meaning. Simpler language should not quietly turn limited support into a universal conclusion."
      ],
      [
        "Separate your explanation from the source's idea",
        "You can add an example or interpretation, but make clear which part comes from the source and which part is your contribution. If the original discusses learning in general and you suggest a classroom use, present that use as your application. Do not attribute an invented example or extra conclusion to the original author. This distinction makes the work more honest and lets readers evaluate both the source's claim and the reasoning you added."
      ],
      [
        "Use AI feedback within the task rules",
        "When permitted, a tool can comment on clarity or point out that a sentence is difficult to follow. It should not become a way to hide copied work or replace required independent writing. Ask for feedback on a draft you understand, inspect every proposed change, and keep the original source beside your revision. A fluency improvement can accidentally change the meaning or add a claim. Follow the actual assignment instructions about permitted assistance and disclosure."
      ],
      [
        "Keep attribution even when wording changes",
        "The idea still comes from the source when you express it differently. Retain the required attribution and accurate source details. If you use exact distinctive wording, represent it as a quotation according to the task's rules rather than pretending it is entirely your language. A paraphrase does not make the underlying idea yours by default. Good attribution helps the reader locate the support and distinguish your contribution from the material you used."
      ],
      [
        "Check the final version independently",
        "After revising, explain the paragraph without looking at either the source or the generated suggestion. Then compare it with the source for accuracy, scope, and attribution. If you can explain why you chose the wording, you are in a better position to notice a misleading change. Do not treat a similarity percentage as the whole standard for responsible writing. Meaning, understanding, and honest credit matter alongside the way the final text is presented."
      ],
      [
        "Preserve a condition in a paraphrase",
        "Suppose a report says a practice helped learners who already knew the basic procedure. Explain the idea from memory, then compare your draft with the original. Check whether your sentence accidentally extends the claim to beginners. Add the citation even when none of the original wording appears. Use an exact quotation with attribution if the original phrasing matters."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Paraphrase",
        "text": "An accurate restatement of an inspected idea with appropriate attribution."
      },
      {
        "title": "Qualifier",
        "text": "Wording that limits a claim's strength or conditions."
      },
      {
        "title": "Attribution",
        "text": "Credit showing where an idea or exact wording came from."
      }
    ],
    "routine": {
      "name": "Paraphrase with Understanding",
      "description": "Explain the idea before checking your wording. Use the checklist below on the example above.",
      "checklist": [
        "Read and explain the source's actual meaning.",
        "Draft without copying its sentence structure.",
        "Compare scope and meaning, then keep attribution.",
        "Review permitted assistance and explain the result yourself."
      ]
    },
    "takeaway": "Write a source-based idea in your own words without losing its meaning.",
    "scenarios": [
      {
        "title": "A paraphrase that changes the scope",
        "situation": "A source says an approach may help some learners. A revision says it always helps everyone. What needs repair?",
        "action": "Restore the original limits and level of certainty.",
        "why": "The revision strengthens the claim beyond what the source says."
      },
      {
        "title": "Replacing words without understanding",
        "situation": "You replace nearly every word with a synonym but cannot explain the paragraph. What should happen?",
        "action": "Read for meaning and write a fresh explanation after understanding it.",
        "why": "Surface changes do not establish comprehension or an accurate independent restatement."
      },
      {
        "title": "A revision with a new claim",
        "situation": "AI makes your draft smoother but adds a new factual claim. What is your responsibility?",
        "action": "Check that claim and remove or support it before using the revision.",
        "why": "You remain responsible for meaning and support in the final paragraph."
      },
      {
        "title": "Crediting an idea in your own words",
        "situation": "You express a source's idea fully in your own wording. Does attribution still matter?",
        "action": "Yes; credit the source of the underlying idea.",
        "why": "Changing language does not change where an idea originated."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A source says an approach may help some learners. A revision says it always helps everyone. What needs repair?",
        "options": [
          "Keep the revision because it is clearer.",
          "Restore the original limits and level of certainty.",
          "Remove the source because qualifiers are inconvenient."
        ],
        "correct": 1,
        "feedback": "The revision strengthens the claim beyond what the source says."
      },
      {
        "type": "single",
        "question": "You replace nearly every word with a synonym but cannot explain the paragraph. What should happen?",
        "options": [
          "Submit because the words are different.",
          "Ask for more unusual synonyms.",
          "Read for meaning and write a fresh explanation after understanding it."
        ],
        "correct": 2,
        "feedback": "Surface changes do not establish comprehension or an accurate independent restatement."
      },
      {
        "type": "single",
        "question": "AI makes your draft smoother but adds a new factual claim. What is your responsibility?",
        "options": [
          "Check that claim and remove or support it before using the revision.",
          "Accept every edit as automatically correct.",
          "Attribute the added claim to the original source without checking."
        ],
        "correct": 0,
        "feedback": "You remain responsible for meaning and support in the final paragraph."
      },
      {
        "type": "single",
        "question": "You express a source's idea fully in your own wording. Does attribution still matter?",
        "options": [
          "No; different words erase the source.",
          "Yes; credit the source of the underlying idea.",
          "Only if the paragraph is long."
        ],
        "correct": 1,
        "feedback": "Changing language does not change where an idea originated."
      },
      {
        "type": "single",
        "question": "Which step best precedes drafting a paraphrase?",
        "options": [
          "Find a synonym for every word.",
          "Choose a target similarity score.",
          "Explain the passage's meaning and limits in your own words."
        ],
        "correct": 2,
        "feedback": "Understanding gives the restatement a sound basis beyond surface wording changes."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Submit because the words are different.",
          "Remove the source because qualifiers are inconvenient.",
          "Read for meaning and write a fresh explanation after understanding it.",
          "Restore the original limits and level of certainty."
        ],
        "correct": [
          2,
          3
        ],
        "feedback": "The revision strengthens the claim beyond what the source says. Surface changes do not establish comprehension or an accurate independent restatement."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Paraphrase",
          "Qualifier",
          "Attribution"
        ],
        "options": [
          "Wording that limits a claim's strength or conditions.",
          "Credit showing where an idea or exact wording came from.",
          "An accurate restatement of an inspected idea with appropriate attribution."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Paraphrase: An accurate restatement of an inspected idea with appropriate attribution. Qualifier: Wording that limits a claim's strength or conditions. Attribution: Credit showing where an idea or exact wording came from."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Read and explain the source's actual meaning.",
          "Draft without copying its sentence structure.",
          "Compare scope and meaning, then keep attribution.",
          "Review permitted assistance and explain the result yourself."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Read and explain the source's actual meaning. Draft without copying its sentence structure. Compare scope and meaning, then keep attribution. Review permitted assistance and explain the result yourself."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "You add your own classroom example. How should it be presented?",
        "options": [
          "As your application, distinct from what the source actually reported.",
          "As a finding from the original author.",
          "As an exact quotation."
        ],
        "correct": 0,
        "feedback": "Readers should be able to distinguish source content from your added reasoning."
      },
      {
        "type": "single",
        "question": "A similarity score is low. What still needs review?",
        "options": [
          "Nothing; low similarity proves responsible work.",
          "Accuracy, attribution, and whether the writer understands the meaning.",
          "Only the font size."
        ],
        "correct": 1,
        "feedback": "A single metric cannot establish all the qualities of honest source-based writing."
      },
      {
        "type": "single",
        "question": "Which AI support fits a feedback-only rule?",
        "options": [
          "A replacement submission hidden as your writing.",
          "Fabricated source material.",
          "Comments on your own draft that you evaluate and revise yourself."
        ],
        "correct": 2,
        "feedback": "The permitted role of assistance comes from the actual task instructions."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Check that claim and remove or support it before using the revision.",
          "Attribute the added claim to the original source without checking.",
          "No; different words erase the source.",
          "Yes; credit the source of the underlying idea."
        ],
        "correct": [
          0,
          3
        ],
        "feedback": "You remain responsible for meaning and support in the final paragraph. Changing language does not change where an idea originated."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A source says an approach may help some learners. A revision says it always helps everyone. What needs repair?",
          "You replace nearly every word with a synonym but cannot explain the paragraph. What should happen?",
          "AI makes your draft smoother but adds a new factual claim. What is your responsibility?"
        ],
        "options": [
          "Check that claim and remove or support it before using the revision.",
          "Restore the original limits and level of certainty.",
          "Read for meaning and write a fresh explanation after understanding it."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. The revision strengthens the claim beyond what the source says. Surface changes do not establish comprehension or an accurate independent restatement. You remain responsible for meaning and support in the final paragraph."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Read and explain the source's actual meaning.",
          "Draft without copying its sentence structure.",
          "Compare scope and meaning, then keep attribution.",
          "Review permitted assistance and explain the result yourself."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Read and explain the source's actual meaning. Draft without copying its sentence structure. Compare scope and meaning, then keep attribution. Review permitted assistance and explain the result yourself."
      }
    ],
    "references": [
      "owl"
    ],
    "videoIds": []
  },
  "25": {
    "id": 25,
    "parentDomain": 4,
    "title": "Use AI Responsibly in Group Work",
    "tagline": "Agree on the rules, share decisions, and make everyone’s contribution visible.",
    "intro": "When one group member uses AI, the output can end up in a project everyone signs. Agree on permitted help, give each person a clear review responsibility, and keep track of the decisions your group makes.",
    "objectives": [
      "Explain shared boundary and distinguish it from contribution record.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Agree on assistance before dividing work",
        "At the beginning of a group task, read the actual assignment instructions together. Discuss which AI uses are permitted and what the group will do if a rule is unclear. One member's preference does not automatically define the boundary for everyone. Agree on a simple plan, such as using a tool for brainstorming while each person develops and checks their own section. A shared agreement prevents surprise contributions that other members cannot explain or responsibly present."
      ],
      [
        "Make contributions visible without making the process heavy",
        "Use a short shared note recording who worked on each section, which sources were checked, and what assistance was used. This need not become a complex tracking system. A few clear entries can help the group identify unfinished decisions and prepare for questions. Avoid treating the longest generated paragraph as the largest contribution. Useful work includes verifying a claim, improving an example, correcting a calculation, and explaining why a proposed section should be changed."
      ],
      [
        "Keep other members' information under their control",
        "Do not upload private messages, personal records, or identifiable interview material into a tool just because it might help the project. Ask whether the material is needed and whether there is an approved way to use it. A group task does not give every member unlimited permission over everyone else's information. Use fictional or reduced examples where they serve the purpose. Shared responsibility includes considering the people whose information appears in the group's working files."
      ],
      [
        "Review generated material as a group decision",
        "When a member brings an AI suggestion, inspect its meaning, support, and fit with the assignment before inserting it. The group can keep, revise, or reject it for a reason. Do not assume that agreement to use a tool means agreement with every result it produces. A short review helps maintain a consistent argument and prevents one section from making claims that conflict with another. The final work should express decisions the members understand rather than a collection of pasted outputs."
      ],
      [
        "Resolve disagreement through criteria",
        "Members may disagree about whether a generated section is useful or allowed. Return to the assignment rules, evidence, and agreed purpose. If the instructions do not settle an important boundary, ask the teacher rather than taking a private shortcut. Discuss the particular use instead of labeling a member as lazy or dishonest without examining the facts. A useful resolution states what the group will do next and why it fits the actual task."
      ],
      [
        "Prepare to explain the shared work",
        "Before submitting or presenting, each member should understand the main argument and their own contribution. Try asking one another why a claim was included, where its support appears, and how a revision improved the work. Keep any required disclosure accurate and specific. A polished output is incomplete preparation if the group cannot explain its decisions. Shared understanding makes the final product more coherent and reduces the chance that one person becomes responsible for unsupported material they never reviewed."
      ],
      [
        "Review a generated group outline",
        "Your group uses AI to suggest an outline. Assign one person to check the sources, another to inspect whether the outline answers the assignment, and the rest to draft their own sections. Before submission, ask each member to explain their contribution and one choice made together. Record the assistance if your teacher’s rules require disclosure."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Shared boundary",
        "text": "An agreed rule for assistance that fits the actual assignment instructions."
      },
      {
        "title": "Contribution record",
        "text": "A short account of work, checks, and decisions made by group members."
      },
      {
        "title": "Collective review",
        "text": "Inspection of proposed material before the group adopts it."
      }
    ],
    "routine": {
      "name": "Use AI Responsibly in Group Work",
      "description": "Agree on roles and review the shared draft. Use the checklist below on the example above.",
      "checklist": [
        "Read the task rules and agree on allowed assistance.",
        "Divide contributions and protect shared information.",
        "Review proposed material against criteria and sources.",
        "Prepare an accurate account of decisions and contributions."
      ]
    },
    "takeaway": "Agree on the rules, share decisions, and make everyone’s contribution visible.",
    "scenarios": [
      {
        "title": "A generated section in a feedback-only task",
        "situation": "One member pastes a complete generated section into a feedback-only task. What should the group do?",
        "action": "Review the rules and replace the section with work developed through permitted assistance.",
        "why": "A member's choice does not override the assignment or the responsibility of the group."
      },
      {
        "title": "A request to upload the group chat",
        "situation": "A member wants to upload the group's private chat for summarizing. What should happen first?",
        "action": "Check necessity, other people's information, and an appropriate approved alternative.",
        "why": "Group membership does not create unlimited permission to expose private conversations."
      },
      {
        "title": "Two views on a suggested paragraph",
        "situation": "Two members disagree about a suggested AI paragraph. What helps resolve it?",
        "action": "Compare the paragraph with the assignment criteria and inspected evidence.",
        "why": "Concrete criteria can settle whether the material fits the actual project."
      },
      {
        "title": "Only one member can explain the claim",
        "situation": "Before a presentation, only one person understands the group's main claim. What is needed?",
        "action": "Review the reasoning and contributions together so members can explain the work.",
        "why": "Shared work should be understood by those presenting and taking responsibility for it."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "One member pastes a complete generated section into a feedback-only task. What should the group do?",
        "options": [
          "Review the rules and replace the section with work developed through permitted assistance.",
          "Keep it because it saves time.",
          "Hide its origin from the other members."
        ],
        "correct": 0,
        "feedback": "A member's choice does not override the assignment or the responsibility of the group."
      },
      {
        "type": "single",
        "question": "A member wants to upload the group's private chat for summarizing. What should happen first?",
        "options": [
          "Upload it because it is a school task.",
          "Check necessity, other people's information, and an appropriate approved alternative.",
          "Assume every member already agreed to every tool."
        ],
        "correct": 1,
        "feedback": "Group membership does not create unlimited permission to expose private conversations."
      },
      {
        "type": "single",
        "question": "Two members disagree about a suggested AI paragraph. What helps resolve it?",
        "options": [
          "Choose the longer paragraph automatically.",
          "Let the tool decide the group's rules.",
          "Compare the paragraph with the assignment criteria and inspected evidence."
        ],
        "correct": 2,
        "feedback": "Concrete criteria can settle whether the material fits the actual project."
      },
      {
        "type": "single",
        "question": "Before a presentation, only one person understands the group's main claim. What is needed?",
        "options": [
          "Review the reasoning and contributions together so members can explain the work.",
          "Give everyone a script to read without discussion.",
          "Remove questions from the presentation."
        ],
        "correct": 0,
        "feedback": "Shared work should be understood by those presenting and taking responsibility for it."
      },
      {
        "type": "single",
        "question": "Which record is proportionate for a simple group task?",
        "options": [
          "A secret record only one member can see.",
          "A brief note of contributions, checked sources, and assistance used.",
          "No account because AI produced the text."
        ],
        "correct": 1,
        "feedback": "A short visible record supports coordination without making the process unnecessarily complex."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Hide its origin from the other members.",
          "Upload it because it is a school task.",
          "Review the rules and replace the section with work developed through permitted assistance.",
          "Check necessity, other people's information, and an appropriate approved alternative."
        ],
        "correct": [
          2,
          3
        ],
        "feedback": "A member's choice does not override the assignment or the responsibility of the group. Group membership does not create unlimited permission to expose private conversations."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Shared boundary",
          "Contribution record",
          "Collective review"
        ],
        "options": [
          "A short account of work, checks, and decisions made by group members.",
          "Inspection of proposed material before the group adopts it.",
          "An agreed rule for assistance that fits the actual assignment instructions."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Shared boundary: An agreed rule for assistance that fits the actual assignment instructions. Contribution record: A short account of work, checks, and decisions made by group members. Collective review: Inspection of proposed material before the group adopts it."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Read the task rules and agree on allowed assistance.",
          "Divide contributions and protect shared information.",
          "Review proposed material against criteria and sources.",
          "Prepare an accurate account of decisions and contributions."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Read the task rules and agree on allowed assistance. Divide contributions and protect shared information. Review proposed material against criteria and sources. Prepare an accurate account of decisions and contributions."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "What counts as a useful contribution?",
        "options": [
          "Only generating the longest paragraph.",
          "Only choosing the final font.",
          "Checking a key claim and explaining a necessary correction."
        ],
        "correct": 2,
        "feedback": "Verification and decisions are substantive work even when they add fewer words."
      },
      {
        "type": "single",
        "question": "The assignment's AI boundary is unclear. What should the group do?",
        "options": [
          "Ask the teacher about the specific proposed use.",
          "Privately assume anything is allowed.",
          "Let a member invent a school policy."
        ],
        "correct": 0,
        "feedback": "The person setting the task can clarify what assistance fits its learning goal."
      },
      {
        "type": "single",
        "question": "What should the final disclosure describe?",
        "options": [
          "A vague claim that no help occurred.",
          "The actual assistance used and the group's own contribution, as required.",
          "A promise that all outputs were perfect."
        ],
        "correct": 1,
        "feedback": "Accurate disclosure makes the work process understandable without exaggeration."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Compare the paragraph with the assignment criteria and inspected evidence.",
          "Review the reasoning and contributions together so members can explain the work.",
          "Let the tool decide the group's rules.",
          "Give everyone a script to read without discussion."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "Concrete criteria can settle whether the material fits the actual project. Shared work should be understood by those presenting and taking responsibility for it."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "One member pastes a complete generated section into a feedback-only task. What should the group do?",
          "A member wants to upload the group's private chat for summarizing. What should happen first?",
          "Two members disagree about a suggested AI paragraph. What helps resolve it?"
        ],
        "options": [
          "Compare the paragraph with the assignment criteria and inspected evidence.",
          "Review the rules and replace the section with work developed through permitted assistance.",
          "Check necessity, other people's information, and an appropriate approved alternative."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A member's choice does not override the assignment or the responsibility of the group. Group membership does not create unlimited permission to expose private conversations. Concrete criteria can settle whether the material fits the actual project."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Read the task rules and agree on allowed assistance.",
          "Divide contributions and protect shared information.",
          "Review proposed material against criteria and sources.",
          "Prepare an accurate account of decisions and contributions."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Read the task rules and agree on allowed assistance. Divide contributions and protect shared information. Review proposed material against criteria and sources. Prepare an accurate account of decisions and contributions."
      }
    ],
    "references": [
      "deped",
      "guidance"
    ],
    "videoIds": []
  },
  "26": {
    "id": 26,
    "parentDomain": 4,
    "title": "Prepare a Presentation You Can Explain",
    "tagline": "Turn AI-supported preparation into a presentation you understand and own.",
    "intro": "A polished slide can hide a claim you can’t explain when someone asks a follow-up. Build a clear point for each slide, trace important numbers to evidence, and rehearse with questions that go beyond your speaker notes.",
    "objectives": [
      "Explain central message and distinguish it from evidence note.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Build the message before decorating slides",
        "State the presentation's central point and what your audience should understand afterward. Arrange a few supporting ideas in a logical order before asking for visual suggestions. A tool can generate an attractive deck that has no clear argument. Keep a simple test for every slide: what does this help the audience understand? If you cannot answer, revise or remove it. The structure should serve the message rather than become a tour through everything the tool can generate."
      ],
      [
        "Check claims before they become large text",
        "Slide headings make claims prominent, so inspect important numbers, definitions, and quotations before presenting them. Keep a note of the source and the relevant location. A short phrase can still overstate the evidence, especially when qualifications disappear during summarizing. Compare the slide with what the source actually supports. If a claim remains uncertain, use proportionate wording or remove it instead of relying on a confident delivery to cover the gap."
      ],
      [
        "Use speaker notes as prompts for understanding",
        "Notes can remind you of an example, transition, or source detail, but reading a generated script word for word does not establish understanding. Explain each slide conversationally and check whether the explanation matches the content. If a term is unfamiliar, learn it or replace it with accurate language you can explain. A presentation becomes easier to deliver when the notes support your reasoning rather than act as a substitute for knowing what the slide means."
      ],
      [
        "Practise with realistic audience questions",
        "Ask a classmate, or a permitted tool, to pose questions about your actual argument. Include questions about evidence, limitations, and why you chose a particular example. Answer without looking at the suggested script, then compare with your sources. Do not memorize an invented answer to a question whose premise you do not understand. Practice is useful when it reveals gaps early enough to correct them, rather than merely producing a list of confident-sounding replies."
      ],
      [
        "Keep visuals honest and readable",
        "A picture, chart, or generated illustration should support the explanation and be represented accurately. Do not present a constructed scene as a photo documenting a real event. Check labels and ensure essential information can be read from the audience's position. Remove decoration that hides the main point. When using a chart, keep its units and relevant context. Readability and honest representation help people assess the message instead of being distracted by its appearance."
      ],
      [
        "Own what you know and what remains open",
        "During questions, it is reasonable to distinguish an established point from something you have not checked. Explain the basis for your answer and avoid inventing a source under pressure. If an issue needs follow-up, say specifically what would need confirming. Follow the assignment's rules on AI assistance and credit. A successful presentation shows that you can communicate and defend the reasoning, not that every sentence was polished before you understood it."
      ],
      [
        "Turn a statistic into a defensible slide",
        "Take one statistic from a fictional class survey. Label the respondents, date, and unit on the slide, then place the calculation in your notes. Ask a partner why that denominator was used and what the result leaves open. If you need to read the notes word for word, practise explaining the result with a simpler example first."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Central message",
        "text": "The main idea the audience should understand after the presentation."
      },
      {
        "title": "Evidence note",
        "text": "A record linking a slide's factual claim to inspected support."
      },
      {
        "title": "Rehearsal gap",
        "text": "A point that becomes unclear when you try to explain or answer questions."
      }
    ],
    "routine": {
      "name": "Prepare a Presentation You Can Explain",
      "description": "Rehearse the explanation behind each slide. Use the checklist below on the example above.",
      "checklist": [
        "State the central message and organize supporting ideas.",
        "Verify claims and choose honest readable visuals.",
        "Rehearse explanations and answer realistic questions.",
        "Correct gaps and describe assistance accurately."
      ]
    },
    "takeaway": "Turn AI-supported preparation into a presentation you understand and own.",
    "scenarios": [
      {
        "title": "Twenty slides with no clear point",
        "situation": "AI produces twenty attractive slides without a clear conclusion. What should you do first?",
        "action": "Define the central message and keep slides that support it.",
        "why": "Presentation quality depends on a coherent explanation as well as appearance."
      },
      {
        "title": "A percentage with no source",
        "situation": "A slide states a precise percentage with no traceable source. What is responsible?",
        "action": "Verify it from suitable records or remove or qualify the claim.",
        "why": "Prominent display and confident delivery do not establish numerical support."
      },
      {
        "title": "A term you cannot explain",
        "situation": "You can read a generated script but cannot explain one term. What should happen?",
        "action": "Learn the term or replace it with accurate wording you understand.",
        "why": "Speaker notes should support understanding rather than hide a gap."
      },
      {
        "title": "A question beyond your evidence",
        "situation": "An audience question asks about something you have not checked. What should you say?",
        "action": "State the limit and identify what would need confirmation.",
        "why": "A clear boundary is more credible than an invented confident answer."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "AI produces twenty attractive slides without a clear conclusion. What should you do first?",
        "options": [
          "Add more animations.",
          "Keep every slide because it was generated.",
          "Define the central message and keep slides that support it."
        ],
        "correct": 2,
        "feedback": "Presentation quality depends on a coherent explanation as well as appearance."
      },
      {
        "type": "single",
        "question": "A slide states a precise percentage with no traceable source. What is responsible?",
        "options": [
          "Verify it from suitable records or remove or qualify the claim.",
          "Read it confidently so nobody asks.",
          "Invent a source in the speaker notes."
        ],
        "correct": 0,
        "feedback": "Prominent display and confident delivery do not establish numerical support."
      },
      {
        "type": "single",
        "question": "You can read a generated script but cannot explain one term. What should happen?",
        "options": [
          "Memorize the pronunciation only.",
          "Learn the term or replace it with accurate wording you understand.",
          "Speak faster during that slide."
        ],
        "correct": 1,
        "feedback": "Speaker notes should support understanding rather than hide a gap."
      },
      {
        "type": "single",
        "question": "An audience question asks about something you have not checked. What should you say?",
        "options": [
          "Invent a detail to avoid pausing.",
          "Claim the chatbot checked it before the talk.",
          "State the limit and identify what would need confirmation."
        ],
        "correct": 2,
        "feedback": "A clear boundary is more credible than an invented confident answer."
      },
      {
        "type": "single",
        "question": "Which question helps decide whether a slide belongs?",
        "options": [
          "How does it support the central message?",
          "Does it fill the remaining time?",
          "Does it contain many words?"
        ],
        "correct": 0,
        "feedback": "A clear purpose keeps the presentation focused on what the audience needs to understand."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Verify it from suitable records or remove or qualify the claim.",
          "Keep every slide because it was generated.",
          "Read it confidently so nobody asks.",
          "Define the central message and keep slides that support it."
        ],
        "correct": [
          0,
          3
        ],
        "feedback": "Presentation quality depends on a coherent explanation as well as appearance. Prominent display and confident delivery do not establish numerical support."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Central message",
          "Evidence note",
          "Rehearsal gap"
        ],
        "options": [
          "A record linking a slide's factual claim to inspected support.",
          "A point that becomes unclear when you try to explain or answer questions.",
          "The main idea the audience should understand after the presentation."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Central message: The main idea the audience should understand after the presentation. Evidence note: A record linking a slide's factual claim to inspected support. Rehearsal gap: A point that becomes unclear when you try to explain or answer questions."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "State the central message and organize supporting ideas.",
          "Verify claims and choose honest readable visuals.",
          "Rehearse explanations and answer realistic questions.",
          "Correct gaps and describe assistance accurately."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. State the central message and organize supporting ideas. Verify claims and choose honest readable visuals. Rehearse explanations and answer realistic questions. Correct gaps and describe assistance accurately."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "How should a generated illustration be described?",
        "options": [
          "As a field photograph regardless of origin.",
          "As an illustration rather than documentation of a real event.",
          "As proof of the event in its caption."
        ],
        "correct": 1,
        "feedback": "Visual representation should match the actual role and origin of the material."
      },
      {
        "type": "single",
        "question": "What makes practice questions useful?",
        "options": [
          "They eliminate the need to understand sources.",
          "They guarantee every future question will be identical.",
          "They reveal gaps in reasoning, support, or explanation."
        ],
        "correct": 2,
        "feedback": "Rehearsal should expose what needs improving before the real presentation."
      },
      {
        "type": "single",
        "question": "Which response best shows ownership of AI-supported preparation?",
        "options": [
          "Explain the argument, inspect sources, and disclose assistance as required.",
          "Only claim that the slides look professional.",
          "Read every line without knowing its meaning."
        ],
        "correct": 0,
        "feedback": "Ownership involves understanding decisions and taking responsibility for the final message."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Invent a detail to avoid pausing.",
          "Learn the term or replace it with accurate wording you understand.",
          "Speak faster during that slide.",
          "State the limit and identify what would need confirmation."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "Speaker notes should support understanding rather than hide a gap. A clear boundary is more credible than an invented confident answer."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "AI produces twenty attractive slides without a clear conclusion. What should you do first?",
          "A slide states a precise percentage with no traceable source. What is responsible?",
          "You can read a generated script but cannot explain one term. What should happen?"
        ],
        "options": [
          "Learn the term or replace it with accurate wording you understand.",
          "Define the central message and keep slides that support it.",
          "Verify it from suitable records or remove or qualify the claim."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. Presentation quality depends on a coherent explanation as well as appearance. Prominent display and confident delivery do not establish numerical support. Speaker notes should support understanding rather than hide a gap."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "State the central message and organize supporting ideas.",
          "Verify claims and choose honest readable visuals.",
          "Rehearse explanations and answer realistic questions.",
          "Correct gaps and describe assistance accurately."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. State the central message and organize supporting ideas. Verify claims and choose honest readable visuals. Rehearse explanations and answer realistic questions. Correct gaps and describe assistance accurately."
      }
    ],
    "references": [
      "sydney",
      "eef"
    ],
    "videoIds": []
  },
  "27": {
    "id": 27,
    "parentDomain": 5,
    "title": "Recognize AI-Enabled Scams",
    "tagline": "Pause an urgent request and verify who is really contacting you.",
    "intro": "A voice message can sound familiar and still come from someone impersonating a relative. Learn to spot the requested action and interrupt the pressure by contacting the person through a number you already know.",
    "objectives": [
      "Explain impersonation and distinguish it from independent confirmation.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Focus on the requested action",
        "A suspicious message might ask for a payment, a password, a verification code, or a private document. Start by identifying what it wants you to do. Whether AI helped create the message is often less important than whether the request is legitimate. Do not spend the critical moment trying to prove a technical production method. You can pause and verify a questionable instruction without establishing whether a human or an AI system wrote every word."
      ],
      [
        "Do not treat a familiar voice as enough",
        "Voice imitation can make an unexpected call sound like someone you know. The Federal Trade Commission advises verifying a claimed family emergency by contacting the person through a number you already know. A realistic voice does not by itself establish the caller's identity. The useful action is independent confirmation, rather than trying to win a listening test. Apply the same caution to an urgent voice note that asks you to keep the request secret."
      ],
      [
        "Use a separate known channel",
        "If a message claims to come from your school, a relative, or a service you use, contact that person or organization through the usual established route. Do not let an uncertain message supply the only verification number. If you cannot reach the person immediately, involve an appropriate trusted contact rather than accepting a stranger's demand for secrecy. Keep the check focused on the specific request and use a source independent of the conversation that created the uncertainty."
      ],
      [
        "Recognize pressure without needing a perfect detector",
        "Urgency, secrecy, threats, and unusual requests can make reflection difficult. In a fictional example, a voice note says that a classmate is stranded and asks you to send a code immediately. The pressure is not evidence that the story is true. Identify the requested action, pause the conversation, and verify the situation independently. A polished message can still be fraudulent, and an awkward message can still need checking. Grammar alone does not settle legitimacy."
      ],
      [
        "Protect information during the check",
        "Do not provide account secrets or personal records to help an unverified caller prove their story. A supposed support worker asking you to read out a private code is still making a sensitive request. Use the actual service's normal help route rather than following instructions from the uncertain contact. If information has already been exposed, stop the interaction and use established support channels with help from a trusted person where appropriate. Avoid sharing the exposure publicly as a way of asking for advice."
      ],
      [
        "Share a useful warning without spreading private details",
        "If you warn classmates about a suspicious request, describe the pattern and the verification habit rather than publishing someone's phone number, private messages, or account information. Do not accuse a named person solely because an account displayed their name. Accounts and media can be imitated or misused. Keep your explanation proportionate: this request was unverified, this action was paused, and this known channel was used to check it. Practical caution does not require dramatic claims about every message."
      ],
      [
        "Respond to an urgent voice note",
        "A message in a familiar voice asks you to send money immediately and keep it secret. Pause the conversation. Call the person using a number already in your contacts or confirm with someone close to them. Discuss why returning a call to a number supplied in the suspicious message would leave you relying on the same sender."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Impersonation",
        "text": "A request presented as if it came from someone else."
      },
      {
        "title": "Independent confirmation",
        "text": "Checking a claim through a known channel outside the uncertain interaction."
      },
      {
        "title": "Pressure tactic",
        "text": "Urgency or secrecy used to rush a decision before verification."
      }
    ],
    "routine": {
      "name": "Recognize AI-Enabled Scams",
      "description": "Confirm the request through a known channel. Use the checklist below on the example above.",
      "checklist": [
        "Identify the requested action or information.",
        "Pause before sharing or responding under pressure.",
        "Confirm through an independently known channel.",
        "Use established support and share only a careful warning."
      ]
    },
    "takeaway": "Pause an urgent request and verify who is really contacting you.",
    "scenarios": [
      {
        "title": "A voice note asking for money",
        "situation": "A voice note sounds like a relative and urgently requests a secret transfer. What should you do?",
        "action": "Pause and contact the relative through a number you already know.",
        "why": "A familiar voice alone does not establish identity; independent confirmation addresses the actual request."
      },
      {
        "title": "A request for a verification code",
        "situation": "A message says school support needs your private verification code. What should happen?",
        "action": "Stop and confirm through the school's or service's established support route without giving the code.",
        "why": "An unexpected request for an account secret deserves an independent check."
      },
      {
        "title": "A polished message with a logo",
        "situation": "A suspicious message has perfect spelling and a formal logo. What can you conclude?",
        "action": "Those features do not establish that the request is legitimate.",
        "why": "Polished wording and copied branding can appear in an unverified request."
      },
      {
        "title": "Warning classmates about a possible scam",
        "situation": "You want to warn a class group about an uncertain impersonation attempt. What is useful?",
        "action": "Explain the pattern and verification step while removing private details.",
        "why": "A warning can help others without spreading personal data or unsupported accusations."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A voice note sounds like a relative and urgently requests a secret transfer. What should you do?",
        "options": [
          "Send immediately because the voice is familiar.",
          "Pause and contact the relative through a number you already know.",
          "Use only the callback number in the uncertain note."
        ],
        "correct": 1,
        "feedback": "A familiar voice alone does not establish identity; independent confirmation addresses the actual request."
      },
      {
        "type": "single",
        "question": "A message says school support needs your private verification code. What should happen?",
        "options": [
          "Send the code to prove cooperation.",
          "Ask a chatbot to guess whether the sender is honest.",
          "Stop and confirm through the school's or service's established support route without giving the code."
        ],
        "correct": 2,
        "feedback": "An unexpected request for an account secret deserves an independent check."
      },
      {
        "type": "single",
        "question": "A suspicious message has perfect spelling and a formal logo. What can you conclude?",
        "options": [
          "Those features do not establish that the request is legitimate.",
          "The message must be official.",
          "Only messages with mistakes can be scams."
        ],
        "correct": 0,
        "feedback": "Polished wording and copied branding can appear in an unverified request."
      },
      {
        "type": "single",
        "question": "You want to warn a class group about an uncertain impersonation attempt. What is useful?",
        "options": [
          "Publish every account secret in the screenshot.",
          "Explain the pattern and verification step while removing private details.",
          "Accuse the named person without confirming who controlled the message."
        ],
        "correct": 1,
        "feedback": "A warning can help others without spreading personal data or unsupported accusations."
      },
      {
        "type": "single",
        "question": "What question should come first in a suspicious interaction?",
        "options": [
          "Which AI model wrote the sentence?",
          "How realistic is the profile photo?",
          "What action or information is this contact asking for?"
        ],
        "correct": 2,
        "feedback": "The requested action helps you identify what must be paused and verified."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Pause and contact the relative through a number you already know.",
          "Send the code to prove cooperation.",
          "Stop and confirm through the school's or service's established support route without giving the code.",
          "Use only the callback number in the uncertain note."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A familiar voice alone does not establish identity; independent confirmation addresses the actual request. An unexpected request for an account secret deserves an independent check."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Impersonation",
          "Independent confirmation",
          "Pressure tactic"
        ],
        "options": [
          "Checking a claim through a known channel outside the uncertain interaction.",
          "Urgency or secrecy used to rush a decision before verification.",
          "A request presented as if it came from someone else."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Impersonation: A request presented as if it came from someone else. Independent confirmation: Checking a claim through a known channel outside the uncertain interaction. Pressure tactic: Urgency or secrecy used to rush a decision before verification."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the requested action or information.",
          "Pause before sharing or responding under pressure.",
          "Confirm through an independently known channel.",
          "Use established support and share only a careful warning."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the requested action or information. Pause before sharing or responding under pressure. Confirm through an independently known channel. Use established support and share only a careful warning."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Which route provides stronger confirmation?",
        "options": [
          "A contact method known independently of the uncertain message.",
          "A new number supplied only by the caller.",
          "A second screenshot from the same account."
        ],
        "correct": 0,
        "feedback": "Independent confirmation avoids letting a questionable interaction verify itself."
      },
      {
        "type": "single",
        "question": "A caller says verification is forbidden because the matter is secret. What should you do?",
        "options": [
          "Treat secrecy as proof of authority.",
          "Pause and check independently despite the pressure.",
          "Provide information before asking questions."
        ],
        "correct": 1,
        "feedback": "Pressure to avoid confirmation is a reason to slow the decision, not proof of legitimacy."
      },
      {
        "type": "single",
        "question": "You cannot determine whether AI made a suspicious message. Can you still act responsibly?",
        "options": [
          "No; technical detection must happen before any pause.",
          "No; every realistic message must be trusted.",
          "Yes; withhold sensitive action and verify the request."
        ],
        "correct": 2,
        "feedback": "The verification habit works even when the production method remains unknown."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Explain the pattern and verification step while removing private details.",
          "Those features do not establish that the request is legitimate.",
          "Publish every account secret in the screenshot.",
          "Only messages with mistakes can be scams."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "Polished wording and copied branding can appear in an unverified request. A warning can help others without spreading personal data or unsupported accusations."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A voice note sounds like a relative and urgently requests a secret transfer. What should you do?",
          "A message says school support needs your private verification code. What should happen?",
          "A suspicious message has perfect spelling and a formal logo. What can you conclude?"
        ],
        "options": [
          "Those features do not establish that the request is legitimate.",
          "Pause and contact the relative through a number you already know.",
          "Stop and confirm through the school's or service's established support route without giving the code."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A familiar voice alone does not establish identity; independent confirmation addresses the actual request. An unexpected request for an account secret deserves an independent check. Polished wording and copied branding can appear in an unverified request."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the requested action or information.",
          "Pause before sharing or responding under pressure.",
          "Confirm through an independently known channel.",
          "Use established support and share only a careful warning."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the requested action or information. Pause before sharing or responding under pressure. Confirm through an independently known channel. Use established support and share only a careful warning."
      }
    ],
    "references": [
      "fraud",
      "npc"
    ],
    "videoIds": []
  },
  "28": {
    "id": 28,
    "parentDomain": 5,
    "title": "Share Files and Screenshots Safely",
    "tagline": "Show what is needed while leaving unnecessary personal information out.",
    "intro": "A screenshot can show names, notifications, or account details outside the part you meant to share. Inspect the whole image or file, reduce it to what the recipient needs, and check the outgoing copy.",
    "objectives": [
      "Explain minimum necessary material and distinguish it from prepared copy.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Define why a file needs sharing",
        "Before uploading a document or screenshot, state what help you need. A grammar question may require one paragraph, not a whole folder of records. A layout question may require a fictional sample, not a class list. Matching the shared material to the purpose reduces unnecessary exposure and makes the task easier to inspect. If you cannot explain why a detail is needed, remove it or ask whether a smaller example can serve the same purpose."
      ],
      [
        "Inspect the whole visible area",
        "Screenshots can include names, browser tabs, notifications, message previews, account identifiers, and other material outside the intended subject. Look at the entire image before sharing it, not only the central paragraph. A screenshot prepared for one purpose may reveal another person's information in a corner. When possible, create a clean example or capture only the relevant area. Check the result after editing so that the shared version contains exactly what you intend to show."
      ],
      [
        "Use a genuinely reduced copy",
        "Work from a separate copy when removing information, and preserve the original privately where appropriate. In the shared version, remove unnecessary identifiers and check that the text is not merely covered in a way that leaves it available elsewhere in the file. A document can contain comments, revision history, or other material beyond the visible page. If you are unsure how to prepare a file safely, use a plain fictional example or an approved school process instead of assuming a visual box solved everything."
      ],
      [
        "Consider other people's information",
        "A file you possess may include information about classmates, interviewees, family, or colleagues. Possession does not automatically mean unlimited permission to upload it to any tool. Ask whether the use is necessary and appropriate under the actual task and school process. A brief invented example can often support practice without exposing anyone's record. Keep the people represented in the file visible in your decision, even when sharing feels like an ordinary step in finishing an assignment."
      ],
      [
        "Check the destination and the audience",
        "Sharing a file with a known teacher through the usual route is different from posting it in a public forum or uploading it to an unrelated service. Confirm where the material is going, who can access it, and which version you are selecting. Do not assume that a link is private merely because it is difficult to guess. Use the actual access settings available in the chosen service and follow the established process for the material involved."
      ],
      [
        "Review the outgoing version before sending",
        "Open the prepared copy and inspect the filename, contents, visible identifiers, and destination. This final check catches mistakes such as selecting the original instead of the reduced version. Keep enough context for the recipient to understand the task, but avoid unrelated personal detail. After sharing, describe the material accurately so others do not assume a fictional example is a real record. Good preparation makes the useful information clear while keeping the sharing proportionate to its purpose."
      ],
      [
        "Share a troubleshooting screenshot safely",
        "You want feedback on an error message in a shared school document. Make a new screenshot of the error only. Check that the account name, tabs, other students’ work, and notifications are out of view. Open the saved image before sharing so you inspect the exact version the recipient would receive."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Minimum necessary material",
        "text": "The smallest suitable content that serves the stated sharing purpose."
      },
      {
        "title": "Prepared copy",
        "text": "A separate version checked for appropriate content before sharing."
      },
      {
        "title": "Audience",
        "text": "The people who can access the material at its destination."
      }
    ],
    "routine": {
      "name": "Share Files and Screenshots Safely",
      "description": "Prepare a copy with only the needed details. Use the checklist below on the example above.",
      "checklist": [
        "State the purpose and minimum needed material.",
        "Prepare a suitable separate copy or fictional example.",
        "Inspect contents, destination, and access.",
        "Select the correct version and review before sending."
      ]
    },
    "takeaway": "Show what is needed while leaving unnecessary personal information out.",
    "scenarios": [
      {
        "title": "Formatting a paragraph in a private file",
        "situation": "You need help formatting a paragraph in a file containing a whole class list. What should you share?",
        "action": "A suitable reduced or fictional example that contains only the necessary paragraph and layout.",
        "why": "The formatting purpose does not require exposing the class records."
      },
      {
        "title": "A notification in the corner of a screenshot",
        "situation": "A screenshot shows your assignment and a private notification in the corner. What should happen?",
        "action": "Prepare and inspect a version without the unrelated notification.",
        "why": "Information outside the intended focus can still be exposed in the shared image."
      },
      {
        "title": "A name covered by a shape",
        "situation": "You hide a name with a shape in an editable document. Is a visual cover enough by itself?",
        "action": "No; inspect the actual shared copy and use an appropriate way to remove unnecessary information.",
        "why": "Visual appearance alone does not establish what content remains available in a file."
      },
      {
        "title": "The upload picker selects the wrong file",
        "situation": "A prepared copy is ready, but the upload picker selects the original file. What is required?",
        "action": "Choose and inspect the intended prepared version before sending.",
        "why": "A careful reduction is ineffective if a different file is transmitted."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "You need help formatting a paragraph in a file containing a whole class list. What should you share?",
        "options": [
          "A suitable reduced or fictional example that contains only the necessary paragraph and layout.",
          "Upload the full file for convenience.",
          "Add student contact details for context."
        ],
        "correct": 0,
        "feedback": "The formatting purpose does not require exposing the class records."
      },
      {
        "type": "single",
        "question": "A screenshot shows your assignment and a private notification in the corner. What should happen?",
        "options": [
          "Ignore the corner because it is small.",
          "Prepare and inspect a version without the unrelated notification.",
          "Ask the recipient not to look without changing the image."
        ],
        "correct": 1,
        "feedback": "Information outside the intended focus can still be exposed in the shared image."
      },
      {
        "type": "single",
        "question": "You hide a name with a shape in an editable document. Is a visual cover enough by itself?",
        "options": [
          "Yes; every shape permanently removes all underlying material.",
          "Yes; no review of the copy is needed.",
          "No; inspect the actual shared copy and use an appropriate way to remove unnecessary information."
        ],
        "correct": 2,
        "feedback": "Visual appearance alone does not establish what content remains available in a file."
      },
      {
        "type": "single",
        "question": "A prepared copy is ready, but the upload picker selects the original file. What is required?",
        "options": [
          "Choose and inspect the intended prepared version before sending.",
          "Send because both filenames look similar.",
          "Assume the service will remove personal details automatically."
        ],
        "correct": 0,
        "feedback": "A careful reduction is ineffective if a different file is transmitted."
      },
      {
        "type": "single",
        "question": "What should determine how much material to share?",
        "options": [
          "The largest file the tool accepts.",
          "The specific purpose and necessary context.",
          "Everything available in the folder."
        ],
        "correct": 1,
        "feedback": "Purpose limits the material needed for an effective and proportionate task."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "A suitable reduced or fictional example that contains only the necessary paragraph and layout.",
          "Add student contact details for context.",
          "Ignore the corner because it is small.",
          "Prepare and inspect a version without the unrelated notification."
        ],
        "correct": [
          0,
          3
        ],
        "feedback": "The formatting purpose does not require exposing the class records. Information outside the intended focus can still be exposed in the shared image."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Minimum necessary material",
          "Prepared copy",
          "Audience"
        ],
        "options": [
          "A separate version checked for appropriate content before sharing.",
          "The people who can access the material at its destination.",
          "The smallest suitable content that serves the stated sharing purpose."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Minimum necessary material: The smallest suitable content that serves the stated sharing purpose. Prepared copy: A separate version checked for appropriate content before sharing. Audience: The people who can access the material at its destination."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "State the purpose and minimum needed material.",
          "Prepare a suitable separate copy or fictional example.",
          "Inspect contents, destination, and access.",
          "Select the correct version and review before sending."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. State the purpose and minimum needed material. Prepare a suitable separate copy or fictional example. Inspect contents, destination, and access. Select the correct version and review before sending."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Which detail belongs in the final review?",
        "options": [
          "Only the desktop wallpaper.",
          "Only the recipient's writing style.",
          "The selected version and who can access it."
        ],
        "correct": 2,
        "feedback": "The content and destination jointly determine what the sharing actually does."
      },
      {
        "type": "single",
        "question": "A file contains classmates' details. What is the right assumption?",
        "options": [
          "Consider necessity and the appropriate permission or process before uploading.",
          "Possession gives unlimited permission.",
          "Schoolwork automatically makes all information public."
        ],
        "correct": 0,
        "feedback": "Other people's information remains relevant even when the file is used for an assignment."
      },
      {
        "type": "single",
        "question": "Why label a fictional practice file accurately?",
        "options": [
          "So it appears more official.",
          "So recipients do not mistake it for a real record.",
          "So attribution can be removed."
        ],
        "correct": 1,
        "feedback": "Clear labelling preserves the meaning of the example as well as its privacy benefit."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "No; inspect the actual shared copy and use an appropriate way to remove unnecessary information.",
          "Choose and inspect the intended prepared version before sending.",
          "Yes; no review of the copy is needed.",
          "Send because both filenames look similar."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "Visual appearance alone does not establish what content remains available in a file. A careful reduction is ineffective if a different file is transmitted."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "You need help formatting a paragraph in a file containing a whole class list. What should you share?",
          "A screenshot shows your assignment and a private notification in the corner. What should happen?",
          "You hide a name with a shape in an editable document. Is a visual cover enough by itself?"
        ],
        "options": [
          "No; inspect the actual shared copy and use an appropriate way to remove unnecessary information.",
          "A suitable reduced or fictional example that contains only the necessary paragraph and layout.",
          "Prepare and inspect a version without the unrelated notification."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. The formatting purpose does not require exposing the class records. Information outside the intended focus can still be exposed in the shared image. Visual appearance alone does not establish what content remains available in a file."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "State the purpose and minimum needed material.",
          "Prepare a suitable separate copy or fictional example.",
          "Inspect contents, destination, and access.",
          "Select the correct version and review before sending."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. State the purpose and minimum needed material. Prepare a suitable separate copy or fictional example. Inspect contents, destination, and access. Select the correct version and review before sending."
      }
    ],
    "references": [
      "privacy",
      "deped"
    ],
    "videoIds": [
      "IxjWR_uexOc"
    ]
  },
  "29": {
    "id": 29,
    "parentDomain": 5,
    "title": "Choose App Permissions Carefully",
    "tagline": "Connect only what a feature actually needs for the task.",
    "intro": "An app may ask for access before you know why it needs it. Identify the feature you want, check how the requested access supports it, and decide whether a narrower option would work.",
    "objectives": [
      "Explain permission scope and distinguish it from necessary access.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Connect a permission to a function",
        "An app may ask to access a camera, microphone, photo library, contacts, or files. Start by asking which feature you intend to use and why that access is needed. A voice-recording activity may need a microphone, while a text-only explanation may not. The existence of a permission request does not establish that every requested item is necessary. Make the connection in plain language before selecting an option, and avoid accepting a whole list simply to dismiss the prompt quickly."
      ],
      [
        "Distinguish the task from an optional extra",
        "Some access supports the main action, while another request may relate to an optional feature. If you want to type a question, you may not need to connect an entire cloud drive. Read the available choices and choose the narrowest suitable route for your actual purpose. If the service does not offer an acceptable option, consider a smaller example or a different approved process. Finishing quickly is not the only criterion when a request involves material beyond the task."
      ],
      [
        "Review what the connected account contains",
        "A folder or account can hold more than the one file you intend to use. Think about whether the access includes other documents, shared material, or records belonging to other people. Connecting a source is different from manually pasting a short fictional paragraph. Use a task-appropriate source and avoid expanding access just because the feature makes it possible. The practical question is what the service can reach through this choice, not only which file you plan to open first."
      ],
      [
        "Keep account secrets out of ordinary prompts",
        "A request for help does not require giving a chatbot your password, recovery code, or other account secret. Use the service's actual sign-in and help process where appropriate, and do not treat a conversational instruction as a reason to paste secrets into a message. If a prompt or unexpected contact asks for them, pause and verify independently. A permission decision should be made through the relevant interface and known process, rather than improvised in a generated conversation."
      ],
      [
        "Revisit access when the purpose changes",
        "A permission that suited a past activity may no longer serve the current one. Review the service's actual settings and the connections you control. Understand what a change does before making it, and follow the appropriate school or organization process for managed accounts. Removing future access should not be described as proof that every past copy has disappeared. Keep claims about storage and retention tied to the service's current documented behavior rather than a reassuring guess."
      ],
      [
        "Make an explainable choice",
        "Before approving a connection, finish this sentence: I need this feature to do this task, and this access is suitable because of these limits. If you cannot explain the relationship, ask for clarification or choose another route. You do not need to learn every technical term to make a careful decision. A useful habit is to connect purpose, scope, and audience, then check whether a smaller permitted option accomplishes the same goal with less unrelated access."
      ],
      [
        "Review a file-access request",
        "A writing tool asks to read your entire cloud drive when you only need feedback on one paragraph. Look for a single-file option or use a short fictional excerpt. Explain what additional material the broad permission would expose. If your need changes later, check the account settings to see which permissions are still active."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Permission scope",
        "text": "The functions or material an app is allowed to access."
      },
      {
        "title": "Necessary access",
        "text": "Access with a clear relationship to the feature and task being used."
      },
      {
        "title": "Connected source",
        "text": "An account, folder, or service made available to another feature."
      }
    ],
    "routine": {
      "name": "Choose App Permissions Carefully",
      "description": "Match each permission to a feature. Use the checklist below on the example above.",
      "checklist": [
        "State the feature and the task you intend to use.",
        "Inspect the scope and connected material.",
        "Choose a necessary suitable option or an approved alternative.",
        "Review access again when the purpose changes."
      ]
    },
    "takeaway": "Connect only what a feature actually needs for the task.",
    "scenarios": [
      {
        "title": "A typing tool asks for drive access",
        "situation": "You only want to type a question, but a tool asks to connect your entire drive. What is sensible?",
        "action": "Use a narrower suitable route or seek clarification before granting unrelated access.",
        "why": "The scope should fit the task rather than expand by default."
      },
      {
        "title": "A recording tool asks for the microphone",
        "situation": "A recording task requests microphone access. What should guide the choice?",
        "action": "Whether the intended recording feature needs it and whether the scope is appropriate.",
        "why": "A clear function-access relationship makes the choice explainable."
      },
      {
        "title": "A shared folder with classmates’ files",
        "situation": "A connected folder includes other classmates' files. What should you inspect?",
        "action": "The material and access the connection includes, not only your intended first file.",
        "why": "A source can expose a wider collection than the one example you want to use."
      },
      {
        "title": "A message asks for a recovery code",
        "situation": "A conversational message asks for an account recovery code. What should happen?",
        "action": "Keep the secret out of the chat and verify through the service's known process.",
        "why": "Account secrets do not belong in an ordinary help prompt."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "You only want to type a question, but a tool asks to connect your entire drive. What is sensible?",
        "options": [
          "Connect every account to avoid future prompts.",
          "Assume all requested access is essential.",
          "Use a narrower suitable route or seek clarification before granting unrelated access."
        ],
        "correct": 2,
        "feedback": "The scope should fit the task rather than expand by default."
      },
      {
        "type": "single",
        "question": "A recording task requests microphone access. What should guide the choice?",
        "options": [
          "Whether the intended recording feature needs it and whether the scope is appropriate.",
          "Whether the permission button is colourful.",
          "Whether another unrelated app requested contacts."
        ],
        "correct": 0,
        "feedback": "A clear function-access relationship makes the choice explainable."
      },
      {
        "type": "single",
        "question": "A connected folder includes other classmates' files. What should you inspect?",
        "options": [
          "Only the name of your own file.",
          "The material and access the connection includes, not only your intended first file.",
          "Nothing, because the connection is convenient."
        ],
        "correct": 1,
        "feedback": "A source can expose a wider collection than the one example you want to use."
      },
      {
        "type": "single",
        "question": "A conversational message asks for an account recovery code. What should happen?",
        "options": [
          "Paste the code because the response sounds technical.",
          "Share a screenshot containing all recovery codes.",
          "Keep the secret out of the chat and verify through the service's known process."
        ],
        "correct": 2,
        "feedback": "Account secrets do not belong in an ordinary help prompt."
      },
      {
        "type": "single",
        "question": "Which question should precede approving access?",
        "options": [
          "Which intended feature needs this scope for this task?",
          "How can I dismiss every prompt fastest?",
          "Can I connect more accounts just in case?"
        ],
        "correct": 0,
        "feedback": "The purpose and scope of access should be clear before the choice is made."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Assume all requested access is essential.",
          "Use a narrower suitable route or seek clarification before granting unrelated access.",
          "Whether the permission button is colourful.",
          "Whether the intended recording feature needs it and whether the scope is appropriate."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "The scope should fit the task rather than expand by default. A clear function-access relationship makes the choice explainable."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Permission scope",
          "Necessary access",
          "Connected source"
        ],
        "options": [
          "Access with a clear relationship to the feature and task being used.",
          "An account, folder, or service made available to another feature.",
          "The functions or material an app is allowed to access."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Permission scope: The functions or material an app is allowed to access. Necessary access: Access with a clear relationship to the feature and task being used. Connected source: An account, folder, or service made available to another feature."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "State the feature and the task you intend to use.",
          "Inspect the scope and connected material.",
          "Choose a necessary suitable option or an approved alternative.",
          "Review access again when the purpose changes."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. State the feature and the task you intend to use. Inspect the scope and connected material. Choose a necessary suitable option or an approved alternative. Review access again when the purpose changes."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "You no longer use a connected feature. What is useful?",
        "options": [
          "Assume it removed itself.",
          "Review its actual access settings through the relevant account process.",
          "Publicly post the account secret."
        ],
        "correct": 1,
        "feedback": "Past access choices should be revisited when their purpose changes."
      },
      {
        "type": "single",
        "question": "Does removing future access prove every previous copy is deleted?",
        "options": [
          "Yes, without inspecting anything.",
          "Yes, if a chatbot promises it.",
          "No; storage and retention depend on the service's actual behavior and policies."
        ],
        "correct": 2,
        "feedback": "Permissions and retention are different questions, so avoid unsupported deletion claims."
      },
      {
        "type": "single",
        "question": "Which alternative can reduce unnecessary access for a practice task?",
        "options": [
          "A small fictional example supplied through an approved route.",
          "An entire shared drive.",
          "Another person's full account."
        ],
        "correct": 0,
        "feedback": "A limited example can serve learning without connecting a larger collection."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "The material and access the connection includes, not only your intended first file.",
          "Nothing, because the connection is convenient.",
          "Keep the secret out of the chat and verify through the service's known process.",
          "Paste the code because the response sounds technical."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A source can expose a wider collection than the one example you want to use. Account secrets do not belong in an ordinary help prompt."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "You only want to type a question, but a tool asks to connect your entire drive. What is sensible?",
          "A recording task requests microphone access. What should guide the choice?",
          "A connected folder includes other classmates' files. What should you inspect?"
        ],
        "options": [
          "The material and access the connection includes, not only your intended first file.",
          "Use a narrower suitable route or seek clarification before granting unrelated access.",
          "Whether the intended recording feature needs it and whether the scope is appropriate."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. The scope should fit the task rather than expand by default. A clear function-access relationship makes the choice explainable. A source can expose a wider collection than the one example you want to use."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "State the feature and the task you intend to use.",
          "Inspect the scope and connected material.",
          "Choose a necessary suitable option or an approved alternative.",
          "Review access again when the purpose changes."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. State the feature and the task you intend to use. Inspect the scope and connected material. Choose a necessary suitable option or an approved alternative. Review access again when the purpose changes."
      }
    ],
    "references": [
      "npc",
      "privacy"
    ],
    "videoIds": []
  },
  "30": {
    "id": 30,
    "parentDomain": 6,
    "title": "Fairness in AI Recommendations",
    "tagline": "Ask who benefits, who is missed, and how a decision can be questioned.",
    "intro": "A system can rank people or choices according to criteria that miss important circumstances. Ask who is affected, inspect the criteria and possible outcomes, and plan a way for a person to review questionable cases.",
    "objectives": [
      "Explain criterion and distinguish it from affected person.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Identify who the recommendation affects",
        "A system recommending a study group, activity, or opportunity can influence what people get to see or do. Begin with the people affected and the consequences of following the recommendation. A ranked list is not merely a neutral display when someone uses it to allocate attention or access. Ask whose goals the ranking serves and who remains responsible for the final decision. This frames fairness as a practical question about people, evidence, and opportunities."
      ],
      [
        "Examine the criteria being used",
        "A recommendation depends on the information and rules or patterns available to the system. A classroom practice system might rank students using one quiz score even though the activity requires several skills. Ask whether the criteria actually match the purpose. A convenient measure can be incomplete. Do not treat a numerical score as a full description of a person, and do not assume that a ranking becomes fair simply because it was produced by a computer."
      ],
      [
        "Look for missing perspectives and conditions",
        "People can be represented unevenly in examples, records, or testing. A recommendation may fit learners with a reliable connection while being impractical for someone who shares a device. Ask about relevant circumstances without demanding unnecessary private information from individuals. A fair review can include alternative ways to participate and a way to point out missing conditions. The goal is to examine whether the process serves its stated purpose across the people who actually encounter it."
      ],
      [
        "Inspect outcomes instead of assuming intent",
        "If a pattern of disadvantage appears, investigate the criteria, data, and process rather than immediately inventing a story about the system's feelings. The problem can matter regardless of whether anyone intended it. Compare relevant cases and document what you observe. Be careful with a small sample: one example can signal a concern without establishing its full extent. A proportionate response takes the concern seriously while keeping the explanation tied to inspectable evidence."
      ],
      [
        "Keep a route for human review",
        "A person affected by a recommendation should have an appropriate way to ask what happened and correct relevant information. In a classroom activity, that might mean discussing an unsuitable practice recommendation with the teacher instead of accepting a label as permanent. Human review needs real criteria and attention; merely placing a person after a ranking does not guarantee a careful decision. Keep the process understandable enough that questions can lead to meaningful reconsideration."
      ],
      [
        "Use a recommendation as one input",
        "A system can suggest an option without becoming the final authority about a person's potential or needs. Compare its output with relevant evidence and the task's actual purpose. If a recommendation is kept, explain why it fits; if it is changed, record the reason. Avoid assigning fixed personal labels from a limited result. An accountable choice makes both the criteria and the responsibility visible, especially when the outcome affects someone beyond the person operating the tool."
      ],
      [
        "Check a ranking for uneven access",
        "An AI shortlist recommends club members based on how often they post online. Some students contribute in person and have limited internet access. Compare the shortlist with another measure of participation. Explain whom the original ranking might miss and how a teacher or organizer could review those cases before choosing members."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Criterion",
        "text": "A feature or condition used to compare options for a decision."
      },
      {
        "title": "Affected person",
        "text": "Someone whose opportunities or treatment may change because of the output."
      },
      {
        "title": "Review route",
        "text": "A way to question a result and correct relevant information."
      }
    ],
    "routine": {
      "name": "Fairness in AI Recommendations",
      "description": "Inspect how a ranking treats different people. Use the checklist below on the example above.",
      "checklist": [
        "Identify the purpose and people affected.",
        "Inspect the criteria and relevant missing conditions.",
        "Compare outcomes and offer an appropriate review route.",
        "Make and explain the responsible final decision."
      ]
    },
    "takeaway": "Ask who benefits, who is missed, and how a decision can be questioned.",
    "scenarios": [
      {
        "title": "A recommendation based on one quiz",
        "situation": "A system recommends a difficult activity based on one quiz, ignoring a learner's actual task needs. What needs inspection?",
        "action": "Whether the criteria fit the learning purpose and relevant circumstances.",
        "why": "A limited measure should not stand in for a complete understanding of the learner."
      },
      {
        "title": "An activity that assumes private devices",
        "situation": "A recommended online activity assumes everyone has a private device. What should the class consider?",
        "action": "Relevant access conditions and suitable alternative ways to participate.",
        "why": "A workable recommendation needs to fit the circumstances of the people affected."
      },
      {
        "title": "A recommendation based on a wrong record",
        "situation": "A learner finds that an incorrect record influenced a recommendation. What is important?",
        "action": "An appropriate route to correct the information and review the result.",
        "why": "Accountability includes the possibility of meaningful correction."
      },
      {
        "title": "Describing a possible disadvantage",
        "situation": "One observed outcome suggests disadvantage. How should it be described?",
        "action": "As a concern to investigate with relevant comparisons and evidence.",
        "why": "A signal deserves attention without overstating what one example establishes."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A system recommends a difficult activity based on one quiz, ignoring a learner's actual task needs. What needs inspection?",
        "options": [
          "Assume every numerical ranking is fair.",
          "Whether the criteria fit the learning purpose and relevant circumstances.",
          "Treat the recommendation as a permanent personal label."
        ],
        "correct": 1,
        "feedback": "A limited measure should not stand in for a complete understanding of the learner."
      },
      {
        "type": "single",
        "question": "A recommended online activity assumes everyone has a private device. What should the class consider?",
        "options": [
          "Blame learners who share a device.",
          "Ignore access because the system did not mention it.",
          "Relevant access conditions and suitable alternative ways to participate."
        ],
        "correct": 2,
        "feedback": "A workable recommendation needs to fit the circumstances of the people affected."
      },
      {
        "type": "single",
        "question": "A learner finds that an incorrect record influenced a recommendation. What is important?",
        "options": [
          "An appropriate route to correct the information and review the result.",
          "Keep the mistake because computers are neutral.",
          "Prevent questions so the ranking stays consistent."
        ],
        "correct": 0,
        "feedback": "Accountability includes the possibility of meaningful correction."
      },
      {
        "type": "single",
        "question": "One observed outcome suggests disadvantage. How should it be described?",
        "options": [
          "Proof of the system's personal hatred.",
          "As a concern to investigate with relevant comparisons and evidence.",
          "Proof that no further review is needed."
        ],
        "correct": 1,
        "feedback": "A signal deserves attention without overstating what one example establishes."
      },
      {
        "type": "single",
        "question": "What should fairness review begin with?",
        "options": [
          "The product's logo.",
          "The length of the output.",
          "The purpose, affected people, and consequences."
        ],
        "correct": 2,
        "feedback": "Fairness concerns arise from how a process affects people and whether its criteria fit the task."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Relevant access conditions and suitable alternative ways to participate.",
          "Treat the recommendation as a permanent personal label.",
          "Whether the criteria fit the learning purpose and relevant circumstances.",
          "Blame learners who share a device."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A limited measure should not stand in for a complete understanding of the learner. A workable recommendation needs to fit the circumstances of the people affected."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Criterion",
          "Affected person",
          "Review route"
        ],
        "options": [
          "Someone whose opportunities or treatment may change because of the output.",
          "A way to question a result and correct relevant information.",
          "A feature or condition used to compare options for a decision."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Criterion: A feature or condition used to compare options for a decision. Affected person: Someone whose opportunities or treatment may change because of the output. Review route: A way to question a result and correct relevant information."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the purpose and people affected.",
          "Inspect the criteria and relevant missing conditions.",
          "Compare outcomes and offer an appropriate review route.",
          "Make and explain the responsible final decision."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the purpose and people affected. Inspect the criteria and relevant missing conditions. Compare outcomes and offer an appropriate review route. Make and explain the responsible final decision."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Why is a score not a complete description of a learner?",
        "options": [
          "It measures a limited task or set of information.",
          "Every number is meaningless.",
          "It automatically includes all personal circumstances."
        ],
        "correct": 0,
        "feedback": "Use a measure within its scope rather than turning it into a fixed identity."
      },
      {
        "type": "single",
        "question": "What makes human review meaningful?",
        "options": [
          "A person approving every result without reading it.",
          "Clear criteria, relevant evidence, and the ability to reconsider.",
          "Only adding a signature."
        ],
        "correct": 1,
        "feedback": "Review requires an actual decision process rather than a ceremonial final step."
      },
      {
        "type": "single",
        "question": "A recommendation is changed. What helps accountability?",
        "options": [
          "A claim that preferences need no explanation.",
          "Deleting the original context.",
          "A reason connected to the task and relevant evidence."
        ],
        "correct": 2,
        "feedback": "An explainable change lets others understand how responsibility was exercised."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "An appropriate route to correct the information and review the result.",
          "Prevent questions so the ranking stays consistent.",
          "As a concern to investigate with relevant comparisons and evidence.",
          "Proof of the system's personal hatred."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "Accountability includes the possibility of meaningful correction. A signal deserves attention without overstating what one example establishes."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A system recommends a difficult activity based on one quiz, ignoring a learner's actual task needs. What needs inspection?",
          "A recommended online activity assumes everyone has a private device. What should the class consider?",
          "A learner finds that an incorrect record influenced a recommendation. What is important?"
        ],
        "options": [
          "An appropriate route to correct the information and review the result.",
          "Whether the criteria fit the learning purpose and relevant circumstances.",
          "Relevant access conditions and suitable alternative ways to participate."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A limited measure should not stand in for a complete understanding of the learner. A workable recommendation needs to fit the circumstances of the people affected. Accountability includes the possibility of meaningful correction."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the purpose and people affected.",
          "Inspect the criteria and relevant missing conditions.",
          "Compare outcomes and offer an appropriate review route.",
          "Make and explain the responsible final decision."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the purpose and people affected. Inspect the criteria and relevant missing conditions. Compare outcomes and offer an appropriate review route. Make and explain the responsible final decision."
      }
    ],
    "references": [
      "nist",
      "students"
    ],
    "videoIds": [
      "x2mRoFNm22g"
    ]
  },
  "31": {
    "id": 31,
    "parentDomain": 6,
    "title": "Create Accessible AI Content",
    "tagline": "Make generated material easier for different people to read, hear, and use.",
    "intro": "A beautiful poster is hard to use if its essential directions are only inside an image. Provide meaningful text, choose descriptions according to an image’s purpose, and check whether someone can complete the task from the information you publish.",
    "objectives": [
      "Explain text alternative and distinguish it from essential information.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Start with the audience's task",
        "Accessibility begins with what people need to do with the material. A class announcement should communicate the date, place, and action clearly whether someone reads it on a small screen or uses another way to access it. Ask how essential information is delivered and where a learner might be blocked. AI can suggest wording or descriptions, but the creator still needs to inspect the result. A visually attractive output is incomplete if part of the audience cannot obtain its central message."
      ],
      [
        "Make important text available as text",
        "A poster image can be useful, but essential instructions should also appear in readable text where the platform allows. This makes the message easier to enlarge, copy, translate, and access with assistive tools. Keep a clear order and use meaningful headings rather than presenting every sentence as decoration. In a classroom example, place the event title, date, location, and required action in a text post alongside the poster, and inspect both versions for consistency."
      ],
      [
        "Describe an image according to its purpose",
        "The W3C's image guidance distinguishes information-bearing images from purely decorative ones. A useful text alternative communicates the information or function the image contributes in context. For a chart, that may require the key finding and access to relevant values rather than a vague phrase such as picture of a chart. AI can draft a description, but you must compare it with the actual image. Do not retain invented details or assumptions that a reader cannot establish from the content."
      ],
      [
        "Check automated wording against the material",
        "A generated description may confidently identify a person, object, action, or trend incorrectly. Compare it with the actual material and remove unsupported interpretations. If the information is uncertain, preserve that uncertainty rather than turning a guess into an access barrier. The same habit applies to generated summaries: important conditions and instructions should remain intact. The goal is to provide another reliable route to the content, rather than a polished but different story about it."
      ],
      [
        "Use clear language and meaningful structure",
        "Choose familiar wording, manageable paragraphs, and labels that explain the action. A link called View the activity instructions is more helpful than several identical links called Click here. Keep instructions in a logical order and explain unfamiliar terms. A tool can help simplify a sentence, but inspect whether the meaning changed. In a group task, ask another learner to follow the instructions without extra explanation. The point where they hesitate can reveal a useful revision."
      ],
      [
        "Review access as part of publication",
        "Before posting, compare the visible message, text alternative, and linked instructions. Check whether they communicate the same essential information and whether a reader can identify the next action. Use the actual platform's accessibility features where appropriate and seek feedback from the audience. Do not claim that one generated description proves complete accessibility. It is one part of a practical review. Keep improving material when a learner points out a barrier you had not noticed."
      ],
      [
        "Give an event poster a usable text version",
        "A class poster announces an event. Put the date, time, room, and sign-up action in nearby text. If an image adds meaningful information, describe that information briefly and compare any AI-generated description with the actual poster. Ask someone to find the event time using only the text to see whether the crucial details came through."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Text alternative",
        "text": "Text communicating the information or function an image contributes in context."
      },
      {
        "title": "Essential information",
        "text": "The content a person needs to understand the message or complete the task."
      },
      {
        "title": "Meaningful label",
        "text": "Wording that explains a link, control, section, or action."
      }
    ],
    "routine": {
      "name": "Create Accessible AI Content",
      "description": "Make the important information reachable. Use the checklist below on the example above.",
      "checklist": [
        "Identify the audience's task and essential information.",
        "Provide clear text and appropriate alternatives.",
        "Compare generated descriptions with the actual content.",
        "Review the full task and revise barriers found in use."
      ]
    },
    "takeaway": "Make generated material easier for different people to read, hear, and use.",
    "scenarios": [
      {
        "title": "Instructions trapped in a poster image",
        "situation": "An event poster contains all instructions only inside an image. What improves access?",
        "action": "Provide the essential date, place, and action in readable text too.",
        "why": "A text route helps people obtain the message in more than one way."
      },
      {
        "title": "A chart description misses a decline",
        "situation": "AI describes a chart as showing a steady rise, but the values fall in the final period. What should happen?",
        "action": "Correct the description against the actual chart and relevant values.",
        "why": "An alternative description must communicate the content accurately rather than repeat an invented trend."
      },
      {
        "title": "Three identical link labels",
        "situation": "Three links are all labelled Click here. What is a useful revision?",
        "action": "Name each destination or action clearly.",
        "why": "Meaningful labels help users understand where a link will take them."
      },
      {
        "title": "A purely decorative image",
        "situation": "A purely decorative image does not add information. How should its treatment be decided?",
        "action": "According to its role in context and the platform's appropriate accessibility features.",
        "why": "The image's function determines whether it needs an informational description."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "An event poster contains all instructions only inside an image. What improves access?",
        "options": [
          "Provide the essential date, place, and action in readable text too.",
          "Add more decorative effects.",
          "Assume everyone can read small text inside the image."
        ],
        "correct": 0,
        "feedback": "A text route helps people obtain the message in more than one way."
      },
      {
        "type": "single",
        "question": "AI describes a chart as showing a steady rise, but the values fall in the final period. What should happen?",
        "options": [
          "Keep it because the wording is fluent.",
          "Correct the description against the actual chart and relevant values.",
          "Remove all chart values so the text sounds correct."
        ],
        "correct": 1,
        "feedback": "An alternative description must communicate the content accurately rather than repeat an invented trend."
      },
      {
        "type": "single",
        "question": "Three links are all labelled Click here. What is a useful revision?",
        "options": [
          "Make every link the same colour and wording.",
          "Hide the destinations until after clicking.",
          "Name each destination or action clearly."
        ],
        "correct": 2,
        "feedback": "Meaningful labels help users understand where a link will take them."
      },
      {
        "type": "single",
        "question": "A purely decorative image does not add information. How should its treatment be decided?",
        "options": [
          "According to its role in context and the platform's appropriate accessibility features.",
          "Invent a detailed story for every decoration.",
          "Use the filename as the only description for all images."
        ],
        "correct": 0,
        "feedback": "The image's function determines whether it needs an informational description."
      },
      {
        "type": "single",
        "question": "What should guide an AI-generated image description?",
        "options": [
          "A dramatic story unrelated to the image.",
          "The information or function the actual image contributes in context.",
          "Whatever the model confidently imagines."
        ],
        "correct": 1,
        "feedback": "An access route should preserve the content rather than substitute a new interpretation."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Provide the essential date, place, and action in readable text too.",
          "Correct the description against the actual chart and relevant values.",
          "Assume everyone can read small text inside the image.",
          "Keep it because the wording is fluent."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "A text route helps people obtain the message in more than one way. An alternative description must communicate the content accurately rather than repeat an invented trend."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Text alternative",
          "Essential information",
          "Meaningful label"
        ],
        "options": [
          "The content a person needs to understand the message or complete the task.",
          "Wording that explains a link, control, section, or action.",
          "Text communicating the information or function an image contributes in context."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Text alternative: Text communicating the information or function an image contributes in context. Essential information: The content a person needs to understand the message or complete the task. Meaningful label: Wording that explains a link, control, section, or action."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Identify the audience's task and essential information.",
          "Provide clear text and appropriate alternatives.",
          "Compare generated descriptions with the actual content.",
          "Review the full task and revise barriers found in use."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Identify the audience's task and essential information. Provide clear text and appropriate alternatives. Compare generated descriptions with the actual content. Review the full task and revise barriers found in use."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "Why inspect a simplified instruction?",
        "options": [
          "Simple wording is always wrong.",
          "Long sentences are automatically accessible.",
          "It may remove a condition or change the required action."
        ],
        "correct": 2,
        "feedback": "Clarity and accurate meaning need to be reviewed together."
      },
      {
        "type": "single",
        "question": "Which test is useful before posting classroom instructions?",
        "options": [
          "Ask someone to follow them and inspect where the task becomes unclear.",
          "Count only the decorative images.",
          "Assume generated wording is ready without review."
        ],
        "correct": 0,
        "feedback": "Real use can reveal barriers that are missed when checking appearance alone."
      },
      {
        "type": "single",
        "question": "Does one good text alternative establish complete accessibility?",
        "options": [
          "Yes; nothing else needs inspection.",
          "No; review the whole task and remain open to audience feedback.",
          "Yes; every user has identical needs."
        ],
        "correct": 1,
        "feedback": "Accessibility concerns the complete experience and cannot be reduced to one generated field."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Invent a detailed story for every decoration.",
          "Name each destination or action clearly.",
          "According to its role in context and the platform's appropriate accessibility features.",
          "Hide the destinations until after clicking."
        ],
        "correct": [
          1,
          2
        ],
        "feedback": "Meaningful labels help users understand where a link will take them. The image's function determines whether it needs an informational description."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "An event poster contains all instructions only inside an image. What improves access?",
          "AI describes a chart as showing a steady rise, but the values fall in the final period. What should happen?",
          "Three links are all labelled Click here. What is a useful revision?"
        ],
        "options": [
          "Name each destination or action clearly.",
          "Provide the essential date, place, and action in readable text too.",
          "Correct the description against the actual chart and relevant values."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A text route helps people obtain the message in more than one way. An alternative description must communicate the content accurately rather than repeat an invented trend. Meaningful labels help users understand where a link will take them."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Identify the audience's task and essential information.",
          "Provide clear text and appropriate alternatives.",
          "Compare generated descriptions with the actual content.",
          "Review the full task and revise barriers found in use."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Identify the audience's task and essential information. Provide clear text and appropriate alternatives. Compare generated descriptions with the actual content. Review the full task and revise barriers found in use."
      }
    ],
    "references": [
      "accessibility"
    ],
    "videoIds": []
  },
  "32": {
    "id": 32,
    "parentDomain": 6,
    "title": "Keep People in Everyday AI Decisions",
    "tagline": "Use suggestions thoughtfully when a choice affects you or someone else.",
    "intro": "AI can list options for a school or group decision. The person responsible still needs to check constraints, listen to people affected, and explain the choice. You’ll distinguish suggestions from the authority to act.",
    "objectives": [
      "Explain decision criterion and distinguish it from constraint.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Define the decision and its consequences",
        "An AI suggestion might concern a study plan, club activity, project role, or daily schedule. Begin by naming the actual choice and who will be affected. A tool can generate options without knowing every constraint or taking responsibility for the outcome. The consequence of a mistaken suggestion determines how much checking and human involvement are needed. A low-impact brainstorming choice differs from a decision involving another person's opportunities, records, safety, or important commitments."
      ],
      [
        "Separate useful options from a final judgment",
        "A generated list can help you think of alternatives, but it does not settle which one fits. Write your own criteria, such as available time, task requirements, accessibility, and the preferences of people involved. Then compare each option against them. Do not let the tool's ordering silently become your priorities. If it recommends a project role for a classmate, ask that person and use the group's actual criteria instead of treating the suggestion as a description of their ability."
      ],
      [
        "Check missing constraints",
        "A proposed plan may assume a free afternoon, reliable internet, available materials, or skills that the group has not learned. Compare the suggestion with real conditions. You can provide non-sensitive constraints in a follow-up, but avoid sharing unnecessary personal records to make the plan more detailed. A useful revision makes the suggestion feasible without overexposing the people involved. The result should fit the actual task, not an idealized situation invented by the system."
      ],
      [
        "Consider an ordinary alternative",
        "AI is one possible input, not a requirement for every choice. A conversation, a teacher's clarification, an existing checklist, or a simple timetable may resolve the issue more directly. Compare the effort and uncertainty introduced by another tool interaction with what it adds. Choosing a simpler route can be a reasoned decision. The goal is to make an appropriate choice, not to prove that every part of the process involved a generated recommendation."
      ],
      [
        "Use human authority where it belongs",
        "A chatbot cannot grant your teacher's permission, confirm a school policy, or decide what another person has agreed to. When a decision depends on such authority, use the actual responsible person or organization. Keep the question specific so that the confirmation addresses the uncertainty. A generated explanation of what a policy might mean is not the same as the issuer confirming which rule applies to your situation. Responsibility and authority remain tied to real roles."
      ],
      [
        "Record why the final option fits",
        "A short reason can connect the choice with criteria, relevant evidence, and remaining uncertainty. For example, a group might choose a smaller project because it fits the available time and everyone can explain the required skills. If circumstances change, revisit the decision instead of defending the first suggestion automatically. Owning a choice means understanding its basis and accepting the need to revise it when better information appears, rather than blaming the tool for an outcome you never evaluated."
      ],
      [
        "Choose a club schedule with real constraints",
        "An AI tool suggests that a club meet after class every Friday. Check the room schedule, transportation needs, and members’ availability. Invite a student who would have difficulty attending to explain their constraint. Then choose or revise an option with the club adviser and record the reason so members can understand how the decision was made."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Decision criterion",
        "text": "A condition used to judge which option fits a task."
      },
      {
        "title": "Constraint",
        "text": "A real limit such as time, resources, rules, or access."
      },
      {
        "title": "Human authority",
        "text": "The actual person or organization responsible for permission or an official decision."
      }
    ],
    "routine": {
      "name": "Keep People in Everyday AI Decisions",
      "description": "Keep responsibility with the decision maker. Use the checklist below on the example above.",
      "checklist": [
        "Define the choice and people affected.",
        "Set criteria and inspect real constraints.",
        "Compare options and confirm actual authority where needed.",
        "Choose for a stated reason and review when conditions change."
      ]
    },
    "takeaway": "Use suggestions thoughtfully when a choice affects you or someone else.",
    "scenarios": [
      {
        "title": "AI assigns a classmate a role",
        "situation": "AI assigns a classmate a role based only on a short description. What should the group do?",
        "action": "Discuss the role with the person and use relevant group criteria.",
        "why": "The person affected should not be reduced to a generated guess about their abilities."
      },
      {
        "title": "A plan needs unavailable materials",
        "situation": "A proposed plan needs materials the group cannot access. What is needed?",
        "action": "Revise the plan against the actual constraints or choose another feasible option.",
        "why": "A polished plan is useful only if it can be carried out under real conditions."
      },
      {
        "title": "A chatbot claims the teacher will agree",
        "situation": "A chatbot says the teacher will allow an activity. What establishes permission?",
        "action": "Confirmation from the actual teacher under the task's rules.",
        "why": "A generated prediction does not carry the authority of the person setting the assignment."
      },
      {
        "title": "A preference the group can discuss",
        "situation": "An ordinary discussion can settle a small group preference. What is reasonable?",
        "action": "Use the discussion if it directly resolves the choice.",
        "why": "Tool use should serve the task rather than become an unnecessary requirement."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "AI assigns a classmate a role based only on a short description. What should the group do?",
        "options": [
          "Treat the role as mandatory.",
          "Assume the tool obtained the classmate's agreement.",
          "Discuss the role with the person and use relevant group criteria."
        ],
        "correct": 2,
        "feedback": "The person affected should not be reduced to a generated guess about their abilities."
      },
      {
        "type": "single",
        "question": "A proposed plan needs materials the group cannot access. What is needed?",
        "options": [
          "Revise the plan against the actual constraints or choose another feasible option.",
          "Keep it to impress the teacher.",
          "Invent access to the missing materials."
        ],
        "correct": 0,
        "feedback": "A polished plan is useful only if it can be carried out under real conditions."
      },
      {
        "type": "single",
        "question": "A chatbot says the teacher will allow an activity. What establishes permission?",
        "options": [
          "The chatbot's confident tone.",
          "Confirmation from the actual teacher under the task's rules.",
          "The number of times the tool repeats permission."
        ],
        "correct": 1,
        "feedback": "A generated prediction does not carry the authority of the person setting the assignment."
      },
      {
        "type": "single",
        "question": "An ordinary discussion can settle a small group preference. What is reasonable?",
        "options": [
          "Generate endless rankings before speaking.",
          "Ask the tool to decide everyone's preferences privately.",
          "Use the discussion if it directly resolves the choice."
        ],
        "correct": 2,
        "feedback": "Tool use should serve the task rather than become an unnecessary requirement."
      },
      {
        "type": "single",
        "question": "What should come before comparing generated options?",
        "options": [
          "Your criteria and the consequences of the decision.",
          "The tool's preferred ranking.",
          "The most decorative output."
        ],
        "correct": 0,
        "feedback": "Clear criteria keep the final choice connected to real needs."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Discuss the role with the person and use relevant group criteria.",
          "Assume the tool obtained the classmate's agreement.",
          "Keep it to impress the teacher.",
          "Revise the plan against the actual constraints or choose another feasible option."
        ],
        "correct": [
          0,
          3
        ],
        "feedback": "The person affected should not be reduced to a generated guess about their abilities. A polished plan is useful only if it can be carried out under real conditions."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Decision criterion",
          "Constraint",
          "Human authority"
        ],
        "options": [
          "A real limit such as time, resources, rules, or access.",
          "The actual person or organization responsible for permission or an official decision.",
          "A condition used to judge which option fits a task."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Decision criterion: A condition used to judge which option fits a task. Constraint: A real limit such as time, resources, rules, or access. Human authority: The actual person or organization responsible for permission or an official decision."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Define the choice and people affected.",
          "Set criteria and inspect real constraints.",
          "Compare options and confirm actual authority where needed.",
          "Choose for a stated reason and review when conditions change."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Define the choice and people affected. Set criteria and inspect real constraints. Compare options and confirm actual authority where needed. Choose for a stated reason and review when conditions change."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "A plan assumes free time you do not have. What should you inspect?",
        "options": [
          "Only its motivational tone.",
          "The mismatch between its assumptions and your constraints.",
          "Only the number of steps."
        ],
        "correct": 1,
        "feedback": "Feasibility depends on conditions, not the polish of the plan."
      },
      {
        "type": "single",
        "question": "When circumstances change after a choice, what is responsible?",
        "options": [
          "Defend the first output automatically.",
          "Blame the tool without reviewing your use.",
          "Review the choice using the new relevant information."
        ],
        "correct": 2,
        "feedback": "Ownership includes revision when the basis of a decision changes."
      },
      {
        "type": "single",
        "question": "What makes a final choice explainable?",
        "options": [
          "A reason linking the option with criteria, support, and limits.",
          "Only that AI recommended it.",
          "Only that it appeared first."
        ],
        "correct": 0,
        "feedback": "An accountable decision has a basis that the people involved can understand."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Generate endless rankings before speaking.",
          "Use the discussion if it directly resolves the choice.",
          "The number of times the tool repeats permission.",
          "Confirmation from the actual teacher under the task's rules."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "A generated prediction does not carry the authority of the person setting the assignment. Tool use should serve the task rather than become an unnecessary requirement."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "AI assigns a classmate a role based only on a short description. What should the group do?",
          "A proposed plan needs materials the group cannot access. What is needed?",
          "A chatbot says the teacher will allow an activity. What establishes permission?"
        ],
        "options": [
          "Confirmation from the actual teacher under the task's rules.",
          "Discuss the role with the person and use relevant group criteria.",
          "Revise the plan against the actual constraints or choose another feasible option."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. The person affected should not be reduced to a generated guess about their abilities. A polished plan is useful only if it can be carried out under real conditions. A generated prediction does not carry the authority of the person setting the assignment."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Define the choice and people affected.",
          "Set criteria and inspect real constraints.",
          "Compare options and confirm actual authority where needed.",
          "Choose for a stated reason and review when conditions change."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Define the choice and people affected. Set criteria and inspect real constraints. Compare options and confirm actual authority where needed. Choose for a stated reason and review when conditions change."
      }
    ],
    "references": [
      "students",
      "nist",
      "deped"
    ],
    "videoIds": []
  },
  "33": {
    "id": 33,
    "parentDomain": 7,
    "title": "Build a Study Routine with AI",
    "tagline": "Use explanations and practice to strengthen what you can do independently.",
    "intro": "Reading a fluent explanation can feel like progress even when you can’t solve a new problem. Set a small target, use hints to work through a specific difficulty, and check what you can do without the answer in view.",
    "objectives": [
      "Explain learning target and distinguish it from focused feedback.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Choose one learning target",
        "A useful study session starts with a specific skill or concept rather than an invitation to generate everything about a subject. Name what you want to explain or do by the end. For example, aim to solve a particular kind of percentage problem or distinguish two related concepts. This gives the session a clear endpoint and helps you decide whether assistance was useful. A long chat can feel productive while leaving the target vague and the actual learning difficult to inspect."
      ],
      [
        "Try the task before requesting a solution",
        "Make a first attempt using your current understanding. Mark the step where you become uncertain and preserve what you tried. That attempt gives you a concrete basis for asking for a hint, explanation, or feedback. If the tool immediately supplies the full answer, return to the original learning purpose rather than treating the finished solution as your work. The important information is where your reasoning needs support, not merely what answer belongs at the end."
      ],
      [
        "Use feedback to revise a specific gap",
        "When feedback arrives, compare it with the task and a suitable learning source. Ask why a correction is needed, and work through the relevant step yourself. If a generated explanation conflicts with the teacher's method, inspect the actual difference instead of copying whichever version is shorter. A useful correction changes something you can explain. Record that change in a sentence, such as I was applying the percentage to the wrong whole, so the denominator must be identified first."
      ],
      [
        "Practise without the answer visible",
        "After support, try a fresh example without looking at the completed solution. Explain your steps aloud or write a short reason for each operation. If you cannot proceed, the point of difficulty helps guide the next focused question. Do not confuse recognizing an answer with being able to produce and justify it. Independent practice is the part of the routine that shows whether assistance has transferred into something you can actually do."
      ],
      [
        "Return to the idea later",
        "A later short check can reveal whether the idea remains accessible after the conversation has ended. Use your actual schedule and available materials; the tool's suggested timetable is a draft, not a command. Keep the review manageable and connect it with the same learning target. If you forget a step, inspect the gap and practise again. The goal is a routine you can maintain and evaluate, rather than an elaborate calendar that looks impressive but is never followed."
      ],
      [
        "Judge the session by your own performance",
        "At the end, state what you can now do, what still needs work, and what the next useful practice task will be. Count completed generated pages only if they correspond to the target. A session with one resolved misconception may be more useful than a folder of untested notes. Follow the assignment's rules on assistance, and keep independent assessed work within those boundaries. A study tool should support your effort and understanding rather than quietly replace the work you were meant to practise."
      ],
      [
        "Build a short practice session",
        "Choose one skill you need for tomorrow’s class. Make an independent attempt, ask for a hint on the step that blocked you, then solve a different example with the conversation closed. Write down the mistake you corrected. Return to a fresh example the next day and use that result to decide what to practise next."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Learning target",
        "text": "A specific idea or skill you intend to understand or perform."
      },
      {
        "title": "Focused feedback",
        "text": "A response about a particular gap in your attempt."
      },
      {
        "title": "Independent practice",
        "text": "Trying a suitable task without relying on a visible completed solution."
      }
    ],
    "routine": {
      "name": "Build a Study Routine with AI",
      "description": "Test your understanding after closing the tool. Use the checklist below on the example above.",
      "checklist": [
        "Set one target and try a suitable task.",
        "Identify a specific gap and seek permitted feedback.",
        "Revise and attempt a fresh example independently.",
        "Review later and choose the next useful practice task."
      ]
    },
    "takeaway": "Use explanations and practice to strengthen what you can do independently.",
    "scenarios": [
      {
        "title": "Asking for a hint after an attempt",
        "situation": "You ask for a complete solution before trying a practice problem. What change better supports the learning goal?",
        "action": "Make an attempt, identify the gap, and request focused help.",
        "why": "An initial attempt gives feedback a specific connection to your reasoning."
      },
      {
        "title": "Using feedback about a denominator",
        "situation": "Feedback identifies the wrong denominator in your calculation. What should follow?",
        "action": "Explain the correct whole and redo the relevant step yourself.",
        "why": "A correction becomes useful when you understand and apply the changed reasoning."
      },
      {
        "title": "Solving a similar problem alone",
        "situation": "You can follow a solution while it is visible but fail on a similar new problem. What does that show?",
        "action": "Independent application still needs practice and focused support.",
        "why": "Recognition and successful independent performance are different checks."
      },
      {
        "title": "Adjusting an unrealistic study plan",
        "situation": "AI produces a daily plan longer than your available time. What is sensible?",
        "action": "Reduce and adapt it to real constraints and a clear target.",
        "why": "The plan should fit your circumstances rather than compete on its level of detail."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "You ask for a complete solution before trying a practice problem. What change better supports the learning goal?",
        "options": [
          "Collect as many finished solutions as possible.",
          "Make an attempt, identify the gap, and request focused help.",
          "Replace practice with reading polished answers."
        ],
        "correct": 1,
        "feedback": "An initial attempt gives feedback a specific connection to your reasoning."
      },
      {
        "type": "single",
        "question": "Feedback identifies the wrong denominator in your calculation. What should follow?",
        "options": [
          "Copy the final result without inspecting the denominator.",
          "Assume all future problems use the same whole.",
          "Explain the correct whole and redo the relevant step yourself."
        ],
        "correct": 2,
        "feedback": "A correction becomes useful when you understand and apply the changed reasoning."
      },
      {
        "type": "single",
        "question": "You can follow a solution while it is visible but fail on a similar new problem. What does that show?",
        "options": [
          "Independent application still needs practice and focused support.",
          "The learning target has definitely been mastered.",
          "The subject is impossible to learn."
        ],
        "correct": 0,
        "feedback": "Recognition and successful independent performance are different checks."
      },
      {
        "type": "single",
        "question": "AI produces a daily plan longer than your available time. What is sensible?",
        "options": [
          "Keep it unchanged and blame yourself for missing it.",
          "Reduce and adapt it to real constraints and a clear target.",
          "Ignore every learning target and follow the longest schedule."
        ],
        "correct": 1,
        "feedback": "The plan should fit your circumstances rather than compete on its level of detail."
      },
      {
        "type": "single",
        "question": "Which target is easiest to evaluate?",
        "options": [
          "Learn everything about mathematics.",
          "Generate many pages.",
          "Explain how to choose the whole in a percentage calculation."
        ],
        "correct": 2,
        "feedback": "A specific target gives the session an inspectable outcome."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Make an attempt, identify the gap, and request focused help.",
          "Explain the correct whole and redo the relevant step yourself.",
          "Copy the final result without inspecting the denominator.",
          "Replace practice with reading polished answers."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "An initial attempt gives feedback a specific connection to your reasoning. A correction becomes useful when you understand and apply the changed reasoning."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Learning target",
          "Focused feedback",
          "Independent practice"
        ],
        "options": [
          "A response about a particular gap in your attempt.",
          "Trying a suitable task without relying on a visible completed solution.",
          "A specific idea or skill you intend to understand or perform."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Learning target: A specific idea or skill you intend to understand or perform. Focused feedback: A response about a particular gap in your attempt. Independent practice: Trying a suitable task without relying on a visible completed solution."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Set one target and try a suitable task.",
          "Identify a specific gap and seek permitted feedback.",
          "Revise and attempt a fresh example independently.",
          "Review later and choose the next useful practice task."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Set one target and try a suitable task. Identify a specific gap and seek permitted feedback. Revise and attempt a fresh example independently. Review later and choose the next useful practice task."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "How should a feedback conflict be handled?",
        "options": [
          "Compare the actual reasoning with task instructions and suitable sources.",
          "Copy the shortest version without checking.",
          "Assume the tool outranks the teacher automatically."
        ],
        "correct": 0,
        "feedback": "Inspecting the difference is more useful than choosing by confidence or convenience."
      },
      {
        "type": "single",
        "question": "Why attempt a later short check?",
        "options": [
          "To prove that a timetable is decorative.",
          "To see whether you can still use the idea after the guided session.",
          "To avoid ever revisiting mistakes."
        ],
        "correct": 1,
        "feedback": "A later independent attempt provides another observation of what you can do."
      },
      {
        "type": "single",
        "question": "What is the best evidence that the session helped?",
        "options": [
          "The chat contains many messages.",
          "The notes use advanced vocabulary.",
          "You can perform the target task and explain the reasoning yourself."
        ],
        "correct": 2,
        "feedback": "The outcome should connect directly with the original learning target."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Keep it unchanged and blame yourself for missing it.",
          "Independent application still needs practice and focused support.",
          "The subject is impossible to learn.",
          "Reduce and adapt it to real constraints and a clear target."
        ],
        "correct": [
          1,
          3
        ],
        "feedback": "Recognition and successful independent performance are different checks. The plan should fit your circumstances rather than compete on its level of detail."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "You ask for a complete solution before trying a practice problem. What change better supports the learning goal?",
          "Feedback identifies the wrong denominator in your calculation. What should follow?",
          "You can follow a solution while it is visible but fail on a similar new problem. What does that show?"
        ],
        "options": [
          "Independent application still needs practice and focused support.",
          "Make an attempt, identify the gap, and request focused help.",
          "Explain the correct whole and redo the relevant step yourself."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. An initial attempt gives feedback a specific connection to your reasoning. A correction becomes useful when you understand and apply the changed reasoning. Recognition and successful independent performance are different checks."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Set one target and try a suitable task.",
          "Identify a specific gap and seek permitted feedback.",
          "Revise and attempt a fresh example independently.",
          "Review later and choose the next useful practice task."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Set one target and try a suitable task. Identify a specific gap and seek permitted feedback. Revise and attempt a fresh example independently. Review later and choose the next useful practice task."
      }
    ],
    "references": [
      "eef"
    ],
    "videoIds": []
  },
  "34": {
    "id": 34,
    "parentDomain": 7,
    "title": "Debug Code with Understanding",
    "tagline": "Use AI suggestions to investigate a bug and explain the fix.",
    "intro": "An AI suggestion can rewrite working code while missing the real problem. Describe the expected behavior and the failing steps, isolate a small example, and test a focused change you can explain.",
    "objectives": [
      "Explain reproduction and distinguish it from focused change.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Describe the behavior before asking for a fix",
        "Write what you expected, what actually happened, and the smallest input that reproduces the problem. A message such as my app is broken gives little basis for useful investigation. A better report might say that pressing a button does not update the displayed count, while a separate control still works. Keep the description tied to observable behavior. You can investigate a technical problem more effectively when the question names a concrete mismatch rather than requesting a complete rewrite."
      ],
      [
        "Prepare a small safe example",
        "Share only the relevant code and fictional values needed to demonstrate the issue. Remove passwords, access tokens, private records, and unrelated project files. A smaller example is easier for you to inspect and often makes the failing step clearer. Work in a disposable practice copy or an appropriate development environment. Do not run an unfamiliar command or replace a working project just because a generated answer presents the action confidently as a necessary repair."
      ],
      [
        "Read the proposed change before applying it",
        "Ask what the changed lines are meant to do and how they address the observed behavior. Compare the suggestion with the language or framework's actual documentation when needed. A tool can invent a function name, assume a different version, or remove a condition that the project needs. Understanding the change is part of the fix. If you cannot explain its effect, reduce it to a smaller experiment or ask a teacher or experienced developer for help."
      ],
      [
        "Change one relevant thing and test the result",
        "A focused change makes cause and effect easier to inspect. Repeat the original failing example and compare the observed result with your expected behavior. If the bug remains, keep the evidence instead of stacking unrelated edits until something appears to work. Check a nearby ordinary case as well, because a fix for an empty input might break a normal one. Testing should address the behavior that motivated the change and the realistic cases most likely to be affected."
      ],
      [
        "Inspect correctness beyond the absence of an error",
        "Code that runs without an exception can still calculate the wrong result, accept invalid input, or lose important data. Compare output with known examples and the task requirements. For a classroom counter, confirm that repeated clicks produce the expected sequence and that reset behaves as intended. Use simple observable checks you understand. A green message from a tool is not enough when the actual behavior still contradicts the purpose of the programme."
      ],
      [
        "Explain and preserve the useful change",
        "Record the original problem, the relevant cause you established, the change, and the checks you performed. Keep the scope narrow and preserve work you may need to recover through the project's normal versioning or backup process. Follow assignment rules about assistance and be able to explain the code you submit. The learning outcome is not only a working screen. It is the ability to investigate, test, and account for the repair rather than depend on an unexplained replacement every time a bug appears."
      ],
      [
        "Check a button that responds twice",
        "Suppose one click adds two items to a list. Reproduce the issue with one button and one list item. Inspect where click handlers are registered and change one relevant line only after you understand it. Test one click, two clicks, and a refresh. Explain which observation supports your fix before applying it to the full project."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Reproduction",
        "text": "A small set of steps and inputs that shows the observed problem."
      },
      {
        "title": "Focused change",
        "text": "An edit tied to a specific explanation of the failing behavior."
      },
      {
        "title": "Behavior check",
        "text": "A comparison between actual output and the result the task requires."
      }
    ],
    "routine": {
      "name": "Debug Code with Understanding",
      "description": "Reproduce the bug before asking for changes. Use the checklist below on the example above.",
      "checklist": [
        "Describe expected and actual behavior with a small reproduction.",
        "Inspect a safe relevant example and understand the proposed edit.",
        "Make a focused change and check affected cases.",
        "Explain the result and preserve the useful repair."
      ]
    },
    "takeaway": "Use AI suggestions to investigate a bug and explain the fix.",
    "scenarios": [
      {
        "title": "Diagnosing a button that does nothing",
        "situation": "A button does nothing, and AI suggests replacing the whole project. What is a useful first move?",
        "action": "Describe the failing steps and inspect a small relevant example before making broad changes.",
        "why": "A focused reproduction provides a clearer basis for understanding and repairing the actual issue."
      },
      {
        "title": "An access token in suggested code",
        "situation": "A suggested fix includes your real access token in shared code. What must happen?",
        "action": "Remove secrets and use a suitable minimal practice example.",
        "why": "Debugging does not require exposing account credentials or unrelated records."
      },
      {
        "title": "A function runs but returns a wrong total",
        "situation": "A changed function runs but produces the wrong total. Is the bug resolved?",
        "action": "No; compare the output with the required behavior and known examples.",
        "why": "Successful execution does not establish correct meaning or output."
      },
      {
        "title": "An edge-case fix breaks normal input",
        "situation": "A fix handles empty input but breaks a normal input. What should you do?",
        "action": "Investigate and revise the change using both relevant cases.",
        "why": "A repair should address the original failure while preserving nearby required behavior."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A button does nothing, and AI suggests replacing the whole project. What is a useful first move?",
        "options": [
          "Describe the failing steps and inspect a small relevant example before making broad changes.",
          "Replace everything without reading the result.",
          "Hide the button so the symptom disappears."
        ],
        "correct": 0,
        "feedback": "A focused reproduction provides a clearer basis for understanding and repairing the actual issue."
      },
      {
        "type": "single",
        "question": "A suggested fix includes your real access token in shared code. What must happen?",
        "options": [
          "Paste all credentials for better context.",
          "Remove secrets and use a suitable minimal practice example.",
          "Assume code files never contain private information."
        ],
        "correct": 1,
        "feedback": "Debugging does not require exposing account credentials or unrelated records."
      },
      {
        "type": "single",
        "question": "A changed function runs but produces the wrong total. Is the bug resolved?",
        "options": [
          "Yes, because there is no error message.",
          "Yes, if the generated explanation sounds convincing.",
          "No; compare the output with the required behavior and known examples."
        ],
        "correct": 2,
        "feedback": "Successful execution does not establish correct meaning or output."
      },
      {
        "type": "single",
        "question": "A fix handles empty input but breaks a normal input. What should you do?",
        "options": [
          "Investigate and revise the change using both relevant cases.",
          "Ignore the normal case.",
          "Delete evidence of the new problem."
        ],
        "correct": 0,
        "feedback": "A repair should address the original failure while preserving nearby required behavior."
      },
      {
        "type": "single",
        "question": "What belongs in a useful bug report?",
        "options": [
          "Only the phrase fix everything.",
          "Expected behavior, actual behavior, and reproducing steps.",
          "Only a screenshot of the desktop wallpaper."
        ],
        "correct": 1,
        "feedback": "Concrete observations make it possible to test an explanation of the bug."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Describe the failing steps and inspect a small relevant example before making broad changes.",
          "Remove secrets and use a suitable minimal practice example.",
          "Hide the button so the symptom disappears.",
          "Paste all credentials for better context."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "A focused reproduction provides a clearer basis for understanding and repairing the actual issue. Debugging does not require exposing account credentials or unrelated records."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Reproduction",
          "Focused change",
          "Behavior check"
        ],
        "options": [
          "An edit tied to a specific explanation of the failing behavior.",
          "A comparison between actual output and the result the task requires.",
          "A small set of steps and inputs that shows the observed problem."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Reproduction: A small set of steps and inputs that shows the observed problem. Focused change: An edit tied to a specific explanation of the failing behavior. Behavior check: A comparison between actual output and the result the task requires."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Describe expected and actual behavior with a small reproduction.",
          "Inspect a safe relevant example and understand the proposed edit.",
          "Make a focused change and check affected cases.",
          "Explain the result and preserve the useful repair."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Describe expected and actual behavior with a small reproduction. Inspect a safe relevant example and understand the proposed edit. Make a focused change and check affected cases. Explain the result and preserve the useful repair."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "An unfamiliar command appears in a generated answer. What should guide the next step?",
        "options": [
          "Run it immediately because it is formatted as code.",
          "Assume all commands are reversible.",
          "Understand its effect and use an appropriate safe development process before running it."
        ],
        "correct": 2,
        "feedback": "The effect and scope of an action matter more than its confident presentation."
      },
      {
        "type": "single",
        "question": "Why make a focused edit?",
        "options": [
          "It makes the connection between the change and the observed behavior easier to inspect.",
          "It guarantees every bug disappears.",
          "It removes the need to understand the code."
        ],
        "correct": 0,
        "feedback": "A narrow change helps investigation without replacing the requirement to check results."
      },
      {
        "type": "single",
        "question": "What shows ownership of an AI-supported fix?",
        "options": [
          "Only that the screen loads once.",
          "You can explain the relevant change and the checks that establish its behavior.",
          "Only that the code is longer."
        ],
        "correct": 1,
        "feedback": "Understanding and evidence connect a repair with the problem it actually solves."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "Investigate and revise the change using both relevant cases.",
          "Ignore the normal case.",
          "No; compare the output with the required behavior and known examples.",
          "Yes, if the generated explanation sounds convincing."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "Successful execution does not establish correct meaning or output. A repair should address the original failure while preserving nearby required behavior."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A button does nothing, and AI suggests replacing the whole project. What is a useful first move?",
          "A suggested fix includes your real access token in shared code. What must happen?",
          "A changed function runs but produces the wrong total. Is the bug resolved?"
        ],
        "options": [
          "No; compare the output with the required behavior and known examples.",
          "Describe the failing steps and inspect a small relevant example before making broad changes.",
          "Remove secrets and use a suitable minimal practice example."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. A focused reproduction provides a clearer basis for understanding and repairing the actual issue. Debugging does not require exposing account credentials or unrelated records. Successful execution does not establish correct meaning or output."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Describe expected and actual behavior with a small reproduction.",
          "Inspect a safe relevant example and understand the proposed edit.",
          "Make a focused change and check affected cases.",
          "Explain the result and preserve the useful repair."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Describe expected and actual behavior with a small reproduction. Inspect a safe relevant example and understand the proposed edit. Make a focused change and check affected cases. Explain the result and preserve the useful repair."
      }
    ],
    "references": [
      "debug"
    ],
    "videoIds": []
  },
  "35": {
    "id": 35,
    "parentDomain": 7,
    "title": "Solve Problems Without Overreliance",
    "tagline": "Know when AI helps, when to step back, and how to finish with your own reasoning.",
    "intro": "A problem can get harder to finish when every step turns into another request for AI feedback. Make an initial attempt, choose a limited kind of assistance, and finish using criteria you can check yourself.",
    "objectives": [
      "Explain success criterion and distinguish it from bounded assistance.",
      "Apply a suitable routine to a realistic situation and describe what needs checking.",
      "Evaluate alternatives, explain the limits, and justify your final response."
    ],
    "parts": [
      [
        "Define the problem in your own words",
        "Before opening a tool, state what needs to change and what a successful result would look like. Separate the problem from the first solution that comes to mind. A group struggling to coordinate may need clear responsibilities rather than another generated schedule. A learner who cannot start a paragraph may need a main idea rather than a complete replacement essay. Defining the problem helps you choose the kind of support that serves the goal instead of collecting output without a direction."
      ],
      [
        "Make an initial attempt you can inspect",
        "Try a small part of the task yourself. Write a rough outline, solve the first step, or list the options and constraints you already know. The attempt does not need to be polished. It gives you a point of comparison and reveals what kind of assistance would add value. Without an attempt, it can be difficult to tell whether the generated result changed your understanding or merely replaced the work you were supposed to practise."
      ],
      [
        "Choose a bounded role for assistance",
        "Ask for a hint, critique, comparison, or alternative only where it addresses the gap you identified. State the task's rules and your intended boundary, then inspect whether the output respects them. A tool producing a full solution does not require you to use it. Keep the decision with yourself and the people responsible for the task. Bounded assistance can make a difficult step more manageable without turning every next action into another request for approval from a chatbot."
      ],
      [
        "Watch for signs of unhelpful dependence",
        "Notice whether you keep asking for confirmation after you already have suitable evidence, whether you can no longer explain a revision, or whether you avoid starting without a generated answer. These are useful prompts to change the routine rather than personal labels. Pause the conversation and attempt a manageable part independently. You can use a textbook, teacher, classmate, or checklist when that better serves the task. The aim is effective support with growing understanding, not a rule that you must always use or always avoid AI."
      ],
      [
        "Evaluate the solution against real criteria",
        "Compare the proposed result with the conditions you defined: accuracy, feasibility, task rules, relevant people, and available resources. Try a small example or inspect the support where possible. Do not confuse a confident recommendation with a tested solution. If a proposal fails a condition, revise the plan or choose another route. The result should solve the stated problem under actual circumstances rather than simply answer the wording of a prompt in an attractive format."
      ],
      [
        "Finish and reflect without another endless loop",
        "When the criteria are met and the required checks are complete, state the result and stop generating alternatives without a reason. Explain what you contributed, what assistance added, and what you would do differently next time. If something remains unresolved, name the gap and the appropriate next step. Finishing with your own explanation keeps the process connected to responsibility and learning. It also helps you decide whether the same assistance is useful when a similar problem appears again."
      ],
      [
        "Turn a vague project concern into a next action",
        "A group keeps asking AI for new project plans while nobody owns the next task. Write down the immediate obstacle, assign one person and a deadline, and use AI only to compare two workable options if needed. At the next meeting, check whether the agreed action happened and decide what to adjust based on that evidence."
      ]
    ],
    "keyIdeas": [
      {
        "title": "Success criterion",
        "text": "A condition that a useful solution must meet."
      },
      {
        "title": "Bounded assistance",
        "text": "A specific support role that leaves appropriate thinking and responsibility with you."
      },
      {
        "title": "Independent explanation",
        "text": "An account of the solution and its reasons that you can give yourself."
      }
    ],
    "routine": {
      "name": "Solve Problems Without Overreliance",
      "description": "Decide when to step back. Use the checklist below on the example above.",
      "checklist": [
        "Define the problem and success criteria.",
        "Try a manageable part and identify the gap.",
        "Use bounded support and check the proposed result.",
        "Explain the solution, finish, and reflect on the assistance."
      ]
    },
    "takeaway": "Know when AI helps, when to step back, and how to finish with your own reasoning.",
    "scenarios": [
      {
        "title": "A schedule without assigned roles",
        "situation": "A group keeps generating schedules but has not agreed on responsibilities. What should change?",
        "action": "Define the coordination problem and assign clear responsibilities before generating another plan.",
        "why": "More output does not solve a gap that has not been identified correctly."
      },
      {
        "title": "A paragraph you cannot explain",
        "situation": "You can no longer explain revisions to your own paragraph. What is a useful response?",
        "action": "Pause and rebuild an explanation you understand using permitted support.",
        "why": "The gap signals a need to reconnect assistance with your own reasoning."
      },
      {
        "title": "A proposal the group cannot carry out",
        "situation": "A proposal sounds good but needs unavailable materials. What should guide the choice?",
        "action": "The real success criteria and constraints.",
        "why": "A result must be feasible in the actual situation to solve the problem."
      },
      {
        "title": "Stopping when the work meets the criteria",
        "situation": "The task meets the criteria and the needed checks are complete. What should happen?",
        "action": "Explain the result and finish instead of generating alternatives without a new reason.",
        "why": "A clear endpoint keeps tool use tied to the goal."
      }
    ],
    "quiz": [
      {
        "type": "single",
        "question": "A group keeps generating schedules but has not agreed on responsibilities. What should change?",
        "options": [
          "Generate a longer schedule.",
          "Let a chatbot privately decide each person's commitment.",
          "Define the coordination problem and assign clear responsibilities before generating another plan."
        ],
        "correct": 2,
        "feedback": "More output does not solve a gap that has not been identified correctly."
      },
      {
        "type": "single",
        "question": "You can no longer explain revisions to your own paragraph. What is a useful response?",
        "options": [
          "Pause and rebuild an explanation you understand using permitted support.",
          "Submit because the wording is professional.",
          "Ask for another rewrite without reading it."
        ],
        "correct": 0,
        "feedback": "The gap signals a need to reconnect assistance with your own reasoning."
      },
      {
        "type": "single",
        "question": "A proposal sounds good but needs unavailable materials. What should guide the choice?",
        "options": [
          "The proposal's confident tone.",
          "The real success criteria and constraints.",
          "The fact that it was the first suggestion."
        ],
        "correct": 1,
        "feedback": "A result must be feasible in the actual situation to solve the problem."
      },
      {
        "type": "single",
        "question": "The task meets the criteria and the needed checks are complete. What should happen?",
        "options": [
          "Keep requesting reassurance indefinitely.",
          "Assume more messages always improve the solution.",
          "Explain the result and finish instead of generating alternatives without a new reason."
        ],
        "correct": 2,
        "feedback": "A clear endpoint keeps tool use tied to the goal."
      },
      {
        "type": "single",
        "question": "Which question should precede choosing an AI role?",
        "options": [
          "What gap in my own attempt needs help?",
          "How can I avoid understanding the task?",
          "How many outputs can I collect?"
        ],
        "correct": 0,
        "feedback": "A defined gap connects assistance to an actual learning or problem-solving need."
      },
      {
        "type": "multi",
        "question": "Which TWO actions apply this lesson responsibly?",
        "options": [
          "Pause and rebuild an explanation you understand using permitted support.",
          "Define the coordination problem and assign clear responsibilities before generating another plan.",
          "Submit because the wording is professional.",
          "Let a chatbot privately decide each person's commitment."
        ],
        "correct": [
          0,
          1
        ],
        "feedback": "More output does not solve a gap that has not been identified correctly. The gap signals a need to reconnect assistance with your own reasoning."
      },
      {
        "type": "match",
        "question": "Match each idea with its meaning in this topic.",
        "pairs": [
          "Success criterion",
          "Bounded assistance",
          "Independent explanation"
        ],
        "options": [
          "A specific support role that leaves appropriate thinking and responsibility with you.",
          "An account of the solution and its reasons that you can give yourself.",
          "A condition that a useful solution must meet."
        ],
        "correct": [
          2,
          0,
          1
        ],
        "feedback": "The terms distinguish different parts of a decision. Success criterion: A condition that a useful solution must meet. Bounded assistance: A specific support role that leaves appropriate thinking and responsibility with you. Independent explanation: An account of the solution and its reasons that you can give yourself."
      },
      {
        "type": "order",
        "question": "Put the practical routine for this topic in a useful order.",
        "items": [
          "Define the problem and success criteria.",
          "Try a manageable part and identify the gap.",
          "Use bounded support and check the proposed result.",
          "Explain the solution, finish, and reflect on the assistance."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Each step prepares information needed by the next. Define the problem and success criteria. Try a manageable part and identify the gap. Use bounded support and check the proposed result. Explain the solution, finish, and reflect on the assistance."
      }
    ],
    "assessment": [
      {
        "type": "single",
        "question": "A tool provides a complete answer when you asked for a hint. What is responsible?",
        "options": [
          "Submit the full answer automatically.",
          "Use only assistance that fits the task and continue the appropriate work yourself.",
          "Rename the full answer a hint."
        ],
        "correct": 1,
        "feedback": "The output does not change your boundary or the assignment's requirements."
      },
      {
        "type": "single",
        "question": "Why try a small independent part after assistance?",
        "options": [
          "To avoid evaluating the support.",
          "To prove that no help was ever used.",
          "To see whether you can use the reasoning yourself."
        ],
        "correct": 2,
        "feedback": "Independent use makes the effect of assistance more visible."
      },
      {
        "type": "single",
        "question": "What belongs in a short final reflection?",
        "options": [
          "Your contribution, the value of assistance, and any remaining gap.",
          "Only praise for the tool.",
          "A claim that the tool owns all responsibility."
        ],
        "correct": 0,
        "feedback": "Reflection connects the outcome with decisions you can repeat or improve next time."
      },
      {
        "type": "multi",
        "question": "In a new task, which TWO responses follow the lesson’s decision process?",
        "options": [
          "The real success criteria and constraints.",
          "The fact that it was the first suggestion.",
          "Explain the result and finish instead of generating alternatives without a new reason.",
          "Keep requesting reassurance indefinitely."
        ],
        "correct": [
          0,
          2
        ],
        "feedback": "A result must be feasible in the actual situation to solve the problem. A clear endpoint keeps tool use tied to the goal."
      },
      {
        "type": "match",
        "question": "Match each situation with its most appropriate response.",
        "pairs": [
          "A group keeps generating schedules but has not agreed on responsibilities. What should change?",
          "You can no longer explain revisions to your own paragraph. What is a useful response?",
          "A proposal sounds good but needs unavailable materials. What should guide the choice?"
        ],
        "options": [
          "The real success criteria and constraints.",
          "Define the coordination problem and assign clear responsibilities before generating another plan.",
          "Pause and rebuild an explanation you understand using permitted support."
        ],
        "correct": [
          1,
          2,
          0
        ],
        "feedback": "Match the response to what is uncertain or required in each situation. More output does not solve a gap that has not been identified correctly. The gap signals a need to reconnect assistance with your own reasoning. A result must be feasible in the actual situation to solve the problem."
      },
      {
        "type": "order",
        "question": "You need to apply this topic in a fresh task. Arrange the checks before the final decision.",
        "items": [
          "Define the problem and success criteria.",
          "Try a manageable part and identify the gap.",
          "Use bounded support and check the proposed result.",
          "Explain the solution, finish, and reflect on the assistance."
        ],
        "correct": [
          0,
          1,
          2,
          3
        ],
        "feedback": "Use the routine with the conditions of the new task, rather than treating a generated suggestion as the final authority. Define the problem and success criteria. Try a manageable part and identify the gap. Use bounded support and check the proposed result. Explain the solution, finish, and reflect on the assistance."
      }
    ],
    "references": [
      "eef",
      "guidance",
      "students"
    ],
    "videoIds": []
  }
});
