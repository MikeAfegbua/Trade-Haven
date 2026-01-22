import { Hero } from "@/components/home";
import { SignalFeed } from "@/components/signals";
import { FAQ } from "@/components/home/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <SignalFeed />
      </section>
      <section className="container mx-auto px-4 pb-16">
        <FAQ />
      </section>
    </>
  );
}
