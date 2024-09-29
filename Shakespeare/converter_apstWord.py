import pdfplumber
import pandas as pd
import re

# Path to your PDF file
pdf_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock.pdf'

# Output CSV file path
csv_output_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock_apstWord.csv'

# List to store extracted text data
data = []

# Define a regular expression to split words, contractions, and special characters
# This pattern keeps words with apostrophes (e.g., We'll, don't, she's) in one cell
word_split_pattern = re.compile(r"[A-Za-z]+'[A-Za-z]+|[A-Za-z]+|[.,!?;:]")

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
                    # Use regular expression to split the line into words and special characters
                    words_and_punctuation = word_split_pattern.findall(line.strip())

                    if words_and_punctuation:  # If there are words/punctuation, append them
                        data.append(words_and_punctuation)
        else:
            print(f"Warning: No text extracted from page {page_num + 1}")

# Create a pandas DataFrame from the data list
df = pd.DataFrame(data)

# Write the DataFrame to a CSV file
df.to_csv(csv_output_path, index=False, header=False)  # No header for word cells

print(f"PDF text has been successfully written to {csv_output_path}")