/* Maths topic: Algebra basics — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'algebra',
  title: 'Algebra Basics',
  emoji: '🔤',
  colour: '#9b7bf0',
  blurb: 'Letters that stand for numbers: substitute, simplify and solve simple equations.',

  explanation: `
    <p>In algebra, a <span class="hl">letter</span> (called a pronumeral or variable) stands for a number we don't know yet, or one that can change.</p>
    <ul>
      <li><strong>3x</strong> means 3 <em>times</em> x (there's a hidden × sign). If x = 4 then 3x = 12, <em>not</em> 34!</li>
      <li><strong>Like terms</strong> have the same letter, so you can add them: 3x + 2x = 5x. Think "3 apples + 2 apples = 5 apples".</li>
      <li>An <strong>equation</strong> is a balance. Whatever you do to one side, do to the other so it stays balanced.</li>
    </ul>
    ${Visuals.balance(Visuals.tiles({ x: 1, ones: 3 }), Visuals.tiles({ ones: 7 }))}
    <p>To solve an equation, <strong>undo</strong> what was done to x, using the opposite operation: + and − are opposites, × and ÷ are opposites.</p>
    <p class="tip">💡 Always check your answer by putting it back into the equation. If both sides match, you're right!</p>`,

  examples: [
    {
      title: 'Substitute: if x = 4, find 3x + 2',
      steps: [
        'Replace x with 4: 3 × 4 + 2.',
        'Multiplication comes first: 3 × 4 = 12.',
        'Then add: 12 + 2 = 14.',
      ],
      answer: 'When x = 4, 3x + 2 = 14',
    },
    {
      title: 'Simplify 4a + 3a + 2',
      steps: [
        'Spot the <strong>like terms</strong>: 4a and 3a both have the letter a.',
        'Add the numbers in front: 4 + 3 = 7, so 4a + 3a = 7a.',
        'The 2 is just a number (no letter), so it stays as it is.',
      ],
      answer: '4a + 3a + 2 = 7a + 2',
    },
    {
      title: 'Solve x + 5 = 12',
      visual: Visuals.balance(Visuals.tiles({ x: 1, ones: 5 }), Visuals.tiles({ ones: 12 })),
      steps: [
        'x has 5 added to it. The opposite of "+ 5" is "− 5".',
        'Take 5 from <strong>both</strong> sides to keep the balance: x + 5 − 5 = 12 − 5.',
        'So x = 7.',
        'Check: 7 + 5 = 12 ✔',
      ],
      answer: 'x = 7',
    },
    {
      title: 'Solve 2x + 3 = 11',
      steps: [
        'Work backwards. First undo the <strong>+ 3</strong> by subtracting 3 from both sides: 2x = 8.',
        'Now undo the <strong>× 2</strong> by dividing both sides by 2: x = 4.',
        'Check: 2 × 4 + 3 = 11 ✔',
      ],
      answer: 'x = 4',
    },
  ],

  watchOut: [
    'Only add <em>like</em> terms. 3a + 2 can\'t be turned into 5a, because the 2 has no letter.',
    '2x means 2 × x. Put the number in, don\'t write the digits side by side!',
    'Undo plus/minus <em>first</em>, then undo the multiplying/dividing.',
  ],

  extras: [
    {
      title: 'Guess and check',
      html: `<p>Stuck on an equation? Try a number! For 2x + 3 = 11, try x = 3: 2 × 3 + 3 = 9 (too small). Try x = 4: 11 ✔. It's slower than "undoing", but it's a great way to <em>check</em> your answer.</p>`,
    },
    {
      title: 'Number machines',
      html: `<p>2x + 3 is a machine: <strong>x → ×2 → +3 → answer</strong>. To solve 2x + 3 = 11, run the machine backwards starting at 11: −3 then ÷2. That's the same "undo" idea!</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'In algebra, what does <strong>5y</strong> mean?',
      options: ['5 + y', '5 × y', '5 and y written side by side, like 52', '5 to the power of y'],
      answer: 1,
      hint: 'When a number and a letter are written next to each other with no sign between them, there is a hidden operation. Which one?',
      solution: ['A number written right next to a letter means <strong>multiply</strong>.', 'So 5y means 5 × y.'],
    },
    {
      type: 'input',
      text: 'If a = 6, what is a + 9?',
      answer: '15',
      hint: 'Swap the letter for its number: 6 + 9.',
      solution: ['Replace a with 6: 6 + 9.', '6 + 9 = 15.'],
    },
    {
      type: 'input',
      text: 'If n = 3, what is 4n + 1?',
      answer: '13',
      hint: '4n means 4 × n. Put 3 in for n, then multiply before you add.',
      hintFor: {
        '43': '4n doesn\'t mean 4 and 3 side by side. It means 4 <em>times</em> 3.',
        '8': 'Did you do 4 + 3 + 1? Remember 4n means 4 <em>times</em> n.',
      },
      solution: ['Replace n with 3: 4 × 3 + 1.', 'Multiply first: 4 × 3 = 12.', 'Then add: 12 + 1 = 13.'],
    },
    {
      type: 'mc',
      text: 'Simplify: 3x + 2x',
      options: ['5x', '6x', '5x²', '5'],
      answer: 0,
      hint: 'These are like terms (both have x). Add the numbers in front and keep the letter. Think: 3 apples + 2 apples.',
      hintFor: { 1: 'It looks like you multiplied 3 × 2. For like terms we <em>add</em> the numbers: 3 + 2.', 2: 'Adding doesn\'t create a power. Keep the x as it is: 3x + 2x = (3 + 2)x.' },
      solution: ['3x + 2x are like terms.', 'Add the numbers in front: 3 + 2 = 5.', 'Keep the letter: 5x.'],
    },
    {
      type: 'input',
      text: 'Simplify: 5a + 2 + 3a',
      answer: ['8a+2', '2+8a'],
      inputNote: 'Example of how to type an answer: 4b+7',
      hint: 'Only join the terms that have the same letter. 5a and 3a are like terms. What happens to the lonely 2?',
      hintFor: { '10a': 'The 2 is just a number, not an "a", so it can\'t join the a-terms.', '10': 'The 2 is just a number, not an "a", so it can\'t join the a-terms.' },
      solution: ['Like terms: 5a and 3a. Add them: 5a + 3a = 8a.', 'The 2 has no letter, so it stays separate.', 'Answer: 8a + 2.'],
      display: '8a + 2',
    },
    {
      type: 'input',
      text: 'Solve: x + 7 = 15',
      answer: '8',
      hint: 'Do the opposite! The equation <em>adds</em> 7, so <em>subtract</em> 7 from both sides.',
      hintFor: { '22': 'You added 7, but we need to <em>undo</em> the + 7 with − 7.' },
      solution: ['Undo + 7 by subtracting 7 from both sides.', 'x = 15 − 7 = 8.', 'Check: 8 + 7 = 15 ✔'],
      display: 'x = 8',
    },
    {
      type: 'input',
      text: 'Solve: 3x = 18',
      answer: '6',
      hint: '3x means 3 × x. What is the opposite of × 3?',
      hintFor: { '54': 'That is 3 × 18. The opposite of "× 3" is "÷ 3".' },
      solution: ['3x means 3 × x. Undo × 3 by dividing both sides by 3.', 'x = 18 ÷ 3 = 6.', 'Check: 3 × 6 = 18 ✔'],
      display: 'x = 6',
    },
    {
      type: 'mc',
      text: 'Solve: x − 4 = 9',
      options: ['5', '13', '−5', '36'],
      answer: 1,
      hint: 'The equation subtracts 4. The opposite of subtracting is adding. Add 4 to both sides.',
      hintFor: { 0: '5 comes from 9 − 4. But we need to <em>undo</em> the − 4, so add 4.' },
      solution: ['Undo − 4 by adding 4 to both sides.', 'x = 9 + 4 = 13.', 'Check: 13 − 4 = 9 ✔'],
    },
    {
      type: 'input',
      text: 'Solve: 2x + 5 = 17',
      answer: '6',
      hint: 'Undo the + 5 first (subtract 5 from both sides). Then undo the × 2.',
      hintFor: { '8.5': 'You divided 17 by 2 first. Undo the + 5 <em>before</em> you undo the × 2.', '11': 'Check your steps: subtract 5 first, then divide by 2 (not the other way around).' },
      solution: ['Undo + 5: subtract 5 from both sides: 2x = 12.', 'Undo × 2: divide both sides by 2: x = 6.', 'Check: 2 × 6 + 5 = 17 ✔'],
      display: 'x = 6',
    },
    {
      type: 'input',
      text: 'I think of a number, double it, then add 4. The answer is 20. What was my number?',
      answer: '8',
      hint: 'Write it as an equation first: 2x + 4 = 20. Then undo the + 4, then the × 2.',
      hintFor: { '12': '12 is 20 − 4 − 4. Subtract 4 once (16), then undo the "double" by halving it.', '16': '16 is the number <em>after</em> taking away 4. Don\'t forget to undo the doubling too!' },
      solution: ['Equation: 2x + 4 = 20.', 'Subtract 4 from both sides: 2x = 16.', 'Divide both sides by 2: x = 8.', 'Check: 8 doubled is 16, plus 4 is 20 ✔'],
    },
  ],
});
