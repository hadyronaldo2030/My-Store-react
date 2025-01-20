import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../API/Api";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading"; // Importing the Loading component
import Cookie from "cookie-universal"; // For handling cookies
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

import img_login from "../../../Asstes/Images/icons/login.png"; // Login illustration image
import img_google from "../../../Asstes/Images/icons/google_300221.png"; // Google login icon
import img_facebook from "../../../Asstes/Images/icons/facebook_5968764.png"; // Facebook login icon

export default function Login() {
    // State for managing form inputs
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // State for managing loading state during API call
    const [loading, setLoading] = useState(false);

    // State for managing error messages
    const [err, setErr] = useState("");

    // Navigation hook to redirect users after login
    const navigate = useNavigate();

    // Cookie instance to set authentication token
    const cookie = Cookie();

    // Refs for managing focus and toggling password visibility
    const focus = useRef(null);
    const passwordRef = useRef(null);

    // Set focus to the email input field when the component loads
    useEffect(() => {
        if (focus.current) focus.current.focus();
    }, []);

    // Handle input changes and update the form state
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    }

    // Toggle password visibility between 'text' and 'password'
    function togglePassword() {
        if (passwordRef.current) {
            const passwordInput = passwordRef.current;
            const eyeIcon = document.getElementById("eyeIcon");
            if (passwordInput.type === "password") {
                passwordInput.type = "text"; // Show password
                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password"; // Hide password
                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");
            }
        }
    }

    // Handle form submission and API call for login
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission

        setLoading(true); // Set loading state to true
        try {
            // Send POST request to login API
            const res = await axios.post(`${baseURL}/${LOGIN}`, form);
            setLoading(false); // Set loading state to false on success

            const token = res.data.token; // Retrieve the token from response
            cookie.set("e-commerce", token); // Save token in cookies
            navigate("/", { replace: true }); // Redirect to dashboard
        } catch (err) {
            setLoading(false); // Set loading state to false on error
            if (err.response && err.response.status === 401) {
                setErr("Invalid email or password"); // Set error for invalid credentials
            } else {
                setErr("Internal Server Error"); // Set general error message
            }
        }
    }

    return (
        <>
            {/* Show Loading component if loading is true */}
            {loading && <Loading />}
            <div className={`container ${loading ? "opacity-50" : ""}`}>
                <div className="auth row gap-3 align-items-center py-2">
                    <div className="col right_section bg-card">
                        {/* Illustration for the login page */}
                        <img src={img_login} alt="Illustration of e-commerce shopping" />
                    </div>
                    <div className="col left_section">

                        {/* Login form */}
                        <div>
                            <h2>Login Now</h2>
                            <p>Welcome back! Log in to access your account.</p>
                            <form className="custom_form" onSubmit={handleSubmit}>
                                {/* Email input field */}
                                <div className="form-group-custom">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={form.email}
                                        placeholder="Enter your email .."
                                        required
                                        ref={focus}
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Password input field with toggle visibility */}
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
                                        autoComplete="current-password"
                                    />
                                    <span className="toggle-password" onClick={togglePassword}>
                                        <i id="eyeIcon" className="fas fa-eye"></i>
                                    </span>
                                </div>
                                <div className="remember-me">
                                    <span className="d-flex align-items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="forgotPassword"
                                        />
                                        <label for="forgotPassword">Remember me</label>
                                    </span>
                                    <Link to="/forgot-password"> Forgot  Password ?</Link>
                                </div>
                                {/* Login button, disabled while loading */}
                                <button className="login-btn" disabled={loading}>
                                    {loading ? "Loading..." : "Login"}
                                </button>
                            </form>

                            {/* Link to register page */}
                            <p className="Dont_have_account">
                                Don't have an account?{" "}
                                <Link to="/register" className="link_log_reg">Register</Link>
                            </p>
                        </div>

                        {/* Social login options */}
                        <div>
                            <div className="title_reg_login">Or login with</div>
                            <div className="social-buttons">
                                <Link to="#">
                                    <img src={img_facebook} alt="login with Facebook" />
                                    <span>Facebook</span>
                                </Link>
                                <Link to="https://ecommerce-production-860a.up.railway.app/login-google">
                                    <img src={img_google} alt="login with Google" />
                                    <span>Google</span>
                                </Link>
                            </div>
                        </div>

                        {/* Display error message if exists */}
                        {err !== "" && <p className="text-danger">{err}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}
