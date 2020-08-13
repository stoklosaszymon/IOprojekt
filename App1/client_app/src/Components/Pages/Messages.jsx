import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import MessageLogo from "../assets/MessageLogo";
import Search from "../mainComponents/mainAside/Search";
import Default from "../subComponents/messagesComponents/MessagesStream";
import "../../Styles/Messages.css";
import { useSelector } from 'react-redux'
import Message from "../subComponents/messagesComponents/Messages"

const Messages = () => {
    const user = useSelector(state => state.loggedUser);

    if (user.nickname === '') {
        return (
            <div className="main-container messages">
                <section>
                    <SectionHeader heading="Messages" />{/*logo={<MessageLogo/>}/>*/}
                    <SectionMiddle data={<Search/>}/>
                    {/*<Stream data={<Default />} />*/}
                    <p> Zaloguj sie i Rozmawiaj </p> 
                </section>
                <aside>
                </aside>
            </div>
        );
    } else {
        return (
            <div className="main-container messages">
                <Message />
            </div>
        );
    }
};
export default Messages;
