import React from "react";

const dataSet = new Set();

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: this.props.list,
      selected: new Set()
    };
  }

  render() {
    const addItem = e => {
      e.persist();

      if (e.target.value && !dataSet.has(e.target.value)) {
        dataSet.add(e.target.value);
        this.setState({
          choices: this.props.list.filter(choice => !dataSet.has(choice)),
          selected: dataSet
        });
        console.log(dataSet);
      }
    };

    const deleteItem = e => {};

    return (
      <div>
        <div>
          <select id="select-list" size="4" onChange={addItem}>
            <option value="">Select Location</option>
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
          <select id="selected" size="4" onChange={deleteItem}>
            <option value="">Unselect location</option>
            {this.state.selected.forEach(choice => {
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
