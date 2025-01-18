import { React } from "react";
import { Link } from 'react-router-dom';
import "../../../pages/Website/HomePage/Home.css";
import Offer_1 from '../../../Asstes/Images/Home/ski.png';
import "./Offer.css"

export default function Offer1Item() {


    return (
        <div className="container my-6">
            <div className="Offer_1_Item m-0 p-0">
                <div className="offer_1">
                    <div className="card_Offer" style={{borderRight: '2px solid rgb(238 238 238 / 30%)'}}>
                        <div className="text_offers d-flex  align-items-center">
                            <h1 className="text-light">40</h1>
                            <span className="d-flex flex-column align-items-center mx-2">
                                <h2 className="text-light">%</h2>
                                <h4 className="text-light">OFF</h4>
                            </span>
                        </div>
                        <h4 className="text-light">2024 Collection</h4>
                    </div>
                    <div className="card_Offer right_text text-light">
                        <h4 className="text-light">We are the Leading</h4>
                        <h2 className="text-light">Ski Tool Saler in US</h2>
                        <Link to={"/"} className='btn-sm text-light text-decoration-underline d-table mt-3 fw-light'>
                            Shop B&O Beoplay
                            <i class="fa-regular fa-arrow-right-long mx-2"></i>
                        </Link>
                    </div>
                    <div className="image_floting">
                        <img src={Offer_1} alt="offer_1" />
                    </div>
                </div>

            </div>
        </div>
    );
}