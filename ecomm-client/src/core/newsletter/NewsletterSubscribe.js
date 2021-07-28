import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

const NewsletterSubscribe = () => {

    const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;

    return (
        <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={(props) => {
                const {subscribe, status, message} = props || {};
                return (
                    <NewsletterForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                );
            }}
        />
    );
};

export default NewsletterSubscribe;
