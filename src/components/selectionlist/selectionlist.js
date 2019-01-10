import React from "react";
import "./selectionlist.css";

export class Selectionlist extends React.Component {
  render() {
    const getErrorTxt = (text, index) => {
      return (
        <span>
          {text.substring(0, index)}
          <font color="red">{text.substring(index)}</font>
        </span>
      );
    };
    return (
      <div className="list-wrapper">
        {this.props.choices.map(choice => (
          <div key={choice} className="row option">
            <button
              className="btn"
              onClick={this.props.deleteItem.bind(this, choice)}
            >
              -
            </button>
            {getErrorTxt(choice, 40)}
          </div>
        ))}
      </div>
    );
  }
}
