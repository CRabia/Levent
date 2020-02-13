import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth.context";
import LogoutButton from "../components/buttons/LogoutButtonComponent";
import NavigationTab from "../components/NavigationTabComponent";

export default class Header extends Component {
    state = {
        classMenu: "transparent-nav-bar"
    };

    componentDidMount = async () => {
        window.addEventListener("scroll", this.handleScroll);
    };

    handleScroll = e => {
        const classMenu = window.scrollY > 25 ? "opaque-nav-bar" : "transparent-nav-bar";
        this.setState({ classMenu });
    };

    render() {
        return (
            <AuthContext.Consumer>
                {context => (
                    <div id="menu" className={`${this.state.classMenu} ${this.props.theme}`}>
                        <NavigationTab name="Home" path="/" />
                        <NavigationTab name="Contact" path="/contact" />
                        {context.isAdmin && <NavigationTab name="Dashboard" path="/admin/dashboard" />}
                        {context.isAuth ? (
                            <div className="flex">
                                <NavigationTab name={context.currentUserFirstname} path="/" />
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
                )}
            </AuthContext.Consumer>
        );
    }
}
