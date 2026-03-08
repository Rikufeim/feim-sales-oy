import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Image, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import feimLogo from '@/assets/feim-logo.png';
import Footer from '@/components/Footer';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const IMAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-image`;

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || 'Virhe AI-palvelussa');
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let done = false;

  while (!done) {
    const { done: streamDone, value } = await reader.read();
    if (streamDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6).trim();
      if (json === '[DONE]') { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }
  onDone();
}

const suggestedPrompts = [
  { icon: '🌐', text: 'Suunnittele verkkosivurakenne konsulttiyritykselle' },
  { icon: '📱', text: 'Ideoi SaaS-sovelluksen ominaisuudet' },
  { icon: '🎨', text: 'Luo brändistrategia startup-yritykselle' },
  { icon: '🖼️', text: 'Generoi kuva: moderni teknologiayrityksen hero-osio', isImage: true },
];

const Tekoaly = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (promptText?: string, forceImage?: boolean) => {
    const text = promptText || input.trim();
    if (!text || isLoading) return;

    const isImage = forceImage || mode === 'image';
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    if (isImage) {
      try {
        const resp = await fetch(IMAGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt: text }),
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Kuvan generointi epäonnistui');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.text || 'Tässä luomani kuva:',
          image: data.imageUrl,
        }]);
      } catch (e: any) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${e.message}` }]);
      }
      setIsLoading(false);
    } else {
      let assistantContent = '';
      const historyForApi = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

      try {
        await streamChat({
          messages: historyForApi,
          onDelta: (chunk) => {
            assistantContent += chunk;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant' && !last.image) {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
              }
              return [...prev, { role: 'assistant', content: assistantContent }];
            });
          },
          onDone: () => setIsLoading(false),
        });
      } catch (e: any) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${e.message}` }]);
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-black min-h-screen font-sans antialiased flex flex-col">
      <Helmet>
        <title>FEIM Tekoäly — AI-avustaja</title>
        <meta name="description" content="FEIM Tekoäly auttaa sinua ideoimaan verkkosivuja, sovelluksia ja strategioita tekoälyn avulla." />
      </Helmet>

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={feimLogo} alt="FEIM" className="h-10 w-auto" />
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-white font-semibold text-sm">Tekoäly</span>
              <span className="text-[10px] font-medium text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">BETA</span>
            </div>
          </div>
          <Link to="/" className="text-neutral-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} /> Takaisin
          </Link>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 mx-auto">
                <Sparkles size={28} className="text-blue-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">FEIM Tekoäly</h1>
              <p className="text-neutral-400 text-lg max-w-md mb-12">
                Kerro ideasi — luon sinulle strategian, rakenteen tai visuaalisen konseptin.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedPrompts.map((prompt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleSubmit(prompt.text, prompt.isImage)}
                  className="text-left p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                >
                  <span className="text-lg mb-1 block">{prompt.icon}</span>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{prompt.text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6 pb-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/20 text-white'
                      : 'bg-white/[0.03] border border-white/[0.06] text-neutral-200'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_p]:text-neutral-300 [&_li]:text-neutral-300 [&_strong]:text-white [&_a]:text-blue-400">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                    {msg.image && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.06]">
                        <img src={msg.image} alt="AI-generoitu kuva" className="w-full" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 flex items-center gap-2">
                  <Loader2 size={16} className="text-blue-400 animate-spin" />
                  <span className="text-neutral-400 text-sm">{mode === 'image' ? 'Generoidaan kuvaa...' : 'Ajattelen...'}</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-black via-black to-transparent">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 focus-within:border-blue-500/30 transition-colors">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setMode('text')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'text' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Sparkles size={12} className="inline mr-1" />
                Teksti & strategia
              </button>
              <button
                onClick={() => setMode('image')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'image' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Image size={12} className="inline mr-1" />
                Kuva
              </button>
            </div>
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={mode === 'image' ? 'Kuvaile mitä haluat nähdä...' : 'Kerro ideasi tai kysy mitä vain...'}
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm outline-none resize-none max-h-32 py-1"
              />
              <button
                onClick={() => handleSubmit()}
                disabled={!input.trim() || isLoading}
                className="shrink-0 w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-neutral-600 text-white flex items-center justify-center transition-all"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
          <p className="text-center text-neutral-600 text-[11px] mt-2">FEIM Tekoäly voi tehdä virheitä. Tarkista tärkeät tiedot.</p>
        </div>
      </div>
    </div>
  );
};

export default Tekoaly;
