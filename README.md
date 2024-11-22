# Overview
This project consists of four Python scripts designed for text data preprocessing and analysis. These tools allow users to clean, transform, and analyze textual data from CSV files. Each script targets specific aspects of text analysis, including data cleaning, word statistics, POS tagging, and clause analysis.

---

## Scripts and Their Features

### 1. **Data_parser.py**
`Data_parser.py` focuses on preprocessing and cleaning text data in CSV files.

**Features**:
- Removes noise such as `NaN`, `Default`, `.`, and `,`.
- Eliminates consecutive repeated words.
- Combines all processed words from each file into a single row.
- Overwrites the processed data back into the original file.

**Usage**:
- The script interactively asks the user to select a CSV file for processing.
- Cleans and transforms the file.
- Designed to work with CSV files located in the `Shakespeare` directory.

---

### 2. **DataAnalyzer.py**
`DataAnalyzer.py` is a tool for performing various analytical operations on preprocessed data.

**Features**:
- Integrates `Data_parser.py` for preprocessing.
- Provides four types of analysis:
  1. **Word Frequency**: Counts occurrences of each word.
  2. **Starting Letter Frequency**: Calculates the frequency of starting letters in words.
  3. **Most Common Word Pairs**: Identifies and counts pairs of consecutive words.
  4. **Word Length Analysis**: Computes average, maximum, and minimum word lengths.

**Usage**:
- Preprocess a file using `Data_parser.py`.
- Choose an analysis type for further exploration of the processed data.

---

### 3. **PosCounter.py**
`PosCounter.py` provides Part-of-Speech (POS) analysis.

**Features**:
- Counts POS occurrences in text.
- Identifies sequences where a selected POS is followed by any other POS.
- Outputs results to two CSV files:
  1. **POS follow count**
  2. **Total POS count**

**Usage**:
- Select a CSV file for analysis.
- Choose a POS tag (e.g., NOUN, VERB) for sequential analysis.
- Outputs results as CSV files for further inspection.

---

### 4. **ClauseCounter.py**
`ClauseCounter.py` analyzes clauses in text data.

**Features**:
- Identifies and counts:
  - Noun clauses
  - Adjective clauses
  - Adverb clauses
  - Independent clauses
  - Dependent clauses
- Outputs the counts and samples of clauses detected.

**Usage**:
- Choose between POS and clause analysis.
- Select a CSV file and analyze clause types within the text.

---

### 5. **Reconstruct.py**
`Reconstruct.py` processes text data to recognize and reconstruct sentences based on refined linguistic rules.

**Features**:
- Recognizes sentences using custom rules for length, part-of-speech (POS), and functional words.
- Handles functional words and boundary POS tags intelligently.
- Reconstructs text into well-defined sentences with appropriate boundaries.
- Exports reconstructed sentences to a new CSV file.

**Usage**:
- Select a CSV file to process.
- The script reads text from the selected file, applies sentence recognition rules, and outputs a new CSV file containing reconstructed sentences.
- Example output file name: `Coriolanus.csv_reconstructed_sentences.csv`.

---

### 6. **Sentence_Generator.py**
`Sentence_Generator.py` creates grammatically correct example sentences based on predefined sentence structures (e.g., 1형식, 2형식).

**Features**:
- Loads words tagged with POS (e.g., NOUN, VERB) from a CSV file.
- Generates sentences following five predefined sentence structures:
  1. **1형식**: S (Subject) + V (Verb)
  2. **2형식**: S + V + C (Complement)
  3. **3형식**: S + V + O (Object)
  4. **4형식**: S + V + O1 (Indirect Object) + O2 (Direct Object)
  5. **5형식**: S + V + O + C
- Exports generated sentences to a new CSV file.

**Usage**:
- Select a CSV file containing words with POS tags (columns: `Word`, `POS`).
- The script generates example sentences for each structure and exports them to a new CSV file.
- Example output file name: `Coriolanus.csv_generated_sentences_examples.csv`.

