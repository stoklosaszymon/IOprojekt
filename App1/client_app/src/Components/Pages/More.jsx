import React, { useState } from 'react';
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import "../../Styles/More.css"
import Account from "../subComponents/moreComponents/Account"
import About from "../subComponents/moreComponents/About"
import Cookies from "../subComponents/moreComponents/Cookies"
import Privacy from "../subComponents/moreComponents/Privacy"
const More = () => {
    const [Check, setCheck] = useState("");

    return (
        <div className="main-container more">
            <section>
                <SectionHeader heading="More" />
                <div className="more-container">
                    <div className="display-list">
                        <div className="point" key="account" onClick={(e) => setCheck('account')} > Account information</div>
                        <div className="point" key="about" onClick={(e) => setCheck('about')} > About the project</div>
                        <div className="point" key="cookies" onClick={(e) => setCheck('cookies')}>Cookies</div>
                        <div className="point" key="privacy" onClick={(e) => setCheck('privacy')}> Privacy Policy</div>
                    </div>
                </div>
            </section>
            <aside className="asaid">
                {(() => {
                    switch (Check) {
                        case "account":
                            return <Account />;
                        case "about":
                            return <About />;
                        case "cookies":
                            return <Cookies />;
                        case "privacy":
                            return <Privacy />;
                        default:
                            return <div></div>;
                    }
                })()}
            </aside>
        </div>
    );
}
export default More;
