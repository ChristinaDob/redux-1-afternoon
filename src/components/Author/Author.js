import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/*  Import the store into this file, along with the action types we need for this component. */
import store, { UPDATE_AUTHOR_FIRST, UPDATE_AUTHOR_LAST } from './../../store';
import './Author.css';

class Author extends Component {
  constructor(props) {
    super(props);
    /* Invoke the getState method in the constructor and store the return value in a constant.  */
    const reduxState = store.getState();
    /* Now reference the appropriate values off of Redux state to replace the empty strings in the component's initial state. */
    this.state = {
      authorFirst: reduxState.authorFirst,
      authorLast: reduxState.authorLast
    };
  }

  handleAuthorFirstChange(nameVal) {
    this.setState({
      authorFirst: nameVal
    });
  }

  handleAuthorLastChange(nameVal) {
    this.setState({
      authorLast: nameVal
    });
  }
  saveChanges() {
    // Send data to Redux state
    /* we need to use the dispatch method twice inside the saveChanges method that already fires when we click the Next or Previous buttons.  */
    /* The type of the action objects used in dispatch should match the action types we imported above, and the payload should pull the values from the component's state. */
    store.dispatch({
      type: UPDATE_AUTHOR_FIRST,
      payload: this.state.authorFirst
    });
    store.dispatch({
      type: UPDATE_AUTHOR_LAST,
      payload: this.state.authorLast
    });
  }
  render() {
    return (
      <div className="Author forms">
        <div className="input_container">
          <h2>Author First Name:</h2>
          <input
            value={this.state.authorFirst}
            onChange={e => this.handleAuthorFirstChange(e.target.value)}
          />
        </div>
        <div className="input_container">
          <h2>Author Last Name:</h2>
          <input
            value={this.state.authorLast}
            onChange={e => this.handleAuthorLastChange(e.target.value)}
          />
        </div>
        <Link to="/add/name">
          <button onClick={() => this.saveChanges()} className="left_button">
            Previous
          </button>
        </Link>
        <Link to="/add/ingredients">
          <button onClick={() => this.saveChanges()} className="right_button">
            Next
          </button>
        </Link>
      </div>
    );
  }
}

export default Author;
