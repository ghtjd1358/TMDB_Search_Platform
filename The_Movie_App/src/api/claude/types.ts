export type ClaudeRole = 'user' | 'assistant';

export interface ClaudeContentBlock {
  type: 'text';
  text: string;
}

export interface ClaudeMessage {
  role: ClaudeRole;
  content: string | ClaudeContentBlock[];
}

export interface ClaudeUsage {
  input_tokens: number;
  output_tokens: number;
}

export type ClaudeStopReason =
  | 'end_turn'
  | 'max_tokens'
  | 'stop_sequence'
  | 'tool_use';

export interface ClaudeResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: ClaudeContentBlock[];
  model: string;
  stop_reason: ClaudeStopReason | null;
  usage: ClaudeUsage;
}
