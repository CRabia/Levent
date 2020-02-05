import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="menu">
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
