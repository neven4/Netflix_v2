import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import getMovieDetails from '../../actions/movieActions/fetchMovieDetails';
import { removeMovieDetails } from '../../actions/movieActions/fetchMovieDetails';

import DetailsMain from '../DetailsMain';
import Cast from '../Cast';
import Review from '../Review';
import ScrollToTop from '../ScrollToTop';

class DetailsPage extends Component {
	componentDidMount() {
		this.props.getMovieDetails(this.props.match.params.id, this.props.match.params.type)
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.props.getMovieDetails(this.props.match.params.id, this.props.match.params.type)
		  }
	}

	componentWillUnmount() {
		this.props.removeMovieDetails();
	}

	render() {
		const {
			match
		} = this.props;

		return (
			<div>
				<ScrollToTop>
					<Route
						exact
						path={ match.url }
						render={ (props) => <DetailsMain {...props} type={ match.params.type } /> }
					/>
					<Route path={ `${match.url}/cast` } component={ Cast } />
					<Route path={ `${match.url}/reviews` } component={ Review } />
				</ScrollToTop>
            </div>
    	);
	}
}

export default connect(null, { getMovieDetails, removeMovieDetails })(DetailsPage);
