import { React } from "react";
import { Link } from 'react-router-dom';
import "../../../pages/Website/HomePage/Home.css";
import "./Offer.css"
export default function Offer2Item() {


    return (
        <div className="container my-6">
            <div className="row gap-3 Offer_2_Item m-0 p-0">
                <div className="col-lg col-sm-12 offer_1">
                    <div className="card_Offer text-dark">
                        <h4 className="text-dark">Super Sale</h4>
                        <h2 className="text-dark">B&O Beoplay. Save</h2>
                        <Link to={"/"} className='btn-sm text-dark text-decoration-underline d-table fw-light'>
                            Shop Iphone Red
                            <i class="fa-regular fa-arrow-right-long mx-2"></i>
                        </Link>
                    </div>
                </div>
                <div className="col-lg col-sm-12 offer_2 ">
                    <div className=" card_Offer text-white">
                        <h4 className="text-white">Deals Good</h4>
                        <h2 className="text-white">Cellphone Ultra. Save</h2>
                        <Link to={"/"} className='btn-sm text-white text-decoration-underline d-table fw-light'>
                            Shop B&O Beoplay
                            <i class="fa-regular fa-arrow-right-long mx-2"></i>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}