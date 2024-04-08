require('dotenv').config({ path: '../config/.env' });


const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const { SendSmtpEmail } = require('sib-api-v3-sdk');

require('dotenv').config({ path: '../config/.env' });


const sendEmailReinitPassword = async (email, resetToken) => {
    // Configurez l'API de SendingBlue avec vos informations d'authentification
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.apiKey = apiKey;

    // Construisez l'email
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = { email: 'manyScan@email.com', name: 'Many_Scan' };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = 'Réinitialisation de mot de passe';
    sendSmtpEmail.templateId = 23;
    sendSmtpEmail.params = {
        "REST_PASSOWRD_LINK": `${process.env.REST_PASSOWRD_LINK}?token=${resetToken}`
    }

    // Envoyez l'email via l'API SendingBlue
    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');
        console.log('reset token email', email);
        console.log('reset token', resetToken);
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};
const sendEmailSuccessRestPassword = async (email) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.apiKey = apiKey;
    
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = { email: 'manyScan@email.com', name: 'Many_Scan' };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = 'Votre nouveau mot de passe';
    sendSmtpEmail.templateId = 24;
    sendSmtpEmail.params = {
        "HOME_API_LINK": `${process.env.HOME_API_LINK}`
    }

    // Envoyez l'email via l'API SendingBlue
    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');
        console.log('reset token email', email);
    } catch (error) {
        console.error('Email sending failed:', error);
    }
}
module.exports = { sendEmailReinitPassword, sendEmailSuccessRestPassword };