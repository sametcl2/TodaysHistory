export type GetFeaturedEventsTodayType = {
  news: News[]
  onthisday: Onthisday[]
}

type News = {
  links: Link[]
  story: string
}

type Link = {
  type: string
  title: string
  displaytitle: string
  namespace: Namespace
  wikibase_item: string
  titles: Titles
  pageid: number
  thumbnail?: Thumbnail
  originalimage?: Originalimage
  lang: string
  dir: string
  revision: string
  tid: string
  timestamp: string
  description: string
  description_source: string
  coordinates?: Coordinates
  content_urls: ContentUrls
  extract: string
  extract_html: string
  normalizedtitle: string
}

type Namespace = {
  id: number
  text: string
}

type Titles = {
  canonical: string
  normalized: string
  display: string
}

type Thumbnail = {
  source: string
  width: number
  height: number
}

type Originalimage = {
  source: string
  width: number
  height: number
}

type Coordinates = {
  lat: number
  lon: number
}

type ContentUrls = {
  desktop: UrlType
  mobile: UrlType
}

type UrlType = {
  page: string
  revisions: string
  edit: string
  talk: string
}

type Onthisday = {
  text: string
  pages: Page[]
  year: number
}

type Page = {
  type: string
  title: string
  displaytitle: string
  namespace: Namespace
  wikibase_item: string
  titles: Titles
  pageid: number
  thumbnail?: Thumbnail
  originalimage?: Originalimage
  lang: string
  dir: string
  revision: string
  tid: string
  timestamp: string
  description?: string
  description_source?: string
  content_urls: ContentUrls
  extract: string
  extract_html: string
  normalizedtitle: string
  coordinates?: Coordinates
}
