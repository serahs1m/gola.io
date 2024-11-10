import os
import pandas as pd
import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# Function to process text and recognize sentences based on refined rules
def recognize_and_reconstruct_sentences(text, max_sentence_length=40, min_sentence_length=5):
    doc = nlp(text)
    sentences = []
    current_sentence = []

    # Define functional words and specific words to handle separately
    functional_words = {"of", "the", "and", "by", "to", "in"}
    boundary_pos_tags = {"NOUN", "PROPN", "VERB", "ADJ", "ADV"}

    for token in doc:
        # Add token to the current sentence
        current_sentence.append(token.text)

        # Check for sentence boundary
        is_boundary = (
            (len(current_sentence) >= max_sentence_length) or  # Length exceeds max limit
            (token.is_sent_start and len(current_sentence) >= min_sentence_length) or  # spaCy's suggestion
            (token.pos_ in boundary_pos_tags and token.text.istitle() and len(current_sentence) > min_sentence_length)  # Title case with length
        )

        # Special handling for functional words or cases where functional words appear at the end
        if token.text.lower() in functional_words or token.text.isupper():
            is_boundary = False

        # Check if the last word in the current sentence is a functional word and reset boundary
        if len(current_sentence) > 1 and current_sentence[-2].lower() in functional_words:
            is_boundary = False

        # If we detect a boundary, finalize the current sentence
        if is_boundary:
            sentences.append(" ".join(current_sentence).strip())
            current_sentence = []

    # 마지막 문장이 남아있다면 추가
    if current_sentence:
        sentences.append(" ".join(current_sentence).strip())

    return sentences

# Function to process the CSV file and write reconstructed sentences to a new CSV file
def process_file_and_write_sentences(input_file, output_file):
    try:
        # Read the input file
        df = pd.read_csv(input_file, header=None)
        print(f"{input_file} file read successfully.")
    except FileNotFoundError:
        print(f"File not found: {input_file}")
        return

    all_sentences = []

    # Process each row of the CSV file
    for row in df.itertuples(index=False):
        text = " ".join([str(cell) for cell in row if pd.notna(cell)])
        sentences = recognize_and_reconstruct_sentences(text)
        all_sentences.extend(sentences)

    # Write the reconstructed sentences to a new CSV file
    output_df = pd.DataFrame(all_sentences, columns=["Reconstructed Sentence"])
    output_df.to_csv(output_file, index=False)
    print(f"\nReconstructed sentences have been exported to {output_file}")

# Main function to allow user to select a file and process it
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
            output_file = f"{selected_file}_reconstructed_sentences.csv"
            process_file_and_write_sentences(input_file, output_file)
        else:
            print("Invalid selection.")
    except ValueError:
        print("You must enter a number.")

if __name__ == "__main__":
    main()
