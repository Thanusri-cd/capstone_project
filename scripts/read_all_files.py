import pandas as pd
import os

# Path to Excel files

DATA_FOLDER =r"../data/village_data/dataset"
print("Checking folder:", DATA_FOLDER)
print("Folder exists:", os.path.exists(DATA_FOLDER))

# Get all Excel files
files = [f for f in os.listdir(DATA_FOLDER) if f.endswith(('.xls', '.xlsx', '.ods'))]

print(f"\nFound {len(files)} files\n")

all_data = []

for file in files:
    file_path = os.path.join(DATA_FOLDER, file)

    print(f"Reading: {file}")

    try:
        # Handle file types
        if file.endswith(".ods"):
            df = pd.read_excel(file_path, engine="odf")
        else:
            df = pd.read_excel(file_path)

        # Add source file column
        df["source_file"] = file

        print(f"Rows: {len(df)}")
        print(f"Columns: {list(df.columns)}\n")

        all_data.append(df)

    except Exception as e:
        print(f"Error reading {file}: {e}")

# Combine all files
if all_data:
    combined_df = pd.concat(all_data, ignore_index=True)

    print("\nTOTAL COMBINED ROWS:", len(combined_df))

    print("\nFIRST 5 ROWS:")
    print(combined_df.head())

    # Save combined file
    combined_df.to_csv("../data/combined_villages.csv", index=False)

    print("\ncombined_villages.csv created successfully!")