import { useState } from 'react';

export const useLoading = () => {
  return useState<'idle' | 'loading' | 'success' | 'error'>('idle');
};
