import React from "react";
import "./selectionlist.css";

export const Selectionlist = ({ choices, deleteItem }) => {
  const getErrorMsg = (text, index) => {
    return (
      <span>
        {text.substring(0, index)}
        <font color="red">{text.substring(index)}</font>
      </span>
    );
  };

  return (
    <div className="list-wrapper">
      {choices.map(choice => (
        <div key={choice} className="row option">
          <button className="btn" onClick={deleteItem.bind(this, choice)}>
            -
          </button>
          {getErrorMsg(choice, 40)}
        </div>
      ))}
    </div>
  );
};
