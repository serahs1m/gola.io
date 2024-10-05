import pandas as pd
import os
from collections import Counter
import Data_parser  # Import Data_parser.py to use its functionality

# List of CSV file names to be used
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
    'Sherlock_sprt.csv'
]

def process_file_with_data_parser():
    # Call the file selection and processing from Data_parser
    Data_parser.main()  # Call main() from Data_parser to modify the file
    print("\nFile processing completed. Starting analysis.\n")

def read_processed_file(file_name):
    file_path = os.path.join('Shakespeare', file_name)
    
    try:
        # Read the modified CSV file
        df = pd.read_csv(file_path, header=None)
        print(f"Read {file_name} successfully.")
        return df.values.flatten().tolist()
    except FileNotFoundError:
        print(f"File not found: {file_name}")
        return []

def calculate_word_frequency(word_list):
    # Use Counter to calculate word frequencies
    word_count = Counter(word_list)
    return word_count

def calculate_common_word_pairs(word_list):
    # Calculate the frequency of word pairs
    word_pairs = [(word_list[i], word_list[i+1]) for i in range(len(word_list) - 1)]
    pair_count = Counter(word_pairs)
    return pair_count

def calculate_starting_letter_frequency(word_list):
    # Filter out NaN values and empty strings, then calculate starting letter frequency
    starting_letters = [word[0].upper() for word in word_list if isinstance(word, str) and word]
    letter_count = Counter(starting_letters)
    return letter_count

def calculate_word_length_statistics(word_list):
    # Calculate word length statistics (average, max, min)
    word_lengths = [len(word) for word in word_list if isinstance(word, str) and word]
    avg_length = sum(word_lengths) / len(word_lengths) if word_lengths else 0
    max_length = max(word_lengths, default=0)
    min_length = min(word_lengths, default=0)
    return avg_length, max_length, min_length

def select_file():
    print("\nList of CSV files:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")
    
    # Select file by number
    choice = input("Enter the number of the file you want to analyze: ")

    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            return file_names[index]
        else:
            print("Invalid choice.")
            return None
    except ValueError:
        print("You must enter a number.")
        return None

def select_analysis_type():
    print("\nWhat analysis would you like to perform?")
    print("1. Word Frequency")
    print("2. Starting Letter Frequency")
    print("3. Most Common Word Pairs")
    print("4. Word Length Analysis")
    
    choice = input("Enter the number of the analysis type: ")

    try:
        return int(choice)
    except ValueError:
        print("Invalid input. Please enter a number.")
        return None

def main():
    # Select and process file from Data_parser.py
    process_file_with_data_parser()

    # Read the processed file from Data_parser.py
    print("Reading data from the modified file.")
    selected_file = select_file()

    if selected_file:
        # Read the file
        all_data = read_processed_file(selected_file)

        if all_data:
            analysis_type = select_analysis_type()

            if analysis_type == 1:
                # Word Frequency
                word_frequency = calculate_word_frequency(all_data)
                print("\nTop 10 most frequent words:")
                for idx, (word, freq) in enumerate(word_frequency.most_common(10), start=1):
                    print(f"{idx}. {word}: {freq}")
            elif analysis_type == 2:
                # Starting Letter Frequency
                letter_frequency = calculate_starting_letter_frequency(all_data)
                print("\nStarting letter frequency:")
                for idx, (letter, freq) in enumerate(letter_frequency.most_common(10), start=1):
                    print(f"{idx}. {letter}: {freq}")
            elif analysis_type == 3:
                # Most Common Word Pairs
                word_pairs_frequency = calculate_common_word_pairs(all_data)
                print("\nTop 10 most common pairs:")
                for idx, ((word1, word2), freq) in enumerate(word_pairs_frequency.most_common(10), start=1):
                    print(f"{idx}. ({word1}, {word2}): {freq}")
            elif analysis_type == 4:
                # Word Length Analysis
                avg_len, max_len, min_len = calculate_word_length_statistics(all_data)
                print("\nWord length analysis:")
                print(f"Average length: {avg_len:.2f}")
                print(f"Maximum length: {max_len}")
                print(f"Minimum length: {min_len}")
            else:
                print("Invalid analysis type selected.")
        else:
            print(f"The data is empty. Please check {selected_file}.")
    else:
        print("No valid file selected.")

if __name__ == "__main__":
    main()
