import React, { Component } from "react";
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
        "Middle East and Africaasdfsa asfsafasf dfsadfsadfsdafsadf sdsafsdfsafsdasdfsdafsdaafsa",
        "My Name is Nicholas D Roman I live in Lehi Utah and I am trying to find a job."
      ],
      displayAlpha: false,
      default: "North America"
    };
  },

  saveField(fieldJson, setLoading) {
    delete fieldJson.loading;
    localStorage.setItem("quickBase", JSON.stringify(fieldJson));
    const url = "http://www.mocky.io/v2/566061f21200008e3aabd919";
    setLoading(true);
    fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "post",
      body: JSON.stringify(fieldJson)
    })
      .then(function(response) {
        setLoading(false);
        return response.json();
      })
      .then(function(data) {
        setLoading(false);
        console.log(fieldJson);
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
        setLoading(false);
      });
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = { ...FieldService.getField(), loading: false };
    this.submitBtn = React.createRef();
    this.sortChoices();
  }

  setLoadingStatus = loading => {
    this.setState({
      loading
    });
  };

  deleteItem = item => {
    this.setState({
      choices: this.state.choices.filter(choice => choice !== item)
    });
  };

  sortChoices = () => {
    if (this.state.displayAlpha) {
      this.setState({
        choices: this.state.choices.sort()
      });
    }
  };

  handleSortCheckBox = e => {
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

//    if (this.submitBtn.disabled) {
//      alert("If label required, label input cannot be blank.");
//    }
  };

  //*************************************** PROCESS LABLE INPUT ************************************************

  handleRequiredCheckBox = e => {
    e.persist();
    this.setState({
      required: e.target.checked
    });
  };

  handleLabelChange = e => {
    e.preventDefault();
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
    if (this.inputNode.value.trim().length > 0) {
      const msg = `${(
        <span style="color:red">this.inputNode.value</span>
      )} has not been added to the list.  Do you wish to preceed?`;
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
    if (this.state.loading)
      return (
        <div>
          <img
            className="outter-div"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );

    return (
      <div className="outter-div">
        <h2 className="center">Field Builder</h2>
        {/* ***********************************************************************************************         */}
        {/* <Labelinput
          handleRequiredCheckBox={this.handleRequiredCheckBox}
          label={this.state.label}
          handleLabelChange={this.handleLabelChange}
          required={this.state.required}
        /> */}
        <div className="container">
          <span>
            <input
              id="require"
              type="checkbox"
              checked={this.state.required}
              onChange={this.handleRequiredCheckBox}
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
            value={this.state.label}
            onChange={this.handleLabelChange}
            className={
              this.state.required && this.state.label.trim().length === 0
                ? "error"
                : ""
            }
          />
        </div>

        {/* ***********************************************************************************************         */}
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
        {/* ***********************************************************************************************         */}
        <div className="center container">
          <span>
            <input
              id="sort"
              type="checkbox"
              ref={node => {
                this.sortCheckNode = node;
              }}
              checked={this.state.displayAlpha}
              onChange={this.handleSortCheckBox}
            />
            <Tooltip
              label={"Sort Regions"}
              message={"Check box to sort area list."}
            />
          </span>
        </div>
        {/* ***********************************************************************************************         */}
        <Selectionlist
          choices={this.state.choices}
          deleteItem={this.deleteItem}
        />
        {/* ***********************************************************************************************         */}
        <div className="container center">
          <button
            ref={node => {
              this.submitBtn = node;
            }}
            onClick={this.handleSubmit}
          >
            Sumbit
          </button>
          <button>Clear</button>
        </div>
        {/* ***********************************************************************************************         */}
      </div>
    );
  }
}

export default App;
