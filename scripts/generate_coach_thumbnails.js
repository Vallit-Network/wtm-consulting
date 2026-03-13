/**
 * Generate 128x128 thumbnails from assets/team/640/ for coaching cards.
 * Output: assets/team/thumbnails/ (same filenames)
 * Run: node scripts/generate_coach_thumbnails.js
 */

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "assets", "team", "640");
const THUMB_DIR = path.join(ROOT, "assets", "team", "thumbnails");
const THUMB_SIZE = 128;

async function main() {
  const sharp = require("sharp");
  if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  for (const name of files) {
    const srcPath = path.join(SRC_DIR, name);
    const outPath = path.join(THUMB_DIR, name);
    const ext = path.extname(name).toLowerCase();
    try {
      let pipeline = sharp(srcPath).resize(THUMB_SIZE, THUMB_SIZE, { fit: "cover", position: "top" });
      if (ext === ".png") {
        await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
      } else {
        await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(outPath);
      }
      console.log("OK:", name);
    } catch (e) {
      console.error("Error", name, e.message);
    }
  }
  console.log("Done. Thumbnails in", THUMB_DIR);
}

main();
