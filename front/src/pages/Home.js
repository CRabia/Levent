import React, { Component } from "react";
import Card from "../components/CardComponent";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default class Home extends Component {
    componentDidMount() {
        setTimeout(this.animationSlideTop, 500);
    }

    animationSlideTop = () => {
        document
            .getElementById("position-top")
            .classList.toggle("active-animation");
        setTimeout(this.animationSlideMiddle, 500);
    };

    animationSlideMiddle = () => {
        document
            .getElementById("position-middle")
            .classList.toggle("active-animation");
        setTimeout(this.animationSlideBottom, 500);
    };

    animationSlideBottom = () => {
        document
            .getElementById("position-bottom")
            .classList.toggle("active-animation");
    };

    render() {
        return (
            <div id="homepage">
                <section className="banner-home">
                    <div className="content">
                        <img
                            src={logo}
                            className="logo"
                            alt="Logo Levent - Découvrez les activitées près de chez vous."
                        />
                        <h1>
                            Découvrez toutes les activitées près de chez vous
                        </h1>
                        <p>
                            En vous inscrivant vous pourrez participer à pleins
                            d'activitées près de chez vous !
                        </p>
                        <div className="container-button">
                            <Link to="/inscription">
                                <button className="btn-rounded-100 btn-violet">
                                    Inscrivez-vous
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="illustration">
                        <div className="display-card" id="position-top">
                            <Card />
                        </div>
                        <div className="display-card" id="position-middle">
                            <Card />
                            <Card />
                        </div>
                        <div className="display-card" id="position-bottom">
                            <Card />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
