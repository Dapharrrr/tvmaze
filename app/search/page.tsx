// app/search/page.tsx
import SearchBar from '@/app/components/SearchBar';
import ShowCard from '@/app/components/ShowCard';
import PersonCard from '@/app/components/PersonCard';
import { searchShows, searchPeople } from '@/app/lib/service';
import { Show, Person } from '../types';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q: string };
}) {
  const query = searchParams?.q || '';
  
  let shows: { show: Show }[] = [];
  let people: { person: Person }[] = [];
  
  if (query) {
    shows = await searchShows(query);
    people = await searchPeople(query);
  }
  
  return (
    <div className="pb-16">
      <h1 className="text-2xl font-bold mb-6">Rechercher</h1>
      <SearchBar />
      
      {query && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-3">
          Résultats pour &quot;{query}&quot;
          </h2>
          
          {shows.length === 0 && people.length === 0 ? (
            <p className="text-gray-400">Aucun résultat trouvé</p>
          ) : (
            <>
              {shows.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">
                    Séries ({shows.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {shows.map(({ show }) => (
                      <ShowCard key={show.id} show={show} />
                    ))}
                  </div>
                </div>
              )}
              
              {people.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">
                    Personnes ({people.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {people.map(({ person }) => (
                      <PersonCard key={person.id} person={person} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
