import React, { useState } from "react";
import AuthContext from "../../contexts/auth.context";

const LogoutButton = props => {
    return (
        <AuthContext.Consumer>
            {context => (
                <div className="item-nav vertical-center">
                    <button onClick={context.logOut} className=" btn-rounded-100 btn-violet">
                        Déconnexion
                    </button>
                </div>
            )}
        </AuthContext.Consumer>
    );
};

export default LogoutButton;
