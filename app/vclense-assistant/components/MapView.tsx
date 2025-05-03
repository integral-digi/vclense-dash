"use client"
import { Fragment, useEffect, useState, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import L, { map } from "leaflet";
import 'leaflet/dist/leaflet.css';

const startups = [
    { id: "1", name: "Quadplan", position: [47.073278, 8.023185] as [number, number], website: "https://www.quadplan.co" },
    { id: "2", name: "Pampam", position: [47.073278, 8.023185] as [number, number], website: "https://www.pampam.city" },
    { id: "3", name: "VClense", position: [47.073278, 8.023185] as [number, number], website: "https://www.vclense.com" },
    { id: "4", name: "Swiss Robotics", position: [47.073278, 8.023185] as [number, number], website: "https://www.swissrobotics.com" },
    { id: "5", name: "Deeptech Ventures", position: [47.073278, 8.023185] as [number, number], website: "https://www.deeptechventures.com" },
    { id: "6", name: "Fintech Innovations", position: [47.073278, 8.023185] as [number, number], website: "https://www.fintechinnovations.com" },
    { id: "7", name: "Tech Solutions", position: [47.073278, 8.023185] as [number, number], website: "https://www.techsolutions.com" },
    { id: "8", name: "AI Startups", position: [47.073278, 8.023185] as [number, number], website: "https://www.aistartups.com" },
    { id: "9", name: "Blockchain Hub", position: [47.073278, 8.023185] as [number, number], website: "https://www.blockchainhub.com" },
    { id: "10", name: "HealthTech Innovations", position: [47.073278, 8.023185] as [number, number], website: "https://www.healthtechinnovations.com" },
    { id: "11", name: "GreenTech Solutions", position: [47.073278, 8.023185] as [number, number], website: "https://www.greentechsolutions.com" },
];

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapView = () => {
    const [isMounted, setIsMounted] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const center: [number, number] = [47.073278, 8.023185];

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isMounted && !mapRef.current && mapContainerRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: center,
                zoom: 6,
                scrollWheelZoom: true,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);

            startups.forEach((s) => {
                L.marker(s.position, { icon: markerIcon })
                    .addTo(mapRef.current!)
                    .bindPopup(
                        `<Link 
							href="${s.website}" 
							target="_blank" 
							rel="noreferrer" 
							class="font-semibold text-blue-500 dark:text-blue-100 hover:underline"
						>
							${s.name}
						</Link>`
                    );
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="relative w-full h-86 rounded-lg overflow-hidden bg-gray-200 dark:bg-stone-700 animate-pulse">
                {/* Skeleton pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500">Loading map...</div>
                </div>
            </div>
        );
    }

    return (
        <Popover className="relative">
            <div className="z-0 relative w-full h-86 rounded-lg overflow-hidden" ref={mapContainerRef}>
                {/* Map will be rendered here by Leaflet directly */}
            </div>

			{/* Map title */}
			<div className="absolute top-4 left-12 z-40 bg-white dark:bg-stone-800 p-2 rounded-full shadow-md">
				<h2 className="text-xs text-gray-700 dark:text-white font-medium">
					INVESTOR MAP
				</h2>
			</div>

			{/* Map title */}

            {/* Expand button */}
            <PopoverButton className="z-40 absolute bottom-4 right-4 bg-white dark:bg-stone-800 p-3 rounded-full shadow hover:bg-gray-100 transition">
                <ArrowsPointingOutIcon className="h-6 w-6 text-gray-700 dark:text-white" />
            </PopoverButton>

            {/* Right-side panel */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
            >
                <PopoverPanel className="fixed inset-y-0 right-0 w-full lg:w-4/5 p-4 bg-white dark:bg-stone-800 shadow-3xl z-50 flex flex-col">
                    {/* Embedded detailed map */}
                    <div className="flex-1 relative">
                        {/* Close button */}
                        <div className="absolute top-4 right-4 z-10">
                            <PopoverButton className="rounded-full bg-white dark:bg-stone-800 p-1 shadow hover:bg-gray-100 transition">
                                <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-white" />
                            </PopoverButton>
                        </div>
                        <iframe
                            src="https://www.pampam.city/p/aAdQgJSxgeBTTOLevFQs?47.073278,8.023185,7.72"
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};

export default MapView;