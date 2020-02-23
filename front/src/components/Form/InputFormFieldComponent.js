import React from "react";

const InputFormField = props => {
    const callBack = props.callBack;
    const value = props.value;
    const textField = props.textField;

    return (
        <div className="display-form-admin">
            <div className="label">{textField}</div>
            {callBack !== "" ? (
                <input type="text" value={value} onChange={e => callBack(e.target.value)} autoComplete="off" />
            ) : (
                <input type="text" value={value} readOnly autoComplete="off" />
            )}
        </div>
    );
};

export default InputFormField;
