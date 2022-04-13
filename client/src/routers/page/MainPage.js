import Section from "../../components/mainPage/Section.js";
import Category from "../../components/mainPage/Category.js";
import VideoSection from "../../components/mainPage/VideoSection.js";
import Footbar from "../../components/mainPage/Footbar.js";
import Navbar from "../../components/mainPage/Navbar.js";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Section />
      <Category />
      <VideoSection />
      <Footbar />
    </>
  );
};

export default MainPage;
