import React from "react";
// import { StoreContext } from "..";
// import { connect } from "..";  // WE CAN NOW IMPORT CONNECT FROM REACT-REDUX
// import { data } from "../data";
import {addMovieToList, handleMovieSearch} from '../actions';
import { connect } from "react-redux";


class Navbar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      searchText: ''
    }
    
  }

  handleAddToMovies = (movies) => {
    this.props.dispatch(addMovieToList(movies));
    this.setState({
      showSearchResults: false
    });
  }

  handleSearch = () => {
    const { searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
  };

    render(){
      // we can also rename during destructuring like we did with result: movies
      const { result: movies, showSearchResults } = this.props.search;
      // console.log(movies);
        return (
            <div className="nav">
              <div className="search-container">
                <input onChange={this.handleChange} />
                <button id="search-btn" onClick={this.handleSearch}>Search</button>
              
                {showSearchResults &&
                  <div className="search-results">
                    <div className="search-result">
                      <img src={movies.Poster} alt = "search-pic"/>
                      
                      <div className="movie-info">
                        <span>{movies.Title}</span>
                        <button onClick={() => this.handleAddToMovies(movies)}>
                          Add to movies
                        </button>
                      </div>
                    </div>
                  </div>
                }             
              </div>
            </div>
          );
    }
}

// class NavbarWrapper extends React.Component{
//   render() {
//     return (   
//       //we have used dispatch in Navbar so we are using dispatch here
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch = {store.dispatch} search = {this.props.search}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }
// export default NavbarWrapper;

//connecting NavBar component to store
function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);
