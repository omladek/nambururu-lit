// To parse this data:
//
//   import { Convert, Posts } from "./file";
//
//   const posts = Convert.toPosts(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ThreadResult {
  kind: string
  data: ThreadsData
}

export interface ThreadsData {
  modhash: string
  dist: number
  children: Thread[]
  after: string
  before: null
}

export interface Thread {
  kind: string
  data: ChildData
}

export type NormalizedPost = {
  createdDate: string
  domain: string
  id: string
  commentsTotalFormatted: string | number
  hasComments: boolean
  permalink: string
  description: string
  subreddit: string
  title: string
  upVotes: string | number
  downVotes: string | number
  media: NormalizedPostMedia
  externalLink: string | null
}

export interface NormalizedVideo {
  type: 'normalizedVideo'
  hasAudio: boolean
  height: number
  poster: string
  url: string
  width: number
}

export interface NormalizedSingleImage {
  type: 'singleImage'
  width: number
  height: number
  fullSize: string | null
  retina: string
  thumbnail: string
}

export interface NormalizedGalleryImage {
  thumbnail: string
  fullSize: string
  height: number
  width: number
  retina: string
}

export interface NormalizedGallery {
  type: 'gallery'
  items: NormalizedGalleryImage[]
}

export interface NormalizedYoutube {
  type: 'youtube'
  width: number
  height: number
  id: string
  thumbnail: string
}

export interface NormalizedExternalLink {
  type: 'externalLink'
  url: string
  image: string
}

export interface NormalizedThumbnail {
  type: 'thumbnail'
  height: number
  width: number
  url: string
}

export interface NormalizedPreviewImage {
  type: 'previewImage'
  height: number
  width: number
  url: string
}

export type NormalizedPostMedia =
  | NormalizedVideo
  | NormalizedSingleImage
  | NormalizedGallery
  | NormalizedYoutube
  | NormalizedExternalLink
  | NormalizedThumbnail
  | NormalizedPreviewImage
  | null

export interface ChildData {
  approved_at_utc: null
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title: null
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: unknown[]
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: number
  link_flair_css_class: null | string
  downs: number
  thumbnail_height: number | null
  hide_score: boolean
  name: string
  quarantine: boolean
  link_flair_text_color: string
  author_flair_background_color: null | string
  subreddit_type: string
  ups: number
  total_awards_received: number
  media_embed: MediaEmbed
  thumbnail_width: number | null
  author_flair_template_id: null | string
  is_original_content: boolean
  user_reports: unknown[]
  secure_media: Media | null
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: null
  secure_media_embed: MediaEmbed
  link_flair_text: null | string
  can_mod_post: boolean
  score: number
  approved_by: null
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class: null | string
  steward_reports: unknown[]
  author_flair_richtext: unknown[]
  gildings: Gildings
  content_categories: null
  is_self: boolean
  mod_note: null
  created: number
  link_flair_type: string
  wls: number
  removed_by_category: null
  banned_by: null
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html: null | string
  likes: null
  suggested_sort: null
  banned_at_utc: null
  view_count: null
  archived: boolean
  no_follow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  all_awardings: unknown[]
  awarders: unknown[]
  media_only: boolean
  link_flair_template_id?: string
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: null | string
  visited: boolean
  removed_by: null
  num_reports: null
  distinguished: null
  subreddit_id: string
  mod_reason_by: null
  removal_reason: null
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons: null
  author: string
  discussion_type: null
  num_comments: number
  send_replies: boolean
  whitelist_status: string
  contest_mode: boolean
  mod_reports: unknown[]
  author_patreon_flair: boolean
  author_flair_text_color: null | string
  permalink: string
  parent_whitelist_status: string
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: Media | null
  is_video: boolean
  media_metadata: RedditMediaMetadata | null
  post_hint?: string
  preview?: Preview
  is_gallery?: boolean
  url_overridden_by_dest: string
  upvote_ratio: number
  crosspost_parent: string | null
  crosspost_parent_list: ChildData[]
}

export interface RedditHostedImage {
  u: string
  x: number
  y: number
}

export type RedditMediaMetadata = Record<
  string,
  | {
      status: 'invalid'
    }
  | {
      status: 'valid'
      e: string
      m: string
      p: RedditHostedImage[]
      s: RedditHostedImage
    }
>

export type Gildings = unknown

export interface RedditVideo {
  fallback_url: string
  width: number
  height: number
  has_audio: boolean
}

export interface Media {
  type: 'reddit.com' | 'youtube.com'
  reddit_video: RedditVideo
  oembed: Oembed
}

export interface Oembed {
  provider_url: string
  version: string
  title: string
  type: string
  thumbnail_width: number
  height: number
  width: number
  html: string
  author_name: string
  provider_name: string
  thumbnail_url: string
  thumbnail_height: number
  author_url: string
  url: string
}

export interface MediaEmbed {
  content?: string
  width?: number
  scrolling?: boolean
  height?: number
  media_domain_url?: string
}

export interface S {
  y: number
  x: number
  u: string
}

export interface Preview {
  images: Image[]
  enabled: boolean
}

export interface Image {
  source: Source
  resolutions: Source[]
  variants: Gildings
  id: string
}

export interface Source {
  url: string
  width: number
  height: number
}
