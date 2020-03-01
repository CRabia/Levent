import React from "react";

const InputFormField = props => {
    const callBack = props.callBack;
    const textField = props.textField;
    const type = props.type;
    const value = props.value;

    return (
        <div className="display-form-admin">
            <div className="label">{textField}</div>
            {callBack !== "" ? (
                <input type={type} value={value} onChange={e => callBack(e.target.value)} autoComplete="off" />
            ) : (
                <input type={type} value={value} readOnly autoComplete="off" />
            )}
        </div>
    );
};

export default InputFormField;
