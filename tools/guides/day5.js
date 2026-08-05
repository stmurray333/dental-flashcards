/*
 * Day 5 study guide content.
 *
 * To add a new day: copy this file, change the masthead text and the blocks,
 * then run  node tools/build-guide.js day6
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;




exports.outputName = "Dental Sales - Day 5 Study Guide.docx";

exports.blocks = function () {
const body = [];

body.push(...K.masthead(
  "Day 5 — The Fundamentals",
  "Sessions 6.1 – 6.5. Reworked from Zachary Murray's notes, 5 August 2026."
));

body.push(RICH([{ t: "\"Technical skills in sales are like fundamentals in sport. The athletes who dominated weren't always the most talented — they were the most fundamentally sound.\"", i: true, c: MUTED }], { after: 200 }));

body.push(H1("Session 6.1 — Sounding credible without pretending"));
body.push(RICH([{ t: "The challenge: you are not a dentist, but you have to talk dentistry convincingly. ", b: true }, { t: "Sound knowledgeable without pretending to be a clinician — they see through it instantly. You're the analyst, not the coach.", c: INK }]));
body.push(H2("Say this, not that"));
body.push(table(
  ["Instead of", "Say"],
  [
    ["\"This thing works great\"", "\"The hydrophilic properties ensure accuracy even in a moist environment\""],
    ["\"It's really strong\"", "\"The flexural strength of 350 MPa provides excellent resistance to fracture\""],
    ["\"Patients like it\"", "\"We're seeing improved case acceptance because patients can visualize the outcome\""],
    ["\"It's easy to use\"", "\"The intuitive workflow reduces chair time by approximately 15 minutes per case\""]
  ],
  [2800, 6560]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "The pattern: convert every vague claim into a number, a mechanism, or a business outcome.", b: true }]));

body.push(H2("The five-part product conversation"));
body.push(BUL("Clinical indication — \"ideal for Class II posterior restorations where you need high compressive strength.\""));
body.push(BUL("Technique consideration — \"most clinicians find the packable consistency easier to contour in tight contacts.\""));
body.push(BUL("Evidence base — \"the 5-year study in JDR showed 96% survival in high-stress posterior applications.\""));
body.push(BUL("Problem solving — \"if you're seeing post-op sensitivity, the low shrinkage stress addresses that.\""));
body.push(BUL("Patient outcome — \"patients appreciate the faster set time, less chair time with their mouth open.\""));

body.push(H2("Presenting a case"));
body.push(RICH([{ t: "Bad: ", b: true }, { t: "\"This implant is great! Look at this successful case!\"", i: true, c: MUTED }]));
body.push(RICH([{ t: "Good: ", b: true }, { t: "\"68-year-old female, missing #30, Type 3 bone quality. He used our 4.1 by 10mm implant with the SLA surface. At 8 weeks the ISQ was 72, restored at 12 weeks. Patient is 6 months out with no bone loss on radiographs.\"", i: true, c: MUTED }]));
body.push(P("Specific details, appropriate terminology, realistic timeline, hard evidence, and a case they recognise from their own chair.", { after: 140 }));

body.push(H2("When you don't know the answer"));
body.push(RICH([{ t: "Never ", b: true }, { t: "make one up, never say \"I think...\" if you don't know, never pretend to understand. One bluff that gets caught costs the account permanently.", c: INK }]));
body.push(BUL("\"Great question — let me connect you with our clinical specialist.\""));
body.push(BUL("\"I want to make sure I give you accurate information. Can I research that and get back to you by end of day?\""));
body.push(BUL("Then actually follow through, fast, and document the answer for next time."));

body.push(H1("Session 6.2 — ROI presentations"));
body.push(H2("The financial language of a practice"));
body.push(table(
  ["Metric", "What it is", "Healthy target"],
  [
    ["Production", "Total services provided, before insurance adjustments", "$50–100K+/month solo GP"],
    ["Collections", "Money actually received (production × collection %)", "95%+ collection rate"],
    ["Overhead", "All expenses as a % of collections", "60–65%. Over 75% = struggling"],
    ["Profit", "Collections minus overhead", "35–40% of collections"]
  ],
  [1600, 4600, 3160]
));
body.push(P("", { after: 120 }));
body.push(P("Example snapshot: $1.2M collections, $780K overhead (65%), $420K profit (35%). Your job is to show how your product improves that equation.", { color: MUTED, after: 160 }));

body.push(H2("Three worked ROIs"));
body.push(table(
  ["", "Intraoral scanner", "CEREC", "Soft tissue laser"],
  [
    ["Year 1 cost", "$33,000", "$136,000", "$13,500"],
    ["Annual benefit", "$75,600", "$177,000 extra profit", "$50,400"],
    ["Payback", "6.2 months", "9 months", "3.2 months"],
    ["Main driver", "Case acceptance 60% → 75%", "Keeping $50K of lab fees in-house", "New billable procedures"]
  ],
  [1700, 2700, 2700, 2260]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "How to say the scanner number out loud: ", b: true }, { t: "\"Based on your current crown volume, this pays for itself in about 6 months. After that you're adding roughly $77K annually. That's like having a half-day per week of production added to your schedule without working any extra hours.\"", i: true, c: MUTED }]));

body.push(H2("Two arguments people forget"));
body.push(RICH([{ t: "Time value. ", b: true }, { t: "A PVS impression takes 15 minutes; a digital scan takes 5. At $400/hour a dentist is worth $6.67 a minute, so 10 minutes saved is $66.70 per case — about $2,000/month across 30 cases. \"That's 5 hours a month you can reinvest, or honestly, leave early on Fridays.\"", c: INK }]));
body.push(RICH([{ t: "Opportunity cost. ", b: true }, { t: "Referring 5 implants a month at $2,500 is $150,000 a year walking out the door. Capture 3 of 5 and that's $90,000 back on a $15,000 system. The cost of NOT buying is often your strongest number.", c: INK }]));
body.push(P("And for owners near retirement: practices sell for roughly 70–100% of annual revenue, so $100K of added recurring revenue can add $75K+ to the sale price.", { after: 120 }));
body.push(RICH([{ t: "Conservative estimates win trust. ", b: true }, { t: "\"This will triple your revenue\" gets you dismissed. \"Based on industry averages and your current case volume, a conservative estimate shows...\" gets you heard.", c: INK }]));

body.push(H1("Session 6.3 — Objection handling"));
body.push(RICH([{ t: "\"In sports, the opponent plays defense — they're supposed to. Your job isn't to overcome objections like an enemy, but to understand them like a coach.\"", i: true, c: MUTED }]));
body.push(H2("First, identify the type"));
body.push(BUL("Real — budget, timing, technical compatibility, staff readiness."));
body.push(BUL("Smoke screen — \"I need to think about it,\" \"send me information,\" \"call me next quarter.\""));
body.push(BUL("Misunderstanding — \"it won't work with our system,\" \"my patients won't pay for that.\""));
body.push(H2("Then run the framework"));
body.push(table(
  ["Step", "What you do"],
  [
    ["1. Listen completely", "Don't interrupt. Let them finish. Scout before you game plan."],
    ["2. Acknowledge", "\"That's a fair question.\" \"Other doctors have raised that too.\" Never \"you're wrong.\""],
    ["3. Clarify and probe", "\"Tell me more about that.\" \"What specifically concerns you?\""],
    ["4. Respond with value", "Address the specific concern with evidence, solutions and stories."],
    ["5. Confirm and advance", "\"Does that address your concern?\" Don't re-argue a point you've made."]
  ],
  [2200, 7160]
));
body.push(P("", { after: 140 }));

body.push(H2("Three techniques worth memorising"));
body.push(RICH([{ t: "Feel, Felt, Found. ", b: true }, { t: "\"I understand how you feel. Dr. Martinez felt the same way — she worried about slowing down her schedule. What she found was that after three cases she was faster than before.\"", c: INK }]));
body.push(RICH([{ t: "Boomerang. ", b: true }, { t: "Turn the objection into the reason to buy. \"Too expensive\" → \"that's exactly why — it pays for itself in 6 months.\" \"No time to learn it\" → \"that's exactly why — you'll recapture 10 hours a month.\" \"My practice is too small\" → \"perfect — smaller practices see faster ROI because every case has bigger impact.\"", c: INK }]));
body.push(RICH([{ t: "Trial close. ", b: true }, { t: "\"If we can solve the price concern with financing, is there anything else preventing us from moving forward?\" If they say no, that was the real objection. If they raise another, you know there are several.", c: INK }]));

body.push(H1("Session 6.4 — Navigating the practice"));
body.push(P("Every practice has a formal power structure and an informal one. Map both early — the org chart is not the influence map.", { color: MUTED, after: 140 }));
body.push(table(
  ["Who", "Why they matter", "What they care about"],
  [
    ["Front desk", "Controls access. Can facilitate or block every visit", "Being respected. \"Is this a good time or should I come back?\""],
    ["Office manager", "Budget authority, evaluates vendors, negotiates", "Cost savings, efficiency, reliability, payment terms"],
    ["Dental assistants", "Use your products daily, test them first, tell the doctor", "Ease of use, consistency, availability, cleanup, ergonomics"],
    ["Hygienists", "Revenue generators; the doctor respects their clinical view", "Efficacy, evidence, patient comfort, time efficiency"],
    ["Dentist / owner", "Final say, sets vision, controls budget", "ROI, clinical outcomes, patient satisfaction, quality of life"]
  ],
  [1700, 3800, 3860]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "Informal power: ", b: true }, { t: "long-tenured staff (\"we've always done it this way\"), the doctor's spouse in family practices, whoever actually places the orders, and whoever the doctor trusts most.", c: INK }]));

body.push(H2("When to show up"));
body.push(BUL("DON'T: drop in unannounced during patient hours, visit during lunch (the staff's only break), or come when they're running behind."));
body.push(BUL("DO: morning huddle 7:30–8:00 if invited, mid-morning 10:00–10:30 on a slow day, lunch if you're buying it, end of day 4:00–5:00, or after hours for a real presentation."));
body.push(P("Or just call ahead: \"What's a good time this week that won't interrupt patient flow?\"", { color: MUTED, after: 140 }));

body.push(H2("The 15–20 minute visit"));
body.push(P("Greeting (2 min) → check-in with office manager or lead assistant (3 min) → value add: new product, clinical tip, samples (5 min) → doctor face time if available (5 min, don't overstay) → close out and confirm next visit (2 min).", { after: 140 }));

body.push(H2("Difficult personalities"));
body.push(BUL("The skeptical doctor — bring studies, not sales talk. \"Let's look at the evidence together.\" Use other skeptics as references."));
body.push(BUL("The indecisive doctor — simplify, narrow the options, comparison chart, gently set a deadline. \"What would help you feel confident deciding?\""));
body.push(BUL("The price-focused office manager — total cost of ownership, hidden costs of cheap products, cost of downtime."));
body.push(BUL("The know-it-all assistant — make them the expert. \"What's your experience with...\" Fighting them poisons the well."));

body.push(H1("Session 6.5 — When things go wrong"));
body.push(RICH([{ t: "How you handle problems defines the relationship more than how you sell. ", b: true }, { t: "Products fail, shipments get delayed, complications happen. Everyone has those; not everyone handles them well.", c: INK }]));

body.push(H2("A clinical complication — the delicate one"));
body.push(BUL("Listen without defensiveness. \"Tell me what happened — walk me through the case.\""));
body.push(BUL("Do NOT blame the doctor, even if it looks technique-related."));
body.push(BUL("Support immediately — get your clinical specialist to review the case with them."));
body.push(BUL("Review systematically: patient factors (smoking, diabetes, bone quality), surgical protocol, implant factors, healing factors."));
body.push(BUL("Honour the warranty, and be there for the replacement surgery."));
body.push(BUL("The learning conversation comes later, gently, once trust is restored."));
body.push(RICH([{ t: "Complications happen even with perfect technique. Your support during difficulty is what earns loyalty.", b: true }]));

body.push(H2("Response tiers"));
body.push(table(
  ["Tier", "What", "Response"],
  [
    ["1 — Emergency", "Out of critical supplies, equipment down, patient scheduled", "Same day. Drop everything."],
    ["2 — Urgent", "Running low, pricing for a pending case, performance question", "Within 24 hours"],
    ["3 — Routine", "Regular reorder, information request, scheduling", "Within 48 hours"]
  ],
  [1900, 4600, 2860]
));
body.push(P("", { after: 120 }));
body.push(RICH([{ t: "The rule: always respond faster than you promised. ", b: true }, { t: "Say 24 hours, deliver in 12.", c: INK }]));

body.push(H2("Saying no, and owning mistakes"));
body.push(RICH([{ t: "When you can't approve a discount: ", b: true }, { t: "not \"sorry, I can't.\" Instead — \"here's what I can do within my authority. For anything beyond that I'll need manager approval. What's your target number so I know what to request?\"", c: INK }]));
body.push(RICH([{ t: "When you made the mistake: ", b: true }, { t: "own it immediately and honour the price you quoted. Never blame the customer, never blame your company, never avoid the conversation. Honesty here builds more trust than a flawless quote would have.", c: INK }]));

body.push(H2("Metrics to hold yourself to"));
body.push(BUL("Order accuracy: 98%+"));
body.push(BUL("On-time delivery: 95%+"));
body.push(BUL("Customer retention: 90%+ annually"));
body.push(BUL("Account growth: 10–15% year over year"));

body.push(...K.closer("stmurray333.github.io/dental-flashcards — filter to Day 5, or listen to track 5 and quiz 11."));

  return body;
};
