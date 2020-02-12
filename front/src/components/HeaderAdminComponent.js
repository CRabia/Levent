import React from "react";
import logo from "../logo.png";
import NavigationTab from "./NavigationTabComponent";
import LogoutButton from "./buttons/LogoutButtonComponent";

const HeaderAdmin = props => {
    return (
        <nav id="menu" className={`${props.theme}`}>
            <NavigationTab name="Dashboard" path="/admin/dashboard" />
            <NavigationTab name="User" path="/admin/user" />
            <NavigationTab name="User" path="/admin/comment" />
            <LogoutButton theme="dark" />
        </nav>
    );
};

export default HeaderAdmin;
