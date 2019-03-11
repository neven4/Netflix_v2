import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo';

import styles from './styles.module.scss';

class Footer extends Component {
  	render() {
	    return (
		        <div className={ styles.footer }>
			        <div className={ styles.footerLeftSide }>
						<Link className={ styles.footerLogo }
							to='/'
						>
							<Logo />
						</Link>

				        <span className={ styles.copyright }>
							Copyright ©2019
						</span>
			        </div>

					<div className={ styles.footerCenter }>
						<span className={ styles.footerCenterText }>
							<span>Code and Design by</span>

							<a className={ styles.footerLinkExternal }
								href='https://neven4.github.io/portfolio/'
								target="_blank"
								rel="noopener noreferrer"
							>
								Kirill Kazakov
							</a>
						</span>

						<span className={ styles.footerCenterText }>
							Design inspired by

							<a className={ styles.footerLinkExternal }
								href='https://www.behance.net/gallery/44701943/Netflix-UI-Restyle'
								target="_blank"
								rel="noopener noreferrer"
							>
								Emiliano Cicero
							</a>
						</span>

						<span className={ styles.footerCenterText }>
							Portfolio:

							<a className={ styles.footerLinkExternal }
								href='https://neven4.github.io/portfolio/'
								target="_blank"
								rel="noopener noreferrer"
							>
								https://neven4.github.io/portfolio/
							</a>
						</span>

						<span className={ styles.footerCenterText }>
							Email:

							<a className={ styles.footerLinkExternal }
								href='mailto:kazakovkirill1@gmail.com'
							>
								kazakovkirill1@gmail.com
							</a>
						</span>
					</div>

			        <div className={ styles.footerRightSide }>
						<a href='https://www.themoviedb.org/documentation/api'
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={ styles.footerTmdbLogo } />
						</a>

						<div className={ styles.footerIcons }>
							<a className={ styles.footerIcon }
								href='https://github.com/neven4'
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-github"></i>
							</a>

							<a className={ styles.footerIcon }
								href='https://vk.com/id65118313'
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-vk"></i>
							</a>

							<a className={ styles.footerIcon }
								href='https://github.com/neven4/Netflix'
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fas fa-code"></i>
							</a>
						</div>
			        </div>
		        </div>
	    );
  	}
}

export default Footer;
