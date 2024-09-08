import {
  ContentUrlsType,
  CoordinatesType,
  NamespaceType,
  OriginalimageType,
  PageType,
  ThumbnailType,
  TitlesType
} from './events'

export type GetFeaturedEventsTodayType = {
  news: NewsType[]
  onthisday: OnThisDayType[]
}

type NewsType = {
  links: LinkType[]
  story: string
}

type LinkType = {
  type: string
  title: string
  displaytitle: string
  namespace: NamespaceType
  wikibase_item: string
  titles: TitlesType
  pageid: number
  thumbnail?: ThumbnailType
  originalimage?: OriginalimageType
  lang: string
  dir: string
  revision: string
  tid: string
  timestamp: string
  description: string
  description_source: string
  coordinates?: CoordinatesType
  content_urls: ContentUrlsType
  extract: string
  extract_html: string
  normalizedtitle: string
}

type OnThisDayType = {
  text: string
  pages: PageType[]
  year: number
}
