/* ==========================================================================
   badges.js — the little achievement badges.

   Each badge has a `test(ctx)` that looks at overall progress. To add a badge,
   just add another entry to the list. Earned badges are remembered in Store.
   ========================================================================== */
(function () {
  'use strict';

  const ALL = [
    { id: 'first-steps', emoji: '🌱', name: 'First Steps', desc: 'Answer your first question correctly',
      test: (c) => c.done >= 1 },
    { id: 'on-fire', emoji: '🔥', name: 'On Fire', desc: 'Get 5 answers right in a row',
      test: (c) => c.bestStreak >= 5 },
    { id: 'explorer', emoji: '🧭', name: 'Explorer', desc: 'Try practice in 3 different topics',
      test: (c) => c.started >= 3 },
    { id: 'topic-done', emoji: '🏁', name: 'Topic Finished', desc: 'Get every question right in one topic',
      test: (c) => c.finished >= 1 },
    { id: 'sharpshooter', emoji: '🎯', name: 'Sharpshooter', desc: 'Earn 3 stars on a topic',
      test: (c) => c.threeStar >= 1 },
    { id: 'champion', emoji: '👑', name: 'Super Scholar', desc: 'Earn 3 stars on every topic',
      test: (c) => c.topics > 0 && c.threeStar === c.topics },
  ];

  window.Badges = {
    all: ALL,

    /** Award any badges that have just been earned and return them (for a pop-up). */
    check() {
      const ctx = Progress.overall();
      const fresh = [];
      ALL.forEach((b) => {
        if (!Store.hasBadge(b.id) && b.test(ctx)) { Store.addBadge(b.id); fresh.push(b); }
      });
      return fresh;
    },
  };
})();
