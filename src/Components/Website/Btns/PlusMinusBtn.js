import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PlusMinusBtn({ count, setCount }) {
    const handleDecrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleIncrease = () => {
        setCount(count + 1);
    };

    return (
        <div className="quantity input-group d-flex align-items-center gap-2">
            <button
                type="button"
                className="btn btn-number"
                onClick={handleDecrease}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
                type="number"
                className="form-control input-number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value || 1));
                    setCount(value);
                }}
            />
            <button
                type="button"
                className="btn btn-number"
                onClick={handleIncrease}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
