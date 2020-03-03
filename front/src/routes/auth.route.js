import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

export const AuthRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (state.isAuth) {
                    return <Component {...props} />;
                } else {
                    return <Component {...props} />;
                    return <Redirect to="/connexion" />;
                }
            }}
        />
    );
};
