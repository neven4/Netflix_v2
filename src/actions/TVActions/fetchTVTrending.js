import { GET_TV_TRENDING } from '../types';

const saveTVTrending = payload => ({
	type: GET_TV_TRENDING,
	payload
});

const getTVTrending = () => (dispatch, getState) => {
	return fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=3b109585c45d0aba8e124eec923c5597')
		.then(res => res.json())
		.then(data => dispatch(saveTVTrending(data.results)))
		.catch(error => console.log(error));
};

export default getTVTrending;
