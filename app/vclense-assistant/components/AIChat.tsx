import { ArrowUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const aiItems = {
    title: "Hello",
    description: "What can I tell you about Swiss VC?",
    placeholder: "Give VClense a question to work on...",
    icon: ArrowUpIcon,
    quickLinks: [
        { label: "Fintech Startups in Zurich", action: "#" },
        { label: "Deeptech news 2025", action: "#" },
        { label: "Robotic Podcasts  ", action: "#" },
    ],
};

const AIChat = () => {
    return (
        <div className="flex flex-col w-full h-full space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-3xl font-bold text-gray-700 dark:text-white">
                    {aiItems.title}
                </h1>
            </div>
            <p className="text-xl md:text-3xl font-bold text-gray-500">
                {aiItems.description}
            </p>
            <div className="w-full relative">
                <textarea
                    rows={2}
                    placeholder={aiItems.placeholder}
                    className="w-full p-6 dark:text-white bg-white dark:bg-stone-800 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                ></textarea>
                <button className="absolute right-4 bottom-4 bg-neutral-200/50 text-white rounded-full p-2 hover:bg-blue-300">
                    <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-white" />
                </button>
            </div>
            <div className="flex items-center space-x-5 scrollbar-hide overflow-scroll">
                {aiItems.quickLinks.map((link) => (
                    <Link 
                        key={link.label} 
                        href={link.action} 
                        className="text-gray-500 dark:text-whiteno-underline"
                    >
                        <div className="hover:bg-blue-100 dark:hover:bg-zinc-800 px-2 py-1 flex items-center space-x-8 bg-neutral-200/50  dark:bg-stone-900 rounded-full">
                            <p className="text-gray-700 dark:text-white font-bold text-sm text-nowrap">
                                {link.label}
                            </p>
                            <aiItems.icon className="w-4 h-4 text-gray-700 dark:text-white" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AIChat;