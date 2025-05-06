"use client"
import { useState } from "react";
import SideNav from "@/app/components/SideNav";
import Main from "./components/Main";
import SidebarIcon from "@/public/assets/Sidebar";

const AssistantPage = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);

	const handleHideSidebar = () => {
		setIsSidebarVisible(false);
	};

	return (
		<div className="flex min-h-screen bg-stone-50 dark:bg-stone-800">
			{/* Sidebar */}
			{isSidebarVisible ? (
				<aside className="hidden lg:flex flex-col w-[18%] bg-white dark:bg-stone-800 fixed h-full">
					<SideNav onHide={handleHideSidebar} />
				</aside>
			) : (
				<div className="hidden lg:block w-24 h-screen bg-white dark:bg-stone-900 fixed z-50">
					<div 
						onClick={() => setIsSidebarVisible(true)}
						className="h-8 w-8 cursor-pointer text-gray-700 dark:text-gray-300 mx-auto mt-6"
					>
						<SidebarIcon />
					</div>
				</div>
			)}

			{/* Spacer for fixed sidebar */}
			<div className={`hidden lg:block ${!isSidebarVisible ? 'lg:w-24' : 'lg:w-[18%]'}`} />

			{/* Main content */}
			<main className="flex-1 w-full">
				<Main />
			</main>
		</div>
	);
};

export default AssistantPage;