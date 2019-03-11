import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

import SearchField from '../SearchField';

class HeaderMenu extends Component {
  	render() {
		const {
			className,
			movieData,
			TVData,
			handleCloseMenu
		} = this.props;

	    return (
			<div className={ `${ styles.headerMenu } ${ className }` }>
				<div className={ styles.headerMenuContainer }>
				    <div className={ styles.headerMenuMainMenu }>
						<div className={ styles.headerMenuMainMenuSearch }>
							<SearchField isMenuOpen={ true } 
								click={ handleCloseMenu }
							/>
						</div>

						<ul>
							<li>
								<Link to='/discover'
									onClick={ handleCloseMenu }
								>
									Discover
								</Link>
							</li>

							<li>
								<Link to='/'
									onClick={ handleCloseMenu }
								>
									Movies
								</Link>
							</li>

							<li>
								<Link to='/tv'
									onClick={ handleCloseMenu }
								>
									TV Series
								</Link>
							</li>

							<li>
								<Link to='/mylist'
									onClick={ handleCloseMenu }
								>
									My List
								</Link>
							</li>

							<li>
								<Link to='/'
									onClick={ handleCloseMenu }
								>
									My Profile
								</Link>
							</li>

							<li>
								<Link to='/'
									onClick={ handleCloseMenu }
								>
									My Favorite
								</Link>
							</li>

						</ul>
					</div>

					<div className={ styles.headerMenuPopular }>
						<div className={ styles.headerMenuPopularItem }>
							<h3>Trending Movies</h3>

							<ul>
								{
									movieData.slice(0, 4).map((el, i) =>
										<li key={ i }>
											<Link to={`/movie/details/${ el.id }`}
												onClick={ handleCloseMenu }
											>
												<div className={ styles.headerMenuPlay }>
													<i className="fas fa-play" />
												</div>

												<span className={ styles.headerMenuLinkTitle }>
													{ el.title }
												</span>
											</Link>
										</li>
									)
								}
							</ul>
						</div>

						<div className={ styles.headerMenuPopularItem }>
							<h3>Trending TV Series</h3>

							<ul>
								{
									TVData.slice(0, 4).map((el, i) =>
										<li key={ i }>
											<Link to={`/tv/details/${ el.id }`}
												onClick={ handleCloseMenu }
											>
												<div className={ styles.headerMenuPlay }>
													<i className="fas fa-play" />
												</div>

												<span className={ styles.headerMenuLinkTitle }>
													{ el.name }
												</span>
											</Link>
										</li>
									)
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
	    );
  	}
}

export default connect(state => ({
	movieData: state.getMovieTrending.data,
	TVData: state.getTVTrending.data,
}))(HeaderMenu);
