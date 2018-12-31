import React, { Component } from "react";
//import { LocationList } from "./components/LocationList";
// import { bindCallback } from "rxjs";
import "./App.css";

const FieldService = {
  getField() {
    return {
      label: "Sales Region",
      required: false,
      choices: [
        "Asia",
        "Australia",
        "Western Europe",
        "North America",
        "Eastern Europe",
        "Latin America",
        "Middle East and Africa"
      ],
      displayAlpha: true,
      default: "North America"
    };
  },
  saveField(fieldJson) {}
};

class App extends Component {
  constructor() {
    super();
    this.state = FieldService.getField();
  }
  deleteItem = e => {
    e.persist();
    //    console.log(e.target.value);
    this.setState({
      choices: this.state.choices.filter(item => item !== e.target.value)
    });
  };

  handelRequiredCheckBox = e => {
    e.persist();
    this.setState({
      required: e.target.checked
    });
  };

  //  sortChoices = ()=>{
  //    this.setState(
  //      {
  //        choices: this.state.choices.sort()
  //      }
  //  }

  handelSortCheckBox = e => {
    e.persist();
    this.setState(
      {
        displayAlpha: e.target.checked
      },

      () => {
        if (this.state.displayAlpha) {
          this.setState({
            choices: this.state.choices.sort()
          });
        }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.checked);
    //    const data = new FormData(e.target);
    //    console.log( data.target.locationText);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="outter-div">
          <div className="inner-header-div">
            <span>Field Builder</span>
          </div>
          <div className="container">
            <span>Label</span>
            <input type="text" defaultValue={this.state.label} />
          </div>
          <div className="container">
            <span>Type</span>
            <span>Multi-select Text</span>
            <span className="container">
              <input
                id="require"
                type="checkbox"
                checked={this.state.required}
                onChange={this.handelRequiredCheckBox}
              />
              A value is required
            </span>
          </div>
          <div className="container">
            <span>Default Value</span>
            <input type="text" defaultValue={this.state.default} />
          </div>

          <div className="container">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">
                    Regions
                    <input
                      id="sort"
                      type="checkbox"
                      checked={this.state.displayAlpha}
                      onChange={this.handelSortCheckBox}
                    />
                    Sort
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.choices.map((choice, i) => {
                  return (
                    <tr key={choice}>
                      <td>{choice}</td>
                      <td className="tight-tr">
                        <button value={choice} onClick={this.deleteItem}>
                          Del
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="container">
            <button>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
