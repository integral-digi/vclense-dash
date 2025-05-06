"use client";
import Image from "next/image";
import AIChat from "./AIChat";
import EventsSection from "./Events";
import NewsSection from "./NewsSection";
import PodcastSection from "./PodcastSection";
import NewsBarChart from "./Chart";
import dynamic from "next/dynamic";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Nav from "@/app/components/Nav";
import MobileNav from "@/app/components/MobileNav";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

const Main = () => {
	return (
		<div className="w-full space-y-12 py-6 px-4 lg:px-12 relative">
			<Nav />
			<MobileNav />
			<div className="w-full lg:w-2/3">
				<AIChat />
			</div>
			<div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 justify-between w-full">
				<div className="w-full lg:w-[66%] space-y-5">
					<NewsSection />
					<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl p-2"> 
						<MapView />
					</div>
				</div>
				<div className="w-full lg:w-[32%] space-y-6">	
					<div className="w-full bg-[#5172aa] rounded-lg shadow-3xl"> 
						<NewsBarChart />
					</div>
					<div className="w-full bg-white dark:bg-stone-800 rounded-lg shadow-3xl"> 
						<PodcastSection />
					</div>
					<div className="w-full bg-white dark:bg-stone-800 rounded-lg shadow-3xl"> 
						<EventsSection />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;