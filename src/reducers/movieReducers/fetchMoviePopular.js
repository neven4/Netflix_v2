import { GET_MOVIE_POPULAR, REQUEST_POPULAR_MOVIE } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getMoviePopular = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_POPULAR_MOVIE:
			return {
				...state,
				isFetching: true,
			}
		case GET_MOVIE_POPULAR:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getMoviePopular;
