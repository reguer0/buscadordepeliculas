export type SearchType = 'popular' | 'top_rated' | 'upcoming' | 'search';

export interface FilmType {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

export interface ActiveFiltersProps {
    filmName: string;
    searchType: SearchType;
    filmInfo: FilmType[];
    selectedYear: string;
}

export interface SearchBarProps {
    onSearch: (newFilm: string) => void;
    filterByVotes: (ascending: boolean) => void;
    onFilterChange: (type: SearchType) => void;
    onYearChange: (year: string) => void;
    selectedYear: string;
}

export interface Provider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
}

export interface CountryProviders {
    link?: string;
    flatrate?: Provider[];
    rent?: Provider[];
    buy?: Provider[];
}

export interface WatchProviders {
    [country: string]: CountryProviders;
}

export interface ProviderData {
    results: WatchProviders;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface TrailerData {
    results: Video[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    name: string;
    logo_path: string | null;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    runtime: number | null;
    genres: Genre[];
    status: string;
    tagline: string | null;
    credits: Credits;
    production_companies: ProductionCompany[];
}

export interface FilterButton {
    type: SearchType;
    label: string;
    icon: string;
}

export const FILTER_BUTTONS: FilterButton[] = [
    { type: 'popular', label: 'Populares', icon: '🔥' },
    { type: 'top_rated', label: 'Mejor valoradas', icon: '⭐' },
    { type: 'upcoming', label: 'Próximos estrenos', icon: '🎬' }
];

export interface UseFilmsReturn {
    films: FilmType[];
    isLoading: boolean;
    error: string | null;
}

export interface UseProvidersReturn {
    providerInfo: ProviderData | null;
    isLoading: boolean;
    error: string | null;
}

export interface UseTrailerReturn {
    trailerInfo: TrailerData | null;
    isLoading: boolean;
    error: string | null;
}

export interface UseDetailsReturn {
    data: MovieDetails | null;
    isLoading: boolean;
    error: string | null;
}

export interface ErrorCardProps {
    error: string;
}
