import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Axios } from "../../../API/axios";
import "../../../Components/Website/CardProduct/Products.css";

export default function SearchResults() {
    const [products, setProducts] = useState([]);
    const [isGridView, setIsGridView] = useState(
        () => JSON.parse(localStorage.getItem("isGridView")) ?? true
    );
    const location = useLocation();

    // استخراج مصطلح البحث والفئة من رابط URL
    const query = new URLSearchParams(location.search).get("query");
    const category = new URLSearchParams(location.search).get("category");

    useEffect(() => {
        // جلب المنتجات من قاعدة البيانات
        Axios.get(`/products`).then((res) => {
            const filteredProducts = res.data.filter((product) => {
                // التحقق من مطابقة مصطلح البحث
                const isQueryMatch = query
                    ? product.title.toLowerCase().includes(query.toLowerCase())
                    : true;

                // التحقق من مطابقة الفئة، مع التحقق من أن `product.category` نص
                const isCategoryMatch = category
                    ? (product.category && typeof product.category === "string" && product.category.toLowerCase() === category.toLowerCase())
                    : true;

                return isQueryMatch && isCategoryMatch;
            });

            setProducts(filteredProducts);
        });
    }, [query, category]);

    const toggleView = () => {
        setIsGridView((prev) => {
            const newView = !prev;
            localStorage.setItem("isGridView", JSON.stringify(newView));
            return newView;
        });
    };

    return (
        <div className="container my-3">
            <div className="section_cards search_result">
                <div className='title_section my-2 d-flex align-items-center justify-content-between'>
                    <h3>
                        <span>Search Results for: </span> "{query}" in "{category || 'All Categories'}"
                    </h3>
                    <button onClick={toggleView} className="btn-toggle-view">
                        {isGridView ? (
                            <i className="fa-solid fa-bars-progress"></i>
                        ) : (
                            <i className="fa-solid fa-grid-2"></i>
                        )}
                    </button>
                </div>
                {products.length > 0 ? (
                    <div className={`product-list row gap-3 m-0 ${isGridView ? "grid-view" : "list-view"}`}>
                        {products.map((product) => {
                            const discount = product.discount
                                ? Math.round(((product.discount - product.price) / product.discount) * 100)
                                : 0;

                            const stars = Math.round(product.rating || 0);
                            const showGoldStars = Array.from({ length: stars }).map((_, index) => (
                                <i key={index} className="fa-solid fa-star" style={{ color: '#FFB800' }}></i>
                            ));
                            const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
                                <i key={index} className="fa-regular fa-star" style={{ color: '#919191' }}></i>
                            ));

                            return (
                                <div key={product.id} className={isGridView ? "card_products col" : "card_products_Landscape col"}>
                                    <NavLink to={`/product/${product.id}`} className="card_img">
                                        <img src={product.images[0].image} alt={product.title} />
                                    </NavLink>
                                    <div className="d-flex flex-column w-100">
                                        <NavLink to={`/product/${product.id}`} className="card_details">
                                            {product.discount && (
                                                <div className="offers_sale">
                                                    {discount}%
                                                    <span></span>
                                                </div>
                                            )}
                                            <div className="title_card">
                                                <p className='mb-0'>
                                                    {product.title.length > 22 ? `${product.title.slice(0, 22)}...` : product.title}
                                                </p>
                                            </div>
                                            <div className="rating">
                                                {showGoldStars}
                                                {showEmptyStars}
                                            </div>
                                            <div className="price_discount">
                                                {product.discount && (
                                                    <p className="mb-0 old-price">
                                                        ${product.discount}
                                                    </p>
                                                )}
                                                <span className='mx-1'></span>
                                                <p className="mb-0 new-price">
                                                    ${product.price}
                                                </p>
                                            </div>
                                        </NavLink>
                                        <div className='card_details'>
                                            <div className="button_card">
                                                <button className="add_to_cart" style={{ minWidth: '130px' }}>
                                                    <i className="fa-thin fa-cart-plus"></i>
                                                    <span className="mx-2">Add To Cart</span>
                                                </button>
                                                <button className="add_to_wishlist">
                                                    <i className="fa-thin fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}
