import { useState } from 'react';

// отображает текущую тему операционной системы
export const useBrowserTheme = () => {
  return useState<'dark' | 'light' | undefined>(
    window.matchMedia('(prefers-color-cheme: dark)').matches ? 'dark' : 'light',
  );
};
