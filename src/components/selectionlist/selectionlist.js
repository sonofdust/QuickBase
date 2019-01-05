import React from "react";
import "./selectionlist.css";
export class Selectionlist extends React.Component {
//  constructor(props) {
//    super(props);
//  }

  render() {
    return (
      <div>
          <select size="8" onChange={this.props.deleteItem}>
            <option className="row center">
              ------ Click list item to unselect ------
            </option>
            {this.props.choices.map(choice => {
              return (
                <option key={choice} value={choice}  className="row break">
                  {choice}
                </option>
              );
            })}
          </select>
      </div>
    );
  }
}
