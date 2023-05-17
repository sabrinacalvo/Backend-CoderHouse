const nodemailer = require("nodemailer");

const email = require("../config/index");

const transport = nodemailer.createTransport({
    service: email.EMAIL_SERVICE,
    port: email.EMAIL_PORT,
    auth: {
        user: email.EMAIL_USER,
        pass: email.EMAIL_PASSWORD
    }
})

const sendEmail = async (to, subject, message) => {
    const html = `
        <h4 style="font-size: 12px; font-family: sans-serif;  text-align: center;">
            ${message}
        </h4>
    `

    const options = {
        from: `"Forgot password 👻" <calvo.sabrinas@gmail.com>`,
        to,
        subject,
        html
    }

    return await transport.sendMail(options);
}

transport.verify().then(() => {
    console.log('Ready for send emails')
})

module.exports = sendEmail;