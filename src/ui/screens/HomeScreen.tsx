import { useAppStore } from "../../state/appStore";

export function HomeScreen() {
  const startStudio = useAppStore((state) => state.startStudio);

  return (
    <main className="home-screen">
      <section className="home-hero">
        <p className="eyebrow">Beyond foundation</p>
        <h1>Lightweight virtual broadcast studio</h1>
        <p>
          This first foundation opens a real Babylon.js runtime, loads the development starter
          manifest, and reports diagnostics while production assets are prepared.
        </p>
        <button type="button" className="primary-action" onClick={startStudio}>
          Start studio session
        </button>
        <p className="status-note">
          Development status: procedural starter set only. Real GLB set and sample media are
          pending.
        </p>
      </section>
    </main>
  );
}
