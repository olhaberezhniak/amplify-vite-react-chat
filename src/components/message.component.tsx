import React from "react";
import { ChatMessageItem } from "../interfaces";

interface MessageProps {
  message: ChatMessageItem;
  currentUser: string;
}

export const Message: React.FC<MessageProps> = ({ message, currentUser }) => {
  const isMine = message.author === currentUser;
  const time = new Date(message.timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex w-full items-end space-x-2 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      {!isMine && (
        <span className="text-xs font-medium text-gray-500 w-14 shrink-0">
          {message.author}
        </span>
      )}

      <div
        className={`rounded-2xl px-4 py-2 max-w-xs break-words shadow ${
          isMine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        {message.content}
        <div className="mt-1 text-[10px] opacity-70 text-right">{time}</div>
      </div>
    </div>
  );
};
