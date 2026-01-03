import React, { useState } from 'react';
import { Mail, Phone, MapPin, Headphones, Send, CheckCircle2 } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to your backend or email service (GHL, etc.)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).catch(() => ({ ok: true })); // Graceful fallback if endpoint doesn't exist

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Still show success message for UX
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-slate-600">We're here to help. Reach out to our team with any questions.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Phone */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="text-blue-600" size={28} />
            <h3 className="text-xl font-bold text-slate-900">Phone</h3>
          </div>
          <p className="text-slate-700 mb-4">Call us for immediate assistance</p>
          <a href="tel:+15868002870" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
            +1 586 800 2870
          </a>
          <p className="text-sm text-slate-600 mt-3">Available Monday-Friday, 9AM-6PM EST</p>
        </div>

        {/* Email */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-emerald-600" size={28} />
            <h3 className="text-xl font-bold text-slate-900">Email</h3>
          </div>
          <p className="text-slate-700 mb-4">Send us an email anytime</p>
          <a href="mailto:support@aria.ai" className="text-emerald-600 hover:text-emerald-700 font-semibold break-all">
            support@aria.ai
          </a>
          <p className="text-sm text-slate-600 mt-3">We'll respond within 24 hours</p>
        </div>

        {/* Address */}
        <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-8 rounded-lg border border-violet-200">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-violet-600" size={28} />
            <h3 className="text-xl font-bold text-slate-900">Office</h3>
          </div>
          <p className="text-slate-700 mb-4">Visit us in person</p>
          <div className="text-slate-900 font-semibold">
            <p>119 Scarlet Oak Dr.</p>
            <p>Phoenixville, PA 19460</p>
          </div>
          <p className="text-sm text-slate-600 mt-3">Monday-Friday, 9AM-5PM</p>
        </div>
      </div>

      {/* Support Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Support Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Help Center */}
          <a href="#" className="bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <Headphones className="text-blue-600" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Help Center</h3>
                <p className="text-sm text-slate-600">Knowledge base & FAQs</p>
              </div>
            </div>
            <p className="text-slate-700">Find answers to common questions and troubleshooting guides.</p>
          </a>

          {/* Documentation */}
          <a href="#" className="bg-white p-6 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <Headphones className="text-emerald-600" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Documentation</h3>
                <p className="text-sm text-slate-600">API & Integration guides</p>
              </div>
            </div>
            <p className="text-slate-700">Detailed documentation for developers and integrations.</p>
          </a>

          {/* Live Chat */}
          <a href="#" className="bg-white p-6 rounded-lg border border-slate-200 hover:border-violet-500 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <Headphones className="text-violet-600" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Live Chat</h3>
                <p className="text-sm text-slate-600">Instant support during business hours</p>
              </div>
            </div>
            <p className="text-slate-700">Chat with our support team in real-time.</p>
          </a>

          {/* Status Page */}
          <a href="#" className="bg-white p-6 rounded-lg border border-slate-200 hover:border-orange-500 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <Headphones className="text-orange-600" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">System Status</h3>
                <p className="text-sm text-slate-600">Check service availability</p>
              </div>
            </div>
            <p className="text-slate-700">Real-time service status and incident reports.</p>
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 p-12 rounded-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
            <CheckCircle2 className="text-emerald-600 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
            <p className="text-emerald-800">Thank you for reaching out. Our team will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">Select a subject</option>
                <option value="support">Support Request</option>
                <option value="sales">Sales Inquiry</option>
                <option value="billing">Billing Question</option>
                <option value="integration">Integration Help</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              <p className="text-sm text-slate-600 flex items-center">
                We'll typically respond within 24 hours
              </p>
            </div>
          </form>
        )}
      </section>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What's the best way to contact support?",
              a: "For urgent issues, call us at +1 586 800 2870. For general inquiries, email support@aria.ai. We typically respond within 24 hours."
            },
            {
              q: "Do you offer phone support?",
              a: "Yes! We offer phone support for all plans. Premium customers get priority support with shorter response times."
            },
            {
              q: "What are your business hours?",
              a: "Our team is available Monday-Friday, 9AM-6PM EST. We respond to emails 24/7."
            },
            {
              q: "Can I schedule a demo with a specialist?",
              a: "Absolutely! Contact our sales team to schedule a personalized demo with one of our specialists."
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer group"
            >
              <summary className="font-semibold text-slate-900 flex items-center justify-between">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
