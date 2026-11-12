/* Maths topic: Negative Numbers — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'negative-numbers',
  title: 'Negative Numbers',
  emoji: '🌡️',
  colour: '#2bb5c9',
  blurb: 'Numbers below zero: order them, add them and subtract them using a number line.',

  explanation: `
    <p><span class="hl">Negative numbers</span> are numbers below zero: think of a freezing day (−3°C), a basement floor (−2), or owing money (−$10).</p>
    <p>The <strong>number line</strong> is your best friend. Numbers get bigger as you go <strong>right</strong> and smaller as you go <strong>left</strong>.</p>
    ${Visuals.numberLine({ min: -6, max: 6, marks: [{ v: -4, label: '−4', colour: '#9ad7e0' }, { v: 3, label: '3', colour: '#ffb3c6' }] })}
    <ul>
      <li><strong>Adding</strong> a number: hop to the <strong>right</strong>.</li>
      <li><strong>Subtracting</strong> a number: hop to the <strong>left</strong>.</li>
      <li><strong>Subtracting a negative</strong> (two minus signs): the two minuses make a <strong>plus</strong>, so hop right! Think of it as "taking away a debt".</li>
    </ul>
    <p class="tip">💡 −7 is <em>smaller</em> than −2, because −7 is further to the left (colder, or more in debt!).</p>`,

  examples: [
    {
      title: 'Put in order, smallest first: −5, 2, −1, 0',
      visual: Visuals.numberLine({ min: -6, max: 3, marks: [{ v: -5, label: '−5' }, { v: -1, label: '−1' }, { v: 0, label: '0' }, { v: 2, label: '2' }] }),
      steps: [
        'Place each number on the number line.',
        'Smaller numbers are further <strong>left</strong>. Read from left to right.',
      ],
      answer: '−5, −1, 0, 2',
    },
    {
      title: 'Work out −3 + 5',
      visual: Visuals.numberLine({ min: -5, max: 5, marks: [{ v: -3, label: 'start' }], hops: [{ from: -3, to: 2, label: '+5' }] }),
      steps: [
        'Start at −3 on the number line.',
        'Adding 5 means hop 5 to the <strong>right</strong>.',
        'You land on 2.',
      ],
      answer: '−3 + 5 = 2',
    },
    {
      title: 'Work out 2 − 6',
      visual: Visuals.numberLine({ min: -5, max: 5, marks: [{ v: 2, label: 'start' }], hops: [{ from: 2, to: -4, label: '−6' }] }),
      steps: [
        'Start at 2.',
        'Subtracting 6 means hop 6 to the <strong>left</strong>.',
        'You pass zero and land on −4.',
      ],
      answer: '2 − 6 = −4',
    },
    {
      title: 'Work out 4 − (−3)',
      visual: Visuals.numberLine({ min: -2, max: 8, marks: [{ v: 4, label: 'start' }], hops: [{ from: 4, to: 7, label: '+3' }] }),
      steps: [
        'Two minus signs next to each other turn into a plus: 4 − (−3) = 4 + 3.',
        'Start at 4 and hop 3 to the right.',
      ],
      answer: '4 − (−3) = 7',
    },
  ],

  watchOut: [
    'Subtracting a bigger number from a smaller one gives a negative: 3 − 8 = −5, not 5.',
    'Two minuses next to each other make a plus: 5 − (−3) = 5 + 3.',
    'With negatives, a "bigger-looking" number can be smaller: −9 is less than −2.',
  ],

  extras: [
    {
      title: 'Multiplying negatives',
      html: `<p>Rules for × and ÷: <strong>same signs → positive</strong>, <strong>different signs → negative</strong>. So (−3) × (−4) = 12 but (−3) × 4 = −12.</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'Which of these numbers is the <strong>smallest</strong>?',
      options: ['−2', '−7', '0', '3'],
      answer: 1,
      hint: 'On the number line, the further left a number is, the smaller it is. Which number is furthest left?',
      hintFor: { 0: 'A bigger number after the minus sign means <em>further below zero</em>. Is −2 further left than −7?' },
      solution: ['Picture the number line: −7 is the furthest left.', 'So −7 is the smallest.'],
    },
    {
      type: 'input',
      text: 'The temperature is −3°C and it rises by 5 degrees. What is the new temperature?',
      answer: '2',
      unit: ['°c', '°', 'degrees', 'c'],
      hint: 'Rising means moving up (right on the number line). Start at −3 and hop 5 to the right.',
      solution: ['Start at −3.', 'Hop 5 right: −2, −1, 0, 1, 2.', 'The temperature is 2°C.'],
      display: '2°C',
    },
    {
      type: 'input',
      text: 'Work out: −4 + 7',
      answer: '3',
      hint: 'Start at −4 on the number line and hop 7 to the right.',
      hintFor: { '-11': 'You added 4 and 7 as if both were negative. Start at −4 and hop 7 <em>right</em>.' },
      solution: ['Start at −4.', 'Hop 7 to the right: it takes 4 hops to reach 0, then 3 more.', 'You land on 3.'],
    },
    {
      type: 'mc',
      text: 'Work out: 3 − 8',
      options: ['−5', '5', '−11', '11'],
      answer: 0,
      hint: 'Start at 3 on the number line and hop 8 to the left. Do you pass zero?',
      hintFor: { 1: 'That is 8 − 3. Our sum starts at 3 and goes <em>left</em> 8, which takes us below zero.' },
      solution: ['Start at 3. Hop 8 to the left.', '3 hops get you to 0, then 5 more hops go below zero.', 'You land on −5.'],
    },
    {
      type: 'input',
      text: 'Work out: −2 − 5',
      answer: '-7',
      inputNote: 'Use a minus sign for negative answers, like -3.',
      hint: 'Start at −2 and hop 5 to the <em>left</em> (subtracting moves you left).',
      hintFor: { '3': 'That would be −2 + 5. We are <em>subtracting</em>, so hop left.', '7': 'The answer is on the left side of zero, so it needs a minus sign.' },
      solution: ['Start at −2.', 'Hop 5 to the left: −3, −4, −5, −6, −7.', 'You land on −7.'],
    },
    {
      type: 'input',
      text: 'Work out: 5 − (−3)',
      answer: '8',
      hint: 'Two minus signs next to each other turn into a plus. So subtracting a negative is the same as <em>adding</em>.',
      hintFor: { '2': 'Did you do 5 − 3? Watch out! The two minus signs make a plus, so it becomes 5 + 3.' },
      solution: ['Subtracting a negative = adding: 5 − (−3) = 5 + 3.', '5 + 3 = 8.'],
    },
    {
      type: 'input',
      text: 'Work out: −10 + 4 − 2',
      answer: '-8',
      hint: 'Go left to right. First −10 + 4, then take away 2 from that answer.',
      hintFor: { '-4': 'You may have missed the final − 2. Do −10 + 4 first, then − 2.', '-6': 'That is −10 + 4. Now do the − 2 step too!' },
      solution: ['−10 + 4 = −6 (hop 4 right from −10).', 'Then −6 − 2 = −8 (hop 2 left).'],
    },
    {
      type: 'mc',
      text: 'Mia owes her friend $12, so her money is −$12. She pays back $5. How much does she have now?',
      options: ['−$17', '−$7', '$7', '$17'],
      answer: 1,
      hint: 'Write it as a sum: −12 + 5. Paying money back moves her closer to zero.',
      hintFor: { 0: '−$17 means she owes <em>more</em>. But she paid money back, so she should be closer to zero.' },
      solution: ['Her money: −12. Paying back $5 means adding 5: −12 + 5.', 'Hop 5 right from −12 and land on −7.', 'She still owes $7, or −$7.'],
    },
    {
      type: 'input',
      text: 'Work out: −3 − (−8)',
      answer: '5',
      hint: 'Subtracting a negative turns into adding: −3 − (−8) becomes −3 + 8.',
      hintFor: { '-11': 'That is −3 − 8. But − (−8) is two minuses, which make a plus: −3 + 8.' },
      solution: ['Two minuses make a plus: −3 − (−8) = −3 + 8.', 'Start at −3 and hop 8 right: you land on 5.'],
    },
    {
      type: 'input',
      text: 'A submarine is at −40 m (40 m below sea level). It rises 15 m, then dives 30 m. What is its depth now?',
      answer: '-55',
      unit: 'm',
      display: '−55 m',
      inputNote: 'Use a minus sign for below sea level, like -20.',
      hint: 'Rising means adding, diving means subtracting. Write it as −40 + 15 − 30 and go left to right.',
      hintFor: { '-25': '−25 m is where it is after rising. Don\'t forget the dive of 30 m!' },
      solution: ['Rises 15 m: −40 + 15 = −25.', 'Dives 30 m: −25 − 30 = −55.', 'The submarine is at −55 m.'],
    },
  ],
});
