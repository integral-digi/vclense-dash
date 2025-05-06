"use client"
import React, { useState, useCallback } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const aiItems = {
	title: "Hello",
	description: "What can I tell you about Swiss VC?",
	placeholder: "Give VClense a question to work on...",
	icon: ArrowUpIcon,
	quickLinks: [
		{ label: "Fintech Startups in Zurich", action: "Fintech Startups in Zurich" },
		{ label: "Deeptech news 2025", action: "Deeptech news 2025" },
		{ label: "Robotic Podcasts", action: "Robotic Podcasts" },
	],
};

const AIChat: React.FC = () => {
	const [inputText, setInputText] = useState("");

	const handleQuickPromptClick = useCallback((prompt: string) => {
		setInputText(prompt);
	}, []);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setInputText(e.target.value);
		},
		[]
	);

	const handleSubmit = useCallback(
		async (e?: React.FormEvent) => {
			if (e) e.preventDefault();
			const trimmed = inputText.trim();
			if (!trimmed) return;

			try {
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message: trimmed }),
				});

				if (!response.ok) {
					console.error("Error sending message to FastAPI");
					return;
				}
				const data = await response.json();
				console.log("FastAPI Response:", data);
				// TODO: Display AI reply in UI
			} catch (error) {
				console.error("Fetch error:", error);
			}
		},
		[inputText]
	);

	const { title, description, placeholder, icon: Icon, quickLinks } = aiItems;

	return (
		<div className="flex flex-col w-full h-full space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-xl md:text-3xl font-bold text-gray-700 dark:text-white">
                    {aiItems.title}
                </h1>
            </div>
            <p className="text-xl md:text-3xl font-bold text-gray-500">
                {aiItems.description}
            </p>

			{/* Chat Input */}
			<form onSubmit={handleSubmit} className="relative w-full">
				<textarea
					rows={2}
					placeholder={placeholder}
					value={inputText}
					onChange={handleInputChange}
					className="w-full shadow-xs p-4 pr-12 rounded-2xl bg-white dark:bg-stone-800 border border-gray-200 dark:border-stone-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
                <button
					type="submit"
					aria-label="Send message"
					className="absolute right-4 bottom-4 bg-neutral-200/50 text-white rounded-full p-2 hover:bg-blue-300"
                >
					<ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-white" />
				</button>
			</form>

			{/* Quick Prompts */}
			<div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide py-2">
				{quickLinks.map((link) => (
					<button
						key={link.label}
						type="button"
						onClick={() => handleQuickPromptClick(link.action)}
						className="flex items-center space-x-1 bg-gray-100 dark:bg-stone-900 hover:bg-gray-200 dark:hover:bg-stone-800 px-3 py-1 rounded-full cursor-pointer flex-shrink-0"
					>
						<span className="text-sm font-medium text-gray-700 dark:text-white">
							{link.label}
						</span>
						<Icon className="w-3 h-3 text-gray-700 dark:text-white" />
					</button>
				))}
			</div>
		</div>
	);
};

export default AIChat;