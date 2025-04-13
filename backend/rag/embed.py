from openai import OpenAI
import os
from dotenv import load_dotenv
from pinecone import Pinecone
from pinecone import ServerlessSpec


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")  
PINECONE_INDEX = os.getenv("PINECONE_INDEX")  
# Init Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)

# Create index if needed
if not pc.has_index(PINECONE_INDEX):
    pc.create_index(
        name=PINECONE_INDEX,
        vector_type="dense",
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws", 
            region=PINECONE_ENV
        ),
        deletion_protection="disabled"
    )

# Load index object
index = pc.Index(PINECONE_INDEX)
client = OpenAI(api_key=OPENAI_API_KEY)

# Takes a list of text strings and returns a list of embedding vectors
# Uses OpenAI's embedding model to convert text into dense vector representations
# Returns a list of lists, where each inner list contains the embedding for a single text string
def embed_text_batch(texts: list[str]) -> list[list[float]]:
    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=texts
        )
        return [r.embedding for r in response.data]
    except Exception as e:
        print(f"Embedding failed: {e}")
        return []