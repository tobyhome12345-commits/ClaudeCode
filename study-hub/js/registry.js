/* ==========================================================================
   registry.js — the tiny "database" of subjects and topics.

   Data files call StudyData.addSubject(...) and StudyData.addTopic(...) as
   they load, so the rest of the site never needs to know what content exists.
   ========================================================================== */
(function () {
  'use strict';

  const subjects = [];   // ordered list of subject objects
  const topics = {};     // subjectId -> ordered list of topic objects

  const StudyData = {
    /** Register a subject card, e.g. { id, title, emoji, colour, blurb, live } */
    addSubject(subject) {
      subjects.push(subject);
      topics[subject.id] = topics[subject.id] || [];
    },

    /** Register a topic (with explanation, examples and questions) under a subject. */
    addTopic(subjectId, topic) {
      (topics[subjectId] = topics[subjectId] || []).push(topic);
    },

    subjects: () => subjects,
    subject: (id) => subjects.find((s) => s.id === id),
    topics: (subjectId) => topics[subjectId] || [],
    topic: (subjectId, topicId) => (topics[subjectId] || []).find((t) => t.id === topicId),

    /** Stable id for a question: its own `id`, or topic id + position. */
    questionId: (topic, q, index) => q.id || `${topic.id}-${index}`,

    /**
     * Sanity-check content and warn in the browser console (F12) if a question
     * is set up wrongly. Handy when you add your own questions.
     */
    validate() {
      subjects.forEach((s) => {
        (topics[s.id] || []).forEach((t) => {
          (t.questions || []).forEach((q, i) => {
            const where = `${s.id}/${t.id} question ${i + 1}`;
            if (!q.text) console.warn(`${where}: missing "text"`);
            if (!q.hint) console.warn(`${where}: missing "hint"`);
            if (!q.solution || !q.solution.length) console.warn(`${where}: missing "solution" steps`);
            if (q.type === 'mc') {
              if (!Array.isArray(q.options) || q.options.length < 2) console.warn(`${where}: "options" needs 2+ items`);
              else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
                console.warn(`${where}: "answer" must be the index of the correct option`);
            } else if (q.type === 'input') {
              if (q.answer === undefined || q.answer === '') console.warn(`${where}: missing "answer"`);
            } else {
              console.warn(`${where}: "type" must be "mc" or "input"`);
            }
          });
        });
      });
    },
  };

  window.StudyData = StudyData;
})();
