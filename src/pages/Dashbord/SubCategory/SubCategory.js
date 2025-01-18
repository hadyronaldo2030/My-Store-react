// المكون الخاص بالفئات الفرعية
import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { SUBSUBCAT, SUBCAT, CAT, SubCat } from "../../../API/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function SubCategory({ categoryId }) {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // جلب الفئات الفرعية
    useEffect(() => {
        setLoading(true);
    
        Axios.get(`${CAT}/${categoryId}/${SUBCAT}`)
            .then(async (response) => {
                const subCategoriesData = response.data;
    
                const withSubSubCategories = await Promise.all(
                    subCategoriesData.map(async (subCategory) => {
                        try {
                            // جلب الـ sub-subcategories بناءً على subCategory.id
                            const subSubCategoriesRes = await Axios.get(`${CAT}/${subCategory.id}/${SUBSUBCAT}`);
                            subCategory.subSubCategories = subSubCategoriesRes.data;
                        } catch (error) {
                            console.error(`Error fetching sub-subcategories for subCategoryId: ${subCategory.id}`, error);
                            subCategory.subSubCategories = [];
                        }
                        return subCategory;
                    })
                );
    
                setSubCategories(withSubSubCategories);
            })
            .catch((error) => {
                console.error("Error fetching subcategories:", error);
            })
            .finally(() => setLoading(false));
    }, [categoryId]);
    
    // delete sub category
    async function handelDelete(id) {
        try {
            await Axios.delete(`${SubCat}/${id}`);
            setSubCategories((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    // رؤوس الأعمدة للجدول
    const subCategoryHeaders = [
        { key: "image", name: "Image" },
        { key: "title", name: "Sub Category" },
        { key: "subSubCategories", name: "Sub Subcategories" },
    ];

    return (
        <div className="mt-3">
            <h4>Subcategories</h4>
            {loading ? (
                <p>Loading...</p>
            ) : subCategories.length > 0 ? (
                <TableShow
                    header={subCategoryHeaders}
                    data={subCategories.map((subCategory) => ({
                        ...subCategory,
                        subSubCategories:
                            subCategory.subSubCategories && subCategory.subSubCategories.length > 0
                                ? subCategory.subSubCategories.map((sub) => sub.title).join(", ")
                                : "-",
                    }))}
                    total={subCategories.length}
                    limit={subCategories.length}
                    delete={handelDelete}
                />
            ) : (
                <p>No subcategories available.</p>
            )}
        </div>
    );
}
