import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from '../Main';

import getMovieUpcoming from '../../actions/movieActions/fetchMovieUpcoming';
import getMovieNowPlaying from '../../actions/movieActions/fetchMovieNowPlaying';
import getMoviePopular from '../../actions/movieActions/fetchMoviePopular';
import getMovieTopRated from '../../actions/movieActions/fetchMovieTopRated';

import getTVPopular from '../../actions/TVActions/fetchTVPopular';
import getTVTopRated from '../../actions/TVActions/fetchTVTopRated';
import getTVAiringToday from '../../actions/TVActions/fetchTVAiringToday';
import getTVOnTheAir from '../../actions/TVActions/fetchTVOnTheAir';

class Home extends Component {
    componentDidMount() {
        this.fetchHomeData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.path !== prevProps.match.path) {
            this.fetchHomeData()
        }
    }

    fetchHomeData = () => {
        if (this.props.match.path === '/tv') {
            this.props.getTVPopular();
            this.props.getTVTopRated();
            this.props.getTVAiringToday();
            this.props.getTVOnTheAir();
        }

        if (this.props.match.path === '/') {
            this.props.getMovieUpcoming();
            this.props.getMovieNowPlaying();
            this.props.getMoviePopular();
            this.props.getMovieTopRated();
        }
    }

    render() {
        return (
            <Main typeOfDisplay={ this.props.match.path } />
        );
    }
}

export default connect(null, {
    getMovieUpcoming,
    getMovieNowPlaying,
    getMoviePopular,
    getMovieTopRated,

    getTVPopular,
    getTVTopRated,
    getTVAiringToday,
    getTVOnTheAir,
})(Home);
