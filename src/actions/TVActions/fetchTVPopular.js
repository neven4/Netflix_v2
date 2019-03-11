import { GET_TV_POPULAR, REQUEST_TV_POPULAR } from '../types';

const saveTVPopular = payload => ({
	type: GET_TV_POPULAR,
	payload
});

const requestTVPopular = () => ({
	type: REQUEST_TV_POPULAR
});

const getTVPopular = () => (dispatch, getState) => {
	if (!getState().getTVPopular.isFetching && getState().getTVPopular.data.length === 0) {
		dispatch(requestTVPopular());
		return fetch('https://api.themoviedb.org/3/tv/popular?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveTVPopular(data.results)))
			.catch(error => console.log(error));
	}
};

export default getTVPopular;
