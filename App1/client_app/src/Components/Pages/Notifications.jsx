import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMidle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import NotificationsSectionMiddle from "../subComponents/notificationsComponents/NotificationsSectionMiddle";
import NotificationsStream from "../subComponents/notificationsComponents/NotificationsStream";
import Search from "../mainComponents/mainAside/Search";
import Trends from "../mainComponents/mainAside/Trends";
import Follow from "../mainComponents/mainAside/Follow";
import Footer from "../mainComponents/mainAside/Footer";
import SettingLogo from "../assets/SettingLogo";

const Notifications = () => {
  return (
    <div className="main-container notifications">
      <section>
        <SectionHeader heading="Notifications" logo={<SettingLogo />} />
        <SectionMidle data={<NotificationsSectionMiddle />} />
        <Stream data={<NotificationsStream />} />
      </section>
      <aside>
        <Search />
        <Trends />
        <Follow />
        <Footer />
      </aside>
    </div>
  );
};

export default Notifications;
