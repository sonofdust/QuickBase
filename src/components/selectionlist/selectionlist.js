import React from "react";
import "./selectionlist.css";

export class Selectionlist extends React.Component {
  getOptionValue(value, maxLimit) {
    if (value.length < maxLimit) {
      return (
        <div
          className="row option"
          onClick={this.props.deleteItem.bind(this, value)}
        >
          {value}
        </div>
      );
    }

    const normalText = value.substring(0, maxLimit);
    const redText = value.substring(maxLimit);

    return (
      <div
        className="row option"
        onClick={this.props.deleteItem.bind(this, value)}
      >
        <span>
          {normalText} <font color="red">{redText}</font>
        </span>
      </div>
    );
  }

  render() {
    const maxLineLimit = 40;

    return (
      <div className="list-wrapper">
        <div className="list-title">------ Click list item to unselect ------</div>
        {this.props.choices.map(choice => this.getOptionValue(choice, maxLineLimit))}
      </div>
    );
  }
}
