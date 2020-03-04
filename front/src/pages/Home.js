import React, { useEffect, useState } from "react";
import Card from "../components/CardComponent";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import EventService from "../services/event.service";

const Home = () => {
    const [events, setEvents] = useState([]);

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

        const getEvent = async () => {
            let response = await EventService.listEventsLimit();
            if (response.ok) {
                let data = await response.json();
                console.log(data.events);
                setEvents(data.events);
            }
        };

        getEvent();

        setTimeout(animationSlideTop, 500);
    }, []);

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
                {events[0] && (
                    <div className="illustration">
                        <div className="display-card" id="position-top">
                            <Card event={events[0]} />
                        </div>
                        <div className="display-card" id="position-middle">
                            <Card event={events[1]} />
                            <Card event={events[2]} />
                        </div>
                        <div className="display-card" id="position-bottom">
                            <Card event={events[3]} />
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
