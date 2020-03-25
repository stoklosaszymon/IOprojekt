import React from "react";
import SectionHeader from "Components/mainComponents/mainSection/SectionHeader";
import SectionMiddle from "Components/mainComponents/mainSection/SectionMiddle";
import Stream from "Components/mainComponents/mainSection/Stream";
import HomeSectionMiddle from "Components/subComponents/homeComponents/HomeSectionMiddle";
import HomeStream from "Components/subComponents/homeComponents/HomeStream";
import Search from "Components/mainComponents/mainAside/Search";
import Trends from "Components/mainComponents/mainAside/Trends";
import Follow from "Components/mainComponents/mainAside/Follow";
import Footer from "Components/mainComponents/mainAside/Footer";
import HomeLogo from "assets/HomeLogo";
import "Styles/Home.css";

const Home = () => {
  return (
    <div className="main-container home">
      <section>
        <SectionHeader heading="Home" logo={<HomeLogo />} />
        <SectionMiddle data={<HomeSectionMiddle />} />
        <Stream data={<HomeStream />} />
      </section>

      <aside>
        <div className="aside-container">
          <Search />
          <Trends />
          <Follow />
          <Footer />
        </div>
      </aside>
    </div>
  );
};

export default Home;
