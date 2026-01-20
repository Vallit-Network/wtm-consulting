
import re

TEXT_FILE = "combined_seminars.txt"

def find_blocks():
    with open(TEXT_FILE, 'r') as f:
        text = f.read()

    # Search for Stress
    stress_idx = text.find("SEMINAR: Stressmanagement")
    if stress_idx != -1:
        print("--- STRESSMANAGEMENT ---")
        print(text[stress_idx:stress_idx+1000])
    else:
        print("Stressmanagement NOT FOUND with that exact string.")
        # fuzzy search
        matches = re.findall(r'SEMINAR:.*Stress.*', text)
        print("Matches for Stress:", matches)

    # Search for Change
    change_idx = text.find("SEMINAR: Change Management")
    if change_idx != -1:
        print("\n--- CHANGE MANAGEMENT ---")
        print(text[change_idx:change_idx+1000])
    else:
        print("\nChange Management NOT FOUND with that exact string.")
        matches = re.findall(r'SEMINAR:.*Change.*', text)
        print("Matches for Change:", matches)
        # Try getting content for one of them
        if matches:
            target = matches[0] # "SEMINAR: Change Kompetenz" ?
            idx = text.find(target)
            print(f"-- CONTENT FOR {target} --")
            print(text[idx:idx+1000])

if __name__ == "__main__":
    find_blocks()
