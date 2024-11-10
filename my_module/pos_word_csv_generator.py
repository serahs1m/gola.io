import os
import pandas as pd
import spacy

# Load the SpaCy model
nlp = spacy.load("en_core_web_sm")

# Function to add POS and Word columns and save to a new CSV file
def create_pos_word_csv(input_file, output_file):
    try:
        # Read the CSV file
        df = pd.read_csv(input_file)
        
        # Ensure the CSV has text data to process
        if df.empty:
            print(f"Error: {input_file} is empty.")
            return
        
        # Concatenate all text into one string to process it with SpaCy
        text = " ".join(df.iloc[:, 0].dropna().astype(str))  # Assuming text is in the first column
        
        # Process text with SpaCy to generate POS and Word data
        doc = nlp(text)
        data = [{"Word": token.text, "POS": token.pos_} for token in doc if token.text.strip()]
        
        # Convert data to DataFrame and save to CSV
        pos_word_df = pd.DataFrame(data)
        pos_word_df.to_csv(output_file, index=False)
        print(f"POS and Word columns have been saved to {output_file}.")
        
    except Exception as e:
        print(f"Error processing the file: {e}")

# Main function to create POS and Word CSV
def main_create_pos_word_csv():
    # List of available files (CSV files)
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
    print("\nSelect a CSV file to create POS and Word columns:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")

    # Prompt the user for file selection
    choice = input("Enter the number of the file: ")

    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            selected_file = file_names[index]
            input_file = os.path.join('Shakespeare', selected_file)  # Correct path
            output_file = f"{selected_file}_pos_word.csv"
            create_pos_word_csv(input_file, output_file)
        else:
            print("Invalid selection.")
    except ValueError:
        print("You must enter a number.")

if __name__ == "__main__":
    main_create_pos_word_csv()
