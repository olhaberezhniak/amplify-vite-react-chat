import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data"; 

import type { Schema } from "../../amplify/data/resource";
import { MessageList } from '../components';
import { ChatMessageItem, ChatUser } from "../interfaces";
import { USERS } from "../constants";

const client = generateClient<Schema>();

export const ChatPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<ChatUser | "">("");
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    (async () => {
    try {
      const response = await client.models.Message.list();
      const messages = response.data;
      const sorted = messages.sort((a, b) =>
        a.timestamp!.localeCompare(b.timestamp!)
      );
      setMessages(sorted as ChatMessageItem[]);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  })();
}, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const subscription = client.models.Message.onCreate().subscribe({
      next: ( data ) =>
        setMessages((prev) => [...prev, data as ChatMessageItem]),
      error: console.error,
    });

    return () => subscription.unsubscribe();
  }, [currentUser]);

  const sendMessage = async () => {
    if (!input.trim() || !currentUser) return;

    await client.models.Message.create({
      author: currentUser.name,
      content: input.trim(),
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center gap-4">
        {USERS.map((u) => (
          <button
            key={u.id}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700"
            onClick={() => setCurrentUser(u)}
          >
            Continue as {u.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-blue-600 px-4 py-2 text-white shadow mb-2">
        <h1 className="text-lg font-semibold">Chat as {currentUser.name}</h1>
        <button
          className="text-sm underline"
          onClick={() => setCurrentUser("")}
        >
          back
        </button>
      </header>

      <main className="flex-1 overflow-hidden">
        <MessageList messages={messages} currentUser={currentUser.name} loading={loading}/>
      </main>

      <footer className="flex items-center gap-2 border-t p-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2 outline-none"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send
        </button>
      </footer>
    </div>
  );
};
