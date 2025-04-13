"use client";

import { Search } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { useRouter } from "next/navigation";
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function MainSearchBar({
  placeholder = "Search...",
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

  const handleSearch = () => {
    if (query.trim()) {
      const slugifiedQuery = slugify(query.trim(), { lower: true });
      router.push(`/search/${slugifiedQuery}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="text-primary text-2xl justify-self-start"> What do you want to grow?</div>
        <div className="flex w-full max-w-xl items-center space-x-2">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w- -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                className="pl-9 pr-4 h-10 rounded-full bg-background border-input hover:border-primary/50 focus-visible:ring-1"
            />
            </div>

            <Button
            onClick={handleSearch}
            size="sm"
            className="rounded-full h-10 px-4"
            disabled={!query.trim()}
            >
            Search
            </Button>
        </div>
    </div>
  );
}
