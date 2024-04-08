type status = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';

type statistics = {
    rating: number;
    numberOfVotes: number;
};

export default interface AnimeObjects {
    id: string;
    title: string;
    description?: string;
    type: string | 'inconnu';
    status: status;
    year: number;
    statistics: statistics;
    createdAt: number;
    updatedAt: number;
    language: string;
    lastChapter?: string;
    coverId: string;
    coverFileName: string;
    cover: string;
    authorId: string;
    authorName: string;
}

export interface MangaObjects {
    
  id: string;
  title: string;
  description?: string;
  type: string | 'inconnu';
  status: status;
  year: number;
  statistics: statistics;
  createdAt: number;
  updatedAt: number;
  language: string;
  lastChapter?: string;
  coverId: string;
  coverFileName: string;
  cover: string;
  authorId: string;
  authorName: string;

}