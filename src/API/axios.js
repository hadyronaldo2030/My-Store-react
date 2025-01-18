import axios from "axios";
import { baseURL } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();

export const Axios = axios.create({
    baseURL: baseURL,
});

// إعداد التوكن ديناميكيًا قبل كل طلب
Axios.interceptors.request.use((config) => {
    const token = cookie.get("e-commerce");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// معالجة أخطاء المصادقة
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized. Redirecting to login...");
            cookie.remove("e-commerce");
            window.location.pathname = "/login";
        }
        return Promise.reject(error);
    }
);
