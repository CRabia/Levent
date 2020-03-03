import React, { useState, useEffect } from "react";
import EventService from "../services/event.service";

const Card = props => {
    const idEvent = props.idEvent;
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const getEvent = async () => {
            let response = await EventService.details(idEvent);
            if (response.ok) {
                let data = await response.json();
                setTitle(data.event.title);
                setPrice(data.event.price);
            }
        };

        getEvent();
    }, []);

    return (
        <div className="card-component">
            <div className="card-illustration"></div>
            <div className="card-content">
                <h3>{title}</h3>
                <p className="price">{price}</p>
            </div>
        </div>
    );
};
export default Card;
