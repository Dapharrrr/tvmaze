// app/shows/[id]/ShowTabs.tsx
'use client';

import { useState } from 'react';
import { Show, Season } from '@/app/types';
import EpisodeCard from '@/app/components/EpisodeCard';
import PersonCard from '@/app/components/PersonCard';

interface ShowTabsProps {
  show: Show;
  seasons: Season[];
}


interface ShowTabsProps {
  show: Show;
  seasons: Season[];
}

export default function ShowTabs({ show, seasons }: ShowTabsProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'episodes' | 'cast'>('info');
  const [activeSeason, setActiveSeason] = useState<number>(1);
  
  const episodes = show._embedded?.episodes || [];
  const cast = show._embedded?.cast || [];
  
  const seasonEpisodes = episodes.filter(episode => episode.season === activeSeason);

  return (
    <div className="mt-6">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'info' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Infos
        </button>
        <button
          onClick={() => setActiveTab('episodes')}
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'episodes' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Épisodes
        </button>
        <button
          onClick={() => setActiveTab('cast')}
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'cast' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Distribution
        </button>
      </div>

      <div className="py-4">
        {activeTab === 'info' && (
          <div>
            {show.summary && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Résumé</h3>
                <div 
                  className="text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: show.summary }}
                />
              </div>
            )}
            <div className="space-y-2 mt-4">
              {show.status && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Statut:</span>
                  <span className="text-white">{show.status}</span>
                </div>
              )}
              {show.network && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Réseau:</span>
                  <span className="text-white">{show.network.name}</span>
                </div>
              )}
              {show.premiered && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Première:</span>
                  <span className="text-white">{new Date(show.premiered).toLocaleDateString()}</span>
                </div>
              )}
              {show.schedule && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Programmation:</span>
                  <span className="text-white">
                    {show.schedule.days.join(', ')} {show.schedule.time && `à ${show.schedule.time}`}
                  </span>
                </div>
              )}
              {show.runtime && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Durée:</span>
                  <span className="text-white">{show.runtime} min</span>
                </div>
              )}
              {show.language && (
                <div className="flex">
                  <span className="text-gray-400 w-1/3">Langue:</span>
                  <span className="text-white">{show.language}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'episodes' && (
          <div>
            <div className="mb-4 overflow-x-auto">
              <div className="flex space-x-2">
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => setActiveSeason(season.number)}
                    className={`px-3 py-2 text-sm rounded-full whitespace-nowrap ${
                      activeSeason === season.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Saison {season.number}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {seasonEpisodes.length > 0 ? (
                seasonEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">
                  Aucun épisode trouvé pour cette saison
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {cast.map((castMember) => (
              <PersonCard 
                key={castMember.person.id} 
                person={castMember.person} 
                character={castMember.character.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
