// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_KEY)
//
// exports.contactForm = async (req, res) => {
//     const body = req.body;
//     // console.log(data)
//     const emailData = {
//         to: 'techline2006@gmail.com',
//         from: body.email,
//         subject: `
//             Contact Form - ${process.env.APP_NAME}
//         `,
//         text: `
//             Email received from Contact Form: \n
//             Sender Name: ${body.firstName} \n
//             Sender Email: ${body.email} \n
//             Sender Message: ${body.message}
//         `,
//         html: `
//             <h4> Email received from Contact Form: </h4>
//             <p>Sender Name: ${body.firstName}</p>
//             <p>Sender Email: ${body.email}</p>
//             <p>Sender Message: ${body.message}</p>
//                <hr />
//             <p>This email contain sensitive information. Please ignore/delete this message if it is not intended to reach to you.</p>
//             <p>https://eCommWeb.com</p>
//         `
//     };
//     await sgMail.send(emailData).then(sent => {
//         res.status(200).json({status: 'OK'});
//     }).catch((error) => console.log(error))
//
// }

const {sendEmailWithNodemailer} = require("../helpers/email");

exports.contactForm = (req, res) => {
    console.log(req.body);
    const {name, email, message} = req.body;

    const emailData = {
        from: email, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: `${process.env.EMAIL_TO}`, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
        subject: `Contact Form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://onemancode.com</p>
    `,
    };

    sendEmailWithNodemailer(req, res, emailData);
};
