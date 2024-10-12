# to run the code you need to download spacy first 
# (follow two lines code to the terminal)
# pip install spacy
# python -m spacy download en_core_web_sm

import os
import pandas as pd
import spacy
from collections import Counter

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# List of CSV file names
file_names = [
    'Coriolanus.csv',
    'MAAN.csv',
    'macbeth.csv',
    'Richard-II.csv',
    'RomeonJuliet.csv',
    'The-Tempest.csv',
    'The-Winter_s-Tale.csv',
    'Sherlock_noSign.csv',
    'Sherlock_nosprt.csv',
    'Sherlock_sprt.csv',
    'Coriolanus_noSign.csv'
]

# Define pairs of POS tags to track (verb-noun, adjective-adverb, etc.)
target_pos_pairs = [
    ('VERB', 'NOUN'),  # Verb followed by Noun
    ('ADJ', 'ADV'),    # Adjective followed by Adverb
    ('ADV', 'ADJ'),    # Adverb followed by Adjective
    ('NOUN', 'ADJ'),   # Noun followed by Adjective
    ('VERB', 'ADV'),   # Verb followed by Adverb
]

# Function to count POS in the given text
def count_pos(text):
    doc = nlp(text)
    pos_count = Counter([token.pos_ for token in doc])
    return pos_count

# Function to find and count POS pairs in the given text
def count_pos_pairs(doc, target_pairs):
    pos_pairs = []
    
    # Loop through tokens in the document
    for i in range(len(doc) - 1):
        pos_pair = (doc[i].pos_, doc[i + 1].pos_)
        
        # If the POS pair matches one of the target pairs, record it
        if pos_pair in target_pairs:
            pos_pairs.append(pos_pair)

    # Count the frequency of each pair
    pair_count = Counter(pos_pairs)
    
    return pair_count

# Analyze both POS counts and POS pairs in a CSV file
def analyze_pos_in_file(file_name):
    # Read the file
    file_path = os.path.join('Shakespeare', file_name)
    
    try:
        df = pd.read_csv(file_path, header=None)
        print(f"{file_name} file read successfully.")
    except FileNotFoundError:
        print(f"File not found: {file_name}")
        return

    all_pos_counts = Counter()
    all_pos_pair_counts = Counter()
    
    # Process each row of the CSV file
    for row in df.itertuples(index=False):
        text = " ".join([str(cell) for cell in row if pd.notna(cell)])
        doc = nlp(text)

        # Count POS and POS pairs
        pos_in_row = count_pos(text)
        pos_pairs_in_row = count_pos_pairs(doc, target_pos_pairs)

        # Update the overall counters
        all_pos_counts.update(pos_in_row)
        all_pos_pair_counts.update(pos_pairs_in_row)

    # Output POS count results
    print(f"\n{file_name} POS counts:")
    for pos, count in all_pos_counts.most_common():
        print(f"{pos}: {count}")

    # Output POS pair count results
    print(f"\n{file_name} POS pair counts:")
    for pair, count in all_pos_pair_counts.most_common():
        print(f"{pair}: {count}")

# Function to select a CSV file from the list
def select_file():
    print("\nSelect a CSV file to analyze:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")
    
    # Ask the user to choose a file
    choice = input("Enter the number of the file you want to analyze: ")
    
    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            return file_names[index]
        else:
            print("Invalid selection.")
            return None
    except ValueError:
        print("You must enter a number.")
        return None

# Main function to run the analysis
def main():
    # File selection
    selected_file = select_file()

    if selected_file:
        # Perform POS and POS pair analysis
        analyze_pos_in_file(selected_file)
    else:
        print("No valid file selected.")

if __name__ == "__main__":
    main()
