import React from "react";
import { Citation } from "@/lib/definitions";
import AnswerCard from "@/components/AnswerCard";
interface ChatBubbleProps {
  type: "question" | "answer" | "loading";
  text: string;
  citations?: Citation[];
}

function ChatBubble({ type, text, citations }: ChatBubbleProps) {
  const bubbleStyle =
    type === "question"
      ? "bg-blue-500 text-white self-end"
      : "bg-gray-200 text-black self-start";

  const renderContent = () => {
    switch (type) {
      case "loading":
            return (
                <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="4">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>    
                    </svg>
                    <span className="text-stone-500">Perflexity is thinking...</span>
                </div>
            )
      case "answer":
        return <AnswerCard citations={citations || []} answer={text} />;
      case "question":
        return (
          <div>
            {text}
          </div>
        );
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 p-2 w-full ${
        type === "question" ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`text-stone-500 text-sm ${
          type === "question" ? "self-end mr-2" : "self-start ml-2"
        }`}
      >
        {type === "question" ? "You" : "Perflexity"}
      </div>
      <div className={`p-4 rounded-lg max-w-2xl min-w-1/2 ${bubbleStyle}`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default ChatBubble;
