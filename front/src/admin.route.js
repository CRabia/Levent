import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import AuthService from "./services/auth.service";
import TYPES from "./store/type";

export const AdminRoute = ({ component: Component, ...rest }) => {
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        const isLogIn = async () => {
            try {
                let response = await AuthService.isAuthenticated();
                if (response.ok) {
                    let data = await response.json();
                    dispatch({ type: TYPES.SET_USER, payload: data.user });
                    dispatch({ type: TYPES.SET_IS_ADMIN, payload: data.user });
                    dispatch({ type: TYPES.SET_IS_AUTH, payload: true });
                } else {
                    dispatch({ type: TYPES.SET_IS_AUTH, payload: false });
                }
            } catch (error) {}
        };

        const token = localStorage.getItem("token");

        if (token && state.isAuth === "") {
            isLogIn();
        }
    }, [state.user]);

    return (
        <Route
            {...rest}
            render={props => {
                if (state.isAdmin) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/connexion" />;
                }
            }}
        />
    );
};
