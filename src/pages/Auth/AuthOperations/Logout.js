import axios from "axios"
import { LOGOUT, baseURL } from "../../../API/Api"
import Cookie from 'cookie-universal';

export default function Logout() {

    // ================ Cookie ==================
    const cookie = Cookie();


    async function handelLogout() {
        try {
           const res = await axios.get(`${baseURL}/${LOGOUT}`, {
            headers: {
                Authorization: "Bearer" + cookie.get("e-commerce"),
            },
           });
           console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return <button onClick={handelLogout}>Logout</button>
}