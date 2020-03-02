import React, { createContext, useReducer } from "react";
import { reducer } from "../store/reducer";
import initialState from "../store/state";

export const AuthContext = createContext();

const AuthProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                dispatch,
                state
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
