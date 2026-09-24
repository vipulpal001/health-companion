import React from 'react';
import { MessageSquare, BookOpen, User, Settings, ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { HealthLogo } from './HealthLogo';
import type { Conversation } from '../types';

interface SidebarProps {
  activeTab: 'chat' | 'library' | 'profile' | 'settings';
  setActiveTab: (tab: 'chat' | 'library' | 'profile' | 'settings') => void;
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'library', label: 'Health Library', icon: BookOpen },
    { id: 'profile', label: 'My Health', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#FAFAF8] dark:bg-[#131514] border-r border-[#E5E7EB] dark:border-[#272C29]
        flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header & Brand */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <HealthLogo size={34} />
            <div className="leading-tight">
              <span className="font-semibold text-base text-[#1F2937] dark:text-[#F3F4F6] block">
                Health
              </span>
              <span className="font-semibold text-base text-[#1F2937] dark:text-[#F3F4F6] block -mt-1">
                Companion
              </span>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              setActiveTab('chat');
              onCloseMobile();
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-white dark:bg-[#1B1E1C] hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] text-[#1F2937] dark:text-[#F3F4F6] text-sm font-medium transition shadow-xs hover:border-[#4F6F52]"
          >
            <Plus className="w-4 h-4 text-[#4F6F52] dark:text-[#719F75]" />
            <span>New Chat</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                    isActive
                      ? 'bg-[#EBF2EC] dark:bg-[#1D2A20] text-[#4F6F52] dark:text-[#719F75]'
                      : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-[#F3F4F6] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4F6F52] dark:text-[#719F75]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Recent Conversations (if in Chat tab) */}
          {activeTab === 'chat' && conversations.length > 0 && (
            <div className="mt-2 flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] px-3">
                Recent Chats
              </span>
              {conversations.slice(0, 8).map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onCloseMobile();
                  }}
                  className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition ${
                    currentConversationId === conv.id
                      ? 'bg-white dark:bg-[#1B1E1C] text-[#1F2937] dark:text-[#F3F4F6] font-medium shadow-xs border border-[#E5E7EB] dark:border-[#272C29]'
                      : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="truncate max-w-[140px]">{conv.title || 'Health consultation'}</span>
                  <button
                    onClick={(e) => onDeleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Trust & Privacy Footer (from reference image) */}
        <div className="pt-6 border-t border-[#E5E7EB] dark:border-[#272C29] flex items-center gap-2.5 text-[#6B7280] dark:text-[#9CA3AF]">
          <ShieldCheck className="w-5 h-5 shrink-0 text-[#4F6F52] dark:text-[#719F75]" />
          <span className="text-xs leading-snug">
            Your data is private and secure
          </span>
        </div>
      </aside>
    </>
  );
};
