import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

export const AdminRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);

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
