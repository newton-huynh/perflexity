import tiktoken
import json
# Use the tokenizer for OpenAI's embedding model
enc = tiktoken.encoding_for_model("text-embedding-3-small")

def count_tokens(text: str) -> int:
    return len(enc.encode(text))

def chunk_text(
    text: str,
    max_tokens: int = 300,
    overlap: float = 0.5
) -> list[str]:
    tokens = enc.encode(text)
    chunk_size = max_tokens
    step = int(chunk_size * (1 - overlap))
    chunks = []

    for i in range(0, len(tokens), step):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = enc.decode(chunk_tokens)
        if len(chunk_text.strip()) > 50:
            chunks.append(chunk_text.strip())
    print(len(chunks))
    return chunks

# Test the chunk_text function
# if __name__ == "__main__":
#     with open("backend/dataset/ingested_sources.json") as f:
#         sources = json.load(f)
#     text = sources[0]["content"]  # Test with first document's content
#     chunks = chunk_text(text)
#     print(chunks[1])
