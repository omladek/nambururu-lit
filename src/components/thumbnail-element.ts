import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import globalStyle from '../styles/global.style'

@customElement('thumbnail-element')
export class ThumbnailElement extends LitElement {
  @property({
    type: String,
  })
  thumbnail = ''

  @property({
    type: String,
  })
  fullSize = ''

  @property({
    type: Number,
  })
  height!: number

  @property({
    type: Number,
  })
  width!: number

  @property({
    type: String,
  })
  loading: 'lazy' | 'eager' = 'lazy'

  @property({
    type: String,
  })
  retina = ''

  @state()
  showFullSize: boolean

  constructor() {
    super()

    this.showFullSize = Boolean(this.fullSize)
  }

  private _handleClick = (
    event: Event & { target: HTMLAnchorElement },
  ): void => {
    if (!this.showFullSize && this.fullSize) {
      event.preventDefault()

      this.showFullSize = true
    }
  }

  render() {
    const srcSetSD =
      this.showFullSize && this.fullSize ? this.fullSize : this.thumbnail

    let srcSetHD =
      this.showFullSize && this.fullSize ? this.fullSize : this.retina

    if (!this.retina) {
      srcSetHD = ''
    } else {
      srcSetHD = `, ${srcSetHD} 2x`
    }

    return html`<div class="thumbnail-wrap">
      <a
        class="thumbnail__link"
        href="${this.fullSize || this.thumbnail}"
        rel="noopener noreferrer"
        target="_blank"
        @click=${this._handleClick}
        style="${`--ar-width: ${this.width};--ar-height: ${this.height}`}"
      >
        ${when(
          this.fullSize,
          () => html`
            <span class="thumbnail__hd"
              >${when(
                this.showFullSize,
                () => 'HD',
                () => 'SD',
              )}</span
            >
          `,
        )}
        <img
          alt=""
          class="thumbnail"
          decoding="async"
          height="${this.height}"
          loading="${this.loading}"
          srcset="${`${srcSetSD} 1x${srcSetHD}`}"
          width="${this.width}"
        />
      </a>
    </div>`
  }

  static styles = [
    globalStyle,
    css`
      .thumbnail {
        background-color: var(--color-accent);
        height: 100%;
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .thumbnail-wrap {
        position: relative;
      }

      .thumbnail__link {
        aspect-ratio: var(--ar-width, 16) / var(--ar-height, 9);
        display: block;
        position: relative;
      }

      .thumbnail__hd {
        background-color: var(--color-post);
        color: var(--color-text);
        display: block;
        font-size: 0.75rem;
        padding-inline: 0.5em;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'thumbnail-element': ThumbnailElement
  }
}
