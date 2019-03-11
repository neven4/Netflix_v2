import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

import Home from '../Home';
import DetailsPage from '../DetailsPage';
import SearchPage from '../SearchPage';
import ScrollToTop from '../ScrollToTop';
import Header from '../Header';
import Footer from '../Footer';
import MorePage from '../MorePage';
import DiscoverPage from '../DiscoverPage';
import PersonPage from '../PersonPage';
import MyListPage from '../MyListPage';

import getMovieGenres from '../../actions/movieActions/fetchMovieGenres';
import setNumOfSlides from '../../actions/setNumOfSlides';
import getMovieTrending from '../../actions/movieActions/fetchMovieTrending';
import getTVGenres from '../../actions/TVActions/fetchTVGenres';
import getTVTrending from '../../actions/TVActions/fetchTVTrending';


class App extends Component {
	componentDidMount() {
		this.props.getMovieGenres();
		this.props.getMovieTrending();
		this.props.getTVGenres();
		this.props.getTVTrending();
		window.addEventListener('resize', this.handleResize)
	}

	componentDidUpdate(prevProps) {
        if (this.props.match.path !== prevProps.match.path) {
            this.fetchHomeData()
        }
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
	}

	handleResize = () => {
		const { setNumOfSlides } = this.props;

		let width = window.innerWidth;

		if (width < 500) {
			setNumOfSlides(2);
		}
		if (width >= 500 && width < 800) {
			setNumOfSlides(3);
		}

		if (width >= 800 && width <= 1024) {
			setNumOfSlides(4);
		}

		if (width > 1024 && width <= 1400) {
			setNumOfSlides(5);
		}

		if (width > 1400) {
			setNumOfSlides(6);
		}
	}

	render() {
		return (
			<BrowserRouter>
				<ScrollToTop>
					<div className={ styles.app }>
						<Header />

						<Switch>
							<Route exact path="/" component={ Home } />
							<Route path="/:type/details/:id" component={ DetailsPage } />
							<Route path="/search/:query" component={ SearchPage } />
							<Route path="/tv" component={ Home } />
							<Route path="/more/:type/:title" component={ MorePage } />
							<Route path="/discover/:type?/:query?/:id?/:update?" component={ DiscoverPage } />
							<Route path="/person/:id" component={ PersonPage } />
							<Route path="/mylist" component={ MyListPage } />
						</Switch>

						<Footer />
					</div>
				</ScrollToTop>
			</BrowserRouter>
		);
	}
}

export default connect(null, {
	getMovieGenres,
	getMovieTrending,
	getTVGenres,
	getTVTrending,
	setNumOfSlides
})(App);
