import React from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {

    return (
        <>
            {/* Header Section */}
            <header className="privacy-header" >
                <h1>Privacy Policy</h1>
                <p>Effective - May 1, 2024</p>
            </header >
            <div className="container">
                <div className="privacy-policy row">
                    {/* Sidebar Navigation */}
                    <div className="sidebar col-lg-3 col-md-4 d-lg-block d-md-block d-none">
                        <ul>
                            <li>
                                <a href="#introduction">1. Introduction</a>
                            </li>
                            <li>
                                <a href="#info-we-collect">2. Information We Collect</a>
                            </li>
                            <li>
                                <a href="#how-we-use">3. How We Use Your Information</a>
                            </li>
                            <li>
                                <a href="#sharing-info">4. Sharing of Information</a>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <section className="privacy-content col">
                        <div id="introduction" className="policy-section">
                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to [ My Store ]. We are committed to protecting your
                                privacy and ensuring that your personal information is handled
                                securely and responsibly. This Privacy Policy outlines our practices
                                regarding the collection, use, and disclosure of your information
                                when you use our services.
                            </p>
                        </div>

                        <div id="info-we-collect" className="policy-section">
                            <h2>2. Information We Collect</h2>
                            <p>
                                <strong>Personal Information:</strong> We may collect personal
                                information such as your name, email address, phone number, and
                                other identifying details when you register, contact us, or make a
                                purchase.
                            </p>
                            <p>
                                <strong>Usage Data:</strong> We collect information about how you
                                use our website and services, such as IP address, browser type,
                                pages visited, and the time and date of your visit.
                            </p>
                        </div>

                        <div id="how-we-use" className="policy-section">
                            <h2>3. How We Use Your Information</h2>
                            <p>
                                We use the information we collect to provide, improve, and secure
                                our services, process transactions, and communicate with you.
                            </p>
                        </div>

                        <div id="sharing-info" className="policy-section">
                            <h2>4. Sharing of Information</h2>
                            <p>
                                We do not sell your personal information. We may share information
                                with trusted third-party partners to assist in delivering our
                                services or when required by law.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
