import React from "react";
import "./selectionlist.css";

export class Selectionlist extends React.Component {
  getOverflow(value, maxLimit) {
    return (
      <div
        key={value}
        className="row option"
        onClick={this.props.deleteItem.bind(this, value)}
      >
        <span>
          {value.substring(0, maxLimit)}
          <font color="red">{value.substring(maxLimit)}</font>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="list-wrapper">
        <div className="list-title">
          ------ Click list item to unselect ------
        </div>
        {this.props.choices.map(choice => this.getOverflow(choice, 49))}
      </div>
    );
  }
}
