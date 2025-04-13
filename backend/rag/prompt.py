from retrieve import embed_query, retrieve_relevant_chunks
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Builds a prompt for the OpenAI API
# Takes a query, a list of chunks, and a user profile
# Returns a RAG prompt for the OpenAI API
def build_prompt(query: str, chunks: list[dict], user_profile: dict = None) -> str:
    profile_str = ""
    if user_profile:
        profile_str = "\n".join([
            f"- Goal: {user_profile.get('goal', 'N/A')}",
            f"- Diet: {user_profile.get('diet', 'N/A')}",
            f"- Experience: {user_profile.get('experience', 'N/A')}",
            f"- Weight: {user_profile.get('weight', 'N/A')} lbs",
            f"- Height: {user_profile.get('height', 'N/A')}",
            f"- The user prefers a {user_profile.get('answer_style', 'N/A')} answer style"
        ])

    context_blocks = [
        f"Context #{i+1}:\n{chunk['text']}"
        for i, chunk in enumerate(chunks)
    ]

    prompt = f"""You are a helpful fitness assistant answering user questions based on retrieved evidence.

User Profile:
{profile_str}

User asked: "{query}"

Use the context below to answer clearly and of the user's desired answer style:

Cite your sources inline using bracketed numbers that correspond to the provided context chunks. 
For example, use [1], [2], [3] if referring to Context #1, Context #2, and Context #3 respectively.
These numbers should match the order in which the context chunks are presented so that citations can later be mapped to their original sources.
---
{chr(10).join(context_blocks)}

Answer:
"""
    return prompt


# Takes a prompt and a model
# Returns an answer for the OpenAI API
def generate_answer(prompt: str, model="gpt-3.5-turbo") -> dict:
    try:
        response = client.responses.create(
            model="gpt-3.5-turbo",
            instructions="You are a helpful fitness assistant answering user questions based on retrieved evidence.",
            input=prompt
        )

        return response.output[0].content[0].text
    except Exception as e:
        print(f"❌ OpenAI generation error: {e}")
        return "Sorry, something went wrong while generating the answer."
    
# TODO: Remove later this is hardcoded test
# query = "What's the best workout split for hypertrophy?"
# profile = {
#     "goal": "hypertrophy",
#     "diet": None,
#     "experience": "beginner",
#     "weight": 10,
#     "height": "5'8",
#     "answer_style": "detailed"
# }

# vec = embed_query(query)
# chunks = retrieve_relevant_chunks(vec, top_k=5)
# prompt = build_prompt(query, chunks, profile)
# answer = generate_answer(prompt)

# print("\n🧠 Final Answer:\n")
# print(answer)
