import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Paperclip, Image as ImageIcon, Send, AlertTriangle, User, FileText, CheckCircle2 } from 'lucide-react';
import { HealthLogo } from './HealthLogo';
import type { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, fileAttachment?: { name: string; type: string; base64Data: string; size: string }) => void;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: string; base64Data: string; size: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

  return (
    <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full px-4 sm:px-6 py-4">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 pb-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {!isUser && (
                <div className="shrink-0 mt-1">
                  <HealthLogo size={28} />
                </div>
              )}

              {/* Message Bubble Container */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed transition-all shadow-2xs ${
                  isUser
                    ? 'bg-[#4F6F52] text-white rounded-tr-xs'
                    : msg.isWarning
                    ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[#1F2937] dark:text-[#F3F4F6] rounded-tl-xs'
                    : 'bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] text-[#1F2937] dark:text-[#F3F4F6] rounded-tl-xs'
                }`}
              >
                {/* File Attachment indicator */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {msg.attachments.map((att, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs ${
                          isUser ? 'bg-white/15 text-white' : 'bg-[#EBF2EC] dark:bg-[#1D2A20] text-[#1F2937] dark:text-[#F3F4F6]'
                        }`}
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        <span className="font-medium truncate">{att.name}</span>
                        {att.size && <span className="opacity-75 text-[11px]">({att.size})</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Warning Card header */}
                {msg.isWarning && (
                  <div className="flex items-center gap-2 mb-2 font-semibold text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Urgent Medical Attention Notice</span>
                  </div>
                )}

                {/* Message Content rendered with Markdown support */}
                <div className={`prose max-w-none text-sm ${isUser ? 'prose-invert text-white' : 'dark:prose-invert'} prose-headings:font-semibold prose-h3:text-base prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Timestamp */}
                <div className={`mt-2 text-[10px] text-right ${isUser ? 'text-white/70' : 'text-[#9CA3AF]'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-7 h-7 rounded-full bg-[#E5E7EB] dark:bg-[#272C29] flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-[#4F6F52] dark:text-[#719F75]" />
                </div>
              )}
            </div>
          );
        })}

        {/* AI Typing / Thinking indicator */}
        {isLoading && (
          <div className="flex gap-3.5 items-start">
            <HealthLogo size={28} />
            <div className="bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#4F6F52] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#4F6F52] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#4F6F52] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-2 text-xs font-medium text-[#6B7280]">Analyzing medical context...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Bottom Input Bar */}
      <div className="mt-2 w-full bg-white dark:bg-[#1B1E1C] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] p-3 shadow-md">
        {/* Attachment preview if any */}
        {attachedFile && (
          <div className="mb-2 p-2 px-3 bg-[#EBF2EC] dark:bg-[#1D2A20] rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate text-[#1F2937] dark:text-[#F3F4F6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span className="font-medium truncate">{attachedFile.name}</span>
              <span className="text-[#6B7280] text-[11px]">({attachedFile.size})</span>
            </div>
            <button
              onClick={() => setAttachedFile(null)}
              className="text-[#6B7280] hover:text-red-500 font-bold px-1"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* File buttons */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-[#6B7280] hover:text-[#4F6F52] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] rounded-xl transition"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-[#6B7280] hover:text-[#4F6F52] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] rounded-xl transition"
            title="Attach image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Text Area */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health question or symptom update..."
            rows={1}
            className="flex-1 max-h-32 bg-transparent resize-none border-none outline-none text-sm text-[#1F2937] dark:text-[#F3F4F6] placeholder-[#9CA3AF] py-2"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={(!inputText.trim() && !attachedFile) || isLoading}
            className={`p-2.5 rounded-xl font-medium transition ${
              (!inputText.trim() && !attachedFile) || isLoading
                ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed'
                : 'bg-[#4F6F52] hover:bg-[#3E5A41] text-white shadow-xs'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center mt-2">
        <span className="text-[10px] text-[#9CA3AF]">
          AI health advice is educational. Always consult a physician for diagnostic evaluation.
        </span>
      </div>
    </div>
  );
};
