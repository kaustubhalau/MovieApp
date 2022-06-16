
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
export const SET_SHOW_FAVOURITES = 'sET_SHOW_FAVOURITES';

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