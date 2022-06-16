// {
//     type: 'ADD_MOVIES',
//     movies: [m1, m2, m3]
// }
// {
//     type: 'DECREASE_COUNT'
// }



//ACTION TYPE
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITES = 'ADD_FAVOURITES';

//action creators
export function addMovies (movies){
    return{
        type:ADD_MOVIES,
        movies  // it is same as -->movies:data , recieved this data from app.js where this function is called
    }
}

export function addFavourite (movies){
    return{
        type:ADD_FAVOURITES,
        movies 
    }
}