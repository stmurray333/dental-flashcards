# Zachary's Dental Sales Flash Cards

Live: https://stmurray333.github.io/dental-flashcards/

A single self-contained page (`index.html`) — no build step, no dependencies.
Open it, tap a card to flip, grade it, repeat.

## Adding a new day

All the content lives in one `DAYS` array inside the `<script>` block in `index.html`:

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
