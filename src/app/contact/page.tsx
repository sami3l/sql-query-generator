"use client"

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formDisplay, setFormDisplay] = useState(true); // Toggle form display after submission
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        formRef.current,
        {
          publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success('Message sent', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
            className: `custom-toast font-kumbhSans`,
          });
          reset();
          setTimeout(() => setFormDisplay(!formDisplay), 5000); // Toggle form display after 5 seconds
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Message not sent, check your network', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
            className: `custom-toast font-kumbhSans`,
          });
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <ToastContainer />
      {formDisplay && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="p-8">
            <h2 className="text-4xl font-bold text-green-900 mb-6">Get in Touch</h2>
            <p className="text-green-700 mb-8">
              Have a question or want to collaborate? Drop us a message below!
            </p>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm  font-bold text-black">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border text-black border-green-300 rounded-lg shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-black">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border text-black border-green-300 rounded-lg shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm  font-bold text-black">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 block w-full px-4 py-3 border text-black border-green-300 rounded-lg shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Write your message here..."
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="bg-green-50 p-6 text-center">
            <p className="text-green-700 text-sm">
              We'll get back to you within 24 hours. 🌿
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;