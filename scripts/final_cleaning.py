import pandas as pd

# Load cleaned data
df = pd.read_csv("../data/cleaned_villages.csv")

print("Original Columns:")
print(df.columns.tolist())

# Remove unnamed columns
df = df.loc[:, ~df.columns.str.contains("^unnamed", case=False)]

# Rename problematic column
df = df.rename(columns={
    "sub-district_name": "sub_district_name"
})

# Final column cleanup
df.columns = df.columns.str.strip()
df.columns = df.columns.str.lower()
df.columns = df.columns.str.replace("-", "_")

print("\nFinal Columns:")
print(df.columns.tolist())

# Save final cleaned dataset
output_path = "../data/final_villages.csv"

df.to_csv(output_path, index=False)

print("\nfinal_villages.csv created successfully!")