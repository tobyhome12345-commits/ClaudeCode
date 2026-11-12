/* ==========================================================================
   app.js — pages, routing and the practice engine.

   Routes (hash based, so it works by just opening index.html):
     #/                         home (subject cards)
     #/maths                    topic list for a subject
     #/maths/fractions          lesson page
     #/maths/fractions/practice practice questions
   ========================================================================== */
(function () {
  'use strict';

  const app = document.getElementById('app');
  const { fmt } = Visuals;

  /* ---------- Small helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  /* Encouraging messages — add more to any list for extra variety! */
  const MSG = {
    greet: ['Hey there, superstar! 👋', 'Welcome back, champ! 🌟', 'Ready to learn something awesome? 🚀', 'Hi! Let\'s grow some brain muscles 💪'],
    right: ['Nailed it! 🎉', 'Brilliant! ⭐', 'Yes! You\'re on a roll! 🚀', 'Spot on! 👏', 'Super smart! 🧠', 'Boom! Correct! 💥', 'Awesome work! 🌈'],
    rightAfterHint: ['You got it! Fixing a mistake is how brains grow 🌱', 'Yes! Great job sticking with it 💪', 'That\'s the one! Persistence pays off ⭐'],
    retry: ['Not quite — but you\'re close! 💡', 'Oops, nearly! Have a look at this hint 💡', 'Good try! Let\'s fix it together 🔧'],
    solution: ['No worries — this one\'s a tricky one! Let\'s walk through it together 🤝', 'That\'s okay! Even maths whizzes need a worked example sometimes 📝'],
    streak: { 3: '3 in a row — hat trick! 🎩', 5: '5 in a row — you\'re on FIRE! 🔥', 8: '8 in a row — unstoppable! 🚀', 10: '10 in a row — legend! 👑' },
    home: ['Pick a subject to get started — every question you answer makes you smarter. 🧠', 'Small steps every day add up to big wins. 🏆'],
  };

  /* ---------- Stars / progress snippets ---------- */
  function starsHtml(n, max = 3) {
    let out = '';
    for (let i = 1; i <= max; i++) out += `<span class="${i <= n ? 'on' : ''}">★</span>`;
    return `<span class="stars" role="img" aria-label="${n} out of ${max} stars">${out}</span>`;
  }

  function progressBar(pct) {
    return `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>`;
  }

  /* ---------- Pop-ups ---------- */
  function toast(html) {
    const wrap = document.getElementById('toasts');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = html;
    wrap.appendChild(el);
    setTimeout(() => el.classList.add('out'), 3600);
    setTimeout(() => el.remove(), 4100);
  }

  function confetti() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = document.getElementById('confetti');
    const colours = ['#ff7a9c', '#ffa24c', '#f7c948', '#3cc38a', '#2bb5c9', '#5b8def', '#9b7bf0'];
    for (let i = 0; i < 30; i++) {
      const bit = document.createElement('i');
      bit.style.background = pick(colours);
      bit.style.setProperty('--dx', `${Math.round((Math.random() - 0.5) * 520)}px`);
      bit.style.setProperty('--rot', `${Math.round((Math.random() - 0.5) * 900)}deg`);
      layer.appendChild(bit);
      setTimeout(() => bit.remove(), 1300);
    }
  }

  /* ======================================================================
     ROUTER
     ====================================================================== */
  function route() {
    const [sid, tid, mode] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (!sid) return renderHome();
    const subject = StudyData.subject(sid);
    if (!subject || !subject.live) return renderNotFound();
    if (!tid) return renderSubject(subject);
    const topic = StudyData.topic(sid, tid);
    if (!topic) return renderNotFound();
    if (mode === 'practice') return renderPractice(subject, topic);
    return renderTopic(subject, topic);
  }

  function renderNotFound() {
    document.title = 'Oops! — Study Hub';
    app.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:3rem">🧭</div><h1>Hmm, we got lost!</h1>
      <p>That page doesn't exist (yet).</p><a class="btn" href="#/">Take me home</a></div>`;
  }

  /* ======================================================================
     HOME
     ====================================================================== */
  function renderHome() {
    document.title = 'Study Hub';
    const o = Progress.overall();
    const earned = Badges.all.filter((b) => Store.hasBadge(b.id));

    const subjectCards = StudyData.subjects().map((s) => {
      const style = `--accent:${s.colour}`;
      if (!s.live) {
        return `<div class="card soon" style="${style}" aria-disabled="true">
          <div class="emoji-bubble">${s.emoji}</div><h3>${esc(s.title)}</h3>
          <p>${esc(s.blurb)}</p><span class="pill">🚧 Coming soon</span></div>`;
      }
      const p = Progress.subject(s.id);
      return `<a class="card link" href="#/${s.id}" style="${style}">
        <div class="emoji-bubble">${s.emoji}</div><h3>${esc(s.title)}</h3><p>${esc(s.blurb)}</p>
        ${progressBar(p.pct)}
        <div class="progress-note"><span>${p.finished} of ${p.topics} topics finished</span><span>⭐ ${p.stars}/${p.maxStars}</span></div></a>`;
    }).join('');

    const badgeCards = Badges.all.map((b) => {
      const got = Store.hasBadge(b.id);
      return `<div class="badge ${got ? '' : 'locked'}"><span class="ico">${got ? b.emoji : '🔒'}</span>
        <span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small></span></div>`;
    }).join('');

    app.innerHTML = `
      <div class="hero"><h1>${pick(MSG.greet)}</h1><p>${pick(MSG.home)}</p></div>
      <div class="stats">
        <div class="stat"><b>⭐ ${o.stars}</b><span>stars earned</span></div>
        <div class="stat"><b>✅ ${o.done}</b><span>questions conquered</span></div>
        <div class="stat"><b>🔥 ${o.bestStreak}</b><span>best streak</span></div>
        <div class="stat"><b>🏅 ${earned.length}/${Badges.all.length}</b><span>badges</span></div>
      </div>
      <h2>📚 Your subjects</h2>
      <div class="grid">${subjectCards}</div>
      <section class="block"><h2>🏅 Badges</h2><div class="badges">${badgeCards}</div></section>
      <div class="footer"><button class="btn danger-link" id="reset" type="button">Reset my progress</button></div>`;

    document.getElementById('reset').addEventListener('click', () => {
      if (confirm('Start fresh? This will erase all your stars and badges on this device.')) {
        Store.reset();
        renderHome();
      }
    });
  }

  /* ======================================================================
     SUBJECT (list of topics)
     ====================================================================== */
  function renderSubject(subject) {
    document.title = `${subject.title} — Study Hub`;
    const sum = Progress.subject(subject.id);
    const cards = StudyData.topics(subject.id).map((t) => {
      const p = Progress.topic(subject.id, t);
      return `<a class="card link" href="#/${subject.id}/${t.id}" style="--accent:${t.colour}">
        <div class="emoji-bubble">${t.emoji}</div><h3>${esc(t.title)}</h3><p>${esc(t.blurb)}</p>
        ${progressBar(p.pct)}
        <div class="progress-note"><span>${p.done}/${p.total} questions</span>${starsHtml(p.stars)}</div></a>`;
    }).join('');

    app.innerHTML = `
      <a class="back" href="#/">← All subjects</a>
      <div class="topic-head" style="--accent:${subject.colour}">
        <div class="emoji-bubble">${subject.emoji}</div>
        <div><h1>${esc(subject.title)}</h1><p>${esc(subject.blurb)}</p></div>
      </div>
      <div class="card" style="margin-bottom:22px;--accent:${subject.colour}">
        <strong>Your progress:</strong> ${sum.finished} of ${sum.topics} topics finished · ${sum.stars} of ${sum.maxStars} ⭐
        ${progressBar(sum.pct)}
      </div>
      <div class="grid">${cards}</div>`;
  }

  /* ======================================================================
     TOPIC LESSON
     ====================================================================== */
  function renderTopic(subject, topic) {
    document.title = `${topic.title} — Study Hub`;
    const p = Progress.topic(subject.id, topic);
    const practiceHref = `#/${subject.id}/${topic.id}/practice`;

    const examples = (topic.examples || []).map((ex, i) => `
      <article class="card example">
        <h3><span class="ex-num">${i + 1}</span><span>${fmt(ex.title)}</span></h3>
        ${ex.visual || ''}
        <ol class="steps">${ex.steps.map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>
        <p class="final">✅ ${fmt(ex.answer)}</p>
      </article>`).join('');

    const watch = (topic.watchOut || []).length ? `
      <section class="card watch lesson"><h2>⚠️ Watch out!</h2><ul>${topic.watchOut.map((w) => `<li>${fmt(w)}</li>`).join('')}</ul></section>` : '';

    const extras = (topic.extras || []).map((e) => `
      <details class="extra lesson"><summary>🚀 Bonus (optional): ${fmt(e.title)}</summary><div>${fmt(e.html)}</div></details>`).join('');

    app.innerHTML = `
      <div class="stack" style="--accent:${topic.colour}">
        <div>
          <a class="back" href="#/${subject.id}">← ${esc(subject.title)} topics</a>
          <div class="topic-head">
            <div class="emoji-bubble">${topic.emoji}</div>
            <div><h1>${esc(topic.title)}</h1>
              <p>${p.done}/${p.total} questions done · ${starsHtml(p.stars)}</p></div>
          </div>
          <a class="btn" href="${practiceHref}">Jump to practice →</a>
        </div>
        <section class="card big-idea lesson"><h2>🧠 The big idea</h2>${fmt(topic.explanation)}</section>
        <section><h2>👀 Worked examples</h2><div class="stack">${examples}</div></section>
        ${watch}
        ${extras}
        <section class="card cta">
          <h2>Ready to try some?</h2>
          <p>${topic.questions.length} questions, from easy to tricky. Wrong answers get a hint first — no stress! 😄</p>
          <a class="btn big" href="${practiceHref}">${p.done ? 'Practise again' : 'Start practice'} →</a>
        </section>
      </div>`;
  }

  /* ======================================================================
     PRACTICE
     One "session" = going through every question in the topic once.
       attempt 1 wrong -> show a hint, try again
       attempt 2 wrong (or "Show me how") -> show the full worked solution
     ====================================================================== */
  function renderPractice(subject, topic) {
    document.title = `Practice: ${topic.title} — Study Hub`;
    const qs = topic.questions;
    const S = { i: 0, attempts: 0, streak: 0, outcomes: [], newBadges: [] };
    const topicHref = `#/${subject.id}/${topic.id}`;

    /** Easy / medium / hard label by position in the list. */
    function level(i) {
      const f = i / qs.length;
      if (f < 1 / 3) return { cls: 'easy', label: '🟢 Warm-up' };
      if (f < 2 / 3) return { cls: 'medium', label: '🟡 Getting trickier' };
      return { cls: 'hard', label: '🔴 Challenge' };
    }

    function dots() {
      return qs.map((_, i) => {
        const o = S.outcomes[i];
        return `<span class="dot ${o || ''} ${i === S.i ? 'current' : ''}"></span>`;
      }).join('');
    }

    /* ---- Draw one question ---- */
    function drawQuestion() {
      const q = qs[S.i];
      const lv = level(S.i);
      S.attempts = 0;

      const answerHtml = q.type === 'mc'
        ? `<div class="choices">${q.options.map((o, i) =>
            `<button class="choice" type="button" data-i="${i}"><span class="letter">${'ABCD'[i]}</span><span>${fmt(o)}</span></button>`).join('')}</div>`
        : `<input class="answer-input" id="answer" type="text" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false"
             placeholder="${esc(q.placeholder || 'Type your answer')}" aria-label="Your answer">` +
          (q.inputNote ? `<p class="input-hint">${esc(q.inputNote)}</p>` : '');

      app.innerHTML = `
        <div class="stack" style="--accent:${topic.colour}">
          <div>
            <div class="practice-top">
              <a class="back" href="${topicHref}">← Back to lesson</a>
              <div class="streak" id="streak" title="Correct answers in a row">🔥 <span id="streakNum">${S.streak}</span> in a row</div>
            </div>
            <div class="dots" aria-hidden="true">${dots()}</div>
          </div>
          <section class="card q-card">
            <div class="q-meta"><span>${esc(topic.title)} · Question ${S.i + 1} of ${qs.length}</span><span class="level ${lv.cls}">${lv.label}</span></div>
            <div class="q-text">${fmt(q.text)}</div>
            ${q.visual || ''}
            <div class="answer-area">${answerHtml}</div>
            <div id="feedback" aria-live="polite"></div>
            <div class="actions" id="actions">${q.type === 'input' ? '<button class="btn" id="check" type="button">Check ✓</button>' : ''}</div>
          </section>
        </div>`;

      wireQuestion(q);
    }

    function wireQuestion(q) {
      if (q.type === 'mc') {
        app.querySelectorAll('.choice').forEach((btn) => btn.addEventListener('click', () => submit(Number(btn.dataset.i))));
      } else {
        const input = document.getElementById('answer');
        input.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter') return;
          // preventDefault stops this same keypress from also "clicking" the Next
          // button that receives focus after we submit.
          e.preventDefault();
          submit(input.value);
        });
        document.getElementById('check').addEventListener('click', () => submit(input.value));
        input.focus();
      }
    }

    /** Put feedback on screen and make sure a phone user can see it. */
    function showFeedback(html) {
      const box = document.getElementById('feedback');
      box.innerHTML = html;
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ---- Handle an answer ---- */
    function submit(raw) {
      const q = qs[S.i];
      if (q.type === 'input' && String(raw).trim() === '') {
        const input = document.getElementById('answer');
        input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake');
        input.focus();
        return;
      }
      Store.markStarted(subject.id, topic.id);
      S.attempts++;

      if (Answer.check(q, raw)) return onRight(q, raw);
      if (S.attempts === 1) return onWrongFirstTime(q, raw);
      return onGiveUp(q, raw);
    }

    function onRight(q, raw) {
      const outcome = S.attempts === 1 ? 'first' : 'hint';
      S.outcomes[S.i] = outcome;
      S.streak++;
      Store.updateBestStreak(S.streak);
      Store.recordResult(subject.id, topic.id, StudyData.questionId(topic, q, S.i), outcome);
      const fresh = Badges.check();
      S.newBadges.push(...fresh);

      lockQuestion(q, raw, true);
      const streakMsg = MSG.streak[S.streak];
      showFeedback(`<div class="feedback good">
        <div class="big">${outcome === 'first' ? pick(MSG.right) : pick(MSG.rightAfterHint)}</div>
        ${streakMsg ? `<p><strong>${streakMsg}</strong></p>` : `<p>🔥 Streak: <strong>${S.streak}</strong> in a row!</p>`}
      </div>`);
      bumpStreak();
      confetti();
      fresh.forEach((b) => toast(`${b.emoji} New badge: <b>${esc(b.name)}</b>!`));
      showNext();
    }

    function onWrongFirstTime(q, raw) {
      const specific = Answer.specificHint(q, raw);
      showFeedback(`<div class="feedback hint">
        <div class="big">${pick(MSG.retry)}</div>
        <p><strong>Hint:</strong> ${fmt(specific || q.hint)}</p>
        <p>Have another go! ✏️</p></div>`);

      const actions = document.getElementById('actions');
      if (q.type === 'mc') {
        // Grey out the wrong choice so they can pick another one.
        const bad = app.querySelector(`.choice[data-i="${raw}"]`);
        bad.classList.add('wrong'); bad.disabled = true;
        actions.innerHTML = '<button class="btn secondary" id="giveup" type="button">Show me how</button>';
      } else {
        const input = document.getElementById('answer');
        input.select();
        actions.insertAdjacentHTML('beforeend', '<button class="btn secondary" id="giveup" type="button">Show me how</button>');
      }
      document.getElementById('giveup').addEventListener('click', () => { S.attempts = 2; onGiveUp(q); });
    }

    function onGiveUp(q, raw) {
      S.outcomes[S.i] = 'missed';
      S.streak = 0;
      lockQuestion(q, raw, false);
      showFeedback(`<div class="feedback solution">
        <div class="big">${pick(MSG.solution)}</div>
        <ol class="steps">${q.solution.map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>
        <p class="final">✅ Answer: ${fmt(Answer.display(q))}</p>
        <p>You\'ll get another go at this one next time. Mistakes = learning! 🌱</p></div>`);
      document.getElementById('streakNum').textContent = '0';
      showNext();
    }

    /** Stop further answers and highlight the right choice. */
    function lockQuestion(q, raw, correct) {
      if (q.type === 'mc') {
        app.querySelectorAll('.choice').forEach((b) => { b.disabled = true; });
        app.querySelector(`.choice[data-i="${q.answer}"]`).classList.add('correct');
        if (!correct && Number.isInteger(raw)) app.querySelector(`.choice[data-i="${raw}"]`).classList.add('wrong');
      } else {
        const input = document.getElementById('answer');
        input.disabled = true;
        if (!correct) input.value = Answer.display(q);
      }
      document.querySelector('.dots').innerHTML = dots();
    }

    function bumpStreak() {
      document.getElementById('streakNum').textContent = S.streak;
      const el = document.getElementById('streak');
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    }

    function showNext() {
      const last = S.i === qs.length - 1;
      const actions = document.getElementById('actions');
      actions.innerHTML = `<button class="btn big" id="next" type="button">${last ? 'See my results 🎉' : 'Next question →'}</button>`;
      const next = document.getElementById('next');
      next.addEventListener('click', () => { if (last) drawResults(); else { S.i++; drawQuestion(); window.scrollTo(0, 0); } });
      setTimeout(() => next.focus(), 0);
    }

    /* ---- Results screen ---- */
    function drawResults() {
      const total = qs.length;
      const first = S.outcomes.filter((o) => o === 'first').length;
      const hint = S.outcomes.filter((o) => o === 'hint').length;
      const missed = S.outcomes.filter((o) => o === 'missed').length;
      const p = Progress.topic(subject.id, topic);
      const ratio = first / total;

      const headline = ratio >= 0.9 ? 'Absolutely brilliant! 🏆' : ratio >= 0.6 ? 'Great work! 🌟' : ratio >= 0.3 ? 'Nice effort — you\'re improving! 💪' : 'Thanks for sticking with it! 🌱';
      const sub = missed === 0
        ? 'Every question done — you really know your stuff!'
        : `Read back over the lesson and have another go at the ${missed} tricky one${missed > 1 ? 's' : ''} — you\'ll get there!`;

      const topics = StudyData.topics(subject.id);
      const nextTopic = topics[topics.findIndex((t) => t.id === topic.id) + 1];
      const badgeHtml = S.newBadges.length
        ? `<p><strong>New badges:</strong> ${S.newBadges.map((b) => `${b.emoji} ${esc(b.name)}`).join(' · ')}</p>` : '';

      app.innerHTML = `
        <div class="card results" style="--accent:${topic.colour}">
          <div class="trophy">${ratio >= 0.6 ? '🏆' : '🌟'}</div>
          <h1>${headline}</h1>
          <p>${sub}</p>
          <div>${starsHtml(p.stars)}</div>
          <p class="input-hint">${p.stars === 3 ? 'Full stars on this topic!' : 'Finish every question for 2 ⭐. Get 80%+ right first try for 3 ⭐.'}</p>
          <div class="score-row">
            <div class="score"><b>${first}</b><span>first try ✅</span></div>
            <div class="score"><b>${hint}</b><span>after a hint 💡</span></div>
            <div class="score"><b>${missed}</b><span>to revisit 🔁</span></div>
          </div>
          ${badgeHtml}
          <div class="actions">
            <a class="btn" href="${topicHref}/practice" id="again">Try again 🔄</a>
            <a class="btn secondary" href="${topicHref}">Review the lesson</a>
            ${nextTopic ? `<a class="btn secondary" href="#/${subject.id}/${nextTopic.id}">Next: ${esc(nextTopic.title)} →</a>` : `<a class="btn secondary" href="#/${subject.id}">All topics</a>`}
          </div>
        </div>`;
      confetti();
      // The "try again" link points at the current hash, so force a fresh session.
      document.getElementById('again').addEventListener('click', (e) => { e.preventDefault(); renderPractice(subject, topic); window.scrollTo(0, 0); });
    }

    drawQuestion();
  }

  /* ---------- Start ---------- */
  StudyData.validate();
  window.addEventListener('hashchange', route);
  route();
})();
