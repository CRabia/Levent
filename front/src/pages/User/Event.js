import React, { useEffect, useState, useContext, Fragment } from "react";
import EventService from "../../services/event.service";
import ParticipateService from "../../services/participate.service";
import { AuthContext } from "../../contexts/auth.context";

const Event = props => {
    const idEvent = props.match.params.idEvent;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [price, setPrice] = useState(0);
    const [created_on, setCreatedOn] = useState("");
    const [date, setDate] = useState("");
    const [publication, setPublication] = useState(0);
    const [typeOf, setTypeOf] = useState("");
    const [file, setFile] = useState({});
    const [pathImage, setPathImage] = useState("");
    const [participation, setParticipation] = useState("");

    const { state } = useContext(AuthContext);

    useEffect(() => {
        const initializeForm = e => {
            setTitle(e.title);
            setDescription(e.description);
            setWebsite(e.website);
            setPrice(e.price);
            setDate(new Date(e.date).toISOString().substr(0, 10));
            setCreatedOn(new Date(e.created_on).toISOString().substr(0, 10));
            setTypeOf(e.typeOf);
            setPublication(e.publicationStatus);
            setPathImage(e.pathImage);
        };

        const getEvent = async () => {
            let response = await EventService.details(idEvent);
            if (response.ok) {
                let data = await response.json();
                initializeForm(data.event);
            }
        };

        getEvent();
    }, []);

    useEffect(() => {
        const getParticipationToThisEvent = async () => {
            let response = await ParticipateService.findParticipation(state.user._id, idEvent);
            if (response.ok) {
                let data = await response.json();
                if (data.participation[0]) {
                    setParticipation(data.participation[0]._id);
                }
            }
        };

        getParticipationToThisEvent();
    }, [state.user]);

    const participateToEvent = async () => {
        let response = await ParticipateService.create(state.user._id, idEvent);
        if (response.ok) {
            let data = await response.json();
            setParticipation(data.newParticipation._id);
        }
    };

    const deleteParticipateToEvent = async () => {
        let response = await ParticipateService.delete(participation);
        if (response.ok) {
            setParticipation("");
        }
    };

    return (
        <div id="detail-event">
            <section className="container-detail-event">
                <div className="content">
                    <header>
                        <div className="illustration">
                            {pathImage && (
                                <img
                                    src={`http://localhost:3001/public/${pathImage}`}
                                    width="auto"
                                    height="100%"
                                    alt="image de l'event"
                                />
                            )}
                        </div>
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

                        {participation === "" ? (
                            <button className="btn-classic" onClick={participateToEvent}>
                                Participer à l'événement
                            </button>
                        ) : (
                            <Fragment>
                                <p>Vous participez à cette événement</p>
                                <button className="btn-classic red" onClick={deleteParticipateToEvent}>
                                    Ne plus participer à l'événement
                                </button>
                            </Fragment>
                        )}
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
