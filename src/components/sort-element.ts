import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import sortOptions, { SortOption } from '../constants/sortOptions'
import globalStyle from '../styles/global.style'
import { repeat } from 'lit/directives/repeat.js'
import { Router } from '@vaadin/router'

@customElement('sort-element')
export class SortElement extends LitElement {
  @property({ type: String })
  sort!: SortOption

  @property({ type: String })
  subreddit!: string

  private async _handleSortChange({
    target,
  }: InputEvent & { target: HTMLSelectElement }) {
    Router.go(
      `/nambururu-lit/#/?subreddit=${this.subreddit}&sort=${target.value}`,
    )
  }

  render() {
    return html`<form action="" method="get">
      <fieldset class="sort">
        <label for="sort">sort</label>
        <select name="sort" id="sort" @change=${this._handleSortChange}>
          <option disabled>choose</option>
          ${repeat(
            sortOptions,
            (option) => option,
            (option) =>
              html`<option value="${option}" ?selected=${this.sort === option}>
                ${option}
              </option>`,
          )}
        </select>
      </fieldset>
    </form>`
  }

  static styles = [
    globalStyle,
    css`
      .sort {
        border: 0;
        margin: 0;
        padding: 0;
      }

      @media (max-width: 40em) {
        .sort {
          position: relative;
        }

        .sort label {
          align-items: center;
          appearance: none;
          background-color: var(--color-post);
          border-block-start: 1px solid var(--color-accent);
          color: var(--color-link);
          display: inline-block;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 500;
          height: var(--form-element-height);
          left: 0;
          margin: 0;
          padding: 0.75em 1.5em;
          pointer-events: none;
          position: absolute;
          text-align: center;
          text-decoration: none;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        .sort select {
          opacity: 0;
        }
      }

      @media (min-width: 40em) {
        .sort {
          align-items: center;
          display: flex;
          gap: var(--gutter);
          justify-content: flex-start;

          & input,
          & select {
            width: 100%;
          }
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'sort-element': SortElement
  }
}
