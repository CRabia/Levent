import React from "react";

const HeaderTab = props => {
    return (
        <div className="header-bar">
            <label>{props.textLabel}</label>
            {props.children}
        </div>
    );
};

export default HeaderTab;
