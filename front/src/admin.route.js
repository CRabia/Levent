import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./contexts/auth.context";

export const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <AuthContext.Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => {
                        if (context.isAdmin) {
                            return <Component {...props} />;
                        } else {
                            return <Component {...props} />;
                            //return <Redirect to="/connexion" />;
                        }
                    }}
                />
            )}
        </AuthContext.Consumer>
    );
};
