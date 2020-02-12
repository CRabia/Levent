import React from "react";
import logo from "../../logo.png";
import NavigationTab from "./NavigationTabComponent";

const HeaderAdmin = () => {
    return (
        <nav id="menu-admin">
            <div className="vertical-center">
                <img
                    src={logo}
                    className="logo"
                    alt="Logo Levent - Découvrez les activitées près de chez vous."
                />
            </div>
            <div className="container-nav-center">
                <NavigationTab name="Dashboard" path="/admin/dashboard" />
                <NavigationTab name="User" path="/admin/user" />
            </div>
        </nav>
    );
};

export default HeaderAdmin;
