"use client";

import { useState, useRef, FormEvent, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;
    onSendMessage(content);
    setContent("");
    textareaRef.current?.focus();
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3 w-full">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="flex-1 resize-none min-h-[40px] max-h-40 bg-secondary"
        rows={1}
        disabled={isLoading}
        aria-label="Chat message input"
      />
      <Button type="submit" size="icon" disabled={isLoading || !content.trim()} aria-label="Send message">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendHorizonal className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
}
