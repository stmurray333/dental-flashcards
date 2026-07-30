/*
 * Day 1 study guide content.
 *
 * To add a new day: copy this file, change the masthead text and the blocks,
 * then run  node tools/build-guide.js day2
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;

exports.outputName = "Dental Sales - Day 1 Study Guide.docx";

exports.blocks = function () {
const body = [];

// ---------- masthead ----------
body.push(new Paragraph({
  spacing: { after: 40 },
  children: [new TextRun({ text: "DENTAL SALES TRAINING", bold: true, size: 17, color: MUTED, characterSpacing: 60, font: "Calibri" })]
}));
body.push(new Paragraph({
  spacing: { after: 60 },
  children: [new TextRun({ text: "Day 1 — The Industry, The Mouth, and What They Buy", bold: true, size: 40, color: INK, font: "Calibri" })]
}));
body.push(RICH([{ t: "Sessions 1.2 – 1.5, plus the General Anatomy notes. Reworked from Zachary Murray's notes, 27 July 2026.", c: MUTED, i: true, size: 20 }], { after: 60 }));
body.push(RULE());

// ---------- corrections ----------
body.push(H1("Fix these four first"));
body.push(P("Three are spellings and one is a fact. All four would cost you credibility in front of a dentist.", { color: MUTED }));
body.push(RICH([
  { t: "Teeth are not bone, and they do not regenerate. ", b: true },
  { t: "Enamel is the hardest substance in the body — harder than bone — but bone has a blood supply and heals, and enamel has neither. Once it's gone the body cannot rebuild it. That single fact is the reason the entire preventive category exists: fluoride, sealants, restoratives.", c: MUTED }
]));
body.push(RICH([{ t: "Henry Schein", b: true }, { t: " — not \"Henry Shine.\"", c: MUTED }]));
body.push(RICH([{ t: "Benco", b: true }, { t: " — not \"Banko.\" The Big 3 are Henry Schein, Patterson, Benco.", c: MUTED }]));
body.push(RICH([
  { t: "Envista · Dentsply Sirona · Straumann · Invisalign · Planmeca ", b: true },
  { t: "— the notes have In Vista, Dens Supply Cerona, Sventum/Staman, Invisilin and Plan Mecha.", c: MUTED }
]));

// ---------- the business ----------
body.push(H1("The business you're walking into"));
body.push(H2("Distribution — the Big 3"));
body.push(RICH([{ t: "Henry Schein is the largest dental distributor in the world at roughly 40% of the market.", b: true }, { t: " Patterson is #2, Benco is #3. Schein alone is close to the other two combined, and ships every dental device straight to the practice door.", c: INK }]));
body.push(P("The distributor is the quarterback of a dental office — you don't do the dentistry, but everything they use came through you. Distributor sales forces are roughly 95% W-2 and 5% 1099, so these are real careers with territories, not gig work.", { after: 140 }));
body.push(RICH([{ t: "There are about 200,000 dentists worldwide and roughly 300,000 dentist products. ", b: true }, { t: "Nobody memorizes that catalog — not you, not the dentist. That gap is exactly why the rep relationship matters.", c: INK }]));
body.push(P("The largest manufacturers are Envista, Dentsply Sirona and Straumann. Equipment and technology come from A-dec and Planmeca. Henry Schein also owns two implant brands outright — BioHorizons and Camlog — so it's a distributor and a manufacturer at once.", { after: 120 }));

body.push(H2("How dentists actually think about money"));
body.push(RICH([{ t: "The dentist usually owns the practice. ", b: true }, { t: "Surgeons and physicians draw a salary; a dentist takes home what's left after costs. Every box you sell comes out of their own pocket — price it like you know that.", c: INK }]));
body.push(BUL("Dental insurance is really a discount program, not insurance. Annual caps are low, and patients hit them fast."));
body.push(BUL("Medicaid has no dental equivalent — the medical safety net doesn't extend here. The patient pays or the work doesn't happen."));
body.push(BUL("Dentures, crowns and veneers are normally out of pocket. That's where the case-acceptance conversation lives."));

body.push(H2("Who's who in the practice"));
body.push(P("DMD or DDS after a name means a general dentist — the two degrees are equivalent. Specialists carry an additional title: orthodontists, endodontists, pedodontists, periodontists and oral surgeons.", { after: 120 }));
body.push(RICH([{ t: "The Big 4 procedure categories: ", b: true }, { t: "implants, preventives, restoratives, endodontics. Almost every product you sell drops into one of those four buckets.", c: INK }]));
body.push(P("Invisalign is the biggest clear aligner company in the game, and the newest way to take x-rays is the intraoral scanner.", { after: 120 }));

// ---------- 1.2 ----------
body.push(H1("Session 1.2 — Types of teeth and what they do"));
body.push(P("Front to back, food gets broken down in stages: cut, tear, crush, grind.", { color: MUTED, after: 140 }));
body.push(table(
  ["Tooth", "Count", "Job", "Why it matters commercially"],
  [
    ["Incisors", "8 — 4 upper, 4 lower", "Cut", "Most visible, so aesthetics are critical: shade matching for composites, bonding and veneers. Aligner cases focus here. Trauma-prone in contact sports"],
    ["Canines", "4 — \"cuspids\"", "Tear", "Longest roots in the mouth, very stable, last to be lost. Critical for canine guidance in the bite, strong implant candidates for bone volume"],
    ["Premolars", "8 — \"bicuspids\"", "Crush", "Often extracted to create space in orthodontics. Common site for cracked tooth syndrome. Implant-friendly locations"],
    ["Molars", "12, or 8 without wisdom teeth", "Grind", "Highest decay rate from grooves and pits, so sealants. Most common crown location, most complex root canals. Implants need more bone here"]
  ],
  [1400, 1900, 900, 5160]
));
body.push(P("", { after: 120 }));
body.push(BUL("Molars have 3–5 cusps and 2–3 roots. The first molars erupt around age 6 — the \"6-year molars.\""));
body.push(BUL("Wisdom teeth (#1, 16, 17, 32) are often impacted and extracted."));
body.push(RICH([{ t: "The team analogy: ", b: true }, { t: "incisors are the skilled forwards (finesse, visible, aesthetic), canines the anchors (stability, guidance), premolars the midfielders (transition, support), molars the power players (heavy lifting, most force).", i: true, c: MUTED }]));

// ---------- 1.3 ----------
body.push(H1("Session 1.3 — Bone and soft tissue"));
body.push(P("Work outward from the deepest structure to the one you can see: jaw bone → alveolar bone → gums → teeth.", { color: MUTED, after: 140 }));
body.push(table(
  ["Structure", "What it is", "One job", "Sales relevance"],
  [
    ["Maxilla", "Upper jaw. Less dense bone", "Supports the upper teeth", "Contains the maxillary sinuses, so posterior implants often need a sinus lift — that's a grafting sale. Thinner bone means faster orthodontic movement"],
    ["Mandible", "Lower jaw. Densest bone in the mouth", "Supports the lower teeth", "Best location for implants. Contains the mental foramen — nerve management is critical, which sells imaging. Slower orthodontic movement"],
    ["Gingiva", "The gums. Keratinized tissue", "Protective seal — keeps bacteria out", "Healthy is pink, stippled, doesn't bleed. Diseased is red, swollen, bleeds easily. Sells soft tissue lasers, perio instruments, grafting for recession"],
    ["Alveolar bone", "Tooth-supporting bone. Remodels constantly", "Holds the tooth", "Resorbs when the tooth is lost — \"use it or lose it.\" Drives ridge preservation grafts at extraction and immediate implant placement"]
  ],
  [1500, 2200, 1700, 3960]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "The alveolar bone point is the most useful thing in this session. ", b: true }, { t: "Once the tooth is gone nothing stimulates the bone, so it disappears — and implants need bone. That's why timing matters and why grafts sell alongside implants.", c: INK }]));

// ---------- 1.4 ----------
body.push(H1("Session 1.4 — Conditions and pathology"));
body.push(H2("Cavities"));
body.push(RICH([{ t: "Streptococcus mutans + sugar → acid, and the acid demineralizes enamel. ", b: true }, { t: "Progression runs white spot → enamel caries → dentin caries → pulp involvement. Caught at the white spot it's preventive; reaching the pulp means a root canal and a completely different product list.", c: INK }]));
body.push(table(
  ["Class", "Where"],
  [
    ["Class I", "Pits and fissures — chewing surfaces (the classic sealant target)"],
    ["Class II", "Between posterior teeth"],
    ["Class III", "Between anterior teeth"],
    ["Class IV", "Front teeth involving the corner or edge"],
    ["Class V", "At the gumline"],
    ["Class VI", "Cusp tips"]
  ],
  [1400, 7960]
));
body.push(P("", { after: 140 }));

body.push(H2("Periodontal disease"));
body.push(table(
  ["Stage", "Pocket depth", "Bone loss", "Reversible?"],
  [
    ["Healthy", "1–3mm, no bleeding on probing", "None", "—"],
    ["Gingivitis", "Inflammation of the gums only, bleeding on probing", "None yet", "Yes — caused by plaque accumulation"],
    ["Periodontitis", "4mm and above", "Visible on x-ray", "No. Chronic is slow, aggressive is rapid"]
  ],
  [1800, 3400, 1800, 2360]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "The line between the two is bone loss. ", b: true }, { t: "Once bone is gone it doesn't come back on its own. The ROI pitch on perio maintenance is that those patients are recurring revenue for the practice.", c: INK }]));

body.push(H2("Malocclusion — Angle's classification"));
body.push(table(
  ["Class", "What it is"],
  [
    ["Class I", "Normal molar relationship, but with crowding or spacing. The most common"],
    ["Class II", "Lower jaw too far back — overbite/overjet, the \"buck teeth\" look. Division 1 has front teeth protrusive, Division 2 retroclined"],
    ["Class III", "Lower jaw too far forward — underbite. Can be dental or skeletal, and the hardest to treat"]
  ],
  [1400, 7960]
));
body.push(P("", { after: 140 }));

body.push(H2("Edentulism — losing teeth"));
body.push(BUL("Partial: some teeth missing. Bridges, partial dentures, implants. Sorted by Kennedy Classification I–IV based on where the gaps are."));
body.push(BUL("Complete: no teeth in the arch. Complete dentures, implant-supported dentures, All-on-4."));
body.push(RICH([{ t: "Consequences: bone resorption — up to 40–60% in the first three years — plus bite collapse, facial aging and functional impairment. ", b: true }, { t: "It's a structural problem, not a cosmetic one. And it's a huge opportunity area with an aging population.", c: INK }]));

// ---------- problem to product ----------
body.push(H1("Problem → what the dentist buys"));
body.push(table(
  ["The problem", "What they buy"],
  [
    ["Cavities", "Composite filling, bonding agents, caries detection devices (DIAGNOdent), fluoride, sealants"],
    ["Periodontal disease", "Ultrasonic scalers, hand scalers, lasers, bone grafts, local antimicrobials (Arestin)"],
    ["Crooked teeth", "Braces, clear aligners, temporary anchoring devices (TADs), orthognathic surgery in severe cases"],
    ["Losing teeth", "Implant systems, bone grafts, dentures, digital dentures, implant components"]
  ],
  [2200, 7160]
));
body.push(P("", { after: 140 }));
body.push(P("A TAD is a temporary anchoring device — a mini screw placed as a fixed anchor point to pull teeth against. Temporary, so it comes out when the move is done.", { color: MUTED }));

// ---------- territory ----------
body.push(H1("Working the territory"));
body.push(BUL("About a 30% hit rate on the dentist actually being available when you walk in. Two out of three stops won't get you face time — plan the route expecting that, and treat the staff as the real relationship."));
body.push(BUL("6 to 8 touches before you get consistent calls. Most reps quit around three and conclude the office isn't interested."));
body.push(BUL("Dentists are very promo and sell driven. Lead with what's actually on offer, not a general check-in."));
body.push(BUL("Relationships are the major thing. Build them by showing up, being consistent, and bringing value."));
body.push(BUL("What keeps a dentist calling you back: consistency, follow up, and doing what you said you'd do. Cheapest price wins one order; being reliable wins the account."));

body.push(H2("Three questions worth opening with"));
body.push(P("Each one gets a dentist talking about their own practice instead of your catalog.", { color: MUTED, after: 120 }));
body.push(BUL("\"What percentage of your restorations are composite vs amalgam these days?\""));
body.push(BUL("\"What percentage of your Class II cases do you treat with aligners vs traditional braces?\""));
body.push(BUL("\"The baby boomers are hitting peak tooth-loss years — how is your practice positioned to capture this?\""));

// ---------- 1.5 ----------
body.push(H1("Session 1.5 — Putting it to work"));
body.push(RICH([{ t: "Exercise 1 — Translate the case. ", b: true }, { t: "Given a case in clinical language, identify what's happening anatomically, determine what products are needed, and explain it in plain terms for a patient.", c: INK }]));
body.push(RICH([{ t: "Worked example: ", b: true }, { t: "\"64-year-old presents with 6mm pockets and bleeding on probing throughout, radiographs show 50% bone loss in posterior segments, teeth #18 and #31 have Class II mobility.\"", i: true, c: MUTED }]));
body.push(BUL("Translation: advanced periodontal disease. The back teeth are loose and may need extraction."));
body.push(BUL("Products: periodontal instruments, possible extractions, implant planning."));
body.push(BUL("To the patient: \"Your gum disease is advanced and you're at risk of losing teeth.\""));
body.push(RICH([{ t: "Exercise 2 — Product mapping. ", b: true }, { t: "Given a tooth diagram, map which products interact with which anatomical structures.", c: INK }]));
body.push(RICH([{ t: "Exercise 3 — Shadow and report. ", b: true }, { t: "Observe a dentist for 2–4 hours, then report back: what procedures did you see, what anatomy was involved, what products were used, and what questions do you have?", c: INK }]));

// ---------- close ----------
body.push(RULE());
body.push(RICH([
  { t: "All of this is in the game: ", b: true },
  { t: "stmurray333.github.io/dental-flashcards — filter to Day 1 for these 78 questions, or use the Flag button on anything you want to drill separately.", c: INK }
]));
  return body;
};
