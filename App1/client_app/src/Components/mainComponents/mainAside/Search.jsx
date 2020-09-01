import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Search = () => {

    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);

     useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{ 
                          users {
                               getAll {
                                id firstName lastName picture nickname 
                            }
                          }
                         }`
            })
        })
            .then(res => res.json())
            .then(res => {
                setUsers(res.users.getAll);
            })
     }, []);

    let filterData = (event) => {
        if ( event.target.value.length > 0)
            setFiltered(users.filter(u => new RegExp(`${event.target.value}`).test(u.firstName)))
        else
            setFiltered([])

        event.preventDefault();
    }

    return (
        <div className="search-container">
      <div className="search">
                <input type="text" name="search" placeholder="Search Twitter" onChange={filterData}/>
                {
                    filtered.map(user =>
                        <div key={user.id}>
                         <NavLink to={`/${user.nickname}`}>{`${user.firstName} ${user.lastName}`} </NavLink> 
                       </div>
                )}
      </div>
    </div>
  );
};
export default Search;
