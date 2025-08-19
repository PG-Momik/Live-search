"use client";
import { useEffect, useState } from "react";
import PersonCard from "./PersonCard";
import { Person } from "../../types/person";

type Props = {
    data: Person[];
};

export default function InfiniteScrollList({ data }: Props) {
    const [visibleCount, setVisibleCount] = useState(10);

    // Load more items when reaching bottom
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 100
            ) {
                setVisibleCount((prev) => Math.min(prev + 10, data.length));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [data.length]);

    return (
        <div className="flex flex-col gap-4">
            {
                data.slice(0, visibleCount).map((person, index) => (<PersonCard key={`${person.id}-${index}`} {...person} />))
            }

            {
                visibleCount < data.length && (<p className="text-center text-sm text-gray-500">Loading more...</p>)
            }
        </div>
    );
}
