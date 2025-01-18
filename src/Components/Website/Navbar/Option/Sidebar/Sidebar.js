import React, { useState, useEffect, useRef } from "react";
import './Sidebar.css';
import Cart from "../Cart";
import NotificationsPage from "../Notification";
import DarkMode from "../DarkMode";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../../../../API/Api";
import Cookie from 'cookie-universal';

// images
import userImg from '../../../../../Asstes/Images/icons/user.png';
import { links } from "./NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserProvider, useUser } from "../../../../../Context/UserContext";
import { Axios } from "../../../../../API/axios";

export default function Sidebar({ isVisible, onClose }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const notificationButtonRef = useRef(null);
    const { user, loading, error } = useUser(); // Using the UserContext to get user data
    const cookie = Cookie();
    const navigate = useNavigate();

    // Load cart items from localStorage
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('product')) || [];
        if (storedCartItems.length > 0) {
            setCartItems(storedCartItems);
        }
    }, []);

    // Update localStorage when cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('product', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Toggle notifications visibility
    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    // Toggle cart visibility
    const toggleCart = () => {
        setShowCart(prev => !prev);
    };

    // Handle clicks outside the notification area
    const handleClickOutside = (event) => {
        if (notificationButtonRef.current && !notificationButtonRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Logout function
    async function handleLogout() {
        try {
            await Axios.get(`/${LOGOUT}`);
            cookie.remove("e-commerce");
            window.location.pathname = "/login";
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    // Handle loading or error states
    if (loading) {
        return <div>Loading...</div>;  // Show loading spinner or message
    }

    if (error) {
        navigate("/login", { replace: true });
        return null;  // Prevent rendering the rest of the component if there's an error
    }

    return (
        <aside className={`side-container ${isVisible ? 'visible' : ''}`}>
            <div className="flex-1 h-100 overflow-y-auto position-relative">
                {/* Header sidebar */}
                <div className="header_side">
                    <div className="icons d-flex">
                        <DarkMode />
                        <button className='icon-fs-xl' onClick={toggleCart}>
                            <span className='num'>{cartItems.length}</span>
                            <i className="fa-thin fa-bag-shopping"></i>
                        </button>
                        <button className='icon-fs-xl'>
                            <span className='num'>7</span>
                            <i className="fa-thin fa-heart"></i>
                        </button>
                        <button ref={notificationButtonRef} className='icon-fs-xl' onClick={toggleNotifications}>
                            <span className='num'>10</span>
                            <i className="fa-thin fa-bell"></i>
                        </button>
                    </div>
                    <button className="icon-fs-xl" onClick={onClose}>
                        <i className="fa-thin fa-bars-sort"></i>
                    </button>
                </div>
                <Cart
                    isVisible={showCart}
                    items={cartItems}
                    setCartItems={setCartItems}
                    onClose={toggleCart}
                />
                <NotificationsPage isVisible={showNotifications} />
                {/* Content List */}
                <ul className="metismenu list-unstyled" id="side-menu">
                    {links.map((link, key) =>
                        link.role.includes(user.role) && (
                            <li className="w-100 d-block" key={link.id}> {/* Using a unique key */}
                                <NavLink to={link.to}>
                                    <FontAwesomeIcon icon={link.icon} />
                                    <span className="mx-3" data-key="t-sales" style={{ display: 'block' }} >
                                        {link.name}
                                    </span>
                                </NavLink>
                            </li>
                        )
                    )}
                </ul>
                {/* Footer sidebar */}
                <div className="footer_container">
                    <UserProvider>
                        <div className="footer_side">
                            {loading ? (
                                <i className="fa fa-spinner fa-spin text-white"></i>
                            ) : (
                                <Link to={'/'} className="username d-flex">
                                    <img src={userImg} alt="userImg" />
                                    <div className="name_email mx-3">
                                        <h4>{user.name}</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </Link>
                            )}
                            <button className="logout" onClick={handleLogout}>
                                <i className="fa-duotone fa-solid fa-left-from-bracket"></i>
                            </button>
                        </div>
                    </UserProvider>
                </div>
            </div>
        </aside>
    );
}
