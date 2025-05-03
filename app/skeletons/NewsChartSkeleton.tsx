import { Card } from "@tremor/react";

const NewsBarChartSkeleton = () => {
	return (
		<Card className="sm:mx-auto sm:max-w-2xl text-white animate-pulse">
			<div className="space-y-4">
				{/* Title */}
				<div className="h-6 w-48 bg-gray-300 dark:bg-stone-700 rounded"></div>

				{/* Date range */}
				<div className="h-4 w-32 bg-gray-200 dark:bg-stone-700 rounded mb-8"></div>

				{/* Simulated BarChart */}
				<div className="flex items-end h-60 space-x-4">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div key={idx} className="flex-1 flex flex-col items-center justify-end">
							<div className="w-6 bg-gray-400 dark:bg-stone-700 rounded-t-md" style={{ height: `${20 + idx * 10}px` }}></div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default NewsBarChartSkeleton;