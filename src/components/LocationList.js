import React from "react";

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = React.createRef();
    this.selected = React.createRef();
    this.state = {
      choices: this.props.list,
      selected: new Set()
    };
  }
  manageState = tag => {
    this.setState(
      {
        choices: this.props.list.filter(choice => !this.selected.has(choice)),
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
      this.selected.add(e.target.value);
      this.manageState(this.selectItem.current);
    }
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
              Select Location
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
          <select id="selected" size="4" onChange={this.deleteItem}>
            <option value="" ref={this.selected}>
              Unselect location
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
