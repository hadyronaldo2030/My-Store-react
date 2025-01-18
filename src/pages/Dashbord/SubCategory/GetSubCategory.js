// src/hooks/GetCategories.js

import { useState, useEffect } from "react";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT } from "../../../API/Api";

// Custom hook to fetch categories
export function GetSubCategory( {categoryId} ) {
    const [subCategories, setSubCategories] = useState([]);

    // get sub category
    useEffect(() => {
        Axios.get(`${CAT}/${categoryId}/${SUBCAT}`)
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((err) => console.error("Failed to fetch sub categories:", err))
    }, [categoryId]);

    return subCategories;
}
