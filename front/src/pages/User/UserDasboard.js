import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import Card from "../../components/CardComponent";
import { Link } from "react-router-dom";
import EventService from "../../services/event.service";

const UserDashboard = () => {
    const [listOfEvent, setListOfEvent] = useState([]);

    const { state } = useContext(AuthContext);

    useEffect(() => {
        const initializeListOfEvent = async () => {
            let response = await EventService.list();
            if (response.ok) {
                let data = await response.json();
                setListOfEvent(data.events);
            }
        };

        initializeListOfEvent();
    }, []);

    return (
        <div id="user-dashboard">
            <div className="banner">
                <h1>Bienvenu sur votre tableau de bord {state.user.firstname}</h1>
            </div>
            <section className="container-dashboard">
                <div className="filter-event"></div>
                <div className="container-all-event">
                    {listOfEvent.map((event, key) => {
                        let pathEdit = "/user/event/" + event._id;
                        return (
                            <Link to={pathEdit} key={key}>
                                <Card idEvent={event._id} />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
