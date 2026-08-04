/*
 * Day 4 study guide content.
 *
 * To add a new day: copy this file, change the masthead text and the blocks,
 * then run  node tools/build-guide.js day5
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;



exports.outputName = "Dental Sales - Day 4 Study Guide.docx";

exports.blocks = function () {
const body = [];

body.push(...K.masthead(
  "Day 4 — The Three Sales Cycles",
  "Sessions 4.1 – 4.4. Reworked from Zachary Murray's notes, 4 August 2026."
));

body.push(H1("The whole module in one table"));
body.push(P("Everything you sell runs on one of three clocks. Same territory, three different jobs.", { color: MUTED }));
body.push(table(
  ["", "Consumables", "Equipment", "Implants / specialty"],
  [
    ["Cycle length", "1–4 weeks", "3–12 months", "1–6 months"],
    ["Price range", "$50 – 5,000", "$5,000 – 500,000", "$200 – 2,000 per case"],
    ["Decision maker", "Office mgr + dentist", "Owner / partners", "Surgeon / dentist"],
    ["Relationship", "Transactional + relationship", "Consultative", "Clinical partnership"],
    ["Repeats", "Weekly / monthly", "Years (replacement)", "Per case, ongoing"],
    ["Your role", "Supplier", "Consultant", "Clinical partner"],
    ["Key skill", "Reliability", "ROI development", "Clinical credibility"],
    ["Commission", "Lower, 5–15%", "Higher, varies", "Moderate, 10–25%"]
  ],
  [1500, 2300, 2600, 2960]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "Know which cycle you're in before you open your mouth. ", b: true }, { t: "Pitching ROI to an office manager buying gloves wastes both your afternoons; leading with price to an implant surgeon loses the account.", c: INK }]));

body.push(H1("Session 4.1 — Consumables: 1 to 4 weeks"));
body.push(H2("The four weeks"));
body.push(BUL("Week 1 — relationship building. Initial contact, needs assessment, intel on their current supplier, product introduction."));
body.push(BUL("Weeks 2–3 — trial and trust. Samples, comparison against what they use now, addressing concerns, rapport with the staff."));
body.push(BUL("Week 4 — close and onboard. Pricing proposal, first order, account setup, reorder schedule."));
body.push(H2("Then it becomes a rhythm"));
body.push(table(
  ["Cadence", "What you do"],
  [
    ["Weekly", "Check in, take orders, deliver anything urgent, and gather intel: \"What else are you using?\" / \"Anyone else calling on you?\" / \"How's X working out?\""],
    ["Bi-weekly", "Deeper inventory review, introduce new products, solve problems — \"the composite is too thick,\" \"gloves keep ripping\""],
    ["Monthly", "Buy the team lunch, usage reports, contract review, value-add materials"],
    ["Quarterly", "Business review, volume discounts, equipment needs, renewals"]
  ],
  [1700, 7660]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "Those bi-weekly complaints are gifts. ", b: true }, { t: "A rep who fixes the glove problem replaces the glove supplier.", c: INK }]));
body.push(H2("What makes you hard to replace"));
body.push(BUL("Reliability. When they call, you answer. When they need it today, you deliver. No excuses, solutions only."));
body.push(BUL("Indispensability. Know their inventory better than they do — \"you're probably running low on...\""));
body.push(BUL("Defending your turf. Competitors are calling and will undercut you. \"Sure, they're 5% cheaper — but can they deliver emergency orders on Saturday?\""));

body.push(H2("Objection handling"));
body.push(table(
  ["They say", "You say"],
  [
    ["\"Your price is too high\"", "Compare total cost of ownership, factor in service and reliability, offer volume discounts. \"What's the cost of running out mid-day?\""],
    ["\"We're happy with our supplier\"", "Never badmouth them. \"Would you be open to a backup supplier?\" or \"What would it take to earn some of your business?\""],
    ["\"We're cutting costs\"", "\"Let me audit your inventory — I bet I can find savings.\" Consolidate suppliers, cut waste."]
  ],
  [2600, 6760]
));
body.push(P("", { after: 140 }));

body.push(H2("Running the territory"));
body.push(table(
  ["Grade", "Monthly spend", "Visit"],
  [["A accounts", "$5,000+", "Weekly"], ["B accounts", "$2,000 – 5,000", "Bi-weekly"], ["C accounts", "Under $2,000", "Monthly"]],
  [2000, 3600, 3760]
));
body.push(P("", { after: 120 }));
body.push(P("Plus protected prospecting time. Track six numbers per account: monthly spend, breadth (how many categories), depth (primary or backup), mix (your margin), order frequency, and payment terms — that last one affects your commission.", { after: 120 }));

body.push(H1("Session 4.2 — Equipment: 3 to 12 months"));
body.push(P("Six phases: discovery, education and demo, proposal and ROI, negotiation, close and onboard, then the post-sale relationship.", { color: MUTED, after: 140 }));
body.push(H2("Phase 1 — the five qualifying questions"));
body.push(BUL("\"What's prompting you to look at this now?\" — broke, expanding, new associate, competitor has it, patient demand."));
body.push(BUL("\"What's your timeline?\" — emergency, this quarter, 6–12 months, or just researching."));
body.push(BUL("\"Who's involved in this decision?\" — solo or committee, office manager, accountant."));
body.push(BUL("\"What's your budget range?\" — they may not answer. Ask anyway."));
body.push(BUL("\"Have you thought about financing?\""));
body.push(H2("Phase 2 — four ways to demo"));
body.push(BUL("In their office, on real patients. Book 2–3 hours and have the team there — staff buy-in is critical."));
body.push(BUL("At your facility. Controlled, and you can show integration with other products."));
body.push(BUL("At another practice that already owns it. A peer testimonial is the most powerful version."));
body.push(BUL("Lunch-and-learn for the whole team. Education focus, not a pitch."));

body.push(H2("Phase 3 — the ROI, worked"));
body.push(P("This is where equipment deals are won. The CEREC example:", { after: 120 }));
body.push(table(
  ["", "", ""],
  [
    ["Investment", "Equipment", "$120,000"],
    ["", "Training", "$3,000"],
    ["", "Ceramic blocks, year 1", "$5,000"],
    ["", "Total", "$128,000"],
    ["Return", "20 crowns/mo × $250 lab fee saved", "$60,000/yr"],
    ["", "Emergency crowns, 5/mo × $1,000", "$60,000/yr"],
    ["", "Improved case acceptance", "$20,000/yr"],
    ["", "Total new revenue", "$140,000/yr"],
    ["", "Payback period", "Under 1 year"]
  ],
  [1600, 5000, 2760]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "That's the shape of every equipment pitch: ", b: true }, { t: "what it costs, what it returns, how fast it pays back. Financing options — lease (about $2,500/month on $120K, lower payment and a tax write-off), loan (they own it), or cash (rare, usually discounted). Present all three and let them choose.", c: INK }]));

body.push(H2("Phase 4 — negotiation"));
body.push(BUL("\"It's too expensive\" — revisit ROI, compare to the cost of NOT buying. \"What's the cost of referring these cases out?\""));
body.push(BUL("\"We need to think about it\" — find out what's really holding them back, then create urgency responsibly: year-end write-off, rate increase, rebate expiring."));
body.push(BUL("\"We're getting other quotes\" — welcome it. \"That's smart. What's most important to you in making this decision?\""));
body.push(BUL("\"We need to involve our accountant\" — offer to present to them too, and be patient."));
body.push(RICH([{ t: "Two rules. Add value instead of cutting price ", b: true }, { t: "— extended warranty, extra training, free consumables, priority service. And if you do concede, get something back: \"If I can get you to $X, can we move forward this week?\"", c: INK }]));

body.push(H2("Phases 5 and 6 — close, then the part that pays"));
body.push(P("Be present for the first cases at go-live. Then follow up at 1 week, 1 month, 3 months, 6 months, and annually. That's where referrals, upsells and service contracts come from.", { after: 120 }));
body.push(RICH([{ t: "And remember consumables attachment: ", b: true }, { t: "CEREC needs ceramic blocks, implants need surgical supplies, scanners cut impression material. Sell the machine once, sell what it eats forever.", c: INK }]));

body.push(H1("Session 4.3 — Implants: 1 to 6 months"));
body.push(RICH([{ t: "This is a clinical education sale. ", b: true }, { t: "Success rates matter, the surgeon's reputation is on the line, and complications are unacceptable. They can't casually \"try\" your system — the surgical technique, prosthetic workflow and case selection are all system-specific. Which is exactly why it's sticky once established.", c: INK }]));
body.push(H2("The five stages"));
body.push(table(
  ["Stage", "Weeks", "What happens"],
  [
    ["Awareness & interest", "1–4", "CE course you sponsor, conference, peer referral. \"Are you currently placing implants?\""],
    ["Education & training", "4–12", "Sponsored CE course — hands-on, lecture plus live surgery, usually free to attendees. Or mentorship with an existing user, which converts better."],
    ["Trial cases", "8–16", "You attend the surgery. Bring all components, talk through protocol, troubleshoot live, follow up post-op."],
    ["Commitment & inventory", "12–24", "Surgical kit at $5,000–15,000, stocked inventory, possible trade-in. Negotiate starter pricing, consignment, volume tiers."],
    ["Ongoing support", "Forever", "Attend complex cases, troubleshoot, train new staff, manage inventory."]
  ],
  [2200, 900, 6260]
));
body.push(P("", { after: 140 }));
body.push(RICH([{ t: "Start them on easy cases — single molar, good bone. ", b: true }, { t: "Not immediate placement, not grafting, not anterior aesthetics. Success builds confidence; an early failure kills the account.", c: INK }]));
body.push(P("And know why availability equals loyalty here: they call you when something goes wrong, and 3am calls happen because complications cause anxiety. Being reachable is as much the product as the implant is.", { after: 120 }));

body.push(H1("Session 4.4 — Which athlete are you?"));
body.push(BUL("Consumables — the point guard distributing assists. High activity, lots of accounts, organized, always available."));
body.push(BUL("Equipment — the chess player setting up the win. Strategic, patient, business acumen, presentation skills."));
body.push(BUL("Implants — the personal trainer. Clinical learner, comfortable with technical detail, depth over breadth."));

body.push(H2("Three scenarios worth rehearsing out loud"));
body.push(BUL("Consumables: \"Your competitor just offered us 20% off if we switch everything to them.\""));
body.push(BUL("Equipment: \"I like your CBCT, but it's $20K more than the competition.\""));
body.push(BUL("Implants: a surgeon had a complication with your implant — and it was surgical error, not the product."));
body.push(RICH([{ t: "That last one is the real test. ", b: true }, { t: "Show up, support them, help solve the case, and don't assign blame. Being right about fault and losing the account is still losing.", c: INK }]));

body.push(...K.closer("stmurray333.github.io/dental-flashcards — filter to Day 4, or listen to track 4 and quiz 9."));

  return body;
};
