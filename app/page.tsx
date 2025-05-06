// app/page.tsx
import { fetchShows } from './lib/service';
import ShowCard from './components/ShowCard';
import SearchBar from './components/SearchBar';

export default async function Home() {
  const shows = await fetchShows();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Explorer les séries TV</h1>
      <SearchBar />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}
