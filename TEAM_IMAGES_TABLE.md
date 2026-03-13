# Verwendete Team-Bilder (nur Team-Kontext)

Kontextabhängige Größen für optimale Darstellung:

| Kontext | Ordner / Größe | Verwendung |
|--------|-----------------|------------|
| Team-Grid (Karten) | `320/`, `640/` (srcset) | Kleine Karten, responsive 320w/640w |
| Team-Modal (vergrößert) | `1280/` | Großes Foto im Modal |
| Coaching-Karten | `thumbnails/` (128×128) | Kleine Karten auf Coaching-Seite |
| Coaching-Modal | `1280/` | Großes Foto im Coach-Modal |

Quelldateien (nur diese 22) liegen im Root `assets/team/`. Abgeleitete Größen: `assets/team/320/`, `640/`, `1280/`, `thumbnails/`.

| Bilddatei (Pfad) | Verwendet in | Auflösung (neu) |
|------------------|--------------|------------------|
| `assets/team/640/till-reichert.jpg` | index.html (Team-Grid), main.js (Modal), coaching-data.js (Coaching-Karten) | 640×640 |
| `assets/team/640/malte-werner-square.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/frank_titzer-AI-v2.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/olaf_werner-square.jpg` | index.html, main.js | 640×640 |
| `assets/team/640/Carmen-Werner-Team_500x500.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Team-Dr.-Bettina-Brendel-500x500-1.jpg` | index.html, main.js | 640×640 |
| `assets/team/640/Team-Dr.-Bettina-Hailer-500x500-1.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Sarolf_Sauer_Team_500x500-AI-v2.jpg` | index.html, main.js | 640×640 |
| `assets/team/640/Gerold-Pohl-Team-500-x-500.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Profilbild_Heike_Neidhart_Team_500x500.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Stalling-Heike-Team-Portrait-500x500-6-23.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Harry_Leiders_team_500x500-AI-v2.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Juergen_Reus_AI.png` | index.html, main.js | 640×640 |
| `assets/team/640/Kirsten_Schmiegelt_3-1.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Team-Maik-Riess-500x500-1.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Team-Marcus-Schmidt-6-23.jpg` | index.html, main.js | 640×640 |
| `assets/team/640/Markus_Schramm_AI.png` | index.html, main.js | 640×640 |
| `assets/team/640/Team-Melanie-Kubala-500x500-1-AI-v2.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Team-Phillip_Besch-500x500-1-AI-v2.jpg` | index.html, main.js | 640×640 |
| `assets/team/640/Barbara_AI.png` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Team-Foto-Wolfgang-Hoffmann-AI-v2.jpg` | index.html, main.js, coaching-data.js | 640×640 |
| `assets/team/640/Cludius-Andreas-Team-500x500-1.jpg` | coaching-data.js (nur Coaching-Seite) | 640×640 |

**Hinweise:**
- Till Reichert: Quelle `assets/team/till-reichert.jpg`; Anzeige 320/640/1280 daraus.
- Alle Größen (320, 640, 1280) aus den 22 Quelldateien: `npm run normalize-team-images`.
- Thumbnails (128×128) für Coaching-Karten: `npm run thumbnails` (liest aus `640/`, schreibt nach `thumbnails/`).
- Im Ordner `assets/team/` liegen nur noch die 22 genutzten Quelldateien; ungenutzte Bilder wurden entfernt.
