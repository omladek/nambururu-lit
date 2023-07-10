import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './thumbnail-element'
import { NormalizedGalleryImage } from '../types/reddit-api/ThreadsResult.type'
import globalStyle from '../styles/global.style'
import { repeat } from 'lit/directives/repeat.js'

@customElement('gallery-element')
export class GalleryElement extends LitElement {
  @property({
    type: Array,
  })
  items!: NormalizedGalleryImage[]

  @property({
    type: String,
  })
  mediaLoading: 'lazy' | 'eager' = 'lazy'

  render() {
    if (!this.items.length) {
      return html``
    }

    return html`<div class="gallery">
      ${repeat(
        this.items,
        (item) => item.thumbnail,
        (thumbnail, thumbnailIndex) => html`
          <thumbnail-element
            fullSize="${thumbnail.fullSize}"
            height="${thumbnail.height}"
            key="${thumbnail.thumbnail}"
            loading="${thumbnailIndex < 1 ? this.mediaLoading : 'lazy'}"
            retina="${thumbnail.retina}"
            thumbnail="${thumbnail.thumbnail}"
            width="${thumbnail.width}"
          ></thumbnail-element>
        `,
      )}
    </div>`
  }

  static styles = [
    globalStyle,
    css`
      .gallery {
        display: grid;
        gap: var(--gutter);
        grid-template-columns: 1fr;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'gallery-element': GalleryElement
  }
}
