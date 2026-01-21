
import glob
import re
import os

try:
    files = glob.glob("seminare/*.html")
    # Regex to capture the entire related-section block
    # We use DOTALL to match across newlines
    # We match strictly from <section class="related-section"> to the closing </section>
    regex = re.compile(r'<section class="related-section">.*?</section>', re.DOTALL)
    
    count = 0
    for file_path in files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = regex.sub('', content)
        
        # Also clean up any potential double empty lines left behind
        # obscure case but good for cleanliness: replace triple newlines with double
        new_content = re.sub(r'\n\s*\n\s*\n', '\n\n', new_content)

        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Cleaned: {os.path.basename(file_path)}")
            count += 1
        else:
            # It might have been already removed or not present
            pass

    print(f"Total files cleaned: {count}")

except Exception as e:
    print(f"Error: {e}")
