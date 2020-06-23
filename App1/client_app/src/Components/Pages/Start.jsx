import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import StartMiddle from "../subComponents/StartComponents/StartMiddle";

import Search from "../mainComponents/mainAside/Search";
import Trends from "../mainComponents/mainAside/Trends";
import Footer from "../mainComponents/mainAside/Footer";

import HomeLogo from "../assets/HomeLogo";
import "../../Styles/Home.css";

const Start = () => {
    return (
        <div className="main-container home">
            <section>
                <SectionHeader heading="Welcome!" logo={<HomeLogo />} />
                <SectionMiddle data={<StartMiddle />} />
            </section>
        </div>
    );
};

export default Start;