
import re

JS_DATA_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/js/seminar-data.js"

def check_content_quality():
    try:
        with open(JS_DATA_FILE, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File {JS_DATA_FILE} not found.")
        return

    # Simple regex to find objects. This is a heuristic, real JS parsing is harder in regex but enough for "content quality" check.
    # We look for "title:", "intro:", "ziele:", "inhalte:", "nutzen:" and check if they look like placeholders.
    
    placeholders = ["Lorem ipsum", "Text folgt", "Hier kommt", "Blindtext", "Platzhalter"]
    
    print(f"Checking {JS_DATA_FILE} for placeholders...")
    
    issues_found = 0
    
    # Split by likely object start to identify which seminar has issues
    # This split is very rough, relying on the ID keys which look like "key": {
    seminar_blocks = re.split(r'\n\s*"[\w-]+":\s*\{', content)
    
    # Skip the first chunk (header)
    for i, block in enumerate(seminar_blocks[1:]):
        # recover the key roughly
        key_match = re.search(r'id:\s*["\']([\w-]+)["\']', block)
        seminar_id = key_match.group(1) if key_match else f"Unknown_Index_{i}"
        
        block_issues = []
        for ph in placeholders:
            if ph.lower() in block.lower():
                block_issues.append(f"Contains placeholder text '{ph}'")
        
        # Check for empty content fields
        if 'intro: "",' in block or "intro: ''," in block:
            block_issues.append("Empty intro")
        if 'nutzen: "",' in block or "nutzen: ''," in block:
            block_issues.append("Empty nutzen")
            
        if block_issues:
            issues_found += 1
            print(f"ISSUES in {seminar_id}:")
            for issue in block_issues:
                print(f"  - {issue}")

    if issues_found == 0:
        print("\nSUCCESS: No obvious content placeholders found in seminar data.")
    else:
        print(f"\nFOUND issues in {issues_found} seminars.")

if __name__ == "__main__":
    check_content_quality()
