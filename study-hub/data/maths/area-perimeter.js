/* Maths topic: Area and Perimeter — see fractions.js for how to add questions. */
StudyData.addTopic('maths', {
  id: 'area-perimeter',
  title: 'Area & Perimeter',
  emoji: '📐',
  colour: '#5b8def',
  blurb: 'Measure the space inside shapes and the distance around them.',

  explanation: `
    <p><span class="hl">Perimeter</span> is the distance <strong>around the outside</strong> of a shape, like walking around the edge of a paddock. Add up every side.</p>
    <p><span class="hl">Area</span> is the amount of <strong>space inside</strong>, like how much grass covers the paddock. We measure it in <strong>square units</strong> (cm², m²).</p>
    ${Visuals.areaGrid(5, 3)}
    <p>Count the squares: 3 rows of 5 squares is 15 squares. That's the shortcut:</p>
    <ul>
      <li><strong>Rectangle area</strong> = length × width</li>
      <li><strong>Triangle area</strong> = half of (base × height). It's exactly half of a rectangle!</li>
      <li><strong>Tricky shapes</strong> – split them into rectangles, or fill in the missing corner and subtract.</li>
    </ul>
    <p class="tip">💡 Perimeter uses plain units (cm). Area uses <em>square</em> units (cm²). Different jobs, different units!</p>`,

  examples: [
    {
      title: 'A rectangle is 6 cm long and 4 cm wide. Find its perimeter and area.',
      visual: Visuals.areaGrid(6, 4),
      steps: [
        '<strong>Perimeter:</strong> add all four sides: 6 + 4 + 6 + 4 = 20 cm.',
        '<strong>Area:</strong> 4 rows of 6 squares = 6 × 4 = 24 square centimetres.',
      ],
      answer: 'Perimeter = 20 cm, Area = 24 cm²',
    },
    {
      title: 'Find the area of a triangle with base 8 cm and height 5 cm',
      visual: Visuals.triangle(8, 5),
      steps: [
        'Imagine the rectangle that fits around the triangle: 8 × 5 = 40 cm².',
        'The triangle is exactly <strong>half</strong> of that rectangle: 40 ÷ 2 = 20.',
      ],
      answer: 'Area = 20 cm²',
    },
    {
      title: 'Find the area of this L-shape',
      visual: Visuals.lShape(10, 6, 4, 3),
      steps: [
        'Pretend the missing corner is there. The big rectangle is 10 × 6 = 60 cm².',
        'The missing corner (dashed) is 4 × 3 = 12 cm².',
        'Take the corner away: 60 − 12 = 48.',
      ],
      answer: 'Area = 48 cm²',
    },
  ],

  watchOut: [
    'Perimeter adds <em>every</em> side: a rectangle has 4 sides, not 2!',
    'The triangle\'s height is the straight-up distance, not the slanted side.',
    'Don\'t forget the units: cm for perimeter, cm² for area.',
  ],

  extras: [
    {
      title: 'Parallelograms',
      html: `<p>A parallelogram's area is <strong>base × height</strong> (the straight-up height). Slice off one slanted end and slide it to the other side: you get a rectangle!</p>`,
    },
    {
      title: 'A neat perimeter trick for L-shapes',
      html: `<p>The perimeter of the L-shape from example 3 equals the perimeter of the big 10 × 6 rectangle: 10 + 6 + 10 + 6 = 32 cm. The "bite" you took out doesn't change the distance around!</p>`,
    },
  ],

  questions: [
    {
      type: 'mc',
      text: 'What is the <strong>perimeter</strong> of a rectangle that is 5 cm long and 3 cm wide?',
      options: ['8 cm', '15 cm', '16 cm', '30 cm'],
      answer: 2,
      hint: 'Perimeter means all the way around. A rectangle has 4 sides: 5 + 3 + 5 + 3.',
      hintFor: { 0: 'You added only two sides. A rectangle has four sides!', 1: '15 is the <em>area</em> (5 × 3). Perimeter means add up all the sides.' },
      solution: ['Add all four sides: 5 + 3 + 5 + 3.', 'That makes 16 cm.'],
    },
    {
      type: 'input',
      text: 'What is the <strong>area</strong> of a rectangle that is 7 cm long and 4 cm wide?',
      answer: '28',
      unit: ['cm²', 'cm2', 'cm'],
      display: '28 cm²',
      inputNote: 'You can type the units (cm2) or just the number.',
      hint: 'Area of a rectangle = length × width.',
      hintFor: { '22': '22 is the perimeter (adding the sides). For area, multiply: length × width.' },
      solution: ['Area = length × width.', '7 × 4 = 28 square centimetres.'],
    },
    {
      type: 'input',
      text: 'A square has sides of 9 m. What is its perimeter?',
      answer: '36',
      unit: 'm',
      display: '36 m',
      hint: 'A square has 4 equal sides. Add them all up (or do 4 × 9).',
      hintFor: { '81': '81 is the <em>area</em> (9 × 9). Perimeter means adding the 4 sides.' },
      solution: ['All 4 sides are 9 m.', '4 × 9 = 36 m.'],
    },
    {
      type: 'mc',
      text: 'Which unit would you use to measure <strong>area</strong>?',
      options: ['cm', 'cm²', 'cm³', 'kg'],
      answer: 1,
      hint: 'Area counts how many <em>squares</em> fit inside a shape. What unit has the word "square" in it?',
      solution: ['Area measures squares.', 'So we use square units like cm² (square centimetres).'],
    },
    {
      type: 'input',
      text: 'A rectangular garden is 12 m long and 5 m wide. What is its area?',
      answer: '60',
      unit: ['m²', 'm2', 'm'],
      display: '60 m²',
      hint: 'Multiply the length by the width.',
      hintFor: { '34': '34 is the perimeter. Area is length × width.' },
      solution: ['Area = length × width = 12 × 5.', '12 × 5 = 60 m².'],
    },
    {
      type: 'input',
      text: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?',
      answer: '30',
      unit: ['cm²', 'cm2', 'cm'],
      display: '30 cm²',
      visual: Visuals.triangle(10, 6),
      hint: 'First find the area of the rectangle 10 × 6. The triangle is half of that.',
      hintFor: { '60': '60 is the area of the whole rectangle. The triangle is only <em>half</em> of it.' },
      solution: ['Rectangle: 10 × 6 = 60.', 'Triangle = half: 60 ÷ 2 = 30 cm².'],
    },
    {
      type: 'input',
      text: 'A rectangle has an area of 40 cm² and a length of 8 cm. How wide is it?',
      answer: '5',
      unit: 'cm',
      display: '5 cm',
      hint: 'Area = length × width, so ask: 8 × (what number) = 40? That\'s a division!',
      hintFor: { '320': 'That is 40 × 8. To find a missing side, <em>divide</em> the area by the side you know.' },
      solution: ['Area = length × width, so 40 = 8 × width.', 'Width = 40 ÷ 8 = 5 cm.'],
    },
    {
      type: 'input',
      text: 'A rectangle has a perimeter of 18 cm and a length of 6 cm. How wide is it?',
      answer: '3',
      unit: 'cm',
      display: '3 cm',
      hint: 'Two lengths use up 6 + 6 = 12 cm. How much perimeter is left for the <em>two</em> widths? Then share it between them.',
      hintFor: { '12': '12 cm is the two lengths. Take 12 from 18 to get the leftover for <strong>both</strong> widths, then share it.', '6': '6 cm is the length. We need to find the width!' },
      solution: ['Two lengths: 6 + 6 = 12 cm.', 'Left for two widths: 18 − 12 = 6 cm.', 'One width: 6 ÷ 2 = 3 cm.'],
    },
    {
      type: 'input',
      text: 'Find the area of this L-shape.',
      visual: Visuals.lShape(10, 6, 4, 3),
      answer: '48',
      unit: ['cm²', 'cm2', 'cm'],
      display: '48 cm²',
      hint: 'Fill in the missing corner to make a big rectangle, find its area, then take away the area of the missing corner.',
      hintFor: { '60': '60 is the whole big rectangle. Don\'t forget to take away the missing corner.', '12': '12 cm² is just the missing corner! Subtract it from the big rectangle.' },
      solution: ['Big rectangle: 10 × 6 = 60.', 'Missing corner: 4 × 3 = 12.', 'L-shape: 60 − 12 = 48 cm².'],
    },
    {
      type: 'input',
      text: 'A triangle has an area of 24 cm² and a base of 8 cm. How tall is it?',
      answer: '6',
      unit: 'cm',
      display: '6 cm',
      hint: 'The triangle is half a rectangle. So the rectangle has area 24 × 2 = 48. What × 8 = 48?',
      hintFor: { '3': 'You divided 24 by 8. But 24 is only <em>half</em> the rectangle. Double it first: 48, then divide by 8.' },
      solution: ['The triangle is half the rectangle, so the rectangle is 24 × 2 = 48 cm².', 'Rectangle: base × height = 48, so 8 × height = 48.', 'Height = 48 ÷ 8 = 6 cm.'],
    },
  ],
});
