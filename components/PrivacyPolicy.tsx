import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-600 text-lg">Last updated: January 2026</p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <Shield className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Privacy Matters</h2>
              <p className="text-slate-700 leading-relaxed">
                At ARIA AI Inc. ("we," "us," "our," or "ARIA"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI receptionist platform and related services.
              </p>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Personal Information You Provide:</h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Contact information (name, email, phone number, company)</li>
                <li>Account credentials and subscription details</li>
                <li>Business information and preferences</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Information Collected Automatically:</h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Call recordings and transcripts (for service improvement)</li>
                <li>IP address and device information</li>
                <li>Usage analytics and interaction data</li>
                <li>Cookies and tracking technologies</li>
                <li>Browser and platform information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
          <div className="space-y-3 text-slate-700">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Improve and optimize our platform</li>
              <li>Send promotional materials and updates (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or security issues</li>
              <li>Analyze usage patterns to enhance user experience</li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section className="bg-emerald-50 p-8 rounded-lg border border-emerald-200">
          <div className="flex items-start gap-4">
            <Lock className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
              <div className="space-y-4 text-slate-700">
                <p>We implement comprehensive security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>End-to-end voice encryption for all calls</li>
                  <li>SOC2 Type II compliant infrastructure</li>
                  <li>GDPR and CCPA compliance</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure data centers with redundancy</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Encrypted data transmission and storage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Sharing & Third Parties</h2>
          <div className="space-y-4 text-slate-700">
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operations (payment processing, hosting, analytics)</li>
              <li><strong>CRM Integrations:</strong> GoHighLevel and other connected platforms (with your authorization)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">We do NOT sell your personal data to third parties for marketing purposes.</p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="bg-violet-50 p-8 rounded-lg border border-violet-200">
          <div className="flex items-start gap-4">
            <Eye className="text-violet-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Privacy Rights</h2>
              <div className="space-y-4 text-slate-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability (receive your data in portable format)</li>
                  <li>Lodge complaints with data protection authorities</li>
                </ul>
                <p className="mt-4">To exercise these rights, contact us at: <a href="mailto:privacy@aria.ai" className="text-violet-600 hover:text-violet-700 font-semibold">privacy@aria.ai</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
          <div className="space-y-4 text-slate-700">
            <p>We retain your data for as long as necessary to provide our services and comply with legal obligations:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Call Recordings:</strong> Retained for 90 days for quality assurance</li>
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>Usage Analytics:</strong> Aggregated and anonymized after 12 months</li>
              <li><strong>Legal/Compliance:</strong> Retained as required by law</li>
            </ul>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="bg-slate-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
          <p className="text-slate-700">
            ARIA is not intended for children under 13 years old. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 13, we will take steps to delete such information immediately.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-slate-700">
            <p className="mb-4">If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> <a href="mailto:privacy@aria.ai" className="text-blue-600 hover:text-blue-700">privacy@aria.ai</a></p>
              <p><strong>Mail:</strong> ARIA AI Inc., 119 Scarlet Oak Dr., Phoenixville, PA 19460</p>
              <p><strong>Phone:</strong> <a href="tel:+15868002870" className="text-blue-600 hover:text-blue-700">+1 586 800 2870</a></p>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="text-slate-600 text-sm border-t border-slate-200 pt-8">
          <p>We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting to the website. Your continued use of ARIA constitutes your acceptance of any updates.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
