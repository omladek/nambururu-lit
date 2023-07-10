import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '../components/header-element'
import globalStyle from '../styles/global.style'
import { when } from 'lit/directives/when.js'
import buttonStyle from '../styles/button.style'
import { repeat } from 'lit/directives/repeat.js'

@customElement('tags-element')
export class TagsElement extends LitElement {
  @property({ type: Array })
  tags: string[] = []

  private _handleClick = (tag: string): void => {
    this.dispatchEvent(
      new CustomEvent('tag', {
        bubbles: true,
        detail: tag,
      }),
    )
  }

  render() {
    return html`
      ${when(
        this.tags.length,
        () => html`
          <div class="tags">
            ${repeat(
              this.tags,
              (tag) => tag,
              (tag) =>
                html` <button
                  class="btn tags__tag"
                  @click=${() => this._handleClick(tag)}
                  type="button"
                >
                  ${tag}
                </button>`,
            )}
          </div>
        `,
      )}
    `
  }

  static styles = [
    globalStyle,
    buttonStyle,
    css`
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'tags-element': TagsElement
  }
}
