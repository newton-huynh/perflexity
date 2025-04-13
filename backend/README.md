# 🧠 Perflexity Backend

This is the backend for **Perflexity**, a personalized fitness-focused answer engine built with RAG (Retrieval-Augmented Generation).

## 🚀 Features

- 🔍 Semantic search over fitness articles and YouTube transcripts
- 🧩 Token-aware chunking and batch embeddings via OpenAI
- 🧠 LLM answer generation using personalized user profiles
- 📚 Source citation support
- ⚡ FastAPI endpoint: `/answer`

## 📦 Tech Stack

- Python 3.10+
- FastAPI
- Pinecone (Vector DB)
- OpenAI API (`text-embedding-3-small`, `gpt-3.5-turbo`)
- Token-aware chunking
- `dotenv` for secrets

## 📁 Folder Structure

/backend
├── dataset/                # Source JSONs and metadata
├── rag/                    # RAG modules (embed, retrieve, prompt)
│   ├── chunk.py
│   ├── embed.py
│   ├── retrieve.py
│   └── prompt.py
├── main.py                 # FastAPI entrypoint
├── requirements.txt

## Feeding the RAG

- cd into root directory
- add raw sources to raw_sources.json
- run python backend/dataset/ingest/ingest_sources.py
- run python backend/rag/build_embeddings

## 🔧 Setup

1. Install dependencies

    pip install -r requirements.txt

2. Create a `.env` file with your keys

    OPENAI_API_KEY=sk-...
    PINECONE_API_KEY=...
    PINECONE_INDEX=perflexity-index

3. Run the FastAPI server

    cd backend
    uvicorn main:app --reload

Then open the Swagger docs at http://localhost:8000/docs

## 🔁 API Endpoint

POST /answer

Request body:

{
  "query": "What is the best workout split for hypertrophy?",
  "profile": {
    "goal": "hypertrophy",
    "diet": "vegan",
    "experience": "beginner",
    "weight": 150,
    "height": "5'10"
  }
}

Response:

{
  "answer": "For hypertrophy, the best split is a body part workout split...",
  "citations": [
    {
      "title": "The Best Workout Splits For Every Goal | Gymshark Central",
      "url": "https://www.gymshark.com/blog/article/the-best-workout-splits-for-every-goal"
    }
  ]
}

## ✅ Project Status

This backend is complete and ready to be connected to the frontend.

## 📬 Author

Newton Huynh
