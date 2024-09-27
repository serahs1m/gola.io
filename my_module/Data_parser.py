import pandas as pd
import os

# CSV file
file_names = [
    'Coriolanus.csv',
    'MAAN.csv',
    'macbeth.csv',
    'Richard-II.csv',
    'RomeoAndJuliet.csv',  
    'The-Tempest.csv',
    'The-Winter_s-Tale.csv'
]

# dataframe dictionary
dfs = {}

# read csv file
for file_name in file_names:
    file_path = os.path.join('Shakespeare', file_name)
    try:
        dfs[file_name] = pd.read_csv(file_path, on_bad_lines='skip')
        print(f"Successfully imported: {file_name}")
        print(dfs[file_name].head())  
    except Exception as e:
        print(f"Error importing {file_name}: {e}")

# check dataframe info
for file_name, df in dfs.items():
    print(f"\nDataFrame info for {file_name}:")
    print(df.info())
