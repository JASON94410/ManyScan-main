type status = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';

type statistics = {
    rating: number;
    numberOfVotes: number;
};

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
    chapters?: Chapters[];
}

export interface Chapters {
    id: string;
    title: string;
    chapterNumber: string;
    language: string;
}

export interface Relationship {
    type: string;
    attributes?: {
        name?: string;
        fileName?: string;
    };
}
