import React from "react";
import { Tooltip } from "../tooltip/tooltip";
import "./labelinput.css";

export class Labelinput extends React.Component {

  render() {
    return (
      <div className="container">
        <span>
          <input
            id="require"
            type="checkbox"
            checked={this.props.required}
            ref={node => {
              this.requireCheckNode = node;
            }}
            onChange={this.props.handelRequiredCheckBox}
          />
          <Tooltip
            label={"Label"}
            message={
              "Check box will require user to enter value.  If check and input blank builder will display an error."
            }
          />
        </span>
        <input
          type="text"
          defaultValue={this.props.label}
          onChange={this.props.handelLabelChange}
        />
      </div>
    );
  }
}
