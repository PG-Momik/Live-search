"use client";
import { useEffect, useState } from "react";
import { Person } from "../../types/person";
import InfiniteScrollList from "@/components/InfiniteScrollList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Person[]>([]);
  const [results, setResults] = useState<Person[]>([]);

  // Load dataset once
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json: Person[]) => {
        setData(json);
        setResults(json);
      });
  }, []);

  // Filter search
  useEffect(() => {
    if (!query) {
      setResults(data);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.language.toLowerCase().includes(lower) ||
        item.id.toLowerCase().includes(lower) ||
        item.bio.toLowerCase().includes(lower)
    );
    setResults(filtered);
  }, [query, data]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Live Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <InfiniteScrollList data={results} />
    </main>
  );
}