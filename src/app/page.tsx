import VideoIntro from "@/components/VideoIntro/VideoIntro";

export default function Home() {
  return (
    <main style={{ minHeight: '200vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Cinematic Hero Section */}
      <VideoIntro />
      
      {/* Dummy section to demonstrate scrolling */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#555', letterSpacing: '0.1em' }}>CONTENT CONTINUES BELOW</p>
      </section>
    </main>
  );
}

