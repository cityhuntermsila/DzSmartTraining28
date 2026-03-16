
import React from 'react';
import { TranslationSet } from '../../types';

interface FooterProps {
  t: TranslationSet;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ t, onNavigate }) => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="font-oswald text-2xl font-bold mb-6">DZSMART TRAINING</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
              <span className="text-xs">IG</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
              <span className="text-xs">FB</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
              <span className="text-xs">YT</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase text-red-500 mb-6 tracking-widest">{t.footer.quickLinks}</h4>
          <ul className="space-y-4">


            <li><button onClick={() => onNavigate('memberships')} className="text-gray-400 hover:text-white transition-colors">{t.nav.memberships}</button></li>
            <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-red-500 mb-6 tracking-widest">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>{t.contact.locationValue}</li>
            <li>{t.contact.phoneValue}</li>
            <li>{t.contact.emailValue}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-red-500 mb-6 tracking-widest">{t.footer.newsletter}</h4>
          <p className="text-gray-400 text-sm mb-4">Recevez les derniers conseils d'entraînement.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-zinc-900 border-none px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-red-500"
            />
            <button className="bg-red-600 px-4 py-2 rounded-r-md font-bold hover:bg-red-700 transition-colors">
              {t.footer.newsletterBtn}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 text-center text-gray-500 text-xs uppercase tracking-tighter">
        {t.footer.rights}
      </div>
    </footer>
  );
};

export default Footer;
