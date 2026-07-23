import VideoIntro from "@/components/VideoIntro/VideoIntro";
import AboutMe from "@/components/AboutMe/AboutMe";
import Services from "@/components/Services/Services";
import Arsenal from "@/components/Arsenal/Arsenal";
import SelectedWorks from "@/components/SelectedWorks/SelectedWorks";
import Journey from "@/components/Journey/Journey";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--bg-color)', overflowX: 'hidden' }}>
      {/* Intro Section */}
      <VideoIntro />
      
      {/* About Me Section */}
      <AboutMe />

      {/* Services Section */}
      <Services />

      {/* Skills & Technologies Section */}
      <Arsenal />

      {/* Selected Works Section */}
      <SelectedWorks />

      {/* Experience & Education Section */}
      <Journey />

      {/* Footer */}
      <Footer />
    </main>
  );
}

