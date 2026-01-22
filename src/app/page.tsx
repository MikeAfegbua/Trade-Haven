import { Hero } from "@/components/home";
import { SignalFeed } from "@/components/signals";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <SignalFeed />
      </section>
    </>
  );
}
