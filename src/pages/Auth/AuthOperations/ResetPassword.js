import { useState, useRef } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import img_reset_password from "../../../Asstes/Images/icons/reset password.png";
import { baseURL } from "../../../API/Api";

export default function ResetPassword() {
    const [form, setForm] = useState({
        email: "", // حقل البريد الإلكتروني
        password: "",
        password_confirmation: "", // تغيير اسم الحقل
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Refs for password and confirm password fields
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null); // تغيير اسم المرجع

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Toggle visibility for password fields
    const togglePasswordVisibility = (ref, iconId) => {
        if (ref.current) {
            const input = ref.current;
            const eyeIcon = document.getElementById(iconId);
            if (input.type === "password") {
                input.type = "text";
                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate passwords
        if (form.password !== form.password_confirmation) {
            setLoading(false);
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/reset-password`, {
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
            });
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login"); // Redirect to login page
            }, 2000);
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message); // Display error from server
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div className="auth row gap-3 align-items-center py-2">
                    <div className="col left_section">
                        <div>
                            <h2>Reset Your Password</h2>
                            <p>Enter your email and new password below.</p>
                            <form className="custom_form" onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="form-group-custom">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="form-group-custom password-container">
                                    <input
                                        ref={passwordRef}
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() => togglePasswordVisibility(passwordRef, "eyeIcon1")}
                                    >
                                        <i id="eyeIcon1" className="fas fa-eye"></i>
                                    </span>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="form-group-custom password-container">
                                    <input
                                        ref={passwordConfirmationRef}
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Confirm Password"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() =>
                                            togglePasswordVisibility(passwordConfirmationRef, "eyeIcon2")
                                        }
                                    >
                                        <i id="eyeIcon2" className="fas fa-eye"></i>
                                    </span>
                                </div>

                                {/* Error and Success Messages */}
                                {error && <span className="error-message">{error}</span>}
                                {success && <span className="success-message">Password reset successfully!</span>}

                                {/* Submit Button */}
                                <button className="login-btn" disabled={loading}>
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col right_section bg-white">
                        <img src={img_reset_password} alt="Illustration of reset password" />
                    </div>
                </div>
            </div>
        </>
    );
}
