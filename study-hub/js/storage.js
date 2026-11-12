/* ==========================================================================
   storage.js — saves progress in the browser (localStorage) and works out
   progress numbers (progress bar %, stars) for topics and subjects.

   Everything is wrapped in try/catch so the site still works if the browser
   blocks storage (e.g. some private-browsing modes) — progress just won't save.
   ========================================================================== */
(function () {
  'use strict';

  const KEY = 'studyhub.v1';
  const RANK = { hint: 1, first: 2 }; // better results replace worse ones, never the reverse

  function blank() {
    return { results: {}, started: {}, badges: {}, bestStreak: 0 };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(blank(), JSON.parse(raw));
    } catch (e) { /* ignore: fall back to a fresh state */ }
    return blank();
  }

  let state = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  const Store = {
    /** { questionId: 'first' | 'hint' } for one topic. */
    results(subjectId, topicId) {
      return state.results[`${subjectId}/${topicId}`] || {};
    },

    /** Save an outcome ('first' = right first try, 'hint' = right after a hint). */
    recordResult(subjectId, topicId, questionId, outcome) {
      const key = `${subjectId}/${topicId}`;
      const topic = (state.results[key] = state.results[key] || {});
      if ((RANK[outcome] || 0) > (RANK[topic[questionId]] || 0)) topic[questionId] = outcome;
      save();
    },

    markStarted(subjectId, topicId) {
      state.started[`${subjectId}/${topicId}`] = true;
      save();
    },
    startedCount: () => Object.keys(state.started).length,

    bestStreak: () => state.bestStreak,
    updateBestStreak(n) {
      if (n > state.bestStreak) { state.bestStreak = n; save(); }
    },

    hasBadge: (id) => !!state.badges[id],
    addBadge(id) { state.badges[id] = Date.now(); save(); },

    reset() { state = blank(); save(); },
  };

  /* ---- Progress maths --------------------------------------------------- */
  const Progress = {
    /**
     * Progress for one topic.
     *  - done:  questions answered correctly (first try OR after a hint)
     *  - first: questions answered correctly on the first try
     *  - stars: 1 = half done, 2 = all done, 3 = all done AND 80%+ first try
     */
    topic(subjectId, topic) {
      const qs = topic.questions || [];
      const res = Store.results(subjectId, topic.id);
      let done = 0, first = 0;
      qs.forEach((q, i) => {
        const r = res[StudyData.questionId(topic, q, i)];
        if (r) { done++; if (r === 'first') first++; }
      });
      const total = qs.length;
      let stars = 0;
      if (total) {
        if (done >= Math.ceil(total / 2)) stars = 1;
        if (done === total) stars = 2;
        if (done === total && first / total >= 0.8) stars = 3;
      }
      return { done, first, total, stars, pct: total ? Math.round((done / total) * 100) : 0 };
    },

    /** Totals across every topic in one subject. */
    subject(subjectId) {
      const topics = StudyData.topics(subjectId);
      const sum = { done: 0, total: 0, stars: 0, maxStars: topics.length * 3, topics: topics.length, finished: 0 };
      topics.forEach((t) => {
        const p = Progress.topic(subjectId, t);
        sum.done += p.done; sum.total += p.total; sum.stars += p.stars;
        if (p.total && p.done === p.total) sum.finished++;
      });
      sum.pct = sum.total ? Math.round((sum.done / sum.total) * 100) : 0;
      return sum;
    },

    /** Totals across every LIVE subject (used on the home page and for badges). */
    overall() {
      const out = { done: 0, stars: 0, maxStars: 0, topics: 0, finished: 0, threeStar: 0 };
      StudyData.subjects().filter((s) => s.live).forEach((s) => {
        const sum = Progress.subject(s.id);
        out.done += sum.done; out.stars += sum.stars; out.maxStars += sum.maxStars;
        out.topics += sum.topics; out.finished += sum.finished;
        StudyData.topics(s.id).forEach((t) => { if (Progress.topic(s.id, t).stars === 3) out.threeStar++; });
      });
      out.bestStreak = Store.bestStreak();
      out.started = Store.startedCount();
      return out;
    },
  };

  window.Store = Store;
  window.Progress = Progress;
})();
