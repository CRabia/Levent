import React, { Component } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

export default class Header extends Component {
  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="menu">
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
        <div className="item-nav vertical-center">
          <Link to="/contact">
            <p>Contact</p>
          </Link>
        </div>

        <div className="item-nav vertical-center">
          <Link to="/connexion">
            <p>Connexion</p>
          </Link>
        </div>

        <div className="item-nav vertical-center">
          <Link to="/inscription">
            <button className=" btn-rounded-100 btn-violet">Inscription</button>
          </Link>
        </div>
      </div>
    );
  }
}
