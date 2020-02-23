import React from "react";

const AdminSearchBar = props => {
    return (
        <div className="search-bar">
            <input type="text" placeholder={props.textPlaceholder} />
            <button className="btn-search" onClick={props.callBack}>
                {props.textButton}
            </button>
        </div>
    );
};

export default AdminSearchBar;
