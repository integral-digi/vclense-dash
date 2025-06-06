"use client";
import NewsSectionSkeleton from "@/app/skeletons/NewSectionSkeleton";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import SortByCategory from "./Sorter";
import SortMobile from "./SortMobile";

export const newsData = {
	title: "News of the Week",
	subtitle: "Top News - ",
	articles: [
		{ title: "Rivr. in UK", content: "Access high-quality design services at a fraction of traditional costs. The company's innovative platform has already onboarded over 500 premium design agencies across Europe.", category: "Fintech", path: "/articles/article1", publishedAt: "2025-05-01" },
		{ title: "Funding down 12%", content: "Overall robotics funding has decreased by 12% compared to last quarter, though core automation sectors remain strong with strategic investments continuing.", category: "Robotics", path: "/articles/article2", publishedAt: "2025-04-02" },
		{ title: "Defence Tech hype", content: "Military robotics and autonomous systems seeing unprecedented investment surge with 3 major Swiss startups securing late-stage funding in Q2.",  category: "Climate", path: "/articles/article3", publishedAt: "2025-03-03" },
		{ title: "Liquidation in Process", content: "Zurich-based robotics startup facing liquidation after failing to secure Series B funding. Assets currently being evaluated by potential acquirers.", category: "Robotics",  path: "/articles/article4", publishedAt: "2025-02-12" },
		{ title: "AI in Robotics", content: "AI-driven robotics solutions are gaining traction in the Swiss market, with several startups leveraging machine learning for enhanced automation.",  category: "Robotics", path: "/articles/article5", publishedAt: "2025-01-05" },
		{ title: "New Robotics Hub", content: "A new AI innovation hub is set to open in Geneva, aiming to foster collaboration between startups and established companies in the field.",  category: "AI", path: "/articles/article6", publishedAt: "2025-01-06" },
		{ title: "Funding Round Success", content: "A Zurich-based robotics startup has successfully closed a $10 million funding round, led by a prominent venture capital firm.",  category: "Fintech", path: "/articles/article7", publishedAt: "2025-01-12" },
		{ title: "Partnership Announcement", content: "Two leading Swiss robotics companies have announced a strategic partnership to develop next-generation autonomous systems.",  category: "Fintech", path: "/articles/article8", publishedAt: "2024-12-12" },
		{ title: "Climate Change Initiative", content: "A new initiative aims to leverage robotics technology to combat school violence, with several Swiss startups at the forefront.",  category: "Education", path: "/articles/article9", publishedAt: "2024-12-11" },
		{ title: "AI-Powered Solutions", content: "AI-powered robotics solutions are transforming industries, with Swiss startups leading the charge in innovation and development.",  category: "Education", path: "/articles/article10", publishedAt: "2024-12-10" },
		{ title: "New Robotics Regulations", content: "The Swiss government is set to introduce new regulations for robotics and AI technologies, aiming to ensure safety and ethical standards.",  category: "Robotics", path: "/articles/article11", publishedAt: "2024-12-09" },
		{ title: "Investment Surge", content: "Investment in Swiss robotics startups has surged by 25% in the last quarter, driven by increased interest from venture capital firms.",  category: "Fintech", path: "/articles/article12", publishedAt: "2024-12-08" },
		{ title: "AI in Healthcare", content: "AI-driven robotics solutions are revolutionizing the healthcare sector, with several Swiss startups making significant strides in this field.",  category: "AI", path: "/articles/article13", publishedAt: "2024-12-07" },
	
	]
};

const NewsSection = () => {
	const [loading, setLoading] = useState(true);
	const [selectedCat, setSelectedCat] = useState("All");

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <div className="w-full h-full"><NewsSectionSkeleton /></div>;
	}

	// Filter by category
	const filtered = newsData.articles.filter(article => {
		const cat = article.category?.trim() || "Other Industries";
		return selectedCat === "All" || cat === selectedCat;
	});

	const toShow = filtered.slice(0, 6);

	return (
		<div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-3xl space-y-6">
			{/* Header + Sort Dropdown */}
			<div className="flex items-center justify-between p-4 border-b-2 border-gray-200 dark:border-stone-800">
				<h2 className="text-lg font-bold text-gray-700 dark:text-white">
					{newsData.title}
				</h2>
				<div className="hidden lg:block">
					{/* Desktop Sorter */}
					<SortByCategory
						articles={newsData.articles}
						selected={selectedCat}
						onChange={setSelectedCat}
					/>
				</div>
				{/* Mobile Sorter */}
				<div className="lg:hidden">
					<SortMobile
						articles={newsData.articles}
						selected={selectedCat}
						onChange={setSelectedCat}
					/>
				</div>
			</div>

			<div className="px-4 pb-4 space-y-4">
				<p className="text-blue-500 dark:text-blue-300 text-sm font-semibold">
					{newsData.subtitle} {selectedCat}
				</p>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
					{toShow.map(article => (
						<div
							key={article.title}
							className="bg-neutral-100 dark:bg-stone-800 p-4 rounded-lg space-y-3"
						>
							<h3 className="text-base text-gray-700 dark:text-white font-semibold">
								{article.title}
							</h3>
							<p className="text-gray-600 dark:text-white text-sm">
								{article.content.length > 100
									? `${article.content.slice(0, 100)}...`
									: article.content}
							</p>
							<Link
								href={article.path}
								className="flex items-center space-x-2 text-blue-500 dark:text-blue-300 hover:underline text-sm font-semibold"
							>
								<span>Read the full story</span>
								<ArrowRightIcon className="h-4 w-4" />
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NewsSection;
