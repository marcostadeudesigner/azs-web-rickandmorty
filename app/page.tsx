
import EpisodeListPage from "@/src/components/EpisodeListPage/EpisodeListPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Rick and Morty Episodes</h1>
      <EpisodeListPage />
    </main>
  );
}
