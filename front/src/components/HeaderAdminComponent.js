import React from "react";
import NavigationTab from "./NavigationTabComponent";
import LogoutButton from "./buttons/LogoutButtonComponent";

const HeaderAdmin = props => {
    return (
        <nav id="menu" className={`${props.theme}`}>
            <NavigationTab name="Dashboard" path="/admin/dashboard" />
            <NavigationTab name="User" path="/admin/user" />
            <NavigationTab name="Comment" path="/admin/comment" />
            <NavigationTab name="Event" path="/admin/event" />
            <LogoutButton />
        </nav>
    );
};

export default HeaderAdmin;
