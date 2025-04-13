from .retrieve import embed_query, retrieve_relevant_chunks
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Builds a prompt for the OpenAI API
# Takes a query, a list of chunks, and a user profile
# Returns a RAG prompt for the OpenAI API
def build_prompt(query: str, chunks: list[dict], user_profile: dict = None) -> str:
    profile_str = ""
    if user_profile:

        for key, value in user_profile.items():
            if value is None or value == "":
                continue

            if key == "toggleCitations":
                print("!!!!!!!!!!!!!!!!!!!!!", value)

            if key == "name":
                profile_str += f"- Name: {value}\n"
            elif key == "height":
                profile_str += f"- Height: {value}\n"
            elif key == "weight":
                profile_str += f"- Weight: {value} lbs\n"
            elif key == "gender":
                profile_str += f"- Gender: {value}\n"
            elif key == "race":
                profile_str += f"- Race: {value}\n"
            elif key == "age":
                profile_str += f"- Age: {value}\n"
            elif key == "goal":
                profile_str += f"- Goal: {value}\n"
            elif key == "diet":
                profile_str += f"- Diet: {value}\n"
            elif key == "frequency":
                profile_str += f"- Gym Frequency: {value}\n"
            elif key == "answerStyle":
                profile_str += f"- Answer Style: {value}\n"
            elif key == "influencer":
                profile_str += f"- The user's favorite influencers are: {value}\n"
            elif key == "squat":
                profile_str += f"- Lifting Maxes: Squat: {value} lbs\n"
            elif key == "bench":
                profile_str += f"- Lifting Maxes: Bench: {value} lbs\n"
            elif key == "deadlift":
                profile_str += f"- Lifting Maxes: Deadlift: {value} lbs\n"
            elif key == "responseLength":
                profile_str += f"- On a scale of 1-10, with 1 being a very short response and 10 being a very long response, the provide a {value} response length\n"
            elif key == "toggleCitations" and value == True:
                profile_str += "Cite your sources inline using bracketed numbers that correspond to the provided context chunks, only if you are sure that the information is directly relevant to the user's question. For example, use [1], [2], [3] if referring to Context #1, Context #2, and Context #3 respectively. These numbers should match the order in which the context chunks are presented so that citations can later be mapped to their original sources. Only cite sources if they are directly relevant to the user's question."
                
            

    context_blocks = [
        f"Context #{i+1}:\n{chunk['text']}"
        for i, chunk in enumerate(chunks)
    ]

    prompt = f"""You are a helpful fitness assistant answering user questions based on retrieved evidence.



User asked: "{query}"

Use the context below to answer clearly and of the user's desired answer style:

User Profile:
{profile_str}

Here are some relevant context chunks, only use the ones that are directly relevant to the user's question:
---
{chr(10).join(context_blocks)}

Answer based on the user's profile, the provided context, and the user's question. Make it personalized.:
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
query = "What's the best workout split for hypertrophy?"
profile = {
    "goal": "hypertrophy",
    "diet": None,
    "experience": "beginner",
    "weight": 10,
    "height": "5'8",
    "answer_style": "detailed"
}

vec = embed_query(query)
chunks = retrieve_relevant_chunks(vec, top_k=5)
prompt = build_prompt(query, chunks, profile)
answer = generate_answer(prompt)

print("\n🧠 Final Answer:\n")
print(answer)
