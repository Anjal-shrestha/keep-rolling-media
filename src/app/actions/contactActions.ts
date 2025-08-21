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
  from: `"${name}" <${email}>`,
  to: process.env.EMAIL_SERVER_USER,
  subject: `New Message from ${name} - Keep Rolling Media Website`,
  replyTo: email,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333;">📩 New Contact Form Submission</h2>
      <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
      <p style="margin-bottom: 10px;"><strong>Email:</strong> 
        <a href="mailto:${email}" style="color: #1a73e8;">${email}</a>
      </p>
      <p style="margin-bottom: 10px;"><strong>Phone:</strong> 
        <a href="tel:${phone}" style="color: #1a73e8; text-decoration: none;">${phone}</a>
      </p>
      <hr style="margin: 20px 0;">
      <h3 style="color: #333;">Message:</h3>
      <p style="white-space: pre-line; line-height: 1.5; color: #555;">${message}</p>
    </div>
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
