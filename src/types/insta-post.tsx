export interface InstagramPost {
    id: string;
    caption: string;
    media_type: 'IMAGE' | 'VIDEO';
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    formatted_date: string;
  }
  
  export interface InstagramApiResponse {
    posts: InstagramPost[];
    count: number;
  }
  
  export interface InstagramStats {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
    accountType: string;
    posts: string;
    followers: string;
    following: string;
  }
  