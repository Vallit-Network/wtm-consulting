# WTM Seminar-Design & Entwicklungs-Guidelines

Dieses Dokument definiert die strikten Regeln, das Design-System und den Aufbau für alle Seminar-Detailseiten der WTM Management Consulting Website. Ziel ist ein konsistentes, prämien-orientiertes und visuell beeindruckendes Nutzererlebnis.

## 1. Grundprinzipien

*   **Premium Visuals:** Jedes Seminar muss visuell beeindrucken ("Wow-Effekt"). Keine Textwüsten.
*   **Thementreue:** Das Farbschema richtet sich **strikt** nach der Seminar-Kategorie. Keine Abweichungen basierend auf "Gefühl".
*   **Interaktive Modelle:** Komplexe Konzepte (z.B. Change-Kurve, 4-Zimmer-Modell) werden **nicht als Bilder**, sondern als **responsive CSS/SVG-Grafiken** umgesetzt.
*   **Content-Wahrheit:** Inhalte (Texte, Ziele, Phasen) werden exakt aus den Vorlagen übernommen. Keine "Lückenfüller" oder Halluzinationen.

---

## 2. Farb-System (Strict Themes)

Jede Seminar-Seite muss im `<style>`-Block der Seite die entsprechenden CSS-Variablen überschreiben.

### A. Leadership (Führung)
Wird genutzt für: *Führungssimulation, Selbsterkenntnis, Laterales Führen, etc.*
*   **Accent Color:** `Anthrazit (#4A4A4E)`
*   **Secondary/Highlight:** `Silber/Grau (#a0a0a5)`
*   **Vibe:** Seriös, Klar, Erfahren.

```css
:root {
    --seminar-accent: #4A4A4E;
    --seminar-secondary: #a0a0a5;
    --seminar-accent-light: rgba(74, 74, 78, 0.1);
}
```

### B. Change Management
Wird genutzt für: *Change-Kompetenz, Change-Kommunikation, etc.*
*   **Hero Background:** Dominanz von Corporate Blue Tones (Deep Blue `#2C3E50` -> Soft Teal/Blue `#527a90`).
*   **Accent Color:** `Change Red (#c24c4c)` (Dezent eingesetzt für Badges, Keywords, Icons).
*   **Vibe:** Souverän, Transformierend, Unternehmensnah.

```css
:root {
    --seminar-accent: #c24c4c; /* Red for highlights */
    --seminar-secondary: #2C3E50; /* Deep Corporate Blue */
    --seminar-primary-blue: #9DD4D0; /* Corp. Teal/Blue */
}
/* Hero Background Rule: Blue Dominant */
.seminar-hero { background: linear-gradient(135deg, #2C3E50 0%, #527a90 100%); }
```

### C. Projektmanagement
Wird genutzt für: *PM-Basics, Krisenmanagement, etc.*
*   **Accent Color:** `Tech Blue (#2563eb)` (oder spezifisiertes Blau)
*   **Vibe:** Strukturiert, Technisch, Verlässlich.

*(Weitere Kategorien folgen diesem Muster: Kommunikation, Gesundheit/Resilienz)*

---

## 3. Seiten-Struktur (Der Standard-Aufbau)

Jede Seite folgt dieser Reihenfolge:

### 1. Hero Section (Pflicht)
*   **Hintergrund:** Linearer Gradient in den Themen-Farben + animierte "Orbs" (Lichtkugeln) im Hintergrund.
*   **Elemente:**
    *   Breadcrumbs: `Startseite -> Seminare -> Kategorie`
    *   Category Badge: Umrandet, Themen-Farbe.
    *   H1 Title: Groß, mit `<span>` in Akzentfarbe für das Schlüsselwort.
    *   Subtitle: Kurze Zusammenfassung (1-2 Sätze).
    *   Meta-Tags: Dauer (Icon), enthaltene Modelle (Icon).
    *   CTA-Buttons: "Unverbindlich anfragen" (Glow) & "Konzept erhalten" (Outline).

### 2. Intro / Herausforderung
*   **Ziel:** Den Schmerzpunkt ("Pain Point") des Kunden adressieren.
*   **Label:** "HERAUSFORDERUNG" (in Akzentfarbe).
*   **Inhalt:** Warum braucht man dieses Seminar? Was passiert ohne dieses Wissen?

### 3. Visual Model 1 (Das Highlight)
*   **Wichtig:** Ein zentrales Konzept des Seminars visuell darstellen.
*   **Technik:** SVG (für Kurven/Pfade) oder CSS-Grid (für Räume/Matrizen).
*   **Regel:**
    *   **SVG:** Labels und Punkte müssen Teil des SVG sein (`<text>`, `<circle>`), keine HTML-Overlays (vermeidet Verrutschen auf Mobile).
    *   **Animation:** Draw-In Effekte für Linien (`stroke-dasharray`), Pulse-Effekte für Punkte.

### 4. Ziele & Nutzen (Grid)
*   **Layout:** 2-Spalten Grid.
*   **Cards:** Weiße Karten mit leichtem Schatten/Border.
*   **Numbering:** 1, 2, 3, 4 Icons in Akzentfarbe.
*   **Inhalt:** "Was nehme ich mit?"

### 5. Deep Dive / Die Reise (Inhalte)
*   **Format:** Keine Bullet-Point-Liste!
*   **Darstellung:**
    *   Als "Reise" (Pfad-Visualisierung).
    *   Als "Treppe" (Stufenweise Entwicklung).
    *   Als "Simulation" (Szenario-Timeline).
*   **Zweck:** Zeigen, dass das Seminar einer logischen Struktur folgt.

### 6. CTA & Zielgruppe
*   **Target Card:** "Für wen ist das?" (Zielgruppe).
*   **Contact Card:** Dunkler Hintergrund (Akzentfarbe), direkter Link zum Kontaktformular.

---

## 4. Do's & Don'ts

### ✅ DO
*   **Do:** Nutze CSS-Variablen (`var(--seminar-accent)`), um Farben überall konsistent zu halten.
*   **Do:** Prüfe Grafiken auf Mobile-View (Chrome DevTools).
*   **Do:** Kopiere Texte 1:1 aus den Briefings.
*   **Do:** Commit Messages müssen aussagekräftig sein.

### ❌ DON'T
*   **Don't:** Mische Farben aus verschiedenen Kategorien (z.B. Gold bei Leadership).
*   **Don't:** Nutze absolute Positionierung für Text über Bildern/SVGs (skaliert nicht).
*   **Don't:** Erfinde Inhalte dazu, wenn keine da sind → Frage den User.
*   **Don't:** Nutze Standard-Bootstrap-Look. Es muss "Custom Premium" aussehen.

---

## 5. Checkliste vor Fertigstellung
1.  [ ] Stimmt die Kategorie-Farbe überall (Icons, Badges, Buttons, Gradient)?
2.  [ ] Sind alle visuellen Modelle (SVG) auf Handygröße korrekt ausgerichtet?
3.  [ ] Funktionieren alle Links (Breadcrumbs, Footer, CTAs)?
4.  [ ] Wurde `js/seminar-data.js` mit den korrekten Metadaten (Intro, Ziele) geupdatet?
