import pandas as pd
import os

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

# Function to remove consecutive repeating words
def remove_consecutive_repeats(words):
    if not words:
        return words
    
    # Initialize a new list with the first word
    unique_words = [words[0]]
    
    # Iterate through the words starting from the second one
    for i in range(1, len(words)):
        # Add the word to unique_words if it's not the same as the previous one
        if words[i] != words[i - 1]:
            unique_words.append(words[i])
    
    return unique_words

# Improved function to remove repeating patterns
def remove_repeating_patterns(words):
    length = len(words)
    
    # Iterate through potential sizes of repeating patterns
    for size in range(1, length // 2 + 1):
        for start in range(length - size * 2 + 1):
            # Find repeating sequences
            if words[start:start + size] == words[start + size:start + size * 2]:
                # Recursively remove repeating patterns from the remaining list
                return remove_repeating_patterns(words[:start + size] + words[start + size * 2:])
    return words

# Function to process rows and ensure there are exactly 20 words, filling with next rows if necessary
def process_rows_and_ensure_20(df, index, words):
    # If the row has less than 20 words, fetch words from the next rows
    while len(words) < 20 and (index + 1) < len(df):
        index += 1  # Move to the next row
        next_row = df.iloc[index]
        next_words = next_row.dropna().tolist()
        next_words = [word for word in next_words if word not in ['Default', '.', ',', 'nan', 'NaN']]
        
        # Remove repeating patterns from the next row's words
        next_words = remove_repeating_patterns(next_words)
        next_words = remove_consecutive_repeats(next_words)  # Also remove consecutive duplicates
        
        words.extend(next_words)  # Add words from the next row
    
    # Slice the words to get exactly 20
    words = words[:20]
    
    # Fill with empty strings if there are fewer than 20 words
    words.extend([''] * (20 - len(words)))
    
    return words, index

def process_file(file_name):
    file_path = os.path.join('Shakespeare', file_name)

    # Load the CSV file
    df = pd.read_csv(file_path, on_bad_lines='skip', header=None)

    # New data to store processed rows
    new_data = []

    index = 0
    while index < len(df):
        row = df.iloc[index]
        
        # Get words from the current row, excluding NaN, 'Default', '.', ',', 'nan', and 'NaN'
        words = row.dropna().tolist()
        words = [word for word in words if word not in ['Default', '.', ',', 'nan', 'NaN']]
        
        # Step 1: Remove repeating patterns
        words = remove_repeating_patterns(words)

        # Step 2: Remove consecutive repeating words
        words = remove_consecutive_repeats(words)

        # Step 3: Ensure there are exactly 20 words per row
        words, index = process_rows_and_ensure_20(df, index, words)

        # Add the processed row
        new_data.append(words)

        # Increment index to move to the next row
        index += 1

    # Create a new DataFrame and remove trailing commas
    new_df = pd.DataFrame(new_data)

    # Save the new DataFrame back to CSV without trailing empty cells
    new_df.to_csv(file_path, index=False, header=False)

    print(f"Updated {file_name}: Removed repeating patterns, consecutive repeats, adjusted to 20 words per row, and removed trailing commas.")

def main():
    print("List of CSV files to be modified:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")

    # Select a file
    choice = input("Enter the number of the file to modify: ")

    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            selected_file = file_names[index]
            process_file(selected_file)
        else:
            print("Invalid selection.")
    except ValueError:
        print("You must enter a number.")

if __name__ == "__main__":
    main()
