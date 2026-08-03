import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Key, Bot, User, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function GeminiChatWidget() {
  const content = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return (
      import.meta.env.VITE_GEMINI_API_KEY ||
      localStorage.getItem('gemini_api_key') ||
      ''
    );
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! 👋 I am your Enactus MSA AI Assistant powered by Google Gemini. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const saveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem('gemini_api_key', trimmed);
    setShowKeyModal(false);
  };

  const constructSystemInstruction = () => {
    const committeesList = (content.committees || [])
      .map((c) => `- ${c.name}: ${c.description}`)
      .join('\n');

    const teamList = (content.team || [])
      .map((t) => `- ${t.name} (${t.role}): ${t.achievement}`)
      .join('\n');

    return `You are the official Enactus MSA AI Assistant for October University for Modern Sciences & Arts (MSA).
Your tone is helpful, inspiring, professional, and friendly.

Here is the current information about Enactus MSA:
[ABOUT]
Heading: ${content.about?.heading || 'Who We Are'}
Overview: ${content.about?.paragraph1 || ''} ${content.about?.paragraph2 || ''} ${content.about?.paragraph3 || ''}

[STATS]
Years Active: ${content.stats?.stat1Value || '5+'} Years
Projects Completed: ${content.stats?.stat2Value || '10+'} Projects

[COMMITTEES]
${committeesList}

[TEAM LEADERSHIP]
${teamList}

[CONTACT]
Email: ${content.contact?.email || 'enactus@msa.edu.eg'}
Address: ${content.contact?.address || 'MSA University, Cairo, Egypt'}

Keep responses concise, clear, and formatted nicely. If asked about something outside Enactus MSA, answer politely while offering assistance regarding Enactus MSA.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const systemInstruction = constructSystemInstruction();
      const promptText = `${systemInstruction}\n\nUser Question: ${text}`;

      const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
      let data: any = null;
      let lastErrMessage = '';

      for (const model of models) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
              apiKey
            )}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }],
              }),
            }
          );
          const result = await response.json();
          if (result.error) {
            lastErrMessage = result.error.message || 'API Error';
            continue;
          }
          if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            data = result;
            break;
          }
        } catch (e: any) {
          lastErrMessage = e.message || 'Network error';
        }
      }

      if (!data) {
        throw new Error(lastErrMessage || 'Failed to generate response from Gemini API.');
      }

      const botReplyText =
        data.candidates[0].content.parts[0].text ||
        'Sorry, I could not process your response. Please check your API key or try again.';

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `⚠️ Error: ${
          err.message || 'Failed to connect to Gemini API. Please check your API key.'
        }`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    'What is Enactus MSA?',
    'What committees can I join?',
    'How can I contact Enactus MSA?',
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Enactus AI Assistant"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-black flex items-center justify-center shadow-[0_10px_35px_rgba(251,191,36,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group border border-amber-200/50"
      >
        {isOpen ? (
          <ChevronDown size={28} className="transition-transform duration-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles size={26} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
        )}
      </button>

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[998] w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Enactus AI Assistant
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-amber-400/80 font-medium">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyModal(true)}
                title="Configure Gemini API Key"
                className="p-2 rounded-xl text-white/50 hover:text-amber-400 hover:bg-white/5 transition-colors"
              >
                <Key size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* API Key Modal / Banner if missing */}
          {(!apiKey || showKeyModal) && (
            <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-200 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <Key size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Google AI Studio API Key Required</p>
                  <p className="text-amber-300/80 text-[11px] mt-0.5">
                    Paste your free Gemini API Key below to start chatting.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <input
                  type="password"
                  value={tempKeyInput}
                  onChange={(e) => setTempKeyInput(e.target.value)}
                  placeholder="Paste AI Studio API Key (AIzaSy...)"
                  className="flex-1 px-3 py-1.5 bg-black/60 border border-amber-500/30 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => saveApiKey(tempKeyInput)}
                  className="px-3 py-1.5 bg-amber-400 text-black font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-medium rounded-tr-none shadow-md'
                      : 'bg-zinc-900/90 text-zinc-100 border border-white/10 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-1 text-right opacity-60 ${
                      msg.sender === 'user' ? 'text-black' : 'text-zinc-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-zinc-900 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-1.5 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/40 text-[11px] text-zinc-300 hover:text-amber-400 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-950 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Enactus MSA..."
              className="flex-1 px-4 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-white placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 transition-colors shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
