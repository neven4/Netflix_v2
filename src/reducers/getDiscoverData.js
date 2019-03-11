import { GET_DISCOVER_DATA } from '../actions/types';

const initialState = {
	isLoading: true,
	data: {
		results: []
	}
}

const getDiscoverData = (state = initialState, action) => {
	switch(action.type) {
		case GET_DISCOVER_DATA:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getDiscoverData;
