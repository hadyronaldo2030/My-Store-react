import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from '../../../API/Api';
import axios from "axios";
import Loading from "../../../Components/Loading/Loading"; // مكون التحميل
import Cookie from "cookie-universal";
import { Link, useNavigate } from 'react-router-dom';
import "./Auth.css";

import img_register from '../../../Asstes/Images/icons/register.png';
import img_google from '../../../Asstes/Images/icons/google_300221.png';
import img_facebook from '../../../Asstes/Images/icons/facebook_5968764.png';

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        is_agree: false,
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const cookie = Cookie();

    const focus = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (focus.current) focus.current.focus();
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function togglePassword() {
        if (passwordRef.current) {
            const passwordInput = passwordRef.current;
            const eyeIcon = document.getElementById("eyeIcon");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false); // تعطيل التحميل بعد اكتمال العملية
            const token = res.data.token;
            cookie.set('e-commerce', token);
            navigate("/", { replace: true });
        } catch (err) {
            setLoading(false); // تعطيل التحميل عند حدوث خطأ
            if (err.response) {
                if (err.response.status === 422 && err.response.data.message.includes("already taken")) {
                    setErr("Email is already been taken");
                } else {
                    setErr("Internal Server Error");
                }
            } else {
                setErr("Internal Server Error");
            }
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className={`container ${loading ? "opacity-50" : ""}`}>
                <div className="auth row gap-3 align-items-center py-2">
                    <div className="col right_section bg-white">
                        <img src={img_register} alt="Illustration of e-commerce shopping" />
                    </div>
                    <div className="col left_section">
                        <h2>Register Now</h2>
                        <p>Let’s get you all set up so you can access your personal account.</p>
                        <form className="custom_form" onSubmit={handleSubmit}>
                            {/* name */}
                            <div className="form-group-custom">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={form.name}
                                    placeholder="Enter your name .."
                                    required
                                    ref={focus}
                                    autoComplete="name"
                                />
                            </div>
                            {/* email */}
                            <div className="form-group-custom">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={form.email}
                                    placeholder="Enter your email .."
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            {/* phone */}
                            <div className="form-group-custom">
                                <input
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                    value={form.phone}
                                    placeholder="Enter your phone .."
                                    autoComplete="tel"
                                />
                            </div>
                            {/* address */}
                            <div className="form-group-custom">
                                <input
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={form.address}
                                    placeholder="Enter your address .."
                                    autoComplete="street-address"
                                />
                            </div>
                            {/* password */}
                            <div className="form-group-custom password-container">
                                <input
                                    ref={passwordRef}
                                    id="password"
                                    value={form.password}
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Enter your password .."
                                    minLength="6"
                                    required
                                    autoComplete="new-password"
                                />
                                <span className="toggle-password" onClick={togglePassword}>
                                    <i id="eyeIcon" className="fas fa-eye"></i>
                                </span>
                            </div>
                            {/* is_agree */}
                            <div className="remember-me">
                                <label htmlFor="is_agree">
                                    <input
                                        id="is_agree"
                                        type="checkbox"
                                        name="is_agree"
                                        onChange={handleChange}
                                        checked={form.is_agree}
                                        required
                                    />
                                    <span>
                                        I agree to all the Terms and 
                                        <Link to="/PrivacyPolicy"> Privacy Policies</Link>
                                    </span>
                                </label>
                            </div>
                            <button className="login-btn" disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </button>
                        </form>
                        <p className="Dont_have_account">
                            Already have an account? <Link to="/login" className="link_log_reg">Login</Link>
                        </p>
                        <div className="title_reg_login">Or Register with</div>
                        <div className="social-buttons">
                            <Link to="#">
                                <img src={img_facebook} alt="login with facebook" />
                                <span>Face Book</span>
                            </Link>
                            <Link to="https://ecommerce-production-860a.up.railway.app/login-google">
                                <img src={img_google} alt="register with google" />
                                <span>Google</span>
                            </Link>
                        </div>
                        {err !== "" && <span className="error">{err}</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
