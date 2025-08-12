'use client';

import { useActionState } from 'react';
import { sendContactEmailAction } from '@/app/actions/contactActions';
import SubmitButton from '@/components/SubmitButton';
import Image from 'next/image';

const initialState = {
  message: '',
  error: '',
};

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactEmailAction, initialState);

  return (
    <div className="bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Information & Background Image */}
        <div className="relative flex flex-col justify-between p-8 md:p-12 text-white min-h-[60vh] lg:min-h-screen">
          <div className="absolute inset-0 z-0">
            <Image
              src="/service-buscover.png" // A good, relevant image from your /public folder
              alt="Bus advertising in Nepal"
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          </div>

          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold">Got a campaign in mind?</h1>
            <p className="mt-4 text-lg text-gray-200">Let’s talk.</p>
          </div>

          <div className="relative z-10 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold">Keep Rolling Media Pvt. Ltd.</h3>
            <div className="space-y-2 text-gray-100">
              <p className="flex items-center"><span className="mr-3 text-xl">📍</span><span>Tinkune, Kathmandu</span></p>
              <p className="flex items-center"><span className="mr-3 text-xl">📞</span><span>01-4111974</span></p>
              <p className="flex items-center"><span className="mr-3 text-xl">📧</span><span>marketing@keeprollmedia.com.np</span></p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
              </div>
              <div>
                <SubmitButton>Send Message</SubmitButton>
              </div>
              {state?.error && <p className="text-red-600 mt-4">{state.error}</p>}
              {state?.message && <p className="text-green-700 font-semibold mt-4">{state.message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}