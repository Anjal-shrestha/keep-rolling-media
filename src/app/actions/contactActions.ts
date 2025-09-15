'use server';

import nodemailer from 'nodemailer';

interface FormState {
  message: string;
  error?: string;
}

export async function sendContactEmailAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !phone || !message) {
    return { message: '', error: 'All fields are required.' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `New Contact Form Submission from ${name}`,
    replyTo: email,
    html: `
      <body style="background-color: #f4f4f4; font-family: sans-serif; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #4A90E2; color: #ffffff; padding: 20px 25px;">
            <h1 style="margin: 0; font-size: 24px;">New Website Message</h1>
          </div>
          <div style="padding: 25px;">
            <h2 style="color: #333333; margin-top: 0;">Submission Details</h2>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #555555; font-size: 14px;">Full Name</p>
              <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: bold;">${name}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #555555; font-size: 14px;">Email Address</p>
              <p style="margin: 5px 0 0 0; font-size: 16px;"><a href="mailto:${email}" style="color: #4A90E2; text-decoration: none;">${email}</a></p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #555555; font-size: 14px;">Phone Number</p>
              <p style="margin: 5px 0 0 0; font-size: 16px;"><a href="tel:${phone}" style="color: #4A90E2; text-decoration: none;">${phone}</a></p>
            </div>
            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
            <h2 style="color: #333333;">Message</h2>
            <div style="background-color: #f9f9f9; border-left: 4px solid #4A90E2; padding: 15px; font-size: 16px; color: #333333; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
          <div style="background-color: #f4f4f4; color: #888888; text-align: center; font-size: 12px; padding: 15px;">
            <p style="margin: 0;">This email was sent from the Keep Rolling Media website.</p>
            
            <p style="margin: 8px 0 0 0; font-size: 11px;"><a href="https://geckoworks.com.np" style="color: #aaaaaa; text-decoration: none;">Crafted by Gecko Works Nepal</a></p>
          </div>
        </div>
      </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: 'Thank you for your message! We will get back to you soon.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { message: '', error: 'Sorry, something went wrong. Please try again later.' };
  }
}