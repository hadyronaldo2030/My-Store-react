import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT } from "../../../API/Api";
import { useNavigate } from "react-router-dom";

export default function AddSubSubCategory() {
    const nav = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [subSubCategory, setSubSubCategory] = useState({ title: "", subCategory_id: "", image: "" });
    const [imageToUpload, setImageToUpload] = useState(null);
    const [loading, setLoading] = useState(false);

    // get categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((response) => setCategories(response.data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // get sub categories
    useEffect(() => {
        if (!selectedCategoryId) return;
        Axios.get(`/${CAT}/${selectedCategoryId}/${SUBCAT}`)
            .then((response) => setSubCategories(response.data))
            .catch((err) => console.error("Error fetching subcategories:", err));
    }, [selectedCategoryId]);

    // send data to sub categories
    async function handleAdd(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", subSubCategory.title);
        formData.append("subCategory_id", subSubCategory.subCategory_id);
        if (imageToUpload) formData.append("image", imageToUpload);

        try {
            const response = await Axios.post(`/sub-subcategory/add`, formData);
            console.log("Response:", response);
            nav("/dashboard/categories");
        } catch (err) {
            console.error("Error adding sub-subcategory:", err.response || err);
        } finally {
            setLoading(false);
        }
    }

    // التعامل مع التغييرات في الحقول
    function handleChange(e) {
        setSubSubCategory({ ...subSubCategory, [e.target.name]: e.target.value });
    }

    // التعامل مع تغيير الصورة
    function handleImageChange(e) {
        setImageToUpload(e.target.files[0]);
    }

    return (
        <Form className="w-100 mt-1 p-2" onSubmit={handleAdd}>
            <h3>Add Sub-Subcategory</h3>
            {loading && <p>Loading...</p>}

            {/* select category */}
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Main Category</Form.Label>
                <Form.Select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required
                >
                    <option value="">Select Main Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* select sub category */}
            <Form.Group className="mb-3" controlId="subCategory">
                <Form.Label>Subcategory</Form.Label>
                <Form.Select
                    value={subSubCategory.subCategory_id}
                    onChange={handleChange}
                    name="subCategory_id"
                    required
                >
                    <option value="">Select Subcategory</option>
                    {subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* title*/}
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={subSubCategory.title}
                    onChange={handleChange}
                    placeholder="Enter sub-subcategory title"
                    required
                />
            </Form.Group>

            {/* image */}
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            {imageToUpload && (
                <div className="mb-3">
                    <p>Selected Image:</p>
                    <img src={URL.createObjectURL(imageToUpload)} alt="Selected" width="100" />
                </div>
            )}

            <Button type="submit" className="btn btn-primary">
                Save Sub-Subcategory
            </Button>
        </Form>
    );
}
