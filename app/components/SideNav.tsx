"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import SidebarToggle from "@/public/assets/Sidebar";
import ThemeToggler from "./Toggler";

import {
	ViewfinderCircleIcon,
	MegaphoneIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const description =
	"This Assistant is focused on the Swiss Venture Capital Market and should support Startups and Investors in the space.";

const navLinks = [
	{ icon: ViewfinderCircleIcon, label: "VClense Assistant", path: "/vclense-assistant" },
	{ icon: MegaphoneIcon, label: "News Dashboard", path: "/news" },
	{ icon: MapPinIcon, label: "Swiss VC Maps", path: "/swiss-vc-maps" },
];

const utilities = [
	{
		icon: EnvelopeIcon,
		label: "Send Feedback",
		onClick: () => window.open("mailto:feedback@vclense.com"),
	},
];

const SideNav = ({ onHide }: { onHide?: () => void }) => {
	const pathname = usePathname() || "/";

	return (
		<nav className="flex h-screen w-full flex-col justify-between bg-white p-6 dark:bg-stone-900">
			{/* Top */}
			<div className="space-y-5">
				{/* toggle icon */}
				<div className="flex items-center justify-between">
					<div 
						onClick={onHide}
						className="h-8 w-8 cursor-pointer text-gray-700 dark:text-gray-300"
					>
						<SidebarToggle/>
					</div>
				</div>

				{/* Description */}
				<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
					{description}
				</p>

				{/* Links Section */}
				<div className="space-y-4">
					<p className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
						{"Assistants".toUpperCase()}
					</p>
					<div className="space-y-3">
						{navLinks.map(({ icon: Icon, label, path }) => {
							const active = pathname === path;
							return (
								<Link
									key={path}
									href={path}
									className={`flex items-center space-x-4 rounded-md p-2 text-base font-medium transition-colors
										${active
											? "bg-blue-100 text-blue-500 dark:text-blue-100  dark:bg-stone-800 dark:hover:bg-stone-800"
											: "text-neutral-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-stone-800"
										}`}
								>
									<Icon className="h-5 w-5" />
									<span>{label}</span>
								</Link>
							);
						})}
					</div>
					<p className="text-sm text-neutral-400 dark:text-neutral-500">
						More Assistants coming soon…
					</p>
				</div>
			</div>

			{/* Bottom Utilities */}
			<div className="space-y-6">
				{utilities.map(({ icon: Icon, label, onClick }) => (
					<button
						key={label}
						onClick={onClick}
						className="flex items-center space-x-2 text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
					>
						<Icon className="h-5 w-5" />
						<span className="text-sm">{label}</span>
					</button>
				))}

				{/* Dark mode toggle */}
				<ThemeToggler />
			</div>
		</nav>
	);
}

export default SideNav;