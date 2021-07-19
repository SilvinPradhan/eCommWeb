import React from 'react'
import {useHistory} from 'react-router-dom'
import './PageNotFound.scss'

const PageNotFound = () => {
    let history = useHistory()
    return (
        <>
            <div className="container-body">
                <div className="noise"></div>
                <div className="overlay"></div>
                <div className="terminal">
                    <h1>Error <span className="errorcode">404</span></h1>
                    <p className="output">The page you are looking for might have been removed, had its name changed or
                        is
                        temporarily unavailable.</p>
                    <p className="output">Please try to <a className={'errorRedirect'} href={() => history.goBack()}>go
                        back</a>{` `}
                        or <a className={'errorRedirect'} href="/">return to the homepage</a>.
                    </p>
                    <p className="output">Good luck.</p>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
