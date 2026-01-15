#!/usr/bin/env python3
"""
Script to extract text from all PDFs in the HiDrive folder
and combine them into a single readable text file.
"""
import os
import subprocess
import sys

# Install pdfminer if not available
try:
    from pdfminer.high_level import extract_text
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfminer.six", "-q"])
    from pdfminer.high_level import extract_text

PDF_DIR = "/Users/theoreichert/Documents/Projects/wtm-consulting/HiDrive-Produktblätter für Website pdf"
OUTPUT_FILE = "/Users/theoreichert/Documents/Projects/wtm-consulting/combined_seminars.txt"

def extract_all_pdfs():
    """Extract text from all PDFs and write to a combined file."""
    all_text = []
    
    # Get all PDF files
    pdf_files = sorted([f for f in os.listdir(PDF_DIR) if f.lower().endswith('.pdf')])
    
    print(f"Found {len(pdf_files)} PDF files. Extracting text...")
    
    for i, pdf_file in enumerate(pdf_files, 1):
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        print(f"[{i}/{len(pdf_files)}] Processing: {pdf_file}")
        
        try:
            text = extract_text(pdf_path)
            # Add a clear separator and header for each seminar
            all_text.append(f"\n{'='*80}\n")
            all_text.append(f"SEMINAR: {pdf_file.replace('.pdf', '')}\n")
            all_text.append(f"{'='*80}\n\n")
            all_text.append(text.strip())
            all_text.append("\n\n")
        except Exception as e:
            all_text.append(f"\n[ERROR extracting {pdf_file}: {e}]\n\n")
    
    # Write combined output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("KOMBINIERTE SEMINAR-PRODUKTBLÄTTER - WTM CONSULTING\n")
        f.write(f"Extrahiert aus {len(pdf_files)} PDF-Dateien\n")
        f.write("="*80 + "\n")
        f.writelines(all_text)
    
    print(f"\nDone! Combined text saved to: {OUTPUT_FILE}")
    print(f"Total size: {os.path.getsize(OUTPUT_FILE) / 1024:.1f} KB")

if __name__ == "__main__":
    extract_all_pdfs()
