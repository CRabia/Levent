import React from "react";

const Box = props => {
    return (
        <div className={`${props.class} box`}>
            <h2>{props.title}</h2>
            {props.children}
        </div>
    );
};

export default Box;
