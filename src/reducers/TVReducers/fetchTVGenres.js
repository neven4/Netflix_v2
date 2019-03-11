import { GET_TV_GENRES } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: []
}

const getTVGenres = (state = initialState, action) => {
	switch(action.type) {
		case GET_TV_GENRES:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getTVGenres;
