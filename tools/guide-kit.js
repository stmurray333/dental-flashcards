/*
 * guide-kit.js — shared styling for the printed study guides.
 *
 * The guides are Word docs Zachary reads on his phone, so the priorities are
 * big clear headings, short paragraphs, and tables doing the heavy lifting.
 * Every guide uses these helpers so Day 3, 4, 5... all come out matching.
 *
 * See tools/README.md for how to add a new day.
 */

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, LevelFormat
} = require("docx");

const INK = "1A2422";
const MUTED = "5B6A66";
const ACCENT = "0B6A5F";
const RULE_GREY = "D6DFDB";
const TABLE_HEAD = "EDF3F1";

// US Letter with 0.75" margins. docx-js defaults to A4, which prints wrong here.
const LETTER = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
};

/** Plain paragraph. */
function P(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after == null ? 120 : o.after, line: 280 },
    children: [new TextRun({
      text, bold: o.bold, italics: o.italics,
      size: o.size || 21, color: o.color || INK, font: "Calibri"
    })]
  });
}

/** Paragraph with mixed formatting: RICH([{t:"bold bit", b:true}, {t:" rest"}]) */
function RICH(runs, o = {}) {
  return new Paragraph({
    spacing: { after: o.after == null ? 120 : o.after, line: 280 },
    children: runs.map(r => new TextRun({
      text: r.t, bold: r.b, italics: r.i,
      size: r.size || 21, color: r.c || INK, font: "Calibri"
    }))
  });
}

/** Section heading (green). */
function H1(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text: t, bold: true, size: 30, color: ACCENT, font: "Calibri" })]
  });
}

/** Sub-heading (black). */
function H2(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text: t, bold: true, size: 23, color: INK, font: "Calibri" })]
  });
}

/** Bullet. Never type a literal bullet character — this uses real numbering. */
function BUL(text, o = {}) {
  return new Paragraph({
    numbering: { reference: "bul", level: 0 },
    spacing: { after: 60, line: 280 },
    children: [new TextRun({ text, size: 21, color: o.color || INK, font: "Calibri" })]
  });
}

/** Horizontal rule. A bottom border, not a table — tables render badly as rules. */
function RULE() {
  return new Paragraph({
    spacing: { before: 60, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE_GREY } },
    children: [new TextRun({ text: "", size: 2 })]
  });
}

/**
 * Table. Column widths are DXA (1440 = 1 inch) and must be given for both the
 * table and every cell, or Google Docs renders it wrong. Widths should sum to
 * about 9360 (the printable width of US Letter at these margins).
 */
function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);

  const cell = (text, o = {}) => new TableCell({
    width: { size: o.w, type: WidthType.DXA },
    // CLEAR, never SOLID — SOLID renders as a black block.
    shading: o.head ? { type: ShadingType.CLEAR, fill: TABLE_HEAD } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      spacing: { after: 0, line: 260 },
      children: [new TextRun({
        text, bold: o.head || o.b, size: 19,
        color: o.head ? ACCENT : INK, font: "Calibri"
      })]
    })]
  });

  return new Table({
    columnWidths: widths,
    width: { size: total, type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, n) => cell(h, { head: true, w: widths[n] }))
      }),
      ...rows.map(r => new TableRow({
        children: r.map((c, n) => cell(c, { w: widths[n], b: n === 0 }))
      }))
    ]
  });
}

/** The masthead every guide opens with. */
function masthead(title, subtitle) {
  return [
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({
        text: "DENTAL SALES TRAINING", bold: true, size: 17,
        color: MUTED, characterSpacing: 60, font: "Calibri"
      })]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: title, bold: true, size: 40, color: INK, font: "Calibri" })]
    }),
    RICH([{ t: subtitle, c: MUTED, i: true, size: 20 }], { after: 60 }),
    RULE()
  ];
}

/** The sign-off pointing back at the game. */
function closer(extra) {
  return [
    RULE(),
    RICH([
      { t: "All of this is in the game: ", b: true },
      { t: extra || "stmurray333.github.io/dental-flashcards", c: INK }
    ])
  ];
}

/** Assemble and write the .docx. */
function build(children, outPath) {
  const doc = new Document({
    numbering: {
      config: [{
        reference: "bul",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 220 } } }
        }]
      }]
    },
    sections: [{ properties: { page: LETTER }, children }]
  });

  return Packer.toBuffer(doc).then(buf => {
    require("fs").writeFileSync(outPath, buf);
    return { path: outPath, bytes: buf.length };
  });
}

module.exports = { P, RICH, H1, H2, BUL, RULE, table, masthead, closer, build, INK, MUTED, ACCENT };
