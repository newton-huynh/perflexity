export async function fetchAnswer(query: string, profile = {}) {
    const res = await fetch("http://localhost:8000/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, profile }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch answer");
    }
  
    return res.json();
  }
  