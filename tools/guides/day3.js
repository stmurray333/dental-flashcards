/*
 * Day 3 study guide content.
 *
 * To add a new day: copy this file, change the masthead text and the blocks,
 * then run  node tools/build-guide.js day4
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;


exports.outputName = "Dental Sales - Day 3 Study Guide.docx";

exports.blocks = function () {
const body = [];

body.push(...K.masthead(
  "Day 3 — Who You're Actually Selling To",
  "Sessions 3.1 – 3.6. Reworked from Zachary Murray's notes, 31 July 2026."
));

body.push(H1("The whole thing in one table"));
body.push(P("Every account you walk into is one of these. The headcounts tell you where your time goes.", { color: MUTED }));
body.push(table(
  ["Who", "How many (US)", "Earns", "What they buy from you"],
  [
    ["General dentists", "~130,000 (80%)", "$500K–$2M production", "Everything, in volume — composites, bonding, gloves, anesthetics, x-rays, chairs, handpieces"],
    ["Orthodontists", "~12,000", "$300–500K+", "Brackets and wires, aligners, adhesives, elastics, scanners"],
    ["Pediatric dentists", "~10,000", "—", "Small instruments, fluoride and sealants in volume, sedation"],
    ["Oral surgeons", "~9,000", "$400–700K+", "Implants (500–2,000/yr), grafts (200–500/yr), surgical instruments, sutures"],
    ["Endodontists", "~5,500", "—", "Rotary NiTi files, obturation, microscopes, apex locators"],
    ["Periodontists", "~5,000", "—", "Scalers, regenerative materials, membranes, soft tissue lasers"],
    ["Prosthodontists", "~5,000", "—", "Impression materials, CAD/CAM, implant prosthetic components"]
  ],
  [1900, 1500, 1500, 4460]
));
body.push(P("", { after: 120 }));
body.push(RICH([{ t: "General dentists dwarf everything else. ", b: true }, { t: "That's why they're called the bread and butter — and why the specialists, though richer per head, are a smaller pool.", c: INK }]));

body.push(H1("Session 3.1 — General dentists"));
body.push(RICH([{ t: "80% of the profession, producing $500K to $2M a year, with overhead at 65–75% of collections. ", b: true }, { t: "That overhead number is the most useful fact about a GP: it's why every conversation eventually comes back to cost and return.", c: INK }]));
body.push(H2("Who actually decides"));
body.push(BUL("Solo practice — the dentist owns it and decides. But they consult the office manager on operations and budget, the lead assistant on product preferences, and the hygienist on preventive products."));
body.push(BUL("Group practice (2–10 dentists) — often a managing partner, decisions are more democratic, the office manager has more power, and the cycle is longer because consensus takes time."));
body.push(P("Build the relationship with the owner, but respect the team. They shape what gets asked for.", { color: MUTED }));
body.push(H2("What they buy"));
body.push(BUL("Consumables in volume: composites, bonding agents, gloves, masks, barriers, anesthetics, prophy supplies, impression materials."));
body.push(BUL("Equipment: digital x-rays and pano, intraoral cameras, chairs when renovating, handpieces, and increasingly intraoral scanners."));
body.push(BUL("Emerging: clear aligners, implant systems, CAD/CAM, soft tissue lasers — all work they used to refer out. That shift is where the growth is."));
body.push(H2("What keeps them up at night"));
body.push(P("Overhead creeping up. Keeping the hygienist profitable. Case acceptance — getting patients to say yes. Competition from DSOs and insurance plans. Staff turnover. Supply chain reliability.", { after: 140 }));
body.push(H2("How you win"));
body.push(BUL("Consistent visits, and emergency availability — \"I need composite today\" is the moment you earn an account."));
body.push(BUL("Know their numbers: production goals, collection percentage, new patient flow, hygiene schedule, insurance vs fee-for-service mix."));
body.push(BUL("Sell growth, not product: \"same-day crowns = no temp visits = more productive time.\""));
body.push(BUL("Timing: mornings before patients or lunch. Avoid mid-afternoon. Fridays are often short days and good for longer conversations."));
body.push(RICH([{ t: "\"GPs are like the starting lineup — on the field every day, they need reliable equipment, and small improvements make big differences in their stats.\"", i: true, c: MUTED }]));

body.push(H1("Session 3.2 — Orthodontists"));
body.push(RICH([{ t: "~12,000 of them, seeing 30–50 patients a day with 200–500+ active cases. ", b: true }, { t: "Volume and efficiency define everything about how they buy.", c: INK }]));
body.push(H2("What they buy"));
body.push(BUL("Brackets and wires are the core — 200–500+ starts a year, and they're brand loyal because they trained on a system."));
body.push(BUL("Self-ligating brackets: Damon, SmartClip. Higher up-front cost, claimed efficiency."));
body.push(BUL("Clear aligners: most are Invisalign providers, tiered Bronze → Platinum → Diamond by cases per year."));
body.push(BUL("Imaging: cephalometric (lateral skull), panoramic, CBCT for impactions and airway, and intraoral scanners now near universal."));
body.push(BUL("Software: treatment planning like Dolphin, practice management, patient portals."));
body.push(H2("Why they're hard to get into"));
body.push(P("They see a lot of reps and are popular targets — many have outright \"no rep\" policies. And switching bracket systems is expensive: learning curve plus inventory.", { after: 140 }));
body.push(H2("How you win"));
body.push(RICH([{ t: "Lead with efficiency. Time is money. ", b: true }, { t: "\"Self-ligating reduces chair time by 30%.\" Then case outcomes with before/after evidence, and patient experience — comfort, aesthetics, speed. Do lunch-and-learns for the whole team, sponsor local events, support their marketing.", c: INK }]));
body.push(RICH([{ t: "\"Orthodontists are like elite training programs — high volume, systematic, efficiency-obsessed.\"", i: true, c: MUTED }]));

body.push(H1("Session 3.3 — Oral surgeons"));
body.push(RICH([{ t: "~9,000, the highest-earning dental specialty at $400–700K+. ", b: true }, { t: "Four to six years of extra training including hospital rotations, and hospital privileges so they can do general anesthesia. Referral-based — GPs send them the work.", c: INK }]));
body.push(H2("The volumes that matter"));
body.push(table(
  ["What", "How much"],
  [
    ["Implants placed", "500 – 2,000+ per surgeon per year"],
    ["Bone grafts", "200 – 500+ per year"],
    ["Cases per day", "10 – 30"],
    ["Operatories", "4 – 8, office-based surgery suites"]
  ],
  [2600, 6760]
));
body.push(P("", { after: 120 }));
body.push(P("Bread and butter is impacted wisdom teeth. Scope runs from extractions through implants, bone grafting, sinus lifts, orthognathic jaw surgery, facial trauma, pathology, TMJ and anesthesia.", { after: 140 }));
body.push(H2("How you win"));
body.push(BUL("Clinical credibility above everything. They're the most surgeon-like specialty — evidence-based, and outcomes beat cost within reason. Do not lead with price."));
body.push(BUL("Be present: attend surgeries if allowed, stock emergency inventory locally, and provide support mid-procedure."));
body.push(BUL("Help them get referrals. Co-market lunch-and-learns at GP offices — \"if you use our implant system, I'll help educate your referring docs.\" You're solving their growth problem, not selling a box."));
body.push(BUL("Service: 24/7 emergency availability, fast shipping, technical support during surgery."));
body.push(RICH([{ t: "Three relationships: ", b: true }, { t: "the surgeon decides, the office manager holds purchasing and budget, and the lead surgical assistant drives product preference. Ignore the third at your peril.", c: INK }]));

body.push(H1("Session 3.4 — Periodontists"));
body.push(RICH([{ t: "~5,000, three years post-dental school, focused on gums, bone and implants. ", b: true }, { t: "Referral-based, and hygiene-driven — those 3-month maintenance recalls are the financial engine of the practice.", c: INK }]));
body.push(H2("What they buy"));
body.push(BUL("Surgical instruments: scalers and curettes in many variations, periodontal probes, elevators, scissors, microsurgical instruments."));
body.push(BUL("Regenerative materials: bone grafts, GTR membranes, and growth factors — Emdogain, PDGF — at roughly $200–500 per procedure."));
body.push(BUL("Lasers: soft tissue lasers are very popular, and the LANAP protocol is a genuine marketing advantage for the practice."));
body.push(BUL("Ultrasonic scalers: magnetostrictive or piezo. The tips and inserts are the repeat consumable."));
body.push(P("Sell on outcomes — bone preservation, predictability, regeneration evidence — and on aesthetics, since soft tissue grafts are about the pink around the tooth. They value advanced technique, so support CE and study clubs.", { after: 120 }));
body.push(RICH([{ t: "\"Periodontists are like specialized position coaches — deep expertise in one area, meticulous technique, long-term relationships.\"", i: true, c: MUTED }]));

body.push(H1("Session 3.5 — The smaller specialties, and DSOs"));
body.push(H2("Endodontists, prosthodontists, pediatric"));
body.push(BUL("Endodontists (~5,500) do only root canals, 10–15 cases a day. Rotary NiTi files, obturation with gutta percha, microscopes at very high adoption, apex locators, ultrasonic tips. Brand loyal, narrow range — a deep but limited account."));
body.push(BUL("Prosthodontists (~5,000) handle complex restorations — dentures, implant prosthetics, full mouth rehabs. Heavy impression material use, CAD/CAM, prosthetic components, lab supplies. Very technical, quality-focused."));
body.push(BUL("Pediatric dentists (~10,000) treat children often through 18. Smaller instruments, high-volume fluoride and sealants, sedation supplies, flavoured materials. Sell on safety and comfort."));
body.push(H2("DSOs — the consolidators"));
body.push(P("Corporate groups owning or managing anywhere from 10 practices to over 2,000. They are a completely different animal from a solo GP.", { after: 120 }));
body.push(table(
  ["DSO", "Scale"],
  [
    ["Heartland Dental", "1,800+ practices"],
    ["Aspen Dental", "1,000+"],
    ["Pacific Dental Services", "—"],
    ["Great Expressions", "—"],
    ["Western Dental", "—"]
  ],
  [3200, 6160]
));
body.push(P("", { after: 120 }));
body.push(RICH([{ t: "Purchasing is centralized. ", b: true }, { t: "Corporate headquarters decides, product lists are standardized, and individual offices have little autonomy — so pitching the treating dentist mostly doesn't work. You go through regional or national buying groups, an RFP process, and annual contracts. Decision makers are the Chief Dental Officer and procurement teams.", c: INK }]));
body.push(BUL("Pros: massive volume, long-term contracts, predictable ordering."));
body.push(BUL("Cons: heavy price pressure, slow decisions, contract cycles that are hard to break into, much less relationship-based."));
body.push(P("Academic institutions — 65 dental schools plus teaching hospitals — are slower still (committee decisions) and expect volume discounts, but students trained on your system become customers for a career.", { after: 120 }));

body.push(H1("Session 3.6 — Building a customer profile"));
body.push(P("For every practice type, work out these five:", { after: 120 }));
body.push(table(
  ["Element", "The question"],
  [
    ["Avatar", "Who's the decision maker?"],
    ["Pain points", "What keeps them up at night?"],
    ["Goals", "What are they trying to achieve?"],
    ["Buying triggers", "What causes them to actually purchase?"],
    ["Your value", "Why you?"]
  ],
  [2200, 7160]
));
body.push(P("", { after: 140 }));
body.push(H2("Worked example — a solo GP"));
body.push(RICH([{ t: "Dr. Sarah, 45. ", b: true }, { t: "Owns the practice 15 years, 3 hygiene days a week, produces $1.2M a year.", c: INK }]));
body.push(BUL("Pain points: overhead creeping up, insurance reimbursement down, needs more cosmetic cases, staff turnover."));
body.push(BUL("Goals: increase revenue without adding days, attract more fee-for-service patients, work-life balance."));
body.push(BUL("Buying triggers: equipment breaks, wants to add a new service, or a competitor down the street upgraded."));
body.push(BUL("Your value: reliable service, help with case acceptance, financing options, training for the team."));
body.push(RICH([{ t: "That third trigger is the underrated one. ", b: true }, { t: "Keep track of who's buying what nearby — a competitor upgrading is the cheapest lead you'll ever get.", c: INK }]));

body.push(...K.closer("stmurray333.github.io/dental-flashcards — filter to Day 3 for these questions."));

  return body;
};
