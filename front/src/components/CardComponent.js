import React, { Component } from "react";

export default class Card extends Component {
    render() {
        return (
            <div className="card-component">
                <div className="card-illustration"></div>
                <div className="card-content">
                    <p className="title">Titre</p>
                    <p className="description">Description</p>
                </div>
            </div>
        );
    }
}
