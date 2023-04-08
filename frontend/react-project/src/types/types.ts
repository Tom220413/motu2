export type SearchResult = {
    totalHits: number;
    hits: SearchHit[];
}

export type SearchHit = {
    id: number;
    title: string;
    description: string;
    url: string;
    image_url: string;
};