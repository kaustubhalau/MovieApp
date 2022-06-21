
// {
//     type: 'ADD_MOVIES',
//     movies: [m1, m2, m3]
// }
// {
//     type: 'DECREASE_COUNT'
// }



//ACTION TYPE
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIES_TO_LIST = 'ADD_MOVIES_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

//action creators
export function addMovies (movies){
    return{
        type:ADD_MOVIES,
        movies  // it is same as -->movies:data , recieved this data from app.js where this function is called
    }
}

export function addFavourite (movies){
    return{
        type:ADD_TO_FAVOURITES,
        movies 
    }
}

export function removeFromFavourites (movies){
    return{
        type:REMOVE_FROM_FAVOURITES,
        movies
    };
}

export function setShowFavourites (val){
    return{
        type:SET_SHOW_FAVOURITES,
        val               // val can be true or false
    };
}

export function addMovieToList(movies){
    return {
        type:ADD_MOVIES_TO_LIST,
        movies
    }
}

export function handleMovieSearch (searchText) {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=bc71f240&t=${searchText}`;
    
    return function(dispatch){    // here we are returning a function so we create a thunk middleware in index/src
        fetch(url)
        .then(response => response.json())
        .then(movies =>{
            console.log('movies its working', movies);


            // dispatch an action
            dispatch(addMovieSearchResult(movies));
        })
    }   
}

export function addMovieSearchResult (movies){
    return {
        type: ADD_SEARCH_RESULT,
        movies
    };
}
