import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slide from '../Slide';
import Arrow from '../Arrow';

import styles from './styles.module.scss';
import Loader from '../Loader';

class Slider extends Component {
	state = {
        currentIndex: 0,
		translateValue: 0,
		numOfSlides: 10
	}

    goToPrevSlide = () => {
		if(this.state.currentIndex === 0)
			return;

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex - 1,
			translateValue: prevState.translateValue + this.slideWidth()
		}))
    }

    goToNextSlide = () => {
		if(this.state.currentIndex === this.state.numOfSlides - 1) {
			return this.setState({
				currentIndex: 0,
				translateValue: 0
			})
        }

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex + 1,
			translateValue: prevState.translateValue + -(this.slideWidth())
		}));
    }

    slideWidth = () => {
        return document.querySelector('.slideHeader').clientWidth
    }

    render() {
		const {
			currentIndex,
			translateValue,
			numOfSlides
		} = this.state;

		const {
			dataTV,
			dataMovie,
			isLoadingTV,
			isLoadingMovie,
			type
		} = this.props;

		const scaleLength = (currentIndex + 1) / numOfSlides * 100;

		const isLoading = type === 'tv' ? isLoadingTV : isLoadingMovie;
		// const data = type === 'tv' ? dataTV : dataMovie;

		return (
				!isLoading
					? <div className={ styles.slider }>
						<div className={ styles.motion_container }>
							<div className={ styles.billboard }>
								<div className={ styles.slider_wrapper }
									style={{
										transform: `translateX(${translateValue}px)`,
										transition: 'transform ease-out 0.45s'
									}}
								>
									{ type === 'tv' ?
										dataTV.slice(0, numOfSlides).map((item, i) => (
											<Slide
												key={i}
												image={ item.backdrop_path }
												title={ item.name }
												date={ item.first_air_date }
												match={ item.vote_average }
												pg={ item.adults }
												overview={ item.overview }
												id={ item.id }
												type={ type }
											/>
										))
										: dataMovie.slice(0, numOfSlides).map((item, i) => (
											<Slide
												key={i}
												image={ item.backdrop_path }
												title={ item.title}
												date={ item.release_date }
												match={ item.vote_average }
												pg={ item.adults }
												overview={ item.overview }
												id={ item.id }
												type={ type }
											/>
										))
									}
								</div>
							</div>
						</div>

						<Arrow
						    className={ `${ styles.leftArrow } ${ styles.arrows }` }
							goToNextSlide={ this.goToPrevSlide }
							icon='arrow-left'
						/>

						<Arrow
						    className={ `${ styles.rightArrow } ${ styles.arrows }` }
							goToNextSlide={ this.goToNextSlide }
							icon='arrow-right'
						/>

						<div className={ styles.sliderScale }>
							<div className={ styles.scale }
								style={{
									width: `${scaleLength}%`
								}}
							/>
						</div>
					</div>
					: <Loader />
		);
	}
}

export default connect(state => ({
	dataMovie: state.getMovieTrending.data,
	dataTV: state.getTVTrending.data,
	isLoadingMovie: state.getMovieTrending.isLoading,
	isLoadingTV: state.getTVTrending.isLoading
}))(Slider);
