import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Cookie from 'cookie-universal';
import { useUser } from '../../../Context/UserContext';
import { Axios } from '../../../API/axios';
import { LOGOUT } from '../../../API/Api';

export default function TopNav() {
    // Translation hooks
    const { t, i18n } = useTranslation();

    // استخدام الـ Context لجلب بيانات المستخدم
    const { user, loading, error } = useUser();  // جلب بيانات المستخدم من الـ Context

    // Cookie management
    const cookie = Cookie();

    // State to manage the selected language (default is 'en' or fetched from localStorage)
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    // Change the language and update page direction (RTL/LTR)
    useEffect(() => {
        i18n.changeLanguage(language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language, i18n]);

    // Function to toggle language and save the preference in localStorage
    const toggleLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await Axios.get(`/${LOGOUT}`); // Perform logout API call
            cookie.remove("e-commerce"); // Remove authentication cookie
            window.location.pathname = "/login"; // Redirect to login page
        } catch (err) {
            console.error("Logout error:", err); // Log any errors during logout
        }
    };

    // عرض حالة التحميل أو الخطأ
    if (loading) {
        return <div>Loading...</div>; // يمكنك عرض شاشة التحميل هنا
    }

    if (error) {
        return <div>Error: {error.message}</div>; // عرض رسالة خطأ إذا حدث خطأ في جلب بيانات المستخدم
    }

    return (
        <div className="container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="top_nav">
                {/* Contact Info Section */}
                <div className="d-none d-md-flex" style={{ fontSize: '14px' }}>
                    <div>
                        <span className="text-orange">{t('email')}</span>
                        <span className="text-light">{t('supportEmail')}</span>
                    </div>
                    <div className="mx-3">
                        <span className="text-orange">{t('tel')}</span>
                        <span className="text-light">{t('phoneNumber')}</span>
                    </div>
                </div>

                <div className="nav_item">
                    {/* Currency or any static text */}
                    <span>
                        <span style={{ fontSize: '14px' }}>{t('currency')}</span>
                    </span>

                    {/* Language Selection */}
                    <select
                        className="select-tap"
                        onChange={(e) => toggleLanguage(e.target.value)}
                        value={language}
                    >
                        <option value="ar">عربى</option>
                        <option value="en">En</option>
                    </select>

                    {/* Profile and Logout Dropdown */}
                    <span>
                        <DropdownButton title={user ? user.name : t('guest')}> {/* Fallback to 'guest' if no user */}
                            <Dropdown.Item>
                                <Link to={`/profile/${user ? user.id : ''}`}>{t('profile')}</Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>{t('logout')}</Dropdown.Item>
                        </DropdownButton>
                    </span>
                </div>
            </div>
        </div>
    );
}
