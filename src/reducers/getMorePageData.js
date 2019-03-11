import { GET_MORE_PAGE_DATA } from '../actions/types';

const initialState = {
	isLoading: true,
	data: {
		results: []
	}
}

const getMorePageData = (state = initialState, action) => {
	switch(action.type) {
		case GET_MORE_PAGE_DATA:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getMorePageData;
