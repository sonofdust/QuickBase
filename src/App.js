import React, { Component } from "react";
import { Tooltip } from "./components/tooltip/tooltip";
import { Labelinput } from "./components/labelinput/labelinput";
import { Selectionlist } from "./components/selectionlist/selectionlist";
import { ReactLoadingView } from "react-spinner-component";
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
  saveField(fieldJson, setLoading) {
    delete fieldJson.loading;
    const url = "http://www.mocky.io/v2/566061f21200008e3aabd919";
    setLoading(true);
    fetch(url, {
      method: "post",
      body: JSON.stringify(fieldJson)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setLoading(false);
        console.log(fieldJson);
        console.log(data);
      });
  }
};

class App extends Component {
  constructor() {
    super();
    FieldService.getField().loading = false;
    this.state = FieldService.getField();
    this.inputNode = React.createRef();
    this.submitBtn = React.createRef();
    this.sortChoices();
    this.loading = false;
  }
  setLoadingStatus = loading => {
    this.setState({
      loading
    });
  };

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
        label: e.target.value
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
    this.loading = true;
    if (this.state.choices.indexOf(this.state.default) < 0) {
      this.setState(
        {
          choices: [...this.state.choices, this.state.default]
        },
        () => {
          this.sortChoices();
          FieldService.saveField(this.state, this.setLoadingStatus);
        }
      );
    } else {
      FieldService.saveField(this.state, this.setLoadingStatus);
    }
  };
  handleSubmit = e => {
    e.persist();
    e.preventDefault();
    FieldService.loading = true;
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
        <ReactLoadingView
          loading={this.state.loading}
          bgColor="white"
          spinnerColor="blace"
          textColor="black"
          textStyle="100"
          LoaderView="line-scale"
          text="Processing."
          customheight="100%"
        >
          <h2 className="center">Field Builder</h2>
          <Labelinput
            handelRequiredCheckBox={this.handelRequiredCheckBox}
            label={this.state.label}
            inputNode={this.inputNode}
            handelLabelChange={this.handelLabelChange}
            required={this.state.required}
          />
          <div className="container center">
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
          <div className="center">
            <span>
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
                label={"Sort Regions"}
                message={"Check box to sort area list."}
              />
            </span>
          </div>
          <Selectionlist
            choices={this.state.choices}
            deleteItem={this.deleteItem}
          />
          <div className="container center">
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
        </ReactLoadingView>
      </div>
    );
  }
}

export default App;
