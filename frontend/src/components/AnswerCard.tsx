"use client";

import { Citation } from "@/lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnswerCardProps {
  citations: Citation[];
  answer: string;
}

export default function AnswerCard({ citations, answer }: AnswerCardProps) {
  return (
    <div className="flex flex-col w-full">
      <Tabs defaultValue="answer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="answer">Answer</TabsTrigger>
          <TabsTrigger value="citations">Citations</TabsTrigger>
        </TabsList>
        <TabsContent value="answer">
          <p>{answer}</p>
        </TabsContent>
        <TabsContent value="citations">
          {citations.map((citation, index) => (
            <div key={index} className="mb-2">
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {citation.ranking}. {citation.title}
              </a>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
