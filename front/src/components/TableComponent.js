import React from "react";
import ClassicButton from "../components/buttons/ClassicLinkButtonComponent";

const TableComponent = props => {
    let items = props.items;
    const nameOfColumn = props.nameOfColumn;
    const basePathEdit = props.pathEdit;

    return (
        <table className="table">
            <thead>
                <tr>
                    {nameOfColumn.map((item, i) => {
                        return <th key={i}>{item}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {items.map((item, key) => {
                    let pathEdit = basePathEdit + "/" + item._id;
                    return (
                        <tr key={key}>
                            {Object.values(item).map((attr, index) => {
                                return (
                                    <td key={index}>
                                        {typeof attr === "boolean" ? (attr === false ? "Non publié" : "Publié") : attr}
                                    </td>
                                );
                            })}
                            <td className="td-action">
                                <ClassicButton path={pathEdit} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableComponent;
