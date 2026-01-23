import os
import re

SEMINAR_DIR = 'seminare'
DATA_FILE = 'js/seminar-data.js'

def extract_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract ID
    filename = os.path.basename(file_path)
    file_id = filename.replace('.html', '')

    # Extract Title
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    title = re.sub(r'<[^>]+>', ' ', title_match.group(1)).strip() if title_match else "Seminar Title"
    title = " ".join(title.split()) # Normalize whitespace

    # Extract Subtitle/Short Description
    desc_match = re.search(r'<p class="hero-subtitle[^"]*">(.*?)</p>', content, re.DOTALL)
    short_desc = re.sub(r'<[^>]+>', '', desc_match.group(1)).strip() if desc_match else "Beschreibung folgt."
    short_desc = " ".join(short_desc.split())

    # Extract Category
    cat_match = re.search(r'<div class="category-badge"[^>]*>(.*?)</div>', content, re.DOTALL)
    badge = re.sub(r'<[^>]+>', '', cat_match.group(1)).strip() if cat_match else "Seminar"
    
    # Map badge to category ID
    category = "leadership" # Default
    if "gesund" in badge.lower() or "health" in badge.lower():
        category = "health"
    elif "kommunikation" in badge.lower():
        category = "communication"
    elif "change" in badge.lower():
        category = "change"
    elif "management" in badge.lower() or "projekt" in badge.lower():
        category = "management"

    # Extract Intro
    intro_match = re.search(r'<p class="intro-text[^"]*">(.*?)</p>', content, re.DOTALL)
    intro = re.sub(r'<[^>]+>', '', intro_match.group(1)).strip() if intro_match else short_desc
    intro = " ".join(intro.split())

    # Extract Goals/Benefits
    goals = []
    goal_matches = re.finditer(r'<p class="goal-text"[^>]*>(.*?)</p>', content, re.DOTALL)
    for m in goal_matches:
        g = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        if g: goals.append(g)
    
    # Fallback for goals if none found (try li items in overview)
    if not goals:
        li_matches = re.finditer(r'<li[^>]*>(.*?)</li>', content, re.DOTALL)
        for m in li_matches:
            txt = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            if len(txt) > 10 and len(txt) < 150:
                goals.append(txt)
        goals = goals[:5] # Limit to 5

    # Extract Content/Inhalte
    # Try different structures
    # 1. Timeline items
    inhalte = []
    journey_matches = re.finditer(r'<h3 class="journey-title"[^>]*>(.*?)</h3>.*?<p>(.*?)</p>', content, re.DOTALL)
    for m in journey_matches:
        t = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        d = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        inhalte.append(f"{t}: {d}")
    
    # 2. Game rooms (for simulation)
    if not inhalte:
        room_matches = re.finditer(r'<div class="game-room.*?<h4>(.*?)</h4>.*?<p>(.*?)</p>', content, re.DOTALL)
        for m in room_matches:
            t = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            d = re.sub(r'<[^>]+>', '', m.group(2)).strip()
            inhalte.append(f"{t} ({d})")
            
    # 3. Technique cards
    if not inhalte:
        tech_matches = re.finditer(r'<div class="technique-card.*?<h4>(.*?)</h4>', content, re.DOTALL)
        for m in tech_matches:
             inhalte.append(m.group(1).strip())

    inhalte_str = " ".join(inhalte)
    if not inhalte_str:
        inhalte_str = "Detaillierte Seminarinhalte und Praxisübungen."

    # Extract Target Group
    target_match = re.search(r'<div class="target-card.*?<p>(.*?)</p>', content, re.DOTALL)
    target = re.sub(r'<[^>]+>', '', target_match.group(1)).strip() if target_match else "Führungskräfte und Interessierte."
    target = " ".join(target.split())

    # Construct JS Object String
    # Start carefully constructing the JS string
    js_entry = f"""    "{file_id}": {{
        id: "{file_id}",
        title: "{title}",
        url: "seminare/{filename}",
        category: "{category}",
        badge: "{badge}",
        shortDescription: "{short_desc}",
        details: ["2 Tage", "Praxis", "Transfer"],
        heroImage: "assets/hero-meeting.jpg",
        content: {{
            intro: "{intro}",
            ziele: {str(goals)},
            inhalte: "{inhalte_str}",
            nutzen: "Sie erweitern ihre Kompetenzen in {title}.",
            zielgruppe: "{target}"
        }}
    }},"""
    return file_id, js_entry

def update_data_file():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Identify existing IDs
    existing_ids = re.findall(r'^\s*"([^"]+)":\s*{', js_content, re.MULTILINE)
    print(f"Found {len(existing_ids)} existing seminars in data file.")

    # Find file list
    html_files = [f for f in os.listdir(SEMINAR_DIR) if f.endswith('.html')]
    print(f"Found {len(html_files)} HTML files in directory.")

    # Identify missing
    # Note: Keys in JS might not match filenames exactly in current state, but we want one key per filename.
    # If a file "foo.html" exists, we want a key "foo".
    
    new_entries = []
    
    for html_file in html_files:
        file_id = html_file.replace('.html', '')
        
        # Check if this ID is already in the file
        # Note: We do fuzzy check because some keys in legacy data might be different
        # But we want to enforce filename = key for the new system ideally.
        # If the key exists, we SKIP it (assume manual data is better).
        if file_id in existing_ids:
            continue
            
        # Check for alternate long keys (e.g. change-kommunikation...)
        # We'll skip if the *filename* appears in the 'url' field of any entry
        if f"seminare/{html_file}" in js_content:
            print(f"Skipping {html_file} (url found in existing data)")
            continue

        print(f"Processing missing seminar: {html_file}")
        try:
            _, entry = extract_content(os.path.join(SEMINAR_DIR, html_file))
            new_entries.append(entry)
        except Exception as e:
            print(f"Error extracting {html_file}: {e}")

    if new_entries:
        # Insert before the closing brace of the object
        # Find the last closing brace of the object 'const seminarsData = { ... };'
        last_brace_idx = js_content.rfind('};')
        if last_brace_idx != -1:
            new_data = "\n".join(new_entries)
            updated_content = js_content[:last_brace_idx] + "\n" + new_data + "\n" + js_content[last_brace_idx:]
            
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Added {len(new_entries)} new seminars to {DATA_FILE}")
        else:
            print("Could not find closing brace in structure.")
    else:
        print("No new seminars to add.")

if __name__ == "__main__":
    update_data_file()
