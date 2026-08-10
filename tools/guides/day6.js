/*
 * Day 6 study guide content — BioHorizons.
 *
 * Built from two source documents Zachary sent on 10 August 2026:
 *   - the Ron Dubois (SVP Sales) recruiting session notes
 *   - lessons 27–37, sessions 1.2 through 1.5
 * Combined and reorganised into: company, technology, products, role, market, talk track.
 *
 * Layout helpers all live in ../guide-kit.js — don't restyle here.
 */

const { Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = require("docx");
const K = require("../guide-kit");
const { P, RICH, H1, H2, BUL, RULE, table } = K;
const INK = K.INK, MUTED = K.MUTED, ACCENT = K.ACCENT;

exports.outputName = "Dental Sales - Day 6 Study Guide (BioHorizons).docx";

exports.blocks = function () {
const body = [];

body.push(...K.masthead(
  "Day 6 — BioHorizons",
  "Both BioHorizons documents combined and reorganised. 10 August 2026."
));

body.push(RICH([{ t: "Days 1–5 were the industry. This one is the company. There's no exam date on it — the goal is being able to say all of this in your own words, out loud, to someone who already knows dentistry.", i: true, c: MUTED }], { after: 200 }));

/* ------------------------------------------------------------------ */
body.push(H1("1 — The company"));

body.push(RICH([{ t: "Founded 1994", b: true }, { t: ", out of the University of Alabama at Birmingham. Dr. Carl Misch — a major figure in implant dentistry — is cited as founder. First patent 1996, first implant sold 1997. That academic origin is the credibility story: this didn't start as a manufacturing play, it started in a dental school.", c: INK }]));

body.push(H2("How they describe themselves"));
body.push(RICH([{ t: "A complete oral reconstructive device company", b: true }, { t: " — a \"full indication provider\" across three pillars:", c: INK }]));
body.push(BUL("Dental implants"));
body.push(BUL("Biologics and tissue regeneration"));
body.push(BUL("Digital dentistry"));
body.push(P("The point of the phrase is that a clinician can rely on them across many protocols rather than buying one product from them and the rest elsewhere.", { after: 140 }));

body.push(H2("The timeline"));
body.push(table(
  ["Year", "What happened", "Why it matters"],
  [
    ["1994", "Founded at UAB", "Academic origin, clinical credibility"],
    ["1996–97", "First patent, first implant sold", "Three years from idea to market"],
    ["2004", "Internal hex design", "Stronger, better seal than external hex"],
    ["2007", "Laser-Lok", "The differentiator. Everything else supports this"],
    ["2015", "TeethXpress, Vulcan Custom Dental, acquired Precision One", "Full arch, milling, and vertical integration"],
    ["2019", "Tapered Internal, progressive conical", "The current workhorse"],
    ["2024", "Tapered Pro Conical", "Catching up to a ~60% conical market"]
  ],
  [1100, 4400, 3860]
));
body.push(P("", { after: 140 }));

body.push(H2("Four facts worth having ready"));
body.push(BUL("Owned by Henry Schein — the resources of a major player, still run as an implant specialist. This is already on your companies map."));
body.push(BUL("Grade 23 titanium alloy."));
body.push(BUL("Largely US-manufactured — they claim to be the only US-made implant brand, roughly 99%. Acquiring Precision One is what made that possible, and it means fewer back orders."));
body.push(BUL("The market had ~30 companies when Ron Dubois started and has ~300 now, many of them low-cost Asian manufacturers. That's the pressure the evidence base defends against."));

body.push(H2("Pipeline"));
body.push(P("A holistic implant — delayed on supply chain, possibly relaunching late 2026 or 2027. A zygomatic / pterygoid implant expected roughly a month after the recruiting talk.", { after: 140 }));

/* ------------------------------------------------------------------ */
body.push(H1("2 — Laser-Lok"));

body.push(RICH([{ t: "This is the one to know cold. ", b: true }, { t: "A whole interview question is just \"what do you know about Laser-Lok,\" and the notes say directly that knowing it well will impress them.", c: INK }]));

body.push(H2("The problem"));
body.push(P("A natural tooth has connective tissue attachment through the periodontal ligament — the gum physically attaches, and that seals out bacteria.", { after: 80 }));
body.push(P("A traditional implant has none of that. Tissue just leans against smooth titanium. Over time the epithelium migrates down along the implant toward the bone — a highway for bacteria. That leads to peri-implantitis, bone loss, and eventually failure risk.", { after: 140 }));

body.push(H2("The solution"));
body.push(table(
  ["Element", "Detail"],
  [
    ["What it is", "Laser-ablated microchannels in the titanium surface"],
    ["Spacing", "8–12 microns — sized for connective tissue fibers"],
    ["Where", "A 3mm band on the implant collar, where tissue meets titanium. Some abutments too"],
    ["The response", "Fibers grow INTO the channels — physical attachment, not just contact"],
    ["The result", "A biological seal that blocks epithelial downgrowth and maintains biologic width"]
  ],
  [2200, 7160]
));
body.push(P("", { after: 140 }));

body.push(H2("The evidence"));
body.push(BUL("Over 100 peer-reviewed studies."));
body.push(BUL("Confirmed histologically — actual tissue samples showing perpendicular collagen fiber orientation into the surface. \"This isn't marketing, it's histologically proven science.\""));
body.push(RICH([{ t: "Crestal bone loss: 1mm or less, versus 1.5–2mm or more with competitors — maintained over 5+ years.", b: true }]));
body.push(BUL("Reduced peri-implantitis — lower inflammation markers, less bleeding on probing."));
body.push(BUL("Better aesthetics — maintained papilla, stable soft tissue, less recession."));

body.push(H2("Say it out loud, roughly like this"));
body.push(RICH([{ t: "\"Think about a natural tooth — the gum attaches through connective tissue fibers, and that seals out bacteria. A traditional implant has no attachment; the tissue just leans against smooth titanium, and over time the epithelium migrates down like a highway for bacteria.\"", i: true, c: MUTED }]));
body.push(RICH([{ t: "\"Laser-Lok creates microscopic channels sized for those fibers to grow into and attach. We've seen it histologically — perpendicular collagen fibers going into the surface. The result is 1mm or less bone loss versus 1.5 to 2mm.\"", i: true, c: MUTED }], { after: 140 }));

body.push(H2("Competitor counters"));
body.push(table(
  ["They use", "Their surface", "Your response"],
  [
    ["Straumann", "SLA — sandblasted, acid-etched. Excellent bone integration, body only, no collar", "\"Great for bone — but what about tissue?\""],
    ["Nobel Biocare", "TiUnite — anodized, bone-level, no soft tissue technology", "\"We focus on both bone and tissue\""],
    ["Astra Tech", "OsseoSpeed — fluoride-modified, conical seal, some tissue claims", "\"We have the most extensive tissue attachment research\""],
    ["Value brands", "Basic surfaces, no proprietary tissue technology", "\"You can't replicate 100+ studies and proprietary laser technology\""]
  ],
  [1500, 3900, 3960]
));
body.push(P("", { after: 140 }));

body.push(H2("Where it matters most"));
body.push(BUL("Anterior aesthetics — visible zone, papilla preservation, premium fees."));
body.push(BUL("Thin biotype patients — higher recession risk."));
body.push(BUL("Immediate placement and loading — needs a fast, good seal."));
body.push(BUL("Smokers and diabetics — higher risk, need the seal."));
body.push(BUL("High-end restorative — full arch, can't afford tissue complications."));

/* ------------------------------------------------------------------ */
body.push(H1("3 — The products"));

body.push(H2("Tapered Internal — the workhorse"));
body.push(BUL("Tapered body mimics a natural root — better primary stability, easier in extraction sockets, less bone stress."));
body.push(BUL("3.5mm internal hex, platform-switched, anti-rotational. Stronger and better sealed than external hex, so less microleakage."));
body.push(BUL("3mm Laser-Lok collar on the neck."));
body.push(BUL("Square threads, progressive depth, self-tapping — works in all bone types 1 through 4."));

body.push(H2("Sizes"));
body.push(table(
  ["Diameter", "Use"],
  [
    ["3.0mm", "Narrow — lower anteriors, tight spaces"],
    ["3.8mm", "Standard — most common for anteriors"],
    ["4.6mm", "Standard — most common for posteriors"],
    ["5.7mm", "Wide — molars, low-density bone"]
  ],
  [1800, 7560]
));
body.push(P("Lengths: 8, 9, 10.5, 12, 13.5 and 15mm. 10.5 and 12 are the most common; 8mm for limited bone height, 15mm when there's good bone.", { after: 140 }));

body.push(H2("Size by tooth"));
body.push(table(
  ["Tooth", "Implant"],
  [
    ["Lateral incisor", "3.8 × 10.5–12mm"],
    ["Central incisor", "3.8–4.6 × 12–13.5mm"],
    ["Canine", "3.8–4.6 × 13.5mm"],
    ["Premolar", "4.6 × 10.5mm"],
    ["Molar", "4.6–5.7 × 10.5–12mm"]
  ],
  [2400, 6960]
));
body.push(RICH([{ t: "Canines take the longest implant because they have the longest roots — that's straight back to Day 1 anatomy.", i: true, c: MUTED }], { after: 140 }));

body.push(H2("The rest of the line"));
body.push(table(
  ["Product", "What it does"],
  [
    ["SmartShape Healers", "Shapes and grooms soft tissue at placement. ~7–8 appointments down to 2–4"],
    ["Simply Smiles", "Bundled, guided framework — all-in-one packaging efficiency"],
    ["Single yellow platform", "One internal platform across implants — simplifies inventory and components"],
    ["Taper Short Conical", "For limited room; can avoid some grafting"],
    ["TeethXpress", "Full-arch offering, launched 2015"],
    ["Vulcan Custom Dental", "In-house milling service"]
  ],
  [2600, 6760]
));
body.push(RICH([{ t: "Be precise on SmartShape: ", b: true }, { t: "fewer visits, not faster biology. Total case time is still 2–4 months because healing takes what it takes. The value is chair time and practice revenue speed.", c: INK }], { after: 140 }));

/* ------------------------------------------------------------------ */
body.push(H1("4 — The role"));

body.push(P("Associate Territory Manager → Territory Manager → Senior / Executive TM → Sales Director. The ATM role exists explicitly as a feeder into TM — it's there so someone can go deeper into accounts, support high-value specialty practices, and spend more time with referring doctors than a senior rep can.", { after: 140 }));

body.push(H2("Training"));
body.push(table(
  ["Window", "What you're doing"],
  [
    ["First 30 days", "Self-study and live webinars"],
    ["60–90 days", "Observation, territory dynamics, one week live in Birmingham, Alabama"],
    ["90–180 days", "Field support, working with referral doctors"],
    ["6–12 months", "Your own closes, your own part of a territory"]
  ],
  [2000, 7360]
));
body.push(P("", { after: 140 }));

body.push(H2("Compensation"));
body.push(table(
  ["Level", "Money"],
  [
    ["ATM", "Base ~$50–80K, about $125K total"],
    ["Territory Manager", "Uncapped from dollar one, average $175–200K"],
    ["Top performer", "Over $500K last year"]
  ],
  [2400, 6960]
));
body.push(P("Lower base, high variable, accelerators after quota. Monthly commissions plus a quarterly bonus — private-practice orders are placed directly and pay the following month, much faster than PO-based hospital work.", { after: 140 }));

body.push(H2("What you're measured on"));
body.push(BUL("Sales quota — monthly, quarterly, annual."));
body.push(BUL("New accounts — typically 3 to 5 per quarter."));
body.push(BUL("Account penetration — your share of that dentist's implant volume."));
body.push(BUL("Activity — calls, demos, evaluations."));
body.push(BUL("Customer satisfaction — retention and complaint resolution time."));

body.push(H2("What the promotion data actually says"));
body.push(P("The ATM role is new. 11 ATMs came on last year, 2 have already been elevated to TM, and a third may be by Q3. Ron listed the real promotion rate as something worth verifying — so it's fair to ask.", { after: 140 }));

body.push(H2("What separates the fast movers"));
body.push(RICH([{ t: "Act like a TM before you are one. ", b: true }, { t: "Engage deeply and quickly with accounts, stay highly professional, know what you want, communicate strongly, and focus on goals you can actually hit.", c: INK }]));
body.push(P("Lifestyle: less on-call burden than most device roles, some weekend trade shows, most days about 8 to 6.", { after: 140 }));

/* ------------------------------------------------------------------ */
body.push(H1("5 — How BioHorizons goes to market"));

body.push(H2("Specialists, not GPs"));
body.push(RICH([{ t: "A high-volume GP places about 150 implants a year. A specialty practice places about 2,000.", b: true }]));
body.push(P("GPs were the historic market, but the strategic focus is oral surgeons and periodontists. The highest-value accounts are groups of 3–4 providers. Converting a non-implanting GP takes a lot of time and produces low loyalty — a cheaper competitor shows up and they switch.", { after: 140 }));

body.push(H2("The referral triangle"));
body.push(BUL("Patient starts with their general dentist."));
body.push(BUL("GP refers to a specialist for placement."));
body.push(BUL("Patient goes back to the GP for the crown."));
body.push(P("So you sell to the specialist, but you also have to support their referring GPs. You become an extension of the specialist's practice.", { after: 140 }));

body.push(H2("The growth idea in one line"));
body.push(RICH([{ t: "Grow your business by growing the doctor's business.", b: true }]));
body.push(P("Concretely: help an oral surgeon go from 150 referring GPs to 200–250, using CE, workflow tools and technology so those GPs feel comfortable sending more cases.", { after: 140 }));

body.push(H2("Education is the engine"));
body.push(P("800–900 CE courses a year — lunch-and-learns, evening programs, larger symposiums. They exist for loyalty, adoption, expanding treatment types, supporting referrals, and patient acceptance.", { after: 80 }));
body.push(RICH([{ t: "When a practice isn't placing enough implants it's usually a presentation problem, not a demand problem. ", b: true }, { t: "Case acceptance improves when the staff explain need and benefit well — not when the price drops. BioHorizons supports that with staff CE and third-party financing.", c: INK }], { after: 140 }));

body.push(H2("How dental buying differs from ortho"));
body.push(BUL("Practices buy inventory up front — a new office might start with 30–50 implants plus surgical kits."));
body.push(BUL("They sterilize their own instruments. No tray-per-case model."));
body.push(BUL("Consignment is mainly for large-volume, high-impact, specialty-heavy accounts — zygomatic especially, where intraoperative needs vary."));

body.push(H2("Getting in the door"));
body.push(BUL("Start with the front desk, and treat them with the same respect as the doctor."));
body.push(BUL("Be creative about timing — early before clinic, lunch, after-work social, CE events, trade shows."));
body.push(BUL("If you can't reach the specialist, build excitement with their referral doctors first. They may pull you into the account."));
body.push(BUL("Academic play: GPR, oral surgery and perio residencies — sawbones, lectures, sometimes cadaver labs. Clinicians stay comfortable with what they trained on."));
body.push(RICH([{ t: "Adoption order: efficiency gets their attention first, ROI closes it, clinical outcomes underpin both.", b: true }], { after: 140 }));

/* ------------------------------------------------------------------ */
body.push(H1("6 — The talk track"));

body.push(P("These came from the interview-prep session. There's no interview on the calendar, so treat them as the questions you should be able to answer out loud, in your own words, without notes.", { after: 140 }));

body.push(H2("\"Why dental sales?\""));
body.push(P("Competitive and performance-driven, like athletics — but it isn't only numbers. It's helping clinicians improve outcomes, it rewards long-term relationships and real clinical knowledge, and the products give people back their smile and their confidence.", { after: 140 }));

body.push(H2("\"Why BioHorizons?\" — three reasons"));
body.push(BUL("Laser-Lok — 100+ studies, a real differentiator you can speak to with confidence."));
body.push(BUL("Market position — premium quality at a more accessible price than Straumann or Nobel."));
body.push(BUL("Henry Schein backing — the resources of a major player, still focused as an implant specialist."));
body.push(RICH([{ t: "\"I want to sell products I believe in for a company positioned to win.\"", i: true, c: MUTED }], { after: 140 }));

body.push(H2("STAR"));
body.push(P("Situation, Task, Action, Result. Set the context, say what needed doing, say what YOU did, give the outcome with a number if you have one. Have three to five of these ready.", { after: 140 }));

body.push(H2("\"How do you handle rejection?\""));
body.push(BUL("Feel it — don't pretend it doesn't sting."));
body.push(BUL("Analyze it — wrong approach, wrong timing, or just not a fit?"));
body.push(BUL("Adjust — what changes next time?"));
body.push(BUL("Move on — dwelling doesn't help, the next opportunity does."));
body.push(RICH([{ t: "\"Rejection from one customer doesn't define my value.\"", i: true, c: MUTED }], { after: 140 }));

body.push(H2("\"Sell me against a dentist who uses Straumann\""));
body.push(RICH([{ t: "Don't lead with \"switch.\" ", b: true }, { t: "It's combative, and Straumann is genuinely excellent. Ask what percentage of their cases are anterior aesthetics, and whether they've ever had an implant integrate beautifully and still fail aesthetically from recession. Then: keep Straumann posterior, try BioHorizons on the next anterior case.", c: INK }]));
body.push(P("You're asking for one case, not their business. Low risk for them, and the case type where Laser-Lok is most likely to show.", { after: 140 }));

body.push(H2("\"Where do you see yourself in five years?\""));
body.push(P("A top-performing territory manager — consistently over quota, strong relationships, a genuine clinical resource with expertise in digital workflows and guided surgery. The rep surgeons call for complex case planning, not just orders. Open to leadership, but earned through results first.", { after: 80 }));
body.push(RICH([{ t: "Avoid: ", b: true }, { t: "\"I want your job\" (opportunistic) and \"I don't know\" (no ambition).", c: INK }], { after: 140 }));

body.push(H2("\"How do you stay organized?\""));
body.push(BUL("CRM logged the same day. If it's not in the CRM it didn't happen."));
body.push(BUL("Sunday planning for the week ahead."));
body.push(BUL("Top three must-dos every morning."));
body.push(BUL("A/B/C account segmentation — weekly, bi-weekly, monthly."));
body.push(BUL("Follow-ups live in the calendar, never in your memory."));
body.push(BUL("Monthly pipeline review."));

body.push(H2("Always have questions for them"));
body.push(BUL("\"What does success look like in the first 90 days? The first year?\""));
body.push(BUL("\"What do your top performers do differently?\""));
body.push(BUL("\"What's the training like for someone coming from outside dental?\""));
body.push(BUL("\"Who am I primarily competing against in this territory?\""));
body.push(BUL("\"What's kept you at BioHorizons?\""));

body.push(H2("Showing up"));
body.push(P("Business professional — a suit for a first interview, business casual for a field ride. Firm handshake, eye contact, sit up straight, lean in slightly. Enthusiastic without overdoing it. Arrive 15 minutes early. Bring resumes, references, a notepad and your questions. Have three to five STAR stories, a 60-second elevator pitch, and Laser-Lok rehearsed.", { after: 140 }));

body.push(...K.closer("stmurray333.github.io/dental-flashcards — filter to Day 6, and use the type-it-in mode. That's the one that makes you produce the answer instead of recognising it."));

  return body;
};
