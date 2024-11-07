import os
import pandas as pd
import spacy
from collections import Counter
import time

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

# List of POS tags to analyze
pos_tags = ['NOUN', 'VERB', 'ADJ', 'ADV', 'PRON', 'DET', 'ADP', 'NUM', 'CONJ']

# Function to count POS followed by any POS and total POS counts
def count_pos_followed_by_all(doc):
    pos_following_counts = Counter()
    total_pos_counts = Counter()
    
    for i in range(len(doc) - 1):
        current_pos = doc[i].pos_
        following_pos = doc[i + 1].pos_
        pos_following_counts[(current_pos, following_pos)] += 1
        total_pos_counts[current_pos] += 1
    
    # 마지막 토큰의 POS도 개수에 포함
    total_pos_counts[doc[-1].pos_] += 1

    return pos_following_counts, total_pos_counts

# Analyze POS followed by other POS in a CSV file
def analyze_pos_in_file(file_name):
    # Read the file
    file_path = os.path.join('Shakespeare', file_name)
    
    try:
        df = pd.read_csv(file_path, header=None)
        print(f"{file_name} file read successfully.")
    except FileNotFoundError:
        print(f"File not found: {file_name}")
        return

    pos_following_counts = Counter()
    total_pos_counts = Counter()
    
    # Process each row of the CSV file
    for row in df.itertuples(index=False):
        text = " ".join([str(cell) for cell in row if pd.notna(cell)])
        doc = nlp(text)

        # Count POS followed by any POS and total POS counts
        pos_in_row_followed_by, pos_in_row_counts = count_pos_followed_by_all(doc)
        pos_following_counts.update(pos_in_row_followed_by)
        total_pos_counts.update(pos_in_row_counts)

    # Output total POS counts
    print(f"\nTotal POS counts in {file_name}:")
    for pos, count in total_pos_counts.items():
        print(f"{pos}: {count}")

    # Output POS followed by other POS results for each POS tag
    print(f"\n{file_name} POS followed by other POS counts:")
    for selected_pos in pos_tags:
        print(f"\n{selected_pos} followed by other POS counts:")
        found = False  
        for pos_pair, count in pos_following_counts.items():
            if pos_pair[0] == selected_pos:
                print(f"{pos_pair[0]} followed by {pos_pair[1]}: {count}")
                found = True
        if not found:
            print(f"No occurrences found for {selected_pos}")

    # Prepare data for export
    pos_counts_data = []
    for pos, count in total_pos_counts.items():
        pos_counts_data.append({"POS": pos, "Total Count": count})

    pos_following_data = []
    for pos_pair, count in pos_following_counts.items():
        pos_following_data.append({
            "POS": pos_pair[0],
            "Followed by POS": pos_pair[1],
            "Count": count
        })

    # Save total POS counts to CSV
    pos_counts_df = pd.DataFrame(pos_counts_data)
    pos_counts_df.to_csv(f"{file_name}_total_pos_counts.csv", index=False)
    
    # Save POS followed by other POS counts to CSV
    pos_following_df = pd.DataFrame(pos_following_data)
    pos_following_df.to_csv(f"{file_name}_pos_following_counts.csv", index=False)
    
    print(f"\nResults have been exported to {file_name}_total_pos_counts.csv and {file_name}_pos_following_counts.csv")


# Main function to run the analysis
def main():
    start_time = time.time()

    # Ask the user to select the file for analysis
    print("\nSelect a CSV file to analyze:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")
    
    choice = input("Enter the number of the file you want to analyze: ")
    
    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            selected_file = file_names[index]
            analyze_pos_in_file(selected_file)
        else:
            print("Invalid selection.")
    except ValueError:
        print("You must enter a number.")

    end_time = time.time()
    runtime = end_time - start_time
    print(f"\nRuntime: {runtime:.2f} seconds")


if __name__ == "__main__":
    main()
