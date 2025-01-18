import React from "react";

export default function CartPlusMinusBtn({ count, id, changeCount }) {
    const handleIncrease = () => {
        changeCount(id, count + 1); // زيادة الكمية
    };

    const handleDecrease = () => {
        if (count > 1) {
            changeCount(id, count - 1); // تقليل الكمية
        }
    };

    return (
        <div className="plus-minus-btn">
            <button onClick={handleDecrease} disabled={count <= 1}>
                -
            </button>
            <span>{count}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
}