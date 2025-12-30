
import React, { useState, useRef, useEffect } from 'react';
import { chatWithCoach } from '../../services/geminiService';
import { Language } from '../../types';

const AIChatWidget: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: lang === 'ar' ? 'مرحباً! أنا مدربك الذكي. كيف يمكنني مساعدتك اليوم؟' : 'Bonjour! Je suis votre coach IA. Comment puis-je vous aider?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithCoach(userMsg, lang);
      setMessages(prev => [...prev, { role: 'bot', text: response || "Désolé, j'ai eu une petite absence. Pouvez-vous répéter?" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Erreur de connexion avec le QG des coachs." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] rtl:right-auto rtl:left-8">
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        {isOpen ? (
          <span className="text-3xl">✕</span>
        ) : (
          <div className="relative">
            <span className="text-3xl">🤖</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-red-600 animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 rtl:right-auto rtl:left-0 w-[350px] md:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-5 bg-black border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold">DZ</div>
            <div>
              <div className="font-bold text-sm uppercase">Coach AI Assistant</div>
              <div className="text-[10px] text-green-500 uppercase font-black">En Ligne</div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-zinc-800 text-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-black/50 border-t border-white/5">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-red-600 outline-none pr-12 rtl:pr-4 rtl:pl-12"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1.5 rtl:right-auto rtl:left-2 bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <span className="text-xs">OK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
