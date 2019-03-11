import { GET_TV_ON_THE_AIR, REQUEST_TV_ON_THE_AIR } from '../types';

const saveTVOnTheAir = payload => ({
	type: GET_TV_ON_THE_AIR,
	payload
});

const requestTVAiringToday = () => ({
	type: REQUEST_TV_ON_THE_AIR
});

const getTVOnTheAir = () => (dispatch, getState) => {
	if (!getState().getTVOnTheAir.isFetching && getState().getTVOnTheAir.data.length === 0) {
		dispatch(requestTVAiringToday());
		return fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveTVOnTheAir(data.results)))
			.catch(error => console.log(error));
	}
};

export default getTVOnTheAir;
