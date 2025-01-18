// src/hooks/GetCategories.js

import { useState, useEffect } from "react";
import { Axios } from "../../../API/axios";
import { CAT } from "../../../API/Api";

// Custom hook to fetch categories
export function GetCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories data
        Axios.get(`/${CAT}`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);

    return categories;
}
