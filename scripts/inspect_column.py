import pandas as pd

# Load cleaned CSV
df = pd.read_csv("../data/cleaned_villages.csv")

print("\nCOLUMN NAMES:\n")
for col in df.columns:
    print(col)

print("\n\nFIRST 5 ROWS:\n")
print(df.head())