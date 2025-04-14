"use client";

import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background fixed top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <Button
          className="h-8 w-8 flex-1"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-5 justify-center" >
          <Link href="/" className="flex flex-row items-center gap-1 justify-center">
            <Image src="/images/logo.png" alt="logo" width={32} height={32} />
            <h1 className="text-2xl font-bold">Perflexity </h1>
          </Link>
        </div>
        <div className="flex flex-1"></div>
      </div>
    </header>
  );
}
