import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Products.css";

export default function ProductsLandscape(props) {
    // هذه الراوند تقوم بحل مشكله اختفاء بعض النجوم
    const roundStars = Math.round(props.rating);
    const stars = roundStars;

    const showGoldStars = Array.from({ length: stars }).map((_, index) => (
        <i key={index} className="fa-solid fa-star" style={{ color: '#FFB800' }}></i>
    ));
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
        <i key={index} className="fa-regular fa-star" style={{ color: '#919191' }}></i>
    ));

    return (

        <div className="card_products_Landscape">
            <NavLink to={`/product/${props.id}`} className="card_img">
                <img src={props.img} alt="offer" />
            </NavLink>
            <NavLink to={`/product/${props.id}`} className="card_details">
                <div className="title_card" >
                    <p className='mb-0'>
                        {props.title.length > 22 ? `${props.title.slice(0, 22)}...` : props.title}
                    </p>
                </div>
                <div className="rating">
                    {showGoldStars}
                    {showEmptyStars}
                </div>
                <div className="price_discount">
                    <p className="mb-0 new-price">
                        {props.price}$
                    </p>
                    <span className='mx-1'></span>
                    <p className="mb-0 old-price">
                        {props.oldPrice}$
                    </p>
                </div>
                <div className="button_card">
                    <button className="add_to_cart" >
                        <i className="fa-thin fa-cart-plus"></i>
                        <span className="mx-2">Add To Cart</span>
                    </button>
                    <button className="add_to_wishlist">
                        <i className="fa-thin fa-heart"></i>
                    </button>
                </div>
            </NavLink>
        </div>
    );
}