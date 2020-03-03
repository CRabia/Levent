import React, { useEffect, useState } from "react";
import EventService from "../../services/event.service";

const Event = props => {
    const idEvent = props.match.params.idEvent;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getEvent = async () => {
            let response = await EventService.details(idEvent);
            if (response.ok) {
                let data = await response.json();
                setTitle(data.event.title);
                setDescription(data.event.description);
                setPrice(data.event.price);
            }
        };

        getEvent();
    }, []);
    return (
        <div id="detail-event">
            <section className="container-detail-event">
                <div className="content">
                    <header>
                        <div className="illustration"></div>
                        <div className="profil_user">
                            <div className="body">
                                <div className="picture"></div>
                                <p className="username"> George Makley</p>
                                <p>A créé 38 événements</p>
                            </div>
                            <footer>
                                <button className="btn"> Ajouter en ami</button>
                            </footer>
                        </div>
                    </header>
                    <div className="detail">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <p>{price}</p>
                    </div>
                </div>
                <iframe
                    className="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2338.423527111631!2d2.370487659746385!3d48.862183395740054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1583196825795!5m2!1sfr!2sfr"
                    width=""
                    height=""
                    frameBorder="0"
                    allowFullScreen=""
                ></iframe>
            </section>
        </div>
    );
};

export default Event;
