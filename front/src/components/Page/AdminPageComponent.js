import React from "react";

const AdminPage = props => {
    return (
        <div id={props.id} className="page-admin">
            <h1 className={`${props.class}`}>{props.title}</h1>
            {props.children}
        </div>
    );
};

export default AdminPage;
