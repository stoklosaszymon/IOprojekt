import React, { useState, useEffect } from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import Search from "../mainComponents/mainAside/Search";
import Follow from "../mainComponents/mainAside/Follow";
import Trends from "../mainComponents/mainAside/Trends";
import Footer from "../mainComponents/mainAside/Footer";
import BackButton from "../assets/BackButton";
import ProfileSectionMiddle from "../subComponents/profileComponents/ProfileSectionMiddle";
import ProfileStream from "../subComponents/profileComponents/ProfileStream";
import "../../Styles/Profile.css";
import { useParams } from "react-router-dom";

const Profile = () => {
    let { userName } = useParams();
    const [user, setUser] = useState({id: '', email: '', nickname: ''});

    useEffect(() => {
            fetch('graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: `{ users { getByNickname(nickname: "${userName}") { id, nickname, email }}}` }),
            })
                .then(res => res.json())
                .then(res => setUser(res.users.getByNickname))
                .then(res => console.log(user))
    }, [user.nickname]);

    return (
    <div className="main-container profile">
          <section>
        <SectionHeader
          heading={user.nickname}
          subText="0 Tweets"
          logo={<BackButton />}
        />
           <SectionMiddle data={<ProfileSectionMiddle username={user.nickname}/>} />
           <Stream data={<ProfileStream />} />
      </section>
      <aside>
        <Search />
        <Follow />
        <Trends />
        <Footer />
      </aside>
    </div>
  );
};

export default Profile;
