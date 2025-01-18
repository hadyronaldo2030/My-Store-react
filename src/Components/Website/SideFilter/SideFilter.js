import React, { useState } from "react";
import "./SideFilter.css";
import FilterSideCategory from "./FilterSideCategory";

export default function SideFilter({
    setCategory,
    setPriceRange,
    setBrands,
    setShowDiscounts,
    setShowBestSeller,
    setReviews,
}) {
    const [currentPrice, setCurrentPrice] = useState(150);

    const handleCategoryChange = (category) => setCategory(category);

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setCurrentPrice(value);
        setPriceRange([150, value]);
    };

    const handleBrandChange = (brand, isChecked) => {
        setBrands((prev) =>
            isChecked ? [...prev, brand] : prev.filter((b) => b !== brand)
        );
    };

    return (
        <div className="filter-container my-3">
            {/* Clear all */}
            <div className="clear-all">
                <span>Filter</span>
                <button
                    onClick={() => {
                        setCategory(null);
                        setPriceRange([100, 100000]);
                        setBrands([]);
                        setShowDiscounts(false);
                        setShowBestSeller(false);
                        setReviews(null);
                        setCurrentPrice(100);
                    }}
                >
                    Clean All
                </button>
            </div>

            {/* Categories */}
            <FilterSideCategory />

            {/* Price */}
            <div className="filter-section price-slider">
                <h4>PRICE</h4>
                <input
                    className="range"
                    type="range"
                    min="100"
                    max="100000"
                    step="10"
                    value={currentPrice}
                    onChange={handlePriceChange}
                />
                <p>Price: $150 – ${currentPrice}</p>
            </div>

            {/* Brands */}
            <div className="filter-section">
                <h4>Brands</h4>
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search Brands ..."
                />
                <ul className="p-0">
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleBrandChange("FASHIONS", e.target.checked)}
                            />
                            FASHIONS
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleBrandChange("Boys", e.target.checked)}
                            />
                            Boys
                        </label>
                    </li>
                </ul>
            </div>

            {/* Display status */}
            <div className="filter-section">
                <h4>Display status</h4>
                <ul className="p-0">
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => setShowDiscounts(e.target.checked)}
                            />
                            Show discounts only
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => setShowBestSeller(e.target.checked)}
                            />
                            Show best seller
                        </label>
                    </li>
                </ul>
            </div>

            {/* Reviews */}
            <div className="filter-section">
                <h4>Product Reviews</h4>
                <ul className="p-0">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <li key={stars}>
                            <label>
                                <input
                                    type="radio"
                                    name="reviews"
                                    onChange={() => setReviews(stars)}
                                />
                                {/* stars solid */}
                                {Array.from({ length: stars }).map((_, index) => (
                                    <i
                                        key={`full-${index}`}
                                        className="fa-solid fa-star"
                                        style={{ color: "#FFB800" }}
                                    ></i>
                                ))}
                                {/* stars regular */}
                                {Array.from({ length: 5 - stars }).map((_, index) => (
                                    <i
                                        key={`empty-${index}`}
                                        className="fa-regular fa-star"
                                        style={{ color: "#919191" }}
                                    ></i>
                                ))}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}
