# Study guide builder

Generates the printed Word study guides that go in Zachary's shared Drive folder.
The website content lives in `../content.json`; this is only for the docs.

## One-time setup

```bash
cd tools && npm install
```

## Building

```bash
node tools/build-guide.js day2          # writes into the shared Drive folder
node tools/build-guide.js all           # rebuild every day
node tools/build-guide.js day2 --out ~/Downloads
```

By default it writes straight to:

```
~/Library/CloudStorage/GoogleDrive-stmurray333@gmail.com/My Drive/Zachary - Dental Sales Training
```

That folder is shared with zacharymurray22@gmail.com, so the file reaches his
phone as soon as Drive syncs. **No email, no attachment.** Just text him that
it's there.

If the build complains the directory doesn't exist, Google Drive isn't running —
start it, or use `--out ~/Downloads` and move the file manually.

## Adding a new day

1. Copy `guides/day2.js` to `guides/day3.js`.
2. Change `exports.outputName` and the masthead text at the top of `blocks()`.
3. Replace the content. Use the helpers — don't restyle inside the day file:

   | Helper | Use |
   |---|---|
   | `H1(t)` / `H2(t)` | Section and sub-section headings |
   | `P(text, {color, bold, after})` | Plain paragraph |
   | `RICH([{t, b}, {t}])` | Paragraph with bold runs mixed in |
   | `BUL(text)` | Bullet |
   | `table(headers, rows, widths)` | Table — widths in DXA, sum to ~9360 |
   | `RULE()` | Horizontal rule |

4. `node tools/build-guide.js day3`

## Things that will bite you

These are all fixed in `guide-kit.js` — don't undo them in a day file:

- **Page size.** docx-js defaults to A4. The kit forces US Letter.
- **Table widths.** Must be set on the table *and* every cell, both in DXA.
  Percentages render wrong in Google Docs.
- **Table shading** uses `ShadingType.CLEAR`. `SOLID` renders as a black block.
- **Bullets** come from a numbering config. Never type a literal `•`.
- **No `\n`** inside a `TextRun` — use separate paragraphs.
- Don't use a table as a horizontal rule; `RULE()` uses a paragraph border.

## Verifying the output

There's no LibreOffice on this Mac, so the docs can't be rendered to images
here. Two checks that do work:

```bash
textutil -convert txt -stdout "path/to/guide.docx" | head -40   # content
```

```bash
mkdir -p /tmp/chk && cd /tmp/chk && unzip -q -o "path/to/guide.docx"
node -e "const x=require('fs').readFileSync('word/document.xml','utf8');
const c=re=>(x.match(re)||[]).length;
console.log('tables',c(/<w:tbl>/g),'headings',c(/w:val=\"Heading[12]\"/g),
            'bullets',c(/<w:numPr>/g),'empty paras',c(/<w:p [^>]*\/>/g));"
```

Empty paragraphs should be 0 — anything else means a stray blank block.
