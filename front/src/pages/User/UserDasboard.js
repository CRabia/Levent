import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import Card from "../../components/CardComponent";
import { Link } from "react-router-dom";
import EventService from "../../services/event.service";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CategoryService from "../../services/category.service";

const Range = Slider.Range;

const UserDashboard = () => {
    const [listOfEvent, setListOfEvent] = useState([]);
    const [listOfCategory, setListOfCategory] = useState([]);

    //parameters of filter
    const [categoryId, setCategoryId] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [minBudget, setMinBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(1000);

    //result of filter
    var [result, setResult] = useState([]);

    const { state } = useContext(AuthContext);

    const handleBudget = value => {
        setMinBudget(value[0]);
        setMaxBudget(value[1]);
    };

    useEffect(() => {
        const initializeListOfEvent = async () => {
            let response = await EventService.listEventPublished();
            if (response.ok) {
                let data = await response.json();
                setListOfEvent(data.events);
                setResult(data.events);
            }
        };

        const initializeListOfCategory = async () => {
            let response = await CategoryService.listCategoryPublished();
            if (response.ok) {
                let data = await response.json();
                setListOfCategory(data.categories);
            }
        };

        initializeListOfCategory();
        initializeListOfEvent();
    }, []);

    const makeFilter = async () => {
        let tabResult = [];

        for (const element of listOfEvent) {
            let addElement = true;

            if (categoryId !== "") {
                if (element.categoryId !== categoryId) addElement = false;
            }

            if (searchCity !== "") {
                let regex = RegExp(searchCity.toLowerCase());
                let city = element.addresses[0].city.toLowerCase();
                if (!regex.test(city)) {
                    addElement = false;
                }
            }
            let priceElement = parseInt(element.price);
            if (parseInt(minBudget) > priceElement || priceElement > parseInt(maxBudget)) {
                addElement = false;
            }

            addElement && (await tabResult.push(element));
        }
        setResult(tabResult);
    };

    return (
        <div id="user-dashboard">
            <div className="banner">
                <h1>Bienvenu sur votre tableau de bord {state.user.firstname}</h1>
            </div>
            <section className="container-dashboard">
                <div className="filter-event">
                    <h2>Filtrer les événements</h2>
                    <div className="container-filter">
                        <div className="item-filer">
                            <label>Choisissez une catégorie</label>
                            <select className="category" onChange={e => setCategoryId(e.target.value)}>
                                <option value="">Aucune</option>
                                {listOfCategory.map((category, key) => {
                                    return (
                                        <option key={key} value={category._id}>
                                            {category.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="item-filer">
                            <label>Entrer le nom d'une ville</label>
                            <input type="text" onChange={e => setSearchCity(e.target.value)} />
                        </div>
                        <div className="item-filer">
                            <label>Entrer une fourchette de prix</label>
                            <Range defaultValue={[0, 1000]} min={0} max={1000} onChange={handleBudget} />
                            <p>
                                de {minBudget}€ à {maxBudget}€
                            </p>
                        </div>
                    </div>
                    <button onClick={makeFilter} className="btn-classic">
                        rechercher
                    </button>
                </div>
                <div className="container-all-event">
                    {result.map((event, key) => {
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
