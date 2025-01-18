import { Link } from 'react-router-dom'
import './Footer.css'
export default function Footer() {
    return (
        <footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row z-1 position-sticky">
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInLeft' }}>
                                <h3 className="f-title f_600 t_color f_size_18">Menu</h3>
                                <ul className="list-unstyled f_list">
                                    <li><Link to="">Home</Link></li>
                                    <li><Link to="">Shop</Link></li>
                                    <li><Link to="">Categories</Link></li>
                                    <li><Link to="">Wishlist</Link></li>
                                    <li><Link to="">My Orders</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInLeft' }}>
                                <h3 className="f-title f_600 t_color f_size_18">Shop</h3>
                                <ul className="list-unstyled f_list">
                                    <li><Link to="">Toy</Link></li>
                                    <li><Link to="">Android App</Link></li>
                                    <li><Link to="">ios App</Link></li>
                                    <li><Link to="">Desktop</Link></li>
                                    <li><Link to="">Projects</Link></li>
                                    <li><Link to="">My tasks</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{ visibility: 'visible', animationDelay: '0.6s', animationName: 'fadeInLeft' }}>
                                <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                                <ul className="list-unstyled f_list">
                                    <li><Link to="">FAQ</Link></li>
                                    <li><Link to="">Term &amp; conditions</Link></li>
                                    <li><Link to="">Reporting</Link></li>
                                    <li><Link to="">Documentation</Link></li>
                                    <li><Link to="">Support Policy</Link></li>
                                    <li><Link to="/PrivacyPolicy">Privacy</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInLeft' }}>
                                <h3 className="f-title f_600 t_color f_size_18">About</h3>
                                <div className="f_social_icon mb-3">
                                    <Link to="" className="fab fa-facebook"></Link>
                                    <Link to="" className="fab fa-twitter"></Link>
                                    <Link to="" className="fab fa-linkedin"></Link>
                                    <Link to="" className="fab fa-pinterest"></Link>
                                </div>
                                <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                                    <input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
                                    <button className="btn btn_get btn_get_two" type="submit">Subscribe</button>
                                    <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                                    <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">© Story Inc.. 2024 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 col-sm-5 text-right">
                            <p>Made with <i className="icon_heart"></i> in <Link to={"/"} rel="noopener noreferrer">Story</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}