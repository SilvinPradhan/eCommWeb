// const sgMail = require('@sendgrid/mail')
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

// const {sendEmailWithNodemailer} = require("../helpers/email");
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host: "techline2006@gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        pass: process.env.EMAIL_SPECIFIC_PASSWORD, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
        ciphers: "SSLv3",
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error)
    } else {
        // return transporter
        //     .sendMail(emailData)
        //     .then((info) => {
        //         console.log(`Message sent: ${info.response}`);
        //         return res.json({
        //             success: true,
        //         });
        //     })
        //     .catch((error) => console.log(`Problem sending email: ${error}`));
        console.log("Server is ready to take our messages!");
    }
})

exports.contactForm = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    const mail = {
        from: email,
        to: `${process.env.EMAIL_TO}`,
        subject: `Contact Form(${process.env.APP_NAME}) - ${subject}`,
        text: `
            Email received from Contact Form: \n
            Sender Name: ${name} \n
            Sender Email: ${email} \n
            Sender Message: ${message}
        `,
        html: `
            <h4> Email received from Contact Form: </h4>
            <p>Sender Name: ${name}</p>
            <p>Sender Email: ${email}</p>
            <p>Sender Message: ${message}</p>
               <hr />
            <p>This email contain sensitive information. Please ignore/delete this message if it is not intended to reach to you.</p>
            <p>https://eCommWeb.com</p>
        `
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
        .then((info) => {
            console.log(`Message sent: ${info.response}`);
            return res.json({
                success: true,
            });
        })
        .catch((error) => console.log(`Problem sending email: ${error}`));
};
