import { GET_TV_AIRING_TODAY, REQUEST_TV_AIRING_TODAY } from '../types';

const saveTVAiringToday = payload => ({
	type: GET_TV_AIRING_TODAY,
	payload
});

const requestTVAiringToday = () => ({
	type: REQUEST_TV_AIRING_TODAY
});

const getTVAiringToday = () => (dispatch, getState) => {
	if (!getState().getTVAiringToday.isFetching && getState().getTVAiringToday.data.length === 0) {
		dispatch(requestTVAiringToday());
		return fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveTVAiringToday(data.results)))
			.catch(error => console.log(error));
	}
};

export default getTVAiringToday;
