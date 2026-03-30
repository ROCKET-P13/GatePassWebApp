import { useThemeStore } from '@/Store/themeStore';

export const ThemeToggle = () => {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<button
			onClick={toggleTheme}
			className="px-3 py-2 rounded-md border"
		>
			{theme === 'dark' ? '🌙' : '☀️'}
		</button>
	);
};