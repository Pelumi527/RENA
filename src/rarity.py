import json
import csv

# Define the file paths
input_json_file = '/Users/maclay/Code/RENA/src/metadata.json'
output_csv_file = 'renegades.csv'

# Read the JSON file
with open(input_json_file, 'r') as f:
    data = json.load(f)

# Define the CSV column names
fieldnames = ['rank', 'overallRarity', 'name', 'image', 'attributes']

# Function to convert the attributes list to a string
def convert_attributes(attributes):
    return "; ".join([f"{attr['trait_type']}: {attr['value']}" for attr in attributes])

# Write to the CSV file
with open(output_csv_file, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for item in data:
        writer.writerow({
            'rank': item.get('rank'),
            'overallRarity': item.get('overallRarity'),
            'name': item.get('name'),
            'image': 'https://bafybeigha5ts6nn3d362nqb2fsxkyomq5u2lei2a3u32uwz7qz7jy4gg4i.ipfs.nftstorage.link/' + (item.get('image')),
            'attributes': convert_attributes(item.get('attributes', [])),
        })

print(f"CSV file '{output_csv_file}' has been created successfully.")
