import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import ContactPage from './ContactPage';

type LegalPage = 'privacy' | 'terms' | 'contact' | 'home';

interface LegalProps {
  initialPage?: LegalPage;
  onBack?: () => void;
}

const Legal: React.FC<LegalProps> = ({ initialPage = 'home', onBack }) => {
  const [currentPage, setCurrentPage] = useState<LegalPage>(initialPage);

  const handleNavigate = (page: LegalPage) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (currentPage !== 'home' && onBack) {
      onBack();
    } else if (currentPage !== 'home') {
      setCurrentPage('home');
    }
  };

  // If we're showing a sub-page, show navigation back
  if (currentPage !== 'home') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {currentPage === 'privacy' && <PrivacyPolicy />}
          {currentPage === 'terms' && <TermsOfService />}
          {currentPage === 'contact' && <ContactPage />}
        </div>
      </div>
    );
  }

  // Landing page for legal section
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Legal & Support</h1>
          <p className="text-xl text-slate-600">Everything you need to know about ARIA</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Privacy Policy Card */}
          <button
            onClick={() => handleNavigate('privacy')}
            className="p-8 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-lg transition group text-left"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">Privacy Policy</h2>
            <p className="text-slate-600 mb-6">Learn how we collect, use, and protect your personal data</p>
            <div className="text-blue-600 font-semibold group-hover:translate-x-1 transition">
              Read Policy →
            </div>
          </button>

          {/* Terms of Service Card */}
          <button
            onClick={() => handleNavigate('terms')}
            className="p-8 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition group text-left"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition">Terms of Service</h2>
            <p className="text-slate-600 mb-6">Our terms and conditions for using ARIA's services</p>
            <div className="text-emerald-600 font-semibold group-hover:translate-x-1 transition">
              Read Terms →
            </div>
          </button>

          {/* Contact Card */}
          <button
            onClick={() => handleNavigate('contact')}
            className="p-8 bg-white rounded-lg border border-slate-200 hover:border-violet-500 hover:shadow-lg transition group text-left"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition">Contact Us</h2>
            <p className="text-slate-600 mb-6">Get in touch with our team or find support resources</p>
            <div className="text-violet-600 font-semibold group-hover:translate-x-1 transition">
              Get Help →
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Legal;
