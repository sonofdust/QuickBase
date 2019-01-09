import React from "react";
import { Texterror } from "../texterror/texterror";
import "./selectionlist.css";

export class Selectionlist extends React.Component {

  render() {
    return (
      <div className="list-wrapper">
        <div className="list-title">
          ------ Click list item to unselect ------
        </div>
        {this.props.choices.map(choice => (
          <div
            key={choice}
            className="row option"
            onClick={this.props.deleteItem.bind(this, choice)}
          >
          <Texterror
          text = {choice}
          errorindex={40}
          />
          </div>
        ))}
      </div>
    );
  }
}
