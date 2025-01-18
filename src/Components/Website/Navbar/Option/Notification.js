import React from "react";
import { Link } from 'react-router-dom';

export default function NotificationsPage({ isVisible }) {
    if (!isVisible) return null; // لا تعرض النافذة إذا كانت isVisible هي false

    return (
        <div className="container notifications-container shadow">
            <div className="row header">
                <div className="col-7 p-0">
                    <p className="title m-0 py-2">
                        Notifications
                        <span className="unread-notifications-number">(3)</span>
                    </p>
                </div>
                <div className="col-5 px-0 py-2 mark-as-read text-end">
                    <Link to={"/"} id="markAllAsRead" className="mark-as-read-button align-middle">See all</Link>
                </div>
            </div>

            <div className="row notifications">
                <div className="row single-notification-box unread">
                    <div className="col-1 profile-picture">
                        <img src={require("../../../../Asstes/Images/Home/avatar-anna-kim.webp")} className="img-fluid" alt="offer" />
                    </div>
                    <div className="col-11 notification-text">
                        <p>
                            <Link to={"/"} className="link name">hady rabie</Link>
                            <span className="description">lorem lorem lorem lorem lorem lorem </span>
                            <Link to={"/"} className="link">Link Text</Link>
                            <span className="unread-symbol">•</span>
                        </p>
                        <p className="time">3:30 ago</p>
                    </div>
                </div>
                <div className="row single-notification-box unread">
                    <div className="col-1 profile-picture">
                        <img src={require("../../../../Asstes/Images/Home/avatar-jacob-thompson.webp")} className="img-fluid" alt="offer" />
                    </div>
                    <div className="col-11 notification-text">
                        <p>
                            <Link to={"/"} className="link name">hady rabie</Link>
                            <span className="description">lorem lorem lorem lorem lorem lorem </span>
                            <Link to={"/"} className="link">Link Text</Link>
                            <span className="unread-symbol">•</span>
                        </p>
                        <p className="time">3:30 ago</p>
                    </div>
                </div>
                <div className="row single-notification-box unread">
                    <div className="col-1 profile-picture">
                        <img src={require("../../../../Asstes/Images/Home/favicon-32x32.png")} className="img-fluid" alt="offer" />
                    </div>
                    <div className="col-11 notification-text">
                        <p>
                            <Link to={"/"} className="link name">hady rabie</Link>
                            <span className="description">lorem lorem lorem lorem lorem lorem </span>
                            <Link to={"/"} className="link">Link Text</Link>
                            <span className="unread-symbol">•</span>
                        </p>
                        <p className="time">3:30 ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
