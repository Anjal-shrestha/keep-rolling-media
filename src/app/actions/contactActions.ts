'use server';

import nodemailer from 'nodemailer';

interface FormState {
  message: string;
  error?: string;
}

export async function sendContactEmailAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { message: '', error: 'All fields are required.' };
  }

  // Setup the email transporter using your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // This shows the sender's name and email in your inbox
    to: process.env.EMAIL_SERVER_USER, // The email will be sent to yourself
    subject: `New Message from ${name} - Keep Rolling Media Website`,
    replyTo: email,
    html: `<h1>New Contact Form Submission</h1>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <hr>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`, // Formats the message for HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: 'Thank you for your message! We will get back to you soon.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { message: '', error: 'Sorry, something went wrong. Please try again later.' };
  }
}