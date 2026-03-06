import data from "./data";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import CertificationsSection from "./sections/CertificationsSection";
import TalksSection from "./sections/TalksSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent text-ink">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-[60] rounded-md bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-950 focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>
      <Navbar site={data.site} navigation={data.navigation} />
      <main id="main-content" className="space-y-16 pb-10 pt-6 sm:space-y-20">
        <HeroSection hero={data.hero} site={data.site} />
        
        {/* Achievements Removido */}
        
        <AboutSection aboutMeta={data.aboutMeta} contactSocials={data.contactSocials} />
        <SkillsSection skills={data.skills} />
        
        <div className="section-shell grid gap-10 lg:grid-cols-2 lg:items-start">
          <EducationSection education={data.education} compact />
          <ExperienceSection experience={data.experience} compact />
        </div>

        <ProjectsSection projects={data.projects} />

        {/* Blogs Removido */}

        <CertificationsSection certifications={data.certifications} />
        <TalksSection talks={data.talks} />
        <ContactSection contactForm={data.contactForm} />
      </main>
      <FooterSection footer={data.footer} />
    </div>
  );
}

export default App;