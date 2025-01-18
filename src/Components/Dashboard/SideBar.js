import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from './../../Context/WindowContext';
import { USER } from "../../API/Api";
import { Axios } from "../../API/axios";
import { links } from "./NavLink";

export default function SideBar() {
    const menu = useContext(Menu);
    const WindowContext = useContext(WindowSize);
    const windowSize = WindowContext.windowSize;
    const isOpen = menu.isOpen;

    // users
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`/${USER}`)
        .then((data) => setUser(data.data))
        .catch(() => navigate("/login" , { replace: true }));
    }, [navigate]);

    return (
        <>
            <div 
            style={{
                position: "fixed",
                top: "60px",
                left: "0",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: windowSize < "768" && isOpen ? "block" : "none",
            }}
            >  
            </div>
            <div 
                className="side-bar"
                style={{
                    left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
                    width: isOpen ? "255px" : "fit-content",
                    position: windowSize < "768" ? "fixed" : "sticky",
                    paddingTop: windowSize < "768" ? "70px" : "10px",
                }}>
                <ul className="metismenu list-unstyled" id="side-menu">

                    {/* اختصار الكود فى ملف جيسون وستدعاء القيم  */}
                    {links.map((link, key) => 
                        // لو قيمة المستخدم بتساوى القيمة الموجوده فى الباك اند اظهر الرابط 
                        link.role.includes(user.role) && (
                        <li className="w-100 d-block" key={key}>
                            <NavLink to={link.to}>
                                <FontAwesomeIcon 
                                style={{padding: isOpen ? '10px 8px 10px 15px' : '10px 4px'}}
                                icon={link.icon} 
                                />
                                <span 
                                className="mx-3" 
                                data-key="t-sales" 
                                style={{display: isOpen ? 'block' : 'none'}}       
                                >
                                    {link.name}
                                </span>
                            </NavLink>
                        </li>
                        )
                    )}

                </ul>
            </div>
        </>
    );
}
