import type { Metadata } from 'next'

// Base metadata parameters interface
export interface BaseMetadataParams {
  title: string
  description: string
  path?: string
  keywords?: string[]
  robots?: string
  image?: string
}

// Page metadata parameters interface
export interface PageMetadataParams extends BaseMetadataParams {
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

// Article metadata parameters interface
export interface ArticleMetadataParams extends BaseMetadataParams {
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
}

// Shared metadata configuration interface
export interface SharedMetadataConfig {
  siteName: string
  siteUrl: string
  defaultImage: string
  twitterHandle: string
}

// OpenGraph image interface
export interface OpenGraphImageConfig {
  images: Array<{
    url: string
    width: number
    height: number
    alt: string
    type: string
  }>
}

// Structured data base interface
export interface StructuredDataBase {
  "@context": string
  "@type": string
  [key: string]: any
}