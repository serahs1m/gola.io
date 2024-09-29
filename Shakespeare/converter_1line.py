import pdfplumber
import pandas as pd
import re

# Path to your PDF file
pdf_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock.pdf'

# Output CSV file path
csv_output_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock_1line.csv'

# Define a regular expression to keep only alphabetic characters (remove spaces and punctuation)
word_cleanup_pattern = re.compile(r"[A-Za-z]+")

# String to store the entire text from the PDF
entire_text = ""

# Open the PDF file
with pdfplumber.open(pdf_path) as pdf:
    for page_num, page in enumerate(pdf.pages):
        # Extract text from each page
        text = page.extract_text()

        if text:
            # Split the text into lines
            lines = text.split('\n')
            for line in lines:
                # Ignore lines that are only numbers (e.g., page numbers)
                if not line.strip().isdigit():
                    # Use regular expression to find all alphabetic words and join them into a single string
                    cleaned_line = ''.join(word_cleanup_pattern.findall(line.strip()))  # Remove spaces and punctuation
                    # Concatenate cleaned line to the entire_text
                    entire_text += cleaned_line
        else:
            print(f"Warning: No text extracted from page {page_num + 1}")

# Create a pandas DataFrame with the entire text as a single row
df = pd.DataFrame([[entire_text]])

# Write the DataFrame to a CSV file without a header
df.to_csv(csv_output_path, index=False, header=False)

print(f"PDF text has been successfully written as a single line to {csv_output_path}")
