import React, { useState, useEffect } from "react";

const Card = props => {
    return (
        <div className="card-component">
            <div className="card-illustration">
                {props.event.pathImage && (
                    <img
                        src={`http://localhost:3001/public/${props.event.pathImage}`}
                        width="auto"
                        height="100%"
                        alt="image de l'event"
                    />
                )}
            </div>
            <div className="card-content">
                <h3>{props.event.title}</h3>
                <p className="price">{props.event.price}</p>
                <p className="city">{props.event.addresses[0].city}</p>
            </div>
        </div>
    );
};
export default Card;
