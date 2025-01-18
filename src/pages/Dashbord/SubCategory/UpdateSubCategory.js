import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { SubCat, CAT } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import SubSubCategory from "../SubSubCategory/SubSubCategory";

export default function UpdateSubCategory() {
    const { id } = useParams(); // ID of the subcategory being edited
    const nav = useNavigate();
    const [subCategory, setSubCategory] = useState({ title: "", category_id: "", image: "" });
    const [categories, setCategories] = useState([]); // List of all categories
    const [imageFromServer, setImageFromServer] = useState(null); // Current image URL
    const [imageToUpload, setImageToUpload] = useState(null); // Image file for upload
    const [loading, setLoading] = useState(false);

    // Fetch list of categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((response) => setCategories(response.data))
            .catch((err) => console.log(err));
    }, []);

    // Fetch subcategory details
    useEffect(() => {
        Axios.get(`${SubCat}/${id}`)
            .then((response) => {
                setSubCategory(response.data); // Initialize form data
                setImageFromServer(response.data.image); // Set current image
            })
            .catch((err) => console.log(err));
    }, [id]);

    // Handle form submission
    async function handleEdit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", subCategory.title);
        formData.append("category_id", subCategory.category_id);
        if (imageToUpload) formData.append("image", imageToUpload);

        console.log("Form Data:", {
            title: subCategory.title,
            category_id: subCategory.category_id,
            image: imageToUpload,
        });

        try {
            const response = await Axios.post(`${SubCat}/edit/${id}`, formData);
            console.log("Response:", response);

            // Navigate to categories page
            nav(`/dashboard/categories`);
        } catch (err) {
            console.log("Error updating subcategory:", err.response || err);
        } finally {
            setLoading(false);
        }
    }

    // Update form state on input change
    function handleChange(e) {
        const { name, value } = e.target;
        setSubCategory((prev) => ({ ...prev, [name]: value }));
        console.log("Updated subCategory:", { ...subCategory, [name]: value });
    }

    // Handle image file selection
    function handleImageChange(e) {
        setImageToUpload(e.target.files[0]);
    }

    return (
        <Form className="w-100 mt-1 p-2" onSubmit={handleEdit}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Edit Sub Category</h3>
            </div>
            {loading && <p>Loading...</p>}

            {/* Select category */}
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    value={subCategory.category_id}
                    onChange={handleChange}
                    name="category_id"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* Subcategory title */}
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

            {/* Upload image */}
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageChange}
                />
            </Form.Group>

            {/* Show current image */}
            {imageFromServer && (
                <div className="mb-3">
                    <img src={imageFromServer} alt="Current Subcategory" width="100" />
                    <p>Current Image</p>
                </div>
            )}

            {/* Submit button */}
            <Button type="submit" className="btn btn-primary">
                Save Changes
            </Button>

            {/* Sub-subcategory component */}
            <SubSubCategory subCategoryId={id} />
        </Form>
    );
}
