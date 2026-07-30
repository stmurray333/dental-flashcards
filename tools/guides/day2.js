/*
 * Day 2 study guide content.
 *
 * To add a new day: copy this file, change the masthead text and the blocks,
 * then run  node tools/build-guide.js day3
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;

exports.outputName = "Dental Sales - Day 2 Study Guide.docx";

exports.blocks = function () {
const body = [];

// ---------- masthead ----------
body.push(new Paragraph({
  spacing: { after: 40 },
  children: [new TextRun({ text: "DENTAL SALES TRAINING", bold: true, size: 17, color: MUTED, characterSpacing: 60, font: "Calibri" })]
}));
body.push(new Paragraph({
  spacing: { after: 60 },
  children: [new TextRun({ text: "Day 2 — Consumables, Capital, Implants & Aligners", bold: true, size: 40, color: INK, font: "Calibri" })]
}));
body.push(RICH([{ t: "Sessions 2.2 – 2.6, plus field notes from the Consumables Deep Dive. Reworked from Zachary Murray's notes, 29 July 2026.", c: MUTED, i: true, size: 20 }], { after: 60 }));
body.push(RULE());

// ---------- corrections ----------
body.push(H1("Fix these two first"));
body.push(P("Both of these will come up in front of someone who knows the industry, and both are easy to get right now rather than later.", { color: MUTED }));
body.push(RICH([
  { t: "Nobel Biocare, Ormco and KaVo Kerr belong to Envista, not Danaher. ", b: true },
  { t: "The notes list them under both. Envista was spun off from Danaher and took the dental brands with it — telling a rep who works there that Danaher owns Nobel Biocare will land badly.", c: MUTED }
]));
body.push(RICH([
  { t: "It's Brånemark who invented the modern implant. ", b: true },
  { t: "Worth being able to say the name. It comes up constantly in implant education, and Nobel Biocare's entire identity rests on it.", c: MUTED }
]));

// ---------- field notes ----------
body.push(H1("Field notes — what actually matters on the ground"));
body.push(BUL("Orthodontists are trained specifically in how to move teeth. When Invisalign launched, they only allowed orthodontists to use it. If you ever need aligners yourself, go to an orthodontist."));
body.push(BUL("If one person in the practice doesn't like you, nobody will. The staff are extremely tight-knit and word travels instantly — the office manager and assistants are decision makers, not gatekeepers."));
body.push(BUL("After you close a sale, ask when they plan to use it, put that date in your calendar, and text them afterward to ask how it went. Costs nothing, and turns one transaction into a relationship."));
body.push(BUL("Brackets are bonded on and painful to change, so they're the hard sell. Wires, ligature rings and rubber bands get replaced constantly — that's the repeat business."));
body.push(BUL("Inside reps work the phones on straight cold calls. Outside reps cover the territory in person, walking into practices."));
body.push(BUL("Supplies are only 4–6% of a practice's spend — which is exactly why reliability and convenience beat price more often than you'd think."));

// ---------- 2.2 ----------
body.push(H1("Session 2.2 — Channels and consumables"));
body.push(H2("Where the product actually flows"));
body.push(RICH([{ t: "Full-service dealers move 80% of consumables", b: true }, { t: " — Henry Schein, Patterson, Benco.", c: MUTED }]));
body.push(BUL("One-stop shopping across 10,000+ SKUs"));
body.push(BUL("A rep who visits regularly"));
body.push(BUL("Equipment and consumables under one roof"));
body.push(BUL("Practice management support and financing"));
body.push(P("Working for a dealer means managing 50–150 practices, building relationships (know the office manager), solving problems — emergency orders, back-orders — and referring equipment to specialists.", { after: 160 }));
body.push(RICH([{ t: "Manufacturer direct", b: true }, { t: " covers specialized products: implants, lasers, specific technology. Higher margins, more clinical education required. You're the expert on your own product where the dealer rep is a generalist across thousands.", c: INK }]));
body.push(RICH([{ t: "Discounters", b: true }, { t: " — Net32, DentalBuyer, Amazon Business — are price-focused with no service, and a genuine threat to the traditional model. You don't beat them on price. You beat them on service, emergency availability and the relationship.", c: INK }]));

body.push(H2("What actually drives the order"));
body.push(BUL("Reliability — \"I need it tomorrow, can you deliver?\""));
body.push(BUL("Price — but not always number one"));
body.push(BUL("Consistency batch to batch"));
body.push(BUL("Ease of ordering — portals, auto-ship"));
body.push(BUL("Support — clinical questions and product issues"));

body.push(H2("The rhythm of the account"));
body.push(table(
  ["Cadence", "What you're doing"],
  [
    ["Weekly / bi-weekly", "Check inventory with the office manager, take orders, address product issues, introduce new products, gather competitive intelligence"],
    ["Monthly", "Deeper account review, lunch for the staff, volume discount discussions, contract renewals"],
    ["Quarterly", "Practice growth planning, equipment needs assessment, large capital discussions"]
  ],
  [2000, 7360]
));
body.push(P("", { after: 80 }));
body.push(P("Track: monthly purchase volume, product mix versus competitors, growth rate, order frequency, average order size.", { color: MUTED }));

// ---------- 2.3 ----------
body.push(H1("Session 2.3 — Capital equipment"));
body.push(P("Capital runs $5,000 to $500,000+, takes months rather than days, involves the owner, associates, office manager and lead assistant, almost always involves financing, and requires you to prove ROI. Installation, training and service contracts turn it into an ongoing relationship.", { after: 120 }));
body.push(RICH([{ t: "\"Like recruiting a star player. Long courtship, big investment, transformative impact, and everyone weighs in on the decision.\"", i: true, c: MUTED }], { after: 200 }));

body.push(H2("The numbers to have ready"));
body.push(table(
  ["Equipment", "Price", "Sales cycle"],
  [
    ["Intraoral sensors", "$5,000 – 12,000 per operatory", "2–4 months"],
    ["Panoramic x-ray", "$20,000 – 80,000", "—"],
    ["CBCT (3D)", "$60,000 – 150,000", "6–12 months"],
    ["Intraoral scanner", "$20,000 – 40,000", "3–6 months"],
    ["CEREC CAD/CAM", "$100,000 – 150,000", "6–12 months"],
    ["Soft tissue laser", "$5,000 – 15,000", "—"],
    ["Hard tissue laser", "$40,000 – 80,000", "—"],
    ["Autoclave", "$3,000 – 15,000", "7–10 yr replacement"],
    ["Dental chair", "$6,000 – 20,000+ each", "Months"],
    ["Handpiece", "$800 – 3,000 each", "—"],
    ["Compressor", "$3,000 – 30,000", "—"]
  ],
  [3000, 4000, 2360]
));
body.push(P("", { after: 120 }));

body.push(H2("Imaging"));
body.push(RICH([{ t: "Sensors", b: true }, { t: " come in size 0 (pedo), 1 (anterior), 2 (posterior). Dexis (KaVo Kerr), Schick (Dentsply Sirona), Carestream. The ROI pitch: no film costs at $50–100/month, no developing time, patient education chairside, no chemicals, and lower radiation as a marketing advantage.", c: INK }]));
body.push(RICH([{ t: "CBCT", b: true }, { t: " is the game-changer — you can see bone in 3D. It lets a practice keep surgical implant cases in-house instead of referring them out, improves case acceptance because patients see the 3D, avoids anatomical complications, and earns a $200–400 scan fee that's usually cash pay.", c: INK }]));
body.push(RICH([{ t: "Intraoral scanners", b: true }, { t: " — iTero (Align, integrates with Invisalign), TRIOS (3Shape), Medit, Primescan (Dentsply Sirona, integrates with CEREC). Eliminates $200–400/month of impression material, fewer remakes, no gagging, instant file to the lab. Sell it by demoing in their office on a real patient.", c: INK }]));

body.push(H2("CAD/CAM and lasers"));
body.push(RICH([{ t: "CEREC", b: true }, { t: " (Dentsply Sirona) mills crowns same-day: scanner, design software, milling unit. Blocks run $30–80 each. It eliminates $150–300 in lab fees per crown, so break-even lands around 150–200 crowns. Learning curve is 3–6 months.", c: INK }]));
body.push(RICH([{ t: "Lasers", b: true }, { t: " — soft tissue diodes handle frenectomies, gingivectomies and crown lengthening; hard tissue erbium lasers can cut tooth structure and get marketed as \"no drill dentistry.\" Either way the demo or trial period is what closes it.", c: INK }]));

body.push(H2("The unglamorous equipment"));
body.push(BUL("Autoclaves: Class B (vacuum) is most thorough, then N and S. Sell on regulatory compliance first — it's required by law — then cycle time and reliability. Downtime means they cannot practice."));
body.push(BUL("Handpieces: high-speed runs 400,000 RPM (the drill), slow-speed 20,000 RPM. They keep 2–4 per operatory for sterilization rotation."));
body.push(BUL("Compressors: no air means no drilling, so reliability is everything. Quiet models are a premium feature."));

// ---------- 2.4 ----------
body.push(H1("Session 2.4 — Implants and bone grafting"));
body.push(P("A ~$5 billion market and growing: boomers losing teeth, implants now standard of care over bridges and dentures, more GPs placing them rather than just oral surgeons, success rates above 95%, and digital workflow making planning easier.", { after: 140 }));
body.push(RICH([{ t: "Three parts: ", b: true }, { t: "the fixture (the screw in bone, titanium or zirconia, 3–6mm diameter, 6–18mm long), the abutment (connects crown to fixture — stock or custom, straight or angled), and the crown. Surface treatment is what drives osseointegration: SLA is Straumann, TiUnite is Nobel Biocare, Osseospeed is Astra Tech.", c: INK }]));

body.push(H2("Who's who in implants"));
body.push(table(
  ["System", "What defines it", "Price to dentist"],
  [
    ["Straumann", "~20% share, #1. Swiss, premium, deep evidence. Roxolid alloy, BLT/BLX lines", "$250 – 400"],
    ["Nobel Biocare", "The pioneers — Brånemark. All-on-4 protocol, NobelActive stability", "Premium, similar"],
    ["Dentsply Sirona", "Astra Tech — bone preservation reputation, conical connection, CEREC integration", "—"],
    ["Zimmer Biomet", "Tapered Screw-Vent, popular in US, value pricing", "—"],
    ["BioHorizons", "US-based, Laser-Lok surface, growing in the GP market", "—"],
    ["Hiossen / MegaGen / Dentium", "Value brands. Quality-vs-cost debate; opportunity in DSOs", "$80 – 150"]
  ],
  [2400, 5000, 1960]
));
body.push(P("", { after: 120 }));
body.push(P("The dentist charges the patient $2,000–4,000+ per implant. That spread is exactly why cost usually isn't the surgeon's first question — lead with outcomes, ease of use, prosthetic flexibility, your availability and the evidence.", { after: 140 }));
body.push(RICH([{ t: "The cycle runs 3–12 months: ", b: true }, { t: "awareness (lunch-and-learn), education (CE course, often manufacturer-sponsored), trial (a few cases with your support), conversion, then loyalty. Systems are sticky because instruments and surgical kits are system-specific and expensive, there's a real learning curve to switch, and compatibility is a problem. Hard to win an account — very hard to lose one.", c: INK }]));

body.push(H2("Bone grafting"));
body.push(P("Extraction means the bone resorbs, and implants need volume and density. Hence socket preservation at extraction, sinus lifts for upper posterior implants, and ridge augmentation on deficient sites.", { after: 120 }));
body.push(table(
  ["Graft type", "What it is", "Price"],
  [
    ["Autograft", "Patient's own bone — gold standard, but needs a second surgical site", "—"],
    ["Allograft", "Processed cadaver bone. LifeNet, MTF, AlloSource", "$100 – 500"],
    ["Xenograft", "Animal, usually bovine. Bio-Oss (Geistlich) leads. Slow resorption maintains volume", "$150 – 400"],
    ["Alloplast", "Synthetic — hydroxyapatite, calcium phosphate. Unlimited supply, no disease risk", "—"],
    ["Membranes", "Cover the graft to guide regeneration. Bio-Gide, Cytoplast; PTFE must be removed", "$30 – 200"]
  ],
  [1800, 5600, 1960]
));
body.push(P("", { after: 120 }));
body.push(RICH([{ t: "The angle: ", b: true }, { t: "every extraction is a potential graft. Higher implant success with adequate bone, better patient comfort, and it's billable revenue for the practice.", c: INK }]));

// ---------- 2.5 ----------
body.push(H1("Session 2.5 — Aligners and orthodontics"));
body.push(RICH([{ t: "Invisalign holds ~90% of the clear aligner market.", b: true }, { t: " Digital scan (iTero preferred), AI treatment planning in ClinCheck, aligners manufactured centrally and shipped to the practice, patient wears 20–40+ sequentially and changes every 1–2 weeks.", c: INK }]));
body.push(P("$1,500–2,000 per case to the dentist; the patient pays $3,500–8,000. The dentist submits cases and pays per case.", { after: 140 }));
body.push(RICH([{ t: "Strengths: ", b: true }, { t: "nearly invisible, removable, digital and predictable, fewer office visits. ", c: INK }, { t: "Limits: ", b: true }, { t: "complex cases are harder, compliance is critical at 22 hours a day, and they can't fix severe skeletal discrepancies.", c: INK }]));
body.push(P("Competitors run 20–30% cheaper: ClearCorrect (Straumann), SureSmile (Dentsply Sirona), uLab, Spark (Ormco). The growth is GPs doing more ortho, a growing teen market, and adults — who are over half the aligner market.", { after: 140 }));
body.push(RICH([{ t: "Traditional supplies: ", b: true }, { t: "brackets metal or ceramic, self-ligating or conventional, $5–20 each (Ormco, 3M Unitek, American Orthodontics). Wires are NiTi early for shape memory and flexibility, stainless steel stiffer at final stages, sizes .012 through .018 increasing in stiffness. Orthodontists see a lot of reps, buy in volume, and are brand loyal once established.", c: INK }]));

// ---------- 2.6 ----------
body.push(H1("Session 2.6 — Who owns what"));
body.push(P("Knowing the parent company tells you who else is in the room, and why two products integrate.", { color: MUTED, after: 140 }));
body.push(table(
  ["Parent", "Brands"],
  [
    ["Dentsply Sirona", "Largest pure-play dental company (XRAY). Astra Tech and Ankylos implants, CEREC, Schick sensors, Prime & Bond / Aquasil / Caulk, Maillefer endo files, SureSmile and TP orthodontics"],
    ["Envista", "Spun off from Danaher: Nobel Biocare, Ormco, KaVo Kerr"],
    ["Align Technology", "Invisalign, iTero, exocad. Pure-play digital dentistry — which is why iTero and Invisalign integrate so tightly"],
    ["Straumann Group", "Straumann implants (#1), Neodent value implants, ClearCorrect aligners, digital acquisitions"],
    ["3M Health Care", "Filtek composites, Scotchbond adhesives, RelyX cements, Unitek orthodontics"],
    ["Planmeca", "Finnish, family-owned. Imaging (pano, CBCT) and CAD/CAM. Known for innovation"],
    ["Henry Schein / Patterson / Benco", "Distributors, with some own-manufacturing and private label brands"]
  ],
  [2400, 6960]
));
body.push(P("", { after: 140 }));
body.push(H2("Building a battle card"));
body.push(P("For each competitor: price comparison, feature differences, clinical evidence, service and support differences, why practices choose them — and why practices leave them. That last one is the most useful and the one everybody skips.", { after: 120 }));
body.push(P("Research it by asking practices what else they're using, attending Chicago Midwinter and the ADA annual, LinkedIn, product catalogs, and clinical studies.", { color: MUTED }));

// ---------- close ----------
body.push(RULE());
body.push(RICH([
  { t: "All of this is in the game: ", b: true },
  { t: "stmurray333.github.io/dental-flashcards — 149 questions and 158 cards across both days. Filter to Day 2, and use the Flag button on anything you want to come back to.", c: INK }
]));
  return body;
};
