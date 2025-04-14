# 💪 Perflexity — Your Personalized Fitness Answer Engine

Perflexity is a fitness-focused AI question-answering engine that delivers smart, grounded, and personalized responses to all your training, nutrition, and performance questions.

This project was created to emphasizes user personalization, high-quality fitness data, and retrieval-augmented generation (RAG) — without relying on LangChain.
I decided to implement all of the following features of RAG by hand to maximize this learning experience:
- Data Ingestion
- Preprocessing and Cleaning
- Metadata Enrichment
- Token-aware Chunking
- Embedding
- Vector indexing
- Query Embedding
- Retrieval
- Prompt Construction

---

## 🧠 What It Does

- Users ask questions about fitness, nutrition, and goals (e.g. "What is a good 4-day split?", "Is creatine vegan-friendly?")
- Get grounded responses based on real articles, YouTube transcripts, and podcasts
- Personalized answers based on your profile: fitness goal, diet, 1RM stats, gym frequency, favorite fitness influenceers etc.
- Browse chat-like Q&A with inline citations (that can be toggled on or off)
- Adjust preferences in a real-time sidebar playground

---

## ✨ Features

- **Custom RAG pipeline** (Python backend): no LangChain, fully built from scratch
- **OpenAI embeddings** (`text-embedding-3-small`) + **Pinecone** vector search
- Supports ingestion of:
  - Cleaned fitness articles
  - YouTube fitness videos (via transcript)
  - Podcasts
- Personalized prompts using user profile (diet, goals, stats)
- Clean chat interface with loading states and citations
- Sidebar playground for live profile tweaking 

---

## ⚙️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI (Cards, Dialogs, Selects, Inputs)

### Backend
- Python + FastAPI
- Pinecone (Vector DB)
- OpenAI API (embeddings + answer generation)

### Storage
- `localStorage` for user profile state
- No auth but hopeful to accomplish this in the future

---

## 🚀 Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/perflexity.git
cd perflexity
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables
Create a `.env` file in `backend/` with:
```
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-env
PINECONE_INDEX_NAME=your-index
```

---

## 🧱 Architecture Overview


---

## 🏁 Next Steps (Planned)
- Add sharable query URLs
- Add multi-turn memory
- Add file upload for personal workout plans (parsing)
- Add user authentivation

---

## 🙌 Credits
Built by Newton Huynh as part of the Perplexity AI Residency Challenge. Special thanks to:
- OpenAI
- Pinecone
- ShadCN
- YouTube Transcript API

---

## 📬 Contact
Have questions or want to contribute?
- Email: nth8@rice.edu
- GitHub: [@newton-huynh](https://github.com/newton-huynh)

