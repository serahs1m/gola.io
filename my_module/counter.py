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

# Function to analyze clauses
def analyze_clauses_in_file(file_name):
    # Read the file
    file_path = os.path.join('Shakespeare', file_name)
    
    try:
        df = pd.read_csv(file_path, header=None)
        print(f"{file_name} file read successfully.")
    except FileNotFoundError:
        print(f"File not found: {file_name}")
        return

    # Initialize counters for each type of clause
    noun_clause_count = 0
    adjective_clause_count = 0
    adverb_clause_count = 0
    independent_clause_count = 0
    dependent_clause_count = 0

    # Process each row of the CSV file
    for row in df.itertuples(index=False):
        text = " ".join([str(cell) for cell in row if pd.notna(cell)])
        doc = nlp(text)

        # Analyze clauses
        for sent in doc.sents:
            # Noun clause
            if any(tok.dep_ in ['nsubj', 'dobj', 'attr'] for tok in sent):
                noun_clause_count += 1
                if noun_clause_count == 1:
                    print(f"\nFirst noun clause:\n{text}")

            # Adjective clause
            if any(tok.dep_ in ['amod', 'relcl'] for tok in sent):
                adjective_clause_count += 1
                if adjective_clause_count == 1:
                    print(f"\nFirst adjective clause:\n{text}")

            # Adverb clause
            if any(tok.dep_ in ['advmod', 'prep'] for tok in sent):
                adverb_clause_count += 1
                if adverb_clause_count == 1:
                    print(f"\nFirst adverb clause:\n{text}")

            # Independent clause (ROOT)
            if any(tok.dep_ == 'ROOT' for tok in sent):
                independent_clause_count += 1
                if independent_clause_count == 1:
                    print(f"\nFirst independent clause:\n{text}")

            # Dependent clause (mark, advcl, ccomp)
            if any(tok.dep_ in ['mark', 'advcl', 'ccomp'] for tok in sent):
                dependent_clause_count += 1
                if dependent_clause_count == 1:
                    print(f"\nFirst dependent clause:\n{text}")

    # Output the clause counts
    print(f"\nTotal noun clauses: {noun_clause_count}")
    print(f"Total adjective clauses: {adjective_clause_count}")
    print(f"Total adverb clauses: {adverb_clause_count}")
    print(f"Total independent clauses: {independent_clause_count}")
    print(f"Total dependent clauses: {dependent_clause_count}")

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
    # Display selection options
    print("\nSelect the analysis type:")
    print("1. POS Analysis")
    print("2. Clause Analysis")
    
    # Ask the user to select the analysis type
    analysis_choice = input("Enter the number corresponding to the analysis type: ")

    # File selection
    selected_file = select_file()

    if selected_file:
        if analysis_choice == '1':  # POS Analysis
            # Select POS for analysis
            selected_pos = select_pos("Select the POS to check what follows")
            if selected_pos:
                # Perform POS count and POS followed by another POS analysis
                analyze_pos_in_file(selected_file, selected_pos)
            else:
                print("Invalid POS selection.")
        elif analysis_choice == '2':  # Clause Analysis
            # Perform clause analysis
            analyze_clauses_in_file(selected_file)
        else:
            print("Invalid selection. Please choose either 1 or 2.")
    else:
        print("No valid file selected.")

if __name__ == "__main__":
    main()
