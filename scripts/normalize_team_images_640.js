/**
 * Generate normalized team images in three sizes for optimal use:
 * - 320x320: Team-Grid (Karten), kleine Darstellung
 * - 640x640: Team-Grid Retina / Standard
 * - 1280x1280: Vergrößertes Modal, Seminare etc.
 * Output: assets/team/320/, assets/team/640/, assets/team/1280/
 * Run: node scripts/normalize_team_images_640.js (from project root)
 */

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const TEAM_DIR = path.join(ROOT, "assets", "team");
const SIZES = [320, 640, 1280];

/**
 * Map outputs, für die es explizit neue, hochauflösende Originale
 * im Unterordner assets/team/Original gibt.
 * Diese Dateien sollen als Quelle dienen, damit die Köpfe nicht
 * abgeschnitten und die Bilder nicht verpixelt wirken.
 */
const ORIGINAL_SRC_MAP = {
  "till-reichert.jpg": "Original/Till Reichert.jpg",
  "olaf_werner-square.jpg": "Original/Olaf Werner.jpg",
  "Carmen-Werner-Team_500x500.jpg": "Original/Carmen Werner.jpg",
  "Profilbild_Heike_Neidhart_Team_500x500.jpg": "Original/Heike Neidhart.jpg",
  "Gerold-Pohl-Team-500-x-500.jpg": "Original/Gerold Pohl.jpg",
  "Kirsten_Schmiegelt_3-1.jpg": "Original/Kirsten Schmiegelt.jpg",
  "Team-Dr.-Bettina-Hailer-500x500-1.jpg": "Original/Bettina Hailer.jpg",
  "Team-Maik-Riess-500x500-1.jpg": "Original/Maik RIess.jpg",
  "Team-Marcus-Schmidt-6-23.jpg": "Original/Marcus Schmidt.jpg",
  "Cludius-Andreas-Team-500x500-1.jpg": "Original/Andreas Cludius.jpg",
};

const USED_IMAGES = [
  { src: "till-reichert.jpg", out: "till-reichert.jpg" },
  { src: "malte-werner-square.jpg", out: "malte-werner-square.jpg" },
  { src: "frank_titzer-AI-v2.jpg", out: "frank_titzer-AI-v2.jpg" },
  { src: "olaf_werner-square.jpg", out: "olaf_werner-square.jpg" },
  { src: "Carmen-Werner-Team_500x500.jpg", out: "Carmen-Werner-Team_500x500.jpg" },
  { src: "Team-Dr.-Bettina-Brendel-500x500-1.jpg", out: "Team-Dr.-Bettina-Brendel-500x500-1.jpg" },
  { src: "Team-Dr.-Bettina-Hailer-500x500-1.jpg", out: "Team-Dr.-Bettina-Hailer-500x500-1.jpg" },
  { src: "Sarolf_Sauer_Team_500x500-AI-v2.jpg", out: "Sarolf_Sauer_Team_500x500-AI-v2.jpg" },
  { src: "Gerold-Pohl-Team-500-x-500.jpg", out: "Gerold-Pohl-Team-500-x-500.jpg" },
  { src: "Profilbild_Heike_Neidhart_Team_500x500.jpg", out: "Profilbild_Heike_Neidhart_Team_500x500.jpg" },
  { src: "Stalling-Heike-Team-Portrait-500x500-6-23.jpg", out: "Stalling-Heike-Team-Portrait-500x500-6-23.jpg" },
  { src: "Harry_Leiders_team_500x500-AI-v2.jpg", out: "Harry_Leiders_team_500x500-AI-v2.jpg" },
  { src: "Juergen_Reus_AI.png", out: "Juergen_Reus_AI.png" },
  { src: "Kirsten_Schmiegelt_3-1.jpg", out: "Kirsten_Schmiegelt_3-1.jpg" },
  { src: "Team-Maik-Riess-500x500-1.jpg", out: "Team-Maik-Riess-500x500-1.jpg" },
  { src: "Team-Marcus-Schmidt-6-23.jpg", out: "Team-Marcus-Schmidt-6-23.jpg" },
  { src: "Markus_Schramm_AI.png", out: "Markus_Schramm_AI.png" },
  { src: "Team-Melanie-Kubala-500x500-1-AI-v2.jpg", out: "Team-Melanie-Kubala-500x500-1-AI-v2.jpg" },
  { src: "Team-Phillip_Besch-500x500-1-AI-v2.jpg", out: "Team-Phillip_Besch-500x500-1-AI-v2.jpg" },
  { src: "Barbara_AI.png", out: "Barbara_AI.png" },
  { src: "Team-Foto-Wolfgang-Hoffmann-AI-v2.jpg", out: "Team-Foto-Wolfgang-Hoffmann-AI-v2.jpg" },
  { src: "Cludius-Andreas-Team-500x500-1.jpg", out: "Cludius-Andreas-Team-500x500-1.jpg" },
];

async function main() {
  const sharp = require("sharp");
  for (const size of SIZES) {
    const outDir = path.join(TEAM_DIR, String(size));
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  }

  for (const { src, out } of USED_IMAGES) {
    // Falls es für dieses Zielbild eine explizite Originaldatei im Ordner
    // assets/team/Original gibt, diese bevorzugt als Quelle verwenden.
    const mappedSrc = ORIGINAL_SRC_MAP[out] || src;
    const srcPath = path.join(TEAM_DIR, mappedSrc);
    if (!fs.existsSync(srcPath)) {
      console.log("Skip (not found):", src);
      continue;
    }
    const ext = path.extname(out).toLowerCase();
    for (const size of SIZES) {
      const outPath = path.join(TEAM_DIR, String(size), out);
      try {
        const meta = await sharp(srcPath).metadata();
        const { width, height } = meta;
        if (!width || !height) continue;
        const cropSize = Math.min(width, height);
        const left = Math.floor((width - cropSize) / 2);
        let top = Math.floor((height - cropSize) / 2);

        // Für die neuen Originale: das Quadrat leicht nach oben verschieben,
        // damit der Kopf im späteren Ausschnitt etwas weiter nach unten rückt
        // und oben nicht abgeschnitten wirkt.
        if (ORIGINAL_SRC_MAP[out] && height > width) {
          const bias = Math.round(cropSize * 0.06); // ca. 6 % nach oben schieben
          top = Math.max(0, top - bias);
        }
        let pipeline = sharp(srcPath)
          .extract({ left, top, width: cropSize, height: cropSize })
          .resize(size, size, { fit: "fill" });
        if (ext === ".png") {
          await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
        } else {
          await pipeline.jpeg({ quality: size >= 1280 ? 92 : 90, mozjpeg: true }).toFile(outPath);
        }
      } catch (e) {
        console.error("Error", src, size, e.message);
      }
    }
    console.log("OK:", out);
  }
  console.log("Done. Normalized images in assets/team/320, 640, 1280");
}

main();
