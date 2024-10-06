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

def process_file(file_name):
    file_path = os.path.join('Shakespeare', file_name)

    # Load the CSV file
    df = pd.read_csv(file_path, on_bad_lines='skip', header=None)

    # New data to store processed rows
    new_data = []

    for index, row in df.iterrows():
        # Get words from the current row, excluding NaN, 'Default', '.', ',', 'nan', and 'NaN'
        words = row.dropna().tolist()
        words = [word for word in words if word not in ['Default', '.', ',', 'nan', 'NaN']]
        
        if len(words) < 20:
            # If the row has less than 20 words, fetch words from the next rows
            while len(words) < 20 and (index + 1) < len(df):
                index += 1  # Move to the next row
                next_row = df.iloc[index]
                next_words = next_row.dropna().tolist()
                next_words = [word for word in next_words if word not in ['Default', '.', ',', 'nan', 'NaN']]
                words.extend(next_words)  # Add words from the next row
            
            # Slice the words to get exactly 20
            words = words[:20]
        
        # Fill with empty strings if there are fewer than 20 words
        words.extend([''] * (20 - len(words)))

        new_data.append(words)

    # Create a new DataFrame
    new_df = pd.DataFrame(new_data)

    # Save the new DataFrame back to CSV without NaN or 'Default'
    new_df.to_csv(file_path, index=False, header=False)

    print(f"Updated {file_name} with 20 words per line, without NaN, 'Default', '.', and ',' values.")

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
