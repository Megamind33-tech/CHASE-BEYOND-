import { useAppStore } from "../../state/appStore";

export function HomeScreen() {
  const startStudio = useAppStore((state) => state.startStudio);

  return (
    <main className="home-screen">
      <section className="home-hero">
        <p className="eyebrow">Beyond</p>
        <h1>Virtual studio control</h1>
        <p>Open the studio preview, check active sources and sets, and monitor output status.</p>
        <button type="button" className="primary-action" onClick={startStudio}>
          Start studio session
        </button>
        <p className="status-note">Starter Studio is available in preview mode.</p>
      </section>
    </main>
  );
}
