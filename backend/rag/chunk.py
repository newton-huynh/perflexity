import tiktoken

def chunk_text(text, max_tokens=500, overlap=50, model="gpt-3.5-turbo"):
    tokenizer = tiktoken.encoding_for_model(model)
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start
        while end < len(words):
            token_count = len(tokenizer.encode(" ".join(words[start:end])))
            if token_count > max_tokens:
                break
            end += 1
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = max(end - overlap, start + 1)

    return chunks
