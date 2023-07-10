import { LitElement, html, css } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js'

import { NormalizedPost } from '../types/reddit-api/ThreadsResult.type'
import './link-element'
import './media-element'
import './comments-preview-element'
import './rich-text-element'
import globalStyle from '../styles/global.style'

@customElement('post-element')
export class PostElement extends LitElement {
  @property({ type: Object })
  post!: NormalizedPost

  @property({ type: String })
  mediaLoading: 'lazy' | 'eager' = 'lazy'

  @query('.post')
  postElement: HTMLDivElement | undefined

  @state()
  isLoaded = false

  @state()
  showContent = false

  @state()
  hasMinHeight = false

  constructor() {
    super()

    this.isLoaded = this.mediaLoading === 'eager'
    this.showContent = this.mediaLoading === 'eager'
  }

  override firstUpdated = async () => {
    // avoid unnecessary calls by waiting for any pending updated to complete.
    await this.updateComplete

    this.isLoaded = this.mediaLoading === 'eager'
    this.showContent = this.mediaLoading === 'eager'

    if (this.postElement) {
      this._intersectionObserver.observe(this.postElement)
    }
  }

  protected updated(): void {
    if (this.postElement) {
      this._intersectionObserver.observe(this.postElement)
    }
  }

  private _intersectionObserver = new IntersectionController(this, {
    callback: ([entry]) => {
      const { isIntersecting } = entry

      if (
        this.isLoaded &&
        isIntersecting &&
        !this.hasMinHeight &&
        this.postElement
      ) {
        this.hasMinHeight = true
        this.postElement.style.setProperty(
          '--minHeight',
          `${Math.ceil(this.postElement.offsetHeight)}px`,
        )
      }

      if (isIntersecting && !this.isLoaded) {
        this.isLoaded = true
      }

      if (isIntersecting && this.isLoaded && !this.showContent) {
        this.showContent = true
      }

      if (!isIntersecting && this.isLoaded && this.showContent) {
        this.showContent = false
      }

      return isIntersecting
    },
  })

  render() {
    const {
      commentsTotalFormatted,
      createdDate,
      description,
      domain,
      downVotes,
      externalLink,
      hasComments,
      id,
      media,
      permalink,
      subreddit,
      title,
      upVotes,
    } = this.post

    return html`
      <article
        class="${`post ${
          this.isLoaded && this.showContent ? '' : 'is-empty'
        } is-${this.mediaLoading}`}"
      >
        ${when(
          this.isLoaded && this.showContent,
          () => html`
            ${when(
              media,
              () =>
                html`<media-element
                  mediaLoading="${this.mediaLoading}"
                  .media="${media}"
                ></media-element>`,
            )}
            <div class="post__info">
              <h2 class="post__title">
                <a
                  class="post__link"
                  href="${permalink}"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ${title}
                </a>
              </h2>

              ${when(
                description,
                () =>
                  html`<div class="post__description">
                    <rich-text-element
                      html="${description}"
                    ></rich-text-element>
                  </div>`,
              )}

              <dl class="post__data">
                <dt class="sr-only">date:</dt>

                <dd class="post__time">
                  <time>${createdDate}</time>
                </dd>

                <dt class="sr-only">subreddit:</dt>

                <dd>
                  <link-element
                    class="post__subreddit-link"
                    href="${`/nambururu-lit/#/?subreddit=${subreddit}&sort=best`}"
                  >
                    ${`r/${subreddit}`}
                  </link-element>
                </dd>

                <dt>
                  <span class="sr-only">domain:</span>
                  <span aria-hidden="true">🌐</span>
                </dt>

                <dd class="post__domain">
                  ${when(
                    externalLink,
                    () => html`
                      <a
                        href="{externalLink}"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        ${domain}
                      </a>
                    `,
                    () => html` ${domain.replace(/^self./, '')} `,
                  )}
                </dd>

                <dt>
                  <span aria-hidden="true">💬</span>
                  <span class="sr-only">comments:</span>
                </dt>

                <dd>${commentsTotalFormatted}</dd>

                <dt>
                  <span aria-hidden="true">⬆️</span>
                  <span class="sr-only">upvotes:</span>
                </dt>

                <dd>${upVotes}</dd>

                <dt>
                  <span aria-hidden="true">⬇️</span>
                  <span class="sr-only">downvotes:</span>
                </dt>

                <dd>${downVotes}</dd>
              </dl>

              ${when(
                hasComments,
                () => html`
                  <div class="post__comments">
                    <comments-preview-element
                      id="${id}"
                    ></comments-preview-element>
                  </div>
                `,
              )}
            </div>
          `,
        )}
      </article>
    `
  }

  static styles = [
    globalStyle,
    css`
      :host {
        background-color: var(--color-post);
        border-bottom: 1px solid var(--color-accent);
        overflow: hidden;
        padding-block-end: var(--gutter);
        position: relative;
      }

      .post {
        height: 100%;
      }

      .post.is-empty {
        min-height: var(--minHeight, 500px);
      }

      .post.is-lazy {
        opacity: 1;
        transform: translateZ(0);
        transition: opacity 300ms ease-out;
      }

      @media (prefers-reduced-motion) {
        .post.is-lazy {
          transition: none;
        }
      }

      .post.is-lazy:empty {
        opacity: 0;
      }

      .post__info {
        padding-block-start: var(--gutter);
        padding-inline: var(--gutter);
      }

      .post__subreddit-link {
        display: block;
        font-size: 90%;
        text-decoration: none;
      }

      @media (min-width: 40em) {
        .post__subreddit-link {
          display: inline;
        }
      }

      .post__title {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        margin-block-end: var(--gutter);
      }

      .post__link {
        display: block;
        line-height: 1.3;
        text-decoration: none;
        word-break: break-word;
      }

      .post__description {
        max-height: 15rem;
        overflow: auto;
        width: 100%;
        word-break: break-word;

        & a {
          word-break: break-all;
        }
      }

      .post__description pre {
        overflow: auto;
      }

      .post__data {
        --spacing: 0.25rem;
        font-size: 80%;

        & dt,
        & dd {
          display: inline-block;
          margin: 0;
          padding: 0;
        }

        & dt {
          filter: grayscale(100%);
          padding-inline-end: var(--spacing);
        }

        & dd:first-of-type {
          display: block;
          margin-block-end: calc(var(--spacing) * 2);
        }

        & dd:not(:last-child) {
          margin-inline-end: calc(var(--spacing) * 2);
        }
      }

      @media (prefers-color-scheme: dark) {
        .post__description,
        .post__title {
          filter: grayscale(100%);
        }
      }

      .post__comments {
        padding-block-start: var(--gutter);

        & a {
          word-break: break-all;
        }
      }

      .post__domain {
        word-break: break-all;
      }

      .sr-only {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'post-element': PostElement
  }
}
