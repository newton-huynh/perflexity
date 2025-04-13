"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatSearchBarProps {
  onSearch: (query: string) => void;
}

export default function ChatSearchBar({ onSearch }: ChatSearchBarProps) {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 sticky bottom-4">
      <Input
        type="text"
        placeholder="Type your question..."
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button onClick={handleSearch} disabled={!query.trim()}>
        Search
      </Button>
    </div>
  );
}
