import Image from "next/image";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SideNav from "./SideNav";

const MobileNav = () => {
    return (
        <nav className="block lg:hidden w-full">
            {/* Navigation items go here */}
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <Image 
                    src="/assets/logo.svg" 
                    alt="VClense Logo" 
                    width={160} 
                    height={36} 
                />
                <Popover className="w-fit">
                    <PopoverButton className="flex items-center justify-center w-10 h-10 dark:bg-stone-800 hover:bg-gray-300 dark:hover:bg-stone-700 focus-outline-none transition">
                        <Bars2Icon className="h-8 w-8 text-gray-500 dark:text-white" />
                    </PopoverButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <PopoverPanel className="absolute z-10 left-0 top-0 w-3/4">
                            {/* Add your dropdown items here */}
                            <SideNav />
                        </PopoverPanel>
                    </Transition>
                </Popover>
            </div>
        </nav>
    );
}

export default MobileNav;