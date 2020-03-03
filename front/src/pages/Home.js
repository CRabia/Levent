import React, { useEffect } from "react";
import Card from "../components/CardComponent";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Home = () => {
    useEffect(() => {
        const animationSlideTop = () => {
            document.getElementById("position-top") &&
                document.getElementById("position-top").classList.toggle("active-animation");
            setTimeout(animationSlideMiddle, 500);
        };

        const animationSlideMiddle = () => {
            document.getElementById("position-middle") &&
                document.getElementById("position-middle").classList.toggle("active-animation");
            setTimeout(animationSlideBottom, 500);
        };

        const animationSlideBottom = () => {
            document.getElementById("position-bottom") &&
                document.getElementById("position-bottom").classList.toggle("active-animation");
        };

        setTimeout(animationSlideTop, 500);
    });

    return (
        <div id="homepage">
            <section className="banner-home">
                <div className="content">
                    <img src={logo} className="logo" alt="Logo Levent - Découvrez les activitées près de chez vous." />
                    <h1>Découvrez toutes les activitées près de chez vous</h1>
                    <p>En vous inscrivant vous pourrez participer à pleins d'activitées près de chez vous !</p>
                    <div className="container-button">
                        <Link to="/inscription">
                            <button className="btn-rounded-100 btn-violet">Inscrivez-vous</button>
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
};

export default Home;
