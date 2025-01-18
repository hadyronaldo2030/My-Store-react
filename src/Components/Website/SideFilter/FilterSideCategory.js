import React, { useState, useEffect } from "react";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT, SUBSUBCAT } from "../../../API/Api";
import "./SideFilter.css";

export default function DynamicCategories() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const categoriesResponse = await Axios.get(CAT);
                setCategories(categoriesResponse.data);

                for (const category of categoriesResponse.data) {
                    const subCatResponse = await Axios.get(`${CAT}/${category.id}/${SUBCAT}`);
                    setSubCategories((prev) => [
                        ...prev,
                        { categoryId: category.id, subCategories: subCatResponse.data },
                    ]);

                    for (const subCategory of subCatResponse.data) {
                        const subSubCatResponse = await Axios.get(`${CAT}/${subCategory.id}/${SUBSUBCAT}`);
                        setSubSubCategories((prev) => [
                            ...prev,
                            { subCategoryId: subCategory.id, subSubCategories: subSubCatResponse.data },
                        ]);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const groupedSubCategories = subCategories.reduce((acc, { categoryId, subCategories }) => {
        acc[categoryId] = subCategories;
        return acc;
    }, {});

    const groupedSubSubCategories = subSubCategories.reduce((acc, { subCategoryId, subSubCategories }) => {
        acc[subCategoryId] = subSubCategories;
        return acc;
    }, {});

    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    return (
        <div className="filter-section filter-categories">
            <h4>CATEGORIES</h4>
            <ul className="px-0">
                {categories.map((category) => (
                    <li key={category.id}>
                        <div
                            className="d-flex align-items-center cursor-pointer"
                            onClick={() =>
                                groupedSubCategories[category.id]?.length &&
                                toggleCategory(category.id)
                            }
                        >
                            <span className="dropdown_icon">
                                <i
                                    className={`fa-solid ${
                                        groupedSubCategories[category.id]?.length
                                            ? expandedCategories[category.id]
                                                ? "fa-minus"
                                                : "fa-plus"
                                            : "fa-circle"
                                    }`}
                                ></i>
                            </span>
                            <span className="px-1">{category.title}</span>
                        </div>
                        {expandedCategories[category.id] && (
                            <ul>
                                {groupedSubCategories[category.id]?.map((subCat) => (
                                    <li key={subCat.id}>
                                        <div
                                            className="d-flex align-items-center cursor-pointer"
                                            onClick={() =>
                                                groupedSubSubCategories[subCat.id]?.length &&
                                                toggleCategory(subCat.id)
                                            }
                                        >
                                            <span className="dropdown_icon">
                                                <i
                                                    className={`fa-solid ${
                                                        groupedSubSubCategories[subCat.id]?.length
                                                            ? expandedCategories[subCat.id]
                                                                ? "fa-minus"
                                                                : "fa-plus"
                                                            : "fa-circle"
                                                    }`}
                                                ></i>
                                            </span>
                                            <span className="px-1">{subCat.title}</span>
                                        </div>
                                        {expandedCategories[subCat.id] && (
                                            <ul className="px-0">
                                                {groupedSubSubCategories[subCat.id]?.map((subSubCat) => (
                                                    <li key={subSubCat.id}>
                                                        <span>{subSubCat.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {loading && <p>Loading categories...</p>}
        </div>
    );
}
