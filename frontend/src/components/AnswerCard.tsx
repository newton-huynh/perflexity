import { Citation } from "@/lib/definitions";
import { useState } from "react";

interface AnswerCardProps {
  citations: Citation[];
  answer: string;
}

function AnswerCardHeader({
    header,
    activeHeader,
  setActiveHeader,
}: {
  header: string;
  activeHeader: string;
  setActiveHeader: (header: string) => void;
}) {
  return (
    <h2
      className={`text-sm flex-1 font-bold hover:cursor-pointer hover:text-blue-500 transition-all duration-300 ${header === activeHeader ? 'text-primary underline' : 'text-gray-500'}`}
      onClick={() => setActiveHeader(header)}
    >
      {header}
    </h2>
  );
}

function AnswerCardHeaders({
  activeHeader,
  setActiveHeader,
}: {
  activeHeader: string;
  setActiveHeader: (header: string) => void;
}) {
  return (
    <div className="flex flex-row justify-around mb-2">
      <AnswerCardHeader header="Answer" activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
      <AnswerCardHeader header="Citations" activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
    </div>
  );
}

export default function AnswerCard({ citations, answer }: AnswerCardProps) {
  const [activeHeader, setActiveHeader] = useState<string>("Answer");
  return (
    <div className="flex flex-col w-full bg text-sm">
          <AnswerCardHeaders activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
          {activeHeader === "Answer" && <p>{answer}</p>}
          {activeHeader === "Citations" && citations.map((citation, index) => (
            <div key={index}>
              <a href={citation.url} target="_blank" rel="noopener noreferrer">
                {citation.ranking}. {citation.title}
              </a>
            </div>
          ))}

    </div>
  );
}
