import React from "react";

interface ChatBubbleProps {
  type: "question" | "answer";
  text: string;
}

function ChatBubble({ type, text }: ChatBubbleProps) {
  const bubbleStyle =
    type === "question"
      ? "bg-blue-500 text-white self-end"
      : "bg-gray-200 text-black self-start";

  return (
    <div
      className={`flex flex-col m-4 items-center ${
        type === "question" ? "self-end" : "self-start"
      }`}
    >
      <div className={`text-stone-500 text-sm`}>
        {type === "question" ? "You" : "Perflexity"}
      </div>
      <div className={`p-4 rounded-lg max-w-xs ${bubbleStyle}`}>{text}</div>
    </div>
  );
}

export default ChatBubble;
