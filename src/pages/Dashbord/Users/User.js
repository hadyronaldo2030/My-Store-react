import { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {

    // جلب بيانات المستخدم للتعديل عليها 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    // اعطاء صلاحية المستخدم
    const [role, setRole] = useState("");
    // ايقاف زر التعديل حتى يتم اظهر البيانات داخل الحقول 
    const [disable, setDisable] = useState(true);
    // تحميل اثناء جلب البيانات 
    const [loading, setLoading] = useState(false);
    // وظيفتة هذا الناف لحل مشكلة اذا قام المستخدم بكتباة رقم اليوزر غير موجود بدل الصفحة بالخطـأ404 
    const nav = useNavigate()
    // تقوم بجلب ال id الخاص بالتعديل على ال user بطريقة مختصرة
    const { id } = useParams();

    //  user عرض البيانات 
    useEffect(() => {
        // اظهار اللودنج حتى يتم احضار البيانات
        setLoading(true);
        Axios.get(`${USER}/${id}`).then((data) => {
            setName(data.data.name);
            setEmail(data.data.email);
            setPhone(data.data.phone);
            setAddress(data.data.address);
            setRole(data.data.role);
            // اخفاء اللودنج بعد احضار البيانات
            setLoading(false);
        })
            .then(() => setDisable(false))
            // توجه الى الرئيسية
            .catch(() => nav('/dashboard/users/page/404', { replace: true }));
    }, [id]);

    // ايقاف اعادة تحميل الصفحة بعد الضغط على ارسال
    async function HandelSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await Axios.post(`${USER}/edit/${id}`, {
                name: name,
                email: email,
                phone: phone,
                address: address,
                role: role,
            });
            window.location.pathname = "/dashboard/users";
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }
    return (
        <Form className="w-100 mt-1 p-2" onSubmit={HandelSubmit}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Edit User</h3>
            </div>
            {loading && <Loading />}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name ..."
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="phone ..."
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="address ..."
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Role</Form.Label>
                <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option disable>Select Role</option>
                    <option value="1995">Admin</option>
                    <option value="2001">User</option>
                    <option value="1996">Writer</option>
                    <option value="1999">Product Manger</option>
                </Form.Select>
            </Form.Group>
            <button disabled={disable} className="btn btn-primary">Save</button>
        </Form>
    )
}