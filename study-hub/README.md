# 🎓 Study Hub

A friendly study site for Year 7 (NSW). No build step, no installs: **open `index.html` in a browser.**

## Add more questions
Open a topic file, e.g. `data/maths/fractions.js`, and add an object to the `questions` list:

```js
{ type: 'mc',    text: 'What is [[1/2]] of 10?', options: ['2','5','10','20'], answer: 1,   // answer = option index
  hint: 'Divide by the bottom number.', solution: ['10 ÷ 2 = 5'] },

{ type: 'input', text: 'Simplify [[6/8]].', answer: '3/4',      // or an array of accepted answers
  hint: 'Divide top and bottom by 2.', solution: ['6 ÷ 2 = 3, 8 ÷ 2 = 4'] },
```
Optional fields: `hintFor` (a hint for one specific wrong answer), `visual`, `unit`, `display`, `id`.
Write fractions as `[[3/4]]`. Keep questions ordered easy → hard. Check the browser console (F12) for warnings about mistakes.

## Add a new topic
Copy a file in `data/maths/`, change the content, and add one `<script>` line in `index.html`.

## Add a new subject
1. Make a folder `data/<subject>/` with topic files (they call `StudyData.addTopic('<subject>', {...})`).
2. In `data/subjects.js` set that subject to `live: true` (cards with `live: false` show "Coming soon").
3. Add the topic files as `<script>` tags in `index.html`.

## Layout
- `js/registry.js` subjects/topics store · `js/storage.js` localStorage + stars · `js/badges.js` badges
- `js/answers.js` answer checking · `js/visuals.js` bar models, number lines, grids · `js/app.js` pages + practice
- `css/style.css` · `data/` all content

Progress (stars, streaks, badges) is saved in the browser's localStorage; "Reset my progress" is at the bottom of the home page.
