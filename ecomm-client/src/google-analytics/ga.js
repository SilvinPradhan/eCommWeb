import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'
import ReactGA from 'react-ga'

function useGaTracker() {
    let location = useLocation();
    const [start, setStart] = useState(false);

    useEffect(() => {
        // Checks if the project is running on a localhost, if not, it will initialize
        if (!window.location.href.includes("localhost")) {
            ReactGA.initialize("UA-204293529-1")
        }
        setStart(true)
    }, [])

    useEffect(() => {
        // Send the pageview to GA with it's location
        if (start) {
            ReactGA.pageview(location.pathname + location.search)
        }
    }, [start, location])
}

export default useGaTracker
