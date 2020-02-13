import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const Dasboard = () => {
    const [countUser, setCountUser] = useState(0);

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
        <div id="dashboard-admin" className="template-admin">
            <h1>Dashboard</h1>
            <div className="first-part-page">
                <div className="column">
                    <div className="box white">
                        <h2>Utilisateur</h2>
                        <div className="para-statistic">
                            <label>Nombre d'utilisateur sur la plateforme :</label>
                            <p>{countUser}</p>
                        </div>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </div>
    );
};

export default Dasboard;
