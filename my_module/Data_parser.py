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

# Function to process and store all words in one row
def process_file(file_name):
    file_path = os.path.join('Shakespeare', file_name)

    # Load the CSV file
    df = pd.read_csv(file_path, on_bad_lines='skip', header=None)

    # New data to store processed rows
    new_data = []

    for index in range(len(df)):
        row = df.iloc[index]
        
        # Get words from the current row, excluding NaN, 'Default', '.', ',', 'nan', and 'NaN'
        words = row.dropna().tolist()
        words = [word for word in words if word not in ['Default', '.', ',', 'nan', 'NaN']]
        
        # Step 2: Remove consecutive repeating words
        words = remove_consecutive_repeats(words)

        # Add the processed words to new data
        new_data.extend(words)  # Flatten the list to keep all words in one row

    # Create a new DataFrame
    new_df = pd.DataFrame(new_data).T  # Transpose to have one row

    # Save the new DataFrame back to CSV without trailing empty cells
    new_df.to_csv(file_path, index=False, header=False)

    print(f"Updated {file_name}: Removed repeating patterns, consecutive repeats, and added all words in a single row.")

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
