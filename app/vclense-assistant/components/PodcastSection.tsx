"use client";
import NewsSectionSkeleton from "@/app/skeletons/NewSectionSkeleton";
import PodcastSectionSkeleton from "@/app/skeletons/PodcastSkeleton";
import { PlayIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const podcastData = {
	title: "Suggested Podcasts",
	buttonText: "Listen Now",
	episodes: [
		{ title: "The Future of AI", host: "John Doe", release: "2024-08-01", link: "#" },
		{ title: "Robotics in Everyday Life", host: "Jane Smith", release: "2024-09-15", link: "#" },
		{ title: "Deep Learning Demystified", host: "Alice Johnson", release: "2025-10-01", link: "#" },
		{ title: "AI Ethics and Society", host: "Bob Brown", release: "2025-11-20", link: "#" },
		{ title: "The Rise of Autonomous Systems", host: "Charlie Davis", release: "2025-12-10", link: "#" },
	],
};

export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
	return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};

const PodcastSection = () => {
	const recentEpisodes = podcastData.episodes.slice(0, 3);

	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);
	
	if (loading) {
		return <div className="w-full h-full"><PodcastSectionSkeleton /></div>;
	}
	

	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-2">
			<div className="flex items-center p-4 border-b-2 border-gray-200 dark:border-stone-800">

				<h2 className="text-lg font-bold text-gray-700 dark:text-white">
					{podcastData.title}
				</h2>
			</div>

			<div className="p-4">
				<div className="w-full space-y-4">
					{recentEpisodes.map((episode) => (
						<div
							key={episode.title}
							className="bg-neutral-100 dark:bg-stone-800 p-4 rounded-lg space-y-3"
						>
							<h3 className="text-base text-gray-700 dark:text-white font-semibold">
								{episode.title}
							</h3>

							<p className="text-gray-500 dark:text-white text-xs">
								{episode.host} — {formatDate(episode.release)}
							</p>

							<Link
								href={episode.link}
								className="flex items-center space-x-2 text-blue-500  dark:text-blue-300 hover:underline text-sm font-semibold"
							>
								<PlayIcon className="h-4 w-4" />
								<span>{podcastData.buttonText}</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PodcastSection;