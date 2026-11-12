/* Maths topic: Decimals and Percentages — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'decimals-percentages',
  title: 'Decimals & Percentages',
  emoji: '💯',
  colour: '#ffa24c',
  blurb: 'Three ways to write the same amount, plus quick tricks for finding percentages.',

  explanation: `
    <p>Fractions, decimals and percentages are three different <em>costumes</em> for the same number.</p>
    <p><span class="hl">Percent</span> just means <strong>"out of 100"</strong>. So 25% = [[25/100]] = [[1/4]] = 0.25.</p>
    <p>Memorise these famous ones, they pop up everywhere:</p>
    <ul>
      <li>50% = [[1/2]] = 0.5</li>
      <li>25% = [[1/4]] = 0.25 &nbsp;&nbsp; 75% = [[3/4]] = 0.75</li>
      <li>10% = [[1/10]] = 0.1 &nbsp;&nbsp; 20% = [[1/5]] = 0.2</li>
    </ul>
    <p><strong>Decimal ↔ percent:</strong> move the decimal point <strong>2 places</strong>. To go to a percent, move right (0.35 → 35%). To go back, move left (35% → 0.35).</p>
    <p class="tip">💡 Best trick for "percent of an amount": <strong>find 10% first</strong> (divide by 10), then build any other percentage from it.</p>`,

  examples: [
    {
      title: 'Write 0.35 as a percentage and a fraction',
      steps: [
        'Move the decimal point 2 places to the right: 0.35 → <strong>35%</strong>.',
        'For the fraction, percent means "out of 100", so 35% = [[35/100]].',
        'Simplify by dividing the top and bottom by 5: [[35/100]] = [[7/20]].',
      ],
      answer: '0.35 = 35% = [[7/20]]',
    },
    {
      title: 'Find 30% of 60',
      visual: Visuals.unitBar([{ n: 3, label: '30%', unit: '6' }, { n: 7, label: 'the other 70%', unit: '6' }]),
      steps: [
        'Split 60 into 10 equal parts (that is 10% each): 60 ÷ 10 = <strong>6</strong>.',
        '30% is 3 of those parts: 3 × 6 = 18.',
      ],
      answer: '30% of 60 = 18',
    },
    {
      title: 'Find 15% of 80',
      steps: [
        '10% of 80 = 80 ÷ 10 = 8.',
        '5% is half of 10%, so 5% = 8 ÷ 2 = 4.',
        '15% = 10% + 5% = 8 + 4 = 12.',
      ],
      answer: '15% of 80 = 12',
    },
    {
      title: 'Write [[3/5]] as a decimal',
      steps: [
        'Make the bottom number 10 (or 100). 5 × 2 = 10, so multiply the top and bottom by 2.',
        '[[3/5]] = [[6/10]], which is 6 tenths.',
        '6 tenths is written 0.6.',
      ],
      answer: '[[3/5]] = 0.6 = 60%',
    },
  ],

  watchOut: [
    'A longer decimal is not always bigger! 0.5 is bigger than 0.45. Line up the decimal places (0.50 vs 0.45) to compare fairly.',
    '"10% of" means ÷ 10 (not × 10).',
    'For a discount, work out how much is <em>taken off</em>, then subtract it if the question asks for the new price.',
  ],

  extras: [
    {
      title: 'Fraction → decimal by dividing',
      html: `<p>When the bottom number won't turn into 10 or 100 easily, divide the top by the bottom: [[3/8]] = 3 ÷ 8 = 0.375. (A calculator or short division helps here.)</p>`,
    },
    {
      title: 'The 1% method',
      html: `<p>For any percentage, find 1% by dividing by 100, then multiply. Example: 7% of 300: 1% = 3, so 7% = 21.</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'What is 50% as a fraction?',
      options: ['[[1/5]]', '[[1/2]]', '[[1/50]]', '[[1/4]]'],
      answer: 1,
      hint: 'Percent means "out of 100". Write 50% as [[50/100]], then simplify by dividing the top and bottom by 50.',
      solution: ['50% = [[50/100]].', 'Divide the top and bottom by 50: [[50/100]] = [[1/2]].'],
    },
    {
      type: 'input',
      text: 'Write 0.7 as a percentage.',
      answer: '70%',
      unit: '%',
      inputNote: 'You can include the % sign or leave it off.',
      hint: 'Percent means out of 100. Move the decimal point two places to the right (you may need to add a zero: 0.70).',
      hintFor: { '7': 'Remember to move the decimal point <em>two</em> places: 0.7 = 0.70 = 70 hundredths.' },
      solution: ['Move the decimal point two places to the right: 0.7 = 0.70 → 70.', 'So 0.7 = 70%.'],
      display: '70%',
    },
    {
      type: 'mc',
      text: 'Which is the biggest number?',
      options: ['0.45', '0.5', '0.405', '0.09'],
      answer: 1,
      hint: 'Give them all the same number of decimal places: 0.450, 0.500, 0.405, 0.090. Then compare them like normal numbers.',
      hintFor: { 0: 'Don\'t be fooled by the digits! 0.5 is the same as 0.50, and 50 hundredths beats 45 hundredths.' },
      solution: ['Write them all with 3 decimal places: 0.450, 0.500, 0.405, 0.090.', 'Compare: 500 is the biggest, so the biggest number is 0.5.'],
    },
    {
      type: 'input',
      text: 'What is 10% of 250?',
      answer: '25',
      hint: '10% means one tenth. Divide by 10 (move the decimal point one place left).',
      hintFor: { '2500': 'You multiplied by 10! 10% means <em>one tenth</em>, so divide by 10.' },
      solution: ['10% = [[1/10]], so divide by 10.', '250 ÷ 10 = 25.'],
    },
    {
      type: 'input',
      text: 'What is 25% of 48?',
      answer: '12',
      hint: '25% is the same as [[1/4]], one quarter. Divide by 4 (or halve twice).',
      hintFor: { '24': 'That is 50% (half). Halve it once more to get 25%.' },
      solution: ['25% = [[1/4]].', '48 ÷ 4 = 12. (Or halve twice: 48 → 24 → 12.)'],
    },
    {
      type: 'input',
      text: 'Write [[3/5]] as a decimal.',
      answer: ['0.6', '.6'],
      hint: 'Make the bottom number 10: what do you multiply 5 by to get 10? Do the same to the top.',
      hintFor: { '0.35': 'Don\'t put the digits side by side. Make the bottom number 10, so [[3/5]] becomes tenths.' },
      solution: ['5 × 2 = 10, so multiply the top and bottom by 2.', '[[3/5]] = [[6/10]] = 0.6.'],
    },
    {
      type: 'input',
      text: 'What is 35% of 60?',
      answer: '21',
      hint: 'Split 35% into 30% + 5%. First find 10% (divide by 10), then build up.',
      hintFor: { '2.1': 'Careful, 10% of 60 is 6, not 0.6. Then 30% = 18 and 5% = 3.' },
      solution: ['10% of 60 = 6.', '30% = 3 × 6 = 18.', '5% = half of 10% = 3.', '35% = 18 + 3 = 21.'],
    },
    {
      type: 'mc',
      text: 'A $80 jacket has 15% off. How much money do you <strong>save</strong>?',
      options: ['$8', '$12', '$15', '$68'],
      answer: 1,
      hint: 'Find 10% of 80, then 5% (half of the 10%), and add them together.',
      hintFor: { 3: '$68 is the <em>new price</em> after the discount. The question asks how much you <em>save</em>, which is the discount itself.' },
      solution: ['10% of $80 = $8.', '5% = half of $8 = $4.', '15% = $8 + $4 = $12. You save $12.'],
    },
    {
      type: 'input',
      text: 'Write [[7/20]] as a percentage.',
      answer: '35%',
      unit: '%',
      hint: 'Percent means out of 100. What do you multiply 20 by to get 100? Do the same to the top.',
      hintFor: { '7': 'Make the bottom number 100 first: 20 × 5 = 100, so multiply the top by 5 too.' },
      solution: ['20 × 5 = 100, so multiply the top and bottom by 5.', '[[7/20]] = [[35/100]] = 35%.'],
      display: '35%',
    },
    {
      type: 'input',
      text: 'Sam scored 18 out of 24 on a test. What percentage is that?',
      answer: '75%',
      unit: '%',
      hint: 'Write the score as a fraction ([[18/24]]) and simplify it. Which famous percentage matches?',
      hintFor: { '18': 'That is Sam\'s score, not the percentage. Write [[18/24]] and simplify it first.' },
      solution: ['Write as a fraction: [[18/24]].', 'Divide the top and bottom by 6: [[18/24]] = [[3/4]].', '[[3/4]] = 75%.'],
      display: '75%',
    },
  ],
});
