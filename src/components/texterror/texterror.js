import React from "react";
// import "./tooltip.css";
export class Texterror extends React.Component {
//  constructor(props) {
//    super(props);
//  }
  render() {
    return (
        <span>
          {this.props.text.substring(0, this.props.errorindex)}
          <font color="red">{this.props.text.substring(this.props.errorindex)}</font>
        </span>
    );
  }
}
