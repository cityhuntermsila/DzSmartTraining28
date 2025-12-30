
import React from 'react';
import { TranslationSet } from '../types';

const ContactPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-8">{t.contact.title}</h1>
        <p className="text-gray-400 mb-12">
          {t.contact.subtitle}
        </p>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-xl">📍</div>
            <div>
              <div className="font-bold uppercase tracking-widest text-red-500 mb-1">{t.contact.location}</div>
              <div className="text-gray-300">Boulevard du Centre-Ville, M'sila, Algérie</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-xl">📞</div>
            <div>
              <div className="font-bold uppercase tracking-widest text-red-500 mb-1">{t.contact.phone}</div>
              <div className="text-gray-300">+213 35 XX XX XX / +213 6XX XX XX XX</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-xl">📧</div>
            <div>
              <div className="font-bold uppercase tracking-widest text-red-500 mb-1">{t.contact.email}</div>
              <div className="text-gray-300">contact@dzsmarttraining.dz</div>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full h-80 bg-zinc-900 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13054.498110940342!2d4.532386154625292!3d35.7046182894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f409196b01b3a5%3A0x6b77c5c0f994b7e8!2sM&#39;Sila%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1710000000000!5m2!1sen!2sdz" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="bg-zinc-900/40 p-10 rounded-[40px] border border-white/5">
        <h2 className="text-3xl font-black uppercase mb-8 italic">{t.contact.formTitle}</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.contact.formName}</label>
              <input className="w-full bg-black border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-red-600 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.contact.formEmail}</label>
              <input className="w-full bg-black border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-red-600 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.contact.formSubject}</label>
            <input className="w-full bg-black border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-red-600 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.contact.formMessage}</label>
            <textarea rows={5} className="w-full bg-black border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-red-600 outline-none resize-none" />
          </div>
          <button className="w-full bg-red-600 py-5 rounded-xl font-black uppercase tracking-widest text-lg hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
            {t.contact.formSubmit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
