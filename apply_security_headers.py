import os
import re
from bs4 import BeautifulSoup

# CSP Configuration
CSP_CONTENT = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.vallit.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.vallit.net; font-src 'self' https://fonts.gstatic.com https://www.vallit.net; img-src 'self' data: https://www.vallit.net; connect-src 'self' https://www.vallit.net; frame-src 'self' https://www.vallit.net;"

def apply_security_headers(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')

    # 1. Add CSP Meta Tag
    if not soup.find('meta', {'http-equiv': 'Content-Security-Policy'}):
        meta_csp = soup.new_tag('meta')
        meta_csp['http-equiv'] = 'Content-Security-Policy'
        meta_csp['content'] = CSP_CONTENT
        
        # Insert after viewport or charset
        viewport = soup.find('meta', {'name': 'viewport'})
        if viewport:
            viewport.insert_after(meta_csp)
        else:
            soup.head.insert(0, meta_csp)
        print(f"Added CSP to {os.path.basename(file_path)}")
    else:
        # Update existing
        meta_csp = soup.find('meta', {'http-equiv': 'Content-Security-Policy'})
        if meta_csp['content'] != CSP_CONTENT:
             meta_csp['content'] = CSP_CONTENT
             print(f"Updated CSP in {os.path.basename(file_path)}")

    # 2. Add X-Content-Type-Options (Best effort via meta, though usually header)
    # Actually, meta http-equiv for X-Content-Type-Options is not standard/supported in all browsers but good practice if no headers
    # Skipping to keep it clean, focus on CSP.

    # 3. Fix target="_blank" links
    links = soup.find_all('a', target='_blank')
    fixed_links = 0
    for link in links:
        rel = link.get('rel', [])
        if isinstance(rel, str):
            rel = rel.split()
        
        changed = False
        if 'noopener' not in rel:
            rel.append('noopener')
            changed = True
        if 'noreferrer' not in rel:
            rel.append('noreferrer')
            changed = True
            
        if changed:
            link['rel'] = rel
            fixed_links += 1
            
    if fixed_links > 0:
        print(f"Fixed {fixed_links} links in {os.path.basename(file_path)}")

    # Save changes
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main():
    # Process index.html
    apply_security_headers('index.html')
    
    # Process other root htmls
    for f in ['impressum.html', 'datenschutz.html', 'seminar.html']:
        if os.path.exists(f):
             apply_security_headers(f)

    # Process seminare/
    seminar_dir = 'seminare'
    if os.path.exists(seminar_dir):
        for filename in os.listdir(seminar_dir):
            if filename.endswith('.html'):
                apply_security_headers(os.path.join(seminar_dir, filename))

if __name__ == "__main__":
    main()
