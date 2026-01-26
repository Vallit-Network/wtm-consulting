import os
import re

def clean_seminar_data():
    path = "js/seminar-data.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.readlines()
    
    new_content = []
    seen_urls = set() # Track for duplicates in same object block if needed, but simple line processing is easier
    
    # Simple state machine or just line-by-line regex?
    # The duplicate issue: 
    # url: "seminare/change-kommunikation.html",
    # url: "seminare/change-kommunikation",
    # We want to keep the clean one, or cleaner: just replace any line with `url:` to be the clean version.
    
    for line in content:
        # Check for url property
        match = re.search(r'url:\s*"(.*)"', line)
        if match:
            current_url = match.group(1)
            # Remove .html if present
            clean_url = current_url.replace('.html', '')
            
            # Construct new line
            # Preserve indentation
            indentation = line.split('url:')[0]
            new_line = f'{indentation}url: "{clean_url}",\n'
            
            # If we just added this exact line (duplicate case handling), skip. 
            # But wait, the previous tool added the clean line AFTER the dirty line.
            # So if I clean the dirty line, I get two identical clean lines.
            
            # Better approach:
            # If line has .html, clean it.
            # If next line is identical to what we just made, that's a duplicate.
            # actually, let's just clean all of them, and then uniq them? No, order matters.
            
            # simpler: Read whole file, regex replace `url: "(.+)\.html",` with `url: "$1",`.
            # Then check for duplicate lines.
            pass

    # Re-reading file as string for easier regex
    with open(path, "r", encoding="utf-8") as f:
        full_text = f.read()

    # Step 1: Clean all URLs
    # Replace `url: "path/to/file.html"` with `url: "path/to/file"`
    full_text = re.sub(r'url:\s*"(.*)\.html"', r'url: "\1"', full_text)
    
    # Step 2: Remove duplicates caused by previous error
    # Look for:
    # url: "path/to/file",
    # url: "path/to/file",
    # Regex for duplicate lines?
    
    lines = full_text.split('\n')
    deduped_lines = []
    for i, line in enumerate(lines):
        if i > 0 and line.strip().startswith('url:') and line.strip() == lines[i-1].strip():
            continue # Skip duplicate
        deduped_lines.append(line)
        
    with open(path, "w", encoding="utf-8") as f:
        f.write('\n'.join(deduped_lines))
    print(f"Cleaned {path}")

def clean_main_js():
    path = "js/main.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace dynamic link usage
    # seminar.html?id= -> seminar?id=
    new_content = content.replace("seminar.html?id=", "seminar?id=")
    
    if content != new_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {path}")
    else:
        print(f"No changes needed for {path}")

def clean_html_links():
    # Walk all html files
    for root, dirs, files in os.walk("."):
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        if ".git" in dirs:
            dirs.remove(".git")
            
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Regex to find href="... .html"
                # Exclude http://, https://
                # Groups: 1=quote, 2=path, 3=.html
                
                # Pattern: href=(["'])(?!(?:http|https|mailto|tel):)(.*?)\.html([?#].*?)?\1
                # Replacement: href=\1\2\3\1
                
                def replacer(match):
                    quote = match.group(1)
                    url_path = match.group(2)
                    suffix = match.group(3) or ""
                    return f'href={quote}{url_path}{suffix}{quote}'
                
                new_content = re.sub(r'href=(["\'])(?!(?:http|https|mailto|tel):)(.*?)\.html([?#].*?)?\1', replacer, content)
                
                if content != new_content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated links in {path}")

if __name__ == "__main__":
    clean_seminar_data()
    clean_main_js()
    clean_html_links()
