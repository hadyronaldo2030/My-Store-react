import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import img_verify_otp from "../../../Asstes/Images/icons/Verify.png";
import { baseURL } from "../../../API/Api";

export default function VerifyOtp() {
    const [email, setEmail] = useState(""); // إضافة حقل البريد الإلكتروني
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(30); // المؤقت لإعادة الإرسال
    const navigate = useNavigate();

    // مؤقت العد التنازلي لإعادة إرسال OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // تحديث القيم في الحقول
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "otp") setOtp(value);
        if (name === "email") setEmail(value);
    };

    // إرسال البيانات عند الضغط على زر التحقق
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(`${baseURL}/verify-otp`, { email, otp });
            setLoading(false);

            // إذا تم التحقق بنجاح، يتم توجيه المستخدم
            navigate("/reset-password", { replace: true });
        } catch (err) {
            setLoading(false);
            if (err.response?.data?.message) {
                setError(err.response.data.message); // عرض رسالة الخطأ من الخادم
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    // إعادة إرسال OTP
    const handleResend = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.post(`${baseURL}/resend-otp`, { email }); // تضمين البريد الإلكتروني
            setLoading(false);
            setResendTimer(30);
        } catch (err) {
            setLoading(false);
            setError("Failed to resend the otp. Please try again.");
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div className="auth row gap-3 align-items-center py-2">
                    <div className="col right_section bg-white">
                        <img src={img_verify_otp} alt="Illustration of e-commerce shopping" />
                    </div>
                    <div className="col left_section">
                        <div>
                            <h2>Verify Your OTP</h2>
                            <p>Please enter the verification code we sent to your email.</p>
                            <form className="custom_form" onSubmit={handleSubmit}>
                                <div className="form-group-custom">
                                    <input
                                        className="mb-2"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group-custom">
                                    <input
                                        className="mb-2"
                                        type="text"
                                        name="otp"
                                        placeholder="_  _  _  _  _  _"
                                        value={otp}
                                        onChange={handleChange}
                                        required
                                        maxLength={6}
                                    />
                                </div>
                                <div className="resend-otp">
                                    {resendTimer > 0 ? (
                                        <p>Please wait {resendTimer} seconds to resend the OTP.</p>
                                    ) : (
                                        <div className="d-flex align-items-center gap-2">
                                            <p className="m-0">Didn’t receive an OTP?</p>
                                            <button type="button" onClick={handleResend} disabled={loading}>
                                                Resend
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button className="login-btn" disabled={loading || !otp || !email}>
                                    Verify OTP
                                </button>
                                {error && <span className="error-message">{error}</span>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
