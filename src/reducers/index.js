import { ADD_MOVIES,
         ADD_MOVIES_TO_LIST,
         ADD_TO_FAVOURITES,
         REMOVE_FROM_FAVOURITES, 
         SET_SHOW_FAVOURITES,
         ADD_SEARCH_RESULT
         } from "../actions";
import { combineReducers } from "redux";

const initialMoviesState = {
    list: [],              // current list
    favourites: [],
    showFavourites: false
}
//movie reducer
export function movies (state =initialMoviesState , action){
    // if(action.type === ADD_MOVIES) {  // coming from dispatch
    //     // return action.movies;
    //     return{
    //         ...state,                // read about javascript spread operator
    //         list: action.movies     // editing list using spread operator
    //     }
    // }
    // return state;
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
            case ADD_TO_FAVOURITES:
                return{
                    ...state,
                    favourites:[action.movies,...state.favourites] //action.movie add my movie in favourite list and ...state.favourite will spread other favourite movies after that 
                }
            case REMOVE_FROM_FAVOURITES:
                const filteredArray = state.favourites.filter(
                    movies => movies.Title !== action.movies.Title  //it will return new array remving that perticular movie from array
                );
                return{
                    ...state,
                    favourites: filteredArray

                };
            case SET_SHOW_FAVOURITES :
                return{
                    ...state,
                    showFavourites: action.val   //coming from action
                }    
            case ADD_MOVIES_TO_LIST:
                return {
                    ...state,
                    list: [action.movies, ...state.list]
                }     
            default:
                return state;        
    }   

}

const initialSearchState = {
    result: {},   /// we are using t parameter in api for search so it will give movie by title if we use s parameter it give list of mivie in that case we dp result:[]
    showSearchResults: false,
}

//search reducer
export function search (state = initialSearchState, action){
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result:action.movies,
                showSearchResults: true
            }
        case ADD_MOVIES_TO_LIST:
            return {
                ...state,
                showSearchResults: false
            }   
        default:
            return state;
    }
}

// const initialRootState = {
//     movies: initialMoviesState,     // defined at top
//     search: initialSearchState
// }


/************************ NOW WE DON'T NEED THIS ROOT RDUCER FUNCTION AS WE CAN DO THE SAME WORK BY USING COMBINE REDUCER FUNCTIONS******* */
// export default function rootReducer(state = initialRootState, action){
//     return{
//         // state.movies is state.initialMoviesState, coming from initialRootState
//         //// state.search is state.initialSearchState, coming from initialRootState
//         movies: movies(state.movies, action),   // movies data can be managed by movie reducer
//         search: search(state.search, action) // search data can be managed by search reducer
//     }
// }
// INSTEAD OF USING ROOT REDUERS WE USED COMBINE REDUCER WHICH WILL DO THE SAME WORK
export default combineReducers({
    movies: movies,       // SAME AS  movies: movies(state.movies, action)
    search: search        // SAME AS  search(state.search, action)
})