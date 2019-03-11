import React from 'react';

import styles from './styles.module.scss';

const colorOfMatch = num => {
    if (num >= 70) {
        return '#9FEC3C';
    } else if (num >= 50 && num < 70) {
        return '#FFCC33'
    } else {
        return '#EC3C3C'
    }
}

const FilmInfoSmall = props => {
    const {
        className,
        match,
        date,
        pg,
        duration
    } = props;

    const year = new Date(date).getFullYear();
    const matchPersent = match * 10;

    return (
        <div className={ `${ styles.filmInfoSmall } ${ className }` }>
            {
                match &&
                    <span style={{ color: `${colorOfMatch(matchPersent)}` }}>
                        { matchPersent }% Match
                    </span>
            }

            {
                date &&
                    <span className={ styles.year }>
                        { year }
                    </span>
            }

            {
                (pg || !pg) &&
                    <span className={ styles.pg }>
                        {
                            pg ?  '12+' : '16+'
                        }
                    </span>
            }

            {
                duration &&
                    <span className={ styles.duration }>
                        <span>
                            { Math.floor(duration / 60) === 0 ? '' : `${ Math.floor(duration / 60) }h ` }
                        </span>

                        <span>
                            { duration % 60 === 0 ? '' : `${ duration % 60 }m` }
                        </span>
                    </span>
            }
        </div>
    )
}

FilmInfoSmall.defaultProps = {
    className: '',
    match: '',
    date: '',
    pg: '',
    duration:''
}

export default FilmInfoSmall;
