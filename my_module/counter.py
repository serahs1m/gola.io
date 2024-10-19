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

# List of available POS tags
pos_tags = ['NOUN', 'VERB', 'ADJ', 'ADV', 'PRON', 'DET', 'ADP', 'NUM', 'CONJ']

# Function to count POS in the given text
def count_pos(text):
    doc = nlp(text)
    pos_count = Counter([token.pos_ for token in doc])
    return pos_count

# Function to find and count occurrences of selected POS followed by any POS
def count_pos_followed_by_all(doc, selected_pos):
    pos_following_counts = Counter()
    
    for i in range(len(doc) - 1):
        if doc[i].pos_ == selected_pos:
            following_pos = doc[i + 1].pos_
            pos_following_counts[(selected_pos, following_pos)] += 1

    return pos_following_counts

# Analyze POS counts and POS followed by other POS in a CSV file
def analyze_pos_in_file(file_name, selected_pos):
    # Read the file
    file_path = os.path.join('Shakespeare', file_name)
    
    try:
        df = pd.read_csv(file_path, header=None)
        print(f"{file_name} file read successfully.")
    except FileNotFoundError:
        print(f"File not found: {file_name}")
        return

    all_pos_counts = Counter()
    pos_following_counts = Counter()
    
    # Process each row of the CSV file
    for row in df.itertuples(index=False):
        text = " ".join([str(cell) for cell in row if pd.notna(cell)])
        doc = nlp(text)

        # Count POS
        pos_in_row = count_pos(doc)
        all_pos_counts.update(pos_in_row)

        # Count POS followed by any POS
        pos_in_row_followed_by = count_pos_followed_by_all(doc, selected_pos)
        pos_following_counts.update(pos_in_row_followed_by)

    # Output POS count results
    print(f"\n{file_name} POS counts:")
    for pos, count in all_pos_counts.most_common():
        print(f"{pos}: {count}")

    # Output POS followed by other POS results
    print(f"\n{file_name}: {selected_pos} followed by other POS counts:")
    for pos_pair, count in pos_following_counts.most_common():
        print(f"{pos_pair[0]} followed by {pos_pair[1]}: {count}")

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

# Function to select a POS from the list
def select_pos(prompt):
    print(f"\n{prompt}:")
    for i, pos_tag in enumerate(pos_tags, start=1):
        print(f"{i}. {pos_tag}")
    
    # Ask the user to choose a POS
    choice = input("Enter the number of the POS you want to analyze: ")
    
    try:
        index = int(choice) - 1
        if 0 <= index < len(pos_tags):
            return pos_tags[index]
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
        # Select POS for analysis
        selected_pos = select_pos("Select the POS to check what follows")
        
        if selected_pos:
            # Perform POS count and POS followed by another POS analysis
            analyze_pos_in_file(selected_file, selected_pos)
        else:
            print("Invalid POS selection.")
    else:
        print("No valid file selected.")

if __name__ == "__main__":
    main()
