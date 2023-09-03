export type ResponseData<T> = {
  success: boolean;
  error?: any;
  result?: T;
};

export interface Option {
  key: string;
  label: string;
}

export type Action = 'join' | 'leave';
