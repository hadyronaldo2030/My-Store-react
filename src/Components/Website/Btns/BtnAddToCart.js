import React, { useState } from "react";
import { Axios } from "../../../API/axios";
import AlertMessage from "../../AlertMessage/AlertMessage";

export default function BtnAddToCart({ product, count, setIsChange }) {
    const [alert, setAlert] = useState({ type: "", message: "" });

    const handleSaveToCart = async () => {
        try {
            setAlert({ type: "", message: "" });

            // إعداد البيانات للإرسال
            const payload = {
                product_id: product.id,
                count, // استخدام الكمية الممررة
            };

            // إرسال الطلب لإضافة المنتج إلى السلة
            const response = await Axios.post("/cart", payload);

            if (response.status === 200 || response.status === 201) {
                setAlert({ type: "success", message: "تمت إضافة المنتج إلى السلة بنجاح!" });

                // تحديث حالة السلة بدون الحاجة إلى تحديث الصفحة
                setIsChange((prev) => !prev); // ستتم إعادة جلب السلة بشكل ديناميكي
            } else {
                setAlert({ type: "warning", message: "حدث خطأ. الرجاء المحاولة مرة أخرى." });
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setAlert({ type: "error", message: "نفذت الكمية من هذا المنتج." });
            } else {
                setAlert({ type: "error", message: "حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا." });
            }
        }
    };

    return (
        <div>
            <AlertMessage type={alert.type} message={alert.message} />
            <button className="add_to_cart" onClick={handleSaveToCart}>
                <i className="fa-thin fa-cart-plus"></i>
                <span className="mx-2">Add to Cart</span>
            </button>
        </div>
    );
}
