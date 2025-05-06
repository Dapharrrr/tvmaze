// app/episodes/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchEpisode } from '@/app/lib/service';

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const episode = await fetchEpisode(params.id);
    return {
      title: `${episode.name} | ${episode._embedded?.show.name} | TVMaze App`,
      description: episode.summary?.replace(/<[^>]*>/g, '').slice(0, 160) || '',
    };
  } catch (error) {
    console.log(error);
    
    return {
      title: 'Épisode | TVMaze App',
      description: 'Détails de l\'épisode',
    };
  }
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  try {
    const episode = await fetchEpisode(params.id);
    const show = episode._embedded?.show;
    const placeholderImage = 'https://via.placeholder.com/500x280?text=No+Image';

    return (
      <div className="pb-16">
        <Link href={`/shows/${show?.id}`} className="inline-flex items-center text-blue-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour à {show?.name}
        </Link>

        <div className="relative w-full h-56 bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={episode.image?.original || episode.image?.medium || placeholderImage}
            alt={episode.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <span className="bg-blue-600 text-white px-2 py-1 text-sm rounded-md">
              S{episode.season}:E{episode.number}
            </span>
            {episode.airdate && (
              <span className="text-gray-400 ml-2 text-sm">
                {new Date(episode.airdate).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
          
          <h1 className="text-2xl font-bold">{episode.name}</h1>
          <h2 className="text-xl text-gray-400 mt-1">{show?.name}</h2>

          {episode.summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Résumé</h3>
              <div
                className="text-gray-300"
                dangerouslySetInnerHTML={{ __html: episode.summary }}
              />
            </div>
          )}

          <div className="mt-6 space-y-2">
            {episode.runtime && (
              <div className="flex">
                <span className="text-gray-400 w-1/3">Durée:</span>
                <span className="text-white">{episode.runtime} min</span>
              </div>
            )}
            {episode.airtime && (
              <div className="flex">
                <span className="text-gray-400 w-1/3">Heure de diffusion:</span>
                <span className="text-white">{episode.airtime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);    
    notFound();
  }
}
