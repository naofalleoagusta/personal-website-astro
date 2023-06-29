export type LinkType = {
  href: string
  text: string
  icon?: string
  classes?: string
  newTab?: boolean
  popoverAlignment?: string
}

export type ThemeOptionsType = {
  dark: string
  light: string
}

export type BlogPostType = {
  title: string
  description: string
  permalink: string
  ogImage: string
  altOgImage: string
  date: string
  readingTime: string
  slug: string
}

export type PaginationType = {
  start: number
  end: number
  size: number
  total: number
  currentPage: number
  lastPage: number
  url: {
    current: string
    next: string | undefined
    prev: string | undefined
  }
}
