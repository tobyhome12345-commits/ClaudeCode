/* ==========================================================================
   Maths topic: Fractions

   HOW TO ADD QUESTIONS — add an object to the `questions` list at the bottom.
     Multiple choice:  { type:'mc',    text, options:[...], answer: <index of right option>, hint, solution:[...] }
     Type-in:          { type:'input', text, answer: '3/4' (or ['3/4','0.75']), hint, solution:[...] }
   Optional extras:
     hintFor: { '5/14': 'hint for that exact wrong answer' }  (MC: use the option index as the key)
     visual:  an HTML string, e.g. Visuals.fractionBars([[3,8]])
     unit:    'cm²' (or an array) — ignored if typed after the answer
     display: what to show as the answer in a worked solution, e.g. '28 cm²'
   Write fractions as [[3/4]] in any text and they appear stacked.
   Keep questions ordered easy -> hard.
   ========================================================================== */
StudyData.addTopic('maths', {
  id: 'fractions',
  title: 'Fractions',
  emoji: '🍕',
  colour: '#ff7a9c',
  blurb: 'Parts of a whole: simplify, add, subtract and find fractions of amounts.',

  explanation: `
    <p>A <span class="hl">fraction</span> is a part of a whole. Picture a pizza cut into equal slices.</p>
    <ul>
      <li>The <strong>bottom</strong> number (denominator) says how many <em>equal</em> slices the whole is cut into.</li>
      <li>The <strong>top</strong> number (numerator) says how many slices you have.</li>
    </ul>
    <p>So [[3/4]] means "3 slices out of 4 equal slices".</p>
    ${Visuals.fractionBars([[3, 4]])}
    <p>Three skills to master in this topic:</p>
    <ol>
      <li><strong>Simplify</strong> – divide the top and bottom by the <em>biggest number that goes into both</em>.</li>
      <li><strong>Add and subtract</strong> – first make the bottom numbers the same, then just add or subtract the tops.</li>
      <li><strong>Fraction of an amount</strong> – divide by the bottom, then multiply by the top.</li>
    </ol>
    <p class="tip">💡 Golden rule: whatever you do to the top of a fraction, do to the bottom too (as long as you multiply or divide) and the fraction keeps the same value.</p>`,

  examples: [
    {
      title: 'Simplify [[12/18]]',
      visual: Visuals.fractionBars([[12, 18], [2, 3]]),
      steps: [
        'Ask: <strong>what is the biggest number that goes into both 12 and 18?</strong> It is 6 (12 = 6 × 2 and 18 = 6 × 3).',
        'Divide the top and the bottom by 6: 12 ÷ 6 = 2 and 18 ÷ 6 = 3.',
        'So [[12/18]] = [[2/3]]. Check: nothing but 1 goes into both 2 and 3, so we are finished!',
      ],
      answer: '[[12/18]] = [[2/3]]  (see how the two bars are shaded the same amount?)',
    },
    {
      title: 'Add [[1/4]] + [[3/8]]',
      visual: Visuals.fractionBars([[2, 8], [3, 8], [5, 8]]),
      steps: [
        'The bottom numbers are different (4 and 8), so we need to make them match.',
        'Easy trick: <strong>4 goes into 8</strong>, so turn the quarters into eighths. Multiply top and bottom of [[1/4]] by 2 to get [[2/8]].',
        'Now both have the same bottom: [[2/8]] + [[3/8]]. Just add the tops (2 + 3 = 5) and keep the bottom the same.',
      ],
      answer: '[[1/4]] + [[3/8]] = [[5/8]]',
    },
    {
      title: 'Find [[3/5]] of 40',
      visual: Visuals.unitBar([{ n: 3, label: '3 parts', unit: '8' }, { n: 2, label: 'other 2 parts', unit: '8' }]),
      steps: [
        'The bottom number (5) tells us to split 40 into <strong>5 equal parts</strong>: 40 ÷ 5 = 8. Each part is 8.',
        'The top number (3) says we want <strong>3 of those parts</strong>: 3 × 8 = 24.',
      ],
      answer: '[[3/5]] of 40 = 24',
    },
  ],

  watchOut: [
    'Never add the bottom numbers! [[1/2]] + [[1/4]] is <em>not</em> [[2/6]]. The bottom number tells you the <em>size</em> of the slices, and that stays the same when you add.',
    'Always check if your answer can be simplified.',
    'If you change the bottom number, change the top number too (multiply or divide both by the same number).',
  ],

  extras: [
    {
      title: 'When neither bottom number goes into the other',
      html: `<p>For [[1/3]] + [[1/4]] neither 3 nor 4 goes into the other. A reliable method: <strong>multiply the bottom numbers</strong> to get a common denominator: 3 × 4 = 12.</p>
             <p>[[1/3]] = [[4/12]] and [[1/4]] = [[3/12]], so [[1/3]] + [[1/4]] = [[7/12]].</p>
             <p>If you want the <em>smallest</em> common denominator (called the lowest common multiple), list the times tables of both numbers and spot the first match. It keeps numbers smaller, but multiplying always works!</p>`,
    },
    {
      title: 'Mixed numbers and improper fractions',
      html: `<p>A mixed number like 2 [[1/3]] is "2 wholes and one third". To make it an <em>improper fraction</em> (top bigger than bottom): 2 × 3 = 6, plus 1 = 7, so 2 [[1/3]] = [[7/3]].</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'What fraction of this bar is shaded?',
      visual: Visuals.fractionBars([[3, 8]]),
      options: ['[[3/8]]', '[[5/8]]', '[[3/5]]', '[[8/3]]'],
      answer: 0,
      hint: 'The bottom number counts <em>all</em> the equal parts. The top number counts the <em>shaded</em> parts. Count both!',
      hintFor: { 1: '[[5/8]] counts the parts that are <em>not</em> shaded. The top number should be the shaded parts.' },
      solution: ['Count all the equal parts: 8. That is the bottom number.', 'Count the shaded parts: 3. That is the top number.'],
    },
    {
      type: 'mc',
      text: 'Which fraction is equal to [[1/2]]?',
      options: ['[[2/3]]', '[[3/6]]', '[[1/3]]', '[[2/6]]'],
      answer: 1,
      hint: 'Equal fractions come from multiplying the top <em>and</em> the bottom by the same number. What do you get from [[1/2]] × 3 (top and bottom)?',
      solution: ['Multiply the top and bottom of [[1/2]] by 3.', '1 × 3 = 3 and 2 × 3 = 6, so [[1/2]] = [[3/6]].', 'Half of 6 is 3, so 3 out of 6 is exactly one half.'],
    },
    {
      type: 'input',
      text: 'Simplify [[4/10]].',
      answer: '2/5',
      placeholder: 'e.g. 3/4',
      inputNote: 'Type fractions with a slash, like 3/4.',
      hint: 'What is the biggest number that goes into both 4 and 10? Divide the top and bottom by it.',
      hintFor: { '4/10': 'That is the fraction we started with! Find a number that goes into <em>both</em> 4 and 10.' },
      solution: ['The biggest number that goes into 4 and 10 is 2.', '4 ÷ 2 = 2 and 10 ÷ 2 = 5.', 'So [[4/10]] = [[2/5]].'],
      display: '[[2/5]]',
    },
    {
      type: 'input',
      text: '[[2/7]] + [[3/7]] = ?',
      answer: '5/7',
      hint: 'Did you add the denominators? The bottom numbers match already, so keep the bottom the same and only add the tops.',
      hintFor: { '5/14': 'Did you add the denominators (7 + 7)? When the slices are the same size, the bottom number stays the same. Only add the tops!' },
      solution: ['The bottom numbers are both 7, so we can add straight away.', 'Add the tops: 2 + 3 = 5.', 'Keep the bottom as 7: [[5/7]].'],
      display: '[[5/7]]',
    },
    {
      type: 'input',
      text: 'Simplify [[18/24]] as far as you can.',
      answer: '3/4',
      hint: 'Both 18 and 24 are in the 6 times table. Divide the top and bottom by the <em>biggest</em> number that goes into both.',
      hintFor: {
        '9/12': 'Good start, you divided by 2! But 9 and 12 can <em>both</em> still be divided by 3. Keep going!',
        '6/8': 'Nice, you divided by 3! But 6 and 8 can both still be divided by 2. Keep going!',
        '18/24': 'That is the fraction we started with. Find a number that goes into both 18 and 24.',
      },
      solution: ['The biggest number that goes into both 18 and 24 is 6.', '18 ÷ 6 = 3 and 24 ÷ 6 = 4.', 'So [[18/24]] = [[3/4]]. (Dividing by 2 then 3 would also work, it just takes two steps.)'],
      display: '[[3/4]]',
    },
    {
      type: 'mc',
      text: 'What is [[3/4]] of 20?',
      options: ['5', '15', '12', '17'],
      answer: 1,
      hint: 'Divide by the bottom number first to find <em>one</em> part, then multiply by the top number.',
      hintFor: { 0: '5 is just <em>one</em> quarter of 20. You need <em>three</em> quarters, so multiply by 3.' },
      solution: ['Split 20 into 4 equal parts: 20 ÷ 4 = 5.', 'We want 3 of those parts: 3 × 5 = 15.'],
    },
    {
      type: 'input',
      text: '[[1/2]] + [[1/4]] = ?',
      answer: '3/4',
      hint: 'Did you add the denominators? Try finding a common denominator instead: 2 goes into 4, so turn the [[1/2]] into quarters.',
      hintFor: {
        '2/6': 'It looks like you added the tops <em>and</em> the bottoms. Make the bottoms match first: [[1/2]] = [[2/4]].',
        '2/4': 'Close! You added the tops (1 + 1) but the pieces are different sizes. Change [[1/2]] into quarters first.',
      },
      solution: ['2 goes into 4, so use quarters. [[1/2]] = [[2/4]] (multiply top and bottom by 2).', 'Now add: [[2/4]] + [[1/4]] = [[3/4]].'],
      display: '[[3/4]]',
    },
    {
      type: 'input',
      text: '[[5/6]] − [[1/3]] = ? (Simplify your answer.)',
      answer: '1/2',
      hint: 'Make the bottoms match first. 3 goes into 6, so turn the thirds into sixths. Then subtract the tops and simplify.',
      hintFor: {
        '3/6': 'Almost! [[3/6]] is right but it can be simplified. Divide the top and bottom by 3.',
        '4/3': 'It looks like you subtracted the tops and bottoms. Make the bottoms match first.',
      },
      solution: ['3 goes into 6, so turn [[1/3]] into sixths: [[1/3]] = [[2/6]].', 'Subtract: [[5/6]] − [[2/6]] = [[3/6]].', 'Simplify by dividing top and bottom by 3: [[3/6]] = [[1/2]].'],
      display: '[[1/2]]',
    },
    {
      type: 'input',
      text: '[[2/3]] + [[1/4]] = ?',
      answer: '11/12',
      hint: 'Neither 3 nor 4 goes into the other, so multiply them: 3 × 4 = 12. Change both fractions into twelfths first.',
      hintFor: { '3/7': 'Did you add the denominators (3 + 4)? Find a common denominator first: 3 × 4 = 12.' },
      solution: ['Common denominator: 3 × 4 = 12.', '[[2/3]] = [[8/12]] (× 4 top and bottom) and [[1/4]] = [[3/12]] (× 3 top and bottom).', '[[8/12]] + [[3/12]] = [[11/12]].'],
      display: '[[11/12]]',
    },
    {
      type: 'input',
      text: 'Sam spends [[1/4]] of his pocket money on lunch and [[1/2]] on games. What fraction does he have left?',
      answer: '1/4',
      hint: 'Step 1: add what he spent ([[1/4]] + [[1/2]], make the bottoms match). Step 2: take that away from 1 whole (1 = [[4/4]]).',
      hintFor: { '3/4': '[[3/4]] is what he <em>spent</em>. The question asks what is <em>left</em>, so take it away from the whole.' },
      solution: ['Spent: [[1/4]] + [[1/2]] = [[1/4]] + [[2/4]] = [[3/4]].', 'The whole is 1 = [[4/4]].', 'Left: [[4/4]] − [[3/4]] = [[1/4]].'],
      display: '[[1/4]]',
    },
  ],
});
