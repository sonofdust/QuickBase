import React, { Component } from "react";
import { LocationList } from "./components/LocationList";

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

  render() {

    return (
      <div className="App" align="center">
        <div width="30%">
          <h1>{FieldService.getField().label}</h1>
        </div>
        <div width="30%">
          <span>Label</span>
          <input type="text" name="region" />
        </div>
        <div width="30%">
          <span>Type</span>
          <input id="require" type="checkbox" />
          <span>A value is required</span>
        </div>
        <div width="30%">
          <LocationList list={FieldService.getField().choices} />
        </div>
      </div>
    );
  }
}

export default App;
