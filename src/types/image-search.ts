export interface ImageSearchResult {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    source: string;
    dimensions: {
        width: number;
        height: number;
    };
}
  
export interface ImageUploadResponse {
    success: boolean;
    imageUrl: string;
    error?: string;
}