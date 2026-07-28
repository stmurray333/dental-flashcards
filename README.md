# Zachary's Dental Sales Flash Cards

Live: https://stmurray333.github.io/dental-flashcards/

A single self-contained page (`index.html`) — no build step, no dependencies.
Open it, tap a card to flip, grade it, repeat.

## How it's put together

- `index.html` — flash cards (the shell)
- `game.html` — Territory Run quiz (the shell)
- **`content.json` — all the actual content.** Both pages fetch this on load with a
  cache-busting timestamp, so new material appears the moment it's pushed rather than
  waiting out GitHub Pages' 10-minute cache.

Day-to-day you only ever edit `content.json`. Only touch the HTML if you're changing how
the pages *work* (and note those changes can take ~10 minutes to reach a phone that has
the old page cached).

`content.json` looks like:

```json
{
  "days": [ { "day": 1, "date": "...", "fixes": [...], "cards": [...] } ],
  "questions": [ ["Topic", "Question?", "Right answer", ["wrong","wrong","wrong"], "Why it's right"] ]
}
```

## Adding a new day

Add another entry to `days` in `content.json`:

```js
{ day: 2, date: "7·28·2026", fixes: [], cards: [
    { d: "Topic", q: "Question?", a: "Answer, <b>bold</b> the key bit.",
      n: "Optional footnote.", w: true }
]},
```

- `d` — topic (becomes a filter chip)
- `q` — front of the card
- `a` — back of the card (HTML allowed)
- `n` — optional footnote
- `w: true` — marks the footnote as a correction (amber styling)
- `fixes` — feeds the "Say these the right way" panel

Day chips, topic chips, counts and the browse view all derive from that array,
so adding a day is the only edit needed.

## Publishing an update

```
git add index.html && git commit -m "Add Day N" && git push
```

GitHub Pages redeploys in under a minute. The URL never changes.
