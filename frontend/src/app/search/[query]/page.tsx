// app/search/[query]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatBubble from "@/components/ChatBubble";
import ChatSearchBar from "@/components/ChatSearchBar";

interface Message {
  question: string;
  answer: string;
}

export default function SearchPage() {
  const { query } = useParams() as { query: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInitial() {
      const res = await fetch("http://localhost:8000/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) return console.error("Failed");

      const data = await res.json();
      setMessages([{ question: query, answer: data.answer }]);
      setLoading(false);
    }

    fetchInitial();
  }, [query]);

  const handleNewSearch = async (newQuestion: string) => {
    const res = await fetch("http://localhost:8000/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: newQuestion }),
    });

    if (!res.ok) return;

    const data = await res.json();
    setMessages((prev) => [...prev, { question: newQuestion, answer: data.answer }]);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="overflow-y-auto p-4 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i}>
              <ChatBubble type="question" text={msg.question} />
              <ChatBubble type="answer" text={msg.answer} />
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4">
        <ChatSearchBar onSearch={handleNewSearch} />
      </div>
    </div>
  );
}
