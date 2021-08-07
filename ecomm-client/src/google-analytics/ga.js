import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'
import ReactGA from 'react-ga'

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label
    });
};

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
            ReactGA.set({page: window.location.pathname})
            ReactGA.pageview(window.location.pathname + window.location.search)
        }
    }, [start, location])
}

export default useGaTracker
