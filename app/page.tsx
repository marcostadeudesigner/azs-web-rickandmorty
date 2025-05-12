import Image from "next/image";
import Episodes from "@/src/components/Episodes/Episodes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Rick and Morty Episodes</h1>
      <Episodes />
    </main>
  );
}
