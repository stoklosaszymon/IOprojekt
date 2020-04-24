import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import Stream from "../mainComponents/mainSection/Stream";
import BookmarksStream from "../subComponents/bookmarksComponents/BookmarksStream";
import Search from "../mainComponents/mainAside/Search";
import Trends from "../mainComponents/mainAside/Trends";
import Follow from "../mainComponents/mainAside/Follow";
import Footer from "../mainComponents/mainAside/Footer";

const Bookmarks = () => {
  return (
    <div className="main-container bookmarks-container">
      <section>
        <SectionHeader heading="Bookmarks" subText="@username" />
        <Stream data={<BookmarksStream />} />
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

export default Bookmarks;
