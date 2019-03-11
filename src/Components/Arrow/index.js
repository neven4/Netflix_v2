import React from 'react';

import styles from './styles.module.scss';

const Arrow = props => {
	const {
		className,
		icon
	} = props;

	return (
		<div className={ `${ styles.arrow } ${ className }` }
			onClick={ props.goToNextSlide }
		>
	        <i className={ `fas fa-${ icon }` } />
	    </div>
	);
}

export default Arrow;
