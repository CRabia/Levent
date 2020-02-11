import React, { Component } from "react";
import logo from "../logo.png";
import FormContact from "../components/FormContactComponent";

export default class Contact extends Component {
    render() {
        return (
            <div id="contact-page">
                <section className="banner-home">
                    <div className="content">
                        <img src={logo} className="logo" />
                        <h1>Votre avis nous intéresse, alors contactez nous</h1>
                        <p>
                            Vous pouvez nous ecrire en utilisant le formulaire
                            prévu à cet effet
                        </p>
                        <div className="container-button">
                            <button className="btn-rounded-100 btn-violet">
                                Plus d'information
                            </button>
                        </div>
                    </div>
                    <div className="container-form">
                        <FormContact />
                    </div>
                </section>
                <section className="other-information">
                    <div className="information">
                        <h2>Autres informations</h2>
                        <label>Localisation</label>
                        <p>15 rue paradis Paris 15ème</p>
                        <label>Téléphone</label>
                        <p>06 06 06 06 06</p>
                        <label>Email</label>
                        <p>contact@levent.io</p>
                    </div>
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.137042109021!2d2.351530615903396!3d48.874664007514575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e131990d9b7%3A0x99ffec00d7b98dc4!2s15%20Rue%20de%20Paradis%2C%2075010%20Paris!5e0!3m2!1sfr!2sfr!4v1580943145414!5m2!1sfr!2sfr"
                            frameBorder="0"
                            allowFullScreen=""
                        />
                    </div>
                </section>
            </div>
        );
    }
}
