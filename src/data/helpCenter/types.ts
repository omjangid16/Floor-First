export interface HelpOption {
  label: string;
  value: string;
  isLink?: boolean;
}

export interface HelpFlowNode {
  message: string;
  options: HelpOption[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  options?: HelpOption[];
}
