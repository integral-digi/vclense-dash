import SideNav from "@/app/components/SideNav";
import Main from "./components/Main";

const AssistantPage = () => {
	return (
		<div className="flex justify-between w-full min-h-screen top-0 left-0 bg-stone-50 dark:bg-stone-800">
			<div className="hidden lg:block lg:w-1/5 bg-white dark:bg-stone-800 fixed">
				<SideNav />
			</div>
			<div className="hidden lg:block lg:w-1/5 h-screen" />
			<div className="w-full lg:w-4/5 ">
				<div className="w-full">
					<Main />
				</div>
			</div>
		</div>
	)
}

export default AssistantPage;