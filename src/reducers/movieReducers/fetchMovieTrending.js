import { GET_MOVIE_TRENDING } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: []
}

const getMovieTrending = (state = initialState, action) => {
	switch(action.type) {
		case GET_MOVIE_TRENDING:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getMovieTrending;
