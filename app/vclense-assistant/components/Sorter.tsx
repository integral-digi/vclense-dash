"use client";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortByCategoryProps {
	articles: { category?: string }[];
	selected: string;
	onChange: (cat: string) => void;
}

const SortByCategory = ({
	articles,
	selected,
	onChange,
}: SortByCategoryProps) => {
	// 1. Define your known categories
	const definedCats = ["Fintech", "Robotics", "Climate"];

	// 2. Gather all categories from articles, defaulting missing to "Other Industries"
	const allCats = useMemo(() => {
		return Array.from(
			new Set(
				articles.map((a) => a.category?.trim() || "Other Industries")
			)
		);
	}, [articles]);

	// 3. Split into known vs other
	const knownCats = useMemo(
		() => definedCats.filter((k) => allCats.includes(k)),
		[allCats]
	);
	const otherCats = useMemo(
		() => allCats.filter((c) => !definedCats.includes(c)),
		[allCats]
	);

	// Helper to style buttons
	const btnClass = (cat: string) =>
		`px-3 py-1 rounded ${
			selected === cat
				? "bg-blue-600 text-white dark:bg-neutral-900 dark:text-white"
				: "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:dark:text-gray-700 dark:bg-zinc-800 dark:text-white"
		} text-sm font-medium font-medium`;

	return (
		<div className="flex items-center space-x-2">
			{/* All button */}
			<button
				onClick={() => onChange("All")}
				className={btnClass("All")}
			>
				All
			</button>

			{/* Known category buttons */}
			{knownCats.map((cat) => (
				<button
					key={cat}
					onClick={() => onChange(cat)}
					className={btnClass(cat)}
				>
					{cat}
				</button>
			))}

			{/* Other Industries dropdown */}
			{otherCats.length > 0 && (
				<Menu as="div" className="relative">
					<MenuButton
						className={`inline-flex items-center px-3 py-1 rounded ${
							selected === "Other Industries"
								? "bg-blue-500 text-white dark:bg-neutral-900 dark:text-white"
								: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-white hover:bg-gray-200 hover:dark:text-gray-700"
						} text-sm font-medium`}
					>
						Other Industries
						<ChevronDownIcon className="w-4 h-4 ml-1" />
					</MenuButton>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<MenuItems className="absolute right-0 mt-1 w-40 bg-white rounded shadow-3xl z-10">
							{otherCats.map((cat) => (
								<MenuItem key={cat}>
									{({ focus }) => (
										<button
											onClick={() => onChange(cat)}
											className={`w-full text-left px-3 py-2 text-sm font-medium ${
												focus ? "bg-gray-100" : ""
											}`}
										>
											{cat}
										</button>
									)}
								</MenuItem>
							))}
						</MenuItems>
					</Transition>
				</Menu>
			)}
		</div>
	);
}

export default SortByCategory;