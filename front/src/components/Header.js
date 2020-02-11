import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth.context";

export default class Header extends Component {
    state = {
        classMenu: "transparent-nav-bar"
    };

    componentDidMount = async () => {
        window.addEventListener("scroll", this.handleScroll);
    };

    handleScroll = e => {
        const classMenu =
            window.scrollY > 25 ? "opaque-nav-bar" : "transparent-nav-bar";
        this.setState({ classMenu });
    };

    render() {
        return (
            <AuthContext.Consumer>
                {context => (
                    <div id="menu" className={`${this.state.classMenu}`}>
                        <div className="item-nav vertical-center">
                            <Link to="/">
                                <p>Home</p>
                            </Link>
                        </div>
                        <div className="item-nav vertical-center">
                            <Link to="/contact">
                                <p>Contact</p>
                            </Link>
                        </div>
                        {context.isAuth ? (
                            <div className="flex">
                                <div className="item-nav vertical-center">
                                    <Link to="/">
                                        <p>{context.currentUserFirstname}</p>
                                    </Link>
                                </div>
                                <div className="item-nav vertical-center">
                                    <button
                                        onClick={context.logOut}
                                        className=" btn-rounded-100 btn-violet"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex">
                                <div className="item-nav vertical-center">
                                    <Link to="/connexion">
                                        <p>Connexion</p>
                                    </Link>
                                </div>
                                <div className="item-nav vertical-center">
                                    <Link to="/inscription">
                                        <button className=" btn-rounded-100 btn-violet">
                                            Inscription
                                        </button>
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
