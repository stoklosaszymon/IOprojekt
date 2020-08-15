import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

const PersonalData = () => {

    const user = useSelector(state => state.loggedUser);
    const [updateUser, setUpdateUser] = useState({ firstName: `${user.firstName}`, lastName: `${user.lastName}`, email: `${user.email}`, gender: `${user.gender}` , locale: `${user.locale}` });
    
    const save = () => {

        console.log([updateUser]);
        fetch('../graphql',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `
                    mutation {
                      users{
                        updateUser(user: {id:"${user.id}", firstName:"${updateUser.firstName}", lastName:"${updateUser.lastName}", gender:"${updateUser.gender}", locale:"${updateUser.locale}"} ){
                        firstName,lastName,gender,locale
                         }
                      }
                    }`
                    }),
                })
            .then(res => res.json())
            .then(res => console.log(res));
    }


    return (
        <div className="updateFirstName-Container">
            <div>
                <strong className="firstName">First Name: </strong>
                <input className="writeFirstName"
                    type="text"
                    value={updateUser.firstName}
                    onChange={(event) => setUpdateUser({ ...updateUser, firstName: event.target.value })}
                />
            </div>
            <div>
                <strong className="lastName">Last Name: </strong>
                <input
                    className="writelastName"
                    type="text"
                    value={updateUser.lastName}
                    onChange={(event) => setUpdateUser({ ...updateUser, lastName: event.target.value })}
                />
            </div>
            <div>
                <strong className="email">Email: </strong>
                <input className="writeemail"
                    type="text"
                    value={updateUser.email}
                    onChange={(event) => setUpdateUser({ ...updateUser, email: event.target.value })}
                />
            </div>
            <div onChange={(event) => setUpdateUser({ ...updateUser, gender: event.target.value })}>
                <strong className="gender">Gender: </strong>
                <p className="mGender">
                    <input
                        type="radio"
                        name="gender"
                        checked={updateUser.gender === "M"}
                        value="M" />
                    Male
                </p>
                <p className="kGender">
                    <input
                        type="radio"
                        name="gender"
                        checked={updateUser.gender === "K"}
                        value="K" />
                    Female
                </p>
            </div>
            <div>
                <strong className="locale">Locale: </strong>
                <input className="writelocale"
                    type="text"
                    value={updateUser.locale}
                    onChange={(event) => setUpdateUser({ ...updateUser, locale: event.target.value })}
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

