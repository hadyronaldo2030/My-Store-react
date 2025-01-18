import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import DarkMode from './Option/DarkMode';
import NotificationsPage from './Option/Notification';
import Cart from './Option/Cart';
import Sidebar from "./Option/Sidebar/Sidebar";
import Wishlist from "./Option/Wishlist/Wishlist";
import { UserProvider } from "../../../Context/UserContext";

export default function CenterNav() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showWishList, setShowWishList] = useState(false);
    const [wishListItems, setWishListItems] = useState([]);

    const notificationButtonRef = useRef(null);

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('product')) || [];
        if (storedCartItems.length > 0) {
            setCartItems(storedCartItems);
        }
    }, []);

    // Sync cart items with localStorage when updated
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('product', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Load wishlist items from localStorage on mount
    useEffect(() => {
        const storedWishListItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (storedWishListItems.length > 0) {
            setWishListItems(storedWishListItems);
        }
    }, []);

    // Sync wishlist items with localStorage when updated
    useEffect(() => {
        if (wishListItems.length > 0) {
            localStorage.setItem('wishlist', JSON.stringify(wishListItems));
        }
    }, [wishListItems]);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };

    const toggleWishList = () => {
        setShowWishList((prev) => !prev);
    };

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

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

    return (
        <div className="container">
            <div className="center_nav">
                <Link to={"/"}>
                    <span className="logo text-orange">My Store</span>
                </Link>
                <ul className="content d-none d-lg-flex">
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/shop"}>Shop</NavLink></li>
                    <li><NavLink to={"/about-us"}>About Us</NavLink></li>
                    <li><NavLink to={"/contact-us"}>Contact US</NavLink></li>
                    <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                </ul>
                <div className="icons d-flex">
                    {/* Cart */}
                    <button className='d-none d-lg-flex' onClick={toggleCart}>
                        <span className='num'>{cartItems.length}</span>
                        <i className="fa-thin fa-bag-shopping"></i>
                    </button>

                    {/* WishList */}
                    <button className='d-none d-lg-flex' onClick={toggleWishList}>
                        <span className='num'>{wishListItems.length}</span>
                        <i className="fa-thin fa-heart"></i>
                    </button>

                    {/* Notifications */}
                    <button ref={notificationButtonRef} className='d-none d-lg-flex' onClick={toggleNotifications}>
                        <span className='num'>10</span>
                        <i className="fa-thin fa-bell"></i>
                    </button>

                    {/* Sidebar (Mobile) */}
                    <button className='d-lg-none d-md-flex' onClick={toggleSidebar}>
                        <i className="fa-thin fa-bars-staggered" style={{ color: '#eee' }}></i>
                    </button>

                    <span className="d-none d-lg-flex">
                        <DarkMode />
                    </span>
                </div>

                {/* Cart Component */}
                <Cart
                    isVisible={showCart}
                    items={cartItems}
                    setCartItems={setCartItems}
                    onClose={toggleCart}
                />

                {/* WishList Component */}
                <Wishlist
                    isVisible={showWishList}
                    items={wishListItems}
                    setWishListItems={setWishListItems}
                    onClose={toggleWishList}
                />

                {/* Sidebar Component */}
                <UserProvider>
                    <Sidebar
                        isVisible={showSidebar}
                        onClose={toggleSidebar}
                    />
                </UserProvider>

                {/* Notifications Component */}
                <NotificationsPage isVisible={showNotifications} />
            </div>
        </div>
    );
}
