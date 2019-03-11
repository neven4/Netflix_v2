import {
	ADD_TO_LIKED_LIST,
	ADD_TO_DISLIKED_LIST,
	REMOVE_FROM_LIKED_LIST,
	REMOVE_FROM_DISLIKED_LIST
} from '../actions/types';

const initialState = {
	liked: [],
	disliked: []
}

const getMyFavoriteListData = (state = initialState, action) => {
	switch(action.type) {
		case ADD_TO_LIKED_LIST:
			return {
				...state,
				liked: [
					...state.liked,
					action.data
				]
			}
		case REMOVE_FROM_LIKED_LIST:
			return {
				...state,
				liked: state.liked.filter(item => item.id !== action.id)
			}
		case ADD_TO_DISLIKED_LIST:
			return {
				...state,
				disliked: [
					...state.disliked,
					action.data
				]
			}
		case REMOVE_FROM_DISLIKED_LIST:
			return {
				...state,
				disliked: state.disliked.filter(item => item.id !== action.id)
			}
		default:
			return state;
	}
}

export default getMyFavoriteListData;
