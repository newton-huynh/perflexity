import json
from schema import StandardDoc
from articles import process_article
from youtube import process_youtube


with open("dataset/raw_sources.json") as f:
    sources = json.load(f)

final_docs = []

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

        final_docs.append(doc.to_dict())

    except Exception as e:
        print(f"Failed to process {url}: {e}")

with open("dataset/ingested_sources.json", "w") as f:
    json.dump(final_docs, f, indent=2)
