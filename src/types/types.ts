export interface FilmType{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

export interface activeFiltersProps {
  filmName: string;
  searchType: string;
  filmInfo: FilmType[];
}


export interface searchFilmProps {
  onSearch: (newFilm: string) => void;

}
export interface filterByVotesProps {
  filterByVotes: (ascending: boolean) => void;
}
 
  export interface SearchType {
    onFilterChange:(type:string) => void; 
  }
