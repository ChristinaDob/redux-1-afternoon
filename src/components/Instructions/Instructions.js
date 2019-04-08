import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { ADD_INSTRUCTION, ADD_RECIPE } from './../../store';

class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      instructions: reduxState.instructions,
      input: ''
    };
  }

  /* we need to listen to changes using subscribe */
  /* Create a componentDidMount method for this component. subscribe goes inside this method. The callback function that we pass in should use getState to get an updated version of the Redux state. Then we'll use this.setState to update our component's state with the new values. */
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        instructions: reduxState.instructions
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleChange(val) {
    this.setState({
      input: val
    });
  }
  addInstruction() {
    store.dispatch({
      type: ADD_INSTRUCTION,
      payload: this.state.input
    });
    // Send data to Redux state
    this.setState({
      input: ''
    });
  }
  create() {
    // Create new recipe in Redux state
    /* We need to use the dispatch method again, this time inside create. The type of the action object used in dispatch should match the action type we just imported, and there shouldn't be a payload. */
    store.dispatch({
      type: ADD_RECIPE
    });
  }
  render() {
    const instructions = this.state.instructions.map((instruction, i) => {
      return <li key={i}>{instruction}</li>;
    });
    return (
      <div className="List forms">
        <h2>Instructions:</h2>
        <div className="form_items_container">
          <ol className="list">{instructions}</ol>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addInstruction()}>
            Add Instruction
          </button>
        </div>
        <Link to="/add/ingredients">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/">
          <button className="right_button" onClick={() => this.create()}>
            Create
          </button>
        </Link>
      </div>
    );
  }
}

export default Instructions;
