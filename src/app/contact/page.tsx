'use client';

import { useActionState } from 'react';
import { sendContactEmailAction } from '@/app/actions/contactActions';
import SubmitButton from '@/components/SubmitButton';

const initialState = {
  message: '',
  error: '',
};

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactEmailAction, initialState);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600">Have a project in mind? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
              </div>
              <div>
                <SubmitButton>Send Message</SubmitButton>
              </div>
              {state?.error && <p className="text-red-500 mt-4">{state.error}</p>}
              {state?.message && <p className="text-green-600 mt-4">{state.message}</p>}
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Our Office</h3>
              <p className="text-gray-600 mt-2">123 Rolling Hills Ave,<br/>Kathmandu, Nepal</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
              <p className="text-gray-600 mt-2"><strong>Email:</strong> contact@keeprollingmedia.com</p>
              <p className="text-gray-600"><strong>Phone:</strong> +977 980 000 0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}