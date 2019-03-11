import { SET_WINDOW_WIDTH } from '../actions/types';

const getNumOfSlides = (state = 5, action) => {
	switch(action.type) {
		case SET_WINDOW_WIDTH:
			return action.numOfSlides
		default:
			return state;
	}
}

export default getNumOfSlides;
