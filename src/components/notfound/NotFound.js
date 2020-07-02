import React from "react";
import {Link} from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return(
        <div className="NotFound">
            <h1 className="NotFound-title">
                Page Not Found
            </h1>
            <Link 
                className="NotFound-link"
                to="/">
                    Go To Home Page
            </Link>
        </div>
    );
}

export default NotFound;