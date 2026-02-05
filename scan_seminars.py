
import os
import re

SEMINAR_DIR = "/Users/theoreichert/Documents/Projects/wtm-consulting/seminare"

def audit_files():
    print(f"Scanning {SEMINAR_DIR}...")
    
    issues = {
        "legacy_footer": [],
        "fontawesome": [],
        "emojis": [],
        "missing_praxis": [],
        "missing_wirkung": [],
        "missing_transformation": []
    }

    for filename in os.listdir(SEMINAR_DIR):
        if not filename.endswith(".html"):
            continue
            
        filepath = os.path.join(SEMINAR_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Check Footer
            if "cta-box" in content:
                issues["legacy_footer"].append(filename)
                
            # Check FontAwesome
            if "fa-" in content or "fas " in content or "far " in content:
                # Exclude if it's just a comment or something trivial, but usually this is a good indicator
                issues["fontawesome"].append(filename)
                
            # Check Emojis in badges (Simple heuristic for high-range unicode)
            # This regex looks for some common emoji ranges
            if re.search(r'class="category-badge">[^<]*[\U00010000-\U0010ffff]', content):
                issues["emojis"].append(filename)
                
            # Check Missing Sections (Heuristic by content headers or classes)
            # searching for "Praxis" in headings or content
            if "Praxis & Transfer" not in content and "Praxis &amp; Transfer" not in content:
                 issues["missing_praxis"].append(filename)
                 
            if "Wirkung nach 4 Wochen" not in content:
                issues["missing_wirkung"].append(filename)

            # Transformation check (Loose, as titles vary)
            if "Nach dem Training" not in content and "Transformation" not in content and "Transfer" not in content:
                issues["missing_transformation"].append(filename)

    print("\n--- AUDIT RESULTS ---")
    for issue_type, files in issues.items():
        print(f"\n[{issue_type.upper()}]: {len(files)} files")
        for f in files:
            print(f"  - {f}")

if __name__ == "__main__":
    audit_files()
