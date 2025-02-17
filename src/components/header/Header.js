import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="container">

                <div className="header-container">

                    <Link to="/">
                        <img src="/images/image 21.png" alt="logo" />
                    </Link>

                    <div className="header-title">
                        <span>당신의 공간을 구름비앤비하세요.</span>

                        <div className="header-profile">
                            <FontAwesomeIcon className="header-profile-icon" icon={faUser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;