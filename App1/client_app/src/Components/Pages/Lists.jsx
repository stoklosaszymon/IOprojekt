import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import ListsSectionMiddle from "../subComponents/listsComponents/ListsSectionMiddle";
import ListsStream from "../subComponents/listsComponents/ListsStream";
import Search from "../mainComponents/mainAside/Search";
import Trends from "../mainComponents/mainAside/Trends";
import Footer from "../mainComponents/mainAside/Footer";
import ListLogo from "../assets/ListLogo";
import "../../Styles/Lists.css";

const Lists = () => {
  return (
    <div className="main-container lists-container">
      <section>
        <SectionHeader
          heading="Lists"
          subText="@username"
          logo={<ListLogo />}
        />
        <SectionMiddle data={<ListsSectionMiddle />} />
        <Stream data={<ListsStream />} />
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

export default Lists;
