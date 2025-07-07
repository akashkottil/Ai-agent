export type Message = {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
};

export type Role = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
};
