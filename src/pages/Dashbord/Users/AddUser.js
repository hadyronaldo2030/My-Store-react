import { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {

    // جلب بيانات المستخدم للتعديل عليها 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    // اعطاء صلاحية للمستخدم
    const [role, setRole] = useState("");
    // انشاء باسورد للمستخدم
    const [password, setPassword] = useState("");
    // تحميل اثناء جلب البيانات 
    const [loading, setLoading] = useState(false);

    // ================= focus ==================
    const focus = useRef("");
    // handel focus 
    useEffect(() => {
        focus.current.focus();
    }, [])

    // ايقاف اعادة تحميل الصفحة بعد الضغط على ارسال
    async function HandelSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await Axios.post(`${USER}/add`, {
                name: name,
                email: email,
                phone: phone,
                address: address,
                password: password,
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
                <h3>Add User</h3>
            </div>
            {loading && <Loading />}
            {/* name */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name ..."
                    required
                    ref={focus}
                ></Form.Control>
            </Form.Group>
            {/* email */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    required
                ></Form.Control>
            </Form.Group>
            {/* phone */}
            <Form.Group className="mb-3">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder="Enter your phone .."
                />
            </Form.Group>
            {/* address */}
            <Form.Group className="mb-3">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Enter your address .."
                />
            </Form.Group>
            {/* password */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password.."
                    required
                ></Form.Control>
            </Form.Group>
            {/* role */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Role</Form.Label>
                <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option disable>Select Role</option>
                    <option value="1995">Admin</option>
                    <option value="2001">User</option>
                    <option value="1996">Writer</option>
                </Form.Select>
            </Form.Group>
            <button
                // ايقاف الزر حتى ملء جميع البيانات
                disabled={
                    name.length > 1 &&
                        email.length > 1 &&
                        password.length > 6 &&
                        role !== ""
                        ? false
                        : true
                }
                className="btn btn-primary"
            >Save
            </button>
        </Form>
    )
}