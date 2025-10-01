import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface OnboardingState {
  lastPeriodStart: string | null;
  avgPeriodDays: number;
  avgCycleDays: number;
}

interface OnboardingContextValue {
  state: OnboardingState;
  update: (next: Partial<OnboardingState>) => void;
  reset: () => void;
}

const DEFAULT_STATE: OnboardingState = {
  lastPeriodStart: null,
  avgPeriodDays: 5,
  avgCycleDays: 28,
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      state,
      update: (next) => setState((prev) => ({ ...prev, ...next })),
      reset: () => setState(DEFAULT_STATE),
    }),
    [state],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding yalnızca OnboardingProvider içinde çağrılabilir');
  }
  return ctx;
};
