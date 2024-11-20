import os
import pandas as pd
import spacy
import re

# Load the SpaCy model (change to "en_core_web_sm" if needed)
nlp = spacy.load("en_core_web_trf")

def clean_text(text):
    """
    Cleans input text by removing unwanted characters and extra spaces.
    """
    text = re.sub(r"[^a-zA-Z0-9\s.,]", "", text)  # Remove special characters except ., and spaces
    text = re.sub(r"\s+", " ", text).strip()  # Remove extra spaces
    return text

def create_pos_grouped_csv(input_file, output_file):
    try:
        # Read the input file
        df = pd.read_csv(input_file, header=None, names=["Sentence"])

        if df.empty or df["Sentence"].dropna().empty:
            print(f"Error: {input_file} is empty or does not contain valid sentences.")
            return

        # Initialize POS groups
        pos_groups = {
            "noun": [],
            "verb": [],
            "adjective": [],
            "adverb": [],
            "others": []
        }

        # Process each sentence
        for sentence in df["Sentence"].dropna():
            sentence = clean_text(sentence)  # Clean the text
            if len(sentence.split()) < 5:  # Skip sentences with fewer than 5 words
                continue
            doc = nlp(sentence)
            for token in doc:
                if token.text.strip():  # Skip empty tokens
                    if token.pos_ == "NOUN":
                        pos_groups["noun"].append(token.text)
                    elif token.pos_ == "VERB":
                        pos_groups["verb"].append(token.text)
                    elif token.pos_ == "ADJ":
                        pos_groups["adjective"].append(token.text)
                    elif token.pos_ == "ADV":
                        pos_groups["adverb"].append(token.text)
                    else:
                        pos_groups["others"].append(token.text)

        # Align data lengths for CSV export
        max_len = max(len(pos_groups[key]) for key in pos_groups)
        grouped_data = {key: values + [""] * (max_len - len(values)) for key, values in pos_groups.items()}
        grouped_df = pd.DataFrame(grouped_data)

        # Save the grouped data to a new CSV file
        grouped_df.to_csv(output_file, index=False)
        print(f"Grouped POS data has been saved to {output_file}.")

    except Exception as e:
        print(f"Error processing the file: {e}")

# Main function
def main_create_pos_grouped_csv():
    input_file = "Shakespeare/Hello.csv"  # Input file
    output_file = "Shakespeare/Hello_grouped_pos.csv"  # Output file
    create_pos_grouped_csv(input_file, output_file)

if __name__ == "__main__":
    main_create_pos_grouped_csv()
