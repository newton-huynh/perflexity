"use client";
import Image from "next/image";
import { MainSearchBar } from "@/components/main-searchbar";

export default function Home() {
  return (
    <div className="text-4xl flex flex-col gap-10 justify-center items-center mb-4">
      <MainSearchBar placeholder="Search..." />
    </div>
  );
}
