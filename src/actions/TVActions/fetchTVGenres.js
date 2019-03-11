import { GET_TV_GENRES } from '../types';

const saveTVGenres = payload => ({
	type: GET_TV_GENRES,
	payload
});

const getTVGenres = () => (dispatch, getState) => {
	return fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US')
		.then(res => res.json())
		.then(data => dispatch(saveTVGenres(data.genres)))
		.catch(error => console.log(error));
};

export default getTVGenres;
