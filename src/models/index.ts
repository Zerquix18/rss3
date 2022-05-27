import RSS3 from "rss3";

export * from './rss';
import { RSS3Item } from './rss';

export interface Profile {
  name: string | undefined;
  address: string;
  avatar: string;
  bio: string;
  url: string;
}

export interface ICurrentUser {
  rss3: RSS3;
  profile: Profile | null;
}

export interface APIResponse {
  success: boolean;
  response: string;
}

export type LocalRSS3Item = RSS3Item & { profile: Profile };
