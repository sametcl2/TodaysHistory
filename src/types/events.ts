export type NamespaceType = {
  id: number
  text: string
}

export type TitlesType = {
  canonical: string
  normalized: string
  display: string
}

export type ThumbnailType = {
  source: string
  width: number
  height: number
}

export type OriginalimageType = {
  source: string
  width: number
  height: number
}

export type ContentUrlsType = {
  desktop: UrlType
  mobile: UrlType
}

export type UrlType = {
  page: string
  revisions: string
  edit: string
  talk: string
}

export type CoordinatesType = {
  lat: number
  lon: number
}

export type PageType = {
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
  description?: string
  description_source?: string
  content_urls: ContentUrlsType
  extract: string
  extract_html: string
  normalizedtitle: string
  coordinates?: CoordinatesType
}
