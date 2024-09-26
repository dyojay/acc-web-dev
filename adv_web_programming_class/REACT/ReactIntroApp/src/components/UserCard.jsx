import React from 'react';


const UserCard = ({name, age}) => {
    
     return (
        <div style={{border:'3px solid', padding: '10px', marginBottom: '10px'}} >
            <h2> {name}</h2>
            <p>{age}</p>
        </div>
     );
  };
export default UserCard;