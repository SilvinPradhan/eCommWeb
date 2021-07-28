import {useState} from 'react';
import {Button} from "@material-ui/core";

const NewsletterForm = ({status, message, onValidated}) => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);

    const handleFormSubmit = () => {

        setError(null);

        if (!email) {
            setError('Please enter a valid email address');
            return null;
        }

        const isFormValidated = onValidated({EMAIL: email});

        // On success return true
        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return message;
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? formattedMessage : null;
    }

    return (
        <div>
            <h4 className="mb-1 uppercase font-bold d-flex justify-content-center"
                style={{fontFamily: "Bebas Neue", letterSpacing: '1.3px'}}>Subscribe to Newsletter</h4>
            <div className="d-flex justify-content-center newsletter-input-fields">
                <div className="field-group">
                    <input
                        onChange={(event) => setEmail(event?.target?.value ?? '')}
                        type="email"
                        placeholder="Enter Email Address"
                        className="appearance-none rounded-right rounded-left sm:rounded-left-none border border-gray-400 border-b block pl-4 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                </div>
                <div className="button-wrap wp-block-button">
                    <Button
                        variant="contained" color="secondary"
                        onClick={handleFormSubmit}
                        size={"large"}>
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className="min-h-42px justify-content-center d-flex">
                {'sending' === status ? <span className={"container"}>Loading</span> : null}
                {'error' === status || error ? (
                    <div
                        className="text-danger pt-2"
                        dangerouslySetInnerHTML={{__html: error || getMessage(message)}}
                    />
                ) : null}
                {'success' === status && 'error' !== status && !error && (
                    <div className="text-green-200 font-bold pt-2"
                         dangerouslySetInnerHTML={{__html: message}}/>
                )}
            </div>
        </div>
    );
}

export default NewsletterForm
