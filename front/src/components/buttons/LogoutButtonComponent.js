import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import TYPES from "../../store/type";

const LogoutButton = props => {
    const { dispatch } = useContext(AuthContext);

    const logOut = () => {
        dispatch({ type: TYPES.SET_USER, payload: undefined });
        dispatch({ type: TYPES.SET_IS_ADMIN, payload: undefined });
        dispatch({ type: TYPES.SET_IS_AUTH, payload: false });
        localStorage.getItem("token") && localStorage.removeItem("token") && props.history.push("/");
    };

    return (
        <div className="item-nav vertical-center">
            <button onClick={logOut} className=" btn-rounded-100 btn-violet">
                Déconnexion
            </button>
        </div>
    );
};

export default LogoutButton;
