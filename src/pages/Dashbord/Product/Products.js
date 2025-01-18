import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { CAT, Pro, PRO, SUBCAT, SUBSUBCAT } from "../../../API/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
    // get Categories
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    // عرض البيانات فى صفحات متعدده على حسب حجم البيانات
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    // تحديد عدد الصفوف التى نظهرها
    const [limit, setLimit] = useState(6);
    // اجمالى البيانات الموجودة فى الجدول
    const [total, setTotal] = useState(0);
    // Loading
    const [loading, setLoading] = useState(false);

    // get all products
    useEffect(() => {
        setLoading(true);
        // طريقة الباجينشين بالباك 1
        Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
            .then((data) => {
                setProducts(data.data.data);
                setTotal(data.data.total);
            })
            .catch((err) => console.log(err + "error get product"))

            // اخفاء التحميل بعد جلب البيانات
            .finally(() => setLoading(false));
        // ملء المصفوفه لتعمل فى كل مرة على استدعاء البيانات
    }, [limit, page]);

    // Fetch categories when the component mounts
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Fetch subcategories
    useEffect(() => {
        Axios.get(`${SUBCAT}`)
            .then((response) => setSubCategories(response.data))
            .catch((error) => console.error("Error fetching subcategories:", error));
    }, []);

    // Fetch subsubcategories
    useEffect(() => {
        Axios.get(`/${SUBSUBCAT}`)
            .then((response) => setSubSubCategories(response.data))
            .catch((error) => console.error("Error fetching subsubcategories:", error));
    }, []);

    // title category , sub category , sub sub category
    const productsWithCategoryNames = products.map(product => ({
        ...product,
        category: categories.find(cat => cat.id === product.category)?.title || "Unknown Category",
        subCategory: subCategories.find(sub => sub.id === product.subCategory_id)?.title || "Unknown SubCategory",
        subSubCategory: subSubCategories.find(subsub => subsub.id === product.subsubcategory_id)?.title || "Unknown SubSubCategory",
    }));


    // header table users
    const header = [
        {
            key: 'images',
            name: 'Images',
        },
        {
            key: 'title',
            name: 'Title',
        },
        {
            key: 'category',
            name: 'category',
        },
        {
            key: 'subCategory_id',
            name: 'Sub Category',
        },
        {
            key: 'subsubcategory_id',
            name: 'Sub Sub Category',
        },
        {
            key: 'description',
            name: 'Description',
        },
        {
            key: 'price',
            name: 'Price',
        },
        {
            key: 'rating',
            name: 'Rating',
        },
        {
            key: 'created_at',
            name: 'Created',
        },
        {
            key: 'updated_at',
            name: 'Updated',
        }
    ]
    // handelDelete
    async function handelDelete(id) {
        try {
            // ايقاف زر الحذف للمستخدم المسجل فى الجلسه
            const res = await Axios.delete(`${Pro}/${id}`);
            // هذا الفلتر يقوم بالحذف بدون عمل اعادة تحديث للصفحة
            setProducts((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="bg-white p-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Products Page</h3>
                <Link className="btn btn-sm btn-primary" to={"/dashboard/product/add"}>Add Product</Link>
            </div>
            <TableShow
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                header={header}
                data={productsWithCategoryNames}
                delete={handelDelete}
                loading={loading}
                total={total}
                search="title"
                searchLink={Pro}
            />
        </div>
    );
}