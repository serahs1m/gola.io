import pandas as pd
import os

# CSV file names
file_names = [
    'Coriolanus.csv',
    'MAAN.csv',
    'macbeth.csv',
    'Richard-II.csv',
    'RomeoAndJuliet.csv',
    'The-Tempest.csv',
    'The-Winter_s-Tale.csv'
]

def process_file(file_name):
    file_path = os.path.join('Shakespeare', file_name)

    # Load the CSV file
    df = pd.read_csv(file_path, on_bad_lines='skip', header=None)

    # New data to store processed rows
    new_data = []

    for index, row in df.iterrows():
        # Get words from the current row, excluding NaN, 'Default', '.', and ','
        words = row.dropna().tolist()
        words = [word for word in words if word not in ['Default', '.', ',']]
        
        if len(words) < 20:
            # If the row has less than 20 words, fetch words from the next rows
            while len(words) < 20 and (index + 1) < len(df):
                index += 1  # Move to the next row
                next_row = df.iloc[index]
                next_words = next_row.dropna().tolist()
                next_words = [word for word in next_words if word not in ['Default', '.', ',']]
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
    print("수정할 CSV 파일 목록:")
    for i, file_name in enumerate(file_names, start=1):
        print(f"{i}. {file_name}")

    # 파일 선택
    choice = input("수정할 파일 번호를 입력하세요: ")

    try:
        index = int(choice) - 1
        if 0 <= index < len(file_names):
            selected_file = file_names[index]
            process_file(selected_file)
        else:
            print("유효하지 않은 선택입니다.")
    except ValueError:
        print("숫자를 입력해야 합니다.")

if __name__ == "__main__":
    main()