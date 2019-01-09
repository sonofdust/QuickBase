import React from "react";
import "./selectionlist.css";

export class Selectionlist extends React.Component {
  getOptionValue(value, maxLimit) {
    let optionValue = null;

    if (value.length < maxLimit) {
      optionValue = value;
    } else {
      const normalText = value.substring(0, maxLimit);
      const redText = value.substring(maxLimit);

      optionValue = (
        <span>
          {normalText} <font color="red">{redText}</font>
        </span>
      );
    }

    return (
      <div
        key={value}
        className="row option"
        onClick={this.props.deleteItem.bind(this, value)}
      >
        {optionValue}
      </div>
    );
  }

  render() {
    const maxLineLimit = 40;

    return (
      <div className="list-wrapper">
        <div className="list-title">
          ------ Click list item to unselect ------
        </div>
        {this.props.choices.map(choice =>
          this.getOptionValue(choice, maxLineLimit)
        )}
      </div>
    );
  }
}
