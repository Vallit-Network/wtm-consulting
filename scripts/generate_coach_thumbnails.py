#!/usr/bin/env python3
"""
Generate 128x128 thumbnails for coach photos used on the Online Coaching page.
Place thumbnails in assets/team/thumbnails/ so the browser loads small images for cards.
Canonical flow: run `npm run normalize-team-images` then `npm run thumbnails` (Node, reads from assets/team/640/).
This Python script uses legacy paths; for 640-based workflow use scripts/generate_coach_thumbnails.js.
Run from project root: python3 scripts/generate_coach_thumbnails.py
Requires: pip install Pillow
"""

import os
import sys
from pathlib import Path

# Photo paths from coaching-data.js (relative to project root)
COACH_PHOTOS = [
    "assets/team/frank_titzer-AI-v2.jpg",
    "assets/team/Stalling-Heike-Team-Portrait-500x500-6-23.jpg",
    "assets/team/Team-Dr.-Bettina-Hailer-500x500-1.jpg",
    "assets/team/Harry_Leiders_team_500x500-AI-v2.jpg",
    "assets/team/Barbara_AI.png",
    "assets/team/Cludius-Andreas-Team-500x500-1.jpg",
    "assets/team/Carmen-Werner-Team_500x500.jpg",
    "assets/team/Till-Reichert.jpg",
    "assets/team/Team-Melanie-Kubala-500x500-1-AI-v2.jpg",
    "assets/team/Team-Maik-Riess-500x500-1.jpg",
    "assets/team/Team-Foto-Wolfgang-Hoffmann-AI-v2.jpg",
    "assets/team/Profilbild_Heike_Neidhart_Team_500x500.jpg",
    "assets/team/Gerold-Pohl-Team-500-x-500.jpg",
    "assets/team/malte-werner-square.jpg",
    "assets/team/Kirsten_Schmiegelt_3-1.jpg",
]

THUMB_SIZE = 128
THUMB_DIR = "assets/team/thumbnails"


def main():
    try:
        from PIL import Image
    except ImportError:
        print("Pillow is required. Install with: pip install Pillow")
        sys.exit(1)

    root = Path(__file__).resolve().parent.parent
    thumb_dir = root / THUMB_DIR
    thumb_dir.mkdir(parents=True, exist_ok=True)

    for rel_path in COACH_PHOTOS:
        src = root / rel_path
        if not src.exists():
            print(f"Skip (not found): {rel_path}")
            continue
        name = src.name
        ext = src.suffix.lower()
        out_path = thumb_dir / name
        if ext == ".png":
            out_path = thumb_dir / (src.stem + ".png")

        try:
            img = Image.open(src)
            img = img.convert("RGB") if ext != ".png" else img.convert("RGBA")
            w, h = img.size
            if w == 0 or h == 0:
                print(f"Skip (invalid size): {rel_path}")
                continue
            scale = max(THUMB_SIZE / w, THUMB_SIZE / h)
            new_w = max(1, int(w * scale))
            new_h = max(1, int(h * scale))
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            x = max(0, (new_w - THUMB_SIZE) // 2)
            y = 0
            img = img.crop((x, y, x + THUMB_SIZE, y + THUMB_SIZE))
            if ext == ".png":
                img.save(out_path, "PNG", optimize=True)
            else:
                img.save(out_path, "JPEG", quality=85, optimize=True)
            print(f"OK: {name}")
        except Exception as e:
            print(f"Error {rel_path}: {e}")

    print(f"Done. Thumbnails in {thumb_dir}")


if __name__ == "__main__":
    main()
