// app/lib/tvmazeService.ts
import { Show, Person, Episode, Season, TVMazeImage, CastCredit } from '../types';

const API_URL = 'https://api.tvmaze.com';

export const fetchShows = async (page = 0): Promise<Show[]> => {
  const response = await fetch(`${API_URL}/shows?page=${page}`, { next: { revalidate: 3600 } });
  return response.json();
};

export const searchShows = async (query: string): Promise<{show: Show}[]> => {
  const response = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);
  return response.json();
};

export const fetchShow = async (id: string): Promise<Show> => {
  const response = await fetch(`${API_URL}/shows/${id}?embed[]=episodes&embed[]=cast`, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch show');
  }
  return response.json();
};

export const fetchSeasons = async (showId: string): Promise<Season[]> => {
  const response = await fetch(`${API_URL}/shows/${showId}/seasons`, { next: { revalidate: 3600 } });
  return response.json();
};

export const fetchSeason = async (seasonId: string): Promise<Season> => {
  const response = await fetch(`${API_URL}/seasons/${seasonId}?embed=episodes`, { next: { revalidate: 3600 } });
  return response.json();
};

export const fetchEpisode = async (episodeId: string): Promise<Episode> => {
  const response = await fetch(`${API_URL}/episodes/${episodeId}?embed=show`, { next: { revalidate: 3600 } });
  return response.json();
};

export const fetchPerson = async (personId: string): Promise<Person> => {
  const response = await fetch(`${API_URL}/people/${personId}?embed=castcredits`, { next: { revalidate: 3600 } });
  return response.json();
};

export const searchPeople = async (query: string): Promise<{person: Person}[]> => {
  const response = await fetch(`${API_URL}/search/people?q=${encodeURIComponent(query)}`);
  return response.json();
};

export const fetchShowImages = async (showId: string): Promise<TVMazeImage[]> => {
  const response = await fetch(`${API_URL}/shows/${showId}/images`, { next: { revalidate: 3600 } });
  return response.json();
};

export async function getPerson(id: string): Promise<Person> {
  console.log(`Fetching person with ID: ${id}`); // Débogage
  
  const response = await fetch(`https://api.tvmaze.com/people/${id}?embed=castcredits.show`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error(`API error: ${response.status} ${response.statusText}`); // Débogage
    throw new Error(`Failed to fetch person with id ${id}`);
  }
  
  return response.json();
}

export async function getPersonCastCredits(id: string): Promise<CastCredit[]> {
  console.log(`Fetching cast credits for person ID: ${id}`); // Débogage
  
  const response = await fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error(`API error: ${response.status} ${response.statusText}`); // Débogage
    throw new Error(`Failed to fetch cast credits for person with id ${id}`);
  }
  
  return response.json();
}


