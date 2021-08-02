import React from 'react'
import {Container} from "@material-ui/core";
import './Footer.scss'

const Footer = () => {
    return (
        <div className={"footer"}>
            <Container>
                <div className={"footer-content"}>
                    <div className='footer-copyright'>
                        <span>© {new Date().getFullYear()} eCommWeb Store</span>
                    </div>
                    <ul className='footer-social-item'>
                        <li>
                            <a href='/#facebook' rel='noreferrer noopener' target='_blank'>
                                <span className='facebook-icon'/>
                            </a>
                        </li>
                        <li>
                            <a href='/#instagram' rel='noreferrer noopener' target='_blank'>
                                <span className='instagram-icon'/>
                            </a>
                        </li>
                        <li>
                            <a href='/#github' rel='noreferrer noopener' target='_blank'>
                                <span className='github-icon'/>
                            </a>
                        </li>
                        <li>
                            <a href='/#linkedin' rel='noreferrer noopener' target='_blank'>
                                <span className='linkedin-icon'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}

export default Footer
