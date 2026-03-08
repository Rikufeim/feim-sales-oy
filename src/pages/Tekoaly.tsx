import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Image, Loader2, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import feimLogo from '@/assets/feim-logo.png';
import Navbar from '@/components/Navbar';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  isStreaming?: boolean;
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
  { icon: '🌐', text: 'Suunnittele verkkosivurakenne konsulttiyritykselle', isImage: false },
  { icon: '📱', text: 'Ideoi SaaS-sovelluksen ominaisuudet', isImage: false },
  { icon: '🎨', text: 'Luo brändistrategia startup-yritykselle', isImage: false },
  { icon: '🖼️', text: 'Generoi kuva: moderni teknologiayrityksen hero-osio', isImage: true },
];

// Typing indicator with animated dots
const TypingIndicator = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="flex justify-start"
  >
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 flex items-center gap-3">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400/60"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-neutral-500 text-sm">{label}</span>
    </div>
  </motion.div>
);

const Tekoaly = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll smoothly
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  }, []);

  // Focus input on load and after sending
  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = async (promptText?: string, forceImage?: boolean) => {
    const text = promptText || input.trim();
    if (!text || isLoading) return;

    const isImage = forceImage || mode === 'image';
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
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
              return [...prev, { role: 'assistant', content: assistantContent, isStreaming: true }];
            });
          },
          onDone: () => {
            setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, isStreaming: false } : m));
            setIsLoading(false);
          },
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

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="bg-black min-h-screen font-sans antialiased flex flex-col h-screen overflow-hidden">
      <Helmet>
        <title>FEIM Tekoäly — AI-avustaja</title>
        <meta name="description" content="FEIM Tekoäly auttaa sinua ideoimaan verkkosivuja, sovelluksia ja strategioita tekoälyn avulla." />
      </Helmet>

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-black/90 backdrop-blur-2xl sticky top-0 z-50 shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src={feimLogo} alt="FEIM" className="h-8 w-auto" />
            </Link>
            <div className="h-5 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-white font-semibold text-sm tracking-tight">Tekoäly</span>
              <span className="text-[9px] font-semibold text-blue-400/80 bg-blue-400/[0.08] px-1.5 py-0.5 rounded-md uppercase tracking-wider">Beta</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasMessages && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearChat}
                className="text-neutral-500 hover:text-neutral-300 p-2 rounded-lg hover:bg-white/5 transition-all"
                title="Uusi keskustelu"
              >
                <RotateCcw size={15} />
              </motion.button>
            )}
            <Link to="/" className="text-neutral-500 hover:text-white text-sm flex items-center gap-1 transition-colors p-2 rounded-lg hover:bg-white/5">
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Takaisin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl w-full mx-auto px-4 sm:px-6">
            {!hasMessages ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-180px)] py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/5 border border-blue-500/15 flex items-center justify-center mb-5 mx-auto">
                    <Sparkles size={24} className="text-blue-400/80" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Miten voin auttaa?</h1>
                  <p className="text-neutral-500 text-sm max-w-sm mb-10">
                    Ideoi verkkosivuja, strategioita tai generoi visuaalisia konsepteja.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md">
                  {suggestedPrompts.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.04, ease: 'easeOut' }}
                      onClick={() => handleSubmit(prompt.text, prompt.isImage)}
                      className="text-left px-4 py-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 group"
                    >
                      <span className="text-base mb-0.5 block">{prompt.icon}</span>
                      <span className="text-[13px] text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug">{prompt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="py-6 space-y-1">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`py-3 ${msg.role === 'user' ? 'flex justify-end' : ''}`}
                  >
                    {msg.role === 'user' ? (
                      <div className="max-w-[80%] bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-br-md px-4 py-3">
                        <p className="text-[14px] text-white/90 leading-relaxed">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="max-w-[90%]">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mt-0.5 shrink-0">
                            <Sparkles size={13} className="text-blue-400/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="prose prose-sm prose-invert max-w-none
                              [&_h1]:text-[17px] [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-4 [&_h1]:mb-2
                              [&_h2]:text-[15px] [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-3 [&_h2]:mb-1.5
                              [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-white/90 [&_h3]:mt-2.5 [&_h3]:mb-1
                              [&_p]:text-[14px] [&_p]:text-neutral-300 [&_p]:leading-[1.7] [&_p]:my-1.5
                              [&_li]:text-[14px] [&_li]:text-neutral-300 [&_li]:leading-[1.6]
                              [&_ul]:my-1.5 [&_ol]:my-1.5
                              [&_strong]:text-white [&_strong]:font-semibold
                              [&_code]:text-blue-300 [&_code]:bg-blue-500/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px]
                              [&_a]:text-blue-400 [&_a]:no-underline [&_a:hover]:underline
                              [&_blockquote]:border-l-2 [&_blockquote]:border-blue-500/30 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-400
                            ">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                            {msg.isStreaming && (
                              <motion.span
                                className="inline-block w-0.5 h-4 bg-blue-400/60 ml-0.5 align-text-bottom"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                              />
                            )}
                            {msg.image && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="mt-3 rounded-xl overflow-hidden border border-white/[0.08] max-w-md"
                              >
                                <img src={msg.image} alt="AI-generoitu kuva" className="w-full" loading="lazy" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="py-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mt-0.5 shrink-0">
                        <Sparkles size={13} className="text-blue-400/70" />
                      </div>
                      <TypingIndicator label={mode === 'image' ? 'Generoidaan kuvaa...' : 'Kirjoittaa...'} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Input bar — pinned to bottom */}
        <div className="shrink-0 border-t border-white/[0.04] bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-2.5 focus-within:border-white/[0.15] transition-all duration-200">
              {/* Mode toggle */}
              <div className="flex gap-1 mb-2 px-1">
                <button
                  onClick={() => setMode('text')}
                  className={`text-[12px] font-medium px-2.5 py-1 rounded-md transition-all duration-200 ${
                    mode === 'text'
                      ? 'bg-white/[0.08] text-white/90'
                      : 'text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.03]'
                  }`}
                >
                  <Sparkles size={11} className="inline mr-1 -mt-px" />
                  Teksti
                </button>
                <button
                  onClick={() => setMode('image')}
                  className={`text-[12px] font-medium px-2.5 py-1 rounded-md transition-all duration-200 ${
                    mode === 'image'
                      ? 'bg-white/[0.08] text-white/90'
                      : 'text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.03]'
                  }`}
                >
                  <Image size={11} className="inline mr-1 -mt-px" />
                  Kuva
                </button>
              </div>

              <div className="flex items-end gap-2 px-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={mode === 'image' ? 'Kuvaile mitä haluat nähdä...' : 'Kerro ideasi...'}
                  rows={1}
                  className="flex-1 bg-transparent text-white/90 placeholder-neutral-600 text-[14px] outline-none resize-none max-h-32 py-1.5 leading-relaxed"
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] disabled:opacity-20 text-white/80 flex items-center justify-center transition-all duration-200 mb-0.5"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </div>
            <p className="text-center text-neutral-700 text-[10px] mt-2 tracking-wide">FEIM Tekoäly voi tehdä virheitä. Tarkista tärkeät tiedot.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tekoaly;
