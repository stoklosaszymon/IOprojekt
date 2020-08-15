import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import MainAvatar from "../../mainComponents/PostComponents/MainAvatar"

const EditAvatar = () => {
    const user = useSelector(state => state.loggedUser);
    const [inputValue, setInputValue] = useState("");
    const [picture, setPicture] = useState(user.picture);

    const save = () => {
        // Api dla zmiany obrazka w bazie 
    }

    const load =() => {
        //funcja ladowania obrazka
    }

    return (
        <div className="updateAvatar-Container">
            <MainAvatar picture={picture} />
            <strong className="Opis"> Optimal avatar size: 132x132 </strong>
            <button className="Load btn btn-small btn-solid" onClick={(e) => load()}> Load an avatar </button>
            <button className="save btn btn-small btn-solid" onClick={(e) => save()}>Save</button>
            <NavLink to={`/${user.nickname}`}>
                <button className="cancel btn btn-small btn-solid">Cancel</button>
            </NavLink>
        </div>
    );
};
export default EditAvatar;


