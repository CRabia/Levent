import React, { useEffect, useContext, Fragment, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import AuthService from "../services/auth.service";
import TYPES from "../store/type";

const Routes = props => {
    const context = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const isLogIn = async () => {
            try {
                let response = await AuthService.isAuthenticated();
                if (response.ok) {
                    let data = await response.json();
                    setIsLoaded(true);
                    context.dispatch({ type: TYPES.SET_USER, payload: data.user });
                    context.dispatch({ type: TYPES.SET_IS_ADMIN, payload: data.user });
                    context.dispatch({ type: TYPES.SET_IS_AUTH, payload: true });
                }
            } catch (error) {}
        };

        if (localStorage.getItem("token") && !isLoaded) {
            isLogIn();
        }
    }, [context]);

    return <Fragment>{props.children}</Fragment>;
};

export default Routes;
