import Footer from "../component/Footer";
import HomeFeature from "../component/HomeFeature";
import HomeHero from "../component/HomeHero";
import HomeReview from "../component/HomeReview";
import StepProcess from "../component/HomeStepProcess";
import HomeTrial from "../component/HomeTrial";

function Home() {
  return (
    <div>
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 md:left-[10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.25),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.25),rgba(255,255,255,0))]"></div>
      </div>
      <HomeHero />
      <StepProcess />
      <HomeFeature />
      <HomeTrial />
      <HomeReview />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
