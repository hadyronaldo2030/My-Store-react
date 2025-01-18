import { React } from "react";
import { Link } from 'react-router-dom';
import "../../../pages/Website/HomePage/Home.css";
import "./Offer.css"
export default function Offer3Item() {


    return (
        <div className="container my-6">
            <div className="row gap-3 Offer_3_Item m-0 p-0">
                <div className="col-lg col-sm-12 offer_1">
                    <div className=" card_Offer">
                        <h4>Buy 1 Get 1</h4>
                        <span>Save Up To $569</span>
                        <Link to={"/"} className='btn-sm btn btn-light d-table mt-3'> Shop Surface </Link>
                    </div>
                </div>
                <div className="col-lg col-sm-12 offer_2 ">
                    <div className=" card_Offer">
                        <h4>Gamepad</h4>
                        <span>Save Up To $69 </span>
                        <Link to={"/"} className='btn-sm btn btn-light d-table mt-3'> Shop Surface </Link>
                    </div>
                </div>
                <div className="col-lg col-sm-12 offer_3">
                    <div className=" card_Offer">
                        <h4>Cameras</h4>
                        <span>Save Up To $569</span>
                        <Link to={"/"} className='btn-sm btn btn-light d-table mt-3'> Shop Surface </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}