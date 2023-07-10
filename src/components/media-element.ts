import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { NormalizedPostMedia } from '../types/reddit-api/ThreadsResult.type'

import './thumbnail-element'
import './gallery-element'
import './youtube-element'
import './video-player-element'
import globalStyle from '../styles/global.style'

@customElement('media-element')
export class MediaElement extends LitElement {
  @property({
    type: Object,
  })
  media!: NormalizedPostMedia

  @property({
    type: String,
  })
  mediaLoading?: 'lazy' | 'eager' = 'lazy'

  render() {
    if (!this.media?.type) {
      return html``
    }

    switch (this.media.type) {
      case 'normalizedVideo': {
        return html`
          <video-player-element
            ?hasaudio="${this.media.hasAudio}"
            height="${this.media.height}"
            poster="${this.media.poster}"
            posterLoading="${this.mediaLoading}"
            url="${this.media.url}"
            width="${this.media.width}"
          >
          </video-player-element>
        `
      }

      case 'gallery': {
        return html`
          <gallery-element
            loading="${this.mediaLoading}"
            .items="${this.media.items}"
          ></gallery-element>
        `
      }

      case 'youtube': {
        return html`
          <youtube-element
            height="${this.media.height}"
            id="${this.media.id}"
            posterLoading="${this.mediaLoading}"
            thumbnail="${this.media.thumbnail}"
            width="${this.media.width}"
          ></youtube-element>
        `
      }

      case 'singleImage': {
        return html`
          <thumbnail-element
            fullSize="${this.media.fullSize || ''}"
            height="${this.media.height}"
            loading="${this.mediaLoading}"
            retina="${this.media.retina}"
            thumbnail="${this.media.thumbnail}"
            width="${this.media.width}"
          ></thumbnail-element>
        `
      }

      case 'externalLink': {
        return html`
          <a
            class="post-link"
            href="${this.media.url}"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt=""
              class="post-link__logo"
              decoding="async"
              height="50"
              loading="${this.mediaLoading}"
              src="${this.media.image}"
              width="50"
            />
          </a>
        `
      }

      case 'thumbnail':
      case 'previewImage': {
        return html`
          <thumbnail-element
            height="${this.media.height}"
            thumbnail="${this.media.url}"
            loading="${this.mediaLoading}"
            width="${this.media.width}"
          >
          </thumbnail-element>
        `
      }

      default: {
        return html``
      }
    }
  }

  static styles = [
    globalStyle,
    css`
      .post-link {
        align-items: center;
        aspect-ratio: 16/9;
        background-color: var(--color-accent);
        display: flex;
        height: auto;
        justify-content: center;
        padding: var(--gutter);
        width: 100%;
        word-break: break-all;
      }

      @media (prefers-color-scheme: dark) {
        .post-link__logo {
          filter: grayscale(100%);
        }
      }

      .post-link__logo {
        aspect-ratio: 1/1;
        object-fit: contain;
        width: 5em;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'media-element': MediaElement
  }
}
