import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import Banner from "../../mainComponents/PostComponents/Banner"

const EditBackground = () => {
    const user = useSelector(state => state.loggedUser);
    const [picture, setPicture] = useState('/static/media/404-bg-img.cb1865c2.jpg');

    const save = () => {}

    const load = () => {}

    return (
        <div className="updateBanner-Container">
            <Banner picture={picture} />
            <strong className="Opis"> Optimal avatar size: 132x132 </strong>
            <label className="load  btn btn-small btn-solid " id="image_uploads">Choose images to upload</label>
            <input className="loadInput"
                   type="file"
                   id="image_uploads"
                   name="image_uploads"
                   onChange={load}
                   accept="image/png, image/jpeg, image/jpg"
            />
            <button className="save btn btn-small btn-solid" onClick={(e) => save()}>Save</button>
            <NavLink to={`/${user.nickname}`}>
                <button className="cancel btn btn-small btn-solid">Cancel</button>
            </NavLink>
        </div>
    );
};
export default EditBackground;

