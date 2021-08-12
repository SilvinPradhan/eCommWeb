const nodeMailer = require("nodemailer");

exports.sendEmailWithNodemailer = (req, res, emailData) => {
    // const transporter = nodeMailer.createTransport({
    //     host: "techline2006@gmail.com",
    //     service: "gmail",
    //     port: 587,
    //     secure: false,
    //     requireTLS: true,
    //     auth: {
    //         user: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    //         pass: process.env.EMAIL_SPECIFIC_PASSWORD, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    //     },
    //     tls: {
    //         ciphers: "SSLv3",
    //     },
    // });
    //
    // transporter.verify(function (error, success) {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         // return transporter
    //         //     .sendMail(emailData)
    //         //     .then((info) => {
    //         //         console.log(`Message sent: ${info.response}`);
    //         //         return res.json({
    //         //             success: true,
    //         //         });
    //         //     })
    //         //     .catch((error) => console.log(`Problem sending email: ${error}`));
    //         console.log("Server is ready to take our messages!");
    //     }
    // })
};
