import React from "react";

export const Selectionlist = ({ choices, deleteItem }) => {
  const list = {
    border: "none",
    padding: "5px",
    overflow: "auto"
  };

  const option = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "auto",
    wordBreak: "break-all",
    padding: "2px"
  };

  const altRowColor = {
    backgroundColor: "lightgray"
  };

  const getErrorMsg = (text, index) => {
    return (
      <span>
        {text.substring(0, index)}
        <font color="red">{text.substring(index)}</font>
      </span>
    );
  };

  return (
    <div style={list}>
      {choices.map((choice, index) => (
        <div
          key={choice}
          style={{ ...option, ...(index % 2 === 0 && altRowColor) }}
        >
          <button onClick={deleteItem.bind(this, choice)} style={{ cursor: "pointer" }}>
            -
          </button>
          {getErrorMsg(choice, 40)}
        </div>
      ))}
    </div>
  );
};
