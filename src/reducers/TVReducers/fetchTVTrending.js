import { GET_TV_TRENDING } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: []
}

const getTVTrending = (state = initialState, action) => {
	switch(action.type) {
		case GET_TV_TRENDING:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getTVTrending;
