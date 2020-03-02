import React, { createContext, useEffect, useReducer } from "react";
import AuthService from "../services/auth.service";
import { reducer } from "../store/reducer";
import TYPES from "../store/type";
import initialState from "../store/state";

export const AuthContext = createContext();

const AuthProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        state.isAuth === null && isLogIn();
        console.log(state);
    }, []);

    useEffect(() => {
        console.log(state);
    }, [state]);

    const isLogIn = async () => {
        let response = await AuthService.isAuthenticated();
        response.ok ? logIn(await response.json()) : logOut();
        isUserAdmin();
    };

    const logIn = data => {
        localStorage.setItem("token", data.token);
        dispatch({ type: TYPES.SET_USER, payload: data.user });
        dispatch(TYPES.SET_IS_AUTH, true);
        isUserAdmin();
    };

    const logOut = () => {
        dispatch({ type: TYPES.SET_USER, payload: undefined });
        dispatch(TYPES.SET_IS_ADMIN, false);
        dispatch(TYPES.SET_IS_AUTH, false);
        localStorage.getItem("token") && localStorage.removeItem("token") && this.props.customHistory.push("/");
    };

    //Functions to check the user status
    const isUserAdmin = () => {
        state.user && state.user.role === 2 && dispatch(TYPES.SET_IS_ADMIN, true);
    };
    return (
        <AuthContext.Provider
            value={{
                dispatch,
                state,
                logIn,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
