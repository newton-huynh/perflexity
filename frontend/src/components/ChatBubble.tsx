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

  return (
    <div
      className={`flex flex-col items-center gap-2 p-2 ${
        type === "question" ? "self-end" : "self-start"
      }`}
    >
      <div className={`text-stone-500 text-sm ${type === "question" ? "self-end mr-2" : "self-start ml-2"}`}>
        {type === "question" ? "You" : "Perflexity"}
      </div>
          <div className={`p-4 rounded-lg max-w-2xl ${bubbleStyle}`}>
              {type == "question" || type == "loading" ? text : <AnswerCard citations={citations || []} answer={text}/>}
          </div>
    </div>
  );
}

export default ChatBubble;
