import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { ref, createRef, Ref } from 'lit/directives/ref.js'
import syncMediaPlayback from '../utilities/syncMediaPlayback'
import globalStyle from '../styles/global.style'

@customElement('video-player-element')
export class VideoPlayerElement extends LitElement {
  @property({
    type: String,
  })
  url = ''

  @property({
    type: String,
  })
  poster = ''

  @property({
    type: Number,
  })
  height = 0

  @property({
    type: Number,
  })
  width = 0

  @property({
    type: Boolean,
  })
  hasAudio = false

  @property({
    type: String,
  })
  posterLoading: 'lazy' | 'eager' = 'lazy'

  @property({
    type: Boolean,
  })
  isLoaded = false

  videoRef: Ref<HTMLVideoElement> = createRef()

  audioRef: Ref<HTMLAudioElement> = createRef()

  private _onClick(): void {
    this.isLoaded = true

    if (this.videoRef.value && this.audioRef.value) {
      syncMediaPlayback(this.videoRef.value, this.audioRef.value)
    }

    if (this.videoRef.value) {
      this.videoRef.value.play()
    }

    if (this.audioRef.value) {
      this.audioRef.value.play()
    }
  }

  render() {
    const audioUrl = this.url.replace(/_\d+/, '_audio')

    return html`<div
      class="thumbnail-wrap thumbnail-wrap--video"
      style="${`--ar-width: ${this.width};--ar-height: ${this.height}`}"
    >
      ${when(
        !this.isLoaded,
        () => html`
          <button
            aria-label="play video"
            class="thumbnail__btn"
            @click=${this._onClick}
            type="button"
          >
            ▶
          </button>

          ${when(
            this.poster,
            () =>
              html`<img
                alt=""
                class="thumbnail thumbnail--video"
                decoding="async"
                height="${this.height}"
                loading="${this.posterLoading}"
                src="${this.poster}"
                width="${this.width}"
              />`,
            () => html`<div class="thumbnail__bg"></div>`,
          )}
        `,
        () =>
          html`<video
              class=""
              controls
              height="${this.height}"
              muted
              playsinline
              ${ref(this.videoRef)}
              width="${this.width}"
            >
              <source src="${this.url}" type="video/mp4" />
            </video>
            ${when(
              this.hasAudio,
              () => html`
                <audio
                  class="audio"
                  controls
                  muted
                  preload="none"
                  ${ref(this.audioRef)}
                  src="${audioUrl}"
                ></audio>
              `,
            )} `,
      )}
    </div>`
  }

  static styles = [
    globalStyle,
    css`
      .thumbnail-wrap--video {
        aspect-ratio: var(--ar-width) / var(--ar-height);

        & .thumbnail--video,
        & .thumbnail__bg {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }

        & .thumbnail__bg {
          background-color: var(--color-accent);
        }
      }

      .thumbnail-wrap--video video {
        height: 100%;
        object-fit: contain;
        width: 100%;
      }

      .audio {
        width: 100%;
      }

      @media (prefers-color-scheme: dark) {
        .audio {
          opacity: 0.5;
        }
      }

      .thumbnail {
        background-color: var(--color-accent);
        height: auto;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .thumbnail-wrap {
        position: relative;
      }

      video:-webkit-media-controls-volume-slider {
        display: none;
      }

      video::-webkit-media-controls-mute-button {
        display: none;
      }

      video::-webkit-media-controls-volume-slider-container {
        display: none;
      }

      .thumbnail__btn {
        background: none;
        border: 0;
        color: var(--color-background);
        font-size: 5rem;
        height: 100%;
        left: 0;
        padding: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
      }

      @media (prefers-color-scheme: dark) {
        .thumbnail__btn {
          color: var(--color-text);
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'video-player-element': VideoPlayerElement
  }
}
