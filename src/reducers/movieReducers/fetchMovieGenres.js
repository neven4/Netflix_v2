import { GET_MOVIE_GENRES } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: []
}

const getMovieGenres = (state = initialState, action) => {
	switch(action.type) {
		case GET_MOVIE_GENRES:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getMovieGenres;
