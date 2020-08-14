import React, { useState } from 'react';
import PersonalData from "../../subComponents/editCpmponents/PersonalData"
import EditBackground from "../../subComponents/editCpmponents/EditBackground"
import EditAvatar from "../../subComponents/editCpmponents/EditAvatar"
const ProfileSetting = () => {

    const [Check, setCheck] = useState("");

    return (
        <div className="edit-profile-container">
            <section className="section">
                <div className="display-list">
                    <div className="point" key="avatar" onClick={(e) => setCheck('avatar')} > Edit profile picture</div>
                    <div className="point" key="background" onClick={(e) => setCheck('background')}> Edit background picture</div>
                    <div className="point" key="data" onClick={(e) => setCheck('data')}> edit personal details</div>
                </div>
            </section>
            <aside className="asaid">
                {(() => {
                    switch (Check) {
                    case "avatar":
                        return <EditAvatar firstName="avatar" />;
                    case "background":
                        return <EditBackground firstName="background" />;
                    case "data":
                        return <PersonalData firstName="data" />;
                    default:
                        return <h1>What your soul desires </h1>;
                    }
                })()}
            </aside>
        </div>
    );
};

export default ProfileSetting;
