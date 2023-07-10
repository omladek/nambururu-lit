import { LitElement, css, html } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js'
import { repeat } from 'lit/directives/repeat.js'

import getSubreddit from '../utilities/getSubreddit'
import { NormalizedPost } from '../types/reddit-api/ThreadsResult.type'
import getUniqueNormalizedPosts from '../utilities/getUniqueNormalizedPosts'
import sortOptions, { SortOption } from '../constants/sortOptions'
import parseStorage from '../utilities/parseStorage'
import parseSubredditFromURL from '../utilities/parseSubredditFromURL'
import basicSubreddits from '../constants/basicSubreddits'
import parseSortFromURL from '../utilities/parseSortFromURL'
import '../components/post-element'
import '../components/loader-element'
import '../components/header-element'
import '../components/filters-element'
import globalStyle from '../styles/global.style'

const lazyLoadingLimit = window.matchMedia('(min-width: 40em)').matches ? 4 : 1

const postsPerPage = lazyLoadingLimit * 2

@customElement('home-route')
export class HomeRouteElement extends LitElement {
  @state()
  posts: NormalizedPost[] = []

  @state()
  visiblePostsLimit: number = postsPerPage

  @state()
  postsTotal = 0

  @state()
  isLoading = true

  @state()
  isLoadingMore = false

  @state()
  afterParam: string | null = null

  @state()
  subreddit = ''

  @state()
  sort: SortOption = '' as SortOption

  @state()
  error = ''

  @query('.load-more-area')
  loadMoreArea: HTMLDivElement | undefined

  @state()
  subredditAbortController: AbortController | null = null

  private _intersectionObserver = new IntersectionController(this, {
    callback: ([entry]) => {
      const { isIntersecting } = entry

      if (
        !this.isLoading &&
        !this.isLoadingMore &&
        isIntersecting &&
        this.visiblePostsLimit < this.postsTotal
      ) {
        const next = this.visiblePostsLimit + postsPerPage

        if (next >= this.postsTotal) {
          this.visiblePostsLimit = this.postsTotal
        } else {
          this.visiblePostsLimit = next
        }
      } else if (
        isIntersecting &&
        this.visiblePostsLimit === this.postsTotal &&
        !this.isLoading &&
        !this.isLoadingMore &&
        this.afterParam
      ) {
        this._getMore()
      }

      return isIntersecting
    },
  })

  constructor() {
    super()

    const url = window.location.href

    const subreddit =
      parseSubredditFromURL(url) ||
      parseStorage('lists')[0] ||
      basicSubreddits[0]

    const sort = parseSortFromURL(url) || sortOptions[0]

    this.posts = []
    this.postsTotal = 0
    this.isLoading = false
    this.afterParam = ''
    this.isLoadingMore = false
    this.subreddit = subreddit
    this.sort = sort
    this.error = ''
    this.subredditAbortController = null
  }

  connectedCallback = () => {
    super.connectedCallback()
    window.addEventListener('popstate', this._handlePopState)
  }

  disconnectedCallback = () => {
    if (this.subredditAbortController) {
      this.subredditAbortController.abort()
    }

    window.removeEventListener('popstate', this._handlePopState)
    super.disconnectedCallback()
  }

  _handlePopState = async () => {
    const url = window.location.href

    if (window.location.pathname !== '/nambururu-lit/') {
      return
    }

    const subreddit =
      parseSubredditFromURL(url) ||
      parseStorage('lists')[0] ||
      basicSubreddits[0]

    const sort = parseSortFromURL(url) || sortOptions[0]

    this.posts = []
    this.postsTotal = 0
    this.isLoading = false
    this.afterParam = ''
    this.isLoadingMore = false
    this.subreddit = subreddit
    this.sort = sort
    this.error = ''

    await this.getPosts({
      subreddit: this.subreddit,
      sort: this.sort,
      isFetching: true,
      isFetchingMore: false,
    })
  }

  firstUpdated = async () => {
    await this.getPosts({
      subreddit: this.subreddit,
      sort: this.sort,
      isFetching: true,
      isFetchingMore: false,
    })

    window.addEventListener('popstate', this._handlePopState)

    if (this.loadMoreArea) {
      this._intersectionObserver.observe(this.loadMoreArea)
    }
  }

  protected updated(): void {
    if (this.loadMoreArea) {
      this._intersectionObserver.observe(this.loadMoreArea)
    }
  }

  getPosts = async ({
    isFetching,
    isFetchingMore,
    sort,
    subreddit,
  }: {
    subreddit: string
    sort: SortOption
    isFetching: boolean
    isFetchingMore: boolean
  }) => {
    try {
      this.error = ''

      if (isFetching) {
        this.isLoading = true
        this.afterParam = ''
      }

      if (isFetchingMore) {
        this.isLoadingMore = true
      }

      if (this.subredditAbortController) {
        this.subredditAbortController.abort()
      }

      this.subredditAbortController = new AbortController()
      const { signal } = this.subredditAbortController

      const { after, posts } = await getSubreddit({
        pageParam: this.afterParam,
        postsCache: [],
        queryKey: ['subreddit', subreddit, sort],
        signal,
      })

      const incomingPosts = getUniqueNormalizedPosts([{ posts, after }])

      if (isFetching) {
        this.posts = incomingPosts
        this.postsTotal = incomingPosts.length
      }

      if (isFetchingMore) {
        this._handleFetchMoreSuccess(incomingPosts)
      }

      this.afterParam = after
    } catch (error) {
      console.error(error)
      this.error =
        error instanceof Error ? error.message : 'Something went wrong.'
    } finally {
      if (isFetching) {
        this.isLoading = false
      }

      if (isFetchingMore) {
        this.isLoadingMore = false
      }
    }
  }

  private _handleFetchMoreSuccess = (incomingPosts: NormalizedPost[]): void => {
    const nextPostsMerged = [...this.posts, ...incomingPosts]
    this.posts = nextPostsMerged
    this.postsTotal = nextPostsMerged.length

    if (this.visiblePostsLimit < this.postsTotal) {
      const next = this.visiblePostsLimit + postsPerPage

      if (next >= this.postsTotal) {
        this.visiblePostsLimit = this.postsTotal
      } else {
        this.visiblePostsLimit = next
      }
    }
  }

  render() {
    const visiblePosts = this.posts.slice(0, this.visiblePostsLimit)

    return html`
      <div class="root">
        <div class="header">
          <header-element></header-element>
        </div>
        <main class="main">
          <h1 class="title">${this.subreddit} (${this.sort})</h1>
          ${when(
            this.error,
            () =>
              html`<div class="message" role="alert">
                <p>An error has occurred: <span>${this.error}</span></p>
              </div>`,
            () => html`
              ${when(
                this.isLoading,
                () => html`<loader-element isFullScreen></loader-element>`,
                () => html`
                  ${when(
                    visiblePosts.length,
                    () => html`
                      <div class="list">
                        ${repeat(
                          visiblePosts,
                          (post) => post.id,
                          (post, postIndex) =>
                            html`<post-element
                              .post="${post}"
                              mediaLoading="${postIndex + 1 <= lazyLoadingLimit
                                ? 'eager'
                                : 'lazy'}"
                              >${post.title}</post-element
                            >`,
                        )}
                        <div class="load-more-area">
                          ${when(
                            this.afterParam,
                            () => html` <loader-element></loader-element> `,
                            () =>
                              html`<div class="end">
                                <p>That&apos;s all</p>
                              </div> `,
                          )}
                        </div>
                      </div>
                    `,
                    () =>
                      html`<div class="message" role="alert">
                        <p>No results.</p>
                      </div>`,
                  )}
                `,
              )}
            `,
          )}
        </main>
        <filters-element
          subreddit=${this.subreddit}
          sort=${this.sort}
        ></filters-element>
      </div>
    `
  }

  private async _getMore() {
    this.getPosts({
      subreddit: this.subreddit,
      sort: this.sort,
      isFetching: false,
      isFetchingMore: true,
    })
  }

  static styles = [
    globalStyle,
    css`
      .root {
        display: grid;
        grid-template-areas:
          'header'
          'main'
          'footer';
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        height: 100%;
      }

      .header {
        grid-area: header;
      }

      .main {
        grid-area: main;
        overflow-y: scroll;
      }

      .filters {
        grid-area: footer;
      }

      .message {
        align-items: center;
        display: grid;
        justify-content: center;
        min-height: 50vh;
        padding-inline: var(--gutter);
      }

      .load-more-area {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 20em;
        text-align: center;
      }

      .load-more-area.done {
        grid-column: 1 / -1;
      }

      .list {
        contain-intrinsic-size: 1px 5000px;
        content-visibility: auto;
        display: grid;
        gap: var(--gutter);
      }

      @media (min-width: 40em) {
        .list {
          grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
          padding-inline: var(--gutter);
        }
      }

      .end {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 5rem;
        text-align: center;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'home-route': HomeRouteElement
  }
}
