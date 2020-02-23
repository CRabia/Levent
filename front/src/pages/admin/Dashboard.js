import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventService from "../../services/event.service";
import CategoryService from "../../services/category.service";

const Dasboard = () => {
    const [countUser, setCountUser] = useState(0);
    const [countEvent, setCountEvent] = useState(0);
    const [countCategory, setCountCategory] = useState(0);
    const [lastUsers, setLastUsers] = useState([]);

    useEffect(() => {
        const getUserStatistic = async () => {
            let response = await UserService.list();
            if (response.ok) {
                let data = await response.json();
                setCountUser(data.users.length);
                setLastUsers(data.users.slice(Math.max(data.users.length - 5, 1)));
            }
        };

        const getEventStatistic = async () => {
            let response = await EventService.list();
            if (response.ok) {
                let data = await response.json();
                setCountEvent(data.events.length);
            }
        };

        const getCategoryStatistic = async () => {
            let response = await CategoryService.list();
            if (response.ok) {
                let data = await response.json();
                setCountCategory(data.categories.length);
            }
        };

        getUserStatistic();
        getEventStatistic();
        getCategoryStatistic();
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
                            <p>{countUser}</p>
                        </div>
                    </div>
                    <div className="item-header pink">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Nouveaux commentaires</h3>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="item-header violet">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Nouveaux événements</h3>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="item-header blue">
                        <div className="illustration"></div>
                        <div className="content">
                            <h3>Catégorie</h3>
                            <p>{countCategory}</p>
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
                        </div>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur participant à des événements :</label>
                            <p></p>
                        </div>
                        <div className="para-statistic">
                            <label>Voici les derniers inscrits :</label>
                            <table>
                                <tbody>
                                    {lastUsers.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.firstname}</td>
                                                <td>{item.lastname}</td>
                                                <td>Voir</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="box white">
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
                    <div className="box white">
                        <h2>Utilisateur</h2>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur sur la plateforme :</label>
                            <p>{countUser}</p>
                        </div>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur sur la plateforme :</label>
                            <p>{countUser}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dasboard;
