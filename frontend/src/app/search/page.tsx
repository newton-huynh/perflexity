"use client";
import {usePathname} from "next/navigation";



export default function SearchPage() {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Search query:", query);
  };
  const pathname = usePathname();

  return (
    <div className="text-4xl flex flex-col gap-10 justify-center items-center mb-4">
        { pathname }
    </div>
  );
}
