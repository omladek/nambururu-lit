import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globalStyle from '../styles/global.style'

@customElement('loader-element')
export class LoaderElement extends LitElement {
  @property({ type: String })
  size?: 'xs' | 'md' | 'lg' = 'lg'

  @property({ type: Boolean })
  isFullScreen?: boolean = false

  render() {
    const classNames = [
      'loader',
      `loader--${this.size}`,
      this.isFullScreen && 'loader--fullscreen',
    ]
      .filter(Boolean)
      .join(' ')

    return html` <span class="${classNames}">loading&hellip;</span> `
  }

  static styles = [
    globalStyle,
    css`
      .loader,
      .loader:after {
        aspect-ratio: var(--w) / var(--w);
        border-radius: 50%;
        height: var(--w);
        width: var(--w);
      }

      .loader--lg,
      .loader--lg:after {
        --w: 5em;
      }

      .loader--md,
      .loader--md:after {
        --w: 2.5em;
      }

      .loader--xs,
      .loader--xs:after {
        --w: 1.5em;
      }

      .loader {
        display: block;
        margin: 0 auto;
        position: relative;
        text-indent: -9999em;
        z-index: 9999;
      }

      .loader:after {
        --b: calc(var(--w) / 10);
        animation: spinner 1.1s infinite linear;
        border-bottom: var(--b) solid var(--color-background);
        border-left: var(--b) solid var(--color-text);
        border-right: var(--b) solid var(--color-background);
        border-top: var(--b) solid var(--color-background);
        content: '';
        display: block;
        left: 0;
        position: absolute;
        top: 0;
        transform: translateZ(0);
      }

      .loader--fullscreen {
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'loader-element': LoaderElement
  }
}
