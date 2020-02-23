import React from "react";

const ClassicButton = props => {
    return (
        <button className="btn-classic" onClick={props.callBack}>
            {props.textButton}
        </button>
    );
};

export default ClassicButton;
