import React from 'react';
import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-600 text-lg">Last updated: January 2026</p>
      </div>

      <div className="space-y-8">
        {/* Agreement to Terms */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <FileText className="text-slate-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                By accessing and using ARIA ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms of Service apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
              </p>
            </div>
          </div>
        </section>

        {/* Use License */}
        <section className="bg-slate-50 p-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
          <div className="space-y-4 text-slate-700">
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ARIA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Harass, abuse, or threaten the Service or other users</li>
            </ul>
          </div>
        </section>

        {/* Disclaimer of Warranties */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-slate-700">
                <p>The materials on ARIA's website are provided on an 'as is' basis. ARIA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                <p>Further, ARIA does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations of Liability */}
        <section className="bg-red-50 p-8 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitations of Liability</h2>
          <div className="space-y-4 text-slate-700">
            <p>In no event shall ARIA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ARIA's website, even if ARIA or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            <p className="text-sm bg-red-100 p-4 rounded">
              <strong>Note:</strong> Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </div>
        </section>

        {/* Accuracy of Materials */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Accuracy of Materials</h2>
          <div className="space-y-4 text-slate-700">
            <p>The materials appearing on ARIA's website could include technical, typographical, or photographic errors. ARIA does not warrant that any of the materials on the website are accurate, complete, or current. ARIA may make changes to the materials contained on its website at any time without notice.</p>
          </div>
        </section>

        {/* Materials and Content */}
        <section className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Materials and Content</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              The materials on ARIA's website, including all text, graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software, are the property of ARIA or its content suppliers and are protected by international copyright laws.
            </p>
            <p>
              You may not use any of these materials without express written consent from ARIA. You hereby grant ARIA a non-exclusive license to use any feedback, suggestions, or enhancements you provide regarding the Service.
            </p>
          </div>
        </section>

        {/* License and Site Access */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. License and Site Access</h2>
          <div className="space-y-4 text-slate-700">
            <p>ARIA grants you a limited license to access and make personal use of the materials, but not to download or modify them or any portion of them except with express written consent of ARIA. This license does not include any resale or commercial use of this website or its contents.</p>
            <p>Unauthorized use of the materials contained on ARIA's website may violate copyright, trademark, and other laws. ARIA reserves the right to revoke this license at any time, and any such use must be discontinued immediately upon notice from ARIA.</p>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="bg-violet-50 p-8 rounded-lg border border-violet-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. User Responsibilities</h2>
          <div className="space-y-4 text-slate-700">
            <p>You agree that you are responsible for maintaining the confidentiality of your account information and password and for all activities that occur under your account. You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Notify ARIA immediately of any unauthorized use of your account</li>
              <li>Ensure all information you provide is accurate and complete</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Not interfere with or disrupt the Service or servers</li>
            </ul>
          </div>
        </section>

        {/* Acceptable Use Policy */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Acceptable Use Policy</h2>
          <div className="space-y-4 text-slate-700">
            <p>You agree not to use the Service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To harass, abuse, or threaten others</li>
              <li>To upload, post, or transmit unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable material</li>
              <li>To gain unauthorized access to or disrupt any computer network</li>
              <li>To send unsolicited commercial communications or spam</li>
              <li>To infringe on intellectual property rights</li>
              <li>To engage in any form of fraud or deception</li>
            </ul>
          </div>
        </section>

        {/* Termination */}
        <section className="bg-slate-50 p-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Termination</h2>
          <div className="space-y-4 text-slate-700">
            <p>ARIA may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms of Service. This includes but is not limited to unauthorized access, theft, or misuse of the Service.</p>
          </div>
        </section>

        {/* Links to Third Party Sites */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Links to Third Party Sites</h2>
          <div className="space-y-4 text-slate-700">
            <p>ARIA has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ARIA of the site. Use of any such linked website is at the user's own risk.</p>
          </div>
        </section>

        {/* Modifications to Terms */}
        <section className="bg-emerald-50 p-8 rounded-lg border border-emerald-200">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Modifications to Terms</h2>
              <p className="text-slate-700">
                ARIA may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. If you disagree with any provision of these terms or do not agree to comply with any modification, you may discontinue your use of the Service.
              </p>
            </div>
          </div>
        </section>

        {/* Entire Agreement */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Entire Agreement</h2>
          <p className="text-slate-700">
            These terms and conditions constitute the entire agreement between you and ARIA regarding the use of the website and supersede all prior and contemporaneous agreements, understandings, and negotiations, whether written or oral, between you and ARIA.
          </p>
        </section>

        {/* Governing Law */}
        <section className="bg-slate-50 p-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Governing Law</h2>
          <p className="text-slate-700">
            These terms and conditions are governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, and you irrevocably submit to the exclusive jurisdiction of the courts located in Pennsylvania.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Contact Information</h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-slate-700">
            <p className="mb-4">For any questions about these Terms of Service, please contact us:</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> <a href="mailto:legal@aria.ai" className="text-blue-600 hover:text-blue-700">legal@aria.ai</a></p>
              <p><strong>Mail:</strong> ARIA AI Inc., 119 Scarlet Oak Dr., Phoenixville, PA 19460</p>
              <p><strong>Phone:</strong> <a href="tel:+15868002870" className="text-blue-600 hover:text-blue-700">+1 586 800 2870</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
