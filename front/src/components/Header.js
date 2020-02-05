import React, { Component } from "react";
import logo from "../logo.png";

export default class Header extends Component {
  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="menu">
        <img src={logo} className="logo" />
        <div className="item-nav vertical-center">
          <p>Contact</p>
        </div>
        <div className="item-nav vertical-center">
          <p>Connexion</p>
        </div>
        <div className="item-nav vertical-center">
          <button className=" btn-rounded-100 btn-violet">Inscription</button>
        </div>
      </div>
    );
  }
}
