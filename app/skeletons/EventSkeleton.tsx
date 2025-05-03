const EventsSectionSkeleton = () => {
	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-4 animate-pulse">
			<div className="flex items-center p-4 border-b-2 border-gray-200 dark:border-stone-800">
				<div className="h-5 w-32 bg-gray-200 dark:bg-stone-700 rounded"></div>
			</div>
			<div className="space-y-4 p-4">
				{Array.from({ length: 3 }).map((_, idx) => (
					<div
						key={idx}
						className="border-b border-gray-200 dark:border-stone-800 pb-4 last:border-none"
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
							<div className="space-y-1">
								<div className="h-4 w-48 bg-gray-300 dark:bg-stone-700 rounded"></div>
								<div className="h-3 w-24 bg-gray-200 dark:bg-stone-700 rounded"></div>
							</div>
							<div className="h-8 w-24 bg-blue-300 dark:bg-blue-700 rounded-md"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EventsSectionSkeleton;