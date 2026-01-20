
import re
import os
from difflib import get_close_matches

TEXT_CONTENT_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/combined_seminars.txt"
SEMINAR_DIR = "/Users/theoreichert/Documents/Projects/wtm-consulting/seminare"
JS_DATA_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/js/seminar-data.js"

def normalize(text):
    # Remove special chars, lower case, remove spaces
    return re.sub(r'[^a-z0-9]', '', text.lower())

def clean_html_title(raw_title):
    # Remove tags
    clean = re.sub(r'<[^>]+>', '', raw_title)
    # Replace newlines and multiple spaces with single space
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def debug_matching():
    # 1. Load Text Keys
    with open(TEXT_CONTENT_FILE, 'r') as f:
        full_text = f.read()
    
    text_titles = []
    blocks = re.split(r'={10,}\nSEMINAR: ', full_text)
    for block in blocks:
        lines = block.strip().split('\n')
        if not lines: continue
        title = lines[0].strip('=').strip()
        text_titles.append(title)
        
    print(f"Loaded {len(text_titles)} titles from text file.")
    
    # 2. Load HTML Titles (from files that were likely missed)
    # We'll just look at a few files that failed in the previous run
    test_files = [
        "teambuilding.html",
        "burnout-praevention.html",
        "mitarbeiterbefragung.html",
        "outdoor-training.html",
        "8d-problemloesung.html" # Assuming name
    ]
    
    # Also get all html files to be thorough
    html_files = [f for f in os.listdir(SEMINAR_DIR) if f.endswith(".html")]
    
    print("\nMatching Analysis:")
    print("HTML File -> Extracted Title -> Best Text Match")
    print("-" * 60)
    
    for filename in html_files:
        filepath = os.path.join(SEMINAR_DIR, filename)
        with open(filepath, 'r') as f:
            content = f.read()
            
        # Extract H1
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        if h1_match:
            raw_h1 = h1_match.group(1)
            h1_title = clean_html_title(raw_h1)
        else:
            h1_title = "NO H1 FOUND"
            
        # Try finding match
        matches = get_close_matches(h1_title, text_titles, n=1, cutoff=0.6)
        match = matches[0] if matches else "NO MATCH"
        
        # Check normalization match
        norm_h1 = normalize(h1_title)
        norm_match = "NO NORM MATCH"
        for t in text_titles:
            if normalize(t) == norm_h1:
                norm_match = t
                break
        
        # Only print if interesting (no match or fuzzy match)
        if match == "NO MATCH" and norm_match == "NO NORM MATCH":
            print(f"{filename:<30} | {h1_title:<30} | ❌ NO MATCH")
        elif match != h1_title and norm_match == "NO NORM MATCH":
             print(f"{filename:<30} | {h1_title:<30} | ~ {match} (Fuzzy)")
        else:
            pass # Perfect match, boring
            
if __name__ == "__main__":
    debug_matching()
