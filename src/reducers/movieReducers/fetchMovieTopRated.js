import { GET_MOVIE_TOP_RATED, REQUEST_TOP_RATED_MOVIE } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getMovieTopRated = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_TOP_RATED_MOVIE:
			return {
				...state,
				isFetching: true,
			}
		case GET_MOVIE_TOP_RATED:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getMovieTopRated;
