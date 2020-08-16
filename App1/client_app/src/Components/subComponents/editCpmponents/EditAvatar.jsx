import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import MainAvatar from "../../mainComponents/PostComponents/MainAvatar"

const EditAvatar = () => {
    const user = useSelector(state => state.loggedUser);
    const [picture, setPicture] = useState(user.picture);

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
        //                updateUserPicture(user: {id:"${user.id}",picture:"${picture}"} ){
        //                picture
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
        reader.onloadend = () => { setPicture(reader.result)};
        reader.readAsDataURL(image);
    }

    return (
        <div className="updateAvatar-Container">
            <MainAvatar picture={picture} />
            <strong className="Opis"> Optimal avatar size: 132x132 </strong>
            <label className="load  btn btn-small btn-solid "for="image_uploads">Choose images to upload</label>
            <input className="loadInput"
                type="file"
                id="image_uploads"
                name= "image_uploads"
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
export default EditAvatar;


