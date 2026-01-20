
import os
import re

SEMINAR_DIR = "/Users/theoreichert/Documents/Projects/wtm-consulting/seminare"
JS_DATA_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/js/seminar-data.js"

def verify_seminars():
    # 1. Get list of all HTML files in seminar dir
    try:
        html_files = [f for f in os.listdir(SEMINAR_DIR) if f.endswith(".html")]
    except FileNotFoundError:
        print(f"Error: Directory {SEMINAR_DIR} not found.")
        return

    print(f"Found {len(html_files)} HTML files in {SEMINAR_DIR}")

    # 2. Read JS data file
    try:
        with open(JS_DATA_FILE, 'r') as f:
            js_content = f.read()
    except FileNotFoundError:
        print(f"Error: File {JS_DATA_FILE} not found.")
        return

    # 3. Extract URLs from JS file
    # Look for url: "seminare/..." or url: 'seminare/...'
    # We want to match exactly the filenames
    found_urls = set()
    matches = re.findall(r'["\']?url["\']?\s*:\s*["\']seminare/([^"\']+)["\']', js_content)
    for match in matches:
        found_urls.add(match)
    
    print(f"Found {len(found_urls)} seminar URLs in {JS_DATA_FILE}")

    # 4. Check for missing files
    missing_in_js = []
    for html_file in html_files:
        if html_file not in found_urls:
            missing_in_js.append(html_file)

    if missing_in_js:
        print(f"\nCRITICAL: {len(missing_in_js)} HTML files are NOT linked in {JS_DATA_FILE}:")
        for f in missing_in_js:
            print(f" - {f}")
    else:
        print("\nSUCCESS: All HTML files are linked in the JS data file!")

    # 5. Check for valid checking (files in JS that don't exist on disk)
    missing_on_disk = []
    for url in found_urls:
        if url not in html_files:
            missing_on_disk.append(url)
            
    if missing_on_disk:
        print(f"\nWARNING: {len(missing_on_disk)} URLs in JS point to non-existent files:")
        for f in missing_on_disk:
            print(f" - {f}")

if __name__ == "__main__":
    verify_seminars()
