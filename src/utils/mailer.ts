import dotenv from "dotenv";
import nodemailer, { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

class AuthMailer{
    transporter : Transporter;
    options : SMTPTransport.Options;
    to : string = "";

    constructor(){
        dotenv.config();

        this.options = {
            host: process.env.SMTP_HOST ?? "",
            port: parseInt(process.env.SMTP_PORT ?? ""),
            secure: Boolean(process.env.SMTP_SECURE), // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.SMTP_USER ?? "",
              pass: process.env.SMTP_PASSWORD ?? "",
            },
        }
        this.transporter = createTransport(this.options);
    }
    
    sendMail(email: string, subject: string, message: string){
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message,
        };
        
        this.transporter.sendMail(mailOptions, (error, info) => {});
    }

    sendVerificationEmail(email: string, token: string){
        const subject = 'Verify your email';
        const message = `Click on the link to verify your email: ${token}`;

        this.sendMail(email, subject, message);
    }

    sendPasswordResetEmail(email: string, token: string){
        const subject = 'Reset your password';
        const message = `Click on the link to reset your password: ${token}`;

        this.sendMail(email, subject, message);
    }

    sendWelcomeEmail(email: string){
        const subject = 'Welcome to our website';
        const message = 'We are glad you are here!';

        this.sendMail(email, subject, message);
    }

    sendGoodbyeEmail(email: string){
        const subject = 'Goodbye';
        const message = 'We are sad to see you go!';

        this.sendMail(email, subject, message);
    }

    sendContactEmail(email: string, subject: string, message: string){
        this.sendMail(email, subject, message);
    }

    sendFeedbackEmail(email: string, message: string){
        const subject = 'Feedback';

        this.sendMail(email, subject, message);
    }

    sendReportEmail(email: string, message: string){
        const subject = 'Report';

        this.sendMail(email, subject, message);
    }

    sendNotificationEmail(email: string, message: string){
        const subject = 'Notification';

        this.sendMail(email, subject, message);
    }

    sendNewsletterEmail(email: string, message: string){
        const subject = 'Newsletter';

        this.sendMail(email, subject, message);
    }

    sendPromotionEmail(email: string, message: string){
        const subject = 'Promotion';

        this.sendMail(email, subject, message);
    }

    sendInvoiceEmail(email: string, message: string){
        const subject = 'Invoice';

        this.sendMail(email, subject, message);
    }

    sendOrderEmail(email: string, message: string){
        const subject = 'Order';

        this.sendMail(email, subject, message);
    }

    sendDeliveryEmail(email: string, message: string){
        const subject = 'Delivery';

        this.sendMail(email, subject, message);
    }

    sendPaymentEmail(email: string, message: string){
        const subject = 'Payment';

        this.sendMail(email, subject, message);
    }

    sendConfirmationEmail(email: string, message: string){
        const subject = 'Confirmation';

        this.sendMail(email, subject, message);
    }

    sendSubscriptionEmail(email: string, message: string){
        const subject = 'Subscription';

        this.sendMail(email, subject, message);
    }

    sendReminderEmail(email: string, message: string){
        const subject = 'Reminder';
        this.sendMail(email, subject, message);
    }

    sendAlertEmail(email: string, message: string){
        const subject = 'Alert';

        this.sendMail(email, subject, message);
    }

    sendUpdateEmail(email: string, message: string){
        const subject = 'Update';

        this.sendMail(email, subject, message);
    }
}

export default AuthMailer;