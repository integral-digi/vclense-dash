"use client";
import { useEffect, useMemo, useState } from "react";
import { BarChart, Card } from "@tremor/react";
import { newsData } from "./NewsSection"; // Assuming newsData is in this file
import NewsBarChartSkeleton from "@/app/skeletons/NewsChartSkeleton";
import { NewsTooltip } from "./CustomToolTip";

// Simple integer formatter
function valueFormatter(n: number): string {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    }).format(n);
}

const NewsBarChart = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Memoize the chart data and labels based on newsData
    const { data, startLabel, endLabel } = useMemo(() => {
        const now = new Date();
        const months: Date[] = [];

        // Get the last 6 months, oldest first
        for (let i = 5; i >= 0; i--) {
            months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
        }

        // Map to our chart data
        const chartData = months.map((m) => {
            const label = m.toLocaleString("default", { month: "short" });
            // Filter news articles for the current month
            const newsCount = newsData.articles.filter((a) => {
                const d = new Date(a.publishedAt);
                return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth();
            }).length;
            return { date: label, news: newsCount };
        });

        const startLabel = months[0].toLocaleString("default", { month: "short" }) + " " + months[0].getFullYear();
        const endLabel = months[months.length - 1].toLocaleString("default", { month: "short" }) + " " + months[months.length - 1].getFullYear();

        return { data: chartData, startLabel, endLabel };
    }, [newsData]); // Only re-run if newsData changes

    // If still loading, show skeleton
    if (loading) {
        return (
            <div className="w-full h-full">
                <NewsBarChartSkeleton />
            </div>
        );
    }

    return (
        <Card className="sm:mx-auto sm:max-w-2xl text-white">
            <h3 className="text-lg font-bold">News in the Last 6 Months</h3>
            <p className="text-sm font-medium mb-8">
                {startLabel} – {endLabel}
            </p>

            <BarChart
                data={data}
                index="date"
                categories={["news"]}
                colors={["#FFFFFF"]}
                valueFormatter={valueFormatter}
                showYAxis={false}
                showLegend={false}
                yAxisWidth={50}
                className="h-60"
				customTooltip={NewsTooltip}
            />
        </Card>
    );
};

export default NewsBarChart;