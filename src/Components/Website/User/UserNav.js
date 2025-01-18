import React from 'react';
import { Link } from 'react-router-dom';
import userImg from '../../../Asstes/Images/icons/user.png';

const UserInfo = ({ user }) => {
    return (
        <Link to={'/'} className="username d-flex">
            <img src={userImg} alt="userImg" />
            <div className="name_email mx-3">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
        </Link>
    );
};

export default UserInfo;
