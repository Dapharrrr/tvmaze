// app/types/index.ts

interface WebChannel {
  id: number;
  name: string;
  country?: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite?: string;
}

export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  };
  webChannel: null | WebChannel;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _embedded?: {
    episodes?: Episode[];
    cast?: Cast[];
  };
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
  _embedded?: {
    show: Show;
  };
}

export interface Season {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  };
  webChannel: null;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  _embedded?: {
    episodes: Episode[];
  };
}

export interface Person {
  id: number;
  url: string;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
  birthday?: string;
  deathday?: string;
  gender?: string;
  country?: {
    name: string;
    code: string;
    timezone: string;
  };
  summary?: string; // Ajout de la propriété summary manquante
  _embedded?: {
    castcredits: CastCredit[];
  };
  // autres propriétés...
}

export interface CastCredit {
  id: number;
  type: string;
  character?: {
    id: number;
    name: string;
    url?: string;
    image?: {
      medium?: string;
      original?: string;
    };
  };
  _embedded: {
    show: Show;
  };
  _links?: {
    show?: { href: string };
    character?: { href: string };
  };
}

export interface Cast {
  person: Person;
  character: {
    id: number;
    url: string;
    name: string;
    image: {
      medium: string;
      original: string;
    };
  };
  self: boolean;
  voice: boolean;
}



export interface TVMazeImage {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
  };
}
