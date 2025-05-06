import { CustomTooltipProps } from "@tremor/react";

export const NewsTooltip: React.FC<CustomTooltipProps> = ({
	active,
	payload,
	label,
}) => {
	if (!active || !payload || !payload.length) return null;

	// payload[0].value is your "news" count; payload[0].dataKey === "news"
	const count = payload[0].value as number;
	return (
		<div className="bg-slate-800 text-white p-3 rounded shadow-lg">
			<div className="text-sm font-medium">{label}</div>
			<div className="mt-1 text-lg font-bold">{count} articles</div>
			<div className="mt-2 text-xs text-gray-300">
				{count > 5
					? "High traffic this month"
					: "Lower news volume"}
			</div>
		</div>
	);
};