import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatHome } from './components/ChatHome';
import { ChatInterface } from './components/ChatInterface';
import { HealthProfileView } from './components/HealthProfileView';
import { HealthLibraryView } from './components/HealthLibraryView';
import { SettingsView } from './components/SettingsView';
import { sendChatMessage, initialHealthProfile } from './services/api';
import type { Conversation, ChatMessage, HealthProfile } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'profile' | 'settings'>('chat');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Health Profile State (persisted in localStorage)
  const [profile, setProfile] = useState<HealthProfile>(() => {
    const saved = localStorage.getItem('hc_profile');
    return saved ? JSON.parse(saved) : initialHealthProfile;
  });

  // Conversations State
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('hc_conversations');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Active messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('hc_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persist profile
  useEffect(() => {
    localStorage.setItem('hc_profile', JSON.stringify(profile));
  }, [profile]);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem('hc_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Persist active messages
  useEffect(() => {
    localStorage.setItem('hc_messages', JSON.stringify(messages));
  }, [messages]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = async (
    text: string,
    fileAttachment?: { name: string; type: string; base64Data: string; size: string }
  ) => {
    if (!text.trim() && !fileAttachment) return;

    const convId = currentConversationId || `conv-${Date.now()}`;
    if (!currentConversationId) {
      setCurrentConversationId(convId);
      const title = text.slice(0, 36) || (fileAttachment ? `Analysis of ${fileAttachment.name}` : "Health inquiry");
      const newConv: Conversation = {
        id: convId,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setConversations((prev) => [newConv, ...prev]);
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      sender: 'USER',
      content: text || `[Uploaded file: ${fileAttachment?.name}]`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: fileAttachment ? [fileAttachment] : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(
        text,
        convId,
        profile,
        fileAttachment ? { name: fileAttachment.name, type: fileAttachment.type, base64Data: fileAttachment.base64Data } : undefined
      );

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        conversationId: response.conversationId || convId,
        sender: 'AI',
        content: response.message,
        timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWarning: response.isWarning
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        conversationId: convId,
        sender: 'AI',
        content: "Sorry, I encountered a temporary network issue. Please check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    setActiveTab('chat');
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      handleNewChat();
    }
  };

  const handleClearHistory = () => {
    setConversations([]);
    setMessages([]);
    setCurrentConversationId(null);
    localStorage.removeItem('hc_conversations');
    localStorage.removeItem('hc_messages');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAF8] dark:bg-[#131514] text-[#1F2937] dark:text-[#F3F4F6] font-sans antialiased bg-ambient-leaf selection:bg-[#4F6F52]/20">
      {/* Sidebar with logo, navigation, recent chats and security badge */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          profile={profile}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenProfile={() => setActiveTab('profile')}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Dynamic Views */}
        <main className="flex-1 flex flex-col overflow-y-auto relative z-10">
          {activeTab === 'chat' && (
            messages.length === 0 ? (
              <ChatHome
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            ) : (
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            )
          )}

          {activeTab === 'library' && (
            <HealthLibraryView
              onAskAIAboutTopic={(prompt) => {
                setActiveTab('chat');
                handleSendMessage(prompt);
              }}
            />
          )}

          {activeTab === 'profile' && (
            <HealthProfileView
              profile={profile}
              onSaveProfile={(updated) => setProfile(updated)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              profile={profile}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onClearHistory={handleClearHistory}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
