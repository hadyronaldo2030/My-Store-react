import { React } from "react";
import "../../../pages/Website/HomePage/Home.css";
import "./Features.css"
export default function Features() {

    
    return (
        <div className="container my-6">
            <div className="row features">
                <div className="features_item col-lg-3 col-6 d-flex justify-content-center align-items-center">
                    <i class="icofont-headphone-alt icon_feature"></i>
                    <div className="text_features">
                        <h4>Support 24-h</h4>
                        <span>Quick Support</span>
                    </div>
                </div>
                <div className="features_item col-lg-3 col-6 d-flex justify-content-center align-items-center">
                    <i class="icofont-gift icon_feature"></i>
                    <div className="text_features">
                        <h4>Smart Gift Card</h4>
                        <span>Buy $1000 to get card</span>
                    </div>
                </div>
                <div className="features_item col-lg-3 col-6 d-flex justify-content-center align-items-center">
                    <i class="icofont-vehicle-delivery-van icon_feature" style={{ transform: 'scaleX(-1)'}}></i>
                    <div className="text_features">
                        <h4>Free Shipping</h4>
                        <span>Orders Over $100</span>
                    </div>
                </div>
                <div className="features_item col-lg-3 col-6 d-flex justify-content-center align-items-center">
                    <i class="icofont-wallet icon_feature"></i>
                    <div className="text_features">
                        <h4>Quick Payment</h4>
                        <span>100% Secure Payment</span>
                    </div>
                </div>

            </div>
        </div>
    );
}