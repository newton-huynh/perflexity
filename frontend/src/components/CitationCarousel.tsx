"use client";

import { Citation } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Markdown from "react-markdown";

interface AnswerCardProps {
  citations: Citation[];
  answer: string;
}

export default function CitationCarousel({
  citations,
  answer,
}: AnswerCardProps) {
  return (
    <div className="flex flex-col w-full">
      {citations.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2">Citations</h3>
          <div className="flex flex-col gap-2">
            {citations.map((citation, index) => (
              <Card
                className="bg-cyan-700 hover:bg-cyan-600 transition-colors duration-300 p-2 "
                key={index}
              >
                <CardContent className="p-2 flex flex-col gap-0 text-center justify-between items-center">
                  <div className="text-slate-100 mb-2 italic">
                    Source {index + 1}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-100 hover:underline text-sm font-medium overflow-hidden truncate block max-w-full"
                      >
                        {citation.title}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      <Markdown>{citation.title}</Markdown>
                    </TooltipContent>
                  </Tooltip>
                  <p></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
