import { useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import Loading from "../../../Components/Loading/Loading";
import { Pro, CAT, SUBCAT, SUBSUBCAT } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {

    // title item
    const [form, setForm] = useState({
        category: "Select Category",
        subCategory_id: "Select Sub Category",
        subsubcategory_id: "Select Sub Sub Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        stock: "",
    });

    // img item
    const [images, setImages] = useState([]);
    // get Categories
    const [categories, setCategories] = useState([]);
    // get Sub Category
    const [subCategory_id, setsubCategory_id] = useState([]);
    // get sub sub category
    const [subsubcategory_id, setSubsubcategory_id] = useState([]);
    // loading 
    const [loading, setLoading] = useState(false);
    // تقوم بجلب ال id الخاص بالتعديل على ال المنتج بطريقة مختصرة
    const { id } = useParams();
    // جلب الصور من اجل التعديل
    const [imageFromServer, setImageFromServer] = useState([]);
    // هذ الاستيت لجعل الصور فى حالة الحذف من التعديل الخاص بالصور يحذف فقط من الفرونت وليس الباك
    const [idFromServer, setidFromServer] = useState([]);
    // لعدم اعادة تحميل الصفحة
    const nav = useNavigate();

    // ================= ref ==================
    const focus = useRef("");
    // handel focus 
    useEffect(() => {
        focus.current.focus();
    }, [])

    // Open Image
    const OpenImage = useRef(null);
    // progress image 
    const progress = useRef([]);
    // delete image 
    const ids = useRef([]);

    function handelOpenImage() {
        OpenImage.current.click();
    }
    // get all categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((data) => setCategories(data.data))
            .catch((err) => console.log(err));
    }, []);

    function SubCategoriesByCategory(categoryId) {
        Axios.get(`/${CAT}/${categoryId}/${SUBCAT}`)
            .then((data) => setsubCategory_id(data.data))
            .catch((err) => console.log(err));
    }

    function SubSubCategoriesBySubCategory(subCategoryId) {
        Axios.get(`${CAT}/${subCategoryId}/${SUBSUBCAT}`)
            .then((data) => setSubsubcategory_id(data.data))
            .catch((err) => console.log(err));
    }

    // get product
    useEffect(() => {
        Axios.get(`/${Pro}/${id}`)
            .then((data) => {
                setForm(data.data[0]);
                setImageFromServer(data.data[0].images);
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, []);

    // Handel Edit
    async function HandelEdit(e) {
        setLoading(true);
        e.preventDefault();
        const sanitizedForm = {
            ...form,
            category: form.category === "Select category" ? null : form.category,
            subCategory_id: form.subCategory_id === "Select sub category" ? null : form.subCategory_id,
            subsubcategory_id: form.subsubcategory_id === "Select sub sub category" ? null : form.subsubcategory_id,
        };
        try {
            // هنا قم بحفظ الصور التى تم حذفها فى حاله التعديلات 
            for (let i = 0; i < idFromServer.length; i++) {
                await Axios.delete(`/product-img/${idFromServer[i]}`).then((data) =>
                    console.log(data)
                );
            }

            await Axios.post(`${Pro}/edit/${id}`, sanitizedForm);
            nav("/dashboard/products");
            console.log(sanitizedForm)
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    // handel change
    function handelChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "category" && {
                subCategory_id: null,
                subsubcategory_id: null,
            }),
            ...(name === "subCategory_id" && {
                subsubcategory_id: null,
            }),
        }));

        if (name === "category") {
            SubCategoriesByCategory(value);
        }

        if (name === "subCategory_id") {
            SubSubCategoriesBySubCategory(value);
        }

    }

    // حل لمشكلة عدم اظهار ال progress فى رفع الصور تانى مره 
    const j = useRef(-1);

    // handel images change لرفع الصور
    async function handelImagesChange(e) {
        // اختيار الصور وقمت بوضع ال prev لان بعد اختيار نفس الصورة مره اخرى يتم استبدالها
        setImages((prev) => [...prev, ...e.target.files]);
        // ارسال الصور الى الباك ان 
        const imagesAsFile = e.target.files;
        const data = new FormData();
        // وضعنا فور لوب لرفع صورة ورا صورة الى الباك اند بالترتيب
        for (let i = 0; i < imagesAsFile.length; i++) {
            j.current++;
            data.append("image", imagesAsFile[i]);
            data.append("product_id", id);
            try {
                const res = await Axios.post("/product-img/add", data, {
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        // بجيب القيمة بالنسبة 1 % 2%  3% وهكذ
                        const percent = Math.floor((loaded * 100) / total);
                        if (percent % 1 === 0) {
                            progress.current[j.current].style.width = `${percent}%`;
                            // اظهار نسبة المئوية اثناء رفع الصورة
                            progress.current[j.current].setAttribute("percent", `${percent}%`);
                        }
                    },
                });
                ids.current[j.current] = res.data.id
            } catch (err) {
                console.log(err)
            }
        }
    }

    // handel image delete
    async function handelImageDelete(id, img) {
        const findId = ids.current[id];
        try {
            const res = await Axios.delete(`product-img/${findId}`);
            setImages((prev) => prev.filter((image) => image !== img));
            ids.current = ids.current.filter((i) => i !== findId);
            --j.current;
        } catch (err) {
            console.log(err)
        }
    }
    // حذف الصورة فى حالة التعديلات
    async function handelImageDeleteFromServer(id) {
        // يقوم هذا الفلتر بحذف الصورة فى حاله التعديل ولكن يقوم بحذفها من الباك اند نهائي
        setImageFromServer((prev) => prev.filter(img => img.id !== id));
        setidFromServer((prev) => {
            return [...prev, id];
        });
    }


    // get all categories
    const categoryShow = categories.map((item, key) => (
        <option key={key} value={item.id}>
            {item.title}
        </option>
    ));

    const subCategory_idShow = subCategory_id.map((item, key) => (
        <option key={key} value={item.id}>
            {item.title}
        </option>
    ));

    const subsubcategory_idShow = subsubcategory_id.map((item, key) => (
        <option key={key} value={item.id}>
            {item.title}
        </option>
    ));


    // map show images
    const imagesShow = images.map((img, key) => (
        <div className="border p-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center justify-content-start gap-2" key={key}>
                    <img src={URL.createObjectURL(img)} width="80px"></img>
                    <div>
                        <p className="mb-1">{img.name}</p>
                        <p>
                            {img.size / 1024 < 900
                                ? (img.size / 1024).toFixed(2) + " KB"
                                : (img.size / (1024 * 1024)).toFixed(2) + " MB"}
                        </p>
                    </div>
                </div>
                <Button onClick={() => handelImageDelete(key, img)} className="btn btn-sm btn-danger">Delete</Button>
            </div>
            <div className="custom-progress mt-3">
                <span
                    ref={(e) => { progress.current[key] = e }}
                    className="inner-progress"></span>
            </div>
        </div>
    ));

    // عرض وحذف الصور فى حالة التعديلات
    const imageFromServerShow = imageFromServer.map((img, key) => (
        <div className="border p-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center justify-content-start gap-2" key={key}>
                    <img alt="" src={img.image} width="80px"></img>

                </div>
                <Button onClick={() => handelImageDeleteFromServer(img.id)} className="btn btn-sm btn-danger">Delete</Button>
            </div>
        </div>
    ));


    return (
        <Form className="w-100 mt-1 p-2" onSubmit={HandelEdit}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Edit Product</h3>
            </div>
            {loading && <Loading />}
            {/* Select Category */}
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    ref={focus}
                    value={form.category}
                    onChange={handelChange}
                    name="category"
                >
                    <option>Select Category</option>
                    {categoryShow}
                </Form.Select>
            </Form.Group>

            {/* Select Sub Category */}
            <Form.Group className="mb-3" controlId="subCategory_id">
                <Form.Label>Sub Category</Form.Label>
                <Form.Select
                    value={form.subCategory_id}
                    onChange={handelChange}
                    name="subCategory_id"
                    disabled={form.category === "Select category"}
                >
                    <option>Select Sub Category</option>
                    {subCategory_idShow}
                </Form.Select>
            </Form.Group>

            {/* Select Sub Sub Category */}
            <Form.Group className="mb-3" controlId="subsubcategory_id">
                <Form.Label>Sub Sub Category</Form.Label>
                <Form.Select
                    value={form.subsubcategory_id}
                    onChange={handelChange}
                    name="subsubcategory_id"
                    disabled={form.subCategory_id === "Select sub category"}
                >
                    <option>Select Sub Sub Category</option>
                    {subsubcategory_idShow}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.title}
                    onChange={handelChange}
                    name="title"
                    type="text"
                    placeholder="title ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.description}
                    onChange={handelChange}
                    name="description"
                    type="text"
                    placeholder="description ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.price}
                    onChange={handelChange}
                    name="price"
                    type="number"
                    placeholder="price ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.discount}
                    onChange={handelChange}
                    name="discount"
                    type="number"
                    placeholder="discount ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="About">
                <Form.Label>About</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.About}
                    onChange={handelChange}
                    name="About"
                    type="text"
                    placeholder="About ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control
                    value={form.stock}
                    onChange={handelChange}
                    name="stock"
                    type="text"
                    placeholder="stock ..."
                    required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="images">
                <Form.Label>Images</Form.Label>
                <Form.Control
                    ref={OpenImage}
                    hidden
                    multiple
                    onChange={handelImagesChange}
                    type="file"
                ></Form.Control>
            </Form.Group>
            <div
                onClick={handelOpenImage}
                className="d-flex align-items-center justify-content-center gap-2 py-3 mb-2 rounded mb-2 w-100 flex-column"
                style={{
                    border: "2px dashed #0086fe",
                    cursor: "pointer"
                }}>

                <img src={require("../../../Asstes/upload.png")}
                    width="100px"
                    style={{ filter: "grayscale(1)" }}
                    alt=""
                />
                <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
                    Upload Image
                </p>
            </div>
            <div className="d-flex align-items-start flex-column gap-2">
                {imageFromServerShow}
            </div>
            <div className="d-flex align-items-start flex-column gap-2">
                {imagesShow}
            </div>
            <button
                // ايقاف الزر حتى ملء جميع البيانات
                // disabled={title.length > 0 ? false : true}
                className="btn btn-primary"
            >Save
            </button>
        </Form>
    )
}