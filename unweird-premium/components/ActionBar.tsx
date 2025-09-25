"use client";
import { cn } from "@/lib/cn";
export default function ActionBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Placeholder for future advanced toggles or actions */}
    </div>
  );
}
