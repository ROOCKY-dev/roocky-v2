import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* About */}

      {/* Projects */}
      <section
        id="projects"
        className="mx-auto w-full"
        style={{
          maxWidth: "1200px",
          padding: "6rem 1.5rem",
        }}
      >
        <p className="font-mono text-[13px] text-[var(--accent)] mb-2">
          {"// work"}
        </p>
        <h2 className="font-display text-3xl font-bold text-[var(--fg-primary)] mb-10">
          projects
        </h2>
        <ProjectGrid />
      </section>

      {/* Skills */}
      {/* Journey */}
      {/* Contact */}
    </main>
  );
}
