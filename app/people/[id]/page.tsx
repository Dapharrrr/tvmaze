import { fetchPersonCastCredits, fetchPersonDetails } from '../../lib/service';
import { CastCredit, Person } from '../../types';
import ShowCard from '../../components/ShowCard';
import Image from 'next/image';

interface ActorPageProps {
  params: Promise<{ id: string }>;
}

const ActorPage = async ({ params }: ActorPageProps) => {
  const { id } = await params;
  const personId = Number(id);
  let person: Person;
  let castCredits: CastCredit[];

  try {
    person = await fetchPersonDetails(personId);
    castCredits = await fetchPersonCastCredits(personId);
  } catch (error) {
    console.log(error);
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Erreur</h1>
          <p className="text-gray-300">Impossible de charger les données de l&apos;acteur.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Utilisez une image par défaut si aucune image n'est disponible
  const actorImage = person.image?.original || person.image?.medium || 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section with actor info */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-12">
          <div className="md:flex">
            {/* Actor image */}
            <div className="md:w-1/3 relative">
              <div className="aspect-[2/3] relative">
                <Image 
                  src={actorImage}
                  alt={person.name} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            
            {/* Actor information */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{person.name}</h1>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center">
                  <span className="w-32 font-medium text-gray-400">Né(e) le :</span>
                  <span>{person.birthday ? new Date(person.birthday).toLocaleDateString('fr-FR') : 'Inconnu'}</span>
                </div>
                
                {person.deathday && (
                  <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-400">Décédé(e) le :</span>
                    <span>{new Date(person.deathday).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <span className="w-32 font-medium text-gray-400">Genre :</span>
                  <span>{person.gender || 'Inconnu'}</span>
                </div>
                
                {person.country && (
                  <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-400">Pays :</span>
                    <span>{person.country.name}</span>
                  </div>
                )}
              </div>

              {person.summary && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Biographie</h3>
                  <div 
                    className="text-gray-300 prose prose-sm prose-invert"
                    dangerouslySetInnerHTML={{ __html: person.summary }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filmography section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Filmographie</h2>
            <span className="px-4 py-1 bg-indigo-600 text-white text-sm rounded-full">
              {castCredits.length} titre{castCredits.length > 1 ? 's' : ''}
            </span>
          </div>

          {castCredits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {castCredits.map((credit) => (
                <ShowCard
                  key={credit._embedded.show.id}
                  show={credit._embedded.show}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400">Aucune série trouvée pour cet acteur.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ActorPage;
