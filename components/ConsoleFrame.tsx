"use client";

import { ConsoleShell } from "@/components/ConsoleShell";
import { ReviewProvider } from "@/components/ReviewState";

export function ConsoleFrame({ children }: { children: React.ReactNode }) {
  return (
    <ReviewProvider>
      <ConsoleShell>{children}</ConsoleShell>
    </ReviewProvider>
  );
}
