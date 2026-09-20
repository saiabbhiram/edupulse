import React, { useState } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import FormField from '../components/common/FormField';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { messageService, teacherService, studentService } from '../services/storageService';
import { MessageSquare, Send, Plus, User, Search, CheckCircle2 } from 'lucide-react';

const Messages = () => {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [threads, setThreads] = useState(() => messageService.getAll());
  const [selectedThreadId, setSelectedThreadId] = useState(threads[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newThreadData, setNewThreadData] = useState({
    recipient: 'Sarah Jenkins (Teacher)',
    subject: '',
    initialMessage: ''
  });

  const refresh = () => setThreads(messageService.getAll());

  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    messageService.reply(activeThread.id, currentUser?.name || 'Administrator', replyText.trim());
    setReplyText('');
    refresh();
  };

  const handleStartNewThread = (e) => {
    e.preventDefault();
    if (!newThreadData.subject.trim() || !newThreadData.initialMessage.trim()) return;

    const newThread = {
      id: `MSG-${Date.now()}`,
      senderId: currentUser?.id || 'ADM-1',
      senderName: currentUser?.name || 'Administrator',
      senderRole: currentUser?.role || 'Admin',
      recipientName: newThreadData.recipient,
      subject: newThreadData.subject,
      preview: newThreadData.initialMessage,
      unread: false,
      thread: [
        {
          id: `m-${Date.now()}`,
          sender: currentUser?.name || 'Administrator',
          time: 'Just now',
          text: newThreadData.initialMessage
        }
      ]
    };

    messageService.save(newThread);
    refresh();
    setSelectedThreadId(newThread.id);
    setIsNewThreadOpen(false);
    toast.success('Message sent & thread started', 'Message Sent');
  };

  const filteredThreads = threads.filter(t => {
    const q = searchFilter.toLowerCase();
    return (
      t.subject?.toLowerCase().includes(q) ||
      t.senderName?.toLowerCase().includes(q) ||
      t.recipientName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Messages & Communication Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Internal messaging between faculty, administration, students, and parents
          </p>
        </div>
        <Button onClick={() => setIsNewThreadOpen(true)} size="sm" icon={Plus}>
          New Message
        </Button>
      </div>

      {/* Main Split Chat Layout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[620px]">
        {/* Left Threads Column */}
        <div className="w-full md:w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col">
          {/* Search Contacts */}
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filteredThreads.map((t) => {
              const isSelected = t.id === (activeThread?.id);
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedThreadId(t.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t.senderName === currentUser?.name ? t.recipientName : t.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {t.thread[t.thread.length - 1]?.time}
                    </span>
                  </div>
                  <h5 className="text-xs font-medium text-indigo-600 dark:text-indigo-400 truncate mb-1">
                    {t.subject}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {t.preview}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-slate-900/30">
          {activeThread ? (
            <>
              {/* Chat Thread Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeThread.subject}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Between {activeThread.senderName} and {activeThread.recipientName}
                  </p>
                </div>
              </div>

              {/* Messages History Bubbles */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {activeThread.thread.map((msg, i) => {
                  const isMe = msg.sender === (currentUser?.name || 'Administrator');
                  return (
                    <div
                      key={i}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-slate-400">
                          {msg.sender}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {msg.time}
                        </span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-sm shadow-indigo-600/20'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input & Send Bar */}
              <form
                onSubmit={handleSendReply}
                className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button type="submit" size="sm" icon={Send}>
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation thread to view messages
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      <Modal
        isOpen={isNewThreadOpen}
        onClose={() => setIsNewThreadOpen(false)}
        title="Compose New Message"
        size="md"
      >
        <form onSubmit={handleStartNewThread} className="space-y-4">
          <FormField
            label="Recipient"
            name="recipient"
            type="select"
            value={newThreadData.recipient}
            onChange={(e) => setNewThreadData({ ...newThreadData, recipient: e.target.value })}
            options={[
              'Sarah Jenkins (Teacher)',
              'Dr. Robert Chen (Teacher)',
              'Thomas Hayes (Parent)',
              'Alexander Hayes (Student)',
              'All School Staff',
              'School Administration'
            ]}
            required
          />

          <FormField
            label="Subject"
            name="subject"
            value={newThreadData.subject}
            onChange={(e) => setNewThreadData({ ...newThreadData, subject: e.target.value })}
            placeholder="e.g. Science Olympiad Consultation"
            required
          />

          <FormField
            label="Initial Message"
            name="initialMessage"
            type="textarea"
            rows={4}
            value={newThreadData.initialMessage}
            onChange={(e) => setNewThreadData({ ...newThreadData, initialMessage: e.target.value })}
            placeholder="Type your message details here..."
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsNewThreadOpen(false)}>Cancel</Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Messages;
