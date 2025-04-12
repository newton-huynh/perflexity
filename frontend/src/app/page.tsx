"use client";
import Image from "next/image";
import { SearchBar } from "@/components/main-searchbar";

export default function Home() {
  return (
    <div className="text-4xl flex flex-col gap-10 justify-center items-center">
      <SearchBar onSearch={() => {}} placeholder="Search..." />
    </div>
  );
}
