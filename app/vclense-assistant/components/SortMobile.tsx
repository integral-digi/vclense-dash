"use client";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortByCategoryProps {
	articles: { category?: string }[];
	selected: string;
	onChange: (cat: string) => void;
}

const SortMobile = ({ articles, selected, onChange }: SortByCategoryProps) => {
	// Predefined “known” categories
	const definedCats = ["Fintech", "Robotics", "Climate", "AI"];

	// Build the set of all categories (falling back to “Other Industries”)
	const allCats = useMemo(() => {
		return Array.from(
			new Set(
				articles.map(a => a.category?.trim() || "Other Industries")
			)
		);
	}, [articles]);

	// Split into known vs “other”
	const knownCats = useMemo(
		() => definedCats.filter(k => allCats.includes(k)),
		[allCats]
	);
	const otherCats = useMemo(
		() => allCats.filter(c => !definedCats.includes(c)),
		[allCats]
	);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<MenuButton className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
				<span className="ml-2 font-medium">{selected}</span>
				<ChevronDownIcon className="w-4 h-4 ml-1" />
			</MenuButton>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems className="absolute right-0 mt-2 w-56 bg-white rounded shadow-3xl focus:outline-none z-10">
					<div className="p-1">
						{/* “All” */}
						<MenuItem>
							{({ focus }) => (
								<button
									onClick={() => onChange("All")}
									className={`${
										focus ? "bg-gray-100" : ""
									} group flex w-full items-center px-3 py-2 text-sm font-medium`}
								>
									All
								</button>
							)}
						</MenuItem>

						{/* Known categories */}
						{knownCats.map(cat => (
							<MenuItem key={cat}>
								{({ focus }) => (
									<button
										onClick={() => onChange(cat)}
										className={`${
											focus ? "bg-gray-100" : ""
										} group flex w-full items-center px-3 py-2 text-sm font-medium`}
									>
										{cat}
									</button>
								)}
							</MenuItem>
						))}

						{/* Other Industries group */}
						{otherCats.length > 0 && (
							<>
								<div className="mt-2 px-3 text-xs uppercase text-gray-500">
									Other Industries
								</div>
								{otherCats.map(cat => (
									<MenuItem key={cat}>
										{({ focus }) => (
											<button
												onClick={() => onChange(cat)}
												className={`${
													focus ? "bg-gray-100" : ""
												} group flex w-full items-center px-3 py-2 text-sm font-medium`}
											>
												{cat}
											</button>
										)}
									</MenuItem>
								))}
							</>
						)}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	);
}

export default SortMobile;
