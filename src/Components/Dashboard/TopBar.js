
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { faBars} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useContext, useState } from "react"
import { Menu } from "../../Context/MenuContext"
import { NavLink, useNavigate } from "react-router-dom";
import { LOGOUT, USER } from "../../API/Api";
import { Axios } from "../../API/axios";
import Cookie from 'cookie-universal';

export default function TopBar () {
    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const navigate = useNavigate();
    const cookie = Cookie();

    const [ name , setName ] = useState("");

    // Get User
    useEffect(() => {
        Axios.get(`/${USER}`)
        .then((data) => setName(data.data.name))
        .catch(() => navigate("/login" , { replace: true }));
    }, [navigate]);

    // logout
    async function handelLogout() {
        try {
           const res = await Axios.get(`/${LOGOUT}`);
        //    حذف الجلسه من الكوكيز والرجوع الى تسجيل التدخول
           cookie.remove("e-commerce")
           window.location.pathname="/login";
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <NavLink to={"/"} className="logo">
                <h4>My Store</h4>
            </NavLink>
            <div className="w-auto top-bar d-flex align-items-center justify-content-between">
                <DropdownButton className='btn btn-sm mx-2' id="dropdown-basic-button" title={name}>
                    <Dropdown.Item onClick={handelLogout}>Logout</Dropdown.Item>
                </DropdownButton>
                <FontAwesomeIcon 
                    onClick={() => setIsOpen((prev) => !prev)}
                    cursor={"pointer"} 
                    icon={faBars}
                    />
            </div>
        </div>
    )
}