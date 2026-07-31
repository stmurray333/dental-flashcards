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
  const out = [];
  [1, 2, 3].forEach(d => {
    out.push({ file: d + " - " + OVERVIEWS[d].title, text: overviewScript(OVERVIEWS[d]) });
  });
  out.push({ file: "4 - " + COMPANIES_TRACK.title, text: overviewScript(COMPANIES_TRACK) });

  [1, 2, 3].forEach(d => {
    const qs = content.questions.filter(q => (q[5] || 1) === d);
    out.push({ file: (4 + d) + " - Quiz - Day " + d, text: quizScript("Day " + d, qs) });
  });
  const comp = content.questions.filter(q => (content.companies || []).indexOf(q[1]) > -1);
  out.push({ file: "8 - Quiz - Companies", text: quizScript("Companies", comp) });
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

async function renderEleven(t, dest) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error("ELEVENLABS_API_KEY is not set");
  const voice = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";
  const chunks = chunkText(toBreaks(t.text), 3500);
  const parts = [];

  for (let i = 0; i < chunks.length; i++) {
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
      throw new Error("HTTP " + res.status + " on chunk " + (i + 1) + "/" + chunks.length +
                      " — " + (await res.text()).slice(0, 250));
    }
    parts.push(Buffer.from(await res.arrayBuffer()));
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
      return;
    } catch (e) {
      console.warn("\n  (ffmpeg remux failed — writing concatenated file; duration may display wrong)");
    }
  }
  fs.renameSync(raw, dest);
}

/* ---------- main ---------- */

(async function () {
  const mode = process.argv[2] || "scripts";
  const list = tracks();

  fs.mkdirSync(SCRIPTS, { recursive: true });
  list.forEach(t => fs.writeFileSync(path.join(SCRIPTS, t.file + ".txt"), t.text));
  console.log("wrote " + list.length + " narration scripts to tools/audio-scripts/");
  const words = list.reduce((n, t) => n + t.text.split(/\s+/).length, 0);
  console.log("total ~" + words.toLocaleString() + " words, roughly " +
              Math.round(words / 150) + " minutes of audio");

  if (mode === "scripts") return;

  if (mode === "say") console.log("voice: " + VOICE);
  fs.mkdirSync(AUDIO, { recursive: true });
  for (const t of list) {
    const ext = mode === "eleven" ? ".mp3" : ".m4a";
    const dest = path.join(AUDIO, t.file + ext);
    process.stdout.write("  " + t.file + " ... ");
    if (mode === "eleven") await renderEleven(t, dest);
    else renderSay(t, dest);
    console.log((fs.statSync(dest).size / 1024 / 1024).toFixed(1) + " MB");
  }
  console.log("\naudio written to " + AUDIO);
})().catch(e => { console.error("\nfailed:", e.message); process.exit(1); });
