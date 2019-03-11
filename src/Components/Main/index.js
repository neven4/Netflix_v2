import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from '../Slider';
import RowWithSlides from '../RowWithSlides';

import styles from './styles.module.scss';

class Main extends Component {
    render() {
        const {
            upcomingMovieData,
            nowPlayingMovieData,
            popularMovieData,
            topRatedMovieData,
            typeOfDisplay,

            airingTodayTVData,
            onTheAirTVData,
            popularTVData,
            topRatedTVData,
        } = this.props;

        return (
            <main className={ styles.main }>
                <Slider type={ typeOfDisplay === '/' ? 'movie' : 'tv' } />

                {
                    typeOfDisplay === '/' &&
                        <>
                            <RowWithSlides
                                title='Popular'
                                id='0'
                                type='movie'
                                data={ popularMovieData }
                            />

                            <RowWithSlides
                                title='Upcoming'
                                id='1'
                                type='movie'
                                data={ upcomingMovieData }
                            />

                            <RowWithSlides
                                title='Now Playing'
                                id='2'
                                type='movie'
                                data= { nowPlayingMovieData }
                            />

                            <RowWithSlides
                                title='Top Rated'
                                id='3'
                                type='movie'
                                data={ topRatedMovieData }
                            />
                        </>
                }

                {
                    typeOfDisplay === '/tv' &&
                        <>
                            <RowWithSlides
                                title='Popular'
                                id='0'
                                type='tv'
                                data={ popularTVData }
                            />

                            <RowWithSlides
                                title='On the air'
                                id='1'
                                type='tv'
                                data={ onTheAirTVData }
                            />

                            <RowWithSlides
                                title='Airing today'
                                id='2'
                                type='tv'
                                data= { airingTodayTVData }
                            />

                            <RowWithSlides
                                title='Top Rated'
                                id='3'
                                type='tv'
                                data={ topRatedTVData }
                            />
                        </>
                }
            </main>
        );
    }
}

export default connect(state => ({
    upcomingMovieData: state.getMovieUpcoming.data,
    nowPlayingMovieData: state.getMovieNowPlaying.data,
    popularMovieData: state.getMoviePopular.data,
    topRatedMovieData: state.getMovieTopRated.data,
    airingTodayTVData: state.getTVAiringToday.data,
    onTheAirTVData: state.getTVOnTheAir.data,
    popularTVData: state.getTVPopular.data,
    topRatedTVData: state.getTVTopRated.data,
}))(Main);
