export interface GetFeaturedEventsTodayType {
  news: News[];
  onthisday: Onthisday[];
}

export interface News {
  links: Link[];
  story: string;
}

export interface Link {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  thumbnail?: Thumbnail;
  originalimage?: Originalimage;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  coordinates?: Coordinates;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

export interface Namespace {
  id: number;
  text: string;
}

export interface Titles {
  canonical: string;
  normalized: string;
  display: string;
}

export interface Thumbnail {
  source: string;
  width: number;
  height: number;
}

export interface Originalimage {
  source: string;
  width: number;
  height: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ContentUrls {
  desktop: Desktop;
  mobile: Mobile;
}

export interface Desktop {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Mobile {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Onthisday {
  text: string;
  pages: Page[];
  year: number;
}

export interface Page {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace2;
  wikibase_item: string;
  titles: Titles2;
  pageid: number;
  thumbnail?: Thumbnail2;
  originalimage?: Originalimage2;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls2;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates2;
}

export interface Namespace2 {
  id: number;
  text: string;
}

export interface Titles2 {
  canonical: string;
  normalized: string;
  display: string;
}

export interface Thumbnail2 {
  source: string;
  width: number;
  height: number;
}

export interface Originalimage2 {
  source: string;
  width: number;
  height: number;
}

export interface ContentUrls2 {
  desktop: Desktop2;
  mobile: Mobile2;
}

export interface Desktop2 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Mobile2 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Coordinates2 {
  lat: number;
  lon: number;
}
