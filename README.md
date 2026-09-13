# Plan Reading Exercise

Code-reading practice, not code-writing practice. You're given a working
React component and a worksheet — the job is to trace what the code
already does and explain it, not to build anything new.

- `index.js` — exercise 1: nested state (`researchQuestion` with `interviewQs` inside each item)
- `additional-exercise.js` — exercise 2: relational state (`researchQuestion` and `interviewQuestion` as separate arrays, linked by `id`)
- `worksheet.md` — fill in the blanks for exercise 1

## How to use AI here

AI is fine for unblocking yourself: ask it to explain a line, a method
(`.filter`, `.map`), or a concept you don't recognize. What it's not for
is writing your worksheet answers.

## Why write the answers manually

The worksheet itself isn't the point, tracing state ownership and
handler logic by hand, in your own words is. 

## Timebox

- ~2-3 minutes per handler entry.
- Stuck past 3 minutes on one item? Write down what's unclear and move
  on — come back to it at the end.
- One or two sentences per answer. You're describing what the code
  does, not documenting it.

## Example (filled in, for reference)

### `handleDeleteQuestion(index)`
- Parameters:
  - `index`: position of the question to remove in the `researchQuestion` array
- Triggered by: clicking the delete icon next to a research question
- What it does: filters `researchQuestion` down to the items whose index isn't `index`, then saves that new array back into state
