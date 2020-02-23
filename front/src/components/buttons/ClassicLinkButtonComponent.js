import React from "react";
import { Link } from "react-router-dom";

const ClassicLinkButton = props => {
    return (
        <Link to={props.path} className="no-style">
            <button className="btn-classic">Editer</button>
        </Link>
    );
};

export default ClassicLinkButton;
