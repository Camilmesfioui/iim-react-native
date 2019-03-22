// Import react
import React from 'react';

// Import react-nav + Redux + React Redux
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Import Home + Info Template
import HomeScreen from './Home'
import InfoScreen from './Info'

// Import Reducer
import textReducer from './Reducer'

// Main Nav
const MainNavigator = createStackNavigator ({
  Home: {screen: HomeScreen},
  Info: {screen: InfoScreen},
});

// Navigation
const Navigation = createAppContainer(MainNavigator);

// Creating Store
const store = createStore(textReducer)

// Rendering APP wraped into Provider
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