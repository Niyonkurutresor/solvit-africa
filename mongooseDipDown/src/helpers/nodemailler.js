import nodemailer from 'nodemailer'
import signiupTemplate from "./emailSignupTemplate.js";
import updatepassword from "./emailUpdatePassword.js";



const mailer = async (email, action) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'niyonkurutresor17@gmail.com',
        pass: 'Niyonkuru'
      }
    });
  
    let subject;
    let to;
    let template;
    switch (action) {
      case 'createAccount':
        subject = 'Sign up successful';
        template = signiupTemplate(email);
        to = email;
        break;

    case 'updatePassword':
        subject = 'Update Password';
        template = updatepassword(email)
        to = email;
        break;

    default:
        subject = '';
        break;
    
    }

    const mailOptions = {
      from: "Toure guid <niyonkurutresor@gmail.com>",
      to,
      subject,
      html: template
    };

    try {
      const sendMail = transporter.sendMail(mailOptions);
      return sendMail;
    } catch (error) {
      return error;
    }
  };
  export default mailer;
  