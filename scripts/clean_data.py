import pandas as pd

try:
    print("Loading CSV...")

    df = pd.read_csv("../data/combined_villages.csv")

    print("CSV Loaded Successfully!")
    print("Original Rows:", len(df))

    # Remove duplicates
    df = df.drop_duplicates()

    print("After Removing Duplicates:", len(df))

    # Remove fully empty rows
    df = df.dropna(how='all')

    print("After Removing Empty Rows:", len(df))

    # Clean column names
    df.columns = df.columns.str.strip()
    df.columns = df.columns.str.lower()
    df.columns = df.columns.str.replace(" ", "_")

    print("\nColumn Names:")
    print(df.columns.tolist())

    # Remove rows with too many nulls
    threshold = len(df.columns) // 2
    df = df.dropna(thresh=threshold)

    print("\nAfter Null Cleaning:", len(df))

    # Save cleaned file
    output_path = "../data/cleaned_villages.csv"

    df.to_csv(output_path, index=False)

    print("\nFile saved successfully!")
    print("Saved at:", output_path)

except Exception as e:
    print("\nERROR:")
    print(e)