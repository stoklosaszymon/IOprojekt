import React, { useState, useEffect } from 'react';

const EditAvatar = ({ firstName }) => {

    const [inputValue, setInputValue] = useState("");
   
    //const input = document.querySelector('input');
    //const log = document.getElementById('log');

    //input.addEventListener('change', updateValue);

    //function updateValue(e) {
    //    log.textContent = e.target.value;
    //}

    return (
        <div className="updateFirstName-Container">
            <strong className="FirstName">{firstName}</strong>
            <input
                type="text"
                value={inputValue}
                onChange={(
                    ev: React.ChangeEvent<HTMLInputElement>,
                ): void => {setInputValue(ev.target.value)}}
            />
            <p>{inputValue}</p>
        </div>
    );
};
export default EditAvatar;


