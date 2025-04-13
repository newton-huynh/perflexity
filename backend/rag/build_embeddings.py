import json
import time
import hashlib
import os
from chunk import chunk_text
from embed import embed_text_batch, index

EMBEDDED_URLS_PATH = "backend/dataset/embedded_urls.json"

# Load list of already embedded URLs
if os.path.exists(EMBEDDED_URLS_PATH):
    with open(EMBEDDED_URLS_PATH) as f:
        embedded_urls = set(json.load(f))
else:
    embedded_urls = set()

# Load enriched documents
with open("backend/dataset/ingested_sources.json") as f:
    docs = json.load(f)

def hash_chunk(chunk: str) -> str:
    return hashlib.sha256(chunk.encode()).hexdigest()

# Process all chunks and metadata
all_chunks = []
all_metadata = []
existing_ids = set() # TODO: check existing ids

for doc in docs:
    if doc["url"] in embedded_urls:
        print(f"Skipping {doc['url']} because it already exists")
        continue
    chunks = chunk_text(doc["content"])

    for i, chunk in enumerate(chunks):
        chunk_id = hash_chunk(chunk)
        if chunk_id in existing_ids:
            print(f"Skipping chunk {chunk_id} because it already exists") # TODO: implement checking for existing ids
            continue
        all_chunks.append({
            "id": chunk_id,
            "vector": chunk,
            "metadata": {
                "source_id": doc["source_id"],
                "chunk_index": i,
                "text": chunk,
                "title": doc["title"],
                "url": doc["url"],
                "type": doc["type"],
                "tags": doc.get("tags", []),
                "author": doc.get("author", "Unknown"),
            }
        })
    embedded_urls.add(doc["url"])

# Save updated URL set
with open(EMBEDDED_URLS_PATH, "w") as f:
    json.dump(list(embedded_urls), f, indent=2)

print(f"📦 Total chunks to embed: {len(all_chunks)}")

# Batch size
BATCH_SIZE = 100

for i in range(0, len(all_chunks), BATCH_SIZE):
    batch = all_chunks[i:i + BATCH_SIZE]
    texts = [item["vector"] for item in batch]
    embeddings = embed_text_batch(texts)

    vectors_to_upsert = []
    for j, emb in enumerate(embeddings):
        chunk_obj = batch[j]
        vectors_to_upsert.append((
            chunk_obj["id"],
            emb,
            chunk_obj["metadata"]
        ))

    # Upload to Pinecone
    index.upsert(vectors=vectors_to_upsert)
    print(f"✅ Upserted batch {i} → {i + len(batch)}")
    time.sleep(1)  # rate limit safety

print("🚀 All embeddings uploaded to Pinecone!")
