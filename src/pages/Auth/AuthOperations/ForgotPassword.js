import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../../API/Api"; // استبدل بـ URL الخاص بك
import "./Auth.css";
import Loading from "../../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import img_forgot_password from "../../../Asstes/Images/icons/forgot-password.png";

export default function ForgotPassword() {
    const [form, setForm] = useState({
        email: "",
    });
    const navigate = useNavigate();

    // ================ Loading ================
    const [loading, setLoading] = useState(false);

    // ================ Focus ==================
    const focus = useRef("");
    useEffect(() => {
        focus.current.focus();
    }, []);

    // ================ Error and Success Messages ================
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");

    // Handle form changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        setSuccess("");

        try {
            // send requst server data
            const response = await axios.post(`${baseURL}/forgot-password`, {
                email: form.email,
            });
            navigate("/VerifyOtp", { replace: true }); // Redirect to verify code page
            setSuccess(response.data.message || "Password reset link has been sent to your email.");
        } catch (error) {
            setErr(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div className="auth row gap-3 align-items-center py-2">
                    <div className="col left_section">
                        <div>
                            <h2>Forgot your password?</h2>
                            <p>Don’t worry, happens to all of us. Enter your email below to recover your password</p>
                            <form className="custom_form" onSubmit={handleSubmit}>
                                <div className="form-group-custom">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        ref={focus}
                                    />
                                    <Form.Label>Email:</Form.Label>
                                </div>
                                <button className="login-btn" disabled={loading}>
                                    {loading ? "Sending..." : "Submit"}
                                </button>
                                {success && <span className="success-message">{success}</span>}
                                {err && <span className="error-message">{err}</span>}
                            </form>
                            <p className="Dont_have_account justify-content-start">
                                <i className="fa-solid fa-arrow-left-long"></i>
                                Back to <Link to="/login" className="link_log_reg">Login</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col right_section bg-white">
                        <img src={img_forgot_password} alt="Illustration of e-commerce shopping" />
                    </div>
                </div>
            </div>
        </>
    );
}
