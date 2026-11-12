/* Maths topic: Ratios — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'ratios',
  title: 'Ratios',
  emoji: '⚖️',
  colour: '#f7c948',
  blurb: 'Compare amounts, simplify ratios and share things fairly with bar models.',

  explanation: `
    <p>A <span class="hl">ratio</span> compares two (or more) amounts. If a smoothie has 3 cups of banana for every 2 cups of milk, the ratio of banana to milk is <strong>3 : 2</strong>.</p>
    ${Visuals.unitBar([{ n: 3, label: 'banana', unit: '🍌' }, { n: 2, label: 'milk', unit: '🥛' }])}
    <ul>
      <li><strong>Order matters.</strong> Banana : milk = 3 : 2, but milk : banana = 2 : 3.</li>
      <li><strong>Simplify</strong> a ratio like a fraction: divide both numbers by the biggest number that goes into both. 10 : 15 becomes 2 : 3.</li>
      <li><strong>Sharing in a ratio</strong> → draw a <strong>bar model</strong>: one box for each "part".</li>
    </ul>
    <p class="tip">💡 Bar model recipe: (1) add up the parts, (2) divide the total by the number of parts to find <em>one part</em>, (3) multiply by each person's number of parts.</p>`,

  examples: [
    {
      title: 'There are 6 apples and 9 oranges. Write the ratio of apples to oranges in simplest form.',
      visual: Visuals.unitBar([{ n: 2, label: 'apples', unit: '3' }, { n: 3, label: 'oranges', unit: '3' }]),
      steps: [
        'Write the ratio in the order asked: apples : oranges = 6 : 9.',
        'Biggest number that goes into both 6 and 9: it is 3.',
        'Divide both by 3: 6 ÷ 3 = 2 and 9 ÷ 3 = 3.',
      ],
      answer: 'Apples : oranges = 2 : 3',
    },
    {
      title: 'Mia and Jai share $20 in the ratio 3 : 2. How much does each get?',
      visual: Visuals.unitBar([{ n: 3, label: 'Mia', unit: '$4' }, { n: 2, label: 'Jai', unit: '$4' }]),
      steps: [
        'Draw a bar with 3 boxes for Mia and 2 boxes for Jai. That is 3 + 2 = <strong>5 boxes</strong> in total.',
        'The $20 is shared across 5 boxes: 20 ÷ 5 = $4 per box.',
        'Mia has 3 boxes: 3 × $4 = $12. Jai has 2 boxes: 2 × $4 = $8.',
        'Check: $12 + $8 = $20 ✔',
      ],
      answer: 'Mia gets $12 and Jai gets $8',
    },
    {
      title: 'A recipe uses flour : sugar in the ratio 2 : 1. How much sugar goes with 6 cups of flour?',
      visual: `<table class="ratio-table"><tr><th>Flour</th><td>2</td><td>6</td></tr><tr><th>Sugar</th><td>1</td><td>?</td></tr></table>`,
      steps: [
        'Look at the flour row: to get from 2 to 6 we multiply by 3.',
        'Do the same to the sugar: 1 × 3 = 3.',
      ],
      answer: '3 cups of sugar',
    },
  ],

  watchOut: [
    'Ratios scale by <strong>multiplying</strong>, not adding. 3 : 5 becomes 6 : 10 (×2), never 5 : 7 (+2).',
    'Keep the order the question gives you.',
    'When sharing, add the parts together <em>first</em>.',
  ],

  extras: [
    {
      title: 'Ratios as fractions',
      html: `<p>If Mia and Jai share in the ratio 3 : 2, there are 5 parts in total, so Mia gets [[3/5]] of the money and Jai gets [[2/5]]. That links ratios and fractions together!</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'A bag has 4 red counters and 6 blue counters. What is the ratio of red to blue in <strong>simplest form</strong>?',
      options: ['4 : 6', '6 : 4', '2 : 3', '3 : 2'],
      answer: 2,
      hint: 'Red goes first: 4 : 6. Then simplify by dividing both numbers by the biggest number that goes into both.',
      hintFor: { 0: 'Right numbers, but it can be simplified! 4 and 6 can both be divided by 2.', 3: 'Careful with the order. The question asks for red <em>to</em> blue, so red is first.' },
      solution: ['Red : blue = 4 : 6.', 'Divide both by 2: 4 ÷ 2 = 2 and 6 ÷ 2 = 3.', 'So the ratio is 2 : 3.'],
    },
    {
      type: 'input',
      text: 'Simplify the ratio 10 : 15.',
      answer: '2:3',
      placeholder: 'e.g. 1:4',
      inputNote: 'Type ratios with a colon, like 2:3.',
      hint: 'What is the biggest number that goes into both 10 and 15? Divide both parts by it.',
      hintFor: { '10:15': 'That is the ratio we started with. Find a number that goes into both 10 and 15.' },
      solution: ['The biggest number that goes into 10 and 15 is 5.', '10 ÷ 5 = 2 and 15 ÷ 5 = 3.', 'So 10 : 15 = 2 : 3.'],
      display: '2 : 3',
    },
    {
      type: 'mc',
      text: 'Which ratio is equal to 2 : 3?',
      options: ['4 : 5', '4 : 6', '6 : 8', '3 : 2'],
      answer: 1,
      hint: 'Equal ratios are made by multiplying <em>both</em> numbers by the same number. What do you get from 2 : 3 × 2?',
      hintFor: { 0: 'It looks like you added 2 to both numbers. Equal ratios come from <em>multiplying</em>.', 3: 'That is 2 : 3 the wrong way around.' },
      solution: ['Multiply both parts of 2 : 3 by 2.', '2 × 2 = 4 and 3 × 2 = 6.', 'So 2 : 3 = 4 : 6.'],
    },
    {
      type: 'input',
      text: 'Fill in the blank: 3 : 5 = 12 : ?',
      answer: '20',
      hint: 'What did you multiply 3 by to get 12? Do the same to the 5.',
      hintFor: { '14': 'It looks like you added 9 to both (3 + 9 = 12 and 5 + 9 = 14). Ratios scale by <em>multiplying</em>.' },
      solution: ['3 × 4 = 12, so we multiply by 4.', 'Do the same to the 5: 5 × 4 = 20.', 'So 3 : 5 = 12 : 20.'],
    },
    {
      type: 'input',
      text: 'Share $20 in the ratio 1 : 3. How much is the <strong>larger</strong> share?',
      answer: '15',
      display: '$15',
      hint: 'Draw a bar with 1 + 3 = 4 boxes. How much is each box? Then count the boxes for the larger share.',
      hintFor: { '5': '$5 is the smaller share (1 box). The question asks for the larger share (3 boxes).' },
      solution: ['Total parts: 1 + 3 = 4.', 'One part: $20 ÷ 4 = $5.', 'The larger share has 3 parts: 3 × $5 = $15.'],
    },
    {
      type: 'mc',
      text: 'Juice is made from 2 parts concentrate to 5 parts water. How much water goes with 6 cups of concentrate?',
      options: ['8 cups', '12 cups', '15 cups', '30 cups'],
      answer: 2,
      hint: 'To go from 2 to 6 you multiply by 3. Do the same to the water amount.',
      solution: ['Concentrate: 2 → 6 means × 3.', 'Water: 5 × 3 = 15.', 'So 2 : 5 = 6 : 15, which is 15 cups of water.'],
    },
    {
      type: 'input',
      text: 'Zoe and Max share 35 stickers in the ratio 4 : 3. How many stickers does Zoe get?',
      answer: '20',
      hint: 'Total parts: 4 + 3 = 7. Divide 35 by 7 to find one part, then multiply by Zoe\'s number of parts.',
      hintFor: { '15': '15 is Max\'s share (3 parts). Zoe has 4 parts.', '5': '5 is the size of <em>one part</em>. Zoe has 4 of them.' },
      solution: ['Total parts: 4 + 3 = 7.', 'One part: 35 ÷ 7 = 5.', 'Zoe has 4 parts: 4 × 5 = 20 stickers.', 'Check: Max has 3 × 5 = 15, and 20 + 15 = 35 ✔'],
    },
    {
      type: 'input',
      text: 'Paint is mixed from blue : yellow in the ratio 3 : 4. If you use 12 tins of blue, how many tins of yellow do you need?',
      answer: '16',
      hint: 'What do you multiply 3 by to get 12? Do the same to the 4.',
      hintFor: { '13': 'You added 9 to both numbers (3 + 9 = 12 and 4 + 9 = 13). Ratios scale by <em>multiplying</em>.' },
      solution: ['3 × 4 = 12, so everything is multiplied by 4.', 'Yellow: 4 × 4 = 16 tins.'],
    },
    {
      type: 'mc',
      text: 'In a class, the ratio of boys to girls is 3 : 4. There are 28 students. How many girls are there?',
      options: ['12', '16', '21', '4'],
      answer: 1,
      hint: 'Add the parts (3 + 4), divide 28 by the total to find one part, then count the girls\' parts.',
      hintFor: { 0: '12 is the number of <em>boys</em> (3 parts). The question asks for girls.', 3: '4 is the number of parts, not the number of girls. Find what one part is worth first.' },
      solution: ['Total parts: 3 + 4 = 7.', 'One part: 28 ÷ 7 = 4.', 'Girls have 4 parts: 4 × 4 = 16.', 'Check: boys = 3 × 4 = 12, and 12 + 16 = 28 ✔'],
    },
    {
      type: 'input',
      text: 'The ratio of Ava\'s age to her dad\'s age is 1 : 4. Her dad is 40. What is the <strong>total</strong> of their ages?',
      answer: '50',
      hint: 'Dad has 4 parts and they equal 40. Find one part (Ava\'s age), then add both ages.',
      hintFor: { '10': '10 is Ava\'s age. The question wants the <em>total</em> of both ages.' },
      solution: ['Dad\'s 4 parts = 40, so one part = 40 ÷ 4 = 10.', 'Ava is 1 part = 10 years old.', 'Total: 10 + 40 = 50.'],
    },
  ],
});
