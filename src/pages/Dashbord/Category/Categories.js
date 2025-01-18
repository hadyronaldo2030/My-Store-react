import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { Cat, CAT, SUBCAT } from "../../../API/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function Categories() {
    const [catgories, setCatgories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
            .then(async (data) => {
                const categoriesData = data.data.data;
                
                // get sub category from categories
                const categoriesWithSubcategories = await Promise.all(
                    categoriesData.map(async (category) => {
                        try {
                            const subCategoriesRes = await Axios.get(`${CAT}/${category.id}/${SUBCAT}`);
                            category.subCategories = subCategoriesRes.data;
                        } catch (error) {
                            console.error("Error fetching subcategories:", error);
                            category.subCategories = [];
                        }
                        return category;
                    })
                );

                setCatgories(categoriesWithSubcategories);
                setTotal(data.data.total);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [limit, page]);

    // header table users
    const header = [
        { key: 'title', name: 'Title' },
        { key: 'image', name: 'Image' },
        { key: 'created_at', name: 'Created' },
        { key: 'updated_at', name: 'Updated' },
        { key: 'subCategories', name: 'Subcategories' },
    ];

    async function handelDelete(id) {
        try {
            await Axios.delete(`${Cat}/${id}`);
            setCatgories((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-white p-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Categories Page</h3>
                <Link className="btn btn-sm btn-primary" to={"/dashboard/category/add"}>Add Category</Link>
            </div>
            <TableShow
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                header={header}
                data={catgories.map((category) => ({
                    ...category,
                    subCategories: category.subCategories && category.subCategories.length > 0
                        ? category.subCategories.map((sub) => sub.title).join(", ")
                        : "-" 
                }))}
                delete={handelDelete}
                loading={loading}
                total={total}
                search="title"
                searchLink={Cat}
            />
        </div>
    );
}
