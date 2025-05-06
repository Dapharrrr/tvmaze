// app/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex items-center bg-gray-800 rounded-full overflow-hidden p-1">
        <input
          type="text"
          placeholder="Rechercher des séries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white pl-4 py-2 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 rounded-full p-2 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
