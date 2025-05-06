"use client"

import React, { Fragment, useEffect, useRef, useState } from "react"
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"

const startups = [
    {
        id: "1",
        logo: "/assets/quadplan-logo.png",
        name: "Quadplan",
        position: [47.044618, 7.982865] as [number, number],
        website: "https://www.quadplan.co",
    },
    {
        id: "2",
        logo: "/assets/quadplan-logo.png",
        name: "Pampam",
        position: [43.038729, 8.035212] as [number, number],
        website: "https://www.pampam.city",
    },
    {
        id: "3",
        logo: "/assets/quadplan-logo.png",
        name: "VClense",
        position: [57.032650, 7.990495] as [number, number],
        website: "https://www.vclense.com",
    },
    {
        id: "4",
        logo: "/assets/quadplan-logo.png",
        name: "Swiss Robotics",
        position: [55.094359, 7.991967] as [number, number],
        website: "https://www.swissrobotics.com",
    },
    {
        id: "5",
        logo: "/assets/quadplan-logo.png",
        name: "Deeptech Ventures",
        position: [42.073871, 8.006082] as [number, number],
        website: "https://www.deeptechventures.com",
    },
    {
        id: "6",
        logo: "/assets/quadplan-logo.png",
        name: "Fintech Innovations",
        position: [45.065257, 7.994948] as [number, number],
        website: "https://www.fintechinnovations.com",
    },
    {
        id: "7",
        logo: "/assets/quadplan-logo.png",
        name: "Tech Solutions",
        position: [37.098126, 8.063560] as [number, number],
        website: "https://www.techsolutions.com",
    },
    {
        id: "8",
        logo: "/assets/quadplan-logo.png",
        name: "AI Startups",
        position: [68.100641, 8.034214] as [number, number],
        website: "https://www.aistartups.com",
    },
    {
        id: "9",
        logo: "/assets/quadplan-logo.png",
        name: "Blockchain Hub",
        position: [47.029077, 8.050497] as [number, number],
        website: "https://www.blockchainhub.com",
    },
    {
        id: "10",
        logo: "/assets/quadplan-logo.png",
        name: "HealthTech Innovations",
        position: [50.118940, 8.063436] as [number, number],
        website: "https://www.healthtechinnovations.com",
    },
]


const MapView: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false)
    const mapRef = useRef<L.Map | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const center: [number, number] = [47.073278, 8.023185]

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isMounted || mapRef.current || !containerRef.current) return

        mapRef.current = L.map(containerRef.current, {
            center,
            zoom: 6,
            scrollWheelZoom: true,
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current)

        startups.forEach((s) => {
            const customIcon = new L.Icon({
                iconUrl: s.logo,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            })

            L.marker(s.position, { icon: customIcon })
                .addTo(mapRef.current!)
                .bindPopup(
                    `<a href="${s.website}" target="_blank" rel="noreferrer"
                        class="font-semibold text-blue-500 dark:text-blue-100 hover:underline">
                        ${s.name}
                    </a>`
                )
        })

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [isMounted])

    if (!isMounted) {
        return (
            <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-stone-700 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">
                        Loading map...
                    </span>
                </div>
            </div>
        )
    }

    return (
        <Popover className="relative">
            <div
                ref={containerRef}
                className="relative w-full h-80 rounded-lg overflow-hidden"
            />

            <div className="absolute top-4 left-12 z-10 bg-white dark:bg-stone-800 p-2 rounded-full shadow">
                <h2 className="text-xs text-gray-700 dark:text-white font-medium">
                    INVESTOR MAP
                </h2>
            </div>

            <PopoverButton className="absolute bottom-4 right-4 z-10 bg-white dark:bg-stone-800 p-3 rounded-full shadow hover:bg-gray-100 transition">
                <ArrowsPointingOutIcon className="h-6 w-6 text-gray-700 dark:text-white" />
            </PopoverButton>

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
                    <div className="relative flex-1">
                        <PopoverButton className="absolute top-4 right-4 z-10 rounded-full bg-white dark:bg-stone-800 p-1 shadow hover:bg-gray-100 transition">
                            <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-white" />
                        </PopoverButton>
                        <iframe
                            src="https://www.pampam.city/p/aAdQgJSxgeBTTOLevFQs?47.073278,8.023185,7.72"
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                        />
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}

export default MapView