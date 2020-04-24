import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import ExploreSectionMiddle from "../subComponents/exploreComponents/ExploreSectionMiddle";
import ExploreStream from "../subComponents/exploreComponents/ExploreStream";
import Follow from "../mainComponents/mainAside/Follow";
import Footer from "../mainComponents/mainAside/Footer";
import Search from "../mainComponents/mainAside/Search";
import SettingLogo from "../assets/SettingLogo";

const Explore = () => {
  return (
    <div className="main-container explore">
      <section>
        <SectionHeader heading={<Search />} logo={<SettingLogo />} />
        <SectionMiddle data={<ExploreSectionMiddle />} />
        <Stream data={<ExploreStream />} />
      </section>
      <aside>
        <Follow />
        <Footer />
      </aside>
    </div>
  );
};

export default Explore;
