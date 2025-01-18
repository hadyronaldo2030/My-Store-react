import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Axios } from "../../../../API/axios";
import CartPlusMinusBtn from "../../Btns/CartPlusMinusBtn";

export default function Cart({ isVisible, onClose, setIsChange }) {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // دالة لتحديث الكمية وإرسالها للخادم
    const changeQuantity = async (id, newCount) => {
        try {
            // تحديث الكمية في واجهة المستخدم
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === id ? { ...item, count: newCount } : item
                )
            );

            // إرسال الطلب إلى الخادم لتحديث الكمية
            await Axios.patch(`/cart/${id}/count`, {
                count: newCount,
                operation: newCount > 0 ? "increase" : "decrease", // يمكن تعديل الحقل بناءً على متطلبات الخادم
            });

            console.log(`Quantity updated for item ${id}: ${newCount}`);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // جلب بيانات السلة
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await Axios.get("/cart");
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, []);

    // حذف المنتج من السلة
    const handleDelete = async (id) => {
        try {
            await Axios.delete(`/cart/${id}`);
            setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    };

    // عرض المنتجات
    const productShow = cart?.map((item, key) => {
        const product = item?.products || {};
        const productImage = product?.images?.[0]?.image || "/default-image.jpg";

        return (
            <div className="cart_item" key={key}>
                <div
                    onClick={() => handleDelete(item.id)}
                    className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white"
                    style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        background: "var(--dark-light)",
                        borderRadius: "3px",
                    }}
                >
                    <FontAwesomeIcon width="10px" icon={faXmark} />
                </div>
                <Link to={`/product/${product.id}`} className="product_img">
                    <img
                        src={productImage}
                        height={"80px"}
                        style={{ objectFit: "cover" }}
                        alt={product.title || "Product Image"}
                    />
                </Link>
                <div className="cart_details">
                    <h6 className="m-0">{product.title || "Unnamed Product"}</h6>
                    <div className="price_discount gap-2">
                        {product.discount ? <p className="old-price">{`${product.discount}$`}</p> : null}
                        <span className="new_price">${product.price || "0.00"}</span>
                    </div>
                    <CartPlusMinusBtn
                        count={item.count || 1}
                        id={item.id}
                        changeCount={changeQuantity}
                    />
                </div>
            </div>
        );
    });

    return (
        <div className={`cart-container ${isVisible ? "visible" : ""}`}>
            <div className="flex-1 h-100 overflow-y-auto">
                <div className="header_cart">
                    <h2>
                        My Cart <span>({cart.length})</span>
                    </h2>
                    <button className="close-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                {isLoading ? (
                    <h5>Loading...</h5>
                ) : cart.length === 0 ? (
                    <h5>No products in cart</h5>
                ) : (
                    productShow
                )}
            </div>
            <Link
                to={"/checkout"}
                className="categories bg-orange w-100 position-absolute bottom-0 end-0 mb-1 fw-bold"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
}
