import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID =
    "284416396339-t546r7j0ni89d68c7mq5838t89pokt8r.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
    "1//04QjZ1wds6QQtCgYIARAAGAQSNwF-L9IrQjGySD7uSq1UCr8sROgxIw064_h8bQZXB0YZQWoqdjVWOhzFrj8rLwWjHe61bMhAPaQ";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendVerificationLink = (to, token) => {
    const accessToken = oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "officialfelixplay@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mailOptions = {
        from: "FelixPlay <noreply@felixplay.tk>",
        to: to,
        subject: "Verify Email",
        text: `Use this OTP to Verify your Account - ${token}`,
    };

    const result = transport.sendMail(mailOptions);
    return result;
};

export const sendResetPasswordMail = async (to, token) => {
    const accessToken = oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "officialfelixplay@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mailOptions = {
        from: "FelixPlay <noreply@felixplay.tk>",
        to: to,
        subject: "Reset Password",
        text: `Visit this link to reset your password http://localhost:3000/resetpassword?token=${token}`,
    };

    return transport.sendMail(mailOptions);
};
