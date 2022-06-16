import { ADD_MOVIES, ADD_FAVOURITES } from "../actions";

const initialMoviesState = {
    list: [],              // current list
    favourites: []
}
export default function movies (state =initialMoviesState , action){
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
            case ADD_FAVOURITES:
                return{
                    ...state,
                    favourites:[action.movies,...state.favourites] //action.movie add my movie in favourite list and ...state.favourite will spread other favourite movies after that 
                }
            default:
                return state;        
    }   

}

