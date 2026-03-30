import { Moon, Sun } from 'lucide-react';

import { themeStore } from '@/Store/themeStore';

export const ThemeToggle = () => {
	const theme = themeStore((state) => state.theme);
	const toggleTheme = themeStore((state) => state.toggleTheme);

	return (
		<button
			onClick={toggleTheme}
			className="px-3 py-2 rounded-md border"
		>
			{theme === 'dark' ? <Moon /> : <Sun />}
		</button>
	);
};