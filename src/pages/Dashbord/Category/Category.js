import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { Cat } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import SubCategory from "../SubCategory/SubCategory";

export default function Category() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const { id } = useParams();

    // get category data
    useEffect(() => {
        setLoading(true);
        Axios.get(`${Cat}/${id}`)
            .then((data) => {
                setTitle(data.data.title);
                setLoading(false);
            })
            .then(() => setDisable(false))
            .catch(() => nav('/dashboard/categories/page/404', { replace: true }));
    }, [id, nav]);

    // send edit data
    async function HandelSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("title", title);
        form.append("image", image);
        try {
            await Axios.post(`${Cat}/edit/${id}`, form);
            window.location.pathname = "/dashboard/categories";
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <Form className="w-100 mt-1 p-2" onSubmit={HandelSubmit}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Edit Category</h3>
            </div>
            {loading && <Loading />}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="title ..."
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    onChange={(e) => setImage(e.target.files.item(0))}
                    type="file"
                />
            </Form.Group>
            <button disabled={disable} className="btn btn-primary">Save</button>

            {/* استدعاء مكون SubCategoryList لعرض الفئات الفرعية */}
            <SubCategory categoryId={id} />
        </Form>
    );
}
