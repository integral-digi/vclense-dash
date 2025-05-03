"use client";
import { useRouter } from "next/navigation";
import { formatDate } from "./PodcastSection";
import { useState, useEffect } from "react";
import EventsSectionSkeleton from "@/app/skeletons/EventSkeleton";

const eventsData = {
	title: "Events",
	subtitle: "Upcoming Events",
	events: [
		{
			title: "AI & Robotics Conference",
			date: "2023-10-15",
			location: "Zurich, Switzerland",
			description: "Join us for a day of insightful talks and networking with industry leaders.",
			link: "#"
		},
		{
			title: "Deep Learning Workshop",
			date: "2023-11-05",
			location: "Geneva, Switzerland",
			description: "Hands-on workshop on deep learning techniques for robotics applications.",
			link: "#"
		},
		{
			title: "Robotics Hackathon",
			date: "2023-12-01",
			location: "Lausanne, Switzerland",
			description: "Collaborate with fellow developers to create innovative robotics solutions.",
			link: "#"
		}
	]
};

const EventsSection = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const handleAttend = (link: string) => {
		if (link && link !== "#") {
			router.push(link);
		} else {
			alert("Event registration coming soon!");
		}
	};

	if (loading) {
		return (
			<div className="w-full h-full">
				<EventsSectionSkeleton />
			</div>
		);
	}

	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-4">
			<div className="flex items-center p-4 border-b-2 border-gray-200 dark:border-stone-800">
				<h2 className="text-lg font-bold text-gray-700 dark:text-white">
					{eventsData.subtitle}
				</h2>
			</div>
			<div className="space-y-4 p-4">
				{eventsData.events.map((event) => (
					<div
						key={event.title}
						className="border-b border-gray-200 dark:border-stone-800 pb-4 last:border-none"
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
							<div className="space-y-1">
								<h3 className="text-base text-gray-700 dark:text-white font-semibold">{event.title}</h3>
								<p className="text-gray-500 dark:text-white text-xs">{formatDate(event.date)}</p>
							</div>
							<button
								className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-600 transition"
								onClick={() => handleAttend(event.link)}
							>
								Attend
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EventsSection;