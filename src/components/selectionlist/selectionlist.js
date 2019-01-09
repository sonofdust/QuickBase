import React from "react";
import { Texterror } from "../texterror/texterror";
import "./selectionlist.css";

export class Selectionlist extends React.Component {
  render() {
    return (
      <div className="list-wrapper">
        {this.props.choices.map(choice => (
          <div key={choice} className="row option">
            <button onClick={this.props.deleteItem.bind(this, choice)}>
              -
            </button>
            <Texterror text={choice} errorindex={40} />
          </div>
        ))}
      </div>
    );
  }
}
