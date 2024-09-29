import pdfplumber
import pandas as pd
import re

# Path to your PDF file
pdf_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock.pdf'

# Output CSV file path
csv_output_path = '/Users/Jiwoo/Desktop/Project/converter/Sherlock_apstword.csv'

# List to store extracted text data
data = []

# Define a regular expression to split words, contractions, and special characters
word_split_pattern = re.compile(r"[A-Za-z]+(?:'[A-Za-z]+)?|[.,!?;:]")


# Function to separate words and ensure possessive apostrophes are in the same cell with the following letters
def split_possessive(words):
    result = []
    for word in words:
        # If the word contains an apostrophe followed by letters (e.g., we'll -> we, 'll)
        if re.search(r"[A-Za-z]+'[A-Za-z]+", word):
            # Split at the apostrophe but keep the apostrophe and the following characters together
            split_word = re.split(r"(')", word)  # This keeps the apostrophe as a separate element
            result.extend([split_word[0], split_word[1] + split_word[2]])  # Append both parts (e.g., we, 'll)
        else:
            result.append(word)
    return result


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
                    # Use regular expression to split the line into words, possessives, and punctuation
                    words_and_punctuation = word_split_pattern.findall(line.strip())

                    # Handle possessive contractions
                    processed_words = split_possessive(words_and_punctuation)

                    if processed_words:  # If there are processed words/punctuation, append them
                        data.append(processed_words)
        else:
            print(f"Warning: No text extracted from page {page_num + 1}")

# Create a pandas DataFrame from the data list
df = pd.DataFrame(data)

# Write the DataFrame to a CSV file
df.to_csv(csv_output_path, index=False, header=False)  # No header for word cells

print(f"PDF text has been successfully written to {csv_output_path}")
