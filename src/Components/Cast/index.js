import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import Loader from '../Loader';

class Cast extends Component {
	state = {
		currentGrid: 'table'
	}

	handleGridList = () => {
		this.setState({
			currentGrid: 'list'
		})
	}

	handleGridTabs = () => {
		this.setState({
			currentGrid: 'table'
		})
	}

  	render() {
		const {
			currentGrid
		} = this.state;

	    return (
			!this.props.isLoading
	            ? <div className={ `${ styles.cast } ` }>
					<div className={ styles.controls }>
						<div className={ `${ styles.btn } ${ currentGrid === 'list' && styles.active }`}
							onClick={ this.handleGridList }
						>
							<i className="far fa-list-alt" />
						</div>

						<div className={ `${ styles.btn } ${ currentGrid === 'table' && styles.active }`}
							onClick={ this.handleGridTabs }
						>
							<i className="fas fa-table" />
						</div>
					</div>

					{
						this.props.data.cast.length > 0 &&
							<>
								<h3>Cast</h3>

								<div className={ `${ styles.castBody } ${ currentGrid === 'list' && styles.currentList }` }>
									{
										this.props.data.cast.map((item, i) =>
											<div className={ styles.castBodyItem }
												key={i}
											>
												<div className={ styles.castBodyItemPhoto }>
													<div className={ styles.castBodyItemPhotoContainer }
														style={{
															backgroundImage: !item.profile_path ? `url(${img})` : `url(https://image.tmdb.org/t/p/w185${ item.profile_path })`
														}}
													/>
												</div>

												<div className={ styles.castBodyItemBody }>
													<Link to={ `/person/${ item.id }` }>
														{ item.name }
													</Link>

													<span className={ styles.castBodyItemBodyCaracter }>
														{ item.character }
													</span>
												</div>
											</div>
										)
									}
								</div>
							</>
					}

					{
						this.props.data.crew.length > 0 &&
							<>
								<h3>Crew</h3>

								<div className={ styles.castBody }>
									{
										this.props.data.crew.map((item, i) =>
											<div className={ styles.castBodyItem }
												key={i}
											>
												<div className={ styles.castBodyItemPhoto }>
													<div className={ styles.castBodyItemPhotoContainer }
														style={{
															backgroundImage: !item.profile_path ? `url(${img})` : `url(https://image.tmdb.org/t/p/w185${ item.profile_path })`
														}}
													/>
												</div>

												<div className={ styles.castBodyItemBody }>
													<Link to={ `/person/${ item.id }` }>
														{ item.name }
													</Link>

													<span className={ styles.castBodyItemBodyCaracter }>
														{ item.job }
													</span>
												</div>
											</div>
										)
									}
								</div>
							</>
					}
	            </div>
				: <Loader />
	    );
  	}
}

export default connect(state => ({
	data: state.getMovieDetails.data.credits,
	isLoading: state.getMovieDetails.isLoading
}))(Cast);
