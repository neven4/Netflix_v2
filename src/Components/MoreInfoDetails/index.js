import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

class MoreInfoDetails extends Component {
	state = {
		directors: [],
		writers: [],
    }

	componentDidMount() {
		const {	data } = this.props;

		const directors = data.credits.crew.filter((person) => person.department === "Directing");
		const writers = data.credits.crew.filter((person) => person.department === "Writing");

		this.setState({
			directors,
			writers,
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			const {	data } = this.props;

			const directors = data.credits.crew.filter((person) => person.department === "Directing");
			const writers = data.credits.crew.filter((person) => person.department === "Writing");

			this.setState({
				directors,
				writers,
			})
		}
	}

	render() {
		const {
			directors,
			writers
		} = this.state;

		const {
			data,
			type
		} = this.props;

		return (
			<div className={ styles.moreInfoDetails }>
				<div className={ styles.moreInfoDetailsColumn }>
					<ul>
						{
							directors.length > 0 &&
								<>
									<li className={ styles.moreInfoDetailsLabel }>
										{
											directors.length > 1
												? 'Directors'
												: 'Director'
										}
									</li>

									{
										directors.slice(0, 6).map((el, i) =>
											<li key={ i }>
												<Link className={ styles.moreInfoDetailsLink }
													to={ `/person/${ el.id }` }
												>
													{ el.name }
												</Link>
											</li>
										)
									}
								</>
						}

						{
							writers.length > 0 &&
								<>
									<li className={ styles.moreInfoDetailsLabel }>
										{
											writers.length > 1
												? 'Writers'
												: 'Writer'
										}
									</li>

									{
										writers.slice(0, 6).map((el, i) =>
											<li key={ i }>
												<Link className={ styles.moreInfoDetailsLink }
													to={ `/person/${ el.id }` }
												>
													{ el.name }
												</Link>
											</li>
										)
									}
								</>
						}

						{
							data.credits.cast.length > 0 &&
								<>
									<li className={ styles.moreInfoDetailsLabel }>
										Cast
									</li>

									{
										data.credits.cast.length > 15 - directors.length - writers.length - 3
											? (
												data.credits.cast.slice(0, 15 - directors.length - writers.length - 3).map((item, i) =>
													<li key={ i }>
														<Link className={ styles.moreInfoDetailsLink }
															to={ `/person/${ item.id }` }
														>
															{ item.name }
														</Link>
													</li>
												)
											)
											: (
												data.credits.cast.map((item, i) =>
													<li key={ i }>
														<Link className={ styles.moreInfoDetailsLink }
															to={ `/person/${ item.id }` }
														>
															{ item.name }
														</Link>
													</li>
												)
											)
									}
								</>
						}
					</ul>
				</div>

				{
					data.credits.cast.length > 15 - directors.length - writers.length - 3 &&
						<div className={ styles.moreInfoDetailsColumn }>
							<ul>
								<li className={ styles.moreInfoDetailsLabel }>
									Cast
								</li>

								{
									data.credits.cast.slice(15 - directors.length - writers.length - 3, 30 - directors.length - writers.length - 4).map((item, i) =>
										<li key={ i }>
											<Link className={ styles.moreInfoDetailsLink }
												to={ `/person/${ item.id }` }
											>
												{ item.name }
											</Link>
										</li>
									)
								}
							</ul>
						</div>
				}

				{
					data.credits.cast.length > 30 - directors.length - writers.length - 4 &&
						<div className={ styles.moreInfoDetailsColumn }>
							<ul>
								<li className={ styles.moreInfoDetailsLabel }>
									Cast
								</li>

								{
									data.credits.cast.slice(30 - directors.length - writers.length - 4, 45 - directors.length - writers.length - 5).map((item, i) =>
										<li key={ i }>
											<Link className={ styles.moreInfoDetailsLink }
												to={ `/person/${ item.id }` }
											>
												{ item.name }
											</Link>
										</li>
									)
								}
							</ul>
						</div>
				}

				{
					(data.keywords.length > 0 || data.genres.length > 0) &&
						<div className={ styles.moreInfoDetailsColumn }>
							<ul>
								{
									data.genres.length > 0 &&
										<>
											<li className={ styles.moreInfoDetailsLabel }>
												Geners
											</li>

											{
												data.genres.map((item, i) =>
													<li key={ i }>
														<Link className={ styles.moreInfoDetailsLink }
															to={ `/discover/${ type === 'tv' ? 'tv' : 'movie' }/genre/${ item.id }/true` }
														>
															{ item.name }
														</Link>
													</li>
												)
											}
										</>
								}

								{
									type !== 'tv'
										? data.keywords.keywords.length > 0 &&
											<>
												<li className={ styles.moreInfoDetailsLabel }>
													This movie about
												</li>

												{
													data.keywords.keywords.slice(0, 4).map((item, i) =>
														<li key={ i }>
															<Link className={ styles.moreInfoDetailsLink }
																to={ `/discover/${ type === 'tv' ? 'tv' : 'movie' }/keywords/${ item.id }/true` }
															>
																{ item.name }
															</Link>
														</li>
													)
												}
											</>
										: data.keywords.results.length > 0 &&
											<>
												<li className={ styles.moreInfoDetailsLabel }>
													This movie about
												</li>

												{
													data.keywords.results.slice(0, 4).map((item, i) =>
														<li key={ i }>
															<Link className={ styles.moreInfoDetailsLink }
																to={ `/discover/${ type === 'tv' ? 'tv' : 'movie' }/keywords/${ item.id }/true` }
															>
																{ item.name }
															</Link>
														</li>
													)
												}
											</>
								}
							</ul>
						</div>
				}
			</div>
		);
	}
}

MoreInfoDetails.defaultProps = {
	data: []
}

export default MoreInfoDetails;
