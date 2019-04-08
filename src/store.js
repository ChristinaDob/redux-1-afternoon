import { createStore } from 'redux';

/* In order to create our store, we'll also need to create our initial state and reducer. Let's start with state. Our state will be empty for now. */

/* Create an empty initial state object. */
const initialState = {
  /* Every time we want to store something in Redux state, we need to add it to the initialState object with a default value. For our first set of inputs an empty string will work great. */
  name: '',
  category: '',
  /* Add two properties to initialState Redux state.
One to store the author's first name.
One to store the author's last name. */
  /* Add a property to initialState to store the list of instructions. */
  authorFirst: '',
  authorLast: '',
  ingredients: [],
  instructions: [],
  recipes: []
};

/* Now we need to create some action types. These should describe what the action will do. We need to export these so we can access them in all our components as well. */

// ACTION TYPES
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_AUTHOR_FIRST = 'UPDATE_AUTHOR_FIRST';
export const UPDATE_AUTHOR_LAST = 'UPDATE_AUTHOR_LAST';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INSTRUCTION = 'ADD_INSTRUCTION';
export const ADD_RECIPE = 'ADD_RECIPE';

/* Now that our initial state is set up, let's build a basic reducer. The reducer is a function that takes in two things: state and an action. Let's use our initialState as the default value for state. */

/* Write a simple reducer. It should just return state by default. */

function reducer(state = initialState, action) {
  /* Next we should build the switch statement inside the reducer. The switch should test the type property of the action object. It should return state unaltered as the default. Let's also destructure the action object for easy access to its properties. */
  const { type, payload } = action;
  /* Next we need to tell the reducer what to do with these actions when it recieves them. Let's add a case for each of our actions to our switch. These should match the action types we just made. */

  /* Each case should update the piece of state that it needs to, and copy the rest of state in an immutable way. */
  /* we need to tell the reducer what to do with these action objects when it recieves them. Let's add a case for each action to our switch. They should match the types we just made, and they should update the piece of state that they need to, and copy the rest of state in an immutable way. */
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    case UPDATE_AUTHOR_FIRST:
      return { ...state, authorFirst: payload };
    case UPDATE_AUTHOR_LAST:
      return { ...state, authorLast: payload };
    /* ADD_INGREDIENT - This case will look a little more complicated than the ones we've done before because we're working with a list now, so we'll need to make a copy of that list before making changes. */
    case ADD_INGREDIENT:
      const newIngredients = [...state.ingredients, payload];
      return { ...state, ingredients: newIngredients };
    case ADD_INSTRUCTION:
      const newInstructions = [...state.instructions, payload];
      return { ...state, instructions: newInstructions };
    /* Now we'll add a case to our reducer. This case will be quite a bit different from what we've done so far, because it doesn't use a payload. Payloads are really useful when we need to transfer data from a component to Redux, but in this circumstance all the data is already being stored in Redux. So we'll pull all the values we've been storing so far off of state and build a recipe object with it. */
    case ADD_RECIPE:
      const {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      } = state;
      const recipe = {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      };
      const newRecipes = [...state.recipes, recipe];
      return { ...state, recipes: newRecipes };

    default:
      return state;
  }
}

export default createStore(reducer);
