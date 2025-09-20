import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	theme: 'dark',
	setTheme: (theme) => set({ theme }),
}));
