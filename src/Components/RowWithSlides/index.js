import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ArrowSquare from '../ArrowSquare';
import RowSlide from '../RowSlide';
import SlideMoreInfo from '../SlideMoreInfo';

import styles from './styles.module.scss';

import getSlideMoreInfo from '../../actions/getSlideMoreInfo';
import { removeSliderMoreInfo } from '../../actions/getSlideMoreInfo'

class RowWithSlides extends Component {
	state = {
		currentIndex: 0,
		translateValue: 0,
		maxIndex: 0,
		numOfSlides: 5,
		moreInfoProps: null,
		moreInfoOpen: false
	}

	componentDidMount() {
		const { numOfSlides } = this.props;

		this.setState({
			maxIndex: Math.round(this.props.data.length / this.state.numOfSlides),
			numOfSlides,
		})

		document.documentElement.style.setProperty('--slide-width', `${100 / numOfSlides}%`);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			this.setState({
				maxIndex: Math.ceil(this.props.data.length / this.state.numOfSlides)
			})
		}

		if (this.props.numOfSlides !== prevProps.numOfSlides) {
			this.setState({
				maxIndex: Math.ceil(this.props.data.length / this.props.numOfSlides),
				numOfSlides: this.props.numOfSlides
			});

			document.documentElement.style.setProperty('--slide-width', `${100 / this.props.numOfSlides}%`);
		}
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.data !== this.props.data) {
	// 		this.setState({
	// 			maxIndex: Math.ceil(nextProps.data.length / this.state.numOfSlides)
	// 		})
	// 	}
	// }

	goToPrevSlide = () => {
		if (this.state.currentIndex === 0)
			return;

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex - 1,
			translateValue: prevState.translateValue + this.slideWidth()
		}))
	}

	goToNextSlide = () => {
		if (this.state.currentIndex + 1 === this.state.maxIndex) {
			return
		}

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex + 1,
			translateValue: prevState.translateValue + -(this.slideWidth())
		}));
	}

	isCursorDisabled = direction => {
		if (direction === 'left' && this.state.currentIndex === 0) {
			return true;
		}

		if (direction === 'right' && this.state.currentIndex + 1 === this.state.maxIndex) {
			return true;
		}
	}

	slideWidth = () => {
		return document.getElementsByClassName(`sliderWidth-${this.props.id}`)[0].clientWidth
	}

	isHoverOpen = (num, isHover) => {
		const { id } = this.props;
		const { numOfSlides } = this.state;

		const transitionWidth = document.getElementsByClassName(`slide-${id}-${num}`)[0].clientWidth * 1.95 / 2;
		const lengthOfSlides = this.props.data.length;
		const setTransformToSlide = this.setTransformToSlide;
		const removeTransformOnSlide = this.removeTransformOnSlide;

		switch (0) {
			case num % numOfSlides:
				setTransformToSlide(num, transitionWidth / 2);

				if (num >= lengthOfSlides - numOfSlides) {
					for (let i = num + 1; i < lengthOfSlides; i++) {
						setTransformToSlide(i, transitionWidth);
					}
				} else {
					for (let i = num + 1; i < num + numOfSlides + 1; i++) {
						setTransformToSlide(i, transitionWidth);
					}
				}
				break;
			case (num + 1) % numOfSlides:
				setTransformToSlide(num, -transitionWidth / 2);

				if (num < numOfSlides) {
					for (let i = 0; i < num; i++) {
						setTransformToSlide(i, -transitionWidth);
					}
				} else {
					for (let i = num - 1; i > num - numOfSlides - 1; i--) {
						setTransformToSlide(i, -transitionWidth);
					}
				}
				break;
			default:
				if (num < numOfSlides && num < lengthOfSlides - numOfSlides) {
					for (let i = 0; i < num; i++) {
						setTransformToSlide(i, -transitionWidth / 2);
					}

					for (let i = num + 1; i < num + 6; i++) {
						setTransformToSlide(i, transitionWidth / 2);
					}
				} else if (num > lengthOfSlides - numOfSlides) {
					for (let i = num + 1; i < lengthOfSlides; i++) {
						setTransformToSlide(i, transitionWidth / 2);
					}

					for (let i = num - 1; i > num - numOfSlides; i--) {
						setTransformToSlide(i, -transitionWidth / 2);
					}
				} else {
					for (let i = num + 1; i < num + numOfSlides; i++) {
						setTransformToSlide(i, transitionWidth / 2);
					}

					for (let i = num - 1; i > num - numOfSlides; i--) {
						setTransformToSlide(i, -transitionWidth / 2);
					}
				}
		}

		if (!isHover) {
			removeTransformOnSlide()
		}
	}

	setTransformToSlide = (numOfSlide, translateWidth) => {
		const { id } = this.props;

		document.getElementsByClassName(`slide-${id}-${numOfSlide}`)[0]
			.setAttribute("style", `z-index: 4; transform: translateX(${translateWidth}px);`);
	}

	removeTransformOnSlide = () => {
		const { id } = this.props;

		Array.from(document.getElementsByClassName(`slide-${id}`)).forEach(element => {
			element.setAttribute("style", "");
		});
	}

	openMoreInfo = (id, slide) => {
		document.getElementsByClassName(slide)[0].childNodes[0].classList.add(styles.openedborder);
		this.props.type === 'tv' ? this.props.getSlideMoreInfo(id, 'tv') : this.props.getSlideMoreInfo(id, 'movie');

		this.setState({
			moreInfoOpen: true
		})
	}

	changeMoreInfo = () => {
		const {
			id,
		} = this.props;

		Array.from(document.getElementsByClassName(`slide-${id}`)).forEach(element => {
			element.childNodes[0].classList.remove(styles.openedborder);
		});
	}

	closeMoreInfo = () => {
		const {
			id,
			removeSliderMoreInfo,
		} = this.props;

		Array.from(document.getElementsByClassName(`slide-${id}`)).forEach(element => {
			element.childNodes[0].classList.remove(styles.openedborder);
		});

		removeSliderMoreInfo();

		this.setState({
			moreInfoOpen: false
		})
	}

	render() {
		const {
			maxIndex,
			currentIndex,
			translateValue
		} = this.state;

		const {
			title,
			id,
			data,
			viewAll,
			type,
			numOfSlides,
		} = this.props;

		return (
			<div className={styles.row}>
				<div className={styles.header_row}>
					<h2 className={styles.title}>
						{title}
					</h2>

					<div className={styles.sliderControl}>
						<div className={styles.sliderScale}>
							{currentIndex + 1} / {maxIndex}
						</div>

						{
							viewAll &&
							<Link className={styles.viewBtn}
								to={`/more/${type}/${title.toLowerCase().replace(/ /g, "_")}`}
							>
								View All
								</Link>
						}

						<ArrowSquare className={styles.leftArrow}
							disabled={this.isCursorDisabled('left')}
							goToNextSlide={this.goToPrevSlide}
							icon='angle-left'
						/>

						<ArrowSquare className={styles.rightArrow}
							disabled={this.isCursorDisabled('right')}
							goToNextSlide={this.goToNextSlide}
							icon='angle-right'
						/>
					</div>
				</div>

				<div className={styles.netflixSlider}>
					<div className={styles.sliderRow}>
						<div className={styles.slider}>
							<div className={`sliderWidth-${id}`}>
								<div className={styles.slider_wrapper}
									style={{
										transform: `translateX(${translateValue}px)`
									}}
								>
									{
										data.map((item, i) => (
											<RowSlide
												type={type}
												idOfSlider={id}
												isHoverOpen={this.isHoverOpen}
												isHoverClose={this.isHoverClose}
												numOfSlide={i}
												img={item.backdrop_path ? item.backdrop_path : item.poster_path}
												title={type === 'movie' ? item.title : item.name}
												key={i}
												openMoreInfo={this.openMoreInfo}
												moreInfoOpen={this.state.moreInfoOpen}
												changeMoreInfo={this.changeMoreInfo}
												date={type === 'movie' ? item.release_date : item.first_air_date}
												match={item.vote_average}
												pg={item.adult}
												genres={item.genre_ids.slice(0, 3)}
												id={item.id}
												overview={item.overview}
												numOfSlides={numOfSlides}
											/>
										))
									}
								</div>
							</div>
						</div>

						<span>
							<SlideMoreInfo
								closeMoreInfo={this.closeMoreInfo}
								className={this.state.moreInfoOpen ? styles.moreInfoOpen : ''}
								type={type}
							/>
						</span>
					</div>
				</div>
			</div>
		);
	}
}

RowWithSlides.defaultProps = {
	data: [],
	viewAll: true,
}

export default connect(state => ({
	isLoading: state.getSlideMoreInfo.isLoading,
	numOfSlides: state.getNumOfSlides,
}), { getSlideMoreInfo, removeSliderMoreInfo })(RowWithSlides);
