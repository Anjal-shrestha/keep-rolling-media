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
        {/* Left Side - Visual Section */}
        <div className="relative flex flex-col justify-between p-6 md:p-8 lg:p-12 text-white min-h-[50vh] lg:min-h-screen">
          <div className="absolute inset-0 z-0">
            <Image
              src="/service-buscover.png"
              alt="Bus advertising in Nepal"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          </div>

          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Got a campaign in mind?
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-200">
              Let&apos;s create something amazing together
            </p>
          </div>

          <div
            className="relative z-10 space-y-3 md:space-y-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <h3 className="text-xl md:text-2xl font-bold">Keep Rolling Media Pvt. Ltd.</h3>
            <div className="space-y-1 md:space-y-2 text-gray-100">
              <p className="flex items-center">
                <span className="mr-2 md:mr-3 text-lg md:text-xl">📍</span>
                <span className="text-sm md:text-base">Tinkune, Kathmandu</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2 md:mr-3 text-lg md:text-xl">📞</span>
                <span className="text-sm md:text-base">9802342412</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2 md:mr-3 text-lg md:text-xl">📧</span>
                <span className="text-sm md:text-base">marketing@keeprollingmedia.com.np</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="w-full max-w-md lg:max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              Send Us a Message
            </h2>
            <form action={formAction} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="John Doe"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-base font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="[0-9]{7,15}"
                  placeholder="9801234567"
                  required
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell us about your campaign..."
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base placeholder-gray-400"
                ></textarea>
              </div>

              <div className="pt-2">
                <SubmitButton>
                  Send Message
                </SubmitButton>
              </div>

              {state?.error && (
                <p className="text-red-600 mt-3 text-sm sm:text-base">{state.error}</p>
              )}
              {state?.message && (
                <p className="text-green-700 font-medium mt-3 text-sm sm:text-base">
                  {state.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}