"use client"
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const startups = [
    { id: "1", logo: "/assets/quadplan-logo.png", name: "Quadplan", position: [47.073278, 8.023185] as [number, number], website: "https://www.quadplan.co" },
    { id: "2", logo: "/assets/pampam-logo.png", name: "Pampam", position: [47.073278, 8.023185] as [number, number], website: "https://www.pampam.city" },
    { id: "3", logo: "/assets/vclense-logo.png", name: "VClense", position: [47.073278, 8.023185] as [number, number], website: "https://www.vclense.com" },
    { id: "4", logo: "/assets/swissrobotics-logo.png",  name: "Swiss Robotics", position: [47.073278, 8.023185] as [number, number], website: "https://www.swissrobotics.com" },
    { id: "5", logo: "/assets/deeptechventures-logo.png",  name: "Deeptech Ventures", position: [47.073278, 8.023185] as [number, number], website: "https://www.deeptechventures.com" },
    { id: "6", logo: "/assets/fintechinnovations-logo.png",  name: "Fintech Innovations", position: [47.073278, 8.023185] as [number, number], website: "https://www.fintechinnovations.com" },
    { id: "7", logo: "/assets/techsolutions-logo.png",  name: "Tech Solutions", position: [47.073278, 8.023185] as [number, number], website: "https://www.techsolutions.com" },
    { id: "8", logo: "/assets/aistartups-logo.png",  name: "AI Startups", position: [47.073278, 8.023185] as [number, number], website: "https://www.aistartups.com" },
    { id: "9", logo: "/assets/blockchainhub-logo.png",  name: "Blockchain Hub", position: [47.073278, 8.023185] as [number, number], website: "https://www.blockchainhub.com" },
    { id: "10", logo: "/assets/healthtechinnovations-logo.png",  name: "HealthTech Innovations", position: [47.073278, 8.023185] as [number, number], website: "https://www.healthtechinnovations.com" },
    { id: "11", logo: "/assets/greentechsolutions-logo.png",  name: "GreenTech Solutions", position: [47.073278, 8.023185] as [number, number], website: "https://www.greentechsolutions.com" },
];

const MapView: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const center: [number, number] = [47.073278, 8.023185];

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        if (mapRef.current || !mapContainerRef.current) return;

        mapRef.current = L.map(mapContainerRef.current, {
            center,
            zoom: 6,
            scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        startups.forEach((s) => {
            const icon = new L.Icon({
                iconUrl: s.logo,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            L.marker(s.position, { icon })
                .addTo(mapRef.current!)
                .bindPopup(
                    `<a href="${s.website}" target="_blank" rel="noreferrer"
                        class="font-semibold text-blue-500 dark:text-blue-100 hover:underline">
                        ${s.name}
                    </a>`
                );
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-stone-700 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">Loading map...</span>
                </div>
            </div>
        );
    }

    return (
        <Popover className="relative">
            <div
                ref={mapContainerRef}
                className="relative w-full h-80 rounded-lg overflow-hidden"
            />

            <div className="absolute top-4 left-12 z-10 bg-white dark:bg-stone-800 p-2 rounded-full shadow">
                <h2 className="text-xs text-gray-700 dark:text-white font-medium">
                    INVESTOR MAP
                </h2>
            </div>

            <Popover.Button className="absolute bottom-4 right-4 z-10 bg-white dark:bg-stone-800 p-3 rounded-full shadow hover:bg-gray-100 transition">
                <ArrowsPointingOutIcon className="h-6 w-6 text-gray-700 dark:text-white" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
            >
                <Popover.Panel className="fixed inset-y-0 right-0 w-full lg:w-4/5 p-4 bg-white dark:bg-stone-800 shadow-3xl z-50 flex flex-col">
                    <div className="relative flex-1">
                        <div className="absolute top-4 right-4 z-10">
                            <Popover.Button className="rounded-full bg-white dark:bg-stone-800 p-1 shadow hover:bg-gray-100 transition">
                                <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-white" />
                            </Popover.Button>
                        </div>
                        <iframe
                            src="https://www.pampam.city/p/aAdQgJSxgeBTTOLevFQs?47.073278,8.023185,7.72"
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                        />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default MapView;
