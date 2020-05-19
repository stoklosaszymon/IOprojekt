import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";

import HomeSectionMiddle from "../subComponents/homeComponents/HomeSectionMiddle";
import HomeStream from "../subComponents/homeComponents/HomeStream";

import Search from "../mainComponents/mainAside/Search";
import Trends from "../mainComponents/mainAside/Trends";
import Footer from "../mainComponents/mainAside/Footer";

import HomeLogo from "../assets/HomeLogo";
import "../../Styles/Home.css";

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
          <Footer />
        </div>
      </aside>
    </div>
  );
};

export default Home;
