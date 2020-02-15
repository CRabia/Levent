import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const Dasboard = () => {
    const [countUser, setCountUser] = useState(0);
    const [countUserParticipatedEvent, setCountUserPerMonth] = useState(0);
    const [countEvent, setCountEvent] = useState(0);
    const [countCategory, setCountCategory] = useState(0);

    const getUserStatistic = async () => {
        let response = await UserService.list();
        if (response.ok) {
            let data = await response.json();
            setCountUser(data.users.length);
        }
    };

    useEffect(() => {
        getUserStatistic();
    }, []);

    return (
        <div id="dashboard-admin" className="page-admin">
            <h1>Dashboard</h1>
            <div className="container-header-part">
                <div className="header-part">
                    <div className="item-header orange">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Utilisateurs</h3>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="item-header pink">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Utilisateurs</h3>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="item-header violet">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Utilisateurs</h3>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="item-header blue">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Utilisateurs</h3>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="part-page">
                <div className="column">
                    <div className="box inset">
                        <h2>Utilisateur</h2>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur sur la plateforme :</label>
                            <p>{countUser}</p>
                            <label>Nombre d'utilisateur participant à des événements :</label>
                            <p>{countUserParticipatedEvent}</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="box">
                        <h2>Evènement</h2>
                        <div className="para-statistic">
                            <label>Nombre d'évènements :</label>
                            <p>{countEvent}</p>
                        </div>
                        <div className="para-statistic">
                            <label>Nombre de catérorie :</label>
                            <p>{countCategory}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="part-page">
                <div className="column">
                    <div className="box">
                        <h2>Evènement</h2>
                        <div className="para-statistic">
                            <label>Nombre d'évènements :</label>
                            <p>{countEvent}</p>
                        </div>
                        <div className="para-statistic">
                            <label>Nombre de catérorie :</label>
                            <p>{countCategory}</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="box inset">
                        <h2>Utilisateur</h2>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur sur la plateforme :</label>
                            <p>{countUser}</p>
                            <label>Nombre d'utilisateur participant à des événements :</label>
                            <p>{countUserParticipatedEvent}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dasboard;
