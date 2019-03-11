import React from 'react';

import styles from './styles.module.scss';

const ArrowSquare = ({className, icon, disabled, goToNextSlide}) => {
	return (
		<div className={ `${ styles.arrow } ${ className }` }
			style={{
				cursor:  disabled && 'default'
			}}
			onClick={ goToNextSlide }
		>
			<i className={ `fas fa-${ icon }` }
				style={{
					color: disabled && 'rgba(255, 255, 255, 0.1'
				}}
			/>
	  </div>
	);
}

export default ArrowSquare;
