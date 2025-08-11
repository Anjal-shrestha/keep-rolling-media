'use server';

import { Resend } from 'resend';

// Initialize Resend with the API key from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // This is a default address that works out of the box.
      to: 'anjalshrestha13@gmail.com', // IMPORTANT: Change this to the email where you want to receive messages.
      subject: `New Message from ${name} - Keep Rolling Media`,
      reply_to: email,
      html: `<p>You have a new message from your website contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    return { message: 'Thank you for your message! We will get back to you soon.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { message: '', error: 'Sorry, something went wrong. Please try again later.' };
  }
}