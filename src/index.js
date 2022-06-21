/**
 * npm i redux
 * 
 * npm i redux-thunk
 */
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react';
// import {data} from '../data';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
// import movies from './reducers';
import rootReducer from './reducers';  // now we don't need movies to import as we have root reducer now
import thunk from 'redux-thunk';

//HERE WE ARE USING THE CONCEPT OF CURRYING-->logger(obj, next, action)
//APPLY MIDDLEWARE IS USED OR IMPORTED TO TELL REDUX THAT WE HAVE MIDDLWARE
/*
const logger = function({dispatch, getStore}){ //dispatch and getStore are not store object here they are simly here for understanding they have nothing to do with store object
  return function(next){
    return function(action){
      //MIDDLEWARE CODE
      console.log('ACTION_TYPE =',action.type);
      next(action);
    }
  }
}
*/
//WE CAN ALSO WRITE ABOVE LOGGER LIKE THIS
const logger = ({dispatch, getStore}) => (next) => (action) => {
  //MIDDLEWARE CODE
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE =',action.type);    
  }

  next(action);
}

//middleware created for handleMovieSearch action
/*  We can also use thunk package in redux
const thunk = ({dispatch, getStore}) => (next) => (action) => {
  //MIDDLEWARE CODE
  if(typeof action == 'function'){
    action(dispatch);
    return;
  }
  next(action);
}
*/

//CALLED APPLY MIDDLEWARE HERE
const store = createStore(rootReducer,applyMiddleware(logger, thunk));  //getting it from function defined in reducers
console.log('store', store);       // here we can see all the functions of store in console
// console.log('Before_State',store.getState());

// store.dispatch({   // this function store help us with actions
//    type: 'ADD_MOVIES',
//    movies: [{name:'Superman'}]
// });

console.log('After_State',store.getState());


// read the difference between context and props/store
export const StoreContext = createContext();
console.log('StoreContext', StoreContext);

class Provider extends React.Component{
  render(){
    {/* wrapping our app component so that store is available in app */}
    const { store } = this.props;
    return ( <StoreContext.Provider value={store}> 
      {this.props.children}  {/*// everything between provide tag is children-->So this will render app component*/}
    </StoreContext.Provider>
    )
  }
}


//*********************************************SEE CODING NINJAS BOOKMARK VIDEO AGAIN TO REVISE THIS CONCEPT***********************************************
// const connectedComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              return <ConnectedComponent store={store} />;
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    {/* wrapping our app component so that store is available in app */}
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>
);




