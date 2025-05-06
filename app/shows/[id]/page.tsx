// app/shows/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchShow, fetchSeasons } from '@/app/lib/service';
import ShowTabs from './ShowTabs';

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const show = await fetchShow(params.id);
    return {
      title: `${show.name} | TVMaze App`,
      description: show.summary?.replace(/<[^>]*>/g, '').slice(0, 160) || '',
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Série | TVMaze App',
      description: 'Détails de la série',
    };
  }
}

export default async function ShowPage({ params }: { params: { id: string } }) {
  try {
    const show = await fetchShow(params.id);
    const seasons = await fetchSeasons(params.id);
    const placeholderImage = 'https://via.placeholder.com/500x700?text=No+Image';
    
    return (
      <div className="pb-20">
        <div className="relative w-full h-60 bg-gray-800">
          {show.image && (
            <Image
              src={show.image.original || show.image.medium}
              alt={show.name}
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          )}
          
          <div className="absolute bottom-0 transform translate-y-1/3 left-4 z-10">
            <div className="relative w-32 h-48 rounded-lg overflow-hidden shadow-xl border-2 border-white">
              <Image
                src={show.image?.medium || placeholderImage}
                alt={show.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20 px-4">
          <h1 className="text-2xl font-bold">{show.name}</h1>
          
          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {show.genres.map(genre => (
                <span key={genre} className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          {show.rating?.average && (
            <div className="flex items-center mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white ml-1">{show.rating.average} / 10</span>
            </div>
          )}
          
          <ShowTabs show={show} seasons={seasons} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
