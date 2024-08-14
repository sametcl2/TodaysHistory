export type GetOnThisDayAllTodayTypes = {
  selected: Selected[]
  births: Birth[]
  deaths: Death[]
  events: Event[]
  holidays: Holiday[]
}

type Selected = {
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

type Coordinates = {
  lat: number
  lon: number
}

type Birth = {
  text: string
  pages: Page[]
  year: number
}

type Holiday = {
  text: string
  pages: Page[]
}

type Death = {
  text: string
  pages: Page[]
  year: number
}
