import Footer from "../component/Footer";
import AboutHero from "../component/AboutHero";
import AboutMission from "../component/AboutMission";
import AboutExplore from "../component/AboutExplore";
import AboutStart from "../component/AboutStart";

function About() {
  return (
    <>
      <section>
        <AboutHero />
        <AboutMission />
        <AboutExplore />
        <AboutStart />
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default About;
