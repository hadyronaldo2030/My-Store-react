// SubSubCategory.js
import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { SUBSUBCAT, CAT, SubSubCat } from "../../../API/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function SubSubCategory({ subCategoryId }) {
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // get sub sub categories from sub category id
    useEffect(() => {
        if (!subCategoryId) return;
        setLoading(true);

        Axios.get(`${CAT}/${subCategoryId}/${SUBSUBCAT}`)
            .then((response) => {
                setSubSubCategories(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching sub-subcategories:`, error);
            })
            .finally(() => setLoading(false));
    }, [subCategoryId]);

    // table sub-subcategories
    const subSubCategoryHeaders = [
        { key: "title", name: "Sub Subcategory Title" },
        { key: "image", name: "Image" },
    ];

    // hanndel delete
    async function handelDelete(id) {
        try {
            await Axios.delete(`${SubSubCat}/${id}`);
            setSubSubCategories((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="mt-4">
            <h4>Sub Sub categories</h4>
            {loading ? (
                <p>Loading...</p>
            ) : subSubCategories.length > 0 ? (
                <TableShow
                    header={subSubCategoryHeaders}
                    data={subSubCategories}
                    total={subSubCategories.length}
                    limit={subSubCategories.length}
                    delete={handelDelete}
                />
            ) : (
                <p>No sub-subcategories available.</p>
            )}
        </div>
    );
}
