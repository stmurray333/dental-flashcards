#!/usr/bin/env node
/*
 * build-guide.js — turn a day's content module into a Word study guide.
 *
 *   node tools/build-guide.js day2
 *   node tools/build-guide.js day2 --out ~/Downloads
 *   node tools/build-guide.js all
 *
 * By default it writes straight into the shared Google Drive folder Zachary
 * has access to, so the guide is on his phone as soon as Drive syncs. Pass
 * --out to write somewhere else.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DRIVE = path.join(
  os.homedir(),
  "Library/CloudStorage/GoogleDrive-stmurray333@gmail.com/My Drive/Zachary - Dental Sales Training"
);

function usage(msg) {
  if (msg) console.error("error: " + msg + "\n");
  const days = fs.readdirSync(path.join(__dirname, "guides"))
    .filter(f => f.endsWith(".js"))
    .map(f => f.replace(/\.js$/, ""))
    .sort();
  console.error("usage: node tools/build-guide.js <" + days.join("|") + "|all> [--out DIR]");
  process.exit(1);
}

const args = process.argv.slice(2);
if (!args.length) usage("no day given");

const which = args[0];
const outIdx = args.indexOf("--out");
const outDir = outIdx > -1 ? args[outIdx + 1] : DRIVE;

if (outIdx > -1 && !outDir) usage("--out needs a directory");
if (!fs.existsSync(outDir)) {
  usage("output directory does not exist:\n  " + outDir +
        "\n(is Google Drive running? or pass --out ~/Downloads)");
}

let targets;
if (which === "all") {
  targets = fs.readdirSync(path.join(__dirname, "guides"))
    .filter(f => f.endsWith(".js")).map(f => f.replace(/\.js$/, "")).sort();
} else {
  targets = [which];
}

const K = require("./guide-kit");

(async function () {
  for (const day of targets) {
    const modPath = path.join(__dirname, "guides", day + ".js");
    if (!fs.existsSync(modPath)) usage("no content module for '" + day + "'");

    const mod = require(modPath);
    const blocks = mod.blocks();
    const dest = path.join(outDir, mod.outputName);

    const res = await K.build(blocks, dest);
    console.log(day + "  ->  " + res.path + "  (" + (res.bytes / 1024).toFixed(1) + " kb)");
  }
})().catch(err => {
  console.error("\nbuild failed:", err.message);
  if (/Cannot find module 'docx'/.test(err.message)) {
    console.error("run:  cd tools && npm install");
  }
  process.exit(1);
});
