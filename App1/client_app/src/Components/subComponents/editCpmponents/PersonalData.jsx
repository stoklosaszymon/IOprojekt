import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

const PersonalData = () => {

    const user = useSelector(state => state.loggedUser);
    const [firstName, setfirstName] = useState(`${user.firstName}`);
    const [lastName, setlastName] = useState(`${user.lastName}`);
    const [email, setemail] = useState(`${user.email}`);
    const [gender, setGender] = useState({gender: "" });
    const [locale, setlocale] = useState(`${user.locale}`);


    const save = () => {

    };

    return (
        <div className="updateFirstName-Container">
            <div>
                <strong className="firstName">First Name: </strong>
                <input className="writeFirstName"
                    type="text"
                    value={firstName}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setfirstName(ev.target.value) }}
                />
            </div>
            <div>
                <strong className="lastName">Last Name: </strong>
                <input
                    className="writelastName"
                    type="text"
                    value={lastName}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setlastName(ev.target.value) }}
                />
            </div>
            <div>
                <strong className="email">Email: </strong>
                <input className="writeemail"
                    type="text"
                    value={email}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setemail(ev.target.value) }}
                />
            </div>
            <div onChange={(event) => setGender({ ...gender, gender: event.target.value })}>
                <strong className="gender">Gender: </strong>
                <p className="mGender">
                <input 
                    type="radio"
                    name="gender"
                    value="M"/>
                Male </p>
                <p className="kGender">
                    <input
                    type="radio"
                    name="gender"
                    value="K"/>
                    Female </p>
                </div>
            <div>
                <strong className="locale">Locale: </strong>
                <input className="writelocale"
                    type="text"
                    value={locale}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setlocale(ev.target.value) }}
                />
            </div>
            <button className="save btn btn-small btn-solid" onClick={(e) => save()}>Save</button>
            <NavLink to={`/${user.nickname}`}>
                <button className="cancel btn btn-small btn-solid">Cancel</button>
            </NavLink>
        </div>
    );
};
export default PersonalData;

