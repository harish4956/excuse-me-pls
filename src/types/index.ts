export type Category =
  | 'late_work'
  | 'missed_deadline'
  | 'skipping_plans'
  | 'late_reply'
  | 'school'
  | 'general';

// Note: these values are internal keys. UI labels differ (believable→Genuine, risky→Funny, unhinged→Dark).
export type Mode = 'believable' | 'risky' | 'unhinged';

export interface Excuse {
  id: string;
  category: Category;
  mode: Mode;
  /** The generated excuse text, written in first person. */
  text: string;
  /** 1–10 */
  believability: number;
  /** 1–10 */
  absurdity: number;
  fakeEvidence?: string;
}
