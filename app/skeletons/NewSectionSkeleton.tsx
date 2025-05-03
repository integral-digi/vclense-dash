import { ArrowRightIcon } from "@heroicons/react/24/outline";

const NewsSectionSkeleton = () => {
	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-6 animate-pulse">
			<div className="flex items-center p-4 border-b-2 border-gray-200 dark:border-stone-800">
				<div className="h-5 w-32 bg-gray-200 dark:bg-stone-700 rounded"></div>
			</div>

			<div className="px-4 pb-4 space-y-4">
				<div className="h-4 w-24 bg-blue-200 dark:bg-blue-800 rounded"></div>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div
							key={idx}
							className="bg-neutral-100 dark:bg-stone-800 p-4 rounded-lg space-y-3"
						>
							<div className="h-4 w-3/4 bg-gray-300 dark:bg-stone-700 rounded"></div>
							<div className="h-3 w-full bg-gray-200 dark:bg-stone-700 rounded"></div>
							<div className="h-3 w-5/6 bg-gray-200 dark:bg-stone-700 rounded"></div>
							<div className="flex items-center space-x-2 pt-2">
								<div className="h-3 w-24 bg-blue-300 dark:bg-blue-700 rounded"></div>
								<ArrowRightIcon className="h-4 w-4 text-blue-300 dark:text-blue-700" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NewsSectionSkeleton;
