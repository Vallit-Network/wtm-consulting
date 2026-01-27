
import os
import re

SEMINAR_DIR = "../seminare"

def standardize_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Header
    # Pattern to match <header> tag and everything inside it
    # We use non-greedy matching but need to handle potential newlines
    header_pattern = re.compile(r'<header.*?>.*?</header>', re.DOTALL | re.IGNORECASE)
    
    if header_pattern.search(content):
        # Check if nav-placeholder already exists to avoid double insertion if header also exists (weird case)
        if 'id="nav-placeholder"' not in content:
            print(f"Replacing header in {filepath}")
            content = header_pattern.sub('<div id="nav-placeholder"></div>', content)
        else:
            print(f"Replacing header in {filepath} (placeholder already there, just removing header)")
            content = header_pattern.sub('', content)
    elif 'id="nav-placeholder"' not in content:
        # If no header and no placeholder, we might need to insert it at the beginning of body
        print(f"No header found in {filepath} and no placeholder. Injecting placeholder after <body>.")
        body_pattern = re.compile(r'<body.*?>', re.IGNORECASE)
        match = body_pattern.search(content)
        if match:
             content = content[:match.end()] + '\n    <div id="nav-placeholder"></div>' + content[match.end():]

    # 2. Replace Footer
    footer_pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL | re.IGNORECASE)
    
    if footer_pattern.search(content):
        if 'id="footer-placeholder"' not in content:
            print(f"Replacing footer in {filepath}")
            content = footer_pattern.sub('<div id="footer-placeholder"></div>', content)
        else:
            print(f"Replacing footer in {filepath} (placeholder already there, just removing footer)")
            content = footer_pattern.sub('', content)
    elif 'id="footer-placeholder"' not in content:
        print(f"No footer found in {filepath} and no placeholder. Injecting placeholder before </body>.")
        # Inject before script tags or body end
        if '<script src="../js/main.js"' in content:
             content = content.replace('<script src="../js/main.js"', '<div id="footer-placeholder"></div>\n    <script src="../js/main.js"')
        else:
             content = content.replace('</body>', '    <div id="footer-placeholder"></div>\n</body>')


    # 3. Remove existing Chatbot Scripts/Buttons
    # Chatbot helper button
    chatbot_helper_pattern = re.compile(r'<div class="chatbot-helper".*?</div>', re.DOTALL | re.IGNORECASE)
    if chatbot_helper_pattern.search(content):
         print(f"Removing hardcoded chatbot helper in {filepath}")
         content = chatbot_helper_pattern.sub('', content)
         
    # Vallit script
    vallit_script_pattern = re.compile(r'<script src="https://www.vallit.net/widget/embed.js".*?</script>', re.DOTALL | re.IGNORECASE)
    if vallit_script_pattern.search(content):
        print(f"Removing hardcoded Vallit script in {filepath}")
        content = vallit_script_pattern.sub('', content)

    # Legacy Fetch Script (custom header/footer loader)
    legacy_fetch_pattern = re.compile(r"fetch\('\.\./components/header\.html'\)[\s\S]*?\}\);[\s\S]*?fetch\('\.\./components/footer\.html'\)[\s\S]*?\}\);", re.DOTALL | re.IGNORECASE)
    if legacy_fetch_pattern.search(content):
         print(f"Removing legacy fetch script in {filepath}")
         content = legacy_fetch_pattern.sub('', content)
    
    # Also remove the script block wrapper if it's now empty or just contains the scroll logic which might be redundant or broken without the elements.
    # Actually, the scroll logic in that script (lines 916-941) relies on 'header' element which injectSharedComponents creates.
    # So we should KEEP the scroll logic but REMOVE the fetch logic.
    # My regex above matches only the fetch parts. Perfect.

    # 4. Check for main.js presence
    if 'src="../js/main.js"' not in content and 'src="js/main.js"' not in content:
        print(f"WARNING: main.js not found in {filepath}. Injecting it.")
        content = content.replace('</body>', '    <script src="../js/main.js"></script>\n</body>')
    
    # 5. Clean up duplicate placeholders if any (simple check)
    # Sometimes logic might leave double placeholders if file was weird, though logic above tries to avoid it.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    if not os.path.exists(SEMINAR_DIR):
        print(f"Directory {SEMINAR_DIR} not found from current location: {os.getcwd()}")
        return

    for filename in os.listdir(SEMINAR_DIR):
        if filename.endswith(".html"):
            filepath = os.path.join(SEMINAR_DIR, filename)
            standardize_file(filepath)
            
if __name__ == "__main__":
    main()
