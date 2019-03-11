import React from 'react';

import styles from './styles.module.scss';

import BtnCircle from '../BtnCircle';

const AddBtn = props => {
    return (
        <div className={ `${ styles.addBtn } ${ props.className }` }
            onClick={ props.click }
            title={ props.done ? 'Remove from My list' : 'Add to My list' }
        >
            <BtnCircle className={ `${ styles.addBtnPlus } ${ props.done ? styles.addBtnDone : '' }` }
                icon={ props.done ? 'done' : 'plus' }
            />

            <span className={ styles.addBtnTitle }>
                {
                    props.done
                        ? 'In your list'
                        : 'Add to My List'
                }
            </span>
        </div>
    );
}
export default AddBtn;
