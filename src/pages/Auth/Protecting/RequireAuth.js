import { useNavigate, Outlet } from "react-router-dom";
import Cookie from 'cookie-universal';
import { useEffect , useState } from "react";
import { USER } from "../../../API/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../API/axios";
import Error403 from './../Errors/403';

export default function RequireAuth({ allowedRole }) {

    // users
    const [user, setUser] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {
        Axios.get(`/${USER}`)
        .then((data) => setUser(data.data))
        .catch(() => Navigate("/login" , { replace: true }));
    }, []);

    // cookie & token
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    
    return token ? (
        // اثناء التحقق من المستخدم
        user === "" ? (
            // اظهر اللودنج
            <Loading />
            ) : allowedRole.includes(user.role) ? (
            // اذا تم العثور على المستخدم اظهر الاوتليت
            <Outlet />
            ) : (
            // اذا كان ليس له الصلاحية اظهر صفحة الخطأ
            <Error403 role={user.role}/>
            )
            ) : (
        <Navigate to={"/login"} replace={true} />
    );
}


// بعد التحقق من تسجيل الدخول امنح المستخدم من الدخول الى وحدات التحكم 
// يتم استدعاؤها فى 
// 1- Register
// 2- Login