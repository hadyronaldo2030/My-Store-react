import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { Axios } from "../../../../../API/axios";
import { Pro } from "../../../../../API/Api";

export default function Wishlist({ isVisible, onClose }) {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch wishlist items
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await Axios.get("/wishlist");
                setWishlist(response.data);
            } catch (error) {
                console.error("Error fetching wishlist items", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    // Delete product from wishlist
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this product from your wishlist?")) return;

        try {
            await Axios.delete(`/wishlist/${id}`);
            setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting wishlist item", error);
        }
    };

    // Move product to cart
    const handleMoveToCart = async (id) => {
        try {
            await Axios.post(`/wishlist/move-to-cart/${id}`);
            setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
            alert("Product moved to cart successfully");
        } catch (error) {
            console.error("Error moving product to cart", error);
        }
    };

    // Render each product
    const productShow = wishlist.map((item, key) => {
        const product = item.products;
        const productImage = item.images.length > 0 ? item.images[0].image : "/default-image.jpg";
    
        return (
            <div className="cart_item" key={key}>
                <div
                    onClick={() => handleDelete(item.id)}
                    className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white"
                    style={{ width: "20px", height: "20px", cursor: "pointer", background: "var(--dark-light)", borderRadius: "3px" }}
                >
                    <FontAwesomeIcon width="10px" icon={faXmark} />
                </div>
                <NavLink to={`${Pro}/${product.id}`} className="product_img">
                    <img
                        src={productImage} // استخدام الصورة من الـ API أو الافتراضية
                        height={"80px"}
                        style={{ objectFit: "cover" }}
                        alt={product.title || "Product Image"}
                    />
                </NavLink>
                <div className="cart_details">
                    <h6 className="m-0">{product.title}</h6>
                    <div className="price_discount gap-2">
                        {product.discount ? <p className="old-price">{`${product.discount}$`}</p> : null}
                        <span className="new_price">${product.price || "0.00"}</span>
                    </div>
                    <button
                        onClick={() => handleMoveToCart(item.id)}
                        className="btn btn-sm btn-primary mt-2"
                    >
                        Move to Cart
                    </button>
                </div>
            </div>
        );
    });
    

    return (
        <div className={`cart-container ${isVisible ? "visible" : ""}`}>
            <div className="flex-1 h-100 overflow-y-auto">
                <div className="header_cart">
                    <h2>
                        My Wishlist <span>({wishlist.length})</span>
                    </h2>
                    <button className="close-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                {isLoading ? (
                    <h5>Loading...</h5>
                ) : wishlist.length === 0 ? (
                    <h5>No products in wishlist</h5>
                ) : (
                    productShow
                )}
            </div>
            <Link to={"/shop"} className="categories bg-orange w-100 position-absolute bottom-0 end-0 mb-1 fw-bold">
                Explore More Products
            </Link>
        </div>
    );
}
