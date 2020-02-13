import React from "react";
import NavigationTab from "./NavigationTabComponent";
import LogoutButton from "./buttons/LogoutButtonComponent";

const HeaderAdmin = props => {
    return (
        <nav id="menu" className={`${props.theme}`}>
            <NavigationTab name="Dashboard" path="/admin/dashboard" />
            <NavigationTab name="Utilisateur" path="/admin/user" />
            <NavigationTab name="Commentaire" path="/admin/comment" />
            <NavigationTab name="Categorie" path="/admin/category" />
            <NavigationTab name="Evénement" path="/admin/event" />
            <LogoutButton />
        </nav>
    );
};

export default HeaderAdmin;
