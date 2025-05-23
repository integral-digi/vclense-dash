"use client"
import { useEffect, useCallback } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeToggler: React.FC = () => {
	const { darkMode, toggleDarkMode } = useDarkMode();

	// sync body.class with darkMode state
	useEffect(() => {
		document.body.classList.toggle("dark", darkMode);
	}, [darkMode]);

	// memoize handler
	const handleClick = useCallback(() => {
		toggleDarkMode();
	}, [toggleDarkMode]);

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-pressed={darkMode}
			className="
				flex items-center space-x-2
				text-neutral-400 hover:text-neutral-800
				dark:hover:text-white
				transition-colors
				cursor-pointer
			"
		>
			{darkMode ? (
				<SunIcon className="h-5 w-5 text-neutral-400" />
			) : (
				<MoonIcon className="h-5 w-5 text-neutral-400" />
			)}
			<span className="text-sm font-medium">
				{darkMode ? "Light Mode" : "Dark Mode"}
			</span>
		</button>
	);
};

export default ThemeToggler;
