// app/search/[query]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatBubble from "@/components/ChatBubble";
import ChatSearchBar from "@/components/ChatSearchBar";
import { messageHistory } from "@/lib/placeholder-data";
import { Message } from "@/lib/definitions";
import { useRef } from "react";
import { getProfile } from "@/lib/storage";

export default function SearchPage() {
  const { query } = useParams() as { query: string };
  const [messages, setMessages] = useState<Message[]>([]);

    const testMode = true; // TODO: remove this
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      
        if (testMode) {
            setMessages(messageHistory);

            return;
        }
        setMessages([{ question: query, answer: "", citations: [] }]);
        
    async function fetchInitial() {
      const res = await fetch("http://localhost:8000/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, profile: getProfile() ?? {} }),
      });

      if (!res.ok) return console.error("Failed");

      const data = await res.json();
      setMessages([{ question: query, answer: data.answer, citations: data.citations }]);

    }

    fetchInitial();
    }, [query]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleNewSearch = async (newQuestion: string) => {

        // Step 1: Add the new question to the messages
        setMessages((prev) => [...prev, { question: newQuestion, answer: "", citations: [] }]);
        
        // Step 2: Fetch the answer from the server
        const res = await fetch("http://localhost:8000/answer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: newQuestion, profile: getProfile() ?? {} }),
        });

        // Step 3: Update the messages with the answer

    if (!res.ok) return;

    const data = await res.json();
    setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answer: data.answer,
          citations: data.citations,
        };
        return updated;
      });
  };

  return (
    <div className="flex flex-col justify-between h-full w-full pr-4 pl-4 sm:pr-2 sm:pl-2">
      <div className="p-4 space-y-4 overflow-y-auto">
              
              {messages.map((msg, i) => (
                <div key={i} className="flex flex-col">
                      <ChatBubble type="question" text={msg.question} />
                      {msg.answer ? (
                          <ChatBubble type="answer" text={msg.answer} citations={msg.citations} />
                      ) : (
                          <ChatBubble type="answer" text="Loading..." />
                      )}
                </div>
            ))}
            <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <ChatSearchBar onSearch={handleNewSearch} />
      </div>
    </div>
  );
}
