import React, { Component } from "react";
//import { LocationList } from "./components/LocationList";
// import { bindCallback } from "rxjs";
import { Tooltip } from "./components/tooltip/tooltip";

import { Selectionlist } from "./components/selectionlist/selectionlist";
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
      displayAlpha: false,
      default: "North America"
    };
  },
  saveField(fieldJson) {
    const url = "http://www.mocky.io/v2/566061f21200008e3aabd919";
    console.log(fieldJson);

    fetch(url, {
      method: "post",
      body: JSON.stringify(fieldJson)
    })
      .then(function(response) {
        //        console.log(response);
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = FieldService.getField();
    this.labelNode = React.createRef();
    this.inputNode = React.createRef();
    this.submitBtn = React.createRef();
    this.sortChoices();
  }

  deleteItem = e => {
    e.persist();
    e.preventDefault();
    this.setState({
      choices: this.state.choices.filter(item => item !== e.target.value)
    });
  };

  sortChoices = () => {
    if (this.state.displayAlpha) {
      this.setState({
        choices: this.state.choices.sort()
      });
    }
  };

  handelSortCheckBox = e => {
    e.persist();
    this.setState(
      {
        displayAlpha: e.target.checked
      },
      () => {
        if (this.state.displayAlpha) {
          this.sortChoices();
        }
      }
    );
  };

  validateInputValues = () => {
    this.submitBtn.disabled =
    this.state.required && this.state.label.trim().length === 0;
  };

  //*************************************** PROCESS LABLE INPUT ************************************************
  handelRequiredCheckBox = e => {
    e.persist();
    this.setState(
      {
        required: e.target.checked
      },
      () => {
        this.validateInputValues();
      }
    );
  };

  handelLabelChange = e => {
    this.setState(
      {
        label: this.labelNode.value
      },
      () => {
        this.validateInputValues();
      }
    );
  };
  //*************************************** PROCESS LIST INPUT ************************************************
  addToList = () => {
    if (
      this.inputNode.value.trim().length > 0 &&
      this.state.choices.indexOf(this.inputNode.value) < 0
    ) {
      this.setState(
        {
          choices: [...this.state.choices, this.inputNode.value]
        },
        () => {
          this.sortChoices();
          this.validateInputValues();
        }
      );
    } else {
      if (this.inputNode.value.trim().length)
        alert(`${this.inputNode.value} is aready in the list.`);
    }
    this.inputNode.value = "";
  };

  handleInputListChange = e => {
    this.validateInputValues();
  };

  handleListInputKeyPress = e => {
    if (e.charCode === 13) {
      this.addToList();
    }
  };

  //*************************** PRECESS SUBMIT AND CLEAR ***************************************
  postJSON = () => {
    //Default must be added before submitted

    if (this.state.choices.indexOf(this.state.default) < 0) {
      this.setState(
        {
          choices: [...this.state.choices, this.state.default]
        },
        () => {
          this.sortChoices();
          FieldService.saveField(this.state);
        }
      );
    } else {
      FieldService.saveField(this.state);
    }
  };
  handleSubmit = e => {
    e.persist();
    e.preventDefault();
    if (this.inputNode.value.length > 0) {
      const msg = `${
        this.inputNode.value
      } has not been added to the list.  Do you wish to preceed?`;
      if (window.confirm(msg)) {
        this.postJSON();
      } else {
        this.inputNode.focus();
      }
    } else {
      this.postJSON();
    }
  };

  render() {
    return (
      <div className="outter-div">
        <div className="inner-header-div">
          <span>Field Builder</span>
        </div>
        <div className="container">
          <span>
            <input
              id="require"
              type="checkbox"
              checked={this.state.required}
              ref={node => {
                this.requireCheckNode = node;
              }}
              onChange={this.handelRequiredCheckBox}
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
            ref={node => {
              this.labelNode = node;
            }}
            defaultValue={this.state.label}
            onChange={this.handelLabelChange}
          />
        </div>

        <div className="container">
          <Tooltip
            label={"Input list value:"}
            message={
              "Location input field to be added to the list.  Press Enter or click '+' button."
            }
          />
          <span>
            <input
              type="text"
              ref={node => {
                this.inputNode = node;
              }}
              onKeyPress={this.handleListInputKeyPress}
              onChange={this.handleInputListChange}
              defaultValue={this.state.default}
            />
            <button onClick={this.addToList}>+</button>
          </span>
        </div>

        <div className="container">
          <div>
            <span>
              Regions
              <input
                id="sort"
                type="checkbox"
                ref={node => {
                  this.sortCheckNode = node;
                }}
                checked={this.state.displayAlpha}
                onChange={this.handelSortCheckBox}
              />
              <Tooltip
                label={"Sort"}
                message={"Check box to sort area list."}
              />
            </span>
          </div>
        </div>
        <Selectionlist
          choices={this.state.choices}
          deleteItem={this.deleteItem}
        />

        <div>
          <button
            ref={node => {
              this.submitBtn = node;
            }}
            onClick={this.handleSubmit}
          >
            Sumbit
          </button>
          <button>Cancel</button>
        </div>
      </div>
    );
  }
}

export default App;
