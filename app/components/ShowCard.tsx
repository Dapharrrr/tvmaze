// app/components/ShowCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Show } from '../types';

type ShowCardProps = {
  show: Show;
};

export default function ShowCard({ show }: ShowCardProps) {
  const placeholderImage = 'https://via.placeholder.com/210x295?text=No+Image';
  
  return (
    <Link href={`/shows/${show.id}`} className="block">
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={show.image?.medium || placeholderImage}
            alt={show.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85} // 
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white font-bold truncate">{show.name}</h3>
          {show.rating?.average && (
            <div className="flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-sm ml-1">{show.rating.average}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
