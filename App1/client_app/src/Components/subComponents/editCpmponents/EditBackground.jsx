import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import Banner from "../../mainComponents/PostComponents/Banner"

const EditBackground = () => {
    const user = useSelector(state => state.loggedUser);
    const [picture, setPicture] = useState('/static/media/404-bg-img.cb1865c2.jpg');

    const save = () => {
        //Api
        //fetch('../graphql',
        //        {
        //            method: 'POST',
        //            headers: {
        //                'Content-Type': 'application/json'
        //            },
        //            body: JSON.stringify({
        //                query: `
        //            ... {
        //              ...{
        //                updateUserBanner(user: {id:"${user.id}",banner:"${picture}"} ){
        //                banner
        //                 }
        //              }
        //            }`
        //            }),
        //        })
        //    .then(res => res.json())
        //    .then(res => console.log(res));
    } 

    const load = (e) => {
        const image = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => { setPicture(reader.result) };
        reader.readAsDataURL(image);
    }

    return (
        <div className="updateBanner-Container">
            <Banner picture={picture} />
            <strong className="Opis"> Optimal avatar size: 600x200 </strong>
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

