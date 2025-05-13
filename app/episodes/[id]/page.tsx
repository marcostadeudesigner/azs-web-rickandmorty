"use client";
import { EpisodeDetailPage } from "@/src/components/Pages/EpisodeDetailPage";

import { useParams } from "next/navigation";

export default function Episodes() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EpisodeDetailPage params={{ id }} />
    </main>
  );
}
