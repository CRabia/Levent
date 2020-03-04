import React, { useState, useEffect } from "react";
import EventService from "../services/event.service";

const Card = props => {
    const idEvent = props.idEvent;
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [pathImage, setPathImage] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const getEvent = async () => {
            let response = await EventService.details(idEvent);
            if (response.ok) {
                let data = await response.json();
                setTitle(data.event.title);
                setPrice(data.event.price);
                setPathImage(data.event.pathImage);
                setCity(data.event.addresses[0].city);
            }
        };

        getEvent();
    }, []);

    return (
        <div className="card-component">
            <div className="card-illustration">
                {pathImage && (
                    <img
                        src={`http://localhost:3001/public/${pathImage}`}
                        width="auto"
                        height="100%"
                        alt="image de l'event"
                    />
                )}
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p className="price">{price}</p>
                <p className="city">{city}</p>
            </div>
        </div>
    );
};
export default Card;
