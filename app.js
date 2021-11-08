require('dotenv').config();
const nodemailer = require('nodemailer');
const  { google, oauth2_v2 }  = require('googleapis');
const express = require('express');

// consts
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){
    try{
        const accessToken = await OAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'from@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'THE BOX',
            to: 'to@gmail.com',
            subject: 'Hello from API',
            text: 'Hello from gamil API',
            html: 'Thanks for mail'
        }

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch (error){
        return error;
    }
}

sendMail().then(mail => console.log(mail));