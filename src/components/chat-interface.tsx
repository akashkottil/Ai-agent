"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { generateBotResponse } from "@/ai/flows/generate-bot-response";
import type { Message, Role } from "@/lib/types";
import { RoleSelector } from "@/components/role-selector";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { Home, Landmark, HeartPulse, Plane, Bot, Trash2 } from 'lucide-react';

const ROLES: Role[] = [
  { value: 'Real Estate Agent', label: 'Real Estate Agent', icon: Home, prompt: "I'm your real estate assistant. Ask me about properties, market trends, or buying/selling processes." },
  { value: 'Financial Advisor', label: 'Financial Advisor', icon: Landmark, prompt: "As your financial advisor, I can help with investments, retirement planning, and savings strategies. What's on your mind?" },
  { value: 'Personal Trainer', label: 'Personal Trainer', icon: HeartPulse, prompt: "Ready to get fit? I'm your personal trainer. Ask me for workout routines, nutrition tips, or fitness advice." },
  { value: 'Travel Agent', label: 'Travel Agent', icon: Plane, prompt: "I'm your travel agent, here to help you plan your next adventure. Where do you want to go?" },
];

export function ChatInterface() {
  const [botRole, setBotRole] = useState<string>(ROLES[0].value);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetChat = () => {
    const currentRole = ROLES.find(r => r.value === botRole);
    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'system',
        content: currentRole?.prompt || 'Hello! How can I help you today?',
      },
    ]);
  };
  
  useEffect(() => {
    resetChat();
  }, [botRole]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter(m => m.role !== 'system')
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      const response = await generateBotResponse({
        userMessage: content,
        botRole,
        chatHistory,
      });

      if (response && response.botResponse) {
        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: response.botResponse,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error("Received an empty response from the bot.");
      }
    } catch (error) {
      console.error("Failed to get bot response:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem communicating with the bot. Please try again.",
      });
       const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'system',
          content: "Sorry, I'm having trouble connecting. Please try again in a moment.",
        };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
                <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline">Chatiko</CardTitle>
                <CardDescription>Your AI-powered assistant</CardDescription>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <RoleSelector roles={ROLES} selectedRole={botRole} onRoleChange={setBotRole} />
            <Button variant="ghost" size="icon" onClick={resetChat} aria-label="Reset chat">
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage
                message={{ id: 'loading', role: 'bot', content: '...' }}
                isLoading
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
