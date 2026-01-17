const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send contact form notification to admin
const sendContactNotification = async (contactData) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"DevsFusion Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: contactData.email,
        subject: `New Contact: ${contactData.subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Form Submission</h1>
                </div>
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 100px;">Name:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">${contactData.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">
                                <a href="mailto:${contactData.email}" style="color: #667eea;">${contactData.email}</a>
                            </td>
                        </tr>
                        ${contactData.phone ? `
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">${contactData.phone}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Subject:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">${contactData.subject}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 20px;">
                        <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; color: #555; line-height: 1.6;">
                            ${contactData.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <div style="margin-top: 30px; text-align: center;">
                        <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" 
                           style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Reply to ${contactData.name}
                        </a>
                    </div>
                </div>
                <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                    This email was sent from the DevsFusion contact form.
                </p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

// Send auto-reply to the person who submitted the form
const sendAutoReply = async (contactData) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"DevsFusion" <${process.env.EMAIL_USER}>`,
        to: contactData.email,
        subject: `Thanks for contacting DevsFusion! 🚀`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Thank You! 🎉</h1>
                    <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">We've received your message</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Hi <strong>${contactData.name}</strong>,
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        Thank you for reaching out to DevsFusion! We've received your message and will get back to you as soon as possible, typically within 24-48 hours.
                    </p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 14px;">Your Message Summary:</h3>
                        <p style="color: #666; margin: 0; font-size: 14px;"><strong>Subject:</strong> ${contactData.subject}</p>
                    </div>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        In the meantime, feel free to explore our work and projects.
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        Best regards,<br>
                        <strong>The DevsFusion Team</strong>
                    </p>
                </div>
                <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                    © ${new Date().getFullYear()} DevsFusion. All rights reserved.
                </p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendContactNotification,
    sendAutoReply
};
