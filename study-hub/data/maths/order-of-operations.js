/* Maths topic: Order of Operations — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'order-of-operations',
  title: 'Order of Operations',
  emoji: '🔢',
  colour: '#3cc38a',
  blurb: 'BODMAS: which part of a sum do you do first?',

  explanation: `
    <p>When a sum has lots of operations, we need rules so everyone gets the <em>same</em> answer. In Australia we use <span class="hl">BODMAS</span>:</p>
    <ol>
      <li><strong>B</strong>rackets – anything inside ( ) first</li>
      <li><strong>O</strong>rders – powers like 3² (that's 3 × 3 = 9)</li>
      <li><strong>D</strong>ivision and <strong>M</strong>ultiplication – together, working <strong>left to right</strong></li>
      <li><strong>A</strong>ddition and <strong>S</strong>ubtraction – together, working <strong>left to right</strong></li>
    </ol>
    <p>The easiest way to stay on track: <strong>rewrite the whole sum on every line</strong>, doing <em>just one step</em> each time and copying everything else down.</p>
    <p class="tip">💡 D and M are partners (same level), and so are A and S. Whichever comes first <em>from the left</em> goes first.</p>`,

  examples: [
    {
      title: 'Work out 2 + 3 × 4',
      steps: [
        'No brackets or powers. Multiplication comes before addition, so do 3 × 4 first.',
        'Rewrite: 2 + 12.',
        'Now add: 14.',
      ],
      answer: '2 + 3 × 4 = 14  (not 20!)',
    },
    {
      title: 'Work out (6 + 2) × 5 − 4',
      steps: [
        'Brackets first: 6 + 2 = 8. Rewrite: 8 × 5 − 4.',
        'Multiplication next: 8 × 5 = 40. Rewrite: 40 − 4.',
        'Finally subtract: 36.',
      ],
      answer: '(6 + 2) × 5 − 4 = 36',
    },
    {
      title: 'Work out 20 − 8 ÷ 4 + 3²',
      steps: [
        'Orders (powers) first: 3² = 9. Rewrite: 20 − 8 ÷ 4 + 9.',
        'Division next: 8 ÷ 4 = 2. Rewrite: 20 − 2 + 9.',
        'Add and subtract <strong>left to right</strong>: 20 − 2 = 18, then 18 + 9 = 27.',
      ],
      answer: '20 − 8 ÷ 4 + 3² = 27',
    },
  ],

  watchOut: [
    'Left to right matters! 12 ÷ 3 × 2 = 4 × 2 = <strong>8</strong>, not 12 ÷ 6 = 2.',
    'Likewise 10 − 4 + 3 = 6 + 3 = <strong>9</strong> (not 10 − 7).',
    '3² means 3 × 3 = 9, not 3 × 2 = 6.',
  ],

  extras: [
    {
      title: 'Brackets inside brackets',
      html: `<p>Work from the <strong>innermost</strong> brackets outward. For 2 × (3 + (4 − 1)): first 4 − 1 = 3, then 3 + 3 = 6, then 2 × 6 = 12.</p>`,
    },
  ],

  questions: [
    {
      type: 'input',
      text: 'Work out: 5 + 2 × 3',
      answer: '11',
      hint: 'Did you do 5 + 2 first? Multiplication comes <em>before</em> addition.',
      hintFor: { '21': 'Did you add 5 + 2 first? Multiplication comes <em>before</em> addition, so do 2 × 3 first.' },
      solution: ['Multiply first: 2 × 3 = 6.', 'Rewrite: 5 + 6.', 'Add: 11.'],
    },
    {
      type: 'mc',
      text: 'Work out: 10 − 4 + 3',
      options: ['3', '9', '6', '17'],
      answer: 1,
      hint: 'Subtraction and addition are partners. Work from left to right: do 10 − 4 first.',
      hintFor: { 0: 'Did you add 4 + 3 first? That is working right to left. Go left to right: 10 − 4, then + 3.' },
      solution: ['Left to right: 10 − 4 = 6.', 'Then 6 + 3 = 9.'],
    },
    {
      type: 'input',
      text: 'Work out: (3 + 4) × 2',
      answer: '14',
      hint: 'Brackets first! Work out what is inside them, then do the rest.',
      hintFor: { '11': 'It looks like you skipped the brackets. Do 3 + 4 first, since it is in brackets.' },
      solution: ['Brackets first: 3 + 4 = 7.', 'Rewrite: 7 × 2.', 'Multiply: 14.'],
    },
    {
      type: 'input',
      text: 'Work out: 18 ÷ 3 × 2',
      answer: '12',
      hint: '÷ and × are partners. Go from left to right: do 18 ÷ 3 first.',
      hintFor: { '3': 'You did 3 × 2 first. Division and multiplication go left to right, so do 18 ÷ 3 first.' },
      solution: ['Left to right: 18 ÷ 3 = 6.', 'Then 6 × 2 = 12.'],
    },
    {
      type: 'mc',
      text: 'Work out: 2 + 3²',
      options: ['25', '11', '8', '13'],
      answer: 1,
      hint: 'Powers come before addition. What is 3² (that is 3 × 3)?',
      hintFor: { 0: '25 would be (2 + 3)². Without brackets the power only belongs to the 3. Do 3² = 9 first.' },
      solution: ['Powers first: 3² = 3 × 3 = 9.', 'Rewrite: 2 + 9.', 'Add: 11.'],
    },
    {
      type: 'input',
      text: 'Work out: 24 − 6 × 3 + 2',
      answer: '8',
      hint: 'Multiplication first. Then go left to right with the subtracting and adding.',
      hintFor: { '56': 'Did you do 24 − 6 first? Multiplication comes first: 6 × 3.' },
      solution: ['Multiply first: 6 × 3 = 18.', 'Rewrite: 24 − 18 + 2.', 'Left to right: 24 − 18 = 6, then 6 + 2 = 8.'],
    },
    {
      type: 'input',
      text: 'Work out: 4 × (10 − 6) ÷ 2',
      answer: '8',
      hint: 'Brackets first. Then × and ÷ from left to right.',
      solution: ['Brackets: 10 − 6 = 4. Rewrite: 4 × 4 ÷ 2.', 'Left to right: 4 × 4 = 16.', 'Then 16 ÷ 2 = 8.'],
    },
    {
      type: 'mc',
      text: 'Which expression equals 20?',
      options: ['2 + 3 × 4', '(2 + 3) × 4', '2 + (3 × 4)', '2 × 3 + 4'],
      answer: 1,
      hint: 'Work each one out using BODMAS and see which gives 20. Brackets first, then multiplication.',
      solution: ['2 + 3 × 4 = 2 + 12 = 14', '(2 + 3) × 4 = 5 × 4 = 20 ✔', '2 + (3 × 4) = 2 + 12 = 14', '2 × 3 + 4 = 6 + 4 = 10'],
    },
    {
      type: 'input',
      text: 'Work out: 36 ÷ (2 + 4) + 5 × 2',
      answer: '16',
      hint: 'Brackets first. Then do the ÷ and × (left to right). Add last.',
      hintFor: { '28': 'Check the brackets: 2 + 4 = 6 has to be done first, so you work out 36 ÷ 6 (not 36 ÷ 2).' },
      solution: ['Brackets: 2 + 4 = 6. Rewrite: 36 ÷ 6 + 5 × 2.', 'Division and multiplication: 36 ÷ 6 = 6 and 5 × 2 = 10. Rewrite: 6 + 10.', 'Add: 16.'],
    },
    {
      type: 'input',
      text: 'Work out: 5 × 4 − 3² + 8 ÷ 2',
      answer: '15',
      hint: 'Order: powers first (3²), then × and ÷, then + and − from left to right.',
      hintFor: { '18': 'Careful: 3² means 3 × 3 = 9, not 3 × 2 = 6.' },
      solution: ['Power: 3² = 9. Rewrite: 5 × 4 − 9 + 8 ÷ 2.', 'Multiply and divide: 5 × 4 = 20 and 8 ÷ 2 = 4. Rewrite: 20 − 9 + 4.', 'Left to right: 20 − 9 = 11, then 11 + 4 = 15.'],
    },
  ],
});
