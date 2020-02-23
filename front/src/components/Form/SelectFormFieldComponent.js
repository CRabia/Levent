import React from "react";

const SelectFormField = props => {
    const callBack = props.callBack;
    const value = props.value;
    const textField = props.textField;
    const options = props.options;

    return (
        <div className="display-form-admin">
            <div className="label">{textField}</div>
            <select value={value} onChange={e => callBack(e.target.value)}>
                {options.map((item, key) => {
                    return (
                        <option value={item.value} key={key}>
                            {item.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectFormField;
