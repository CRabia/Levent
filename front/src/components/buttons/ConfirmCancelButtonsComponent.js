import React from "react";

const ConfirmCancelButtons = props => {
    return (
        <div className="container-button-form">
            <button id="validated" className="btn-classic green" onClick={props.callBack}>
                {props.textValidated}
            </button>
            {props.pathDelete && (
                <button id="deleted" className="btn-classic red" onClick={props.pathDelete}>
                    Delete
                </button>
            )}
            <button id="canceled" className="btn-classic" onClick={props.callBack}>
                {props.textCanceled}
            </button>
        </div>
    );
};

export default ConfirmCancelButtons;
