import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PersonalData = () => {

    const user = useSelector(state => state.loggedUser);
    const [firstName, setfirstName] = useState(`${user.firstName}`);
    const [lastName, setlastName] = useState(`${user.lastName}`);
    const [email, setemail] = useState(`${user.email}`);
    const [gender, setgender] = useState('');
    const [locale, setlocale] = useState(`${user.locale}`);

    return (
        <div className="updateFirstName-Container">
            <div>
                <strong>First Name</strong>
                <input
                    type="text"
                    value={firstName}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setfirstName(ev.target.value) }}
                />
            </div>
            <div>
                <strong>Last Name</strong>
                <input
                    type="text"
                    value={lastName}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setlastName(ev.target.value) }}
                />
            </div>
            <div>
                <strong>Email</strong>
                <input
                    type="text"
                    value={email}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setemail(ev.target.value) }}
                />
            </div>
            <div>
                <strong>Gender</strong>
                <input
                    type="radio"
                    id="genderM"
                    name="gender"
                    value="M"
                />
                <label for="genderM">M</label>
                <input
                    type="radio"
                    id="genderK"
                    name="gender"
                    value="K"
                />
                <label for="genderK">K</label>
            </div>
            <div>
                <strong>Locale</strong>
                <input
                    type="text"
                    value={locale}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => { setlocale(ev.target.value) }}
                />
            </div>
            <button>Save</button>
            <button>Cancel</button>
        </div>
    );
};
export default PersonalData;

