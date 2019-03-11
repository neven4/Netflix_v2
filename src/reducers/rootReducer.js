import { combineReducers } from 'redux';
import getSlideMoreInfo from './getSlideMoreInfo';
import getSearchData from './getSearchData';
import getMorePageData from './getMorePageData';
import getDiscoverData from './getDiscoverData';
import getPersonData from './getPersonData';
import getNumOfSlides from './getNumOfSlides';

import getMyMovieListData from './getMyMovieListData';
import getMyFavoriteListData from './getMyFavoriteListData';
import getNotificationData from './getNotificationData';

import getMovieUpcoming from './movieReducers/fetchMovieUpcoming';
import getMovieNowPlaying from './movieReducers/fetchMovieNowPlaying';
import getMoviePopular from './movieReducers/fetchMoviePopular';
import getMovieTopRated from './movieReducers/fetchMovieTopRated';
import getMovieDetails from './movieReducers/fetchMovieDetails';
import getMovieGenres from './movieReducers/fetchMovieGenres';
import getMovieTrending from './movieReducers/fetchMovieTrending';

import getTVTrending from './TVReducers/fetchTVTrending';
import getTVPopular from './TVReducers/fetchTVPopular';
import getTVTopRated from './TVReducers/fetchTVTopRated';
import getTVAiringToday from './TVReducers/fetchTVAiringToday';
import getTVOnTheAir from './TVReducers/fetchTVOnTheAir';
import getTVGenres from './TVReducers/fetchTVGenres';

const rootReducer = combineReducers({
    getMovieUpcoming,
    getMovieNowPlaying,
    getMoviePopular,
    getMovieTopRated,
    getMovieDetails,
    getMovieTrending,
    getMovieGenres,

    getSlideMoreInfo,

    getTVTrending,
    getTVPopular,
    getTVTopRated,
    getTVAiringToday,
    getTVOnTheAir,
    getTVGenres,

    getPersonData,
    getSearchData,
    getDiscoverData,
    getMorePageData,

    getMyMovieListData,
    getNotificationData,
    getNumOfSlides,
    getMyFavoriteListData
});

export default rootReducer;
