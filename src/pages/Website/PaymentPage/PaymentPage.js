import React, { useState } from "react";
import { Axios } from "../../../API/axios";

export default function PayPalPayment() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handlePayment = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await Axios.get("/paypal/payment");

            if (response.data.success) {
                setMessage("Payment failed: " + response.data.message);
            } else {
                setMessage("Redirecting to PayPal...");
                const paypalUrl = response.data.redirect_url;

                // فتح نافذة منبثقة لإتمام الدفع
                const popup = window.open(
                    paypalUrl,
                    "PayPal Payment",
                    "width=800,height=600,scrollbars=yes,resizable=yes"
                );

                if (!popup || popup.closed || typeof popup.closed === "undefined") {
                    alert("Popup blocked! Please allow popups for this website.");
                    return;
                }

                // مراقبة إغلاق النافذة المنبثقة
                const checkPopupClosed = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(checkPopupClosed);

                        // تحقق من الإكمال واسترداد رابط النجاح
                        const successUrl = "http://127.0.0.1:8000/api/paypal/payment/success";
                        const queryParams = new URLSearchParams({
                            token: "EC-3BY19530KU577074V",
                            PayerID: "V4E7LQ5E8N25J",
                        });

                        const redirectUrl = `${successUrl}?${queryParams.toString()}`;
                        window.location.href = redirectUrl;
                    }
                }, 500);
            }
        } catch (error) {
            setMessage("An error occurred: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>PayPal Payment</h2>
            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {message && <p style={{ marginTop: "20px", color: "#555" }}>{message}</p>}
        </div>
    );
}
