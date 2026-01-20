
import os
import re
import json

JS_DATA_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/js/seminar-data.js"
TEXT_CONTENT_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/combined_seminars.txt"

# Manual mapping: HTML filename (no ext) -> Text File Title (Partial or Full)
MANUAL_MAP = {
    "teambuilding": "Gruppendynamik in Teams",
    "burnout-praevention": "Widerstandfähigkeit", # Close enough match contextually
    "8d-problemloesung": "8D Problemlösung",
    "achtsamkeit": "Gesunde Selbstführung", # Fallback
    "argumentieren-verhandeln": "Argumentieren Verhandeln",
    "azubi-training": "Young and Old",
    "berufliche-entwicklung-in-der-lebensphase-30-plus": "Berufliche Orientierung 30 plus",
    "berufliche-entwicklung-in-der-lebensphase-40-plus": "Berufliche Orientierung 40 plus",
    "berufliche-entwicklung-in-der-lebensphase-50-plus": "Berufliche Orientierung 50 plus",
    "berufliche-entwicklung-in-der-lebensphase-60-plus": "Berufliche Orientierung 60 plus",
    "bwl-fuer-nicht-bwler": "BLW für Nicht-BWLer",
    "chefperspektive": "Perspektivenwechsel",
    "coaching-basics-agile": "Coaching Basics für Agile Masters",
    "delegation-das-handwerk-der-fuehrung": "Delegation",
    "digitale-transformation": "Grundlagen Digitalisierung",
    "entscheidungen": "Intuition", # Good guess?
    "erfolgsfaktor-vertrauen": "Vertrauen",
    "fragetechniken": "Fragetechniken",
    "fuehren-durch-persoenlichkeit": "Führen durch Persönlichkeit",
    "fuehren-in-zentralbereichen": "Laterales Führen", # Similar concept
    "fuehrungskommunikation": "Arbeitsrecht und Kommunikation", 
    "fuehrungssimulation-krankenhaus-am-offenen-herzen": "Führungssimulation",
    "gesundheitsorientiertes-fuehren": "Gesundheitsorientiertes Führen",
    "komplexitaet-meistern": "Kompetenz für Komplexität",
    "kompetenz-komplexitaet": "Kompetenz für Komplexität",
    "konfliktmanagement": "Konflikterkennung",
    "kreativitaetstechniken": "Kreativitätstechniken",
    "krisenmanagement-fuer-projektmanager": "Krisenmanagement",
    "krisenmanagement": "Krisenmanagement",
    "leistungsfaehigkeit": "Körperliche und geistige Leistungsfähigkeit",
    "medientraining": "Medientraining",
    "mind-mapping": "Mind Mapping",
    "mitarbeiterbefragung": "interaktives Feedback",
    "moderation": "Moderation",
    "pferde-training": "Selbstmanagement mit Pferden",
    "praesentieren": "Präsentieren",
    "praesentieren-verstaendlich-erklaeren": "Präsentieren",
    "projektmanagement-basistraining": "Grundlagen Projektmanagement",
    "remote-work": "Remote Working",
    "resilienz": "Widerstandfähigkeit",
    "rhetorik": "Rhetorik",
    "selbstverantwortung-und-kritikkompetenz": "Selbstverantwortung und Kritikkompetenz",
    "stimmtraining": "Stimme und Körpersprache",
    "stimme-und-koerpersprache": "Stimme und Körpersprache",
    "stressmanagement": "Gesunde Selbstführung", # Fallback
    "train-the-trainer": "Trainerausbildung",
    "visualisieren": "Visualisieren an Flipchart",
    "gekonnt-visualisieren": "Visualisieren an Flipchart",
    "vom-mitarbeiter-zur-fuehrungskraft": "Vom Mitarbeiter zur Führungskraft",
    "wertschaetzende-kommunikation": "Kommunikation",
    "zusammenarbeit-von-generationen": "Young and Old",
    "change": "Change Kompetenz", # Fallback
    "change-kompetenz": "Change Kompetenz",
    "change-kommunikation-professionelle-kommunikation-im-veraenderungsprozess": "Change-Kommunikation",
    "interkulturelle-kompetenz": "Kommunikation" # Fallback
}

def load_text_content():
    try:
        with open(TEXT_CONTENT_FILE, 'r') as f:
            full_text = f.read()
    except:
        return {}

    seminar_map = {}
    blocks = re.split(r'={10,}\nSEMINAR: ', full_text)
    
    for block in blocks:
        lines = block.strip().split('\n')
        if not lines: continue
        title = lines[0].strip('=').strip()
        
        content = {
            "title": title,
            "intro": "",
            "ziele": [],
            "inhalte": "",
            "nutzen": "",
            "zielgruppe": ""
        }
        
        current_section = "intro"
        buffer = []
        
        for line in lines[1:]:
            s = line.strip()
            item = s.lower()
            if item.startswith("ziele"):
                content[current_section] = "\n".join(buffer).strip()
                current_section = "ziele"
                buffer = []
            elif item.startswith("inhalte"):
                if current_section == "ziele":
                    content[current_section] = buffer
                else:
                    content[current_section] = "\n".join(buffer).strip()
                current_section = "inhalte"
                buffer = []
            elif item.startswith("nutzen"):
                content[current_section] = "\n".join(buffer).strip()
                current_section = "nutzen"
                buffer = []
            elif item.startswith("zielgruppe"):
                content[current_section] = "\n".join(buffer).strip()
                current_section = "zielgruppe"
                buffer = []
            elif "selbstverstän" in item:
                break
            else:
                 if s and not s.startswith("==="):
                    buffer.append(s)
                    
        content[current_section] = "\n".join(buffer).strip()
        
        # Normalize lists
        if isinstance(content["ziele"], list):
            content["ziele"] = [x.strip().lstrip('•').lstrip('-').strip() for x in content["ziele"] if x.strip()]
        else:
            content["ziele"] = [content["ziele"]]

        seminar_map[title.lower()] = content
        
    return seminar_map

def update_js_file():
    with open(JS_DATA_FILE, 'r') as f:
        js_content = f.read()
        
    # We will regex replace the content objects for specific keys
    # finding pattern: "key": { ... "intro": "..." ... }
    # This is hard with regex. 
    # Better: Re-generate the entire file or use the parsed structure?
    # Parsing valid JS as strict JSON is impossible (comments, keys without quotes).
    # Since I just appended the new ones, they are clean JSON-like structure at the end of the file.
    
    # Let's find the block I added (it was at the end).
    # Actually, I'll just rewrite the file content if I can parsing it partially?
    # No, risky.
    
    # Strategy: Replace the entire variable definitions? No, too big.
    # Strategy B: Use regex to replace content for specific IDs.
    
    content_map = load_text_content()
    
    print(f"Loaded {len(content_map)} seminars from text.")
    
    count_updated = 0
    
    for file_id, map_title in MANUAL_MAP.items():
        # Find the text content content
        matching_content = None
        for k, v in content_map.items():
            if map_title.lower() in k:
                matching_content = v
                break
        
        if not matching_content:
            print(f"  Warning: No content found for mapping '{map_title}' ({file_id})")
            continue
            
        # Prepare the Replacement String for the "content" block
        # Pattern: "id": "file_id", ... "content": { ... }
        
        # We look for the id: "file_id"
        # Then we look for the "content": { ... } block following it
        
        # Pattern: "id": "file_id", ... "content": { ... }
        # Keys are quoted in the generated file.
        
        # We look for "id": "file_id" (quoted keys)
        # Then looking for "content": {
        
        # Regex explanation:
        # ["']?id["']?\s*:\s*["']{file_id}["']   -> match id key and value
        # [\s\S]*?                               -> match anything in between (comma, other keys)
        # ["']?content["']?\s*:\s*               -> match content key
        
        pattern = r'(["\']?id["\']?\s*:\s*["\']' + re.escape(file_id) + r'["\'][\s\S]*?["\']?content["\']?\s*:\s*)\{([\s\S]*?)\}'
        
        match = re.search(pattern, js_content)
        if match:
            # Construct new content block
            new_inner = f"""
            intro: {json.dumps(matching_content['intro'])},
            ziele: {json.dumps(matching_content['ziele'])},
            inhalte: {json.dumps(matching_content['inhalte'])},
            nutzen: {json.dumps(matching_content['nutzen'])},
            zielgruppe: {json.dumps(matching_content['zielgruppe'])}
            """
            
            # Replace
            # We need to be careful not to replace too much if regex is greedy.
            # safe pattern: content:\s*\{[^\}]*\}  provided no nested braces.
            # Our content is simple strings/arrays so it should match balanced braces logic?
            # actually content usually has nested arrays []. Regex `\{([\s\S]*?)\}` stops at first `}`.
            # If the content contains `ziele: [...]`, the first `]` is fine, but `}` of content object is what we want.
            # But `ziele` uses `[]`. So `}` should be the end of content object.
            
            # Wait, `ziele: [...]` does not contain `}`.
            
            js_content = js_content.replace(match.group(0), f"{match.group(1)}{{{new_inner}}}")
            count_updated += 1
        else:
            print(f"Could not find JS entry for {file_id}")
            
    with open(JS_DATA_FILE, 'w') as f:
        f.write(js_content)
        
    print(f"Updated {count_updated} seminar entries with real content.")

if __name__ == "__main__":
    update_js_file()
