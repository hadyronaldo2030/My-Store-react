import { Link } from "react-router-dom";
import "./error.css";
import img404 from "./error404.png";

export default function Error404({ role }) {
    return (
        <section className="container d-flex flex-column align-items-center">
            <div className="text">
                <img src={img404} className="imgError" alt="403"/>
                <h1>You do not have permission to login</h1>
            </div>
            <Link 
                to={role === "1996" ? "/dashboard/writer" : "/"} 
                className="btn btn-primary"
                >
                    {role === "1996" ? "Go To Writer Page" : "Go To Home page"}
                </Link>
        </section >          
    );
}
