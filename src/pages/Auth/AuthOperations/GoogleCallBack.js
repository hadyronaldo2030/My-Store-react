import axios from "axios";
import { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseURL} from "../../../API/Api";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookie from "cookie-universal";

export default function GoogleCallBack () {
    const cookie = Cookie();
    const location = useLocation();
    
    const navigate = useNavigate();

    useEffect(() =>{
        async function GoogleCall() {
            try {
                const res = await axios.get(
                    `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
                    );
                const token = res.data.access_token;
                cookie.set('e-commerce', token);
                // انتقل الى صفحة وحدة التحكم
                navigate("/dashboard/users", {replace: true});
            } catch (err) {
                console.log(err);
            }
        }
        GoogleCall();
    }, []);
    return <h1>test</h1>
}