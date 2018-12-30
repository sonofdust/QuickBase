import React from "react";

let dataSet = new Set();

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = React.createRef();
    this.selected = React.createRef();
    this.isSorted = false;
    this.state = {
      choices: this.props.list,
      selected: new Set()
    };
  }
  manageState = tag => {
    //    dataSet = this.handelCheck ? Array.from(dataSet).sort : dataSet;
    this.setState(
      {
        choices: this.props.list.filter(choice => !dataSet.has(choice)),
        selected: dataSet
      },
      () => {
        tag.selected = true;
      }
    );
  };

  addItem = e => {
    e.persist();
    if (e.target.value && !dataSet.has(e.target.value)) {
      dataSet.add(e.target.value);
      this.manageState(this.selectItem.current);
    }
  };

  handelCheck = e => {
    e.persist();
    this.isSorted = e.target.checked;
  };

  deleteItem = e => {
    e.persist();
    this.selected.current.focus();
    dataSet.delete(e.target.value);
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
            {Array.from(this.state.selected).map(choice => {
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
