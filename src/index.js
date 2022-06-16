/**
 * npm i redux
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
// import {data} from '../data';
import { createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import App from './components/App';
import movies from './reducers';




const store = createStore(movies);  //getting it from function defined in reducers
console.log('store', store);       // here we can see all the functions of store in console
// console.log('Before_State',store.getState());

// store.dispatch({   // this function store help us with actions
//    type: 'ADD_MOVIES',
//    movies: [{name:'Superman'}]
// });

console.log('After_State',store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>
);


