const PodcastSectionSkeleton = () => {
	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-2 animate-pulse">
			{/* Header */}
			<div className="flex items-center p-4 border-b-2 border-gray-200 dark:border-stone-800">
				<div className="h-6 w-48 bg-gray-300 dark:bg-stone-700 rounded"></div>
			</div>

			{/* Episodes */}
			<div className="p-4 space-y-4">
				{Array.from({ length: 3 }).map((_, idx) => (
					<div
						key={idx}
						className="bg-neutral-100 dark:bg-stone-800 p-4 rounded-lg space-y-3"
					>
						{/* Episode title */}
						<div className="h-5 w-3/4 bg-gray-300 dark:bg-stone-700 rounded"></div>

						{/* Host and date */}
						<div className="h-4 w-1/2 bg-gray-200 dark:bg-stone-700 rounded"></div>

						{/* Listen button */}
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 bg-gray-400 dark:bg-stone-600 rounded-full"></div>
							<div className="h-4 w-24 bg-gray-300 dark:bg-stone-700 rounded"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PodcastSectionSkeleton;
