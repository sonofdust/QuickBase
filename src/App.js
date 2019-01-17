import React, { Component } from "react";
import { Tooltip } from "./components/tooltip";
import { Selectionlist } from "./components/selection-list";
import "./App.css";
import { ApiService } from "./services/api";

class App extends Component {
  submitBtnRefRef = null;

  constructor() {
    super();

    this.state = { ...ApiService.fetchData(), loading: false };
    this.submitBtnRefRef = React.createRef();
  }

  componentDidMount() {
    this.sortChoices();
  }

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

  handleSortCheckBox = () => {
    this.setState({
      displayAlpha: !this.state.displayAlpha
    }, () => {
      this.sortChoices();
    });
  };

  disableSubmitButton = () => {
    this.submitBtnRef.disabled =
      this.state.required && this.state.label.trim().length === 0;
  };

  handleLabelChange = e => {
    this.setState(
      {
        label: e.target.value
      },
      () => {
        this.disableSubmitButton();
      }
    );
  };

  addToList = () => {
    if (
      this.inputRef.value.trim().length &&
      this.state.choices.includes(this.inputRef.value)
    ) {
      alert(`${this.inputRef.value} is aready in the list.`);
      return;
    }

    if (this.state.choices.length >= 10) {
      alert("Length of Regions list cannot exceed 10 entries.");
      return;
    }

    this.setState(
      {
        choices: [...this.state.choices, this.inputRef.value]
      },
      () => {
        this.sortChoices();
        this.disableSubmitButton();
      }
    );
  };

  handleListInputKeyPress = e => {
    // 13 - enter key code.
    if (e.charCode === 13) {
      this.addToList();
    }
  };

  handleRequireCheckbox = e => {
    this.setState({ required: e.target.checked });
  };

  hasError = () => {
    return this.state.required && this.state.label.trim().length === 0;
  };

  postJSON = () => {
    const { choices, defaultValue } = this.state;

    this.setState(
      {
        choices: choices.includes(defaultValue)
          ? this.state.choices
          : [...this.state.choices, this.state.default],
        loading: true
      },
      async () => {
        try {
          await ApiService.postData(this.state);

          // Delays here to show spinner.
          setTimeout(() => {
            this.setState({ loading: false });
            this.sortChoices();
          }, 1500);
        } catch (error) {
          console.error("error has occurred:", error);
        }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    const msg = `${
      this.inputRef.value
    } has not been added to the list.  Do you wish to preceed?`;

    if (window.confirm(msg)) {
      this.postJSON();
    } else {
      this.inputRef.focus();
    }
  };

  handleClear = () => {
    this.setState({
      label: "",
      required: false,
      choices: [],
      displayAlpha: false,
      defaultValue: "North America"
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="outer-div">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );
    }

    return (
      <div className="outer-div">
        <div className="content">
          <h2>Field Builder</h2>

          <div className="row-item">
            <input type="checkbox" onChange={this.handleRequireCheckbox} />

            <Tooltip
              label="Label"
              message="Check box will require user to enter value. If check and input blank builder will display an error."
            />
            <input
              type="text"
              value={this.state.label}
              onChange={this.handleLabelChange}
              className={this.hasError() ? "error" : null}
            />
          </div>

          <div className="row-item">
            <Tooltip
              label="List value:"
              message="Location input field to be added to the list.  Press Enter or click '+' button."
            />
            <input
              ref={node => (this.inputRef = node)}
              onKeyPress={this.handleListInputKeyPress}
              onChange={this.disableSubmitButton}
              defaultValue={this.state.defaultValue}
            />
            <button onClick={this.addToList}>+</button>
          </div>

          <div className="row-item">
            <input
              type="checkbox"
              checked={this.state.displayAlpha}
              onChange={this.handleSortCheckBox}
            />
            <Tooltip label="Sort List" message="Check box to sort area list." />
          </div>

          <div className="row-item">
            <Selectionlist
              choices={this.state.choices}
              deleteItem={this.deleteItem}
            />
          </div>

          <div className="actions">
            <button
              ref={node => (this.submitBtnRef = node)}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            <button onClick={this.handleClear}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
