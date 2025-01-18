import { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { Cat } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
    // title item
    const [title, setTitle] = useState("");
    // img item
    const [image, setImage] = useState("");
    // loading 
    const [loading, setLoading] = useState(false);
    
    // ================= focus ==================
    const focus = useRef("");
    // handel focus 
    useEffect(() => {
    focus.current.focus();
    }, [])

    async function HandelSubmit(e) {
        setLoading(true);
        e.preventDefault();
        // ملء بيانات الفورم
        const form = new FormData();
        form.append("title", title);
        form.append("image", image);
        try {
            const res = await Axios.post(`${Cat}/add`, form);
            window.location.pathname = "/dashboard/categories";
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }
    return (
        <Form className="w-100 mt-1 p-2" onSubmit={HandelSubmit}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Add Category</h3>
            </div>
            {loading && <Loading />}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" 
                placeholder="title ..."
                required
                ref={focus}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Image</Form.Label>
                <Form.Label></Form.Label>
                <Form.Control 
                // الصفر الموجود فى الايتم يجيب اول صورة فقط 
                onChange={(e) => setImage(e.target.files.item(0))}
                type="file" 
                ></Form.Control>
            </Form.Group>
            <button
                // ايقاف الزر حتى ملء جميع البيانات
                disabled={title.length > 0 ? false : true}
                className="btn btn-primary"
                >Save
             </button>
        </Form>
    )
}