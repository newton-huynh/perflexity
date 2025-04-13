import json
from schema import StandardDoc
from articles import process_article
from youtube import process_youtube


with open("backend/dataset/raw_sources.json") as f:
    sources = json.load(f)

final_docs = []

# Iterates through each source in the raw_sources.json file
# Processes the source based on its type (article or youtube)
# If an error occurs during processing, it prints an error message
# Writes the final list of processed documents to ingested_sources.json
for src in sources:
    t = src["type"]
    url = src["url"]

    try:
        if t == "article":
            doc = process_article(url)
        elif t == "youtube":
            doc = process_youtube(url)
        else:
            print(f"Unknown type: {t}")
            continue

        if len(doc.content) < 100:
            print(f"Skipping {url} because it has no content or too short")
            continue

        final_docs.append(doc.to_dict())

    except Exception as e:
        print(f"Failed to process {url}: {e}")
        continue

with open("backend/dataset/ingested_sources.json", "w") as f:
    json.dump(final_docs, f, indent=2)
