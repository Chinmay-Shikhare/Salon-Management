import { NextFunction, Response, Request } from "express"
import nodemailer from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const sendMail = (overallAverage: number, email: string) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'testingmycode011@gmail.com',
            pass: 'testingmycode011#$*'
        }
    });
    if (overallAverage > 4) {
        // send mail - thanks as subject
        let mailOptions = {
            from: 'test@gmail.com',
            to: `${email}`,
            subject: `Thanks You`,
            text: `Thank you for your FEEDBACK. Galaxy Premium Salon,visit Again :) `
        };
        transporter.sendMail(mailOptions, function (err: any, data: any) {
            if (err) { console.log(err); }
            else { console.log(`email send`); }
        });
    }
    else if (overallAverage < 2) {
        // send mail - sorry as subject
        let mailOptions = {
            from: 'test@gmail.com',
            to: `${email}`,
            subject: `Sorry`,
            text: `Thank you for your FEEDBACK. We will work on your FEEDBACK }`
        };
        transporter.sendMail(mailOptions, function (err: any, data: any) {
            if (err) { console.log(err); }
            else { console.log(`email send`); }
        });
    }
    else if (overallAverage > 2 && overallAverage < 4) {
        // send mail - sorry as subject
        let mailOptions = {
            from: 'test@gmail.com',
            to: `${email}`,
            subject: `Sorry`,
            text: `Thank you for your FEEDBACK. We will ensure to be consistent always :) }`
        };
        transporter.sendMail(mailOptions, function (err: any, data: any) {
            if (err) { console.log(err); }
            else { console.log(`email send`); }
        });
    }
}

