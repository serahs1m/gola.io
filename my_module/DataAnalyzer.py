import pandas as pd
import os
from collections import Counter

# Function to calculate word frequency
def calculate_word_frequency(word_list):
    word_count = Counter(word_list)
    return word_count

# Function to calculate common word pairs
def calculate_common_word_pairs(word_list):
    word_pairs = [(word_list[i], word_list[i+1]) for i in range(len(word_list) - 1)]
    pair_count = Counter(word_pairs)
    return pair_count

# Function to calculate starting letter frequency
def calculate_starting_letter_frequency(word_list):
    starting_letters = [word[0].upper() for word in word_list if isinstance(word, str) and word]
    letter_count = Counter(starting_letters)
    return letter_count

# Function to calculate word length statistics
def calculate_word_length_statistics(word_list):
    word_lengths = [len(word) for word in word_list if isinstance(word, str) and word]
    avg_length = sum(word_lengths) / len(word_lengths) if word_lengths else 0
    max_length = max(word_lengths, default=0)
    min_length = min(word_lengths, default=0)
    return avg_length, max_length, min_length

def main():
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

    print("\nList of CSV files:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")

    # Select file
    try:
        choice = int(input("Enter the number of the file to analyze: ")) - 1
        if 0 <= choice < len(file_names):
            file_path = os.path.join('Shakespeare', file_names[choice])
            df = pd.read_csv(file_path, header=None)
            word_list = df.values.flatten().tolist()

            # Select analysis type
            print("\nWhat analysis would you like to perform?")
            print("1. Word Frequency")
            print("2. Starting Letter Frequency")
            print("3. Most Common Word Pairs")
            print("4. Word Length Analysis")

            analysis_choice = int(input("Enter the number of the analysis type: "))

            if analysis_choice == 1:
                result = calculate_word_frequency(word_list)
                print("\nWord Frequency:", result.most_common(10))
            elif analysis_choice == 2:
                result = calculate_starting_letter_frequency(word_list)
                print("\nStarting Letter Frequency:", result.most_common(10))
            elif analysis_choice == 3:
                result = calculate_common_word_pairs(word_list)
                print("\nMost Common Word Pairs:", result.most_common(10))
            elif analysis_choice == 4:
                avg_len, max_len, min_len = calculate_word_length_statistics(word_list)
                print("\nWord Length Analysis:")
                print(f"Average Length: {avg_len:.2f}, Max Length: {max_len}, Min Length: {min_len}")
            else:
                print("Invalid choice.")
        else:
            print("Invalid file choice.")
    except ValueError:
        print("Invalid input.")

if __name__ == "__main__":
    main()
