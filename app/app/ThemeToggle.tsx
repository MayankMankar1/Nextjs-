'use client';
import { useTheme } from './providers/Theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-yellow-300 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
