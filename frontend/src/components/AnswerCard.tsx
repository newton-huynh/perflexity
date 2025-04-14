"use client";

import { Citation } from "@/lib/definitions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from "react-markdown";
import CitationCarousel from "@/components/CitationCarousel";


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
          <Markdown>{answer}</Markdown>
        </TabsContent>
        <TabsContent value="citations">
          <CitationCarousel citations={citations} answer={answer} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
