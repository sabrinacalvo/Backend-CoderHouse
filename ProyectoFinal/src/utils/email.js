const nodemailer = require("nodemailer");

const config  = require("../config/index");

const email = config.email
console.log("==Email Service==: ", email.EMAIL_SERVICE)

const transporter = nodemailer.createTransport({
    service: email.EMAIL_SERVICE,
    port: email.EMAIL_PORT,
    auth: {
        user: email.EMAIL_USER,
        pass: email.EMAIL_PASSWORD
    }
})

const sendMail = async (to, subject, message) => {
    const html = `
        <div>
            ${message}
        </div>
    `

    const options = {
        from: `"Forgot password👻" <calvo.sabrinas@gmail.com>`,
        to,
        subject,
        html
    }

    return await transporter.sendMail(options);
}

transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
})


module.exports = sendMail;