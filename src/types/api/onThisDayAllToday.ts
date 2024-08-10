export interface OnThisDayAllTodayTypes {
  selected: Selected[];
  births: Birth[];
  deaths: Death[];
  events: Event[];
  holidays: Holiday[];
}

export interface Selected {
  text: string;
  pages: Page[];
  year: number;
}

export interface Page {
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
  description?: string;
  description_source?: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates;
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

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Birth {
  text: string;
  pages: Page2[];
  year: number;
}

export interface Page2 {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace2;
  wikibase_item: string;
  titles: Titles2;
  pageid: number;
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
  thumbnail?: Thumbnail2;
  originalimage?: Originalimage2;
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

export interface Coordinates2 {
  lat: number;
  lon: number;
}

export interface Death {
  text: string;
  pages: Page3[];
  year: number;
}

export interface Page3 {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace3;
  wikibase_item: string;
  titles: Titles3;
  pageid: number;
  thumbnail?: Thumbnail3;
  originalimage?: Originalimage3;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls3;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates3;
}

export interface Namespace3 {
  id: number;
  text: string;
}

export interface Titles3 {
  canonical: string;
  normalized: string;
  display: string;
}

export interface Thumbnail3 {
  source: string;
  width: number;
  height: number;
}

export interface Originalimage3 {
  source: string;
  width: number;
  height: number;
}

export interface ContentUrls3 {
  desktop: Desktop3;
  mobile: Mobile3;
}

export interface Desktop3 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Mobile3 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Coordinates3 {
  lat: number;
  lon: number;
}

export interface Event {
  text: string;
  pages: Page4[];
  year: number;
}

export interface Page4 {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace4;
  wikibase_item: string;
  titles: Titles4;
  pageid: number;
  thumbnail?: Thumbnail4;
  originalimage?: Originalimage4;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls4;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates4;
}

export interface Namespace4 {
  id: number;
  text: string;
}

export interface Titles4 {
  canonical: string;
  normalized: string;
  display: string;
}

export interface Thumbnail4 {
  source: string;
  width: number;
  height: number;
}

export interface Originalimage4 {
  source: string;
  width: number;
  height: number;
}

export interface ContentUrls4 {
  desktop: Desktop4;
  mobile: Mobile4;
}

export interface Desktop4 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Mobile4 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Coordinates4 {
  lat: number;
  lon: number;
}

export interface Holiday {
  text: string;
  pages: Page5[];
}

export interface Page5 {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace5;
  wikibase_item: string;
  titles: Titles5;
  pageid: number;
  thumbnail?: Thumbnail5;
  originalimage?: Originalimage5;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls5;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates5;
}

export interface Namespace5 {
  id: number;
  text: string;
}

export interface Titles5 {
  canonical: string;
  normalized: string;
  display: string;
}

export interface Thumbnail5 {
  source: string;
  width: number;
  height: number;
}

export interface Originalimage5 {
  source: string;
  width: number;
  height: number;
}

export interface ContentUrls5 {
  desktop: Desktop5;
  mobile: Mobile5;
}

export interface Desktop5 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Mobile5 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Coordinates5 {
  lat: number;
  lon: number;
}
