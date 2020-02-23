import React from "react";

const TextareaFormField = props => {
    const callBack = props.callBack;
    const value = props.value;
    const textField = props.textField;

    return (
        <div className="display-form-admin">
            <div className="label">{textField}</div>
            {callBack !== "" ? (
                <textarea value={value} onChange={e => callBack(e.target.value)} />
            ) : (
                <textarea value={value} readOnly />
            )}
        </div>
    );
};

export default TextareaFormField;
