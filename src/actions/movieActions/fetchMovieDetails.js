import { GET_MOVIE_DETAILS, REMOVE_MOVIE_DETAILS } from '../types';

const saveMovieDetails = payload => ({
	type: GET_MOVIE_DETAILS,
	payload
});

export const removeMovieDetails = () => ({
	type: REMOVE_MOVIE_DETAILS
});

const getMovieDetails = (id, type) => (dispatch, getState) => {
	return fetch(`https://api.themoviedb.org/3/${ type }/${id}?api_key=3b109585c45d0aba8e124eec923c5597&append_to_response=keywords,changes,credits,images,keywords,releases,reviews,similar,translations,videos`)
		.then(res => res.json())
		.then(data => dispatch(saveMovieDetails(data)))
		.catch(error => console.log(error));
};

export default getMovieDetails;
