import os
import pandas as pd
import random

# Function to generate a limited number of sentences based on POS tags and sentence structures
def generate_sentences_by_structure(words_by_pos, examples_per_structure=3):
    sentences_by_structure = {}
    
    # Define sentence structures
    structures = {
        "1형식": ["S", "V"],
        "2형식": ["S", "V", "C"],
        "3형식": ["S", "V", "O"],
        "4형식": ["S", "V", "O1", "O2"],
        "5형식": ["S", "V", "O", "C"]
    }

    for structure_name, structure in structures.items():
        examples = []
        for _ in range(examples_per_structure):
            sentence = []
            for role in structure:
                # Select a random word based on the role
                if role == "S":  # Subject (NOUN)
                    word = random.choice(words_by_pos.get("NOUN", ["[NO NOUN AVAILABLE]"]))
                elif role == "V":  # Verb
                    word = random.choice(words_by_pos.get("VERB", ["[NO VERB AVAILABLE]"]))
                elif role == "O":  # Object
                    word = random.choice(words_by_pos.get("NOUN", ["[NO NOUN AVAILABLE]"]))
                elif role == "O1":  # Indirect Object
                    word = random.choice(words_by_pos.get("NOUN", ["[NO NOUN AVAILABLE]"]))
                elif role == "O2":  # Direct Object
                    word = random.choice(words_by_pos.get("NOUN", ["[NO NOUN AVAILABLE]"]))
                elif role == "C":  # Complement (ADJ or NOUN)
                    word = random.choice(words_by_pos.get("ADJ", ["[NO ADJ AVAILABLE]"]))
                sentence.append(word)
            examples.append(" ".join(sentence))
        sentences_by_structure[structure_name] = examples
    
    return sentences_by_structure

# Load a limited number of POS-tagged words from the CSV file for efficiency
def load_words_by_pos(file_path, sample_size=500):
    df = pd.read_csv(file_path)
    
    # Check if necessary columns exist in the file
    if 'POS' not in df.columns or 'Word' not in df.columns:
        print("Error: The file does not contain 'POS' and 'Word' columns.")
        return {}
    
    words_by_pos = {}
    
    # Sample the data for faster processing if dataset is large
    if len(df) > sample_size:
        df = df.sample(n=sample_size)
    
    # Group words by POS
    for _, row in df.iterrows():
        pos = row['POS']
        word = row['Word']
        if pos not in words_by_pos:
            words_by_pos[pos] = []
        words_by_pos[pos].append(word)
    
    # Check if the POS dictionary is filled correctly
    if not words_by_pos:
        print("Warning: No words were loaded for any POS category.")
    return words_by_pos

# Function to export generated sentences to a new CSV file
def export_sentences_to_csv(sentences_by_structure, output_file):
    rows = []
    for structure, sentences in sentences_by_structure.items():
        for sentence in sentences:
            rows.append({"Sentence Structure": structure, "Example": sentence})

    df = pd.DataFrame(rows)
    df.to_csv(output_file, index=False)
    print(f"Generated sentences have been exported to {output_file}")

# Main function to allow user to select a file, process it, and export generated sentences
def main():
    # List of available files
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

    # Display file options to the user
    print("\nSelect a CSV file to analyze:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")
    
    # Prompt the user for a file selection
    choice = input("Enter the number of the file you want to analyze: ")
    
    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            selected_file = file_names[index]
            input_file = os.path.join('Shakespeare', selected_file)
            output_file = f"{selected_file}_generated_sentences_examples.csv"
            
            # Load words by POS from the selected file
            words_by_pos = load_words_by_pos(input_file)
            
            # Check if words_by_pos has content
            if not words_by_pos:
                print("Error: No valid words were loaded from the selected file.")
                return
            
            # Generate example sentences by structure
            sentences_by_structure = generate_sentences_by_structure(words_by_pos, examples_per_structure=3)
            
            # Export generated sentences to a CSV file
            export_sentences_to_csv(sentences_by_structure, output_file)
        else:
            print("Invalid selection.")
    except ValueError:
        print("You must enter a number.")

if __name__ == "__main__":
    main()
