/* ==========================================================================
   subjects.js — the subject cards on the home page.

   To make a new subject LIVE:
     1. Create a folder  data/<subject-id>/  and add topic files (copy a Maths one).
     2. Set  live: true  below.
     3. Add the topic files as <script> tags in index.html.
   Cards with  live: false  show up as "Coming soon".
   ========================================================================== */
StudyData.addSubject({
  id: 'maths',
  title: 'Maths',
  emoji: '🧮',
  colour: '#5b8def',
  blurb: 'Fractions, algebra, negatives and more — with hints whenever you need them.',
  live: true,
});

StudyData.addSubject({
  id: 'science',
  title: 'Science',
  emoji: '🔬',
  colour: '#3cc38a',
  blurb: 'Experiments, living things, space and forces.',
  live: false,
});

StudyData.addSubject({
  id: 'english',
  title: 'English',
  emoji: '📖',
  colour: '#ff7a9c',
  blurb: 'Reading, writing, grammar and spelling.',
  live: false,
});

StudyData.addSubject({
  id: 'history',
  title: 'History',
  emoji: '🏺',
  colour: '#ffa24c',
  blurb: 'Ancient worlds, explorers and the stories of the past.',
  live: false,
});
