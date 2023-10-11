import { useState } from 'react';

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export const useLoading = () => {
  return useState<LoadingStatus>('idle');
};

export const isLoading = (status: LoadingStatus) => status === 'loading';
