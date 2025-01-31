import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type Mode = 'normal' | 'hotplace';

type ModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('normal');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
