import React, { useEffect, useState } from "react";
import "./AlertMessage.css";

export default function AlertMessage({ type, message, duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true); // تظهر الرسالة
            const timer = setTimeout(() => {
                setIsVisible(false); // تختفي الرسالة بعد المدة المحددة
            }, duration);

            return () => clearTimeout(timer); // تنظيف المؤقت عند إزالة الرسالة
        }
    }, [message, duration]);

    if (!message) return null;

    const alertClass = `alert-message ${type} ${isVisible ? "show" : ""}`;

    return (
        <div className="container-message">
            <div className={alertClass}>
                <span>{message}</span>
            </div>
        </div>
    );
}
