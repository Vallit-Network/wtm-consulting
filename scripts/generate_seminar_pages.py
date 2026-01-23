import os
import json
import subprocess
from bs4 import BeautifulSoup

DATA_FILE = 'js/seminar-data.js'
TEMPLATE_FILE = 'seminare/laterales-fuehren.html'
OUTPUT_DIR = 'seminare'

def get_data():
    # Execute node to get the data as JSON
    cmd = [
        'node', 
        '-e', 
        'const fs = require("fs"); const window = {}; const content = fs.readFileSync("./js/seminar-data.js", "utf8"); eval(content); console.log(JSON.stringify(window.seminarsData));'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error getting data: {result.stderr}")
        return {}
    return json.loads(result.stdout)

def generate_pages():
    data = get_data()
    print(f"Loaded {len(data)} seminars from data.")

    # Read Template
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template_html = f.read()

    for key, item in data.items():
        if key == 'laterales-fuehren':
            continue # Don't overwrite the template/reference yet, or do we? 
            # Actually, to be safe, let's NOT overwrite the reference file currently used as template.
            # But the user wants "all" updated.
            # I'll update it LAST or verify it manually.
            # For now, skip to avoid reading/writing same file issues if logical errors exist.
            pass

        print(f"Generating {item['url']}...")
        
        soup = BeautifulSoup(template_html, 'html.parser')
        
        # 1. Title & Meta
        if soup.title:
            soup.title.string = f"{item['title']} – WTM Management Consulting"
        
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            meta_desc['content'] = item['shortDescription']

        # 2. Hero Section
        # Breadcrumb
        breadcrumb = soup.find('div', class_='breadcrumb')
        if breadcrumb:
            # Last span is the current page title
            spans = breadcrumb.find_all('span')
            if spans:
                spans[-1].string = item['title'] # Or just title
        
        # Category Badge
        badge = soup.find('div', class_='category-badge')
        if badge:
            badge.string = item.get('badge', 'Seminar')
            
        # Hero Title
        h1 = soup.find('h1', class_='hero-title')
        if h1:
            # We preserve the <span> for styling if possible
            # But simplistic approach: just set text.
            # Better: split title by last word or " - ".
            # Let's try to keep it simple but nice.
            parts = item['title'].partition(':')
            if parts[1]: # Found a colon
                h1.clear()
                h1.append(parts[0] + ":")
                span = soup.new_tag('span')
                span.string = parts[2]
                h1.append(span)
            else:
                h1.string = item['title']

        # Hero Subtitle
        sub = soup.find('p', class_='hero-subtitle')
        if sub:
            sub.string = item['shortDescription']

        # Hero Meta (Details)
        meta_container = soup.find('div', class_='hero-meta')
        if meta_container and 'details' in item:
            meta_container.clear()
            # SVGs for icons (reuse generic ones)
            icons = [
                '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>', # Calendar
                '<circle cx="12" cy="12" r="10"></circle>', # Circle
                '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>' # User
            ]
            
            for i, detail in enumerate(item['details']):
                span = soup.new_tag('span', attrs={'class': 'meta-tag'})
                
                svg = soup.new_tag('svg', viewBox="0 0 24 24", fill="none", stroke="currentColor", **{'stroke-width': '2'})
                # Insert SVG path content via innerHTML hack or just parsing
                icon_idx = i % len(icons)
                svg_inner = BeautifulSoup(icons[icon_idx], 'html.parser')
                svg.append(svg_inner)
                
                span.append(svg)
                span.append(detail)
                meta_container.append(span)

        # 3. Intro Section
        # This is the section after Hero. In template it has "Nach dem Training".
        # But logically, we need "Intro" text somewhere.
        # Template doesn't have a huge intro block, it uses "Nach dem Training" (Transfer) as the first white block?
        # Wait, looking at `laterales-fuehren.html`:
        # Hero -> #nutzen (Nutzen & Wirkung) -> .intro-section (Transfer/Nach dem Training) -> .content-section (Themenübersicht)
        # -> .intro-section (Praxis & Transfer) -> .goals-section (Typische Anlässe) -> .intro-section (Wirkung nach 4 Wochen) -> CTA -> Footer.
        
        # We should map data to this structure.
        
        # #nutzen (Goals/Benefits)
        nutzen_grid = soup.find('div', class_='goals-grid')
        if nutzen_grid:
            nutzen_grid.clear()
            goals = item['content'].get('ziele', [])
            for i, goal in enumerate(goals, 1):
                card = soup.new_tag('div', attrs={'class': 'goal-card'})
                
                num = soup.new_tag('div', attrs={'class': 'goal-number'})
                num.string = str(i)
                card.append(num)
                
                txt = soup.new_tag('p', attrs={'class': 'goal-text'})
                txt.string = goal
                card.append(txt)
                
                nutzen_grid.append(card)

        # "Nach dem Training" (Transfer)
        # We don't have explicit data for this in extracted items.
        # We can use `content.intro` here maybe? Or just generic text.
        # Let's put `content.intro` into the "Nach dem Training" block but rename header?
        # Or rename it to "Über das Seminar".
        # Let's find the section via text search on "Nach dem Training"
        for h2 in soup.find_all('h2'):
            if "Nach dem Training" in h2.get_text():
                h2.string = "Über das Training"
                # Find the sibling content
                # The template has a checklist here. We might replace it with a text paragraph for Intro.
                parent = h2.find_parent('div', class_='intro-content')
                if parent:
                    # Clear the list
                    ul = parent.find('ul')
                    if ul: ul.decompose()
                    
                    # Add paragraph
                    p = soup.new_tag('p', attrs={'class': 'intro-text', 'style': 'margin-top: 1.5rem;'})
                    p.string = item['content'].get('intro', '')
                    parent.append(p)

        # Content/Timeline (Themenübersicht)
        # #journeyLine
        journey_container = soup.find('div', class_='journey-container')
        if journey_container:
            # We need to keep the journey-line but clear items.
            line = journey_container.find('div', class_='journey-line')
            journey_container.clear()
            if line: journey_container.append(line)
            
            # Parse contents
            inhalte_str = item['content'].get('inhalte', '')
            # Split by period or patterns?
            # Basic splitting by sentences or "Thema:"
            # If extracting script produced "Title: Desc", we can split by that.
            # Let's try to be smart.
            
            items = []
            if ":" in inhalte_str:
                # heuristic splitting
                # content extract produced "T1: D1 T2: D2"
                # might be hard to split perfectly.
                # Let's just treat the whole string as one item if we can't split, 
                # OR if it's extracted, it might be messy.
                # Actually, let's just make ONE big item if unsure, 
                # or split by dot/bullet.
                parts = inhalte_str.split('. ')
                for p in parts:
                    if p.strip():
                        items.append({'title': 'Schwerpunkt', 'desc': p.strip()})
            else:
                items.append({'title': 'Seminarinhalte', 'desc': inhalte_str})

            # Create items
            for i, module in enumerate(items, 1):
                item_div = soup.new_tag('div', attrs={'class': 'journey-item'})
                
                # Node
                node = soup.new_tag('div', class_='journey-node')
                dot = soup.new_tag('div', class_='node-dot')
                dot.append(soup.new_tag('div', class_='node-ring'))
                node.append(dot)
                node.append(soup.new_tag('div', class_='node-connector'))
                item_div.append(node)
                
                # Content
                content_div = soup.new_tag('div', class_='journey-content')
                card = soup.new_tag('div', class_='journey-card')
                
                badge = soup.new_tag('div', class_='module-badge')
                b_num = soup.new_tag('span', class_='module-number')
                b_num.string = f"Thema {i:02d}"
                badge.append(b_num)
                card.append(badge)
                
                h3 = soup.new_tag('h3', class_='journey-title')
                h3.string = module['title']
                card.append(h3)
                
                p = soup.new_tag('p')
                p.string = module['desc']
                card.append(p)
                
                content_div.append(card)
                item_div.append(content_div)
                
                journey_container.append(item_div)


        # Target Group (in CTA section)
        # "Für wen ist dieses Seminar?"
        target_card = soup.find('div', class_='target-card')
        if target_card:
            p_tag = target_card.find('p')
            if p_tag:
               p_tag.string = item['content'].get('zielgruppe', '')

        # "Wirkung nach 4 Wochen" -> Use data.content.nutzen string
        for h2 in soup.find_all('h2'):
            if "Wirkung nach 4 Wochen" in h2.get_text():
                # Replace content
                parent = h2.find_parent('div', class_='intro-content')
                if parent:
                    ul = parent.find('ul')
                    if ul: ul.decompose()
                    
                    p = soup.new_tag('p', attrs={'class': 'intro-text'})
                    p.string = item['content'].get('nutzen', '')
                    parent.append(p)

        # Save
        filename = item['url'].split('/')[-1]
        out_path = os.path.join(OUTPUT_DIR, filename)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))

if __name__ == "__main__":
    generate_pages()
