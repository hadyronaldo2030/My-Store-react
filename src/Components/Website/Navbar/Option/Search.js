import React, { useEffect, useState } from "react";
import { CAT } from "../../../../API/Api";
import { Axios } from "../../../../API/axios";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/${CAT}`).then((res) => setCategories(res.data));
    }, []);

    const handleSearch = () => {
        // تأكد من وجود إما مصطلح بحث أو قسم محدد
        if (searchTerm.trim() || selectedCategory) {
            const searchQuery = `/search-results?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`;
            navigate(searchQuery); // الانتقال إلى صفحة نتائج البحث
        }
    };

    return (
        <div className="search">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.title}>
                        {category.title}
                    </option>
                ))}
            </select>
            <input
                type="search"
                placeholder="Search Product.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn text-light" onClick={handleSearch}>
                <i className="fa-sharp fa-thin fa-magnifying-glass"></i>
            </button>
        </div>
    );
}
