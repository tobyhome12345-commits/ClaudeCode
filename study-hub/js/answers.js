/* ==========================================================================
   answers.js — decides whether a typed answer is right.

   Students type things in lots of ways ("3/4", " 3 / 4 ", "50%", "x = 5",
   "28 cm²"), so both the typed answer and the stored answers are "cleaned"
   the same way before being compared.

   NOTE: fractions are compared as text on purpose, so "6/8" is NOT accepted
   when the answer is "3/4" (simplifying is the whole point!). Plain numbers
   are compared as numbers, so "0.50" matches "0.5".
   ========================================================================== */
(function () {
  'use strict';

  const NUMBER = /^-?(\d+\.?\d*|\.\d+)$/;
  const MIXED = /^-?\d+ \d+\/\d+$/; // e.g. "1 1/2" — the one case where a space matters

  function tidy(s) {
    return String(s).toLowerCase()
      .replace(/[−–—]/g, '-')     // fancy minus signs -> plain "-"
      .replace(/²/g, '2').replace(/³/g, '3')
      .replace(/[$,]/g, '')       // ignore $ signs and thousands commas
      .replace(/\s+/g, ' ').trim();
  }

  /** Clean an answer. `units` (string or array) are ignored if typed at the end. */
  function clean(raw, units) {
    let s = tidy(raw);
    s = s.replace(/^[a-z]\s*=\s*/, '');                       // "x = 5" -> "5"
    const list = [].concat(units || []).map(tidy).sort((a, b) => b.length - a.length);
    list.forEach((u) => { if (s.endsWith(u)) s = s.slice(0, -u.length).trim(); });
    s = s.replace(/%$/, '').replace(/\.$/, '').trim();        // "50%" -> "50"
    return MIXED.test(s) ? s : s.replace(/ /g, '');
  }

  function same(a, b) {
    if (a === b) return true;
    if (NUMBER.test(a) && NUMBER.test(b)) return Number(a) === Number(b);
    return false;
  }

  window.Answer = {
    /** Is `raw` (what the student gave) correct for question `q`? */
    check(q, raw) {
      if (q.type === 'mc') return raw === q.answer;
      const typed = clean(raw, q.unit);
      return [].concat(q.answer).some((a) => same(clean(a, q.unit), typed));
    },

    /** Look up a hint written for one specific wrong answer (see `hintFor` in the data files). */
    specificHint(q, raw) {
      if (!q.hintFor) return null;
      if (q.type === 'mc') return q.hintFor[raw] || null;
      const typed = clean(raw, q.unit);
      const key = Object.keys(q.hintFor).find((k) => same(clean(k, q.unit), typed));
      return key ? q.hintFor[key] : null;
    },

    /** The answer to show in a worked solution. */
    display(q) {
      if (q.display) return q.display;
      return q.type === 'mc' ? q.options[q.answer] : [].concat(q.answer)[0];
    },
  };
})();
