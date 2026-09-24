import React, { useState, useRef } from 'react';
import { Paperclip, Image as ImageIcon, Mic, MicOff, Send, X, Stethoscope, Pill, FlaskConical, Heart } from 'lucide-react';
import { CenterBadgeLogo } from './HealthLogo';

interface ChatHomeProps {
  onSendMessage: (text: string, fileAttachment?: { name: string; type: string; base64Data: string; size: string }) => void;
  isLoading: boolean;
}

export const ChatHome: React.FC<ChatHomeProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: string; base64Data: string; size: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!inputText.trim() && !attachedFile) || isLoading) return;
    onSendMessage(inputText, attachedFile || undefined);
    setInputText('');
    setAttachedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachedFile({
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        base64Data: reader.result as string
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition || 
                              (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const suggestionCards = [
    {
      title: "I have a fever and headache",
      icon: Stethoscope,
      prompt: "I have a fever and headache since yesterday. What should I do?"
    },
    {
      title: "Tell me about this medicine",
      icon: Pill,
      prompt: "What is paracetamol used for and what are its common precautions?"
    },
    {
      title: "Explain my lab report",
      icon: FlaskConical,
      prompt: "Can you help me understand what a CBC (complete blood count) report measures?"
    },
    {
      title: "Tips for better sleep",
      icon: Heart,
      prompt: "What are some practical evidence-based tips for better sleep hygiene?"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full">
      {/* Center Logo with Cross and Organic Leaf Badge matching reference image */}
      <div className="mb-6 animate-fade-in">
        <CenterBadgeLogo size={88} />
      </div>

      {/* Main Headings */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1F2937] dark:text-[#F3F4F6] text-center mb-3">
        How are you feeling?
      </h1>
      <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] text-center mb-4 max-w-lg">
        Tell me what you're experiencing. I'm here to help.
      </p>

      {/* Subtle indicator bar beneath subtitle (from reference image) */}
      <div className="w-8 h-1 rounded-full bg-[#4F6F52] mb-8 opacity-85"></div>

      {/* Large Chat Input Card */}
      <div className="w-full bg-white dark:bg-[#1B1E1C] rounded-3xl border border-[#E5E7EB] dark:border-[#272C29] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Attachment preview if any */}
        {attachedFile && (
          <div className="mb-3 p-2 px-3 bg-[#EBF2EC] dark:bg-[#1D2A20] rounded-xl flex items-center justify-between text-xs text-[#1F2937] dark:text-[#F3F4F6]">
            <div className="flex items-center gap-2 truncate">
              <Paperclip className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span className="font-medium truncate">{attachedFile.name}</span>
              <span className="text-[#6B7280] text-[11px]">({attachedFile.size})</span>
            </div>
            <button
              onClick={() => setAttachedFile(null)}
              className="p-1 hover:text-red-500 rounded-full"
              title="Remove attachment"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Text input area */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your symptoms, ask a health question, or share a concern..."
          rows={3}
          className="w-full bg-transparent resize-none border-none outline-none text-[#1F2937] dark:text-[#F3F4F6] placeholder-[#9CA3AF] text-sm sm:text-base leading-relaxed"
        />

        {/* Action icons row & Send button */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-transparent sm:border-gray-50 dark:sm:border-zinc-800/40">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.png,.jpg,.jpeg,.txt"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:p-2.5 rounded-full text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#4F6F52] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] transition"
              title="Attach medical document (PDF, PNG, JPG)"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Image Input */}
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2 sm:p-2.5 rounded-full text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#4F6F52] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] transition"
              title="Upload prescription or lab photo"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Microphone button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2 sm:p-2.5 rounded-full transition ${
                isRecording 
                  ? 'bg-red-50 text-red-600 animate-pulse' 
                  : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#4F6F52] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20]'
              }`}
              title={isRecording ? "Listening... click to stop" : "Speak your symptoms"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Send Button matching reference image button style */}
          <button
            onClick={handleSend}
            disabled={(!inputText.trim() && !attachedFile) || isLoading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              (!inputText.trim() && !attachedFile) || isLoading
                ? 'bg-[#E5E7EB] dark:bg-[#272C29] text-[#9CA3AF] cursor-not-allowed'
                : 'bg-[#4F6F52] hover:bg-[#3E5A41] text-white shadow-xs hover:shadow active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Suggestion Section: "Try asking something like" */}
      <div className="w-full mt-10">
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-[#E5E7EB] dark:border-[#272C29] w-full"></div>
          <span className="absolute bg-[#FAFAF8] dark:bg-[#131514] px-4 text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF]">
            Try asking something like
          </span>
        </div>

        {/* 4 Suggestion Cards matching the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {suggestionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                onClick={() => onSendMessage(card.prompt)}
                className="group flex items-center gap-3.5 p-3.5 bg-white dark:bg-[#1B1E1C] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] hover:border-[#4F6F52]/40 transition-all text-left shadow-2xs hover:shadow-xs"
              >
                <div className="p-2 rounded-xl bg-[#FAFAF8] dark:bg-[#222724] group-hover:bg-white dark:group-hover:bg-[#2A312C] text-[#4F6F52] dark:text-[#719F75] transition shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#1F2937] dark:text-[#F3F4F6] line-clamp-2">
                  {card.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Medical Safety Disclaimer (Subtle footer) */}
      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] text-center mt-10 max-w-lg opacity-80">
        This AI provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  );
};
