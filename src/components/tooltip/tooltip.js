import React from "react";
import "./tooltip.css";
export class Tooltip extends React.Component {
//  constructor(props) {
//    super(props);
//  }
  render() {
    return (
      <div className="tooltip">
        {this.props.label}
        <span className="tooltiptext">{this.props.message}</span>
      </div>
    );
  }
}
