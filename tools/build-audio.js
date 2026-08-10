#!/usr/bin/env node
/*
 * build-audio.js — turn the study material into tracks Zachary can listen to
 * while walking around.
 *
 *   node tools/build-audio.js scripts     # just write the narration .txt files
 *   node tools/build-audio.js say         # render with the built-in macOS voice
 *   node tools/build-audio.js eleven      # render with ElevenLabs (needs ELEVENLABS_API_KEY)
 *
 * Output goes to the shared Drive folder under /Audio, so it syncs to his phone.
 *
 * Track list:
 *   1-3  Day overviews, written for the ear rather than the eye
 *   4    Companies deep dive — the part he keeps losing points on
 *   5-8  Quizzes: question, pause to answer out loud, then the answer
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DRIVE = path.join(os.homedir(),
  "Library/CloudStorage/GoogleDrive-stmurray333@gmail.com/My Drive/Zachary - Dental Sales Training");
const AUDIO = path.join(DRIVE, "Audio");
const SCRIPTS = path.join(__dirname, "audio-scripts");

const content = JSON.parse(fs.readFileSync(path.join(ROOT, "content.json"), "utf8"));

/* ---------- make text speakable ---------- */

function speakable(s) {
  return String(s)
    .replace(/<br\s*\/?>/gi, ". ")
    .replace(/<\/li>/gi, ". ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&mdash;|&ndash;/g, ", ")
    .replace(/&rarr;/g, " then ")
    .replace(/&amp;/g, " and ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\bDSOs?\b/g, m => (m.endsWith("s") ? "D S Os" : "D S O"))
    .replace(/\bGPs?\b/g, m => (m.endsWith("s") ? "G Ps" : "G P"))
    .replace(/\bCBCT\b/g, "C B C T")
    .replace(/\bCAD\/CAM\b/g, "cad cam")
    .replace(/\bTADs?\b/g, m => (m.endsWith("s") ? "tads" : "tad"))
    .replace(/\bGTR\b/g, "G T R")
    .replace(/\bLANAP\b/g, "lay nap")
    .replace(/\biTero\b/g, "eye Tero")
    .replace(/\bNiTi\b/g, "nye tye")
    .replace(/\bRFP\b/g, "R F P")
    .replace(/\bROI\b/g, "R O I")
    .replace(/\bW-2\b/g, "W 2")
    .replace(/\bXRAY\b/g, "X ray")
    .replace(/#(\d)/g, "number $1")
    .replace(/~/g, "about ")
    .replace(/\$([\d,]+)K\b/gi, "$1 thousand dollars")
    .replace(/\$([\d.]+) ?million/gi, "$1 million dollars")
    .replace(/\$([\d,]+)\s*[-–]\s*([\d,]+)/g, "$1 to $2 dollars")
    .replace(/\$([\d,]+)/g, "$1 dollars")
    .replace(/(\d+)\s*[-–]\s*(\d+)\s*%/g, "$1 to $2 percent")
    .replace(/(\d+)\s*[-–]\s*(\d+)/g, "$1 to $2")
    .replace(/%/g, " percent")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .replace(/\.{2,}/g, ".")
    .trim();
}

/* ---------- narration ---------- */

const INTRO = "This is your dental sales study audio. Nothing to read, just listen. " +
  "If you can answer out loud before I do, you know it.";

const OVERVIEWS = {
  1: {
    title: "Day 1 - The Industry and the Mouth",
    text: [
      "Day one. The industry, the mouth, and what they buy.",
      "Start with distribution. Henry Schein is the largest dental distributor in the world, at about 40 percent of the market. Patterson is number two. Benco is number three. Those are the big three, and together they move about 80 percent of all consumables. Schein on its own is roughly the other two combined.",
      "The distributor is the quarterback of a dental office. You do not do the dentistry, but everything they use came through you.",
      "Now the money. This is the part that changes how you sell. The dentist usually owns the practice. Surgeons and physicians draw a salary. A dentist takes home what is left after costs. So every box you sell comes out of their own pocket.",
      "Dental insurance is not really insurance. It is a discount program with a low annual cap, and patients hit that cap fast. There is no Medicaid equivalent in dental. Dentures, crowns and veneers are normally out of pocket.",
      "Now the mouth. Front to back, food gets broken down in four stages. Incisors cut. Canines tear. Premolars crush. Molars grind. Eight incisors, four canines, eight premolars, twelve molars, or eight once the wisdom teeth come out.",
      "Canines have the longest roots in the mouth, which is why they are the last teeth to be lost. Molars have the highest decay rate because of the grooves and pits on top, which is why sealants exist.",
      "Underneath the teeth. Work outward from the deepest structure. Jaw bone, then alveolar bone, then gums, then teeth.",
      "The maxilla is the upper jaw. Less dense bone, and it contains the sinuses, which is why upper back implants often need a sinus lift first. The mandible is the lower jaw. Densest bone in the mouth, which makes it the best place to put an implant, but it contains an important nerve, so imaging matters.",
      "The single most useful fact in day one. When a tooth is lost, the alveolar bone resorbs. Use it or lose it. You can lose 40 to 60 percent of that bone in the first three years. That is why bone grafts sell alongside implants, and why timing matters.",
      "And the one people get wrong. Teeth are not bone, and they do not grow back. Enamel is the hardest substance in the body, harder than bone, but bone has a blood supply and heals, and enamel has neither. Once it is gone, the body cannot rebuild it. That single fact is the reason the entire preventive category exists.",
      "Conditions. Cavities are bacteria plus sugar making acid, and the acid demineralizes enamel. It goes white spot, enamel, dentin, then pulp. Healthy gums are 1 to 3 millimeter pockets with no bleeding. Gingivitis is reversible. Periodontitis is 4 millimeters and above with bone loss, and that does not reverse.",
      "Finally, the territory. You have about a 30 percent hit rate on the dentist actually being available when you walk in, so treat the staff as the real relationship. It takes 6 to 8 touches before you get consistent calls, and most reps quit at three. Consistency, follow up, and doing what you said you would do. Cheapest price wins one order. Being reliable wins the account."
    ]
  },
  2: {
    title: "Day 2 - Products, Capital and Implants",
    text: [
      "Day two. Consumables, capital equipment, implants and aligners.",
      "First, how product actually flows. Full service dealers move 80 percent of consumables. That is Henry Schein, Patterson and Benco again. They give a practice one stop shopping across ten thousand plus items, a rep who visits, equipment and consumables together, and financing.",
      "If you work for a dealer you are managing 50 to 150 practices. Your job is relationships, problem solving, and emergency orders.",
      "Then there are the discounters. Net 32, Dental Buyer, Amazon Business. Price focused, no service. You do not beat them on price. You beat them on service, emergency availability, and the relationship.",
      "What actually drives a consumables order? Reliability first. I need it tomorrow, can you deliver. Price matters but it is not always number one. Then consistency batch to batch, ease of ordering, and support.",
      "Now capital equipment. This is a different game. Five thousand to five hundred thousand dollars. Months, not days. Multiple people weigh in. Financing is almost always involved, and you have to prove return on investment.",
      "Learn these numbers. Intraoral sensors, 5 to 12 thousand dollars per operatory. Panoramic x ray, 20 to 80 thousand. C B C T, the 3D one, 60 to 150 thousand. Intraoral scanner, 20 to 40 thousand. A full CEREC cad cam system, 100 to 150 thousand. Soft tissue laser, 5 to 15 thousand. Hard tissue laser, 40 to 80 thousand. Autoclave, 3 to 15 thousand. Dental chair, 6 to 20 thousand each.",
      "C B C T is the game changer, because you can see bone in three dimensions. It lets a practice keep implant cases in house instead of referring them out, and they charge 200 to 400 dollars a scan, usually cash.",
      "CEREC mills a crown same day. It eliminates 150 to 300 dollars of lab fees per crown, so break even lands around 150 to 200 crowns.",
      "Now implants, a five billion dollar market and growing. Three parts. The fixture is the screw in the bone. The abutment connects. The crown is what you see. Surface treatment is what drives integration.",
      "Straumann is number one at about 20 percent of the implant market. Premium Swiss, deep evidence. Their implants cost the dentist 250 to 400 dollars, and the dentist charges the patient two to four thousand or more. That spread is exactly why cost is usually not the surgeon's first question.",
      "Nobel Biocare are the pioneers. Bronnemark invented the modern implant, and All on 4, a full arch on four implants, is their protocol. Value brands like Hiossen, Mega Gen and Dentium run 80 to 150 dollars.",
      "Implant systems are sticky. The instruments and surgical kits are system specific, there is a learning curve, and there are compatibility issues. Hard to win an account, very hard to lose one.",
      "Bone grafting. Four types. Autograft is the patient's own bone, the gold standard but it needs a second surgical site. Allograft is processed cadaver bone. Xenograft is animal, usually bovine, and Bio Oss by Geistlich leads that. Alloplast is synthetic, unlimited supply, no disease risk. Membranes cover the graft to guide regeneration.",
      "Aligners. Invisalign owns about 90 percent of the clear aligner market. A case costs the dentist 15 hundred to two thousand dollars, and the patient pays three and a half to eight thousand. The patient has to wear them 22 hours a day, so compliance is the biggest limitation."
    ]
  },
  3: {
    title: "Day 3 - Who You Are Actually Selling To",
    text: [
      "Day three. Who you are actually selling to.",
      "Start with scale, because it tells you where your time goes. General dentists, about 130 thousand in the US, 80 percent of the profession. Orthodontists, about 12 thousand. Pediatric dentists, about 10 thousand. Oral surgeons, about 9 thousand. Endodontists, about 5 and a half thousand. Periodontists, about 5 thousand. Prosthodontists, about 5 thousand.",
      "General dentists dwarf everyone. That is why they are the bread and butter.",
      "A G P practice produces 500 thousand to two million dollars a year, and here is the number that matters most. Overhead is 65 to 75 percent of collections. That is why every conversation eventually comes back to cost and return.",
      "In a solo practice the dentist owns it and decides, but they consult the office manager on budget, the lead assistant on product preferences, and the hygienist on preventive. Build the relationship with the owner, but respect the team, because they shape what gets asked for.",
      "What keeps a G P up at night? Overhead creeping up. Keeping the hygienist profitable. Case acceptance, getting patients to say yes. Competition from D S Os. Staff turnover.",
      "So sell growth, not product. Same day crowns means no temporary visits, which means more productive time. And show up in the morning before patients, or at lunch. Avoid mid afternoon.",
      "Orthodontists. About 12 thousand, earning three to five hundred thousand plus. They see 30 to 50 patients a day with two to five hundred active cases. Volume and efficiency define everything.",
      "Their core purchase is brackets and wires, two to five hundred starts a year, and they are brand loyal because they trained on a system. Self ligating brackets are Damon and Smart Clip. Most are Invisalign providers, tiered bronze, platinum, diamond by case volume.",
      "They are hard to get into. They see a lot of reps, many have no rep policies, and switching bracket systems is expensive. So lead with efficiency. Time is money. Anything that speeds up an appointment.",
      "Oral surgeons. About 9 thousand, the highest earning dental specialty at four to seven hundred thousand plus. Referral based, so G Ps send them the work. Their bread and butter is impacted wisdom teeth.",
      "The volumes are big. 5 hundred to two thousand implants a year per surgeon. Two to five hundred bone grafts a year.",
      "With oral surgeons, clinical credibility is everything. They are the most surgeon like specialty. Outcomes beat cost. Do not lead with price. And the best thing you can do for them is help them get referrals, by co marketing at G P offices.",
      "Three relationships matter. The surgeon decides. The office manager holds the budget. And the lead surgical assistant drives product preference. Do not ignore the third.",
      "Periodontists. About 5 thousand. Gums, bone and implants. Hygiene driven, because those three month maintenance recalls are the financial engine. They buy regenerative materials, growth factors like Emdogain, and soft tissue lasers. Lay nap is the laser periodontal therapy protocol.",
      "Then the smaller specialties. Endodontists do only root canals, 10 to 15 cases a day, and they are very brand loyal with a narrow product range. Prosthodontists do complex restorations and full mouth rehabs, very technical. Pediatric dentists treat children, high volume on fluoride and sealants, and you sell on safety and comfort.",
      "Finally, D S Os. Dental service organizations. Corporate groups owning anywhere from 10 practices to over two thousand. Heartland Dental has 18 hundred plus. Aspen Dental has a thousand plus. Then Pacific Dental Services, Great Expressions and Western Dental.",
      "Buying is centralized at corporate. Individual offices have almost no autonomy, so pitching the treating dentist does not work. You go through buying groups, an R F P, and annual contracts. Huge volume once you are in, but heavy price pressure and slow decisions.",
      "That is the whole customer map. Know which one you are walking into before you open your mouth."
    ]
  }
};

OVERVIEWS[4] = {
  title: "Day 4 - The Three Sales Cycles",
  text: [
    "Day four. The three sales cycles, and how differently each one works.",
    "Everything you sell falls into one of three cycles. Consumables take one to four weeks. Implants take one to six months. Equipment takes three to twelve months. Same territory, three completely different jobs.",
    "Start with consumables. Week one is relationship building. Initial contact, needs assessment, finding out who supplies them now. Weeks two and three are trial and trust, samples, comparing against what they use, building rapport with the staff. Week four you close. Pricing, first order, set up the account, and get a reorder schedule going.",
    "After that it is a rhythm. Every week you check in, take orders, deliver anything urgent, and gather intelligence. Three questions do that: what else are you using, is anyone else calling on you, and how is that product working out.",
    "Every other week, a deeper inventory review and problem solving. When someone says the composite is too thick or the gloves keep ripping, that is not a complaint, that is your opening.",
    "Monthly you buy the team lunch and review usage. Quarterly you do a business review and talk about equipment.",
    "Two ideas make you hard to replace. Reliability, meaning when they call you answer and when they need it today you deliver. And becoming indispensable, meaning you know their inventory better than they do and you tell them what they are about to run out of.",
    "Because competitors are calling, and they will undercut you on price. The answer is not to match it. Sure, they are 5 percent cheaper, but can they deliver an emergency order on a Saturday?",
    "Now objections. Price is too high? Compare total cost of ownership, not the sticker, and ask what it costs them to run out mid day. Happy with their current supplier? Never badmouth the competitor. Ask if they would be open to a backup supplier, and plant a seed for when a problem happens. Cutting costs? Offer to audit their inventory and find the savings for them.",
    "Manage your territory by grading accounts. A accounts spend five thousand a month or more, you visit weekly. B accounts, two to five thousand, every other week. C accounts, under two thousand, monthly. And keep real prospecting time in the calendar.",
    "Track six numbers per account. Monthly spend, breadth meaning how many categories, depth meaning whether you are primary or just the backup, mix meaning your margin, order frequency, and payment terms. That last one affects your commission, so it is not just accounting.",
    "Now equipment, the long game. Three to twelve months, six phases.",
    "Phase one is discovery. Five questions. What is prompting you to look at this now. What is your timeline. Who is involved in the decision. What is your budget range. And have you thought about financing.",
    "Phase two is education and demonstration. Four ways to demo. In their office on real patients, and block two to three hours with the whole team there. At your facility, more controlled. At another practice that already owns it, which is the most powerful because it is a peer telling them. Or a lunch and learn for the whole team.",
    "Phase three is the proposal and the ROI, and this is where equipment is won. Take CEREC. The investment is a hundred and twenty thousand for the machine, three thousand for training, five thousand in ceramic blocks the first year. A hundred and twenty eight thousand total.",
    "Now the return. They send twenty crowns a month to a lab at two hundred and fifty dollars each, so that is five thousand a month, sixty thousand a year they stop losing. Add emergency crowns they can now capture, five a month at a thousand dollars, another sixty thousand. Add better case acceptance, twenty thousand. A hundred and forty thousand a year in new revenue. Payback in under a year.",
    "That is the shape of every equipment pitch. What it costs, what it returns, how fast it pays back.",
    "Financing. A lease means lower payments and a tax write off, roughly twenty five hundred a month on a hundred and twenty thousand dollar machine. A loan means they own it. Cash is rare but usually earns a discount. Present all three, let them choose.",
    "Phase four, negotiation. When they say it is too expensive, go back to the ROI and ask what it costs to keep referring those cases out. When they say they need to think about it, find out what is actually holding them back. When they say they are getting other quotes, welcome it and ask what matters most to them.",
    "And the two rules of negotiating. Add value instead of cutting price, because a discount sets the anchor forever. And if you do concede, get something back. If I can get you to that number, can we move forward this week.",
    "Phase five is close and onboard, and be there for the first cases. Phase six is the post sale relationship, and this is where you actually make your money. Follow up at one week, one month, three months, six months, then annually. And remember every machine drags consumables behind it. CEREC needs ceramic blocks. Implants need surgical supplies.",
    "Last, the implant cycle. One to six months, and it is a clinical education sale. The surgeon's reputation is on the line, so outcomes matter more than price.",
    "Five stages. Awareness, where they meet you at a course or a conference. Education, usually a continuing education course your company sponsors, free to them, which is your marketing cost. Trial cases, and on the first one you attend the surgery, you bring every component, and you talk them through the protocol. Commitment, where they buy a surgical kit at five to fifteen thousand and stock inventory. And then support, forever.",
    "Start them on easy cases. Single molar, good bone. Not immediate placement, not grafting, not front teeth. Success builds confidence and an early failure kills the account.",
    "And know why availability equals loyalty here. They call you when something goes wrong, and three a.m. calls happen, because complications cause anxiety. Being reachable is as much the product as the implant is.",
    "So, three cycles. In consumables you are a supplier and the skill is reliability. In equipment you are a consultant and the skill is building the business case. In implants you are a clinical partner and the skill is credibility. Know which one you are in before you open your mouth."
  ]
};

OVERVIEWS[5] = {
  title: "Day 5 - The Fundamentals",
  text: [
    "Day five. The fundamentals. Clinical credibility, R O I presentations, objection handling, practice politics, and what to do when things go wrong.",
    "Start with clinical credibility. Here is the challenge. You are not a dentist, but you have to talk dentistry convincingly. Sound knowledgeable, but do not pretend to be a clinician, because they will see through it instantly. Think of yourself as a sports analyst. You understand the game, the strategy and the equipment deeply, but you are not trying to coach the players.",
    "The fastest upgrade is vocabulary. Instead of this thing works great, say the hydrophilic properties ensure accuracy even in a moist environment. Instead of it is really strong, say the flexural strength of 350 megapascals provides excellent resistance to fracture. Instead of patients like it, say we are seeing improved case acceptance because patients can visualize the outcome. Instead of it is easy to use, say the intuitive workflow reduces chair time by about 15 minutes per case.",
    "See the pattern. Every vague claim becomes a number, a mechanism, or a business outcome.",
    "When you talk about a product, hit five things. The clinical indication, what it is for. The technique consideration, how it handles. The evidence base, the actual study. The problem it solves. And the patient outcome.",
    "Same with cases. Do not say, look at this great case. Say, 68 year old female, missing number 30, type 3 bone quality. Four point one by ten millimeter implant with the S L A surface. I S Q was 72 at eight weeks, restored at twelve, six months out with no bone loss on radiographs. Specific, appropriate, and a case they recognize.",
    "And when a dentist asks something you cannot answer. Never make one up. Never say I think if you do not know. Say, great question, let me connect you with our clinical specialist. Or, I want to give you accurate information, can I get back to you by end of day. Then actually follow through. One bluff that gets caught costs you that account permanently.",
    "Now R O I presentations. To do this you need to speak their financial language.",
    "Production is total services provided before insurance adjustments. A solo general dentist should produce fifty to a hundred thousand a month. Collections is what actually comes in, and the goal is 95 percent or better. Overhead is all expenses as a percentage of collections, and healthy is 60 to 65 percent. Over 75 percent and they are struggling. Profit is what is left, and the goal is 35 to 40 percent.",
    "A typical snapshot. One point two million in collections, seven hundred eighty thousand in overhead at 65 percent, four hundred twenty thousand in profit. Your job is to show how your product improves that equation.",
    "Three worked examples. An intraoral scanner costs about thirty three thousand in year one. The big driver is case acceptance going from 60 percent to 75 percent, which on thirty presentations a month is about four and a half extra crowns, sixty four thousand eight hundred a year. Add saved impression material and fewer remakes, and total benefit is seventy five thousand six hundred. Payback, about six months.",
    "Here is how you say it out loud. Based on your crown volume this pays for itself in about six months. After that you are adding roughly seventy seven thousand a year. That is like adding a half day per week of production without working any extra hours.",
    "CEREC. A hundred thirty six thousand in year one. Staying lab based, they make about sixty thousand profit on two hundred crowns. With CEREC, about two hundred thirty seven thousand. That is a hundred seventy seven thousand a year difference, payback around nine months.",
    "A soft tissue laser is only thirteen thousand five hundred, and it opens new billable procedures. Frenectomies at four hundred dollars, gingivectomies at five to eight hundred, cosmetic recontouring at eight hundred to twelve hundred. Conservatively forty two hundred a month, fifty thousand a year. Payback about three months.",
    "Two arguments people forget. First, time value. A traditional impression takes fifteen minutes, a digital scan takes five. If a dentist produces four hundred dollars an hour, that is six dollars sixty seven a minute, so ten minutes saved is sixty six dollars per case, about two thousand a month. That is five hours they can reinvest, or honestly, leave early on Fridays.",
    "Second, opportunity cost, which is the cost of not buying. If they refer five implants a month at twenty five hundred each, that is a hundred fifty thousand a year walking out the door. Capture even three of five and that is ninety thousand back on a fifteen thousand dollar system.",
    "And one more for owners near retirement. Practices sell for roughly 70 to 100 percent of annual revenue. So adding a hundred thousand in recurring revenue can add seventy five thousand or more to the sale price.",
    "One rule on all of this. Conservative estimates win. This will triple your revenue gets you dismissed. Based on industry averages and your current case volume, a conservative estimate shows, gets you heard.",
    "Now objection handling. Objections are normal, even healthy. In sports the opponent plays defense, they are supposed to. Your job is not to overcome them like an enemy but to understand them like a coach.",
    "There are three types. Real objections, like budget or timing or staff readiness. Smoke screens, like I need to think about it, or send me some information. And misunderstandings, like it will not work with our system, or my patients will not pay for that. Work out which one you are facing before you answer.",
    "The framework is five steps. Listen completely, do not interrupt. Acknowledge and validate, that is a fair question. Clarify and probe, tell me more about that. Respond with value, evidence and stories. Then confirm and advance, does that address your concern. Never say you are wrong, and never re argue a point you already made.",
    "Three techniques worth memorizing. Feel, felt, found. I understand how you feel, doctor so and so felt the same way, but here is what they found. It validates the objection, adds social proof, and delivers the counter evidence without telling anyone they are wrong.",
    "The boomerang. Turn the objection into the reason to buy. Too expensive becomes, that is exactly why, it pays for itself in six months. No time to learn it becomes, that is exactly why, you get back ten hours a month. My practice is too small becomes, perfect, smaller practices see faster payback because every case matters more.",
    "And the trial close. If we can solve the price concern with financing, is there anything else preventing us from moving forward. If they say no, that was the real objection and you are close. If they raise another one, now you know there are several.",
    "Next, practice politics. Every practice has a formal power structure and an informal one, and the org chart is not the influence map.",
    "The front desk controls access. They can make your visits happen or quietly stop them. Learn their name and use it, and never go around them. The office manager has budget authority and cares about cost savings, efficiency, reliability and payment terms. Help them look good to the doctor and you have an advocate inside the building.",
    "Dental assistants use your products every single day. They test new things first and they tell the doctor, I like this composite. Ask their opinion, give them samples, respect their expertise. Hygienists are revenue generators and the doctor trusts their clinical judgment, so bring them evidence. And the dentist cares about R O I, clinical outcomes, patient satisfaction, practice growth and quality of life.",
    "Timing matters more than people think. Do not drop in during patient hours. Do not visit during lunch, that is the staff's only break, unless you are the one buying lunch. Do not come when they are running behind. Do come at the morning huddle if invited, mid morning on a slow day, end of day around four to five, or schedule after hours for a real presentation.",
    "A good routine visit is fifteen to twenty minutes. Two minutes greeting, three minutes checking in on any product issues, five minutes of actual value, five minutes with the doctor if available, two minutes to close out and confirm the next visit. Do not overstay.",
    "Finally, when things go wrong. And this is the part that matters most, because how you handle problems defines the relationship more than how you sell.",
    "If a product is defective, listen and empathize, gather the details, then take immediate action. Overnight a replacement today. Work out root cause afterward. Then repair the relationship, credit the account, and thank them for telling you.",
    "If an implant fails to integrate and the doctor is upset, this one is delicate. Listen without defensiveness. Do not blame the doctor, even if it looks like technique. Support them immediately, review it systematically, honor the warranty, and be there for the replacement surgery. Complications happen even with perfect technique. Your support during the difficulty is what earns loyalty.",
    "Response times have three tiers. Tier one is an emergency, same day, drop everything. Out of critical supplies, equipment down, a patient scheduled. Tier two is urgent, within twenty four hours. Tier three is routine, within forty eight. And the rule underneath all of it, always respond faster than you promised. Say twenty four hours, deliver in twelve.",
    "When you have to say no to a discount, do not say sorry I cannot. Say, here is what I can do within my authority, and for anything beyond that I need manager approval, what is your target number so I know what to ask for. And when you make a mistake, own it immediately and honor what you quoted. Never blame the customer, never blame your company.",
    "Hold yourself to real numbers. Order accuracy 98 percent or better. On time delivery 95 percent. Customer retention 90 percent a year. Account growth 10 to 15 percent.",
    "And the line that ties the whole module together. Technical skills in sales are like fundamentals in sport. The athletes who dominated were not always the most talented. They were the most fundamentally sound."
  ]
};

OVERVIEWS[6] = {
  title: "Day 6 - Bio Horizons",
  text: [
    "Day six. Bio Horizons. Days one through five were the industry. This one is the company. The company itself, Laser Lock, the products, the role, how they go to market, and the talk track.",
    "There is no interview on the calendar for this one. So the goal is different. The goal is being able to say all of this in your own words, out loud, to somebody who already knows dentistry. Listen for the shape of the arguments, not just the facts.",
    "Start with the company. Bio Horizons was founded in 1994, out of the University of Alabama at Birmingham. Doctor Carl Mish, a major figure in implant dentistry, is cited as the founder. First patent in 1996, first implant sold in 1997. That academic origin is the credibility story. This did not start as a manufacturing play. It started in a dental school.",
    "They describe themselves as a complete oral reconstructive device company. A full indication provider. Three pillars. Dental implants. Biologics and tissue regeneration. And digital dentistry. The point of that phrase is that a clinician can rely on them across a lot of protocols, instead of buying one product from them and everything else somewhere else.",
    "The timeline is short and worth knowing. 1994, founded. 2004, the internal hex design. 2007, Laser Lock, and that is the big one. 2015, three things at once, Teeth Express for full arch, Vulcan Custom Dental for milling, and they acquired Precision One. 2019, the Tapered Internal and progressive conical. And 2024, the Tapered Pro Conical.",
    "Why the move to conical. Less micromovement, so less bone loss and less risk of loosening. About 60 percent of the industry was already on conical, so that one was catching up, not leading.",
    "Four facts to have ready. Bio Horizons is owned by Henry Schein. You already know Henry Schein from the companies map, the one name that is both a mover and a maker. So Bio Horizons has the resources of a major player but still runs as an implant specialist. Second, grade 23 titanium alloy. Third, they are largely U S manufactured, and they claim to be the only U S made implant brand, roughly 99 percent. Buying Precision One is what made that possible, and it means fewer back orders because they make their own product. And fourth, the market had about 30 companies when Ron Dubois started and has about 300 now, a lot of them low cost overseas manufacturers. That pressure is exactly what the evidence base defends against.",
    "Now Laser Lock. This is the one to know cold. There is a whole interview question that is just, what do you know about Laser Lock, and the notes say directly that knowing it well will impress them. So slow down here.",
    "First the problem. A natural tooth has connective tissue attachment through the periodontal ligament. The gum physically attaches, and that attachment seals out bacteria. A traditional implant has none of that. The tissue just leans against smooth titanium. And over time the epithelium migrates down along the implant toward the bone. That becomes a highway for bacteria. Which leads to peri implantitis, then bone loss, then failure risk.",
    "Now the solution. Laser Lock is laser ablated microchannels cut into the titanium. The spacing is 8 to 12 microns, and that is not arbitrary, that is sized for connective tissue fibers. It sits in a three millimeter band on the implant collar, which is exactly where tissue meets titanium. Some abutments have it too.",
    "And here is the response. The fibers grow into the channels. Into them. That is physical attachment, not just contact. And that creates a biological seal that blocks the epithelium from growing down and maintains biologic width.",
    "The evidence. Over one hundred peer reviewed studies. Confirmed histologically, meaning actual tissue samples showing perpendicular collagen fiber orientation going into the surface. That is the line. This is not marketing, it is histologically proven science.",
    "And here is the number to memorize. One millimeter or less of crestal bone loss, versus one and a half to two millimeters or more with competitors. Maintained over five years or more. If you remember one number out of this whole day, remember that one.",
    "There is more. Reduced peri implantitis, with lower inflammation markers and less bleeding on probing. And better aesthetics, maintained papilla, stable soft tissue, less recession.",
    "Now say it out loud, roughly like this. Think about a natural tooth. The gum attaches through connective tissue fibers, and that seals out bacteria. A traditional implant has no attachment. The tissue just leans against smooth titanium, and over time the epithelium migrates down like a highway for bacteria. Laser Lock creates microscopic channels sized for those fibers to grow into and attach. We have seen it histologically, perpendicular collagen fibers going into the surface. The result is one millimeter or less of bone loss versus one and a half to two.",
    "Practice that until it is automatic.",
    "Now the competitor counters, because they will come up. If the dentist uses Straumann, their surface is S L A, sandblasted and acid etched. It is excellent for osseointegration, but it is on the implant body, not the collar, and there are no tissue attachment claims. So your line is, great for bone, but what about tissue.",
    "If they use Nobel Biocare, that is Ti Unite. Anodized, bone level design, no specific soft tissue technology. Your line is, we focus on both bone and tissue.",
    "If they use Astra Tech, that is Osseo Speed. Fluoride modified, conical seal, and some tissue claims. Your line is, we have the most extensive tissue attachment research.",
    "And if they use a value brand, basic surface, no proprietary tissue technology. Your line is, you cannot replicate one hundred plus studies and proprietary laser technology.",
    "Where does Laser Lock matter most. Five places. Anterior aesthetics, the visible zone, where papilla preservation supports premium fees. Thin biotype patients, who have higher recession risk. Immediate placement and loading, which needs a fast, good seal. Smokers and diabetics, higher risk, they need the seal. And high end restorative, full arch, where you cannot afford tissue complications.",
    "Now the products. The flagship is the Tapered Internal. That is the workhorse, the most versatile and the most prescribed.",
    "Why tapered. Because it mimics a natural tooth root. Better primary stability, easier placement in extraction sockets, and less aggressive threading means less bone stress. The connection is a three point five millimeter internal hex, platform switched and anti rotational, which is stronger than external hex and seals better, so less microleakage. The neck carries the three millimeter Laser Lock collar. And the threads are square, progressive depth, self tapping, so it works in all bone types, one through four.",
    "Four diameters. Three point oh millimeter is narrow, for lower anteriors and tight spaces. Three point eight is standard, and it is the most common for anteriors. Four point six is standard, most common for posteriors. And five point seven is wide, for molars and low density bone.",
    "Lengths are eight, nine, ten point five, twelve, thirteen point five, and fifteen millimeters. Ten point five and twelve are the most common. Eight is for limited bone height, fifteen when there is good bone available.",
    "Now sizing by tooth, and these are worth memorizing. Lateral incisor, three point eight by ten point five to twelve. Central incisor, three point eight to four point six by twelve to thirteen point five. Canine, three point eight to four point six by thirteen point five. Premolar, four point six by ten point five. Molar, four point six to five point seven by ten point five to twelve.",
    "Notice the canine takes the longest implant. That is because the canine has the longest root. That is straight back to day one anatomy.",
    "The rest of the line. Smart Shape Healers shape and groom the soft tissue at the time of placement, which cuts chair time and visits. The claim is roughly seven to eight appointments down to two to four. But be precise about this one. Total case time is still two to four months, because healing takes what healing takes. Fewer visits, not faster biology. The value is chair time and how fast the practice gets paid.",
    "Simply Smiles is a bundled, guided framework, an all in one packaging play. The single yellow internal platform across implants simplifies inventory and restorative components, versus a practice juggling several platform sizes and colors. The Taper Short Conical is for patients with limited room, and it can avoid some grafting. Teeth Express is the full arch offering. And Vulcan Custom Dental is their in house milling service.",
    "Now the role. The path is Associate Territory Manager, to Territory Manager, to Senior or Executive T M, to Sales Director. The A T M role exists as a feeder into T M. It is there so somebody can go deeper into accounts, support the high value specialty practices, and spend more time with the referring doctors than a senior rep can.",
    "Training runs in four windows. First thirty days is self study and live webinars. Sixty to ninety days is observation and territory dynamics, including one week live in Birmingham, Alabama. Ninety to one eighty is field support, working with referral doctors. And six to twelve months you are doing your own closes and running your own part of a territory.",
    "Compensation. An A T M is roughly fifty to eighty thousand base, about one hundred twenty five thousand total. A Territory Manager is uncapped from dollar one and averages one seventy five to two hundred thousand. And the top performer cleared over five hundred thousand last year. Lower base, high variable, accelerators after quota. You are paid monthly commissions plus a quarterly bonus, and because most private practice orders are placed directly, you get paid the following month. That is much faster than P O based hospital work.",
    "What they measure. Sales quota, monthly, quarterly and annual. New accounts, typically three to five a quarter. Account penetration, meaning your share of that dentist's implant volume. Activity metrics, calls and demos and evaluations. And customer satisfaction, retention and how fast you resolve complaints.",
    "One honest note on promotion. The A T M role is new. Eleven A T Ms came on last year, two have already been elevated to T M, and a third might be by Q three. Ron listed the real promotion rate as something worth verifying, so it is completely fair to ask about it.",
    "What separates the fast movers. Act like a T M before you are one. Engage deeply and quickly with accounts, stay highly professional, know what you want, communicate strongly, and focus on goals you can actually hit. And on lifestyle, there is less on call burden than most device roles, some weekend trade shows, and most days run about eight to six.",
    "Now how they go to market, and this is the strategic part. Here is the number that drives everything. A high volume general dentist places about one hundred fifty implants a year. A specialty practice places about two thousand.",
    "So even though general dentists were the historic market, the strategic focus is specialists. Oral surgeons and periodontists. And the highest value accounts are groups of three to four providers. Converting a general dentist who does not place implants takes a lot of time and produces low loyalty, because a cheaper competitor shows up and they switch.",
    "Understand the referral triangle. The patient starts with their general dentist. The general dentist refers to a specialist for placement. Then the patient goes back to the general dentist for the crown. So you sell to the specialist, but you also have to support their referring general dentists. You become an extension of the specialist's practice.",
    "Which gives you the whole growth idea in one line. Grow your business by growing the doctor's business. Concretely, help an oral surgeon go from one hundred fifty referring general dentists to two hundred or two fifty, using continuing education, workflow tools and technology, so those general dentists feel comfortable sending more cases.",
    "Education is the engine. Eight hundred to nine hundred C E courses a year. Lunch and learns, evening programs, larger symposiums. They exist for loyalty, adoption, expanding treatment types, supporting referrals, and patient acceptance.",
    "And here is a diagnosis worth carrying. When a practice is not placing enough implants, it is usually a presentation problem, not a demand problem. Case acceptance improves when the staff explain need and benefit well. It does not improve because the price dropped. Bio Horizons supports that with staff C E and third party financing.",
    "Dental buying also works differently from ortho. Practices buy inventory up front. A new office might start with thirty to fifty implants plus surgical kits. They sterilize their own instruments, so there is no tray per case model. Consignment is mainly for large volume, high impact, specialty heavy accounts, especially zygomatic, where what you need during surgery varies.",
    "Getting in the door. Start with the front desk, and treat them with the same respect you would give the doctor. Be creative about timing, early before clinic, lunch, after work socially, C E events, trade shows. And if you cannot reach the specialist, build excitement with their referral doctors first, because they may pull you into the account.",
    "There is also an academic play. General practice residencies, oral surgery and perio residencies. Sawbones, lectures, sometimes cadaver labs. Clinicians stay comfortable with whatever they trained on. The constraint is that universities want big grants or free product, so they invest selectively.",
    "And on adoption generally, efficiency gets their attention first, R O I closes it, and clinical outcomes underpin both.",
    "Last section. The talk track. These came from the interview prep material. Since there is no interview on the calendar, treat them as the questions you should be able to answer out loud, in your own words, without notes.",
    "Why dental sales. It is competitive and performance driven, like athletics, but it is not only numbers. It is helping clinicians improve outcomes, it rewards long term relationships and real clinical knowledge, and the products give people back their smile and their confidence.",
    "Why Bio Horizons. Three reasons. One, Laser Lock, one hundred plus studies, a real differentiator you can speak to with confidence. Two, market position, premium quality at a more accessible price than Straumann or Nobel. Three, Henry Schein backing, the resources of a major player while still being focused as an implant specialist. And the closing line. I want to sell products I believe in for a company positioned to win.",
    "S T A R. Situation, Task, Action, Result. Set the context, say what needed doing, say what you did, and give the outcome with a number if you have one. Have three to five of these ready before you ever need them.",
    "How do you handle rejection. Four steps. Feel it, do not pretend it does not sting. Analyze it, was it the wrong approach, the wrong timing, or just not a fit. Adjust, what changes next time. And move on, because dwelling does not help and the next opportunity does. Rejection from one customer does not define your value.",
    "Sell me against a dentist who uses Straumann. Do not lead with switch. That is combative, and Straumann is genuinely excellent. Instead ask what percentage of their cases are anterior aesthetics, and whether they have ever had an implant integrate beautifully and still fail aesthetically because of recession. Then position it. Keep Straumann posterior, try Bio Horizons on the next anterior case. You are asking for one case, not their business. Low risk for them, and it is the case type where Laser Lock is most likely to show.",
    "Where do you see yourself in five years. A top performing territory manager. Consistently over quota, strong relationships, a genuine clinical resource with expertise in digital workflows and guided surgery. The rep surgeons call for complex case planning, not just for orders. Open to leadership, but earned through results first. Avoid two answers. I want your job, which sounds opportunistic. And I do not know, which sounds like no ambition.",
    "How do you stay organized. C R M logged the same day, and the rule is, if it is not in the C R M it did not happen. Sunday planning for the week ahead. Top three must dos every morning. A B C account segmentation, weekly, biweekly, monthly. Follow ups live in the calendar, never in your memory. And a monthly pipeline review.",
    "And always have questions for them. What does success look like in the first ninety days, and the first year. What do your top performers do differently. What is the training like for somebody coming from outside dental. Who am I primarily competing against in this territory. And what has kept you at Bio Horizons.",
    "Finally, showing up. Business professional, a suit for a first interview, business casual for a field ride. Firm handshake, eye contact, sit up straight, lean in slightly. Enthusiastic without overdoing it. Arrive fifteen minutes early. Bring resumes, references, a notepad and your questions. And have three to five S T A R stories, a sixty second elevator pitch, and Laser Lock rehearsed.",
    "That is day six. If you only lock in three things from it, make them these. One millimeter of bone loss versus one and a half to two. One hundred fifty implants a year for a general dentist versus two thousand for a specialist. And the three reasons why Bio Horizons. Everything else hangs off those."
  ]
};

const COMPANIES_TRACK = {
  title: "Companies - Who Owns What",
  text: [
    "Who owns what. This is the part that costs people the most points, so we are going to do it slowly.",
    "There are only two kinds of company in this industry. Movers and makers.",
    "The movers are the distributors. Henry Schein, Patterson, Benco. They deliver. They mostly do not make anything.",
    "The makers are a handful of parent companies, and each one owns a bunch of brand names. Here is the thing that trips everyone up. The brand name on the box is usually not the company that owns it.",
    "Family one. Dentsply Sirona. The biggest pure dental company there is. They own CEREC, the crown mill. Primescan, the scanner. Astra Tech and Ankylos implants. Schick sensors. Maillefer root canal files. Sure Smile aligners. And consumables like Prime and Bond, Aquasil and Caulk. If you cannot place a brand, Dentsply Sirona is the safest guess.",
    "Family two. Envista. This is the one people get wrong. Envista owns Nobel Biocare implants, Ormco orthodontics, and Kavo Kerr handpieces and imaging. They used to be under Danaher. Envista was spun off from Danaher and took those brands with it. If your notes say Danaher owns Nobel Biocare, that is out of date.",
    "Family three. Align Technology. Only three brands, but enormous. Invisalign, which is about 90 percent of the clear aligner market. Eye Tero, the scanner. And exocad, design software. Align owns both the scanner and the aligner, and that is exactly why they work together, and exactly why a rep pushes eye Tero.",
    "Family four. Straumann Group. Straumann implants, number one at about 20 percent of the implant market. Neodent, which is their own value implant brand. And Clear Correct, their aligner. Notice what they did there. Premium, budget, and aligners, all under one roof. So when a dentist says too expensive, they already own the cheaper answer.",
    "Family five. 3M Health Care. The materials family. Filtek composites, Scotchbond adhesives, Rely X cements, and Unitek braces.",
    "Family six. Planmeca. Finnish and family owned. Imaging and cad cam. No shareholders to answer to, so a different kind of relationship.",
    "And then Henry Schein again, because Henry Schein is the one name that is on both sides. It is the number one distributor, and it also owns two implant makers, Bio Horizons and Camlog.",
    "So, the five traps. One. Envista, not Danaher. Two. Henry Schein is a mover and a maker. Three. Align owns the scanner and the aligner. Four. Dentsply Sirona does the same trick, Primescan feeds CEREC. Five. Straumann deliberately sells at every price point.",
    "Get those five and you have got the whole map."
  ]
};

/* ---------- build script text ---------- */

function overviewScript(o) {
  return [INTRO, ""].concat(o.text).join("\n\n");
}

function quizScript(label, questions) {
  const lines = [
    "Quiz. " + label + ". " +
    "I will ask, then pause. Say your answer out loud, then I will tell you.",
    ""
  ];
  questions.forEach((q, n) => {
    lines.push("Question " + (n + 1) + ". " + speakable(q[1]));
    lines.push("[[slnc 3500]]");
    lines.push(speakable(q[2]) + ". [[slnc 400]] " + speakable(q[4]));
    lines.push("[[slnc 900]]");
  });
  lines.push("That is the end of " + label + ".");
  return lines.join("\n");
}

function tracks() {
  // every day that actually has questions, so adding a day needs no edit here
  const days = [...new Set(content.questions.map(q => q[5] || 1))].sort((a, b) => a - b);
  const out = [];
  let n = 1;

  days.forEach(d => {
    if (!OVERVIEWS[d]) return;   // no hand-written overview yet — skip, don't fake one
    out.push({ file: n++ + " - " + OVERVIEWS[d].title, text: overviewScript(OVERVIEWS[d]) });
  });
  out.push({ file: n++ + " - " + COMPANIES_TRACK.title, text: overviewScript(COMPANIES_TRACK) });

  days.forEach(d => {
    const qs = content.questions.filter(q => (q[5] || 1) === d);
    out.push({ file: n++ + " - Quiz - Day " + d, text: quizScript("Day " + d, qs) });
  });
  const comp = content.questions.filter(q => (content.companies || []).indexOf(q[1]) > -1);
  out.push({ file: n++ + " - Quiz - Companies", text: quizScript("Companies", comp) });
  return out;
}

/* ---------- renderers ---------- */

// Pick the best installed voice unless one is named explicitly.
// Premium voices are neural and sound far better than the stock ones; they're a
// free download in System Settings > Accessibility > Read & Speak > (i) next to
// System voice. Note Siri voices are NOT usable here — macOS reserves them.
function bestVoice() {
  if (process.env.VOICE) return process.env.VOICE;
  const installed = execFileSync("say", ["-v", "?"], { encoding: "utf8" });
  const prefer = ["Ava (Premium)", "Evan (Premium)", "Zoe (Premium)",
                  "Ava (Enhanced)", "Allison (Enhanced)", "Ava", "Samantha"];
  return prefer.find(v => installed.includes(v)) || "Samantha";
}

const VOICE = bestVoice();

function renderSay(t, dest) {
  const aiff = path.join(os.tmpdir(), "trk.aiff");
  execFileSync("say", ["-v", VOICE, "-r", "180", "-o", aiff, t.text]);
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", aiff, dest]);
  fs.unlinkSync(aiff);
}

// macOS pause markup -> ElevenLabs break tags. A single break tag maxes out at
// 3 seconds, so longer gaps get split across several.
function toBreaks(text) {
  return text.replace(/\[\[slnc (\d+)\]\]/g, (m, ms) => {
    let left = parseInt(ms, 10), out = "";
    while (left > 0) {
      const chunk = Math.min(left, 3000);
      out += ' <break time="' + (chunk / 1000).toFixed(1) + 's" />';
      left -= chunk;
    }
    return out;
  });
}

// The quiz tracks run to 15k characters, well past what one request accepts,
// so split on line boundaries and stitch the audio back together.
function chunkText(text, max) {
  const lines = text.split("\n");
  const out = [];
  let cur = "";
  for (const line of lines) {
    if (cur.length + line.length + 1 > max && cur) { out.push(cur); cur = ""; }
    cur += (cur ? "\n" : "") + line;
  }
  if (cur) out.push(cur);
  return out;
}

/* Renders are cached by a hash of the narration text, because adding a day
   renumbers every track but changes almost none of the content. Without this,
   adding Day 5 re-rendered 92,000 characters when only 18,600 were new — and
   burned through a month of credits doing it. Cache lives outside the repo. */
const CACHE = path.join(__dirname, ".audio-cache");

function cacheKey(text, voice) {
  return require("crypto").createHash("sha256")
    .update(voice + "\n" + text).digest("hex").slice(0, 32);
}

/* Read tools/.env so the key doesn't have to be pasted into the shell every
   time. Format is one KEY=value per line; # starts a comment. The file is
   gitignored — it must never be committed. A real environment variable still
   wins, so CI or a one-off `ELEVENLABS_API_KEY=... node ...` overrides it. */
function loadDotEnv() {
  const f = path.join(__dirname, ".env");
  if (!fs.existsSync(f)) return;
  fs.readFileSync(f, "utf8").split("\n").forEach(line => {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (!m) return;
    const name = m[1];
    const value = m[2].trim().replace(/^["']|["']$/g, "");
    if (value && process.env[name] === undefined) process.env[name] = value;
  });
}

async function renderEleven(t, dest) {
  loadDotEnv();
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error(
      "ELEVENLABS_API_KEY is not set.\n" +
      "  Put it in tools/.env as:  ELEVENLABS_API_KEY=sk_...\n" +
      "  (that file is gitignored), or pass it inline for one run."
    );
  }
  const voice = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";

  fs.mkdirSync(CACHE, { recursive: true });
  const cached = path.join(CACHE, cacheKey(t.text, voice) + ".mp3");
  if (fs.existsSync(cached)) {
    fs.copyFileSync(cached, dest);
    process.stdout.write("(cached) ");
    return;
  }

  const chunks = chunkText(toBreaks(t.text), 3500);
  const parts = [];

  for (let i = 0; i < chunks.length; i++) {
    // A 90-minute job is dozens of requests; a single network blip shouldn't
    // lose the whole run, so retry transient failures before giving up.
    let buf = null, lastErr = null;
    for (let attempt = 1; attempt <= 4 && !buf; attempt++) {
      try {
        const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
          method: "POST",
          headers: { "xi-api-key": key, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: chunks[i],
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
          })
        });
        if (!res.ok) {
          const detail = (await res.text()).slice(0, 250);
          // quota / auth problems won't fix themselves — fail fast
          if (res.status === 401 || res.status === 403) throw new Error("HTTP " + res.status + " — " + detail);
          throw new Error("HTTP " + res.status + " — " + detail);
        }
        buf = Buffer.from(await res.arrayBuffer());
      } catch (e) {
        lastErr = e;
        if (/HTTP 40[13]/.test(e.message)) throw e;
        if (attempt < 4) {
          process.stdout.write("r");
          await new Promise(r => setTimeout(r, attempt * 3000));
        }
      }
    }
    if (!buf) throw new Error("chunk " + (i + 1) + "/" + chunks.length + " failed after 4 tries — " + lastErr.message);
    parts.push(buf);
    process.stdout.write(".");
  }

  // Raw-concatenating the chunks leaves one ID3 header per chunk, so players
  // report only the first chunk's length and seeking breaks. Remux once through
  // ffmpeg to get a single clean stream. Lossless — no re-encode, no extra credits.
  const raw = path.join(os.tmpdir(), "eleven-raw.mp3");
  fs.writeFileSync(raw, Buffer.concat(parts));
  if (parts.length > 1) {
    try {
      execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-c:a", "copy", dest]);
      fs.unlinkSync(raw);
      fs.copyFileSync(dest, cached);
      return;
    } catch (e) {
      console.warn("\n  (ffmpeg remux failed — writing concatenated file; duration may display wrong)");
    }
  }
  fs.renameSync(raw, dest);
  fs.copyFileSync(dest, cached);
}

/* ---------- main ---------- */

(async function () {
  const mode = process.argv[2] || "scripts";
  const list = tracks();

  // Track numbers shift when a day is added, so clear the old generated files
  // first — otherwise you end up with both "4 - Companies" and "5 - Companies".
  // Only touches files this script produces (leading "N - "); anything else stays.
  const isGenerated = f => /^\d+ - /.test(f);

  fs.mkdirSync(SCRIPTS, { recursive: true });
  fs.readdirSync(SCRIPTS).filter(isGenerated).forEach(f => fs.unlinkSync(path.join(SCRIPTS, f)));
  list.forEach(t => fs.writeFileSync(path.join(SCRIPTS, t.file + ".txt"), t.text));
  console.log("wrote " + list.length + " narration scripts to tools/audio-scripts/");
  const words = list.reduce((n, t) => n + t.text.split(/\s+/).length, 0);
  console.log("total ~" + words.toLocaleString() + " words, roughly " +
              Math.round(words / 150) + " minutes of audio");

  if (mode === "scripts") return;

  if (mode === "say") console.log("voice: " + VOICE);
  fs.mkdirSync(AUDIO, { recursive: true });

  // Render to a staging directory first. Only once every track has succeeded do
  // we replace what's in the shared folder — otherwise a failure part way through
  // wipes the tracks he already had and leaves him with nothing.
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), "dental-audio-"));
  const ext = mode === "eleven" ? ".mp3" : ".m4a";

  for (const t of list) {
    const dest = path.join(stage, t.file + ext);
    process.stdout.write("  " + t.file + " ... ");
    if (mode === "eleven") await renderEleven(t, dest);
    else renderSay(t, dest);
    console.log((fs.statSync(dest).size / 1024 / 1024).toFixed(1) + " MB");
  }

  const stale = fs.readdirSync(AUDIO).filter(f => isGenerated(f) && /\.(mp3|m4a)$/i.test(f));
  stale.forEach(f => fs.unlinkSync(path.join(AUDIO, f)));
  fs.readdirSync(stage).forEach(f => {
    fs.copyFileSync(path.join(stage, f), path.join(AUDIO, f));
    fs.unlinkSync(path.join(stage, f));
  });
  fs.rmdirSync(stage);
  console.log("\nreplaced " + stale.length + " old track(s); " + list.length + " written to " + AUDIO);
})().catch(e => { console.error("\nfailed:", e.message); process.exit(1); });
