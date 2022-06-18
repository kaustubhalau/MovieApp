import React from "react";
import {data} from "../data";
import Navbar from "./Navbar"; 
import MovieCard from "./MovieCard";
import {addMovies, setShowFavourites} from "../actions";




class App extends React.Component {
  componentDidMount (){
    const {store} = this.props;
    store.subscribe(() =>{
      console.log('UPDATED');
      this.forceUpdate();   //avoid using this function ,This will again call render
    })
    //make api call
    //dispatch action
    store.dispatch(addMovies(data)); // callses from index.js /Actions    // WHENEVER WE DEISPATCH AN ACTION ABOVE SUBSCRIBE IS CALLED
    

    console.log('State',this.props.store.getState());

    
  }
  isMovieFavourite = (movie) => {      // this function will get movie as argument and it will check the state whether the movie in in favourite array or not
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie); // this will check wether perticular movie is available in favourites array, if not it will return -1
    
    if(index !== -1){

      // found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) =>{   // for value we have to call this function in button down there
    this.props.store.dispatch(setShowFavourites(val)); // setShowFvourites coming from actions
  }

  render(){
    const { movies } = this.props.store.getState();//our state-->{movies: {}, search ()} 
    console.log('Render');
    const { list, favourites, showFavourites } = movies; 
    console.log('RENDER', this.props.store.getState()); 
    
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
          {/*{`tab ${showFavourites ? '' : 'active-tabs'}`} means if showFavourites is true than apply nothing '' if false then apply 'active-tabs'  */}  
          <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
            {/*{data.map((movie, index) we will get index with each movie */}
            {/*{data.map((movie, index) =>( now we don't need this we can use movies now */}
            {/*{movies.map((movie, index) => now we don't need this now we can use list */}
            {/*list.map((movie, index) =>(  now we can use diaplayMovies.map so we don't need this*/}  
              {displayMovies.map((movie, index) =>(
                <MovieCard movie = {movie} key = {`movies-${index}`} dispatch = {this.props.store.dispatch} isFavourite = {this.isMovieFavourite(movie)} /> //  dispatch = {this.props.store.dispatch} with this movie card has the access of dispatch
              ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display</div>: null}
        </div>
      </div>
    );
  }
}

export default App;
