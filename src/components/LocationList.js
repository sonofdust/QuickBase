import React from "react";

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = React.createRef();
    this.selected = React.createRef();
    this.choicesList = localStorage.getItem("choices")
      ? localStorage
          .getItem("choices")
          .toString()
          .split(",")
      : [];
    this.isSorted = false;
    this.state = {
      choices: this.props.list,
      selected: this.choicesList
    };
  }
  manageState = tag => {
    this.setState(
      {
        choices: this.props.list.filter(
          item => this.choicesList.indexOf(item) < 0
        ),
        selected: this.isSorted ? this.choicesList.sort() : this.choicesList
      },
      () => {
        tag.selected = true;
      }
    );
  };

  addItem = e => {
    e.persist();
    if (e.target.value) {
      this.choicesList.push(e.target.value);
      this.manageState(this.selectItem.current);
    }
  };

  deleteItem = e => {
    e.persist();
    this.selected.current.focus();
    this.choicesList = this.choicesList.filter(item => item !== e.target.value);
    console.log(this.choicesList);
    this.manageState(this.selected.current);
  };

  handelCheck = e => {
    e.persist();
    this.isSorted = e.target.checked;
    this.manageState(this.selected.current);
  };

  //This is fun
  render() {
    return (
      <div>
        <div>
          <select id="select-list" size="4" onChange={this.addItem}>
            <option value="" ref={this.selectItem}>
              ------ Select Location ------
            </option>
            {this.state.choices.map((choice, i) => {
              return (
                <option key={i} value={choice}>
                  {choice}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <input type="checkbox" onChange={this.handelCheck} />
          Sort selected items
        </div>
        <div>
          <select id="selected" size="4" onChange={this.deleteItem}>
            <option value="" ref={this.selected}>
              ------ Unselect location ------
            </option>
            {this.state.selected.map(choice => {
              return (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
