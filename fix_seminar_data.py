
import os
import re
import json

SEMINAR_DIR = "/Users/theoreichert/Documents/Projects/wtm-consulting/seminare"
JS_DATA_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/js/seminar-data.js"
TEXT_CONTENT_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/combined_seminars.txt"

CATEGORY_MAP = {
    "Führung": "leadership",
    "Gesundheit": "health",
    "Kommunikation": "communication",
    "Change": "change",
    "Veränderung": "change",
    "Management": "management",
    "Vertrieb": "management" # Fallback
}

def load_text_content():
    try:
        with open(TEXT_CONTENT_FILE, 'r') as f:
            full_text = f.read()
    except FileNotFoundError:
        print("Text content file not found.")
        return {}

    # Split by "SEMINAR:" or "================================================================================"
    # Helper to clean titles
    seminar_map = {}
    
    # Regex to find seminar blocks. 
    # Pattern: =+ \n SEMINAR: (Title) \n =+ ... content ... until next =+
    blocks = re.split(r'={10,}\nSEMINAR: ', full_text)
    
    for block in blocks:
        lines = block.strip().split('\n')
        if not lines: continue
        
        # First line is title (after SEMINAR: was stripped by split)
        title_line = lines[0].strip('=').strip()
        
        # Simple content extraction
        # We need "Ziele", "Inhalte", "Nutzen", "Zielgruppe"
        # We'll just store the whole block for fuzzy searching if needed, 
        # or parse sections.
        
        content_dict = {
            "title": title_line,
            "intro": "",
            "ziele": [],
            "inhalte": "",
            "nutzen": "",
            "zielgruppe": ""
        }
        
        current_section = "intro"
        buffer = []
        
        for line in lines[1:]:
            strip_line = line.strip()
            if strip_line.lower().startswith("ziele"):
                content_dict[current_section] = "\n".join(buffer).strip()
                current_section = "ziele"
                buffer = []
            elif strip_line.lower().startswith("inhalte"):
                 # Handle list of goals before switching
                 if current_section == "ziele":
                     # processing ziele list later
                     content_dict[current_section] = buffer # keep as list of lines for now
                 else:
                     content_dict[current_section] = "\n".join(buffer).strip()
                     
                 current_section = "inhalte"
                 buffer = []
            elif strip_line.lower().startswith("nutzen"):
                content_dict[current_section] = "\n".join(buffer).strip()
                current_section = "nutzen"
                buffer = []
            elif strip_line.lower().startswith("zielgruppe"):
                content_dict[current_section] = "\n".join(buffer).strip()
                current_section = "zielgruppe"
                buffer = []
            elif "selbstverständlich ist dies nur ein vorschlag" in strip_line.lower():
                break # End of useful content
            else:
                if strip_line and not strip_line.startswith("======="):
                    buffer.append(strip_line)
        
        content_dict[current_section] = "\n".join(buffer).strip()
        
        # Clean up Ziele (often a list)
        if isinstance(content_dict["ziele"], list):
            # It was a list of lines
            goals_text = "\n".join(content_dict["ziele"])
            # Try to make it a list of strings
            goals = [g.strip().lstrip('•').lstrip('-').strip() for g in goals_text.split('\n') if g.strip()]
            content_dict["ziele"] = goals
        else:
             content_dict["ziele"] = [content_dict["ziele"]]

        # Key by simplified title for matching
        simple_key = re.sub(r'[^a-zA-Z0-9]', '', title_line.lower())
        seminar_map[simple_key] = content_dict
        
    return seminar_map

def normalize_key(text):
    return re.sub(r'[^a-zA-Z0-9]', '', text.lower())

def extract_html_metadata(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Title
    title_match = re.search(r'<title>(.*?) – WTM</title>', content)
    title = title_match.group(1) if title_match else "Unbekanntes Seminar"
    
    # H1
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if h1_match:
        h1_raw = h1_match.group(1)
        # Remove spans
        h1_clean = re.sub(r'<[^>]+>', '', h1_raw).replace('\n', '')
        # If title was generic, use H1
        if title == "Unbekanntes Seminar":
            title = h1_clean
            
    # Description
    desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    description = desc_match.group(1) if desc_match else f"Seminar zum Thema {title}"
    
    # Category
    cat_match = re.search(r'<div class="category-badge">[^<]*\s(\w+)</div>', content)
    cat_raw = cat_match.group(1) if cat_match else "Management"
    category = CATEGORY_MAP.get(cat_raw, "management")
    
    return {
        "title": title,
        "description": description,
        "category": category
    }

def generate_missing_entries():
    # 1. Get existing JS keys
    with open(JS_DATA_FILE, 'r') as f:
        js_content = f.read()
    
    existing_keys = set(re.findall(r'id:\s*["\']([\w-]+)["\']', js_content))
    print(f"Found {len(existing_keys)} existing keys in JS.")
    
    # 2. Get missing HTML files
    html_files = [f for f in os.listdir(SEMINAR_DIR) if f.endswith(".html")]
    missing_files = [f for f in html_files if f.replace('.html', '') not in existing_keys]
    print(f"Found {len(missing_files)} missing HTML files.")
    
    if not missing_files:
        print("No missing files! Exiting.")
        return

    # 3. Load content map
    content_map = load_text_content()
    print(f"Loaded {len(content_map)} seminar content blocks from text file.")
    
    new_entries = []
    
    for filename in missing_files:
        file_id = filename.replace('.html', '')
        filepath = os.path.join(SEMINAR_DIR, filename)
        
        metadata = extract_html_metadata(filepath)
        title = metadata['title']
        
        # Try to match content
        # 1. Exact normalize match
        # 2. Contains match
        
        norm_title = normalize_key(title)
        
        content_data = None
        
        # Try exact match first
        if norm_title in content_map:
            content_data = content_map[norm_title]
        else:
            # Try fuzzy contains
            for k, v in content_map.items():
                if k in norm_title or norm_title in k:
                    content_data = v
                    break
        
        # Fallback if no content found
        if not content_data:
            print(f"WARNING: No text content found for '{title}' ({filename}). Using HTML metadata.")
            content_data = {
                "intro": metadata['description'],
                "ziele": ["Kompetenzen erweitern", "Methoden kennenlernen", "Transfer in die Praxis"],
                "inhalte": "Grundlagen, Vertiefung, Praxisübungen, Fallbeispiele.",
                "nutzen": "Sie erweitern Ihr Fachwissen und Ihre Handlungskompetenz.",
                "zielgruppe": "Fach- und Führungskräfte."
            }
            
        # Construct JS Object String
        # JSON dump is safer for escaping
        
        js_obj = {
            "id": file_id,
            "title": title,
            "url": f"seminare/{filename}",
            "category": metadata['category'],
            "badge": "Seminar",
            "shortDescription": metadata['description'],
            "details": ["1-2 Tage", "Intensiv", "Praxis"],
            "heroImage": "assets/hero-meeting.jpg",
            "content": {
                "intro": content_data.get("intro", "")[:300] + "...", # Truncate if too long? No, keep it.
                "ziele": content_data.get("ziele", []),
                "inhalte": content_data.get("inhalte", ""),
                "nutzen": content_data.get("nutzen", ""),
                "zielgruppe": content_data.get("zielgruppe", "")
            }
        }
        
        # Manual formatting to match JS style (keys without quotes if simple)
        # But JSON is valid JS valid too.
        
        entry_str = f'    "{file_id}": {json.dumps(js_obj, ensure_ascii=False, indent=4)},'
        # Fix keys to be unquoted for style consistency (optional but nice)
        # We'll just leave them quoted, it's valid JS.
        
        new_entries.append(entry_str)

    # Append to file
    # We need to insert BEFORE the closing "};" of the main object.
    # We assume the file ends with "};" or similar.
    
    last_brace_index = js_content.rfind('};')
    if last_brace_index == -1:
        print("Error: Could not find closing brace in JS file.")
        return

    new_content_block = "\n" + "\n".join(new_entries) + "\n"
    
    final_js_content = js_content[:last_brace_index] + new_content_block + js_content[last_brace_index:]
    
    with open(JS_DATA_FILE, 'w') as f:
        f.write(final_js_content)
        
    print(f"Successfully added {len(new_entries)} seminars to {JS_DATA_FILE}")

if __name__ == "__main__":
    generate_missing_entries()
