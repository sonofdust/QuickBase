import React, { Component } from "react";

export class Tooltip extends Component {
  constructor() {
    super();

    this.state = { hover: false };
  }

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  };

  render() {
    const tooltip = {
      position: "relative",
      display: "inline-block",
      borderBottom: "1px dotted black"
    };

    const text = {
      position: "absolute",
      top: "25px",
      left: "0",
      visibility: "hidden",
      transition: "opacity 1s",
      width: "200px",
      backgroundColor: "lightyellow",
      border: "1px solid black",
      fontSize: "10px",
      borderRadius: "4px",
      padding: "4px",
      zIndex: 10
    };

    let msgStyle = null;

    if (this.state.hover) {
      msgStyle = { visibility: "visible", opacity: "1" };
    } else {
      msgStyle = { visibility: "hidden", opacity: 0 };
    }

    return (
      <div
        style={tooltip}
        onMouseOver={this.toggleHover}
        onMouseOut={this.toggleHover}
      >
        {this.props.label}
        <span style={{ ...text, ...msgStyle }}>{this.props.message}</span>
      </div>
    );
  }
}
