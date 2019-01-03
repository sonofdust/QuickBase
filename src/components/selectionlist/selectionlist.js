import React from "react";
import "./selectionlist.css";
export class Selectionlist extends React.Component {
//  constructor(props) {
//    super(props);
//  }

  render() {
    return (
      <div className="y-scroll">
        {this.props.choices.map((choice, i) => {
          return (
            <div className="container row dont-break-out" key={i}>
              <span>{choice}</span>
              <button value={choice} onClick={this.props.deleteItem}>
                -
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
