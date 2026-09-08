"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { REVIEW_ITEMS, type ReviewDecision } from "@/data/suirei";

type Ctx = {
  decisions: Record<string, ReviewDecision>;
  setDecision: (id: string, value: Exclude<ReviewDecision, "pending">) => void;
  pendingCount: number;
  order: typeof REVIEW_ITEMS;
};

const ReviewContext = createContext<Ctx | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [decisions, setDecisions] = useState<Record<string, ReviewDecision>>(() =>
    Object.fromEntries(REVIEW_ITEMS.map((item) => [item.id, item.initial]))
  );

  const setDecision = (id: string, value: Exclude<ReviewDecision, "pending">) => {
    setDecisions((prev) => ({ ...prev, [id]: value }));
  };

  const pendingCount = Object.values(decisions).filter((v) => v === "pending").length;

  const order = useMemo(() => {
    const byId = Object.fromEntries(REVIEW_ITEMS.map((item) => [item.id, item]));
    const vanDone = decisions.van !== "pending";
    if (!vanDone) return REVIEW_ITEMS;
    return [byId.extinguisher, byId.van, byId.exit];
  }, [decisions.van]);

  return (
    <ReviewContext.Provider value={{ decisions, setDecision, pendingCount, order }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("ReviewProvider が必要です");
  return ctx;
}
