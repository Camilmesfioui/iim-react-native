// Import react
import React from 'react';

// Import react-nav = Redux
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Import Home + Info Template
import HomeScreen from './Home'
import InfoScreen from './Info'

// Main Nav
const MainNavigator = createStackNavigator ({
  Home: {screen: HomeScreen},
  Info: {screen: InfoScreen},
});

const Navigation = createAppContainer(MainNavigator);

// Reducer
const textReducer = (state = {}, action) => {
  if (typeof state === 'undefined') {
      return 0;
  }
  switch(action.type){
    case 'TEXT' :
      return {...state, text: action.payload}
    default:
      return state
  }
}

// Store
const store = createStore(textReducer)

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* Correspond to const Navigation */}
        <Navigation/>
      </Provider>
    );
  }
}