import React, { useEffect, useRef } from "react";
import { Message } from './message.component';
import { ChatMessageItem } from "../interfaces";

interface MessageListProps {
  messages: ChatMessageItem[];
  currentUser: string;
  loading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  loading = false,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto h-full px-2">
       {loading
        ? <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        : messages.map((m) => (
            <Message key={m.id} message={m} currentUser={currentUser} />
          ))}
      <div ref={bottomRef} />
    </div>
  );
};
