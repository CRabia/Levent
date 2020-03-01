import React, { useState } from "react";
import NavigationTab from "./NavigationTabComponent";
import arrow from "../../assets/img/arrow.png";
import burger from "../../assets/img/burger.png";

const HeaderAdmin = props => {
    const [headerHidden, setHeaderHidden] = useState(false);

    const hideHeader = () => {
        headerHidden ? setHeaderHidden(false) : setHeaderHidden(true);
    };

    return (
        <div className={`nav-responsive ${headerHidden && "header-hidden"}`}>
            <nav id="menu-admin" className={`${props.theme}`}>
                <header>
                    <div className="button-hide" onClick={hideHeader}>
                        {headerHidden ? (
                            <img src={burger} className="Arrow" alt="Logo Levent" width="25" />
                        ) : (
                            <img src={arrow} className="Burger" alt="Logo Levent" width="25" />
                        )}
                    </div>
                </header>
                <NavigationTab name="Dashboard" path="/admin/dashboard" />
                <NavigationTab name="Utilisateur" path="/admin/user" />
                <NavigationTab name="Commentaire" path="/admin/comment" />
                <NavigationTab name="Categorie" path="/admin/category" />
                <NavigationTab name="Evénement" path="/admin/event" />
            </nav>
        </div>
    );
};

export default HeaderAdmin;
