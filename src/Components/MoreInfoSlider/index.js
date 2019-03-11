import React, { Component } from 'react';

import MoreInfoSlide from '../MoreInfoSlide';

import styles from './styles.module.scss';

class MoreInfoSlider extends Component {
	state = {
        currentIndex: 0,
        translateValue: 0,
		numOfSlides: 4,
		maxIndex: 0
	}

	componentDidMount() {
		const { data } = this.props;
		const { numOfSlides } = this.state;

		this.setState({
			maxIndex: Math.ceil(data.length / numOfSlides)
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			const { data } = this.props;
			const { numOfSlides } = this.state;

			this.setState({
				maxIndex: Math.ceil(data.length / numOfSlides)
			})
		}
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
		if (this.state.currentIndex + 1 === this.state.maxIndex) {
			return;
        }

		this.setState(prevState => ({
			currentIndex: prevState.currentIndex + 1,
			translateValue: prevState.translateValue + -(this.slideWidth())
		}));
	}

    slideWidth = () => {
        return document.getElementsByClassName(`moreInfoSliderWidth`)[0].clientWidth
	}

	render() {
		const {
			currentIndex,
			translateValue,
			maxIndex,
			numOfSlides
		} = this.state;

		const {
			data,
			type,
		} = this.props;

		const width = 100 / numOfSlides;

		return (
			<div className={ styles.moreInfoSlider }>
                <span className={ `${ styles.arrow } ${styles.arrowLeft }` }
                    style={{ opacity: currentIndex !== 0 ? '1' : '0' }}
                    onClick={ this.goToPrevSlide }
                >
                    <span className={ styles.arrowIcon }>
                        <svg id="chevron-down" viewBox="0 0 60 19" width="100%" height="100%">
                            <path fill="currentColor" d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873"></path>
                        </svg>
                    </span>
                </span>

				<span className={ `${ styles.arrow } ${styles.arrowRight }` }
					style={{ opacity: maxIndex === currentIndex + 1 ? '0' : '1' }}
                    onClick={ this.goToNextSlide }
                >
                    <span className={ styles.arrowIcon }>
                        <svg id="chevron-down" viewBox="0 0 60 19" width="100%" height="100%">
                            <path fill="currentColor" d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873"></path>
                        </svg>
                    </span>
                </span>

				<div className={ styles.moreInfoSliderContainer }>
					<div className='moreInfoSliderWidth'>
						<div className={ styles.moreInfoSliderSlidesWrapper }
							style={{
								transform: `translateX(${translateValue}px)`
							}}
						>
							{
								data.map((item, i) => (
									<MoreInfoSlide
                                        key={i}
                                        image={ item.backdrop_path }
                                        date={ type === 'tv' ? item.first_air_date : item.release_date }
                                        match={ item.vote_average }
                                        overview={ item.overview }
										title={ type === 'tv' ? item.name : item.title }
										name={ item.name }
										width={ width }
										videoId={ item.key }
										type={ type }
										id={ item.id }
									/>
								))
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

MoreInfoSlider.defaultProps = {
	data: []
}

export default MoreInfoSlider;
