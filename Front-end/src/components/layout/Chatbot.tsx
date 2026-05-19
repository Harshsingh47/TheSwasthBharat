import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ChevronRight, 
  Droplet, 
  Calendar, 
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const faqs = [
  {
    question: "What is Swasth Bharat?",
    answer: "Swasth Bharat is a community-driven healthcare ecosystem focused on making healthcare accessible across India, with a special focus on the Himachal region. We connect patients with doctors, organize blood donation camps, and provide guides for govt schemes.",
    icon: Bot
  },
  {
    question: "How to book an appointment?",
    answer: "You can search for specialists in the 'Find Doctors' section, view their profiles, and click 'Book Appointment' to schedule a visit instantly.",
    icon: Calendar
  },
  {
    question: "Find emergency blood donors?",
    answer: "Visit our 'Blood Support' section. You can search for donors by blood group and location, or post an emergency request to alert nearby volunteers.",
    icon: Droplet
  },
  {
    question: "About Govt Health schemes?",
    answer: "Check the 'Govt Schemes' link in the footer. We provide detailed guides on Ayushman Bharat, HIMCARE, and other national health initiatives.",
    icon: ShieldCheck
  },
  {
    question: "How to join as a volunteer?",
    answer: "During signup, choose 'Volunteer Interest'. You can participate in health camps, blood donation drives, and community awareness programs.",
    icon: User
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Namaste! I'm your Swasth Bharat assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate Bot Response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: "Thank you for your message. Our team will get back to you soon. In the meantime, feel free to explore our FAQ section below!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleFaqClick = (faq: typeof faqs[0]) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: faq.question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: faq.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[320px] md:w-[360px] h-[500px] max-h-[75vh] bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="p-4 bg-brand-grad text-white relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs">Swasth Assistant</h3>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Always Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-gray-50/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-xl text-xs font-medium ${
                    msg.type === 'user' 
                      ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 opacity-50 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions (FAQs) */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
              <div className="flex items-center gap-1.5 mb-2.5">
                <HelpCircle className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Common Questions</span>
              </div>
              <div className="flex overflow-x-auto gap-1.5 pb-1 no-scrollbar">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaqClick(faq)}
                    className="flex-none flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-gray-100 rounded-lg transition-all cursor-pointer group"
                  >
                    <faq.icon className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold text-gray-600 group-hover:text-primary transition-colors whitespace-nowrap">
                      {faq.question}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="flex items-center gap-2.5"
              >
                <input 
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-primary transition-all font-medium"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all cursor-pointer relative group ${
          isOpen ? 'bg-white text-gray-900 border border-gray-100' : 'bg-brand-grad text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white animate-bounce">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
}
