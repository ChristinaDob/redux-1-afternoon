import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { ADD_INGREDIENT } from './../../store';

class Ingredients extends Component {
  /* Now just like before, we need to set up the constructor to pull in its initial state from Redux state. */
  /* Inside the constructor, invoke the getState method (found on the store) and use the appropriate value from Redux state inside the component's initial state. */
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      ingredients: reduxState.ingredients,
      input: ''
    };
  }

  /* Inside of componentDidMount, use the subscribe method that lives on store.
subscribe takes a callback function as its argument.
This callback should invoke getState just like the constructor does.
Then it should call this.setState and use the value from Redux state to update the component's state. */
  componentDidMount() {
    /* Inside this method we are going to use another piece that comes from store. This one is called subscribe. subscribe allows us to update our page any time the data on Redux state changes. */
    this.unsubscribe = store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        ingredients: reduxState.ingredients
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

  /* Just like we did before, we need to use the dispatch method. This time we only need to use it once, and it should go inside addIngredient. The type of the action object used in dispatch should match what we imported above, and the payload should pull the input value from state. */
  /* Inside the addIngredient method, use dispatch (found on the store) to send an action object.
  It should use the action type that was imported.
  It should pull the input data from state for the payload. */
  addIngredient() {
    // Send data to Redux state
    store.dispatch({
      type: ADD_INGREDIENT,
      payload: this.state.input
    });
    this.setState({
      input: ''
    });
  }
  render() {
    const ingredients = this.state.ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
    return (
      <div className="List forms">
        <h2>Ingredients:</h2>
        <div className="form_items_container">
          <ul className="list">{ingredients}</ul>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addIngredient()}>
            Add Ingredient
          </button>
        </div>
        <Link to="/add/author">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/add/instructions">
          <button className="right_button">Next</button>
        </Link>
      </div>
    );
  }
}

export default Ingredients;
