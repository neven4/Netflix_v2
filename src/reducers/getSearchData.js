import { GET_SEARCH_DATA } from '../actions/types';

const initialState = {
	isLoading: true,
	data: {
		results: []
	}
}

const getSearchData = (state = initialState, action) => {
	switch(action.type) {
		case GET_SEARCH_DATA:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getSearchData;
