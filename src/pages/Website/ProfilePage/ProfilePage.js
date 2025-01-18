import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfilePage.css";

export default function UserProfile() {
    // حالات لتخزين البيانات
    const [originalData, setOriginalData] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false); // حالة لتتبع التعديلات

    const nav = useNavigate();
    const { id } = useParams();

    // عرض البيانات عند التحميل
    useEffect(() => {
        setLoading(true);
        Axios.get(`profile/${USER}/${id}`)
            .then((data) => {
                const userData = data.data;
                setOriginalData(userData); // تخزين البيانات الأصلية
                setName(userData.name);
                setEmail(userData.email);
                setPhone(userData.phone);
                setAddress(userData.address);
                setRole(userData.role);
                setLoading(false);
            })
            .catch(() => nav("/dashboard/users/page/404", { replace: true }));
    }, [id]);

    // مراقبة التعديلات على البيانات
    useEffect(() => {
        if (
            name !== originalData.name ||
            email !== originalData.email ||
            phone !== originalData.phone ||
            address !== originalData.address
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [name, email, phone, address, originalData]);

    // إرسال البيانات عند الضغط على زر "Save"
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await Axios.post(`${USER}/edit/${id}`, {
                name,
                email,
                phone,
                address,
                role,
            });
            window.location.pathname = `/profile/${id}`;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Header Section */}
            <header className="profile-header">
                <div className="container">
                    <div className="d-flex gap-3" style={{ marginBottom: "-35px" }}>
                        <div className="img_user">
                            <h1 className="m-0">{name.charAt(0)}</h1>
                        </div>
                        <h4>{name}</h4>
                    </div>
                </div>
            </header>
            <div className="profile-container my-3">
                {loading && <Loading />}
                {!loading && (
                    <div>
                        {/* Tabs */}
                        <div className="tabs">
                            <button className="tab active">Profile</button>
                            <button className="tab">Timeline</button>
                            <button className="tab">Transaction</button>
                        </div>

                        {/* Form Section */}
                        <form className="profile-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your phone"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your address"
                                />
                            </div>
                            <button
                                type="submit"
                                className="save-button"
                                disabled={!isChanged || loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
