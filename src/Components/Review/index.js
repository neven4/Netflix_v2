import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

const Review = props => {
    return (
		props.data.length > 0 &&
            <div className={ styles.reviews }>
				<h3>Reviews</h3>

				{
					props.data.map((item, i) =>
						<div className={ styles.reviewsItem }
							key={i}
						>
							<p className={ styles.reviewsItemBody }>
								&laquo;{ item.content }&raquo;
							</p>

							<div className={ styles.reviewsItemAuthor }>
								{ item.author }
							</div>
						</div>
					)
				}
            </div>
    );
}

export default connect(state => ({
	data: state.getMovieDetails.data.reviews.results
}))(Review);
