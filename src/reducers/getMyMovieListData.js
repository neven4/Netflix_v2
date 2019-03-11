import { ADD_TO_MY_MOVIE_LIST, REMOVE_FROM_MY_MOVIE_LIST } from '../actions/types';

const getMyMovieListData = (state = [], action) => {
	switch(action.type) {
		case ADD_TO_MY_MOVIE_LIST:
			return [
                ...state,
                action.data
            ]
		case REMOVE_FROM_MY_MOVIE_LIST:
			return state.filter(item => item.id !== action.id)
		default:
			return state;
	}
}

export default getMyMovieListData;
