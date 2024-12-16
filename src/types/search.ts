export interface SearchQuery {
  q: string;
  page?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  link: string;
  description: string;
  timestamp: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'suggestion';
}