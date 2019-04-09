import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './../../store';
import RecipeCard from './../RecipeCard/RecipeCard';
import './Home.css';

class Home extends Component {
  /* Inside the constructor, invoke the getState method (found on the store) 
  and use the appropriate value from Redux state inside the component's 
  initial state. */
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      recipes: reduxState.recipes
    };
  }

  render() {
    const recipes = this.state.recipes.map((recipe, i) => {
      return (
        <RecipeCard
          key={i}
          name={recipe.name}
          category={recipe.category}
          authorFirst={recipe.authorFirst}
          authorLast={recipe.authorLast}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
        />
      );
    });
    return (
      <div className="Home">
        <Link to="/add/name">
          <button>Create New Recipe</button>
        </Link>
        <div className="card_container">{recipes}</div>
      </div>
    );
  }
}

export default Home;
