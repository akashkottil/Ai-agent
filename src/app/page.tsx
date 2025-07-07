import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <ChatInterface />
    </main>
  );
}
