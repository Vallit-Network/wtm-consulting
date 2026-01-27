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

### 1. Führung (Leadership)
Wird genutzt für: *Führungssimulation, Selbsterkenntnis, Laterales Führen*
*   **Farbe:** `Anthrazit (#4A4A4E)`
*   **Vibe:** Seriös, Klar, Erfahren.

```css
:root {
    --seminar-accent: #4A4A4E;
    --seminar-secondary: #a0a0a5; /* Silber/Grau Highlight */
}
```

### 2. Change Management
Wird genutzt für: *Change-Kompetenz, Change-Kommunikation*
*   **Farbe:** `Rot (#c24c4c)`
*   **Special Rule:** **Hero-Sektion in Corporate Blues** (Deep Blue `#2C3E50` -> Soft Teal `#527a90`), Rot nur als **Akzent** (Badges, Buttons).
*   **Vibe:** Souverän, Transformierend, Unternehmensnah.

```css
:root {
    --seminar-accent: #c24c4c; /* Red Accent */
    --seminar-secondary: #2C3E50; /* Deep Blue */
    --seminar-primary-blue: #9DD4D0; /* Corporate Teal */
}
.seminar-hero { background: linear-gradient(135deg, #2C3E50 0%, #527a90 100%); }
```

### 3. Gesundheit (Health)
Wird genutzt für: *Resilienz, Stressmanagement, Gesunde Führung*
*   **Farbe:** `Dunkles Smaragdgrün (#107e5e)`
*   **Vibe:** Ausgeglichen, Vital, Stabil.

```css
:root {
    --seminar-accent: #107e5e;
    --seminar-secondary: #34d399; /* Lighter Green */
}
```

### 4. Kommunikation (Communication)
Wird genutzt für: *Konfliktmanagement, Storytelling*
*   **Farbe:** `Gold (#d6ac58)`
*   **Vibe:** Wertig, Warm, Verbindend.

```css
:root {
    --seminar-accent: #d6ac58;
    --seminar-secondary: #fef3c7; /* Pale Gold/Cream */
}
```

### 5. Management
Wird genutzt für: *Projektmanagement, BWL*
*   **Farbe:** `Blau (#5D8AA8)`
*   **Vibe:** Strukturiert, Klar, Professionell.

```css
:root {
    --seminar-accent: #5D8AA8;
    --seminar-secondary: #e0f2fe; /* Light Blue */
}
```

---

## 3. Seiten-Struktur (Der 8-Phasen-Standard)

Jeder Seminar-Content muss in diese 8 Sektionen gegliedert sein:

### 1. Hero Section
*   **Titel:** Aussagekräftig & prägnant.
*   **Subline:** 1-2 Sätze, die das Kernproblem und die Lösung anreißen.
*   **Badges:** Dauer (z.B. "2 Tage"), Format (z.B. "Optional online"), Zielgruppe.
*   **CTA:** "Unverbindlich anfragen" | "Konzept erhalten".

### 2. Nutzen & Wirkung
*   **Format:** Liste (Bullets).
*   **Inhalt:** Was "kann" der Teilnehmer danach? (Kompetenzentwicklung).
*   **Wording:** "Wirksame Führung entwickeln...", "Besseres Verständnis für..."

### 3. Nach dem Training (Die Transformation)
*   **Format:** Liste (Bullets).
*   **Inhalt:** Konkrete Handlungskompetenz im Arbeitsalltag.
*   **Beispiel:** "Führung im eigenen Organisationskontext einordnen", "Entscheidungslogiken erkennen".

### 4. Inhalte
*   **Format:** Nummerierte Liste (1-5 Module) ODER Interaktive Grafik (Modell).
*   **Inhalt:** Die Sach-Themen des Seminars (Curriculum).
*   **Beispiel:** "1. Führungskultur", "2. Rolle & Erwartungen".

### 5. Praxis & Transfer
*   **Inhalt:** Beschreibung der Methodik.
*   **Beispiel:** "Arbeit an einer Fallstudie", "Konkrete Fallbeispiele der Teilnehmer", "Transfer in den eigenen Arbeitskontext".

### 6. Typische Anlässe (Der "Trigger")
*   **Format:** Bullets.
*   **Inhalt:** Wann bucht ein Unternehmen genau dieses Seminar?
*   **Beispiel:** "Projekte geraten in Verzug", "Teams arbeiten ohne klare Hierarchie".

### 7. Wirkung nach 4 Wochen (Nachhaltigkeit)
*   **Format:** Bullets.
*   **Inhalt:** Was hat sich langfristig verändert?
*   **Beispiel:** "Führung wirkt klarer", "Prozesse sind stabiler".

### 8. Footer-CTA
*   **Text:** "Unverbindlich abstimmen – Schwerpunkte, Beispiele und Umfang passend zum Kontext."
*   **Action:** Kontakt aufnehmen.

---

## 4. Do's & Don'ts

### ✅ DO
*   **Do:** Nutze CSS-Variablen (`var(--seminar-accent)`), um Farben überall konsistent zu halten.
*   **Do:** Prüfe Grafiken auf Mobile-View (Chrome DevTools).
*   **Do:** Halte dich STRIKT an den 8-Phasen-Aufbau.
*   **Do:** Commit Messages müssen aussagekräftig sein.

### ❌ DON'T
*   **Don't:** Mische Farben aus verschiedenen Kategorien (z.B. Gold bei Leadership).
*   **Don't:** Lösche Sektionen (z.B. "Nach dem Training" weglassen), nur weil sie "ähnlich" klingen.
*   **Don't:** Nutze Standard-Bootstrap-Look. Es muss "Custom Premium" aussehen.

---

## 5. Checkliste vor Fertigstellung
1.  [ ] Stimmt die Kategorie-Farbe? (Prüfung gegen Farb-System Tabelle).
2.  [ ] Sind alle 8 Sektionen vorhanden?
3.  [ ] Ist die Change-Seite Blau-Dominiert (Hero)?
4.  [ ] Funktionieren alle Links (Breadcrumbs, Footer, CTAs)?
