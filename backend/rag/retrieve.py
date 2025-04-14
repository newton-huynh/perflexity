import os
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import ServerlessSpec
from pinecone import Pinecone

load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Retrieval system for finding relevant text chunks from Pinecone vector database
# Uses OpenAI embeddings to convert queries into vectors for semantic search
def embed_query(query: str) -> list[float]:
    try:
        response = client.embeddings.create(
            input=[query],
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"❌ Failed to embed query: {e}")
        return []
    

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)

# Takes a query embedding vector and returns the top_k most semantically similar text chunks from Pinecone
# The query_embedding should be a list of floats generated from the embed_query() function
# Returns a list of dicts containing the matched chunks' text, title, url and similarity score
# If the Pinecone query fails, returns an empty list
def retrieve_relevant_chunks(query_embedding: list[float], top_k: int = 5) -> list[dict]:
    try:
        response = index.query(
            vector=query_embedding,
            top_k=top_k * 3, # in case we need to filter out duplicates
            include_metadata=True
        )

        seen_ids = set()
        unique_matches = []

        for match in response.matches:
            source_id = match.metadata.get("source_id")
            if source_id not in seen_ids:
                seen_ids.add(source_id)
                unique_matches.append(match)
            if len(unique_matches) == top_k:
                break

        return [
            {
                "text": match.metadata.get("text", ""),
                "title": match.metadata.get("title", ""),
                "url": match.metadata.get("url", ""),
                "score": match.score,
                "ranking": idx + 1
            }
            for idx, match in enumerate(unique_matches)
        ]
    except Exception as e:
        print(f"❌ Failed to query Pinecone: {e}")
        return []
    


# #TODO: Remove later this is hardcoded test
# query = "What's the best workout split for hypertrophy?"
# vec = embed_query(query)
# results = retrieve_relevant_chunks(vec, top_k=5)

# for i, chunk in enumerate(results):
#     print(f"\n🔹 Match #{i+1}")
#     print(f"Title: {chunk['title']}")
#     print(f"Score: {chunk['score']:.4f}")
#     print(f"Snippet: {chunk['text'][:200]}...")
#     print(f"Ranking: {chunk['ranking']}")