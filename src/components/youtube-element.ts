import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globalStyle from '../styles/global.style'

@customElement('youtube-element')
export class YouTubeElement extends LitElement {
  @property({
    type: String,
  })
  thumbnail = ''

  @property({
    type: Number,
  })
  height = 0

  @property({
    type: Number,
  })
  width = 0

  @property({
    type: String,
  })
  posterLoading: 'lazy' | 'eager' = 'lazy'

  render() {
    return html`<a
      class="youtube"
      href="${`https://www.youtube.com/watch?v=${this.id}`}"
      rel="noopener noreferrer"
      style="${`--ar-width: ${this.width};--ar-height: ${this.height}`}"
      target="_blank"
    >
      <img
        alt=""
        class="youtube__logo"
        decoding="async"
        height="60"
        loading="${this.posterLoading}"
        srcset="
          https://satyr.dev/80x60/FF0000?brand=youtube   1x,
          https://satyr.dev/160x120/FF0000?brand=youtube 2x
        "
        width="80"
      />
      <img
        alt=""
        class="youtube__thumbnail"
        decoding="async"
        height="${this.height}"
        loading="${this.posterLoading}"
        src="${this.thumbnail}"
        width="${this.width}"
      />
    </a>`
  }

  static styles = [
    globalStyle,
    css`
      .youtube {
        aspect-ratio: var(--ar-width, 16) / var(--ar-height, 9);
        display: block;
        position: relative;
      }

      .youtube__logo {
        background-color: var(--color-background);
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .youtube__thumbnail {
        background-color: var(--color-accent);
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      @media (prefers-color-scheme: dark) {
        .youtube__logo {
          background-color: var(--color-link);
          filter: grayscale(100%);
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'youtube-element': YouTubeElement
  }
}
