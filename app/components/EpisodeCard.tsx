// app/components/EpisodeCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Episode } from '../types';

type EpisodeCardProps = {
  episode: Episode;
  showName?: string;
};

export default function EpisodeCard({ episode, showName }: EpisodeCardProps) {
  const placeholderImage = 'https://via.placeholder.com/250x140?text=No+Image';
  const formattedDate = episode.airdate 
    ? new Date(episode.airdate).toLocaleDateString('fr-FR')
    : 'Date inconnue';

  return (
    <Link href={`/episodes/${episode.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md mb-3">
        <div className="relative w-full h-32">
          <Image
            src={episode.image?.medium || placeholderImage}
            alt={episode.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-0 left-0 bg-blue-600 px-2 py-1">
            <span className="text-white text-sm font-bold">S{episode.season}:E{episode.number}</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-medium truncate">{episode.name}</h3>
          {showName && (
            <p className="text-gray-400 text-sm">{showName}</p>
          )}
          <p className="text-gray-400 text-sm mt-1">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
