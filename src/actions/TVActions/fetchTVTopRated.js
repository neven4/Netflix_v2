import { GET_TV_TOP_RATED, REQUEST_TV_TOP_RATED } from '../types';

const saveTVTopRated = payload => ({
	type: GET_TV_TOP_RATED,
	payload
});

const requestTVTopRated = () => ({
	type: REQUEST_TV_TOP_RATED
});

const getTVTopRated = () => (dispatch, getState) => {
	if (!getState().getTVTopRated.isFetching && getState().getTVTopRated.data.length === 0) {
		dispatch(requestTVTopRated());
		return fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveTVTopRated(data.results)))
			.catch(error => console.log(error));
	}
};

export default getTVTopRated;
