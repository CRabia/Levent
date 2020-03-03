import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import LogoutButton from "../buttons/LogoutButtonComponent";
import NavigationTab from "./NavigationTabComponent";

const Header = props => {
    const [classMenu, setClassMenu] = useState("transparent-nav-bar");

    const { state } = useContext(AuthContext);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        let classM = window.scrollY > 25 ? "opaque-nav-bar" : "transparent-nav-bar";
        setClassMenu(classM);
    };

    return (
        <div id="menu" className={`${classMenu} ${props.theme}`}>
            <NavigationTab name="Home" path="/" />
            <NavigationTab name="Contact" path="/contact" />
            {state.isAdmin && <NavigationTab name="Dashboard" path="/admin/dashboard" />}
            {state.isAuth ? (
                <div className="flex">
                    <NavigationTab name={state.user.firstname} path="/user/dashboard" />
                    <LogoutButton theme="light" />
                </div>
            ) : (
                <div className="flex">
                    <NavigationTab name="Connexion" path="/connexion" />
                    <div className="item-nav vertical-center">
                        <Link to="/inscription">
                            <button className=" btn-rounded-100 btn-violet">Inscription</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
