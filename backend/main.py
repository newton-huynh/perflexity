from fastapi import FastAPI, Request
from pydantic import BaseModel
from rag.retrieve import embed_query, retrieve_relevant_chunks
from rag.prompt import build_prompt, generate_answer

app = FastAPI()

class AnswerRequest(BaseModel):
    query: str
    profile: dict = {}

@app.post("/answer")
async def answer_question(req: AnswerRequest):
    # Step 1: Embed user query
    query_vector = embed_query(req.query)

    # Step 2: Retrieve top-k chunks
    chunks = retrieve_relevant_chunks(query_vector, top_k=5)

    # Step 3: Construct prompt
    prompt = build_prompt(req.query, chunks, req.profile)

    # Step 4: Generate answer
    answer = generate_answer(prompt)

    # Step 5: Return answer + sources
    citations = [
        { "title": c["title"], "url": c["url"] }
        for c in chunks
    ]

    return {
        "answer": answer,
        "citations": citations
    }
