/* In this step, we'll set up our first view, Name.js, to use the 
action types we just added to store.js. */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* First we need to import the store we created into this file, 
along with the action types we need for this component. */
import store, { UPDATE_NAME, UPDATE_CATEGORY } from './../../store.js';
import './Name.css';

class Name extends Component {
  /* Inside the constructor, use the getState method that lives on store.
Store the return value in a const so we can reference it later. */
  /* The store is an object with a method on it called getState t
  hat we can use to access the Redux state object. We'll invoke 
  this method inside our constructor and store the return value 
  in a constant so we can reference it easily. */

  constructor(props) {
    super(props);
    /* The reason we are invoking this method in the constructor 
    is so we can use the value in our component's initial state. 
    We will reference the appropriate properties off of the Redux 
    state to replace the empty strings that are in the component's 
    state right now. */
    const reduxState = store.getState();
    this.state = {
      name: reduxState.name,
      category: reduxState.category
    };
  }
  handleNameChange(nameVal) {
    this.setState({
      name: nameVal
    });
  }

  handleCategoryChange(catVal) {
    this.setState({
      category: catVal
    });
  }
  saveChanges() {
    /* The store is an object with a method on it called dispatch 
    that we can use to send actions to the reducer. We'll want to 
    use this method twice, once for each piece of data that this 
    component needs to save to Redux. We'll set these up inside 
    the saveChanges method that already fires when we click the Next button. */
    // Send data to Redux state
    store.dispatch({
      type: UPDATE_NAME,
      payload: this.state.name
    });
    store.dispatch({
      type: UPDATE_CATEGORY,
      payload: this.state.category
    });
  }
  render() {
    return (
      <div className="Name forms">
        <div className="input_container">
          <h2>Recipe Name:</h2>
          <input
            value={this.state.name}
            onChange={e => this.handleNameChange(e.target.value)}
          />
        </div>
        <div className="input_container">
          <h2>Category:</h2>
          <select
            value={this.state.category}
            onChange={e => this.handleCategoryChange(e.target.value)}
          >
            <option value={''}>----</option>
            <option value={'Breakfast'}>Breakfast</option>
            <option value={'Second Breakfast'}>Second Breakfast</option>
            <option value={'Brunch'}>Brunch</option>
            <option value={'Lunch'}>Lunch</option>
            <option value={'Dinner'}>Dinner</option>
            <option value={'Drinks'}>Drinks</option>
            <option value={'Dessert'}>Dessert</option>
          </select>
        </div>
        <Link to="/add/author">
          <button onClick={() => this.saveChanges()} className="right_button">
            Next
          </button>
        </Link>
      </div>
    );
  }
}

export default Name;
