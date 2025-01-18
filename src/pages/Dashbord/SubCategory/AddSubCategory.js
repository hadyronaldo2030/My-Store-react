import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { SubCat, CAT } from "../../../API/Api";
import { useNavigate } from "react-router-dom";

export default function AddSubCategory() {
    const nav = useNavigate();
    const [subCategory, setSubCategory] = useState({ title: "", category_id: "", image: "" });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageToUpload, setImageToUpload] = useState(null);

    // جلب الفئات المتاحة
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((response) => setCategories(response.data))
            .catch((err) => console.log(err));
    }, []);

    // إرسال البيانات لإضافة الفئة الفرعية
    async function handleAdd(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", subCategory.title);
        formData.append("category_id", subCategory.category_id);
        if (imageToUpload) formData.append("image", imageToUpload); // إضافة الصورة إذا تم تحميلها

        try {
            const response = await Axios.post(`${SubCat}/add`, formData);
            console.log("Response: ", response);
            nav("/dashboard/categories");
        } catch (err) {
            console.log("Error adding subcategory:", err.response || err);  // عرض التفاصيل الخاصة بالخطأ
        } finally {
            setLoading(false);
        }
    }

    // تغيير البيانات في الفورم
    function handleChange(e) {
        setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
    }

    // اختيار صورة جديدة
    function handleImageChange(e) {
        setImageToUpload(e.target.files[0]);
    }

    return (
        <Form className="w-100 mt-1 p-2" onSubmit={handleAdd}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Add Subcategory</h3>
            </div>
            {loading && <p>Loading...</p>}

            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    value={subCategory.category_id}
                    onChange={handleChange}
                    name="category_id"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={subCategory.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Enter subcategory title"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageChange}
                />
            </Form.Group>

            {imageToUpload && (
                <div className="mb-3">
                    <p>Selected Image:</p>
                    <img src={URL.createObjectURL(imageToUpload)} alt="Selected" width="100" />
                </div>
            )}

            <Button type="submit" className="btn btn-primary">
                Save Subcategory
            </Button>
        </Form>
    );
}
