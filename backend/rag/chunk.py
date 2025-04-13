import tiktoken
import json
# Use the tokenizer for OpenAI's embedding model
enc = tiktoken.encoding_for_model("text-embedding-3-small")

# Takes a text string and returns the number of tokens in the text
def count_tokens(text: str) -> int:
    return len(enc.encode(text))

# Takes a text string and returns a list of chunks of text
# Each chunk is a string of text that is no longer than max_tokens
# The chunks are overlapping by overlap percent
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


