import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT, SubSubCat } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateSubSubCategory() {
    const { id } = useParams(); // ID of the sub-subcategory to be edited
    const nav = useNavigate();
    const [subSubCategory, setSubSubCategory] = useState({
        title: "",
        subCategory_id: "",
        image: ""
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [imageFromServer, setImageFromServer] = useState(null);
    const [imageToUpload, setImageToUpload] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch main categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((response) => setCategories(response.data))
            .catch((err) => console.log("Error fetching categories:", err));
    }, []);

    // Fetch the sub-subcategory details for editing
    useEffect(() => {
        Axios.get(`${SubSubCat}/${id}`)
            .then((response) => {
                const data = response.data;
                setSubSubCategory({
                    title: data.title,
                    subCategory_id: data.subCategory_id,
                    image: ""
                });
                setSelectedCategoryId(data.category_id);
                setImageFromServer(data.image);
            })
            .catch((err) => console.error("Error fetching sub-subcategory:", err));
    }, [id]);

    // Fetch subcategories based on the selected category
    useEffect(() => {
        if (!selectedCategoryId) return;
        Axios.get(`${CAT}/${selectedCategoryId}/${SUBCAT}`)
            .then((response) => setSubCategories(response.data))
            .catch((err) => console.error("Error fetching subcategories:", err));
    }, [selectedCategoryId]);

    // Handle form submission for editing
    async function handleEdit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", subSubCategory.title);
        formData.append("subCategory_id", subSubCategory.subCategory_id);
        if (imageToUpload) formData.append("image", imageToUpload);

        try {
            const response = await Axios.post(`${SubSubCat}/edit/${id}`, formData);
            console.log("Response:", response);
            nav("/dashboard/categories");
        } catch (err) {
            console.error("Error updating sub-subcategory:", err.response || err);
        } finally {
            setLoading(false);
        }
    }

    // Handle input changes
    function handleChange(e) {
        setSubSubCategory({ ...subSubCategory, [e.target.name]: e.target.value });
    }

    // Handle image selection
    function handleImageChange(e) {
        setImageToUpload(e.target.files[0]);
    }

    return (
        <Form className="w-100 mt-1 p-2" onSubmit={handleEdit}>
            <h3>Edit Sub-Subcategory</h3>
            {loading && <p>Loading...</p>}

            {/* Select main category */}
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

            {/* Select subcategory */}
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

            {/* Title */}
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

            {/* Image */}
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            {/* Display current or selected image */}
            {imageFromServer && !imageToUpload && (
                <div className="mb-3">
                    <p>Current Image:</p>
                    <img src={"https://ecommerce-production-b11e.up.railway.app/" + imageFromServer} alt="Current" width="100" />
                </div>
            )}
            {imageToUpload && (
                <div className="mb-3">
                    <p>Selected Image:</p>
                    <img src={"https://ecommerce-production-b11e.up.railway.app/" + URL.createObjectURL(imageToUpload)} alt="Selected" width="100" />
                </div>
            )}

            <Button type="submit" className="btn btn-primary">
                Save Changes
            </Button>
        </Form>
    );
}
