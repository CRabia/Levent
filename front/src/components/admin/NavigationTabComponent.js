import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavigationTab = props => {
    const [navigationTabActive, setNavigationTabActive] = useState("");
    let location = useLocation();

    useEffect(() => {
        location.pathname == props.path
            ? setNavigationTabActive("activated-tab-nav")
            : setNavigationTabActive("");
    }, [location.pathname]);

    return (
        <div id={navigationTabActive} className="selector-navigation-tab">
            <Link to={props.path}>{props.name}</Link>
        </div>
    );
};

export default NavigationTab;
