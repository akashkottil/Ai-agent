"use client";

import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const { role, content } = message;
  const isBot = role === 'bot' || role === 'system';

  if (role === 'system') {
    return (
      <div className="text-center text-sm text-muted-foreground italic px-4 py-2 bg-secondary/50 rounded-lg animate-in fade-in">
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-start gap-4 animate-in fade-in",
        !isBot && "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl p-3 text-sm whitespace-pre-wrap shadow-sm",
          isBot
            ? "bg-secondary rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        {isLoading && content === "..." ? (
          <div className="flex items-center justify-center space-x-1 p-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current delay-0" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current delay-150" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current delay-300" />
          </div>
        ) : (
          content
        )}
      </div>

      {!isBot && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
